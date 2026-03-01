import { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import "./TodoBoard.css";

import { BoardHud } from "./components/BoardHud/BoardHud";
import { CardNode } from "./components/CardNode/CardNode";
import { TutorialHint } from "./components/TutorialHint/TutorialHint";
import { useTodoBoardState } from "./hooks/useTodoBoardState";

export default function TodoBoard() {
  const nodeTypes = useMemo(() => ({ card: CardNode }), []);
  const {
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
    onConnect,
    onEdgeClick,
    onNodeClick,
  } = useTodoBoardState();

  return (
    <div
      className={`todo-gallery-journey todo-flow-journey ${editMode ? "is-edit" : ""}`}
    >
      <div className="todo-board-meta">
        <div className="todo-board-title">{boardTitle || "Untitled Board"}</div>
        {boardDescription ? (
          <div className="todo-board-description">{boardDescription}</div>
        ) : null}
      </div>
      <BoardHud
        boardTitle={boardTitle}
        boardDescription={boardDescription}
        editMode={editMode}
        savedBoards={savedBoards}
        selectedBoardId={selectedBoardId}
        selectedNode={selectedNode}
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
        onUpdateNode={updateNode}
      />
      <TutorialHint />
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={editMode}
        nodesConnectable={editMode}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeClick={onEdgeClick}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
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
        <Controls className="todo-flow-controls" />
      </ReactFlow>
    </div>
  );
}
