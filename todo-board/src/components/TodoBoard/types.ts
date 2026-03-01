import type { Edge, Node } from "reactflow";

export type CardStatus = "todo" | "doing" | "done";

export type CardData = {
  title: string;
  description: string;
  status: CardStatus;
};

export type CardNodeData = CardData & {
  onDelete: (id: string) => void;
};

export type BoardSnapshot = {
  id: string;
  title: string;
  description?: string;
  nodes: Node<CardData>[];
  edges: Edge[];
  savedAt: string;
};
