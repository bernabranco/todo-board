import type { CardData } from "../types";
import type { Edge, Node } from "reactflow";

export const BOARDS_STORAGE_KEY = "todo-gallery-boards";

export const DEFAULT_BOARD_TITLE = "Todo Flow Board";
export const DEFAULT_BOARD_DESCRIPTION =
  "Plan the flow, connect tasks, and track progress.";

export const DEFAULT_CARD_TITLE = "New Card";
export const DEFAULT_CARD_DESCRIPTION = "Add details here.";

export const initialNodes: Node<CardData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      title: "Todo",
      description: "Add the first steps to your plan.",
      status: "todo",
    },
    type: "card",
  },
  {
    id: "2",
    position: { x: 300, y: 140 },
    data: {
      title: "In Progress",
      description: "Work happening right now.",
      status: "doing",
    },
    type: "card",
  },
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
];
