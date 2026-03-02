import { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import type { Edge, Node } from "reactflow";

import { useBoardStorage } from "./useBoardStorage";
import type { CardData } from "../types";

type UseBoardPersistenceParams = {
  boardId: string | null;
  boardTitle: string;
  boardDescription: string;
  nodes: Node<CardData>[];
  edges: Edge[];
  setBoardId: (id: string | null) => void;
  setBoardTitle: (value: string) => void;
  setBoardDescription: (value: string) => void;
  setNodes: (nodes: Node<CardData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedId: (id: string | null) => void;
};

// Handles save/load/export/import operations and saved board selection.
export function useBoardPersistence({
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
}: UseBoardPersistenceParams) {
  const { savedBoards, saveBoard: persistBoard, loadBoard, saveFeedback } = useBoardStorage();
  const [selectedBoardId, setSelectedBoardId] = useState<string>("");

  const saveBoard = useCallback(() => {
    const id = boardId ?? `board-${Date.now()}`;
    const snapshot = {
      id,
      title: boardTitle.trim() || "Untitled Board",
      description: boardDescription.trim() || "",
      nodes,
      edges,
      savedAt: new Date().toISOString(),
    };
    setBoardId(id);
    setSelectedBoardId(id);
    persistBoard(snapshot);
  }, [
    boardId,
    boardTitle,
    boardDescription,
    nodes,
    edges,
    persistBoard,
    setBoardId,
  ]);

  const selectBoard = useCallback(
    (id: string) => {
      setSelectedBoardId(id);
      if (!id) return;
      const board = loadBoard(id);
      if (!board) return;
      setBoardId(board.id);
      setBoardTitle(board.title);
      setBoardDescription(board.description ?? "");
      setNodes(board.nodes as Node<CardData>[]);
      setEdges(board.edges as Edge[]);
      setSelectedId(null);
    },
    [
      loadBoard,
      setBoardId,
      setBoardTitle,
      setBoardDescription,
      setNodes,
      setEdges,
      setSelectedId,
    ],
  );

  const exportBoard = useCallback(() => {
    const payload = {
      id: boardId ?? null,
      title: boardTitle.trim() || "Untitled Board",
      description: boardDescription.trim() || "",
      nodes,
      edges,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeTitle = (payload.title || "board")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    link.download = `${safeTitle || "board"}-flow.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [boardId, boardTitle, boardDescription, nodes, edges]);

  const exportCanvas = useCallback(() => {
    const target = document.querySelector(
      ".todo-flow-journey .react-flow__viewport",
    ) as HTMLElement | null;
    if (!target) return;
    html2canvas(target, {
      backgroundColor: "#07090e",
      scale: 2,
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg", 0.92);
        const safeTitle = (boardTitle || "board")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        link.download = `${safeTitle || "board"}-flow.jpg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => {
        // Ignore export failures.
      });
  }, [boardTitle]);

  const importBoard = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = typeof reader.result === "string" ? reader.result : "";
          const parsed = JSON.parse(text) as {
            id?: string | null;
            title?: string;
            description?: string;
            nodes?: unknown;
            edges?: unknown;
          };
          if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
            return;
          }
          const nextId = parsed.id ?? `board-${Date.now()}`;
          setBoardId(nextId);
          setSelectedBoardId(nextId);
          setBoardTitle(parsed.title?.trim() || "Imported Board");
          setBoardDescription(parsed.description?.trim() || "");
          setNodes(parsed.nodes as Node<CardData>[]);
          setEdges(parsed.edges as Edge[]);
          setSelectedId(null);
        } catch {
          // Ignore invalid JSON.
        }
      };
      reader.readAsText(file);
    },
    [
      setBoardId,
      setBoardTitle,
      setBoardDescription,
      setNodes,
      setEdges,
      setSelectedId,
    ],
  );

  return {
    savedBoards,
    selectedBoardId,
    saveFeedback,
    saveBoard,
    selectBoard,
    exportBoard,
    exportCanvas,
    importBoard,
  };
}
