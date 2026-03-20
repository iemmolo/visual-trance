await initHydra({feedStrudel:1})

src(s0).kaleid(H("<3 4 5>"))
  .diff(osc(1,0.5,H("<5 10 20 50 50 5 20 80 80 10>".slow(8))))
  .modulateScale(osc(2,-0.25,H("<0.2 0.3 0.5 1 1 0.2 0.5 1.5 1.5 0.3>".slow(8))))
  .out()

samples('github:switchangel/pad')
setcps(100/60/4)

///////////////////////////////////////////////
// DRUMS — TR808
///////////////////////////////////////////////

let kick = s("bd!4").bank("RolandTR808").gain(1.2).shape(0.15)
let clap = s("~ cp ~ cp").bank("RolandTR808").gain(0.85).room(0.15)
let hats = s("hh*8").bank("RolandTR808").gain("[0.5 0.25]*4").every(4, x => x.gain(0.6))
let hatfast = s("hh*16").bank("RolandTR808").gain("[0.45 0.15 0.3 0.15]*4").lpf(7000)
let oh = s("[~ oh]*2").bank("RolandTR808").gain(0.4).lpf(5000)
let ride = s("rd*4").bank("RolandTR808").gain(0.3).lpf(6000)
let toms = s("[~ ~ lt] [~ mt ~] [~ ~ ht] [lt mt ht]").bank("RolandTR808").gain(0.6).room(0.2)

///////////////////////////////////////////////
// BASS — deep sub with sidechain pump
///////////////////////////////////////////////

let bass = n("<0 0 -2 -2 3 3 -5 -5>".add("-14")).scale("f#:minor").s("sawtooth").lpf(sine.slow(8).range(150, 600)).gain("[1.2 0.6]*4").shape(0.15)

let bassheavy = n("<0 0 -2 -2 3 3 -5 -5>".add("-14,-21")).scale("f#:minor").s("sawtooth").lpf(sine.slow(4).range(100, 800)).gain("[1.4 0.7]*4").shape(0.3)

let bassbreak = n("<0 ~ -5 ~>".add("-14")).scale("f#:minor").s("sine").attack(0.15).release(1.2).gain(0.5).room(0.3)

///////////////////////////////////////////////
// ARPS — synthwave signature
///////////////////////////////////////////////

let arp = n("<0 2 4 7 9 7 4 2 0 4 7 9 11 9 7 4>".add("7")).scale("f#:minor").s("sawtooth").o(2).decay(0.06).sustain(0).lpf(sine.slow(8).range(1500, 4500)).lpenv(4).lpd(0.2).gain(0.7).delay(0.3).delayfeedback(0.3).juxBy(0.6, rev).sometimes(x => x.fast(2))

let arpwide = n("<0 4 7 11 9 4 7 2 0 7 11 14 12 7 4 0>".add("7,-7")).scale("f#:minor").s("sawtooth").o(2).decay(0.08).sustain(0).lpf(sine.slow(6).range(2000, 6000)).lpenv(5).lpd(0.15).gain(0.8).delay(0.35).delayfeedback(0.4).jux(rev)

let arpbreak = n("<0 ~ 4 ~ 7 ~ 4 ~>").scale("f#:minor").s("triangle").o(2).decay(0.12).sustain(0).lpf(2500).gain(0.5).delay(0.45).delayfeedback(0.55).room(0.6).pan(rand)

///////////////////////////////////////////////
// LEAD — warm sawtooth
///////////////////////////////////////////////

let leadbuild = n("<4@2 [2 0]@2 <-2 [-3 4]>@2 <7 5>@2>".add("7,-7")).scale("f#:minor").s("sawtooth").o(2).attack(0.03).decay(0.4).sustain(0.3).release(0.5).lpf(800).gain(0.6).delay(0.3).delayfeedback(0.3).room(0.2).pan(rand)

let lead = n("<4@2 [2 0]@2 <-2 [-3 4]>@2 <7 5>@2>".add("7,-7")).scale("f#:minor").s("sawtooth").o(2).attack(0.03).decay(0.4).sustain(0.3).release(0.5).lpf(sine.slow(10).range(800, 2500)).gain(0.8).delay(0.3).delayfeedback(0.2).room(0.2).pan(rand).off(1/8, x => x.add(note(7)).gain(0.5))

let leadhot = n("<7@2 [5 9]@2 <4 [2 7]>@2 <9 11>@2>".add("7,-7")).scale("f#:minor").s("sawtooth").o(2).attack(0.02).decay(0.3).sustain(0.4).release(0.4).lpf(sine.slow(6).range(1000, 3500)).gain(0.95).fm(0.15).fmwave("sine").delay(0.25).delayfeedback(0.15).room(0.15).pan(sine.range(0.2, 0.8).slow(2))

let leadbreak = n("<4 ~ 7 ~ 9 ~ 7 ~ 4 ~ 2 ~ 0 ~ -2 ~>").scale("f#:minor").s("sine").o(2).decay(0.2).sustain(0).lpf(2000).gain(0.5).delay(0.5).delayfeedback(0.5).room(0.7).pan(rand)

///////////////////////////////////////////////
// ATMOSPHERE
///////////////////////////////////////////////

let pad = n("<[0,2,4] [-5,0,2] [-2,1,4] [-3,-1,2]>").scale("f#:minor").s("supersaw").o(1).attack(0.3).release(1.5).rlpf(sine.slow(12).range(0.15, 0.5)).gain(0.4).room(0.6).size(0.8)

let bigpad = n("<[0,2,4,7] [-5,0,2,4] [-2,1,4,6] [-3,-1,2,5]>").scale("f#:minor").s("supersaw").o(1).rlpf(sine.slow(8).range(0.15, 0.5)).attack(0.4).release(2).gain(0.55).room(0.85).size(0.95).delay(0.2).delayfeedback(0.3)

let swpad = s("swpad:0").scrub(sine.slow(24).range(0.05, 0.95)).gain(0.3).room(0.5).size(0.8).lpf(sine.slow(20).range(300, 1500))

let texture = s("pulse!8").dec(0.12).fm(()=>time*0.4).fmh(()=>time*0.9).o(3).gain(0.2).lpf(2500).pan(rand)

let vowel = n("<[0,2,4] [-5,0,2] [-2,1,4] [-3,-1,2]>").scale("f#:minor").s("sawtooth").o(2).vowel("<a e i o>").gain(0.3).room(0.7).delay(0.25).delayfeedback(0.3)

///////////////////////////////////////////////
// STABS — synth brass
///////////////////////////////////////////////

let stab = n("<~ [0,4,7] ~ ~ ~ [-2,2,5] ~ ~>").scale("f#:minor").s("sawtooth").o(2).decay(0.2).sustain(0.1).release(0.15).lpf(2500).lpenv(3).gain(0.65).shape(0.1).room(0.15).sometimes(x => x.room(0.4))

let stabhard = n("<~ [0,4,7] ~ [0,4,7] ~ [-2,2,5] ~ [-2,2,5]>").scale("f#:minor").s("square").o(2).decay(0.15).sustain(0).lpf(3000).lpenv(4).gain(0.7).shape(0.3).crush(10)

///////////////////////////////////////////////
// FX
///////////////////////////////////////////////

let riser = s("white").lpf(sine.range(200, 8000).slow(8)).hpf(200).gain(0.25).shape(0.15)
let down = s("white").lpf(sine.range(6000, 200).slow(8)).hpf(200).gain(0.2)
let siren = n(sine.range(48, 84).slow(8)).s("sawtooth").decay(0.03).sustain(0).lpf(2000).gain(0.2).room(0.3).pan(sine.range(0.2, 0.8).slow(3))

///////////////////////////////////////////////
//                                           //
//  ARRANGEMENT — 10 sections × 8 bars      //
//  Total: 80 bars (~3.2 min at 100 BPM)    //
//                                           //
//  1:intro  2:intro2  3:build  4:drop1      //
//  5:drop1b 6:break   7:build2 8:drop2      //
//  9:drop2b 10:outro                        //
//                                           //
///////////////////////////////////////////////

$: stack(
  // DRUMS
  kick    .mask("<1 1 1 1 1 0 1 1 1 1>".slow(8)),
  clap    .mask("<0 1 1 1 1 0 0 1 1 1>".slow(8)),
  hats    .mask("<1 1 1 1 1 0 1 0 0 1>".slow(8)),
  hatfast .mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  oh      .mask("<0 0 0 1 1 0 0 1 1 0>".slow(8)),
  ride    .mask("<0 0 1 1 1 0 1 1 1 0>".slow(8)),
  toms    .mask("<0 0 0 0 0 0 1 0 0 0>".slow(8)),

  // BASS
  bass     .mask("<0 0 1 1 1 0 1 0 0 0>".slow(8)),
  bassheavy.mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  bassbreak.mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),

  // ARPS
  arp     .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  arpwide .mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  arpbreak.mask("<0 0 0 0 0 1 0 0 0 1>".slow(8)),

  // LEADS
  leadbuild.mask("<0 1 1 0 0 0 1 0 0 0>".slow(8)),
  lead     .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  leadhot  .mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),
  leadbreak.mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),

  // ATMOSPHERE
  pad    .mask("<0 1 0 1 1 0 0 1 1 1>".slow(8)),
  bigpad .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),
  swpad  .mask("<0 0 0 1 1 1 0 1 1 0>".slow(8)),
  texture.mask("<0 0 0 1 1 0 0 1 1 0>".slow(8)),
  vowel  .mask("<0 0 0 0 0 1 0 0 0 0>".slow(8)),

  // STABS
  stab    .mask("<0 0 0 1 1 0 0 0 0 0>".slow(8)),
  stabhard.mask("<0 0 0 0 0 0 0 1 1 0>".slow(8)),

  // FX
  riser .mask("<0 0 1 0 0 0 1 0 0 0>".slow(8)),
  down  .mask("<0 0 0 0 0 0 0 0 0 1>".slow(8)),
  siren .mask("<0 0 1 0 0 0 1 0 0 0>".slow(8)),
)

all(x => x.fft(4).scope({pos:0, smear:0.85}))
