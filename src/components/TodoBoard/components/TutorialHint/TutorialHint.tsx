import "./TutorialHint.css";

export function TutorialHint() {
  return (
    <div className="todo-tutorial-hint">
      <div className="todo-tutorial-title">Quick Guide</div>
      <ul>
        <li>Click a card to edit its title, description, and status.</li>
        <li>Drag cards to rearrange the flow.</li>
        <li>Connect cards by dragging from a handle.</li>
        <li>Use Save/Export to keep a snapshot.</li>
      </ul>
    </div>
  );
}
