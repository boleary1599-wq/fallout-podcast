# F.A.L.L.O.U.T. — MASTER EPISODE SPECIFICATION
Version: 1.1 — 22 November 2026
Repository: boleary1599-wq/fallout-podcast
Published site: https://boleary1599-wq.github.io/fallout-podcast/

## Purpose
This is the authoritative handover for future ChatGPT conversations working on F.A.L.L.O.U.T. episode pages. Read this file FIRST, then inspect the actual GitHub files and current HTML/CSS before editing. Do not rely on recollection or assume a previously described fix is present.

## Reference files
- Visual benchmark: episodes/podbean-fa2d58cfa40cb1.html (Episode 6; visually approved reference, NOT a clean CSS implementation).
- Current episode under repair: episodes/podbean-5dd5c9c1ef02fc.html (Episode 30).
- Shared styles: styles.css and episode-layout.css.
- Episode 30 original machine transcript: transcripts/ep030.txt.
- Episode navigation script: episode-navigation.js.
- Patreon: https://www.patreon.com/c/FALLOUTPODCAST238
- Episode 30 audio URL and Podbean link are already in its page; preserve them.

## Canonical page order (NON-NEGOTIABLE)
1. Site header, logo, top-right Patreon link.
2. Four-head original cartoon banner.
3. Episode number and title (title white/yellow split; readable, bold).
4. Audio player and original Podbean link.
5. Episode-specific original artwork / thumbnail, full column width.
6. Three navigation links: Read the essay | Results | Read the transcript. THESE GO BELOW THE ARTWORK, ABOVE THE ESSAY.
7. Complete critical essay.
8. Complete readable transcript.
9. Results section showing all four matchups, with BOTH winners and losers.
10. Back-to-top control and footer.
The navigation links may jump to sections lower on the page; the Results section itself goes AFTER the transcript.

## Geometry and design
- One centered content column, MAXIMUM 850px wide. Header/hero title, player, artwork, essay, transcript, results all align to that column.
- Cream paper background (#f2efe4), dark navy text for essay and transcript cards. Dark navy page background (#080d21), white/ivory and bright yellow (#ffe000) accents.
- Episode title bold condensed display type, split white/yellow (no all-yellow or tiny title). Compare with Episode 6 visually.
- The original cover artwork is displayed at natural aspect ratio, full column width, no forced fixed height, no crop or excessive whitespace. Small controlled gap (~12–20px) to navigation links and essay.
- No overflow or horizontal scrolling; responsive on mobile. Comfortable text sizes (essay roughly 17–18px; transcript roughly 17–19px) and clear headings.
- Results use aligned matchup rows with the winner highlighted and the loser explicitly visible.
- Keep the original four-head banner, early/late episode-specific artwork distinctions and original episode media links.
- Do not make the artwork, title, player, or essay different widths.

## CSS engineering rules
- Prefer ONE canonical shared stylesheet / one reusable episode structure. Fix root cause, not symptoms.
- DO NOT append successive page-specific <style> overrides to override previous overrides.
- Episode 6 has many accumulated CSS blocks: treat it as a VISUAL reference, not code to copy blindly.
- Episode 30 currently also has multiple patch blocks; clean/consolidate them as part of the next refactor, after reviewing specificity and all dependent styles.
- Inspect styles.css, episode-layout.css, episode-navigation.js, and the target HTML before changing structure. Watch for selectors using !important, CSS grid/flex, .wrap, .page-body, .episode-original-art, .jump, .paper, .episode-transcript, .episode-results-bottom.
- Avoid global changes that break other episodes. Prefer tested reusable class rules; verify effects before rolling out.
- Preserve all content while refactoring; avoid deleting the essay, transcript, original audio, links or results.

## Essay standards — MANDATORY FOR EVERY NEW EPISODE
- **Length: 1,500–2,000 words** of actual essay prose, excluding transcript, results and navigation. Count words before publishing. Do not silently deliver 150–200 words.
- **The Quietus-level criticism**: original, ambitious, specific, funny, intellectually engaged and rooted in the music, not generic AI review language.
- Read the **complete original episode transcript** first. Extract concrete musical observations, disputed readings, jokes, production details, comparisons and unexpected high/low cultural references from it. Use additional outside references and verified Fall knowledge where they genuinely deepen the argument; distinguish documented facts from interpretation.
- Build a **single coherent critical argument** with thematic sections (usually 4–8). Mix, cross-reference, contrast and return to the songs across sections. **NEVER make one section per song**, nor disguise eight track-by-track mini-reviews as themes.
- **Do not mention the podcast hosts, guests, panel, episode discussion, transcript or voting inside the essay.** The result must read as independent music criticism, not a podcast recap.
- Balance highbrow references (literature, philosophy, art, theory) with lowbrow references (regional British culture, television, comics, sport, pubs, pop, absurdity). References must be pertinent and illuminating, not a random name-dropping list.
- Ground claims in audible details: guitar, drums, voice, groove, structure, production, period, performance, lyrics where verified. Include genuine Fall expertise.
- Voice: literate, darkly comic, unpredictable, occasionally surreal, and economical. No generic concluding platitudes. Give the piece a compelling title and an actual argument.
- Do not invent lyrics, events, quotes, recordings, biographical facts or transcript evidence. Verify external facts where necessary.
- Anti-Bollocks scorecard: Musical specificity /25; Fall expertise /20; transcript fidelity /20; original criticism /15; voice/humour /10; economy /10. Target at least 85/100.
- If user wants to approve the essay, present it in chat first and publish only after approval. Preserve the **full approved text** when inserting it into HTML; don't substitute a shorter version.

## Transcript standards — MANDATORY FOR EVERY NEW EPISODE
- **COMPLETE TRANSCRIPT, no omissions.** Read the exact original source file, preserve every available spoken passage in order, including intro, all song discussions, voting, tangents and closing. Do not paraphrase the dialogue or invent missing material.
- **Attribute EVERY speaker turn**, not only some turns. Identify and separate speaker changes as accurately as the available audio, transcript and contextual evidence permit. Regular voices: Phil, Ezra, Al and Brendan; include actual guest names when supported. Never default all turns to Brendan, rotate names by time, or assign names by arbitrary text heuristics.
- **Accuracy takes priority over an invented attribution.** The user prefers fully named turns, but a made-up name would misrepresent the recording. When identity is uncertain, investigate audio/context first; if still uncertain, label the turn 'Speaker unverified' (or a stable provisional Speaker A/B when a distinct voice can be tracked) and mark it as provisional. Never present guesses as verified facts. Ask for voice-identification guidance if necessary.
- Preserve timestamps at turn starts. Merge consecutive turns by the **same verified speaker** into readable chunks, but never merge different speakers into one named turn. If only machine-generated text exists without diarization, do not pretend the original contains speaker boundaries.
- Correct obvious speech-to-text spelling and punctuation errors where confidently supported, especially Fall song titles and known names, without rewriting speech or silently inventing words. Flag unresolved ambiguous phrases.
- Use readable cream transcript cards, dark text, consistent speaker/time labels and comfortable type. No giant walls of text or tiny print.
- **No artificial song-pair section headings or enormous blank gaps within the transcript.** It must read as a continuous conversation; only the main 'Full transcript' heading is necessary.
- Provide access to the unedited source transcript. Describe machine transcription or uncertain speaker attribution accurately; never claim full verification or proofread status without actually doing it.
- Audit transcript completeness against the original source: compare the beginning, middle, ending, and source coverage/length before publishing.

## Results standards
- Read the actual transcript vote/conclusion and cross-check matchups before publishing.
- Explicitly show winner AND loser for all four contests.
- Episode 30 verified outcomes:
  - Pay Your Rates defeated Mother-Sister!
  - Entitled defeated The Legend of Xanadu
  - One Day defeated On My Own
  - Theme from Sparta F.C. defeated Slippy Floor
- The results SECTION belongs AFTER the full transcript.

## Release checklist
[ ] Fetch the latest actual target file from GitHub, and inspect shared CSS/JS.
[ ] Confirm exact title, date, audio URL, Podbean URL and original artwork.
[ ] Confirm order: banner → title → player → ARTWORK → NAV LINKS → ESSAY → TRANSCRIPT → RESULTS.
[ ] Confirm every major element aligns to one 850px centered column.
[ ] Confirm no giant gap below image, no crop, no overlapping title, no overflow.
[ ] Count essay words: 1,500–2,000, thematic rather than song-by-song, no host mentions, strong music-specific and high/low references.
[ ] Confirm transcript complete and continuous, readable, timestamped; every identifiable turn attributed on evidence, uncertainties clearly labelled; no artificial section headings or invented speakers.
[ ] Confirm all four results with winners AND losers.
[ ] Check desktop and mobile rendering if a browser/screenshot facility is available; if not, say visual verification was not possible.
[ ] Commit once with a clear message; verify successful commit and ideally refetch file.
[ ] Report actual changes and any outstanding limitations honestly.

## Copy-paste handover prompt for a new chat
We're continuing work on my F.A.L.L.O.U.T. podcast website. The next episode is number **(N)**.

Repository: `boleary1599-wq/fallout-podcast`.

**FIRST** use the connected GitHub tools to read `EPISODE_MASTER_SPEC.md` in the repository root, then inspect the actual target episode, Episode 6 as the visual reference, Episode 30 as the current working example, and the shared CSS/JS. Follow the master page order. Do not pile new CSS fixes on top of old ones.

Write a **1,500–2,000-word Quietus-level essay** rooted in the full transcript, enriched with relevant highbrow and lowbrow references from the transcript and beyond. Make a cohesive thematic argument that mixes the songs across sections — **NOT one section per song**. Do not mention the hosts or podcast in the essay. Use musical specificity, verified Fall knowledge and eccentric humour. Preserve the full approved essay.

Create a **complete, readable, timestamped, fully speaker-attributed transcript**. Identify all turns as accurately as the evidence allows; never invent a speaker identity as fact. Investigate uncertainties and clearly flag those that remain. No arbitrary song-pair headings or large gaps within the transcript.

Show all four results with both winners and losers, **after the transcript**. Keep the three equal-width navigation boxes **below the artwork**. Verify title typography, 850px alignment, audio, artwork, desktop/mobile spacing and CSS before publishing. Tell me about any verification limitations.

## Current status at creation
Episode 30 is live but its implementation still has CSS patch accumulation. Its layout order was recently corrected to artwork → nav links → essay → transcript → results. A proper CSS consolidation/refactor and visual QA are NEXT TASKS, not already completed.
