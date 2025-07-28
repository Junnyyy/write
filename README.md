# Write

> [!NOTE]
> This is a project I built for fun. I wanted to try out Dexie to build something with IndexedDB. I'm currently adding sync to the project.

A simple, beautiful, and powerful place to speak your mind. Write is a modern writing application built with Next.js and Tauri, designed for distraction-free writing with local storage.

## Features

- **Rich Text Editor**: Powered by Tiptap for a smooth writing experience
- **Local Storage**: All documents are stored locally using IndexedDB
- **Auto-Save**: Automatic saving with debounced updates
- **Document Management**: Sidebar for organizing and managing multiple documents
- **Keyboard Shortcuts**: Command palette and shortcuts for efficient workflow
- **Cross-Platform**: Desktop app via Tauri and web compatibility

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Editor**: Tiptap
- **Database**: Dexie
- **Desktop**: Tauri
- **Styling**: Tailwind CSS
- **State Management**: Zustand

## Getting Started

### Development

```bash
# Install dependencies
pnpm install

# Run the web development server
pnpm dev

# or with Turbopack
pnpm dev:turbo

# Run the Tauri desktop app in development
pnpm tauri:dev
```

Open [http://localhost:3000](http://localhost:3000) to see the web version.

### Building

```bash
# Build for web
pnpm build

# Build the desktop app
pnpm tauri:build
```

## Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open command palette
- `Cmd/Ctrl + S` - Save current document
- `Cmd/Ctrl + B` - Toggle sidebar

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/lib/` - Utilities and database functions
- `src/store/` - Zustand state management
- `src-tauri/` - Tauri desktop app configuration

## Credits

ChatGPT integration inspired by [Farza's freewrite](https://github.com/farzaa/freewrite) - [freewrite.io](https://freewrite.io/)
