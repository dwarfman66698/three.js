# Open Field — Three.js FPS

Browser-based first-person 3D game built with Three.js, Vite, and WebGL.

## Run

```bash
npm install
npm run dev
```

Open the Vite URL (default http://localhost:5173/). Click the page to capture the mouse and play.

## Controls

| Key | Action |
| --- | --- |
| W A S D | Move |
| Mouse | Look |
| Space | Jump |
| Shift | Sprint |
| Esc | Release mouse |

## Project layout

- `index.html` — full-viewport game shell
- `src/main.js` — renderer, loop, wiring
- `src/world.js` — grass ground, sky, sunlight
- `src/player.js` — PointerLockControls + movement
- `src/style.css` — immersive full-screen layout
