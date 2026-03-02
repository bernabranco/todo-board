import type { ReactNode } from "react";
import { ArrowIcon } from "./ArrowIcon";
import styles from "./CollapsibleCard.module.css";

type CollapsibleCardProps = {
  title: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  children: ReactNode;
};

export function CollapsibleCard({
  title,
  collapsed,
  onToggleCollapse,
  children,
}: CollapsibleCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <button
          type="button"
          className={styles.toggle}
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
        >
          <ArrowIcon
            direction={collapsed ? "down" : "up"}
            className={styles.toggleIcon}
          />
        </button>
      </div>
      <div className={collapsed ? styles.bodyCollapsed : styles.body}>
        {children}
      </div>
    </div>
  );
}
