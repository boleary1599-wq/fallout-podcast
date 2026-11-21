# Shared episode layout
For every **new** episode, include these two assets in the HTML <head> **after** styles.css and any legacy page-specific styles:

```html
<link rel="stylesheet" href="../episode-layout.css">
<script defer src="../episode-navigation.js"></script>
```

Use the Episode 6 markup for the results (four `results-match` rows inside `results-matchups`), e.g.:

```html
<section class="episode-results-bottom" id="results">
  <h2>The Results</h2>
  <p class="results-subtitle">Episode 24 · Four head-to-head contests</p>
  <div class="results-matchups">
    <div class="results-match">
      <span class="result-winner">WINNING SONG <small>WINNER</small></span>
      <span class="result-versus">def.</span>
      <span class="result-loser">LOSING SONG</span>
    </div>
  </div>
</section>
```

Navigation links `#results`, `#essay`, `#transcript`, or `#epNN-essay`/`#epNN-transcript` jump instantly without animated scrolling.

This is a reusable **opt-in** layer: it does not automatically rewrite old episode files. Keep episode-specific content (titles, audio, essay, transcript, winners) in each HTML file. For a fully uniform new page, start from Episode 6 structure and link these shared assets instead of pasting another results CSS block.
