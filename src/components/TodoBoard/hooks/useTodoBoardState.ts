import { useCallback, useState } from "react";

import { useBoardGraph } from "./useBoardGraph";
import { useBoardPersistence } from "./useBoardPersistence";
import { useBoardSelection } from "./useBoardSelection";
import type { BoardSnapshot, CardData, CardNodeData } from "../types";
import {
  DEFAULT_BOARD_DESCRIPTION,
  DEFAULT_BOARD_TITLE,
  initialEdges,
  initialNodes,
} from "../config/boardDefaults";
import type { Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";

type UseTodoBoardStateReturn = {
  nodes: Node<CardData>[];
  edges: Edge[];
  nodesWithHandlers: Node<CardNodeData>[];
  selectedNode: Node<CardData> | null;
  editMode: boolean;
  boardTitle: string;
  boardDescription: string;
  savedBoards: BoardSnapshot[];
  selectedBoardId: string;
  saveFeedback: { type: "success" | "error"; message: string; timestamp: number } | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addCard: () => void;
  updateNode: (id: string, updates: Partial<CardData>) => void;
  toggleEditMode: () => void;
  saveBoard: () => void;
  exportBoard: () => void;
  exportCanvas: () => void;
  importBoard: (file: File) => void;
  createNewBoard: () => void;
  selectBoard: (id: string) => void;
  setBoardTitle: (value: string) => void;
  setBoardDescription: (value: string) => void;
  clearSelectedCard: () => void;
  onConnect: (connection: Connection) => void;
  onEdgeClick: (_: React.MouseEvent, edge: Edge) => void;
  onNodeClick: (_: React.MouseEvent, node: { id: string }) => void;
};

// Orchestrates board state by composing smaller hooks.
export function useTodoBoardState(): UseTodoBoardStateReturn {
  const [editMode, setEditMode] = useState(true);
  const [boardTitle, setBoardTitle] = useState(DEFAULT_BOARD_TITLE);
  const [boardDescription, setBoardDescription] = useState(
    DEFAULT_BOARD_DESCRIPTION,
  );
  const [boardId, setBoardId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectCard = useCallback((id: string) => {
    setSelectedId(id);
  }, []);
  const clearSelectedCard = useCallback(() => {
    setSelectedId(null);
  }, []);

  const { nodes, edges, nodesWithHandlers, onNodesChange, onEdgesChange, addCard, updateNode, onConnect, onEdgeClick, setNodes, setEdges } =
    useBoardGraph(
      (deletedId) => {
        setSelectedId((prev) => (prev === deletedId ? null : prev));
      },
      selectCard,
    );

  const { selectedNode, onNodeClick } = useBoardSelection(
    nodes,
    selectedId,
    setSelectedId,
  );

  const {
    savedBoards,
    selectedBoardId,
    saveFeedback,
    saveBoard,
    selectBoard,
    exportBoard,
    exportCanvas,
    importBoard,
  } = useBoardPersistence({
    boardId,
    boardTitle,
    boardDescription,
    nodes,
    edges,
    setBoardId,
    setBoardTitle,
    setBoardDescription,
    setNodes,
    setEdges,
    setSelectedId,
  });

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const createNewBoard = useCallback(() => {
    setBoardId(null);
    selectBoard("");
    setBoardTitle(DEFAULT_BOARD_TITLE);
    setBoardDescription(DEFAULT_BOARD_DESCRIPTION);
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedId(null);
    setEditMode(true);
  }, [selectBoard, setBoardTitle, setBoardDescription, setNodes, setEdges]);

  return {
    nodes,
    edges,
    nodesWithHandlers,
    selectedNode,
    editMode,
    boardTitle,
    boardDescription,
    savedBoards,
    selectedBoardId,
    saveFeedback,
    onNodesChange,
    onEdgesChange,
    addCard,
    updateNode,
    toggleEditMode,
    saveBoard,
    exportBoard,
    exportCanvas,
    importBoard,
    createNewBoard,
    selectBoard,
    setBoardTitle,
    setBoardDescription,
    clearSelectedCard,
    onConnect,
    onEdgeClick,
    onNodeClick,
  };
}
