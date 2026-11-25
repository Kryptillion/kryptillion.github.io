# How to pick prompts and tier answers

These rules keep Kryptillion as hard as Krillion. The weekly update follows them for every new issue.

Krillion's scale has a 15-point "Too Clever" tier for the answer that feels unusual but is a predictable clever choice. Kryptillion's 15-point tier does the same job. Most of the difficulty comes from that trap and from strict tiering, not from small answer pools.

## Prompts

- Every prompt needs at least 100 valid answers. The build refuses a prompt with fewer. If a prompt's fully sourced list comes up short, swap it for a prompt with a bigger pool. Never pad a list with invented, doubtful or invalid names to reach 100.
- Build lists the way Krillion does: gather every source the prompt calls for, then merge and clean them into one answer set. Use as many sources as it takes, never just one or two: Wikipedia list articles, the main character, team and team-membership articles, fan wikis such as the Marvel and DC databases on Fandom, and other encyclopedia or reference pages. A single list misses real answers, such as a well-known villain a Wikipedia enemies list leaves out. A missed source is the usual reason a fair answer goes missing.
- If a prompt counts screen versions ("comics or screen", or any prompt about a character with movies or shows), also pull the villains or members from every relevant show, film, cartoon and game character or cast list (for example List of The Flash characters for the CW series, or the MCU film's cast).
- If a source page won't load, find another source that covers the same material instead of skipping it.
- Run an alias pass on every answer. Open that character's own page (the Wikipedia infobox "Notable aliases" field, or the Aliases field on the Marvel or DC Fandom database) and add every codename they have used, not just the name the team roster shows. A team roster usually shows one name per character, so a player who types a member's other codename gets told it's wrong unless this pass adds it. Example: Norman Osborn is usually listed as Green Goblin, but he also called himself Iron Patriot, so Iron Patriot must count wherever Osborn counts. A codename counts when the character actually went by it, even if it started as the name of a suit of armor. Gear the character never used as a name (an armor model number, a vehicle) doesn't count. When a codename was also used by someone who isn't on the list, it still goes to the character who is.
- Clean the merged set: remove duplicates, fold alternate names for the same character into one entry's aliases, and drop anything that doesn't strictly fit the prompt. Every answer must come from a source you actually read.
- Record every source page in a comment at the top of the day file.
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

Run `node tools/build.js`. It checks seven prompts per day, at least 100 answers per prompt, exactly one 1 in Kryptillion answer per prompt, no name collisions between answers, and no reused prompts.
