# F.A.L.L.O.U.T. — MASTER EPISODE SPECIFICATION
Version: 2.0 — 22 November 2026
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
- Build a **single coherent critical argument** as a sustained narrative. Prefer no conventional section headings or just 2–3 unobtrusive breaks where the narrative genuinely needs them; do not mechanically split an essay into 4–8 mini-articles. Mix, cross-reference, contrast and return to the songs throughout. **NEVER make one section per song**, nor disguise eight track-by-track mini-reviews as themes.
- **Do not mention the podcast hosts, guests, panel, episode discussion, transcript or voting inside the essay.** The result must read as independent music criticism, not a podcast recap.
- Balance highbrow references (literature, philosophy, art, theory) with lowbrow references (regional British culture, television, comics, sport, pubs, pop, absurdity). References must be pertinent and illuminating, not a random name-dropping list.
- Ground claims in audible details: guitar, drums, voice, groove, structure, production, period, performance, lyrics where verified. Include genuine Fall expertise.
- Voice: literate, darkly comic, unpredictable, occasionally surreal, and economical. No generic concluding platitudes. Give the piece a compelling title and an actual argument.
- Do not invent lyrics, events, quotes, recordings, biographical facts or transcript evidence. Verify external facts where necessary.
- Anti-Bollocks scorecard: Musical specificity /25; Fall expertise /20; transcript fidelity /20; original criticism /15; voice/humour /10; economy /10. Target at least 85/100.
- If user wants to approve the essay, present it in chat first and publish only after approval. Preserve the **full approved text** when inserting it into HTML; don't substitute a shorter version.

## Editorial benchmark: Nige Tassell in The Quietus (approved 22 Nov 2026)
- **Reference:** Nige Tassell, “From Langley Park to Mendips: Driving Through the Prefab Sprout Back Catalogue”, *The Quietus*, 7 November 2026. This is an APPROVED model for editorial rhythm, natural humour, narrative continuity and paragraph development; do not imitate or reproduce its wording or invent a comparable first-person journey.
- **Narrative first:** Establish one compelling, transcript-grounded story or critical question, and let the musical evidence unfold within it. Albums and songs are evidence within the argument, not obligatory separate chapters or a release-by-release checklist.
- **Continuous prose:** Prefer an uninterrupted essay with perhaps two simple section breaks; conventional subheadings are optional, not the default. Never use eight headings merely to simulate structure.
- **Developed paragraphs:** Usually roughly 70–150 words, with natural variation. Avoid repeated one-sentence paragraphs, artificial dramatic line breaks and punchline-per-paragraph cadence. A short paragraph must earn its emphasis.
- **Restraint and specificity:** Humour should arise from observed detail, real musical contrasts, place and cultural context. Do not fill the essay with clever-sounding metaphors, generic grand pronouncements, or gratuitous references to Kafka, Ballard, etc. High/low references should do analytical work.
- **Human editorial voice:** Trust the reader, allow ambiguity and competing interpretations, and follow an idea across several connected paragraphs rather than presenting a string of isolated aphorisms. The ending should grow out of the opening and evidence, not announce a sweeping moral.
- **Source backbone:** Read the entire episode transcript and extract its specific observations, contradictions, musical details, comparisons and tangents. Transform them into independent criticism without referring to the hosts or pretending to have witnessed unverified events.
- **Example, Episode 37:** The story is the changing personnel, Marcia Schofield's keyboard contribution, Dave Bush's arrival, the guitar/drums/programming tension, studio-versus-Peel differences, and the contradictory success of “Free Range”. Do not merely write four sequential album reviews. The earlier Episode 37 essay was rejected for exactly this failure; do not treat its publication as editorial approval.
- **Approval remains mandatory:** Show the full revised essay, verified 1,500–2,000-word count and Anti-Bollocks assessment, and wait for explicit approval before publishing.

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

## ABSOLUTE BAN: generic transcript speaker placeholders
- **NEVER publish a transcript turn with the speaker label "Conversation".** This is specifically prohibited, alongside "Unknown", "Speaker A/B", "Speaker unverified", "Unattributed", "Narrator", "Voice", "Participant", or similar generic stand-ins.
- **Every transcript turn must have a PERSON'S NAME, even when attribution is uncertain.** The user explicitly prefers a best-effort named guess to any placeholder. In episodes with guests, consider the guests as well as Brendan, Phil, Ezra and Al.
- Determine names from introductions, who is being addressed, question-and-answer continuity, characteristic opinions, and nearby dialogue; audio-verify where possible. Never simply rotate names, use fixed-length time windows as speakers, or label everybody Brendan.
- It is acceptable to be wrong; it is not acceptable to hide missing attribution behind "Conversation". Give one honest disclosure near the transcript introduction that names are best-effort and not audio-verified, plus a link to the raw source.
- **Pre-publication gate:** Search the rendered HTML for forbidden generic labels (especially `class="speaker-tag">Conversation`) and refuse to declare completion until all transcript turns carry actual personal names.

## Rotating fictional Fall-related essay authors — PERMANENT RULE
- **Every new episode essay MUST have a different fictional author byline inspired by The Fall.** No permanent house critic, no repetitive reuse of Dr. M. Hexen, Professor D. Temperance or any other recent byline. Choose a fresh invented name for EACH episode, referencing a Fall song, lyric, album, character, personnel or recurring mythology.
- Names should be witty, varied, plausible as eccentric critics and recognisably Fall-connected. Vary titles and roles (e.g. Dr., Reverend, Inspector, Sister, Esq., ordinary names); do not just swap one academic title for another.
- Examples for inspiration ONLY, not a fixed rotation: J. Hanley, Esq.; Sister Fiery Jack; Neville Pseud; Inspector Kicker; R. D. Container; Reverend B. B. Slates; Dr. C. B. Melling. Invent further names rather than cycling endlessly through these examples.
- The byline is a **fictional editorial persona**, not a real critic or a claim that a real person wrote the essay. Where helpful, identify it as a fictional byline.
- Pick a name that suits the episode's musical/literary themes, and keep it consistent between the approved essay and the published HTML. Do not change previously approved bylines unless asked.
- **Established examples:** Episode 34 — Dr. M. Hexen; Episode 35 — Professor D. Temperance. Episode 36 must use a different, newly invented Fall-related name.

## Approved current reference and Episode 34 handover — 22 November 2026
- **Episode 31 remains the approved layout/code reference:** `episodes/podbean-72be194d2fc8c8.html`. Episode 6 is the older visual benchmark. Do not default to Episode 30 or copy Episode 34 blindly; inspect 31 and the current target.
- **Episode 34 is available as a recent worked example:** `episodes/podbean-c72dc730fd0dbb.html`; original transcript `transcripts/ep034.txt`. Title: *Mr Gates Is Aghast!*; 20 February 2022; guest Chris Barrow. Original Podbean audio/player and early-era artwork are already in the HTML. Its essay *The Art of Getting It Wrong* has seven sections and approximately 1,759 words in the currently fetched page. The page has 142 grouped transcript turns and four winner/loser matchup rows.
- **Episode 34 results, checked against its page and closing transcript:** New Face in Hell > Rollin' Dany; I'm Frank > Just Waiting; The Early Life of Crying Marshal > Pearl City; Remainderer > Pre-MDMA Years.
- **Approval gate:** The user wants to read and approve the ESSAY before a new page is published. First produce the full 1,500–2,000-word essay with an actual count, invite approval, and only then commit the episode page. Do not treat praise for an earlier episode as approval for a new essay.
- **Essay source discipline:** Read the complete existing transcript first, build an original argument around the recording's distinctive observations, and research/verify uncertain historical or discographical claims. Avoid invented facts and song-by-song section structure. Preserve the user's approved wording when building the page.
- **Attribution honesty:** Do not cycle speaker names mechanically or infer identity from timestamp gaps alone. Use direct address, question-answer continuity and voice/audio evidence if accessible. Where audio is not checked, disclose uncertainty once at the top. A page containing named turns is not proof that identities are correct. Keep the original raw transcript available.
- **QA distinctions:** HTML inspection can establish source structure, word count, anchors and content; it does NOT establish desktop/mobile visual appearance. Never claim browser or screenshot QA without actually rendering the page. Inspect alignment and gaps visually wherever tools allow.
- **CSS:** Disable the legacy `.page-body .jump::after` pseudo-element for artwork-bearing pages at its underlying source/canonical layout rule. Do not stack new overrides. Keep 850px alignment, equal-width nav boxes, cream paper sections, and results after transcript.
- **GitHub:** Fetch current blob SHA before edits; update the correct episode file; refetch to confirm. Do not claim an update was made if it was not. Do not delete original hosted audio.

## Copy-paste handover prompt for a new chat
Continue my F.A.L.L.O.U.T. website. NEXT EPISODE: **[NUMBER]**. GitHub: `boleary1599-wq/fallout-podcast`.

FIRST fetch and read the current `EPISODE_MASTER_SPEC.md` from connected GitHub (currently v1.7). Follow it, not memory. Use Episode 31 (`episodes/podbean-72be194d2fc8c8.html`) as the APPROVED layout reference; Episode 6 is the visual benchmark; Episode 34 (`episodes/podbean-c72dc730fd0dbb.html`) is a recent worked example.

Find the exact target page, original Podbean audio, artwork, date, results and existing `transcripts/epNNN.txt`. Read the FULL transcript. If absent, acquire original audio and transcribe with Whisper small English if available, timestamp and correct confidently identifiable Fall names/song titles, then commit and verify the raw transcript; remove only temporary downloaded audio after verification. Handle this without asking me to move/download files if possible.

**ESSAY FIRST — DO NOT PUBLISH YET.** Choose a NEW, never-recently-used fictional Fall-inspired author byline for this episode (vary the type of name/title; see rotating-author rule). Write 1,500–2,000 ACTUALLY COUNTED words of original Quietus-level criticism using the transcript's ideas as the intellectual core, 4–8 thematic sections, mixed songs, musical specificity, Fall expertise, high/low cultural references, strange humour and no generic AI prose. Do not mention podcast hosts/discussion in the essay. Check factual claims; self-score against the Anti-Bollocks rubric, aim ≥85. **SHOW ME THE COMPLETE ESSAY AND WAIT FOR MY EXPLICIT APPROVAL BEFORE COMMITTING THE EPISODE PAGE.**

After approval, reuse Episode 31's approved structure: header/Patreon → four heads → white/yellow title → original Podbean player → correct artwork → three equal-width nav links → approved essay → full timestamped transcript → four matchups showing winners AND losers → back to top. One 850px centred column; matching cream/navy Georgia-style essay and transcript; no giant gaps; disable legacy `.page-body .jump::after` artifact without accumulating CSS patches.

Attribute all spoken passages to named speakers using conversational evidence, NOT arbitrary cycling; merge consecutive segments into readable turns; no anonymous turns or repeated uncertainty labels. If not audio-verified, disclose once at the transcript start and retain a link to the original raw transcript. Do not claim audio verification without listening.

Check actual word count, completeness, titles, results, links, original audio, artwork and source markup. Render-check desktop/mobile if tools permit; otherwise state explicitly that visual QA was not done. Commit through connected GitHub tools and refetch the updated file to verify. Report honestly what remains unverified.

## Current status at creation
Episode 30 is live but its implementation still has CSS patch accumulation. Its layout order was recently corrected to artwork → nav links → essay → transcript → results. A proper CSS consolidation/refactor and visual QA are NEXT TASKS, not already completed.

## ABSOLUTE ATTRIBUTION RULE — GUESS A NAME, NEVER A PLACEHOLDER (23 November 2026)
- When audio verification is unavailable, **make a best-effort contextual guess for EVERY turn**. The user explicitly prefers a plausible named attribution, even if imperfect, over any generic label.
- **NEVER publish “Recording”** as a speaker label. Equally forbidden: “Conversation”, “Unknown”, “Speaker”, “Speaker A/B”, “Unverified”, “Participant”, “Narrator”, or any similar non-person label. This prohibition applies to interim published pages too.
- Identify plausible names from the episode introduction and actual dialogue (Brendan, Phil, Ezra, Al and named guests as appropriate). Use direct address, response continuity and nearby context to make the strongest guess; don't mechanically rotate names or assign by elapsed time alone.
- Merge machine timestamps into readable conversational turns, retaining all speech. Use just the guessed name and timestamp on each turn. Put one short disclosure at the transcript beginning that attributions are contextual guesses, not audio-verified. Keep the raw source linked.
- **Before committing, reject any generated HTML containing generic speaker labels**, especially `class="speaker-tag">Recording`. A transcript with placeholder names is not finished and must not be presented as published/completed.


## EPISODE NAVIGATION AND ESSAY TITLE — 23 NOVEMBER 2026
- **Navigation must jump instantly.** Clicking Read the Essay, Results, or Read the Transcript should land directly at the destination, with no animated scrolling through the page. Avoid `scroll-behavior:smooth` in episode pages; explicitly use `html{scroll-behavior:auto!important}` when overriding the global stylesheet, and check any JavaScript anchor navigation also uses instant scrolling. Verify all three links.
- **Essay titles must be editorially distinctive, not generic restatements of the episode question or central thesis.** Present a compelling, specific title for approval with the essay. If the user rejects a title, change the heading only; do not silently rewrite the approved essay, subtitle or byline. Episode 39's revised essay title is “A Rhythm With Previous Owners”.


## SPEAKER ATTRIBUTION: HARD RULE — 23 NOVEMBER 2026 (USER-CORRECTED)
- **ALWAYS MAKE THE BEST CONTEXTUAL GUESS** at the identity of each speaking voice. This is the F.A.L.L.O.U.T. house rule. Use actual participant names (usually Brendan, Phil, Ezra, Al, plus verified episode guests); **never publish generic “Unverified speaker”, “Unknown”, or “Speaker 1” labels**. If audio diarization is unavailable, still guess from conversational context, and say once at the top that attributions are best-effort guesses rather than audio-confirmed.
- **DO NOT REPEAT A SPEAKER NAME ENDLESSLY** across unrelated passages, as happened when EP40 showed Brendan 191 times. Do not default every passage to Brendan or the previous named speaker, and do not mechanically cycle through four names. A long run of identical labels is a quality-control warning requiring a fresh review of turn boundaries and speaker evidence.
- **Use evidence to guess**: introductions, who is addressed, the immediately following answer, self-reference, distinctive opinions and speech patterns, responses and interruptions, continuity of an actual spoken turn, and the recording itself when available. When one person asks Phil a question, the next response is probably Phil, not the questioner. Identify and separate speakers when the dialogue changes; combine consecutive passages only when they really belong to the same person.
- **Music excerpts are not host turns.** Separate song clips, samples and lyrics from conversation, and label clearly identifiable clips as “Music excerpt” rather than repeatedly attributing them to Brendan. Do not use silence or arbitrary timestamp intervals as evidence of a speaker change.
- **Presentation:** show ONLY the guessed speaker name and timestamp on each spoken turn. One concise uncertainty disclosure at the transcript beginning; no per-turn “guess”, “estimated”, or “unverified” clutter.
- **Pre-publish QC:** inspect the distribution of names and multiple stretches of the transcript, especially the opening introductions and song clips. If the output is mostly one name or generic labels, STOP and correct it before publication. EP40's 191 Brendan labels and subsequent 209 “Unverified speaker” labels are both explicitly unacceptable. A published transcript must resemble the actual back-and-forth discussion, not a sequence of timed blocks with repeated labels.


## HEADING SCALE AND EXACT COLUMN ALIGNMENT — EP44 CORRECTION (24 NOVEMBER 2026)
- **Do not shrink the episode title or section headings when building a new episode.** Match the approved EP43 display hierarchy: hero title `font:900 clamp(40px,6vw,68px)/1.03 Impact,'Barlow Condensed','Arial Narrow',sans-serif`; essay and transcript main headings `clamp(32px,4vw,43px)`; internal essay headings `clamp(24px,2.8vw,30px)`; results heading `clamp(34px,4.5vw,50px)`. Keep responsive scaling and ensure no clipping.
- **Exactly one outer width rule for every major block:** the hero title, player, original episode artwork, three jump links, essay, transcript and results must share a single centered **850px outer edge**, not merely similar widths. Recommended parent: `width:min(850px,calc(100% - 36px));margin-inline:auto`; use `box-sizing:border-box` for all sections. Do not give child panels independent max-widths, horizontal margins or padding that change their outer edges.
- **Paper-panel parity:** essay and transcript use the same outer width, same cream background and same responsive inner padding (`clamp(22px,4vw,42px)`). The results panel may use navy/yellow but must retain the same outside edges. The navigation buttons occupy the same width as the artwork, with `minmax(0,1fr)` columns.
- **Speaker names must be legible headings, not tiny metadata:** approximately 16px bold on desktop, 15px on small mobile, with the timestamp on the same label. Body text remains about 17–18px.
- **Beware of inherited global CSS and `::after` decoration.** Disable the legacy jump-link pseudo-element when real artwork is present. Consolidate into one coherent page stylesheet rather than piling on overrides.
- **Before declaring visual completion**, compare the left/right outer edges of hero title, audio, artwork, navigation, essay, transcript and results on desktop and mobile, and compare heading scale with EP43. Inspect actual browser rendering where available; source-code inspection alone is not a visual test. If browser verification is unavailable, report that limitation explicitly.
- EP44 implementation reference: `episodes/podbean-71b3e88cd95ce2.html` (layout correction 24 November 2026); EP43 remains the approved visual reference.

## ESSAY STRUCTURE — TRANSCRIPT-LED THEMATIC CRITICISM (MANDATORY; EP43 LESSON, 24 NOVEMBER 2026)

**The transcript supplies the ideas; the songs supply evidence. NEVER use “one song = one section” as the default essay structure.** EP43 required a complete redraft because its apparently thematic headings concealed sequential mini-reviews of the four matchups. The approved EP43 revision is the positive model: an integrated argument about Faust, repetition, historical unease, cheapness/modernism, musical failure and creative disorder, with songs recurring across sections.

### Mandatory research and planning workflow
1. **Read the COMPLETE episode transcript before outlining.** Include the opening conversation, tangents, musical observations, disagreements, jokes, references, voting, and closing reflections. Do not work only from the episode blurb, the four song titles, or isolated search snippets.
2. **Extract a thematic evidence map FIRST.** Identify at least 4–6 substantial, episode-specific ideas that emerge from what the speakers actually discuss: musical mechanisms (rhythm, production, voice, repetition), aesthetics, contradictions, historical/literary references, cultural context, disagreements, unexpected digressions. For each idea, record which transcript moments and which *different* songs support, complicate or contradict it. Distinguish what the transcript actually says from the essayist's subsequent interpretation.
3. **Choose one original central argument.** Build an essay with 4–8 sections that advance, challenge or deepen that argument. Section headings must name **ideas, tensions, images or propositions**, not merely songs, song pairings, album names or rounds.
4. **Cross-pollinate the songs.** Draw examples from different rounds and eras *within the same thematic section* where they illuminate the same point. Revisit a song in a later section when it reveals a different aspect. A song need not receive its own paragraph, and the four matchups need not appear in voting order. Do not mechanically give every song equal coverage.
5. **Write connected criticism, not a listening diary.** Avoid the repetitive structure “Song A is… Song B is… winner is…” or sections that open with a song introduction followed by a miniature review and a verdict. The essay should read as a coherent piece of music criticism that could stand alone without the podcast's bracket format. Use the discussion's distinctive insights as the intellectual backbone, but do not turn the essay into host-by-host summaries or quote attribution.
6. **Bring in wider knowledge selectively.** The Fall's personnel, recordings, production, lyrics, performance history, other musicians, literature and cultural references should sharpen the argument, not decorate it. Check uncertain factual/discographical claims; do not invent quotes or assert that an interpretation came from the transcript when it did not.
7. **Preserve editorial texture.** Aim for substantial developed paragraphs, transitions, musical specificity, high/low cultural collisions, wit and an unmistakable critical position. Avoid generic introductions, artificial “on the one hand” balance, one-sentence paragraph chains and a perfunctory concluding recap.

### Pre-approval structural audit — FAIL the essay if any apply
- **One song per section:** the headings, section openings or paragraph sequence follow the four matchups or eight songs, even when headings sound abstract.
- **Eight disguised mini-reviews:** each song is introduced, described and discarded before the next one, without sustained comparison or thematic return.
- **Transcript as checklist:** the piece covers the named tracks but neglects the episode's most interesting actual conversations, contradictions, tangents or cultural references.
- **No real argument:** rearranging the song paragraphs would leave the essay's meaning unchanged; the sections are interchangeable rather than cumulative.
- **Unfounded specificity:** detailed historical, lyrical or production claims are presented as verified without support.
- **Template prose:** generic observations about Smith's genius, chaos, repetition or eccentricity could be pasted into any episode.

**Required self-test before showing the essay:** (a) Can the central thesis be stated in one or two precise sentences? (b) Do at least three sections use multiple songs/eras to develop a shared idea? (c) Do some songs recur in different contexts? (d) Could the section headings stand without the episode's track list? (e) Is there a distinctive transcript-derived insight that would not arise from song titles alone? If not, REWRITE BEFORE SHOWING OR PUBLISHING.

**Approval and publication:** Show the complete draft with an actual word count, await explicit approval, and then publish **the exact approved wording**. If the user requests a thematic redraft of an already-published essay, replace only that essay's HTML; preserve transcript, audio, artwork, results and page layout. EP43 (episodes/podbean-060024b605f855.html), revised 24 November 2026, is the reference example of the thematic correction.

## EP40 LESSONS — TRANSCRIPT AND SPECIAL-EPISODE QUALITY CONTROL (23 NOVEMBER 2026)
- **A plausible distribution of speaker names is NOT proof of correct attribution.** Do not use distribution balancing, forced alternation, arbitrary time gaps, paragraph length, or speaker rotation to make the transcript appear conversational. Always make the best contextual guess for each actual speaking turn, even if some speakers genuinely talk more than others.
- **Audit the opening introductions** to establish the real participants and their names, then inspect multiple later stretches including direct questions, answers, interruptions, and closing remarks. A question addressed to Phil followed by his answer must not be combined into one Brendan passage.
- **Preserve real conversational turns, not timed blocks.** Detect changes inside Whisper timestamp segments, split when speakers change, and merge adjacent segments when the same person continues. Do not merge unrelated speech merely because it falls within an arbitrary character limit.
- **Identify song playback separately from discussion.** Song lyrics and sampled audio must not be presented as spoken remarks by Brendan, Phil, Ezra or Al. Use “Music excerpt” for clearly identifiable playback, retaining the original timestamps and text where practical.
- **House style: always guess a specific speaker** from the episode's real participants, using the best available conversational evidence; never publish generic “Unverified speaker” labels. Include one brief disclosure at the top that attributions are best-effort when not audio-verified, not repetitive warnings on every turn. An informed guess is required, but an invented claim of certainty is forbidden.
- **Before publishing, run a transcript spot-check**: first five minutes, at least two passages from the middle, a music excerpt, the final five minutes, and any suspicious run of identical speaker names. Correct obvious speech-recognition errors, especially Fall song titles. Do not claim the transcript is audio-verified unless it was actually checked against the recording.
- **Special episodes have their own results structure.** EP40 is a second-chance/repechage episode, not a standard four-match episode. Display the actual qualifying selections, votes, automatic qualifiers, and eliminations supported by its transcript; do not invent four pairings to fit the normal template. Preserve the same visual style and the established essay → transcript → results order.
- **Do not treat a GitHub commit as visual verification.** Fetch the committed file to verify source changes; distinguish that from checking the rendered page. Keep instant section navigation, correct artwork, 850px alignment and approved essay wording.

## THREE NAVIGATION BUTTONS MUST BE HORIZONTAL — EP44 SCREENSHOT REGRESSION (24 NOVEMBER 2026)
- The **Read the essay | Results | Read the transcript** navigation must be **one horizontal row of three equal-width buttons**, never a vertical stack. This is a site-wide design invariant, including on mobile; reduce label font and gap on small screens rather than changing to one column.
- Use a three-column grid with sufficient specificity to override legacy global CSS: `.archive-page .jump{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important}`. Ensure buttons do not have inherited `grid-column:1/-1` or `width` rules that force stacking. Disable the legacy `.jump::after` pseudo-element.
- Verify the actual browser screenshot, not just CSS source. The EP44 screenshot on 24 Nov exposed a regression caused by a mobile single-column media query. Do not reintroduce that rule.

## EP44 ROOT CAUSE: MASTER 55 FLEX OVERRIDE (24 NOV 2026)
- A screenshot and source audit revealed `styles.css` **MASTER 55** forces `body :is(.page-body .jump, .archive-page [class$="-jump"], .archive-page .jump){display:flex!important;flex-wrap:wrap!important}`. This higher-specificity global rule defeats the episode's `.archive-page .jump{display:grid!important}`, so three navigation links stretch into three vertical rows. **Do not treat this as browser cache.**
- For existing pages, override the rule with a genuinely more specific selector, e.g. `body main.archive-page nav#ep44-navigation.jump{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important}`. Keep three equal columns on every viewport and reduce font size on mobile.
- Long-term fix: refactor MASTER 55 into a consistent three-column grid across all episode layouts after auditing pages; avoid globally forced flex for the three-link navigation. Confirm computed `display:grid` in the browser, not merely the presence of CSS in the source.

## EP47 TRANSCRIPT LABELS, QUOTED ESSAY TITLES AND FOOTER (24 NOVEMBER 2026)
- Do not let lyric recognition or music playback spill into a labelled conversational turn. Review transitions at the beginning and end of songs and remove machine loops from conversational passages only after verifying against the source; preserve the full original transcript file.
- For essay titles, prefer a compelling, accurately quoted line from the episode when it fits the essay's argument. EP47's `Still Pulling So Much from The Fall` adapts the guest's reflection at ~78:13. Do not invent quotations or attribute them to an individual without verification.
- Bottom `BACK TO TOP` and `ALL EPISODES` links must be a separate consistently styled footer navigation with visible contrasting navy/yellow buttons, not an unstyled paragraph. Ensure the back-to-top anchor points to `#top` on the page and does not inherit unreadable global link styles. Verify visually, especially after the results panel.

## SPEAKER ATTRIBUTION MUST NOT BE EVADED — EP47 REGRESSION (24 NOVEMBER 2026)
- User explicitly requires **speaker names** in published transcripts. Never replace them wholesale with `Discussion`, `Conversation`, `Unknown`, `Speaker unverified`, or similar generic labels. The neutral-label workaround was rejected after EP47 screenshots.
- Use episode cast and conversation cues to assign **best-effort named speakers**, marking uncertainty once in the transcript introduction rather than on every turn. Do not present inferred attributions as verified facts. Where audio is available, audio-check ambiguous exchanges before claiming final accuracy. EP47 cast is Brendan, Phil, Al and guest Brian Turner; do not arbitrarily rotate in absent hosts.
- Segment by actual conversational changes: one named speaker and timestamp per turn; merge adjacent consecutive fragments from the same speaker, but never combine obviously different speakers in a single paragraph. Use short passages where necessary until audio verification is possible.
- Suppress clearly spurious ASR loops such as EP47's opening `brush brush brush` from the **published readable transcript**, retaining the original source transcript file unchanged. Distinguish these from genuine repeated lyrics, which should not be silently altered.
- Treat screenshots showing `Discussion` or nonsensical transcription loops as blocking QA failures, not cosmetic issues. Do not describe a transcript as complete speaker-edited unless changes have been checked against audio.

## ACTIVE TRANSCRIPT TURN RULE — PRIORITY OVER HISTORICAL NOTES (24 NOV 2026)
- **ONE SPEAKER, ONE LABEL PER CONTINUOUS TURN.** If consecutive source passages have the same actual speaker, merge them and display the name and first timestamp ONCE. Do not repeat a name because a machine timestamp, arbitrary passage limit, or paragraph boundary occurred. If the same speaker continues for a long stretch, use paragraphs inside the same named turn instead of repeating the label.
- Split only on an actual change of voice (or an identified music excerpt). Preserve every spoken word in order and never merge different speakers just because the generated names happen to match; audit attribution against the dialogue/audio first. Never use arbitrary 6-, 14-, 18- or 22-segment caps to force new speaker labels.
- **This is a hard pre-publish test:** count adjacent same-name transcript blocks and reject publication if any remain. The source transcript and visible reading version are different: do not delete source segments when merging their display.
- **Bible maintenance:** consolidate rather than append new duplicate instructions. If historical notes conflict with the active requirements, the active requirements take precedence. Avoid growing this bible with episode-specific workaround logs; maintain a short canonical checklist separately from archival incident notes.


## Mandatory fast transcription workflow (24 November 2026)

- For missing transcripts, use **MLX Whisper Small on Apple Silicon** (`mlx-community/whisper-small-mlx` via `mlx_whisper`), not the standard CPU Whisper CLI. Previous successful batch runs reportedly took approximately 2–5 minutes per episode; actual duration varies.
- Check existing archives and repository first. Reuse downloaded audio, existing MLX environment and cached model; verify paths rather than assuming them. Preserve timestamps and verify the complete transcript before committing.
- Do not silently fall back to standard CPU Whisper or start a multi-hour transcription. If MLX is unavailable, explain the blocker before proceeding.
- Prefer direct Mac-to-GitHub transfer of verified transcripts rather than repeated manual uploads. Do not claim that the transfer pipeline is operational until tested.
- This rule supersedes any earlier generic instruction to use Whisper Small for local transcription.


### Verified local workflow — EP48, 25 November 2026

The existing environment at `$HOME/Downloads/fallout_website 14/.venv/bin/python` successfully ran `mlx_whisper.transcribe` with `path_or_hf_repo='mlx-community/whisper-small-mlx', language='en', verbose=True` under `caffeinate -i`, writing timestamped segments to a text file. EP48 (79 minutes) completed in approximately five to six minutes. GitHub CLI is now installed and authenticated on the Mac; direct transfer was verified by fetching `transcripts/ep048.txt` from GitHub (942 lines). For new transcript paths, use `gh api --method PUT repos/boleary1599-wq/fallout-podcast/contents/transcripts/epNNN.txt -f message='Add MLX Whisper transcript' -f content="$(base64 -i "$TRANSCRIPT" | tr -d '\n')"` with the correct episode number and local file path. Check for existing remote files before writing; never overwrite without checking the existing blob SHA. Combine local transcription and transfer into one command where feasible. No manual upload required. Verify remote transcript before deleting temporary audio.


## Mandatory sentence-continuity attribution audit — 26 November 2026
- Reconstruct sentences across Whisper timestamp fragments before assigning speakers. Timestamp fragments are not speaker turns.
- Inspect BOTH sides of EVERY speaker boundary in a second pass. Move the boundary to the actual conversational handover, using questions, replies, direct address and grammatical continuity. Never switch labels halfway through a sentence unless a genuine interruption is supported by the recording or text.
- Sentence continuity takes precedence over approximate timestamp cutoffs. If a fragment finishes the previous speaker's sentence, attach it to that speaker; timestamp the new turn at its actual or best-estimated start. Merge consecutive turns by the same speaker.
- Preserve every spoken word; do not invent punctuation or delete text merely to conceal a bad boundary. Best contextual speaker guesses remain permitted; disclose approximate attribution once. Audit all boundaries before publishing and distinguish text-based checks from audio-verified diarization.

- RETROSPECTIVE REQUIREMENT: Apply this audit to every previously published transcript, EP01 onward. Check mixed-speaker passages, erroneous Music labels, sentence continuity and redundant consecutive labels. Synchronise corrected attributed files with published HTML where present; preserve raw transcripts, essays, artwork and results. Record per-episode corrections and distinguish screening from completed manual boundary review.

- Transcript visual standard: no yellow or other vertical speaker borders, boxes or shadows. Use cream paper, navy text, aligned speaker labels and subtle horizontal separators only. Applies to the entire archive.

- Visual regression check: inspect shared styles.css and episode-local CSS for inherited border-left rules, including :has() and !important overrides. Verify the deployed transcript after a hard refresh; source inspection alone is not visual verification. Shared stylesheet fix committed 26 November 2026 (bf7b92d481c5c1fdd1429fc1bd8c22c2a0fb6aa5).

- Long speaker turns must contain natural readable paragraphs, usually 60–120 words, breaking at complete sentences or clear changes of thought. Keep one speaker label and timestamp per continuous turn, not per paragraph. Never split mid-sentence merely to meet a length target. Preserve wording and add visible paragraph spacing. Check long turns in all existing episodes as part of retrospective QA.

## Mandatory essay title selection
- Extract a shortlist of the strongest distinctive, witty or evocative phrases actually spoken in the episode transcript, with timestamps. Choose the best quotation that also captures the essay's central argument. Avoid generic academic titles. Verify the wording against the source; do not invent quotations or silently rewrite them. Show the strongest candidates when seeking essay approval.


## Current checkpoint — EP51 (27 November 2026)
- Provisional source transcript uploaded to `episodes/podbean-3e44bc65ca3df7.html` in commit `f1f5b2161e24678f1fb165d9513d24d535688fcc`; all 566 source segments verified in repository. Raw transcript retained. Approved essay inserted unchanged (2,165 words, five sections, Neville Counterpane) in commit `ec27cb029c3d6b87494acbf85fb947e52f97d73f`; repository readback verified and transcript unchanged. Approved length exceeds usual 2,000-word ceiling; retained rather than silently cut. Canonical layout and four results installed using EP50 implementation and EP6 visual reference in commit `0dd39de9ce9bcc59dd3580b82614f2fc239b060d`; repository readback confirms essay and transcript preserved. Live visual verification, speaker attribution, punctuation and paragraph continuity remain pending. Not Bible-approved.

- EP51 speaker pass: commit `27d8217aa8794daeeefcacc6f3ca2213b08c9b1f`, verified repository readback. All 566 source segments retained in 110 contextual named turns, adjacent same-speaker segments merged, selected recognition errors corrected. User explicitly authorises guessing names. Single attribution disclaimer; intra-segment speaker boundaries, residual recognition errors and live rendering still require QA.


## Current checkpoint — EP52 (27 November 2026)
- Approved essay **Sodomised by Presumption**, six thematic sections, 2,203 words including headings, retained unchanged despite normal length ceiling. EP51 canonical layout reused, four results and provisional transcript (854 source segments, 47 contextual blocks) published in commit `6f09761b92d98d882f1de7c60d33e54b7f490a74`; exact repository readback verified. Raw transcript unchanged. Speaker boundary and music separation audit, punctuation, independent Archer/Pixies fact check, EP6 visual comparison and deployed rendering remain pending. Not full Bible sign-off.


## Editorial sourcing rule — 28 November 2026
Critical essays must be approximately 90% grounded in the actual episode transcript (arguments, listening observations, disagreements and interpretations), with at most approximately 10% additional editorial insight and contextual references. Prefer relevant popular-cultural references, with high-cultural references where genuinely illuminating. Integrate them throughout rather than bolting them on. Never invent transcript observations or pad with name-dropping; maintain thematic cross-track structure and critical independence. The ratio is an editorial target, not a mechanical word count.


### EP53 checkpoint — 28 November 2026
Approved essay and canonical layout published; four results and contextual transcript uploaded. Opening and closing exchanges refined, including split timestamps and music markers. Remaining middle-section speaker attribution, punctuation and music separation require review; browser visual QA outstanding. Do not mark final Bible-standard until checked.

EP53 follow-up: middle voting exchanges refined, additional music markers and aligned speaker/time headings added. Source readback verified; attribution remains contextual and full audio/visual QA outstanding.


### EP54 checkpoint — 28 November 2026
Approved essay The Sound of a Man's Integrity Dying by Mere Pseud Mag. Edward published with canonical layout and four verified results at episodes/podbean-6f86845dc87b64.html. Source readback verified. Raw transcript linked; speaker attribution, transcript formatting and browser visual QA pending.

EP54 transcript pass: 1132 source segments processed into 93 contextual speaker/music blocks; original timestamped source retained. Selected recognition corrections and paragraph formatting applied. Exact repository readback verified. Intra-turn speaker changes, remaining recognition errors, music boundaries and deployed browser rendering still require independent QA; provisional attribution, not final sign-off.


### EP55 checkpoint — 28 November 2026
Provisional transcript uploaded to episodes/podbean-a6874800513fc6.html; 1542 source segments processed into 48 contextual blocks, original source linked. Album overview replaces showdown results. Essay pending. Detailed attribution, punctuation, music boundaries and visual QA outstanding; not Bible-standard sign-off.

EP55 attribution follow-up: reviewed 15:18–26:55 against source, added contextual speaker changes and archive interview label. Later blocks still need review. Mandatory QA: individually review every speaking turn longer than two minutes; never split arbitrarily or certify unresolved attribution.

EP55 later dialogue review: 130 blocks after contextual review of 35:00–80:37, with archive awards audio separated and Tim's written contributions identified as readings. Remaining long speech blocks: [{"speaker":"Phil Rigby","start":"11:16","seconds":130},{"speaker":"Phil Rigby","start":"35:17","seconds":138},{"speaker":"Brendan","start":"67:17","seconds":122},{"speaker":"Ezra","start":"71:39","seconds":128}]. Exact repository readback verified; audio attribution and music boundaries remain provisional.

EP55 essay published: The Texture of When Drugs Go Wrong, by fictional Dr. Buckminster Letter, 2123 words including six thematic headings. User requested 85/15 transcript/context target for this essay (editorial estimate). Cross-album structure refined; transcript preserved exactly and original audio, anchors, albums and footer checked. Repository readback verified; deployed rendering and audio-based attribution remain unverified.

### EP56 checkpoint — 28 November 2026
Published Imperfect in the Best Way by fictional J. Crackerfactory (1952 words, six thematic sections), title from source 16:24, four results confirmed by final recap at 60:29, and 1073 source segments grouped into 197 contextual speaker/music blocks. Exact repository readback verified. Long-turn screen: ["26:11"]. Source retained; audio verification, fine-grained punctuation and speaker boundaries, original artwork confirmation and live visual QA remain outstanding.

EP56 follow-up: corrected four missing music boundaries and reviewed 26:11 long-turn flag; exact page readback verified. Contextual attribution and live rendering still provisional.

EP56 Bible audit: restored separate italic deck, reduced essay headings to three, rebuilt transcript from all 1073 timestamped segments with 197 contextual blocks and nine music windows. Remaining >120s flags: [["26:11","Brendan"]]. Exact repository readback verified. Audio and visual verification remain outstanding; contextual labels and ASR punctuation are provisional.

EP56 approved redraft published: 1807 prose words, three cross-track thematic sections; exact approved essay readback verified. Transcript: manual opening dialogue/punctuation correction and automated whole-transcript capitalisation/end punctuation pass. Original raw transcript retained. Remaining sentence-level punctuation, uncertain ASR, music boundaries, attribution and visual QA not fully verified. Do not equate automated punctuation with complete copyedit.

### EP57 checkpoint — 28 November 2026
Canonical layout and provisional contextual transcript published at episodes/podbean-554796452b39ff.html; 1203 raw segments retained in 143 blocks, exact repository readback verified. Essay pending. Long guest narrative and other long turns require sentence-continuity review, music separation, detailed punctuation and audio attribution; generic early artwork not episode-verified. First two results provisional pending external adjudication. Not final Bible approval.

EP57 long-turn audit: 02:12 guest introduction retained as sustained monologue with paragraph breaks; 46:42 guest anecdote continuous until approximately 53:24, subsequent host/guest exchanges split; 70:45 discussion split at contextual interjections. Exact readback verified. Audio attribution and sentence punctuation remain provisional. Essay draft pending approval.

EP57 approved essay published: Learning How to Hear All Over Again, Professor Neville Strongpot, 1898 prose words, two thematic breaks. Approved text retained exactly; transcript/results unchanged. Editorial estimate 91/100 and 90:10 source balance, not independently measured. Exact repository readback verified; live visual, audio attribution, artwork and results QA remain outstanding.

### EP58 checkpoint — 28 November 2026
Published provisional contextual transcript and confirmed closing-recap results at episodes/podbean-84835e2366f8b7.html. 1296 raw segments mapped into 119 blocks, including 11 music windows. Exact repository readback verified. Original source linked. Contextual attribution, music boundaries, ASR punctuation and long turns require further QA; generic artwork and deployed rendering unverified. Essay pending.

EP58 approved essay published: A Quick Trip to the Ice House, fictional Gregor Bloedel, 1927 whitespace-counted prose words, no internal headings. Approved wording retained; editorial 95/100 and approximately 90:10 source balance. Corrected browser title, instant scroll CSS and canonical transcript class; limited obvious ASR corrections. Page commit db8953f4494c931b89c8148f7153764a09f14d40; exact repository readback verified. Remaining: archive-wide byline uniqueness, detailed speaker/ASR/music audit, original artwork and deployed visual QA. Approved length retained even if above normal ceiling.
