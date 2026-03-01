import { useCallback, useState } from "react";
import { BOARDS_STORAGE_KEY } from "../data/initialBoard";
import type { BoardSnapshot } from "../types";

type SaveFeedback = {
  type: "success" | "error";
  message: string;
  timestamp: number;
};

export function useBoardStorage() {
  const [savedBoards, setSavedBoards] = useState<BoardSnapshot[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(BOARDS_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored) as BoardSnapshot[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [saveFeedback, setSaveFeedback] = useState<SaveFeedback | null>(null);

  const saveBoard = useCallback(
    (snapshot: BoardSnapshot) => {
      setSavedBoards((prev) => {
        const next = prev.some((board) => board.id === snapshot.id)
          ? prev.map((board) => (board.id === snapshot.id ? snapshot : board))
          : [snapshot, ...prev];
        try {
          if (typeof window === "undefined") {
            throw new Error("Storage unavailable");
          }
          window.localStorage.setItem(
            BOARDS_STORAGE_KEY,
            JSON.stringify(next),
          );
          setSaveFeedback({
            type: "success",
            message: "Board saved.",
            timestamp: Date.now(),
          });
        } catch {
          setSaveFeedback({
            type: "error",
            message: "Unable to save to local storage.",
            timestamp: Date.now(),
          });
        }
        return next;
      });
    },
    [],
  );

  const loadBoard = useCallback(
    (id: string) => savedBoards.find((item) => item.id === id) ?? null,
    [savedBoards],
  );

  return { savedBoards, saveBoard, loadBoard, saveFeedback };
}
