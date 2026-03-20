await initHydra({feedStrudel:1})

src(s0).kaleid(H("<4 5 6>"))
  .diff(osc(1,0.5,H("<5 10 20 50 50 5 20 80 80 10>".slow(8))))
  .modulateScale(osc(2,-0.25,H("<0.2 0.3 0.5 1 1 0.2 0.5 1.5 1.5 0.3>".slow(8))))
  .out()

samples('github:switchangel/pad')
setCpm(142/4)

///////////////////////////////////////////////
// DRUMS
///////////////////////////////////////////////

let kick = s("bd:2!4").bank("RolandTR909").gain(1.2).shape(0.2)
let clap = s("~ cp ~ cp").bank("RolandTR909").gain(0.8).room(0.1)
let hats = s("hh*16").bank("RolandTR909").gain("[0.6 0.2 0.35 0.2]*4")
let oh = s("[~ oh]*4").bank("RolandTR909").gain(0.5).lpf(6000)
let ride = s("rd*8").bank("RolandTR909").gain(0.3).lpf(5000)
let hatroll = s("hh*32").bank("RolandTR909").gain("[0.3 0.5]*16").lpf(7000).hpf(2000)

///////////////////////////////////////////////
// BASS
///////////////////////////////////////////////

let bass = n("<0@3 -2 3@3 -4>*2".add("-14,-21"))
  .scale("e:minor").s("supersaw").seg(16)
  .rlpf(sine.slow(6).range(0.15, 0.55)).lpenv(3)
  .gain(1.3).shape(0.1)

let bassheavy = n("<0@3 -2 3@3 -4>*2".add("-14,-21"))
  .scale("e:minor").s("supersaw").seg(16)
  .rlpf(sine.slow(4).range(0.1, 0.7)).lpenv(4)
  .gain(1.5).shape(0.3)

let bassbreak = n("<0 ~ -4 ~>".add("-14"))
  .scale("e:minor").s("supersaw")
  .rlpf(sine.slow(8).range(0.1, 0.3))
  .attack(0.2).release(1).gain(0.6).room(0.4)

///////////////////////////////////////////////
// LEADS
///////////////////////////////////////////////

let lead = n("<4@2 [2 0]@2 <-3 [-2 4]>@2 <7 5>@2>".add("7,-7").add("<0 3 -2 5>"))
  .scale("e:minor").s("supersaw").trancegate(1.8, 72, 2).o(3)
  .delay(0.4).delayfeedback(0.2).pan(rand)
  .rlpf(sine.slow(10).range(0.35, 0.85)).lpenv(2).gain(0.9)

let screamer = n("<7@2 [5 9]@2 <4 [2 7]>@2 <9 11>@2>".add("7,-7").add("<0 5 -3 2>"))
  .scale("e:minor").s("supersaw").trancegate(2.2, 33, 1).o(3)
  .delay(0.3).delayfeedback(0.15).pan(sine.range(0.1, 0.9).slow(2))
  .rlpf(sine.slow(6).range(0.5, 0.95)).lpenv(3).gain(1)
  .fm(0.3).fmwave("brown")

let leadbreak = n("<4 ~ 7 ~ 5 ~ 4 ~ 2 ~ 0 ~ -2 ~ 0 ~>")
  .scale("e:minor").s("triangle").o(2)
  .decay(0.15).sustain(0).lpf(perlin.range(1500, 4000).slow(4))
  .gain(0.6).delay(0.45).delayfeedback(0.5).room(0.7).pan(rand)

///////////////////////////////////////////////
// ACID
///////////////////////////////////////////////

let acid = n("<0 0 ~ 3 5 ~ 0 -2 0 3 5 7 5 ~ 3 0>".fast(2))
  .scale("e:minor").s("sawtooth").decay(0.1).sustain(0)
  .cutoff(sine.slow(4).range(250, 3500)).resonance(20)
  .ftype("ladder").gain(0.8).shape(0.45)

let acidnasty = n("<0 0 ~ 3 5 ~ 0 -2 0 3 5 7 5 ~ 3 0>".fast(2))
  .scale("e:minor").s("sawtooth").decay(0.1).sustain(0)
  .cutoff(sine.slow(3).range(200, 5000)).resonance(24)
  .ftype("ladder").gain(0.9).shape(0.6).coarse(3)

///////////////////////////////////////////////
// ATMOSPHERE
///////////////////////////////////////////////

let pad = s("swpad:0")
  .scrub(sine.slow(20).range(0.05, 0.95))
  .gain(0.35).room(0.5).size(0.8)
  .lpf(sine.slow(24).range(300, 1200))

let bigpad = n("<[0,2,4,6] [-4,0,2,4] [-2,1,3,5] [-5,-2,0,3]>")
  .scale("e:minor").s("supersaw").o(1)
  .rlpf(sine.slow(8).range(0.15, 0.5))
  .attack(0.3).release(2).gain(0.5)
  .room(0.85).size(0.95).delay(0.2).delayfeedback(0.3)

let texture = s("pulse!16").dec(0.08)
  .fm(()=>time*0.7).fmh(()=>time*1.3).o(4).gain(0.25)

let vowel = n("<[0,2,4] [-4,0,2] [-2,1,3] [-5,-2,0]>")
  .scale("e:minor").s("sawtooth").o(2)
  .vowel("<a e i o>").gain(0.3)
  .room(0.7).delay(0.25).delayfeedback(0.3)

///////////////////////////////////////////////
// STABS
///////////////////////////////////////////////

let stab = n("<~ [0,4,7] ~ ~ ~ [-2,2,5] ~ ~>")
  .scale("e:minor").s("supersaw").o(2)
  .decay(0.15).sustain(0).rlpf(0.4)
  .gain(0.7).shape(0.2).room(0.1)

let stabcrush = n("<~ [0,4,7] ~ [0,4,7] ~ [-2,2,5] ~ [-2,2,5]>")
  .scale("e:minor").s("square").o(2)
  .decay(0.12).sustain(0).cutoff(3000).resonance(8)
  .gain(0.6).shape(0.5).crush(6)

///////////////////////////////////////////////
// FX
///////////////////////////////////////////////

let riser = s("white").lpf(sine.range(200, 10000).slow(8)).hpf(200).gain(0.3).shape(0.2)
let down = s("white").lpf(sine.range(8000, 200).slow(8)).hpf(200).gain(0.25)
let siren = n(sine.range(36, 72).slow(8)).s("square").decay(0.02).sustain(0).cutoff(2500).resonance(10).gain(0.2).pan(sine.range(0.2, 0.8).slow(3))

///////////////////////////////////////////////
//                                           //
//  ARRANGEMENT — 10 sections × 8 bars      //
//  Total: 80 bars (~4.5 min at 142 BPM)    //
//                                           //
//  1:intro  2:intro2  3:build  4:drop1      //
//  5:drop1b 6:break   7:build2 8:drop2      //
//  9:drop2b 10:outro                        //
//                                           //
///////////////////////////////////////////////

$: stack(
  // DRUMS
  kick   .mask("<1 1 1 1 1 0 1 1 1 1>".slow(8)),
  clap   .mask("<0 1 1 1 1 0 0 1 1 1>".slow(8)),
  hats   .mask("<1 1 1 1 1 0 1 1 1 1>".slow(8)),
  oh     .mask("<0 0 0 1 1 0 0 1 1 0>".slow(8)),
  ride   .mask("<0 0 1 1 1 0 1 1 1 0>".slow(8)),
  hatroll.mask("<0 0 0 0 0 0 1 0 0 0>".slow(8)),

  // BASS
  bass     .mask("<0 0 1 1 1 0 1 0 0 0>".slow(8)),
  bassheavy.mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  bassbreak.mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),

  // LEADS
  lead     .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  screamer .mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  leadbreak.mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),

  // ACID
  acid     .mask("<0 0 1 1 1 0 1 0 0 0>".slow(8)),
  acidnasty.mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),

  // ATMOSPHERE
  pad     .mask("<0 1 0 1 1 1 0 1 1 1>".slow(8)),
  bigpad  .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),
  texture .mask("<0 0 0 1 1 0 0 1 1 0>".slow(8)),
  vowel   .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),

  // STABS
  stab     .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  stabcrush.mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),

  // FX
  riser .mask("<0 0 1 0 0 0 1 0 0 0>".slow(8)),
  down  .mask("<0 0 0 0 0 0 0 0 0 1>".slow(8)),
  siren .mask("<0 0 1 0 0 0 1 0 0 0>".slow(8)),
)

all(x => x.fft(4).scope({pos:0, smear:0.85}))
