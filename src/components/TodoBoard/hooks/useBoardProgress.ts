import { useMemo } from "react";
import type { CardData } from "../types";
import type { Node } from "reactflow";

type BoardProgress = {
  total: number;
  done: number;
  percent: number;
};

export function useBoardProgress(nodes: Node<CardData>[]): BoardProgress {
  return useMemo(() => {
    const total = nodes.length;
    const done = nodes.filter(
      (node) => (node.data as { status?: string })?.status === "done",
    ).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percent };
  }, [nodes]);
}
