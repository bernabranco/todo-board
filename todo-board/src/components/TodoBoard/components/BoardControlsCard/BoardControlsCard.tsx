import { useRef } from "react";
import type { BoardSnapshot } from "../../types";
import { Button } from "../../../ui/Button";
import "../../../ui/styles.css";
import "./BoardControlsCard.css";

type BoardControlsCardProps = {
  boardTitle: string;
  boardDescription: string;
  savedBoards: BoardSnapshot[];
  selectedBoardId: string;
  saveFeedback: {
    type: "success" | "error";
    message: string;
    timestamp: number;
  } | null;
  onSaveBoard: () => void;
  onExportBoard: () => void;
  onExportCanvas: () => void;
  onImportBoard: (file: File) => void;
  onCreateBoard: () => void;
  onBoardTitleChange: (value: string) => void;
  onBoardDescriptionChange: (value: string) => void;
  onSelectBoardId: (value: string) => void;
  onAddCard: () => void;
  onToggleEditMode: () => void;
  editMode: boolean;
};

export function BoardControlsCard({
  boardTitle,
  boardDescription,
  savedBoards,
  selectedBoardId,
  saveFeedback,
  onSaveBoard,
  onExportBoard,
  onExportCanvas,
  onImportBoard,
  onCreateBoard,
  onBoardTitleChange,
  onBoardDescriptionChange,
  onSelectBoardId,
  onAddCard,
  onToggleEditMode,
  editMode,
}: BoardControlsCardProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onImportBoard(file);
    event.target.value = "";
  };

  return (
    <div className="todo-hud-section">
      <div className="todo-hud-section-title">Board</div>
      {saveFeedback ? (
        <div
          className={`todo-gallery-feedback todo-gallery-feedback-${saveFeedback.type}`}
          key={saveFeedback.timestamp}
        >
          {saveFeedback.message}
        </div>
      ) : null}
      <div className="todo-gallery-form">
        <div className="todo-board-row">
          <select
            value={selectedBoardId}
            onChange={(event) => onSelectBoardId(event.target.value)}
          >
            <option value="">Select a saved board</option>
            {savedBoards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
        </div>
        <div className="todo-board-actions-grid">
          <div className="todo-board-actions-row">
            <Button text="New Board" color="default" onClick={onCreateBoard} />
            <Button text="Save Board" color="default" onClick={onSaveBoard} />
          </div>
          <div className="todo-board-actions-row">
            <Button text="Import" color="default" onClick={handleImportClick} />
            <Button text="Export" color="default" onClick={onExportBoard} />
          </div>
          <div className="todo-board-actions-row">
            <Button
              text="Export JPG"
              color="default"
              onClick={onExportCanvas}
            />
            <span className="todo-board-action-spacer" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImportChange}
            className="todo-board-file-input"
          />
        </div>
        <label>
          Board Title
          <input
            value={boardTitle}
            onChange={(event) => onBoardTitleChange(event.target.value)}
          />
        </label>
        <label>
          Board Description
          <textarea
            value={boardDescription}
            onChange={(event) => onBoardDescriptionChange(event.target.value)}
          />
        </label>
      </div>
      <div className="todo-gallery-actions">
        <div className="todo-gallery-action-group">
          <Button text="New Card" color="default" onClick={onAddCard} />
        </div>
        <div className="todo-gallery-action-group">
          <Button
            text={editMode ? "Exit Edit" : "Edit Mode"}
            color="default"
            onClick={onToggleEditMode}
          />
        </div>
      </div>
    </div>
  );
}
