# DreamBuild — Website Builder Starter

A frontend-only starter for a visual website builder, built with React + Vite.

## What works in this starter
- Responsive dashboard and sample project cards
- Template gallery with search and selectable starter templates
- Visual editor foundation with desktop/mobile canvas modes
- Add hero, text, image, feature, and call-to-action sections
- Select sections and edit their title, headline, supporting copy, button label, background and text colours
- Reorder sections and delete sections
- Basic local UI feedback for preview and publish actions

## What is not connected yet
- User accounts and cloud saving
- Real hosting / one-click publishing
- Drag-and-drop reordering (the starter currently has move-up and selection controls)
- Full font-size, spacing, image-upload, and responsive breakpoint controls
- Undo/redo history

The editor currently keeps edits in React state, so a refresh resets the project. Supabase persistence and actual deployment are planned follow-up steps.

## Run locally
Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To make a production build:

```bash
npm run build
```

## Android workflow
You can download and unzip this project on Android, but a React/Vite project needs a compatible environment to run/build and a hosting provider to publish. You do not need Replit specifically; we can choose a browser-based environment or a hosting workflow in the next step.
