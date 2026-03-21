// "midnight ramen" — lo-fi hip hop
// Key: F minor | 75 BPM | 8-section arrangement

// === VISUALS — warm amber lofi kaleidoscope ===
await initHydra({feedStrudel:1})

src(s0).kaleid(H("<3 4 5>"))
  .diff(osc(1,0.5,H("<3 5 10 15 18 3 18 5>".slow(8))))
  .modulateScale(osc(2,-0.25,H("<0.1 0.2 0.3 0.5 0.6 0.1 0.6 0.2>".slow(8))))
  .saturate(0.5)
  .out()

// === TEMPO ===
setcps(75/60/4)

// === SAMPLES ===
// Rain sample imported via Strudel sounds panel (click < arrow > import sounds)

// === DRUMS ===
// intro/bridge — sparse kick-snare, swung hats with dropout
let drums = s("[bd ~ ~ ~] [~ sd ~ ~] [~ ~ bd ~] [~ sd ~ ~], hh(5,8)")
  .bank("RolandTR808").crush(12).shape(0.15)
  .late("[0 0.012]*4").gain(0.4).room(0.25)

// verse/full — busier pattern with ghost notes and 16th hats
let drumsfull = s("[bd ~ [~ bd] ~] [~ sd ~ ~] [~ ~ bd ~] [~ sd ~ [~ sd]], hh*8")
  .bank("RolandTR808").crush(10).shape(0.2)
  .late("[0 0.012]*4").gain(0.4).room(0.2)
  .degradeBy(0.06)

// open hat on off-beats for swing in verse sections
let oh = s("~ [~ oh] ~ [~ oh]")
  .bank("RolandTR808").gain(0.3).lpf(3000)
  .room(0.3).late(0.01).release(0.15)

// === CHORDS — Fm9 / Abmaj7 / Dbmaj7 / Eb7 ===
// warm e-piano with phaser wobble
let chords = n("<[0,2,4,6,8] [2,4,6,8,10] [5,7,9,11,13] [6,8,10,12,14]>")
  .scale("F3:minor").s("gm_epiano1").slow(2)
  .lpf(950).lpq(2).room(0.35).gain(0.55)
  .phaser(3).shape(0.04).vib("1.5:.03")
  .late(0.008)
  .sometimes(x => x.delay(0.2))

// breakdown/intro — drenched in reverb and delay, higher voicing for lift
let chordswet = n("<[0,4,6,8] [2,6,8,10] [5,9,11,13] [6,10,12,14]>")
  .scale("F3:minor").s("gm_epiano1").slow(2)
  .lpf(700).lpq(3).room(0.85).size(0.9).gain(0.45)
  .delay(0.4).delaytime(0.375).delayfeedback(0.55)
  .vib("1.2:.04")

// === BASS — deep sine following chord roots ===
let bass = n("<[0 ~ 0 ~] [~ ~ 2 ~] [5 ~ ~ 5] [6 ~ ~ 0]>")
  .scale("F2:minor").s("sine").slow(2)
  .lpf(280).gain(0.65).release(0.25)
  .late(0.005)

// === MELODY — dreamy triangle with ping-pong delay ===
let melody = n("<[~ 4 6 ~] [7 ~ 4 ~] [~ 2 ~ 4] [6 ~ 7 ~]>")
  .scale("F4:minor").s("triangle").slow(2)
  .lpf(2000).release(0.35).gain(0.55).crush(14).vib("1.8:.025")
  .delay(0.3).delaytime(0.25).delayfeedback(0.4)
  .room(0.3).pan(sine.range(0.3,0.7).slow(5))
  .every(4, x => x.lpf(1400))

// stripped melody for breakdown — fewer notes, more space
let melodybreak = n("<[~ 4 ~ ~] [8 ~ ~ ~] [~ ~ ~ 4] [~ ~ 8 ~]>")
  .scale("F4:minor").s("triangle").slow(2)
  .lpf(1400).release(0.7).gain(0.4).crush(14)
  .delay(0.5).delaytime(0.375).delayfeedback(0.6)
  .room(0.6).pan(sine.range(0.2,0.8).slow(7))

// === KEYS — plucky e-piano ghost hits with random dropout ===
let keys = n("[~ 0 ~ 4] [~ ~ 2 ~] [~ 6 ~ ~] [4 ~ ~ 2]")
  .scale("F4:minor").s("gm_epiano1").slow(2)
  .lpf(perlin.range(600,1400).slow(8))
  .gain(perlin.range(0.4,0.55)).room(0.5)
  .degradeBy(0.15).crush(14)

// === PAD — warm supersaw background wash ===
let pad = n("<[0,4,7] [2,6,9]>").scale("F3:minor").s("supersaw")
  .lpf(perlin.range(250,550).slow(12)).attack(0.5).release(1.5)
  .gain(0.2).room(0.7).size(0.85)
  .velocity("[.5 1 1 1]")

// === TEXTURE — vinyl crackle from hh static ===
let texture = s("hh*16").bank("RolandTR808")
  .gain(0.04).hpf(4000).crush(4).room(0.2)
  .pan(perlin.range(0.3,0.7)).release(0.01)

// === RAIN — looped rain recording, filtered to sit behind the mix ===
let rain = s("rain").loopAt(4)
  .lpf(3500).hpf(400).gain(0.3).room(0.3)

// === RISER — reversed cymbal sweep before new sections ===
let riser = s("oh*4").bank("RolandTR808")
  .speed(-1).gain(sine.range(0,0.4))
  .lpf(sine.range(500,4000)).room(0.8).size(0.9)
  .release(0.3).hpf(600)

// === Enjoy ===

$: stack(
  drums      .mask("<1 1 0 1 0 0 0 0>".slow(8)),
  drumsfull  .mask("<0 0 1 0 1 0 1 0>".slow(8)),
  oh         .mask("<0 0 1 0 1 0 1 0>".slow(8)),
  chords     .mask("<0 1 1 1 1 0 1 0>".slow(8)),
  chordswet  .mask("<1 0 0 0 0 1 0 1>".slow(8)),
  bass       .mask("<0 1 1 1 1 0 1 0>".slow(8)),
  melody     .mask("<0 0 1 0 1 0 1 0>".slow(8)),
  melodybreak.mask("<0 0 0 0 0 1 0 0>".slow(8)),
  keys       .mask("<0 0 0 1 1 0 1 0>".slow(8)),
  pad        .mask("<1 1 0 0 1 1 0 1>".slow(8)),
  riser      .mask("<0 0 0 1 0 1 0 0>".slow(8)),
  texture    .mask("<1 1 1 1 1 1 1 1>".slow(8)),
  rain       ,
)

all(x => x.fft(4).scope({pos:0, smear:0.85}))
