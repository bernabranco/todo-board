import { useCallback, useMemo } from "react";
import type { Node } from "reactflow";
import type { CardData } from "../types";

type UseBoardSelectionReturn = {
  selectedNode: Node<CardData> | null;
  onNodeClick: (_: React.MouseEvent, node: { id: string }) => void;
};

// Manages the currently selected card on the board.
export function useBoardSelection(
  nodes: Node<CardData>[],
  selectedId: string | null,
  setSelectedId: (id: string | null) => void,
): UseBoardSelectionReturn {
  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedId) || null,
    [nodes, selectedId],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: { id: string }) => {
    setSelectedId(node.id);
  }, []);

  return { selectedNode, onNodeClick };
}
