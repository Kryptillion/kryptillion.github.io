# How to pick prompts and tier answers

These rules keep Kryptillion as hard as Krillion. The weekly update follows them for every new issue.

Krillion's scale has a 15-point "Too Clever" tier for the answer that feels unusual but is a predictable clever choice. Kryptillion's 15-point tier does the same job. Most of the difficulty comes from that trap and from strict tiering, not from small answer pools.

## Prompts

- Every prompt needs a big answer pool, ideally 100 or more valid answers, built from a published list (a Wikipedia list article, a Fandom category, or the publisher's database). Record the source in a comment at the top of the day file.
- Check every list against at least two sources (a Wikipedia list plus the character's main article, a team article, or a Fandom category). A single list misses real answers, such as a well-known villain a Wikipedia enemies list leaves out.
- If a prompt counts screen versions ("comics or screen", or any prompt about a character with movies or shows), also pull the villains or members from that show's or film's character list (for example List of The Flash characters for the CW series, or the MCU film's cast).
- Favor rosters fans haven't memorized (Captain America villains, Green Lanterns, Legion of Super-Heroes) over the ones every fan rehearses (X-Men, Batman villains, Spider-Man villains). Use the rehearsed ones rarely.
- Never publish a prompt already in the `used` history. The build refuses to.
- No hints. A prompt says only what counts as a valid answer. The `f` (franchise) field is for bookkeeping and is never shown to players.

## Tiers

| Tier | Points | What goes there |
|---|---|---|
| Mainstream (a) | 10 | The 7 to 10 answers everyone blurts out. Anyone central to a movie or live-action show. |
| Canon (t) | 15 | The trap. The famous "obscure" pick fans reach for to seem clever (characters known for being lame, joke characters, meme favorites), and technicalities (a character who only counts through a loophole or a single crossover). |
| D-Lister (b) | 30 | Supporting roles in movies, shows, cartoons and games, plus characters any regular reader knows. |
| Mint Condition (c) | 60 | Comics-first characters with real runs that dedicated readers know. One-episode TV versions also land here. |
| First Issue (d) | 85 | Comics only, few appearances, no adaptations. |
| 1 in Kryptillion (g) | 100 | Exactly one per prompt. The single most obscure valid answer. |

## Rules for the 1 in Kryptillion answer

- It must be on the source list, so it is provably valid.
- It must have very few appearances, ideally one or two stories.
- It can't have appeared in a movie or TV show, and it can't be meme-famous or on "worst character" lists.
- It is never shown to players, so it can't be passed along. A player only sees it if they type it.

## Before publishing

Run `node tools/build.js`. It checks seven prompts per day, exactly one 1 in Kryptillion answer per prompt, no name collisions between answers, and no reused prompts.
