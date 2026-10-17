# DreamBuild AI — Futuristic Website Builder

## Run locally
1. Install Node.js (18+).
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL shown by Vite.
4. Run `npm run build` to create a production build in `dist/`.

## Current prototype features
- Dashboard and sample project cards
- Template gallery with search and template-to-editor flow
- Visual editor with editable text, section backgrounds and text colours
- Add and remove page sections
- Desktop/mobile preview mode
- Save project state to this browser/device using localStorage
- Export the current page as a standalone HTML file
- Futuristic dark UI refresh with violet/cyan accents, subtle motion, and responsive styling
- AI Studio prompt panel that creates an editable local starter draft (not real AI generation yet)

## AI Studio status
- The AI Studio currently turns a user prompt into a local editable starter layout using simple frontend logic. It is not connected to an AI model/API yet.
- A real model integration will require a compatible provider and a secure server-side integration; do not put API secrets in frontend code.

## Notes
- Projects are stored locally in the current browser/device; they are not cloud-synced.
- Export creates a standalone HTML file. It does not publish a live website.
- To update a Vercel deployment connected to GitHub, upload/commit these project files to the connected repository. Vercel can automatically deploy new commits when Git integration is enabled.
