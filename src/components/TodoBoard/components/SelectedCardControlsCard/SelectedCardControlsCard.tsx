import type { Node } from "reactflow";
import type { CardData } from "../../types";
import { SelectedCardEditor } from "../SelectedCardEditor/SelectedCardEditor";

type SelectedCardControlsCardProps = {
  selectedNode: Node<CardData> | null;
  editMode: boolean;
  onUpdateNode: (id: string, updates: Partial<CardData>) => void;
};

export function SelectedCardControlsCard({
  selectedNode,
  editMode,
  onUpdateNode,
}: SelectedCardControlsCardProps) {
  return (
    <div className="todo-hud-section">
      <div className="todo-hud-section-title">Selected Card</div>
      <SelectedCardEditor
        selectedNode={selectedNode}
        editMode={editMode}
        onUpdateNode={onUpdateNode}
      />
    </div>
  );
}
