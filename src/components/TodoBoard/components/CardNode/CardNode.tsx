import ReactMarkdown from "react-markdown";
import { Handle, Position, type NodeProps } from "reactflow";
import type { CardNodeData } from "../../types";
import { CloseButton } from "../../../ui/CloseButton";
import { EditButton } from "../../../ui/EditButton";
import styles from "./CardNode.module.css";

const statusLabel: Record<CardNodeData["status"], string> = {
  todo: "Todo",
  doing: "In Progress",
  done: "Done",
};

export function CardNode({ id, data, selected }: NodeProps<CardNodeData>) {
  return (
    <div
      className={[
        styles.node,
        data.status === "todo"
          ? styles.nodeTodo
          : data.status === "doing"
            ? styles.nodeDoing
            : styles.nodeDone,
        selected ? styles.nodeSelected : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <CloseButton
        className={styles.nodeDelete}
        onClick={(event) => {
          event.stopPropagation();
          data.onDelete(id);
        }}
        aria-label="Delete card"
      />
      <EditButton
        className={styles.nodeEditLink}
        onClick={(event) => {
          event.stopPropagation();
          data.onEdit(id);
        }}
        aria-label="Edit card"
      />
      <Handle
        type="target"
        position={Position.Top}
        className={styles.nodeHandle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className={styles.nodeHandle}
      />
      <Handle
        type="target"
        position={Position.Left}
        className={styles.nodeHandle}
        id="left-target"
      />
      <Handle
        type="source"
        position={Position.Left}
        className={styles.nodeHandle}
        id="left-source"
      />
      <Handle
        type="target"
        position={Position.Right}
        className={styles.nodeHandle}
        id="right-target"
      />
      <Handle
        type="source"
        position={Position.Right}
        className={styles.nodeHandle}
        id="right-source"
      />
      <div className={styles.nodeTitle}>{data.title}</div>
      <div className={styles.nodeBody}>
        <ReactMarkdown>{data.description}</ReactMarkdown>
      </div>
      <div
        className={[
          styles.nodeStatus,
          data.status === "todo"
            ? styles.nodeStatusTodo
            : data.status === "doing"
              ? styles.nodeStatusDoing
              : styles.nodeStatusDone,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {statusLabel[data.status]}
      </div>
    </div>
  );
}
