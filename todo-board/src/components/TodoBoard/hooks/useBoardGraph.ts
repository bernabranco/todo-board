import { useCallback, useMemo } from "react";
import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "reactflow";

import { initialEdges, initialNodes, DEFAULT_CARD_DESCRIPTION, DEFAULT_CARD_TITLE } from "../config/boardDefaults";
import type { CardData, CardNodeData, CardStatus } from "../types";

type UseBoardGraphReturn = {
  nodes: Node<CardData>[];
  edges: Edge[];
  nodesWithHandlers: Node<CardNodeData>[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addCard: () => void;
  updateNode: (id: string, updates: Partial<CardData>) => void;
  onConnect: (connection: Connection) => void;
  onEdgeClick: (_: React.MouseEvent, edge: Edge) => void;
  setNodes: ReturnType<typeof useNodesState>[1];
  setEdges: ReturnType<typeof useEdgesState>[1];
};

// Owns the React Flow graph state and node/edge interactions.
export function useBoardGraph(
  onDeleteSelected: (deletedId: string) => void,
): UseBoardGraphReturn {
  const [nodes, setNodes, onNodesChange] = useNodesState<CardData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateNode = useCallback(
    (id: string, updates: Partial<CardData>) => {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === id
            ? {
                ...node,
                data: { ...(node.data as CardData), ...updates },
              }
            : node,
        ),
      );
    },
    [setNodes],
  );

  const deleteCard = useCallback(
    (id: string) => {
      setNodes((prev) => prev.filter((node) => node.id !== id));
      setEdges((prev) =>
        prev.filter((edge) => edge.source !== id && edge.target !== id),
      );
      onDeleteSelected(id);
    },
    [setNodes, setEdges, onDeleteSelected],
  );

  const addCard = useCallback(() => {
    const id = `card-${Date.now()}`;
    setNodes((prev) => [
      ...prev,
      {
        id,
        type: "card",
        position: { x: 80 + prev.length * 40, y: 80 + prev.length * 40 },
        data: {
          title: DEFAULT_CARD_TITLE,
          description: DEFAULT_CARD_DESCRIPTION,
          status: "todo" as CardStatus,
        },
      },
    ]);
  }, [setNodes]);

  const nodesWithHandlers = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...(node.data as CardData),
          onDelete: deleteCard,
        },
      })) as Node<CardNodeData>[],
    [nodes, deleteCard],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: "smoothstep" }, eds));
    },
    [setEdges],
  );

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      setEdges((prev) => prev.filter((item) => item.id !== edge.id));
    },
    [setEdges],
  );

  return {
    nodes,
    edges,
    nodesWithHandlers,
    onNodesChange,
    onEdgesChange,
    addCard,
    updateNode,
    onConnect,
    onEdgeClick,
    setNodes,
    setEdges,
  };
}
