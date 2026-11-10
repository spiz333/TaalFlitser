# TaalFlitser

Maak een foto van je woordenlijst en krijg flitskaarten. Zwart-wit, minimaal.
Het lezen van de foto (OCR) gebeurt **in je browser** met [Tesseract](https://github.com/naptha/tesseract.js);
er is geen server, geen account en geen AI-dienst. Alles wordt lokaal opgeslagen (IndexedDB).

## Gebruiken

Serveer de map met een statische server, bijvoorbeeld `python3 -m http.server`, en open `http://localhost:8000`.
(Via `file://` werkt het niet, omdat de scanner een web worker gebruikt.)

1. Kies de taal/talen die op het papier staan (standaard NL + EN) en upload, sleep of plak (Ctrl/Cmd+V) een foto.
2. De woorden worden gelezen en als paren in een lijst gezet (`hond   dog`, `1. hond - dog`, `hond = dog`, of twee kolommen). Elk paar is aangevinkt, behalve regels waar de scanner onzeker over was.
3. Controleer en pas aan: tik op een woord om het te verbeteren, vink uit wat je niet wilt flitsen, wissel voor/achterkant, voeg woorden toe. Als je over een rij beweegt zie je waar het op de foto staat.
4. Kies **wat** je flitst (aangevinkt / moeilijke woorden / alles), de **volgorde** (door elkaar / in volgorde) en de **richting** (voor→achter, achter→voor, door elkaar), en druk op Start.
5. Typ het antwoord, Enter om te controleren, Enter voor de volgende. Fouten komen terug tot je ze goed hebt. Eronder zie je wat je fout had en kun je de fouten opnieuw doen.

Nakijken is slim: hoofdletters, accenten en leestekens tellen niet mee, een typfout of vergeten lidwoord is "bijna goed" (te zetten op streng), meerdere goede antwoorden kan met `/`, `;` of `,`, en tekst tussen haakjes is optioneel. "Toch goed" corrigeert een afkeuring.

Daarnaast: meerdere foto's per lijst, opnieuw lezen met een andere taal of indeling (woord/vertaling onder elkaar), NL/EN interface, omkeren van de kleuren, back-up exporteren/importeren.

## Techniek

Geen build-stap. `index.html`, `style.css`, `app.js` (interface), `scan.js` (voorbewerking, OCR, het splitsen in woordparen).
`vendor/tesseract/` bevat tesseract.js 5.1.1 (Apache-2.0), de WASM-kern en de taaldata (nl, en, fr, de, es; `4.0.0_best_int`), zodat het zonder internet werkt.

De foto wordt eerst bewerkt (schaduw en liniaallijnen weg, zwart-wit via een adaptieve drempel). Dat verbetert het lezen sterk bij foto's van papier.
Getypte of nette handgeschreven woorden lezen het best; controleer het resultaat altijd even.
