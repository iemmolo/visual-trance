// "soft static" — ambient sleep
// Key: Db major (lydian) | 55 BPM | 8-section drift
// No drums. No rhythm. Just warmth and rain.

// === VISUALS — deep blue slow drift ===
await initHydra({feedStrudel:1})

src(s0).kaleid(H("<3 3 4>"))
  .diff(osc(0.5,0.3,H("<2 2 3 4 5 4 3 2>".slow(12))))
  .modulateScale(osc(1,-0.15,H("<0.1 0.1 0.1 0.2 0.3 0.2 0.15 0.1>".slow(12))))
  .saturate(0.35)
  .out()

// === TEMPO — glacial ===
setcps(55/60/4)

// === SAMPLES ===
// Rain sample imported via Strudel sounds panel

// === PAD 1 — wide warm wash, slow 4-chord drift ===
let pad = n("<[0,4,7,11] [5,9,12,16] [2,6,9,13] [4,7,11,14]>").scale("Db3:lydian").s("supersaw").slow(2)
  .lpf(perlin.range(200,500).slow(17)).attack(1.5).release(3)
  .gain(0.25).room(0.85).size(0.95)
  .pan(perlin.range(0.35,0.65).slow(11))
  .vib("0.4:.02").phaser(0.3)
  .juxBy(0.3, rev)
  .sometimes(x => x.lpf(350))
  .orbit(1)

// === PAD 2 — higher octave glass shimmer, organic dropout ===
let shimmer = n("<[4,7,11] [9,12,16] [6,9,13] [7,11,14]>").scale("Db4:lydian").s("triangle").slow(2)
  .lpf(perlin.range(250,600).slow(19)).attack(2.5).release(4.5)
  .gain(perlin.range(0.05,0.1).slow(13)).room(0.9).size(0.95)
  .pan(perlin.range(0.2,0.8).slow(23))
  .vib("0.3:.03").fm(1)
  .degradeBy(0.2)
  .orbit(2)

// === BASS — deep sine, glacial entry ===
let bass = n("<0 5 2 4>").scale("Db1:lydian").s("sine").slow(2)
  .lpf(180).attack(1.5).release(2.5)
  .gain(perlin.range(0.3,0.45).slow(7))
  .orbit(3)

// === SUB DRONE — so deep you feel it in your chest ===
let drone = n("0").scale("Db0:lydian").s("sine").slow(8)
  .lpf(90).attack(4).release(6)
  .gain(perlin.range(0.15,0.25).slow(19))
  .orbit(4)

// === SINGING BOWL — high quiet bell, rings and fades ===
let bowl = n("<11 ~ ~ ~ ~ 7 ~ ~ ~ ~ ~ 4 ~ ~ ~ ~>").scale("Db5:lydian").s("triangle")
  .lpf(perlin.range(1200,2200).slow(23)).attack(0.01).decay(3).sustain(0).release(6)
  .gain(perlin.range(0.04,0.09).slow(17))
  .delay(0.4).delaytime(0.66).delayfeedback(0.5)
  .room(0.95).size(0.95)
  .pan(rand)
  .fm(2)
  .orbit(2)

// === ARPEGGIO — slow dreamy notes, long blurry tails ===
let arp = n("<[~ 4 ~ 7] [~ 11 ~ 9] [~ 6 ~ 4] [~ 9 ~ 7]>").scale("Db4:lydian").s("triangle").slow(4)
  .lpf(perlin.range(600,1100).slow(13)).release(1.5).gain(0.25)
  .delay(0.55).delaytime(0.5).delayfeedback(0.68)
  .room(0.85).size(0.9)
  .pan(perlin.range(0.2,0.8).slow(7))
  .crush(15).vib("0.6:.02")
  .juxBy(0.5, rev)
  .sometimes(x => x.gain(0.15))
  .orbit(2)

// === ARPEGGIO 2 — slower, lower, mirrored, organic ===
let arp2 = n("<[0 ~ ~ ~] [~ ~ 4 ~] [~ 2 ~ ~] [~ ~ ~ 6]>").scale("Db3:lydian").s("triangle").slow(4)
  .lpf(perlin.range(400,800).slow(17)).release(2).gain(0.18)
  .delay(0.6).delaytime(0.75).delayfeedback(0.65)
  .room(0.85).size(0.95)
  .pan(perlin.range(0.3,0.7).slow(11))
  .juxBy(0.4, rev)
  .degradeBy(0.15)
  .orbit(2)

// === TONE — held sine following chord roots ===
let tone = n("<0 5 2 4>").scale("Db2:lydian").s("sine").slow(4)
  .lpf(perlin.range(150,280).slow(23)).attack(3).release(5)
  .gain(0.15).room(0.9).size(0.95)
  .every(3, x => x.gain(0.1))
  .orbit(3)

// === TEXTURE — soft crackle, gentler for sleep ===
let texture = s("hh*16").bank("RolandTR808")
  .gain(0.02).hpf(3500).crush(5).room(0.35)
  .pan(perlin.range(0.3,0.7)).release(0.01)
  .orbit(5)

// === RAIN — two copies offset by half the loop ===
// rain1: plays first 85% of sample, avoids dead tail
let rain = s("rain").loopAt(4)
  .lpf(2500).hpf(500).gain(0.15).room(0.4)
  .end(0.85)
  .orbit(5)

// rain2: same trim, offset by 2 cycles so it covers rain1's loop point
let rain2 = s("rain").loopAt(4)
  .lpf(2500).hpf(500).gain(0.15).room(0.4)
  .end(0.85).late(2)
  .orbit(5)

// === ARRANGEMENT ===
// 8 sections, each 12 cycles long (~10.5 min per loop)
//         still  drift  warm  bloom  deep  glow  fade  sleep
$: stack(
  pad      .mask("<1 1 1 1 1 1 1 1>".slow(12)),
  shimmer  .mask("<0 0 0 1 1 1 1 0>".slow(12)),
  bass     .mask("<0 0 1 1 1 1 0 0>".slow(12)),
  drone    .mask("<0 0 0 0 1 1 1 1>".slow(12)),
  bowl     .mask("<0 0 0 0 1 1 1 0>".slow(12)),
  arp      .mask("<0 0 0 0 1 1 0 0>".slow(12)),
  arp2     .mask("<0 0 0 0 0 1 1 0>".slow(12)),
  tone     .mask("<1 1 1 1 1 1 1 1>".slow(12)),
  texture  .mask("<1 1 1 1 1 1 1 1>".slow(12)),
  rain     ,
  rain2    ,
)

all(x => x.fft(4).scope({pos:0, smear:0.85}))
