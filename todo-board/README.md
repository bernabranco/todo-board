# Todo Board

A visual, node-based todo board built with React and React Flow. Create cards, connect tasks, edit details, and save/export your boards. Includes Markdown support for card descriptions, JSON import/export, and JPG canvas export.

## Features
- Visual flow board with draggable cards and connections
- Card editor with Markdown support
- Board save/load (localStorage)
- JSON export/import
- JPG export of the canvas
- Edit mode toggle to lock or unlock layout

## Tech Stack
- React 19 + TypeScript
- Vite
- React Flow
- react-markdown
- html2canvas

## Getting Started

### Prerequisites
- Node.js 18+ recommended

### Install
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Usage
- Click a card to edit its title, description, and status.
- Drag cards to rearrange the layout.
- Connect cards using the handles.
- Use **Save Board** to persist to localStorage.
- Use **Export** to download a JSON snapshot.
- Use **Import** to load a previously exported board.
- Use **Export JPG** to download a canvas image.

## Project Structure (Key Files)
```
src/
  components/
    TodoBoard/
      components/
      config/
      data/
      hooks/
      TodoBoard.tsx
  App.tsx
  main.tsx
```

## Configuration
Centralized defaults live in:
- `src/components/TodoBoard/config/boardDefaults.ts`

## Notes
- Board data is stored in the browser (localStorage). Clearing site data removes saved boards.
- JPG export captures the canvas viewport only.

## License
MIT
