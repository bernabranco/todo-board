import type { Node } from "reactflow";
import type { CardData } from "../../types";
import { SelectedCardEditor } from "../SelectedCardEditor/SelectedCardEditor";
import styles from "./SelectedCardControlsCard.module.css";

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
  const isCollapsed = !selectedNode;

  return (
    !isCollapsed && (
      <div
        className={`${styles.section} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <div className={styles.header}>
          <div className={styles.sectionTitle}>Selected Card</div>
        </div>
        <SelectedCardEditor
          selectedNode={selectedNode}
          editMode={editMode}
          onUpdateNode={onUpdateNode}
        />
      </div>
    )
  );
}
