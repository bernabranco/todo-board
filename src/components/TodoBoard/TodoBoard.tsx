import { useMemo } from "react";
import ReactFlow, { Background, MiniMap, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import "./TodoBoard.css";

import { BoardHud } from "./components/BoardHud/BoardHud";
import { CardNode } from "./components/CardNode/CardNode";
import { SelectedCardControlsCard } from "./components/SelectedCardControlsCard/SelectedCardControlsCard";
import { useTodoBoardState } from "./hooks/useTodoBoardState";
import { useBoardProgress } from "./hooks/useBoardProgress";
import { ProgressBar } from "../ui/ProgressBar";

export default function TodoBoard() {
  const nodeTypes = useMemo(() => ({ card: CardNode }), []);
  const {
    nodes,
    nodesWithHandlers,
    edges,
    selectedNode,
    editMode,
    boardTitle,
    boardDescription,
    savedBoards,
    selectedBoardId,
    saveFeedback,
    onNodesChange,
    onEdgesChange,
    addCard,
    updateNode,
    toggleEditMode,
    saveBoard,
    exportBoard,
    importBoard,
    exportCanvas,
    createNewBoard,
    selectBoard,
    setBoardTitle,
    setBoardDescription,
    clearSelectedCard,
    boardControlsCollapsed,
    toggleBoardControls,
    selectedCardCollapsed,
    toggleSelectedCard,
    onConnect,
    onEdgeClick,
    onNodeClick,
  } = useTodoBoardState();

  const progress = useBoardProgress(nodes);

  return (
    <div
      className={`todo-gallery-journey todo-flow-journey ${editMode ? "is-edit" : ""}`}
    >
      <div className="todo-board-meta">
        <div className="todo-board-title">{boardTitle || "Untitled Board"}</div>
        {boardDescription ? (
          <div className="todo-board-description">{boardDescription}</div>
        ) : null}
        <ProgressBar
          total={progress.total}
          done={progress.done}
          percent={progress.percent}
        />
      </div>
      <BoardHud
        boardTitle={boardTitle}
        boardDescription={boardDescription}
        editMode={editMode}
        savedBoards={savedBoards}
        selectedBoardId={selectedBoardId}
        saveFeedback={saveFeedback}
        onAddCard={addCard}
        onToggleEditMode={toggleEditMode}
        onSaveBoard={saveBoard}
        onExportBoard={exportBoard}
        onExportCanvas={exportCanvas}
        onImportBoard={importBoard}
        onCreateBoard={createNewBoard}
        onBoardTitleChange={setBoardTitle}
        onBoardDescriptionChange={setBoardDescription}
        onSelectBoardId={selectBoard}
        collapsed={boardControlsCollapsed}
        onToggleCollapse={toggleBoardControls}
      />
      <div className="todo-selected-card-panel">
        <SelectedCardControlsCard
          selectedNode={selectedNode}
          editMode={editMode}
          onUpdateNode={updateNode}
          collapsed={selectedCardCollapsed}
          onToggleCollapse={toggleSelectedCard}
        />
      </div>
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        defaultEdgeOptions={{
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 10,
            height: 10,
            color: "rgba(255, 255, 255, 0.7)",
          },
          style: {
            stroke: "rgba(255, 255, 255, 0.6)",
            strokeWidth: 2,
          },
        }}
        nodeTypes={nodeTypes}
        nodesDraggable={editMode}
        nodesConnectable={editMode}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeClick={onEdgeClick}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={clearSelectedCard}
        fitView={true}
        fitViewOptions={{ padding: 2 }}
      >
        <Background color="#2a334a" gap={28} />
        <MiniMap
          pannable
          zoomable
          className="todo-flow-minimap"
          nodeStrokeWidth={2}
          nodeColor={(node) => {
            const status = (node.data as { status?: string })?.status;
            if (status === "doing") return "#66b3ff";
            if (status === "done") return "#7de2a5";
            return "#ffd166";
          }}
          nodeStrokeColor="#0b0f18"
          maskColor="rgba(6, 8, 12, 0.7)"
        />
      </ReactFlow>
    </div>
  );
}
