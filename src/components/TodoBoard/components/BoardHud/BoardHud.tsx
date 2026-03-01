import type { Node } from "reactflow";
import type { BoardSnapshot, CardData } from "../../types";
import { BoardControlsCard } from "../BoardControlsCard/BoardControlsCard";
import { SelectedCardControlsCard } from "../SelectedCardControlsCard/SelectedCardControlsCard";
import "./BoardHud.css";

type BoardHudProps = {
  boardTitle: string;
  boardDescription: string;
  editMode: boolean;
  savedBoards: BoardSnapshot[];
  selectedBoardId: string;
  selectedNode: Node<CardData> | null;
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
  onUpdateNode: (id: string, updates: Partial<CardData>) => void;
};

export function BoardHud({
  boardTitle,
  boardDescription,
  editMode,
  savedBoards,
  selectedBoardId,
  selectedNode,
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
  onUpdateNode,
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
      />
      <SelectedCardControlsCard
        selectedNode={selectedNode}
        editMode={editMode}
        onUpdateNode={onUpdateNode}
      />
    </div>
  );
}
