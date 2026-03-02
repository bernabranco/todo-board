import type { BoardSnapshot } from "../../types";
import { BoardControlsCard } from "../BoardControlsCard/BoardControlsCard";
import "./BoardHud.css";

type BoardHudProps = {
  boardTitle: string;
  boardDescription: string;
  editMode: boolean;
  savedBoards: BoardSnapshot[];
  selectedBoardId: string;
  saveFeedback: {
    type: "success" | "error";
    message: string;
    timestamp: number;
  } | null;
  onAddCard: () => void;
  onToggleEditMode: () => void;
  onSaveBoard: () => void;
  onExportBoard: () => void;
  onExportCanvas: () => void;
  onImportBoard: (file: File) => void;
  onCreateBoard: () => void;
  onBoardTitleChange: (value: string) => void;
  onBoardDescriptionChange: (value: string) => void;
  onSelectBoardId: (value: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function BoardHud({
  boardTitle,
  boardDescription,
  editMode,
  savedBoards,
  selectedBoardId,
  saveFeedback,
  onAddCard,
  onToggleEditMode,
  onSaveBoard,
  onExportBoard,
  onExportCanvas,
  onImportBoard,
  onCreateBoard,
  onBoardTitleChange,
  onBoardDescriptionChange,
  onSelectBoardId,
  collapsed,
  onToggleCollapse,
}: BoardHudProps) {
  return (
    <div className="todo-gallery-hud">
      <BoardControlsCard
        boardTitle={boardTitle}
        boardDescription={boardDescription}
        savedBoards={savedBoards}
        selectedBoardId={selectedBoardId}
        saveFeedback={saveFeedback}
        onSaveBoard={onSaveBoard}
        onExportBoard={onExportBoard}
        onExportCanvas={onExportCanvas}
        onImportBoard={onImportBoard}
        onCreateBoard={onCreateBoard}
        onBoardTitleChange={onBoardTitleChange}
        onBoardDescriptionChange={onBoardDescriptionChange}
        onSelectBoardId={onSelectBoardId}
        onAddCard={onAddCard}
        onToggleEditMode={onToggleEditMode}
        editMode={editMode}
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
      />
    </div>
  );
}
