# F.A.L.L.O.U.T. — MASTER EPISODE SPECIFICATION
Version: 1.0 — 22 November 2026
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

## Essay standards
- Original, high-quality, Quietus-level music criticism, normally ~1,800–2,000 words (not 180).
- Draw on the actual episode transcript, musical details, Fall discography, high/low cultural references and dark, eccentric British humour.
- NO mentions of podcast hosts, their discussion, the panel, or 'in this episode' in the essay itself.
- Do NOT structure as one section per song. Weave all songs across 4–8 substantive thematic sections; arguments and motifs should develop and collide.
- Do not invent song lyrics, factual events, interpretations presented as facts or transcript claims. Verify external music facts where necessary.
- Anti-Bollocks rubric: Musical specificity 25; Fall expertise 20; transcript fidelity 20; original criticism 15; voice/humour 10; economy 10. Target 85+/100.
- Show essay for user approval before publication when requested.

## Transcript standards
- Use the complete available transcript, not a fabricated or abbreviated substitute.
- Preserve timestamp information and make passages readable, not microscopic text or enormous walls.
- Speaker attribution MUST be audio-verified if shown as fact. Do not assign names using arbitrary algorithms, cycling labels or guesses.
- Regular speakers: Phil, Ezra, Al, Brendan; guests may differ. Do not treat DB as a regular speaker.
- If attribution cannot be verified, preserve the full transcript with timestamps and clear disclosure of that limitation rather than inventing speaker names.
- Do not claim a transcript is fully proofread when it is machine-generated and contains errors.

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
[ ] Confirm essay has complete approved text and thematic structure.
[ ] Confirm transcript complete, readable, timestamped; no fabricated speaker labels.
[ ] Confirm all four results with winners AND losers.
[ ] Check desktop and mobile rendering if a browser/screenshot facility is available; if not, say visual verification was not possible.
[ ] Commit once with a clear message; verify successful commit and ideally refetch file.
[ ] Report actual changes and any outstanding limitations honestly.

## Handover prompt for any new ChatGPT chat
'We are working on my F.A.L.L.O.U.T. website, GitHub repo boleary1599-wq/fallout-podcast. Before making ANY changes, use the connected GitHub tools to read EPISODE_MASTER_SPEC.md from the repository root, then inspect Episode 6 (visual reference), the target episode page, styles.css and episode-layout.css. Follow the master page order and QC checklist. Do not add layers of CSS patches. Keep the essay, full transcript, artwork, audio and winners/losers intact. Tell me what you will change, then implement and commit it when I ask.'

## Current status at creation
Episode 30 is live but its implementation still has CSS patch accumulation. Its layout order was recently corrected to artwork → nav links → essay → transcript → results. A proper CSS consolidation/refactor and visual QA are NEXT TASKS, not already completed.
