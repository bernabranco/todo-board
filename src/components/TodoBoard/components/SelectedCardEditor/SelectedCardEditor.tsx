import type { Node } from "reactflow";
import type { CardData, CardStatus } from "../../types";
import { SelectField } from "../../../ui/SelectField";
import "./SelectedCardEditor.css";

type SelectedCardEditorProps = {
  selectedNode: Node<CardData> | null;
  editMode: boolean;
  onUpdateNode: (id: string, updates: Partial<CardData>) => void;
};

// Inline editor for the currently selected card.
export function SelectedCardEditor({
  selectedNode,
  editMode,
  onUpdateNode,
}: SelectedCardEditorProps) {
  if (!selectedNode) {
    return (
      <div className="todo-gallery-empty">Click a card to edit its details.</div>
    );
  }

  const data = selectedNode.data as CardData;

  return (
    <div className="todo-gallery-form">
      <label>
        Title
        <input
          value={data.title}
          onChange={(event) =>
            onUpdateNode(selectedNode.id, { title: event.target.value })
          }
          disabled={!editMode}
        />
      </label>
      <label>
        Description
        <textarea
          value={data.description}
          onChange={(event) =>
            onUpdateNode(selectedNode.id, { description: event.target.value })
          }
          disabled={!editMode}
        />
      </label>
      <label>
        Status
        <SelectField
          value={data.status}
          onChange={(event) =>
            onUpdateNode(selectedNode.id, {
              status: event.target.value as CardStatus,
            })
          }
          disabled={!editMode}
        >
          <option value="todo">Todo</option>
          <option value="doing">In Progress</option>
          <option value="done">Done</option>
        </SelectField>
      </label>
    </div>
  );
}
