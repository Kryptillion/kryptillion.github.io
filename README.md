# Kryptillion

A daily superhero trivia game in the style of Krillion. Every day there are seven prompts across Marvel, DC, Invincible and The Boys, with 25 seconds to answer each. Any correct answer scores, but the rarer it is, the more it's worth.

Play at **https://kryptillion.github.io**

## How the site works

It is a static site served by GitHub Pages. There is no server and no database. Scores and streaks are saved in each player's own browser.

- `index.html` is the whole game: layout, art, animation, sound and answer matching.
- `questions.js` holds the issues currently live plus the history of every prompt ever published. It is scrambled so answers aren't readable at a glance.
- A new issue starts at midnight Eastern Time for every player.

## Tiers

| Tier | Points |
|---|---|
| Mainstream | 10 |
| Canon (the famous "obscure" pick everyone reaches for, or a technicality) | 15 |
| D-Lister | 30 |
| Mint Condition | 60 |
| First Issue | 85 |
| 1 in Kryptillion (one per prompt) | 100 |

## Adding issues

A weekly scheduled task writes the coming week's issues. To do it by hand:

1. `node tools/build.js --unpack` writes the live issues to `src/days/` so you can read or fix them. That folder is git-ignored, so plain-text answers never reach the public repo.
2. Add a file `src/days/YYYY-MM-DD.js` per day, seven prompts each, following `tools/TIERING.md`. `tools/PROMPT_IDEAS.md` has a list of prompt ideas.
3. `node tools/build.js --from YYYY-MM-DD` validates everything, drops days before that date, and rewrites `questions.js`. It refuses to build if a prompt was already published, if a prompt has fewer than 100 answers, if a prompt doesn't have exactly one 1 in Kryptillion answer, or if two answers share a name.
4. Commit `questions.js` and push. GitHub Pages updates within a minute or two.

## Credits

Fan-made and unofficial. Not affiliated with Marvel, DC, Image Comics, Skybound, Dynamite, Amazon or Krillion, which inspired the format. Answer lists are compiled from Wikipedia's character lists and articles.
