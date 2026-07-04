# Jahangir Hussen — Portfolio

Multi-page personal portfolio for **Jahangir Hussen** (CSE Graduate · ML & NLP Researcher · Data Science & AI Enthusiast · Lead Developer). Pure HTML/CSS/JS — no build step required.

## Structure

```
JAHANGIR-HUSSEN-PORTFOLIO/
├── index.html, about.html, projects.html, research.html, experience.html,
│   skills.html, achievements.html, gallery.html, play-zone.html, resume.html, contact.html
├── components/        # navbar.html, footer.html, welcome-screen.html, project-card.html,
│                       # publication-card.html, game-card.html — loaded via component-loader.js
├── assets/
│   ├── css/            # style.css, responsive.css, animations.css, games.css
│   ├── js/              # main.js, component-loader.js, particles.js, theme.js, typing.js, games.js
│   ├── images/          # profile/, projects/, gallery/, certificates/
│   ├── videos/
│   └── pdf/             # Jahangir_Hussen_CV.pdf
├── games/
│   ├── reaction-speed-test/  (index.html, style.css, game.js)
│   ├── tic-tac-toe/          (index.html, style.css, game.js — minimax AI)
│   └── flappy-box/           (index.html, style.css, game.js — canvas game)
├── data/               # projects.json, publications.json, achievements.json
└── favicon.ico
```

## Running locally

Static site — serve the folder with any local server (fetch() requires http://, not file://):

```
npx serve .
```

or use VS Code "Live Server" extension, then open `index.html`.

## Theme system

Two themes toggled via the navbar button (🌙 / ☀️), persisted in `localStorage`:
- **Premium AI Dark** (default) — neon blue/purple accents on near-black background.
- **Google Glass White** — Google-color accents on white/glass background.

## Notes

- `assets/pdf/Jahangir_Hussen_CV.pdf` and gallery/profile images are placeholders — replace with real files.
- Project, publication, and achievement data is driven by the JSON files in `data/`; edit those to update site content without touching HTML.
