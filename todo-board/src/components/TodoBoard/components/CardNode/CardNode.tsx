import ReactMarkdown from "react-markdown";
import { Handle, Position, type NodeProps } from "reactflow";
import type { CardNodeData } from "../../types";
import { Button } from "../../../ui/Button";
import "../../../ui/styles.css";
import "./CardNode.css";

export function CardNode({ id, data, selected }: NodeProps<CardNodeData>) {
  return (
    <div
      className={`todo-node todo-node-${data.status} ${selected ? "is-selected" : ""}`}
    >
      <Button
        text="×"
        size="icon"
        fullWidth={false}
        color="gray"
        className="todo-node-delete"
        onClick={(event) => {
          event.stopPropagation();
          data.onDelete(id);
        }}
        aria-label="Delete card"
      />
      {/* Connection handles for linking cards in any direction. */}
      <Handle
        type="target"
        position={Position.Top}
        className="todo-node-handle"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="todo-node-handle"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="todo-node-handle"
        id="left-target"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="todo-node-handle"
        id="left-source"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="todo-node-handle"
        id="right-target"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="todo-node-handle"
        id="right-source"
      />
      <div className="todo-node-title">{data.title}</div>
      <div className="todo-node-body">
        <ReactMarkdown>{data.description}</ReactMarkdown>
      </div>
      <div className={`todo-node-status todo-node-status-${data.status}`}>
        {data.status === "doing"
          ? "In Progress"
          : data.status === "done"
            ? "Done"
            : "Todo"}
      </div>
    </div>
  );
}
