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
