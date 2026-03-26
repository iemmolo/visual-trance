await initHydra({feedStrudel:1})

src(s0).kaleid(H("<3 4 5>"))
  .diff(osc(1,0.5,H("<3 8 15 45 45 3 15 60 60 8>".slow(8))))
  .modulateScale(osc(2,-0.25,H("<0.1 0.2 0.4 0.8 0.8 0.1 0.4 1.2 1.2 0.2>".slow(8))))
  .out()

samples('github:switchangel/pad')
setCpm(124/4)

// ── DRUMS ──
let kick = s("bd:3!4").bank("RolandTR909").gain(1.15).shape(0.15).lpf(8000)
let clap = s("~ cp ~ cp").bank("RolandTR909").gain(0.7).room(0.2).delay(0.08).delayfeedback(0.15).sometimes(x => x.gain(0.55))
let hats = s("[hh hh hh ~] [hh hh ~ hh] [hh hh hh ~] [hh ~ hh hh]").bank("RolandTR909").gain("[0.55 0.15 0.4 0.15]*4").hpf(5000).nudge("[0 0.012]*8")
let oh = s("[~ oh]*4").bank("RolandTR909").gain(0.35).lpf(5000).room(0.15)
let ride = s("rd*8").bank("RolandTR909").gain(0.2).lpf(4500).hpf(3000).pan(0.6)
let hatroll = s("hh*32").bank("RolandTR909").gain("[0.2 0.4]*16").lpf(6000).hpf(3000)

// ── PERCUSSION — shaker + rim + clave for depth ──
let shaker = s("hh*16").bank("RolandTR808").gain("[0.12 0.28 0.18 0.28]*4").hpf(8000).lpf(14000).pan(0.7).nudge("[0 0.015]*8")
let rim = s("~ [rim ~] ~ [~ rim]").bank("RolandTR808").gain(0.35).lpf(4000).pan(0.3).room(0.15).sometimes(x => x.delay(0.25).delayfeedback(0.2))

// ── SUB — pure sine weight ──
let sub = n("<0@3 -2 3@3 1>").scale("ab:minor").s("sine").o(-2).gain(0.9).lpf(120)
let subheavy = n("<0@3 -2 3@3 1>").scale("ab:minor").s("sine").o(-2).gain(1.1).lpf(150).shape(0.05)

// ── BASS — syncopated mid-bass with ghost notes ──
let bass = n("<0 ~ [~ 0] -2 3 ~ [3 ~] 1>".add("-7")).scale("ab:minor").s("sawtooth").seg(16).lpf(sine.slow(8).range(300, 1100)).lpenv(3).hpf(130).gain(1.0).shape(0.08)
let bassheavy = n("<0 [~ 0] ~ -2 3 [~ 3] 1 ~>".add("-7")).scale("ab:minor").s("supersaw").seg(16).lpf(sine.slow(5).range(300, 1500)).lpenv(4).hpf(130).gain(1.2).shape(0.2)
let bassbreak = n("<0 ~ 3 ~>".add("-7")).scale("ab:minor").s("sawtooth").attack(0.15).release(1.5).gain(0.5).room(0.5).lpf(600).hpf(130)

// ── CHORDS — open voicings with 9ths, pumping ──
let chords = n("<[0,4,7,9] [-3,0,4,7] [-5,0,2,5] [-2,2,5,7]>").scale("ab:minor").s("supersaw").seg(8).release(0.3).lpf(sine.slow(12).range(600, 2800)).lpq(4).gain("[0.5 0.18 0.35 0.18]*2").room(0.35).size(0.6).hpf(250)
let chordsbright = n("<[0,4,7,9] [-3,0,4,7] [-5,0,2,5] [-2,2,5,7]>").scale("ab:minor").s("supersaw").seg(8).release(0.3).lpf(sine.slow(6).range(1200, 4500)).lpq(5).gain("[0.45 0.15 0.3 0.15]*2").room(0.3).size(0.5).hpf(250)
let chordswet = n("<[0,4,7,9] [-3,0,4,7] [-5,0,2,5] [-2,2,5,7]>").scale("ab:minor").s("supersaw").attack(0.3).release(2).lpf(sine.slow(16).range(300, 1500)).gain("[0.5 0.25 0.35 0.25]*2").room(0.85).size(0.95).delay(0.2).delayfeedback(0.3).hpf(200)

// ── KEYS — plucky arp, the Fred Again heart ──
let keys = n("<[0 4 7 9 7 4] [-3 0 4 7 4 0] [-5 0 2 5 2 0] [-2 2 5 7 5 2]>").scale("ab:minor").s("triangle").o(2).decay(0.1).sustain(0).lpf(perlin.range(2000, 5000).slow(8)).gain(0.55).delay(0.3).delayfeedback(0.45).room(0.3).pan(sine.range(0.3, 0.7).slow(5)).hpf(400)
let keysbreak = n("<[0 ~ 4 ~ 7 ~] [~ 0 ~ 4 ~ 7]>").scale("ab:minor").s("triangle").o(2).decay(0.2).sustain(0).lpf(2500).gain(0.4).delay(0.5).delayfeedback(0.55).room(0.8).size(0.9).pan(rand).hpf(400)
let keyscounter = n("<[9 7 4 0 4 7] [7 4 0 -3 0 4] [5 2 0 -5 0 2] [7 5 2 -2 2 5]>").scale("ab:minor").s("triangle").o(2).decay(0.08).sustain(0).lpf(sine.slow(4).range(2500, 6000)).gain(0.5).delay(0.25).delayfeedback(0.35).pan(sine.range(0.25, 0.75).slow(3)).hpf(400)

// ── LEAD — vocal vowel with melodic echo via .off() ──
let lead = n("<4 ~ [6 4] ~ 2 ~ [0 2] ~ 4 ~ [6 7] ~ 9 ~ [7 6] ~>").scale("ab:minor").s("sawtooth").o(2).decay(0.15).sustain(0).vowel("<a e i o>").lpf(perlin.range(1800, 5500).slow(6)).gain(0.65).fm(0.15).fmh(2).off(1/8, x => x.gain(0.3).delay(0.4).delayfeedback(0.5)).room(0.25).pan(0.4).hpf(400)
let leadheavy = n("<9 ~ [7 9] ~ 6 ~ [4 6] ~ 9 ~ [11 9] ~ 7 ~ [6 4] ~>").scale("ab:minor").s("sawtooth").o(2).decay(0.1).sustain(0).vowel("<e i o a>").lpf(sine.slow(4).range(2500, 7000)).gain(0.8).fm(0.25).fmh(3).off(1/8, x => x.gain(0.35).delay(0.3).delayfeedback(0.4)).pan(0.6).hpf(400)
let leadbreak = n("<4 ~ ~ ~ 6 ~ ~ ~ 5 ~ ~ ~ 2 ~ ~ ~>").scale("ab:minor").s("triangle").o(2).decay(0.3).sustain(0).vowel("<o a>").lpf(perlin.range(800, 3000).slow(8)).gain(0.4).delay(0.5).delayfeedback(0.6).room(0.85).size(0.9).pan(rand).hpf(400)

// ── INTRO HOOK — filtered preview of lead melody ──
let introhook = n("<4 ~ [6 4] ~ 2 ~ [0 2] ~ 4 ~ [6 7] ~ 9 ~ [7 6] ~>").scale("ab:minor").s("triangle").o(2).decay(0.12).sustain(0).lpf(sine.slow(4).range(600, 1800)).gain(0.4).delay(0.45).delayfeedback(0.5).room(0.5).pan(sine.range(0.3, 0.7).slow(6)).hpf(400)

// ── STAB — offbeat house stab with pump ──
let stab = n("<~ [0,4,7] ~ ~ ~ [-2,2,5] ~ ~>").scale("ab:minor").s("supersaw").o(2).decay(0.18).sustain(0).lpf(2500).gain("[0.6 0.25]*4").room(0.2).shape(0.1).hpf(300)
let stabcrush = n("<~ [0,4,7] ~ [0,4,7] ~ [-2,2,5] ~ [-2,2,5]>").scale("ab:minor").s("square").o(2).decay(0.12).sustain(0).lpf(3500).resonance(6).gain("[0.55 0.25]*4").shape(0.35).crush(8).hpf(300)

// ── VOCAL WASH — breakdown choir ──
let voxwash = n("<[0,2,4] [-3,0,4] [-5,0,2] [-2,2,5]>").scale("ab:minor").s("sawtooth").o(2).vowel("<a e i o>").attack(0.2).release(1.2).lpf(sine.slow(10).range(500, 2000)).gain(0.25).room(0.7).delay(0.2).delayfeedback(0.35).juxBy(0.4, x => x.vowel("<o a e i>")).hpf(300)

// ── ATMOSPHERE ──
let pad = s("swpad:0").scrub(sine.slow(24).range(0.05, 0.95)).gain("[0.3 0.12 0.2 0.12]*2").room(0.6).size(0.85).lpf(sine.slow(20).range(250, 1000))
let bigpad = n("<[0,4,7,9] [-3,0,4,7] [-5,0,2,5] [-2,2,5,7]>").scale("ab:minor").s("supersaw").o(1).attack(0.5).release(3).lpf(sine.slow(8).range(250, 800)).gain(0.45).room(0.9).size(0.95).delay(0.15).delayfeedback(0.25).juxBy(0.3, rev)
let texture = s("pulse!16").dec(0.06).fm(()=>time*0.4).fmh(()=>time*0.8).o(4).gain(0.15).lpf(3000).pan(rand).hpf(2000)

// ── FX ──
let riser = s("white").lpf(sine.range(200, 8000).slow(8)).hpf(200).gain(0.25).shape(0.15)
let siren = n(sine.range(36, 60).slow(8)).s("sine").decay(0.03).sustain(0).lpf(2000).gain(0.15).pan(sine.range(0.2, 0.8).slow(3))
let down = s("white").lpf(sine.range(6000, 200).slow(8)).hpf(200).gain(0.2)

// ── ARRANGEMENT ──
// Pos:     1:intro   2:intro2  3:build   4:drop1   5:drop1b  6:break   7:build2  8:drop2   9:drop2b  10:outro
$: stack(
  kick       .mask("<1 1 1 1 1 0 1 1 1 1>".slow(8)),
  clap       .mask("<0 1 1 1 1 0 0 1 1 1>".slow(8)),
  hats       .mask("<1 1 1 1 1 0 1 1 1 1>".slow(8)),
  oh         .mask("<0 0 0 1 1 0 0 1 1 0>".slow(8)),
  ride       .mask("<0 0 1 1 1 0 1 1 1 0>".slow(8)),
  hatroll    .mask("<0 0 0 0 0 0 1 0 0 0>".slow(8)),
  shaker     .mask("<0 1 1 1 1 0 1 1 1 0>".slow(8)),
  rim        .mask("<0 0 0 1 1 0 0 1 1 0>".slow(8)),
  sub        .mask("<0 0 1 1 1 0 0 0 0 0>".slow(8)),
  subheavy   .mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  bass       .mask("<0 0 1 1 1 0 1 0 0 0>".slow(8)),
  bassheavy  .mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  bassbreak  .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),
  chords     .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  chordsbright.mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  chordswet  .mask("<0 1 1 0 0 1 1 0 0 1>".slow(8)),
  keys       .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  keysbreak  .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),
  keyscounter.mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  introhook  .mask("<1 1 0 0 0 0 0 0 0 0>".slow(8)),
  lead       .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  leadheavy  .mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  leadbreak  .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),
  voxwash    .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),
  stab       .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  stabcrush  .mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  pad        .mask("<0 1 0 1 1 1 0 1 1 1>".slow(8)),
  bigpad     .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),
  texture    .mask("<0 0 0 1 1 0 0 1 1 0>".slow(8)),
  riser      .mask("<0 0 1 0 0 0 1 0 0 0>".slow(8)),
  siren      .mask("<0 0 1 0 0 0 1 0 0 0>".slow(8)),
  down       .mask("<0 0 0 0 0 0 0 0 0 1>".slow(8)),
)

all(x => x.fft(4).scope({pos:0, smear:0.85}))
