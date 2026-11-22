# F.A.L.L.O.U.T. — MASTER EPISODE SPECIFICATION
Version: 1.6 — 22 November 2026
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

## Original audio acquisition and Whisper transcription — LOW-INTERVENTION WORKFLOW
**Goal:** For each new episode, the assistant handles finding the original audio, acquiring a temporary working copy, transcription, cleanup, GitHub upload and disposal of the temporary MP3. The user should normally do nothing except provide the episode number and, if genuinely necessary, paste a short Terminal command supplied by the assistant. Do not make the user manually hunt for files, install software, upload MP3s, split recordings or copy transcripts if a connected tool can do it.

1. **Check for an existing transcript FIRST.** Use GitHub to look for `transcripts/epNNN.txt` (and any original transcript/source transcript already in the repository). If a complete, usable transcript exists, reuse it: do not download or transcribe the audio again merely for convenience.
2. **Find the authentic episode source.** Inspect the target episode page's existing Podbean/audio link, and if needed locate the corresponding official F.A.L.L.O.U.T. Podbean episode. Verify episode number/title before fetching. Prefer the direct original audio file URL from the episode's player/feed rather than third-party reuploads. Preserve the published audio URL and player; never remove or replace them while cleaning up temporary files.
3. **Acquire a temporary MP3 only when necessary.** Download the original recording to a clearly identified temporary working path in an accessible assistant workspace. If a connected tool or environment cannot access the audio, explain the actual limitation and choose the simplest supported alternative. Do not claim to have downloaded audio without verifying the file.
4. **Use OpenAI Whisper for transcription, preferably the `small` model** (the requested balance of quality, speed and resource use), with English language specified. Where locally available, use a compatible Whisper installation and ffmpeg; prefer a transcript with segment timestamps. The exact command depends on the user's machine and installation. Example ONLY for a working local Whisper CLI: `whisper episode.mp3 --model small --language English --task transcribe --output_format json --output_dir ./transcript-output`. Do not assume the assistant has a Whisper executable or the user's local filesystem; check first.
5. **Minimise user work.** The assistant should carry out tool-supported operations directly, including fetching, processing, verifying and uploading. If local execution is essential because the assistant cannot run Whisper or access the audio, give the user one concise, copy-and-paste Terminal command or small script with paths adjusted to their setup. Explain what it does and what output is expected; do not imply that pasting code grants the assistant control of the user's Mac. Avoid repeated multi-step instructions or asking the user to manually move files.
6. **Inspect transcript quality.** Check beginning, middle, ending and approximate coverage against the recording. Restore proper Fall song titles and obvious recognition errors without inventing dialogue. Maintain timestamps and preserve the complete source text. Whisper `small` does **not** inherently identify speakers: diarization/attribution requires separate audio/context verification, and unverified labels must not be passed off as fact.
7. **Save the durable output to GitHub.** Upload the complete timestamped transcript under `transcripts/epNNN.txt` (or the repository's established canonical transcript convention) and ensure the episode page links to it. Confirm a successful GitHub commit and verify that the transcript is accessible **before deleting any temporary audio**.
8. **Delete the temporary downloaded MP3 after success.** Once the full transcript is securely committed and checked, remove ONLY the specifically identified temporary MP3 in the assistant's workspace (or a temporary local file created expressly for this workflow, with a safe, explicit cleanup command if the user must execute it). Never delete the original recording from Podbean, any existing user-owned MP3, the site's player URL, or unrelated audio. Do not run a broad deletion or destructive wildcard. If transcription or upload fails, retain the temporary file until recovery is possible, and explain what remains.
9. **Report succinctly.** Confirm the episode source, model actually used, transcript path, commit status, whether temporary MP3 cleanup was actually performed, and any attribution/quality limitations. Never claim Whisper was run or an MP3 was deleted without tool confirmation.

**Operational preference:** This should feel like an assistant-managed pipeline, not a user-managed technical project. One short Terminal paste is an exception, not the default. If a required capability is unavailable, ask for the smallest possible user action rather than pretending it worked.

## NON-NEGOTIABLE IMAGE / NAVIGATION / ESSAY TYPOGRAPHY CHECKS (EP31 regression, 22 Nov 2026)
- **No large empty gap before or after the original episode artwork.** Inspect the space between audio/player, artwork and the three navigation boxes. The artwork must render at its natural image ratio, with `height:auto`, no fixed height, `min-height:0`, no artificial aspect ratio or oversized figure margin. Check inherited global `.page-body` padding and browser default `figure` margins. Keep only a modest intentional vertical gap (roughly 12–20px).
- **The three navigation boxes MUST align precisely with the artwork's left and right edges.** The artwork, navigation and essay use the same 850px centred column. Navigation grid must be `width:100%`, `grid-template-columns:repeat(3,minmax(0,1fr))`; each button fills its grid cell with `width:100%;box-sizing:border-box`. Do not let shared global `.jump a` rules revert them to inline-block or add unaccounted widths.
- **Essay HTML semantics are critical.** The essay title is ONE standalone `<h2>` (or appropriately nested heading), followed by a separate smaller italic deck `<p>`, then a separate compact byline `<p>`. Each thematic section heading is a standalone `<h3>`, and the following prose is in normal `<p>` elements. NEVER embed the deck, byline or opening paragraph inside a heading. Do not render raw Markdown underscores in HTML headings.
- **Type hierarchy:** Main essay heading bold condensed ~30–43px; deck italic ~17–20px; byline ~13px; thematic section headings ~22–29px; body Georgia ~16–18px with generous leading. Headings must never consume full paragraphs in huge type. Match Episode 6's editorial rhythm.
- **Check generated markup, not just word count.** Programmatically assert each heading closes before prose starts; verify all section headings and deck/byline are separate nodes. Inspect source around the start of the essay. Do not claim visual QA unless a browser screenshot/render has actually been inspected.
- **Fix root causes in the existing CSS block.** Do not append yet another stylesheet or override layer. Where a global selector interferes, use targeted selectors within the episode's existing style block or refactor the original rules.
- **Prepublish checklist:** zero oversized gaps, artwork and all three boxes exactly edge-aligned, equal box heights and type sizes, essay title/deck/byline/section headings/body in distinct properly sized elements, and desktop/mobile no horizontal overflow.

## EP31 VERIFIED ROOT CAUSE AND CONSISTENT EDITORIAL PANELS (22 Nov 2026)
- **Critical global CSS trap:** `styles.css` contains a legacy **MASTER 56** rule applying `::after` to `.page-body .jump`, inserting a `height:clamp(190px,30vw,330px)` pseudo-element with an extra cover image. When the page already includes a real artwork figure BEFORE navigation, this pseudo-element becomes an invisible/duplicate 190–330px grid row and creates a massive gap before the essay. On pages using the real artwork element, explicitly disable the pseudo-element in the EXISTING episode stylesheet: `.page-body.wrap .jump::after{content:none!important;display:none!important;height:0!important;margin:0!important}`. Better long-term: remove/refactor the legacy global pseudo-element only after auditing affected earlier episodes.
- **Essay and transcript must share the SAME visual treatment:** matching 850px outer width, cream `#f2efe4` panel background, navy `#18243c` text, identical panel padding, matching heading family and hierarchy, matching Georgia body text ~16–18px/1.8. The transcript must NOT suddenly switch to a dark navy container with separate white rounded cards for each passage. Use continuous cream paper with discreet dividers between turns. The results may remain navy/yellow.
- Inspect both the page's actual HTML and global CSS for generated content/pseudo-elements and inherited spacing, especially if a large gap persists after fixing normal margins. Screenshots take priority over assumptions.
- Keep original episode artwork above navigation, navigation immediately above essay with 12–24px spacing, and a modest 20–30px gap between essay and transcript.

## EP31 follow-up: transcript width and clean named speaker labels
- Transcript and essay must have **exactly the same outside left/right edges**: both are direct children of the same 850px `.page-body.wrap` container, both use `width:100%;max-width:100%;box-sizing:border-box`. Beware global `.episode-transcript` rules that give it a narrower percentage or max width; inspect computed widths and screenshot.
- Every transcript passage should have an **explicit speaker label**. Where the recording or transcript does not support confident identity, the user prefers a **best-effort named guess** rather than a blank/anonymous passage, but show **only the speaker name** (and timestamp) on each transcript passage. **Never append 'estimated attribution', 'provisional' or other repeated qualification to speaker labels.** Put a single concise disclosure near the transcript introduction if audio verification has not been performed; do not imply that unverified assignments are verified. Do not automatically alternate or cycle names to fill gaps: use actual audio and conversation cues wherever possible, and preserve the original unmodified transcript for comparison. Treat automated guessing as an interim draft requiring an audio attribution pass.
- Avoid arbitrary fixed-size timestamp batches masquerading as speaker turns. Group by conversational flow, keep original timestamped source available, and make clear if diarization has not been independently checked.

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
- **ALWAYS use a best-effort named speaker attribution for every displayed turn. NEVER print "Speaker unverified", "Unknown speaker", "Speaker A/B", or repetitive uncertainty labels in the published transcript.** First investigate the audio, context, introductions, direct addresses, voice continuity and conversational turn-taking. Regular speakers are Brendan, Al, Ezra and Phil, with guests named where supported. Make the strongest contextual judgement for each turn; do not assign names through arbitrary rotation, time gaps alone, or blanket defaults. Do not describe these best guesses as audio-verified facts.
- **CHUNK TRANSCRIPTS INTO READABLE CONVERSATIONAL TURNS, NOT ONE CARD PER MACHINE TIMESTAMP.** Merge adjacent source segments attributed to the same speaker into substantial, natural paragraphs wherever possible, retaining a timestamp at the beginning of each turn. Split at genuine speaker changes, topic transitions or reasonable paragraph boundaries; avoid giant walls of text. Preserve every available spoken passage in original order, including short interjections, without silently dropping dialogue. Machine timestamps are NOT automatically speaker boundaries.
- **ONE disclosure only, at the top of the transcript:** when names are inferred rather than verified by listening, say once that speaker assignments are best-effort contextual attributions and may contain errors. Do not repeat "estimated", "provisional" or "unverified" beside individual turns. Keep the original raw transcript linked for auditability.
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
[ ] Confirm exact title, date, original Podbean/audio source URL and artwork; reuse existing transcript or obtain audio with minimal user involvement.
[ ] Confirm order: banner → title → player → ARTWORK → NAV LINKS → ESSAY → TRANSCRIPT → RESULTS.
[ ] Confirm every major element aligns to one 850px centered column.
[ ] Confirm no giant gap below image, no crop, no overlapping title, no overflow.
[ ] Count essay words: 1,500–2,000, thematic rather than song-by-song, no host mentions, strong music-specific and high/low references.
[ ] Confirm Whisper small (if transcription needed) actually ran, transcript complete and continuous, readable, timestamped; speaker identities evidence-based, no artificial section headings.\n[ ] Confirm transcript committed to GitHub, then delete only verified temporary downloaded MP3 and report cleanup status.
[ ] Confirm all four results with winners AND losers.
[ ] Check desktop and mobile rendering if a browser/screenshot facility is available; if not, say visual verification was not possible.
[ ] Commit once with a clear message; verify successful commit and ideally refetch file.
[ ] Report actual changes and any outstanding limitations honestly.

## Copy-paste handover prompt for a new chat
We're continuing work on my F.A.L.L.O.U.T. podcast website. The next episode is number **(N)**.

Repository: `boleary1599-wq/fallout-podcast`.

**FIRST** use the connected GitHub tools to read `EPISODE_MASTER_SPEC.md` in the repository root, then inspect the actual target episode, Episode 6 as the visual reference, Episode 30 as the current working example, and the shared CSS/JS. Follow the master page order. Do not pile new CSS fixes on top of old ones.

Write a **1,500–2,000-word Quietus-level essay** rooted in the full transcript, enriched with relevant highbrow and lowbrow references from the transcript and beyond. Make a cohesive thematic argument that mixes the songs across sections — **NOT one section per song**. Do not mention the hosts or podcast in the essay. Use musical specificity, verified Fall knowledge and eccentric humour. Preserve the full approved essay.

**Audio/transcription workflow:** First check for an existing transcript in GitHub. Otherwise locate the official original Podbean MP3, acquire a temporary copy, use Whisper **small** in English where available, verify and upload the full transcript to GitHub, then delete only the temporary MP3 after confirming the upload. Handle this yourself using connected tools; the user should ideally do nothing beyond supplying episode number, with at most an occasional short copy-and-paste Terminal command if necessary. Never delete the original hosted audio or invent successful tool actions.\n\nCreate a **complete, readable, timestamped, fully speaker-attributed transcript**. Identify all turns with best-effort named speaker attributions based on audio and context; never show 'Speaker unverified' or anonymous placeholder labels. State any attribution uncertainty once at the transcript start. Merge adjacent segments into readable same-speaker turns rather than timestamp-by-timestamp cards. No arbitrary song-pair headings or large gaps within the transcript.

Show all four results with both winners and losers, **after the transcript**. Keep the three equal-width navigation boxes **below the artwork**. Verify title typography, 850px alignment, audio, artwork, desktop/mobile spacing and CSS before publishing. Tell me about any verification limitations.

## Current status at creation
Episode 30 is live but its implementation still has CSS patch accumulation. Its layout order was recently corrected to artwork → nav links → essay → transcript → results. A proper CSS consolidation/refactor and visual QA are NEXT TASKS, not already completed.
