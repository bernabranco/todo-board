import type { Node } from "reactflow";
import type { CardData } from "../../types";
import { CloseButton } from "../../../ui/CloseButton";
import { SelectedCardEditor } from "../SelectedCardEditor/SelectedCardEditor";
import "./SelectedCardModal.css";

type SelectedCardModalProps = {
  selectedNode: Node<CardData> | null;
  editMode: boolean;
  onUpdateNode: (id: string, updates: Partial<CardData>) => void;
  onClose: () => void;
};

export function SelectedCardModal({
  selectedNode,
  editMode,
  onUpdateNode,
  onClose,
}: SelectedCardModalProps) {
  if (!selectedNode) return null;

  return (
    <div className="todo-card-modal-overlay" onClick={onClose}>
      <div
        className="todo-card-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit card"
      >
        <div className="todo-card-modal-header">
          <div className="todo-card-modal-title">Edit Card</div>
          <CloseButton className="todo-card-modal-close" onClick={onClose} />
        </div>
        <div className="todo-card-modal-body">
          <SelectedCardEditor
            selectedNode={selectedNode}
            editMode={editMode}
            onUpdateNode={onUpdateNode}
          />
        </div>
      </div>
    </div>
  );
}
