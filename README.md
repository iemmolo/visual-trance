# Acid Trance 

A full-length acid trance track written entirely in [Strudel](https://strudel.cc), a browser-based live coding music environment. Reactive kaleidoscope visuals powered by Hydra.

142 BPM | E Minor | ~4.5 minutes | 10-section arrangement

## Prerequisites

This track uses custom functions from [Switch Angel's Strudel scripts](https://github.com/switchangel/strudel-scripts), specifically:

- `.trancegate(density, seed, length)` — rhythmic gating effect used on the lead and screamer synths
- `.rlpf(0-1)` — relative low-pass filter (0 = closed, 1 = open)
- `.o(octave)` — shorthand octave setter

### Installing the Prebake

1. Download `prebake.strudel` from [switchangel/strudel-scripts](https://github.com/switchangel/strudel-scripts)
2. In Strudel, open **Settings** (gear icon)
3. Scroll to **Prebake**
4. Upload the `prebake.strudel` file
5. Restart Strudel

Without the prebake, the leads will sound like continuous drones instead of gated trance leads. Everything else will work fine.

### Sample Packs

The track also loads Switch Angel's pad samples:

```
samples('github:switchangel/pad')
```

This loads automatically when you run the code — no manual setup needed.

## Usage

1. Install the prebake (see above)
2. Open [strudel.cc](https://strudel.cc)
3. Paste the contents of `acid-trance-e-minor.js` into the editor
4. Press **Ctrl+Enter** to play

## Song Structure

| Section | Bars | What's Playing |
|---------|------|----------------|
| Intro | 1-8 | Kick, hats |
| Intro 2 | 9-16 | + clap, pad |
| Build | 17-24 | + bass, acid, ride, riser, siren |
| Drop 1 | 25-32 | + lead, stabs, oh, texture |
| Drop 1b | 33-40 | Drop 1 continues |
| Breakdown | 41-48 | Stripped to bassbreak, bigpad, leadbreak, vowel |
| Build 2 | 49-56 | Bass + acid return, hatroll fill, riser, siren |
| Drop 2 | 57-64 | Heavy bass, screamer lead, nasty acid, crushed stabs |
| Drop 2b | 65-72 | Drop 2 continues |
| Outro | 73-80 | Kick, clap, hats, pad, downlifter |



