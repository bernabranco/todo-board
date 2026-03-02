import type { Node } from "reactflow";
import type { CardData } from "../../types";
import { SelectedCardEditor } from "../SelectedCardEditor/SelectedCardEditor";
import { CollapsibleCard } from "../../../ui/CollapsibleCard";
import styles from "./SelectedCardControlsCard.module.css";

type SelectedCardControlsCardProps = {
  selectedNode: Node<CardData> | null;
  onUpdateNode: (id: string, updates: Partial<CardData>) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function SelectedCardControlsCard({
  selectedNode,
  onUpdateNode,
  collapsed,
  onToggleCollapse,
}: SelectedCardControlsCardProps) {
  if(!selectedNode) {
    return null;
  }

  return (
    <CollapsibleCard
      title="Selected Card"
      collapsed={collapsed}
      onToggleCollapse={onToggleCollapse}
    >
      {!collapsed && selectedNode ? (
        <SelectedCardEditor
          selectedNode={selectedNode}
          onUpdateNode={onUpdateNode}
        />
      ) : (
        <div className={styles.empty}>Select a card to edit its details.</div>
      )}
    </CollapsibleCard>
  );
}
