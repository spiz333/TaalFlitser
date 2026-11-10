# TaalFlitser

Flashcards from pictures. **No AI, no accounts, no server**: everything is stored in your browser (IndexedDB).
Black and white, minimal.

## Use

Open `index.html` through any static server, for example `python3 -m http.server` and visit `http://localhost:8000`.

1. Create a deck.
2. Drop, paste (Ctrl/Cmd+V) or browse for pictures. The file name becomes the answer (`la_boulangerie.jpg` becomes "la boulangerie"; camera names like `IMG_2231` are ignored).
3. Optionally add a prompt, or click **Hide parts** and drag over the picture. Every region becomes its own card with its own answer (image occlusion: great for labelled diagrams, notes, maps).
4. **Study**. Space flips, `1-4` grades (Again / Hard / Good / Easy), `Esc` leaves.

## Features

- Picture cards and image-occlusion cards, built by rules, not by a model
- Spaced repetition (SM-2 style): due cards, 20 new cards per session, interval preview on each grade button
- Optional typed answers with accent/case-insensitive checking and typo tolerance; several accepted answers via `/`, `;` or `|`
- Cram mode (reviews everything without touching the schedule)
- Today count and streak
- Export / import backup as one JSON file
- English / Nederlands, and an invert (black on white / white on black) toggle
- Pictures are downscaled to 1600px on import to keep the library light

No dependencies, no build step: `index.html`, `style.css`, `app.js`.
