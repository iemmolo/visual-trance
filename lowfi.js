await initHydra({feedStrudel:1})

src(s0).kaleid(H("<4 4 5 6 5 4>".slow(12)))
  .diff(osc(0.5,0.2,H("<5 10 20 35 35 5>".slow(12))))
  .modulateRotate(osc(0.5,0.1),H("<0.05 0.1 0.2 0.4 0.4 0.05>".slow(12)))
  .blend(src(o0),H("<0.6 0.7 0.8 0.85 0.85 0.6>".slow(12)))
  .out()

samples('github:switchangel/pad')
setcps(72/60/4)

///////////////////////////////////////////////
// DRUMS — swung, ghosted, saturated
///////////////////////////////////////////////

let drums = s("[bd ~] [~ bd?] [bd ~] [~ bd?], ~ [~ sd:3] ~ sd:3?, [~ hh] hh [~ hh] [hh ~]").lpf(perlin.range(1800, 3500).slow(8)).crush(10).coarse(2).shape(0.1).gain(0.8).room(0.25).size(0.5).sometimes(x => x.speed(perlin.range(0.94, 1.06)))

let drumsfull = s("[bd ~] [~ bd] [~ bd?] [bd ~], ~ [~ sd:3] ~ [sd:3 sd:3?], [~ hh] hh [~ hh] [hh hh?], ~ ~ [~ rm] ~").lpf(perlin.range(1800, 3500).slow(8)).crush(10).coarse(2).shape(0.1).gain(0.8).room(0.25).size(0.5).sometimes(x => x.speed(perlin.range(0.94, 1.06)))

let brush = s("[~ hh:2] [hh:2 ~] [~ hh:2] [hh:2 ~]").lpf(1500).hpf(400).gain(0.15).crush(8).shape(0.05).room(0.35).size(0.5).pan(perlin.range(0.3, 0.7).slow(4)).degradeBy(0.4)

///////////////////////////////////////////////
// BASS — warm sine, occasional octave jump
///////////////////////////////////////////////

let bass = n("<0 -3 -1 -5 0 [-3 -1] -5 [-4 -2]>").scale("bb:minor").s("sine").o(-1).lpf(350).gain(0.9).release(0.25).shape(0.12).room(0.2).size(0.4).sometimes(x => x.gain(0.7)).every(4, x => x.o(0).lpf(500).gain(0.7))

let basswalk = n("<0 2 -1 -3 0 [2 4] -5 [-3 -1] -5 [-4 0] -1 [-3 2] 0 -5 -3 -1>").scale("bb:minor").s("sine").o(-1).lpf(400).gain(0.9).release(0.15).shape(0.12).room(0.2).size(0.4).sometimes(x => x.gain(0.7)).every(3, x => x.o(0).lpf(550).gain(0.7))

let sub = n("<0 -3 -1 -5 0 -3 -5 -4>").scale("bb:minor").s("sine").o(-1).lpf(200).gain(0.5).release(0.3)

///////////////////////////////////////////////
// CHORDS — rhodes, warm, dreamy tails
///////////////////////////////////////////////

let chords = n("<[0,2,4,6,9] [-3,0,2,4,7] [-1,1,3,5,8] [-5,-2,0,3,6] [0,2,4,6,9] [-3,0,2,5,7] [-1,1,3,6,8] [-5,-2,0,4,6]>").scale("bb:minor").s("sawtooth").o(1).attack(0.04).lpf(400).lpenv(3).lpd(0.4).lpq(4).release(1).shape(0.08).gain("[0.35 0.5]*4").room(0.55).size(0.7).speed(perlin.range(0.98, 1.02).slow(6)).off(1/16, x => x.add(note(0.12)).gain(0.3).lpf(350)).sometimes(x => x.lpf(perlin.range(350, 550))).every(4, x => x.room(0.7).delay(0.25).delayfeedback(0.25))

let chordswet = n("<[0,2,4,6,9] [-3,0,2,4,7] [-1,1,3,5,8] [-5,-2,0,3,6] [0,2,4,6,9] [-3,0,2,5,7] [-1,1,3,6,8] [-5,-2,0,4,6]>").scale("bb:minor").s("sawtooth").o(1).attack(0.06).lpf(350).lpenv(2).lpd(0.6).lpq(3).release(1.5).shape(0.08).gain("[0.4 0.55]*4").room(0.9).size(0.95).speed(perlin.range(0.97, 1.03).slow(8)).delay(0.4).delayfeedback(0.45)

///////////////////////////////////////////////
// MELODY — warm, stereo, dream echo
///////////////////////////////////////////////

let melody = n("<4@3 <-3 [-1 2]>@5 <0 [-2 4] 2 [0 5]>@5 ~@3>").scale("bb:minor").s("sine").o(2).fm(0.15).fmwave("sine").shape(0.05).lpf(perlin.range(1500, 3000).slow(6)).release(0.35).gain(0.55).room(0.5).size(0.65).delay(0.3).delayfeedback(0.35).pan(perlin.range(0.2, 0.8).slow(8)).degradeBy(0.15).speed(perlin.range(0.99, 1.01).slow(10)).juxBy(0.3, rev).off(1/4, x => x.add(note(7)).gain(0.3).room(0.65).lpf(2000)).off(1/2, x => x.add(note(12)).gain(0.15).room(0.9).size(0.95).lpf(1500)).every(3, x => x.delay(0.45).delayfeedback(0.45))

let melodybreak = n("<7 ~ ~ 5 ~ ~ 4 ~ ~ 2 ~ ~ 0 ~ ~ ~>").scale("bb:minor").s("sine").o(2).fm(0.1).shape(0.05).release(0.5).lpf(2000).gain(0.4).room(0.8).size(0.9).delay(0.5).delayfeedback(0.55).speed(perlin.range(0.98, 1.02).slow(8)).pan(rand)

///////////////////////////////////////////////
// BELLS — long trails, occasional runs
///////////////////////////////////////////////

let bells = n("<9 ~ ~ 7 ~ 4 ~ ~ 6 ~ ~ 2 ~ 4 ~ ~>").scale("bb:minor").s("sine").o(3).fm(0.2).fmwave("sine").fmh(4).decay(0.6).sustain(0).shape(0.05).lpf(perlin.range(2000, 4000).slow(8)).gain(0.3).room(0.7).size(0.8).delay(0.45).delayfeedback(0.5).pan(perlin.range(0.15, 0.85).slow(5)).degradeBy(0.35).sometimes(x => x.fast(2).gain(0.2))

let bellsbreak = n("<11 ~ 9 ~ ~ 7 ~ ~ 4 ~ ~ 2 ~ ~ ~ ~>").scale("bb:minor").s("sine").o(3).fm(0.15).fmwave("sine").fmh(4).decay(0.7).sustain(0).shape(0.05).lpf(2500).gain(0.25).room(0.85).size(0.95).delay(0.55).delayfeedback(0.6).pan(rand).degradeBy(0.3)

///////////////////////////////////////////////
// KEYS — crushed, saturated, breathing
///////////////////////////////////////////////

let keys = n("<0 2 4 6 4 2 0 ~ 4 6 7 4 2 0 -1 ~>").scale("bb:minor").s("sine").o(2).fm(0.1).shape(0.1).lpf(perlin.range(1500, 3500).slow(10)).release(0.12).gain(0.4).crush(12).speed(perlin.range(0.98, 1.02).slow(8)).pan(perlin.range(0.2, 0.8).slow(6)).degradeBy(0.3).delay(0.3).delayfeedback(0.35).room(0.4).size(0.5).sometimes(x => x.gain(0.5).room(0.6)).every(4, x => x.delay(0.4).delayfeedback(0.4))

///////////////////////////////////////////////
// PLUCK — ghost guitar, sparse
///////////////////////////////////////////////

let pluck = n("<7 ~ ~ ~ 4 ~ 2 ~ ~ ~ 0 ~ ~ -2 ~ ~>").scale("bb:minor").s("triangle").o(2).decay(0.15).sustain(0).lpf(perlin.range(1500, 3000).slow(8)).shape(0.08).gain(0.35).room(0.6).size(0.7).delay(0.35).delayfeedback(0.4).pan(perlin.range(0.15, 0.85).slow(7)).degradeBy(0.4).sometimes(x => x.room(0.8).gain(0.25))

///////////////////////////////////////////////
// ATMOSPHERE
///////////////////////////////////////////////

let pad = s("swpad:0").scrub(perlin.range(0.05, 0.95).slow(32)).gain(0.4).room(0.7).size(0.9).lpf(perlin.range(250, 900).slow(16))

let warmpad = n("<[0,2,4] [-5,0,2] [-2,1,4] [-3,-1,2]>").scale("bb:minor").s("supersaw").o(0).attack(0.5).release(2).rlpf(sine.slow(16).range(0.08, 0.25)).gain(0.35).room(0.9).size(0.95)

let shimmer = n("<[0,2,4,6,9] [-3,0,2,4,7] [-1,1,3,5,8] [-5,-2,0,3,6]>").scale("bb:minor").s("triangle").o(3).attack(0.3).release(2).lpf(perlin.range(2000, 4000).slow(12)).gain(0.12).room(0.95).size(0.95).delay(0.4).delayfeedback(0.45).pan(perlin.range(0.2, 0.8).slow(7))

let choir = n("<[0,2,4] [-5,0,2] [-2,1,4] [-3,-1,2]>").scale("bb:minor").s("sawtooth").o(2).vowel(perlin.range(0, 4).slow(16).segment(4)).attack(0.3).release(1.5).lpf(perlin.range(800, 1800).slow(10)).gain(0.12).room(0.85).size(0.9).pan(perlin.range(0.3, 0.7).slow(8))

let vinyl = s("hh*16").gain(perlin.range(0.12, 0.2).slow(4)).lpf(perlin.range(2500, 5000).slow(8)).hpf(1500).crush(4).coarse(3).pan(perlin.range(0.35, 0.65).slow(3)).every(3, x => x.gain(0.35))

let pops = s("bd:5*2").gain(perlin.range(0.1, 0.2).slow(3)).lpf(1200).hpf(200).crush(3).coarse(5).room(0.2).degradeBy(0.65).pan(rand)

let raindrops = s("hh:3*4").gain(perlin.range(0.08, 0.18).slow(5)).lpf(perlin.range(3000, 6000).slow(8)).hpf(2000).room(0.8).size(0.85).delay(0.35).delayfeedback(0.3).pan(rand).degradeBy(0.55)

///////////////////////////////////////////////
//                                           //
//  ARRANGEMENT — 6 sections × 12 bars      //
//  Total: 72 bars (~4 min at 72 BPM)       //
//  Loops ~15x for a 1 hour video            //
//                                           //
//  1:verse1  2:verse2  3:verse3             //
//  4:break   5:verse4  6:outro              //
//                                           //
///////////////////////////////////////////////

$: stack(
  // DRUMS
  drums    .mask("<1 1 0 0 0 1>".slow(12)),
  drumsfull.mask("<0 0 1 0 1 0>".slow(12)),
  brush    .mask("<0 0 1 0 1 0>".slow(12)),

  // BASS
  bass    .mask("<1 1 1 1 0 0>".slow(12)),
  basswalk.mask("<0 0 0 0 1 0>".slow(12)),
  sub     .mask("<1 1 1 1 1 0>".slow(12)),

  // CHORDS
  chords   .mask("<1 1 1 0 1 0>".slow(12)),
  chordswet.mask("<0 0 0 1 0 0>".slow(12)),

  // MELODY
  melody    .mask("<0 1 1 0 1 1>".slow(12)),
  melodybreak.mask("<0 0 0 1 0 0>".slow(12)),

  // BELLS
  bells     .mask("<0 0 1 0 1 0>".slow(12)),
  bellsbreak.mask("<0 0 0 1 0 0>".slow(12)),

  // KEYS
  keys.mask("<0 0 1 1 1 1>".slow(12)),

  // PLUCK
  pluck.mask("<0 1 1 0 1 1>".slow(12)),

  // ATMOSPHERE
  pad      .mask("<1 1 1 1 1 1>".slow(12)),
  warmpad  .mask("<0 0 0 1 0 0>".slow(12)),
  shimmer  .mask("<0 0 1 1 1 1>".slow(12)),
  choir    .mask("<0 0 0 1 1 1>".slow(12)),
  vinyl    .mask("<1 1 1 1 1 1>".slow(12)),
  pops     .mask("<1 1 1 1 1 1>".slow(12)),
  raindrops.mask("<1 1 1 1 1 1>".slow(12)),
)

all(x => x.fft(4).scope({pos:0, smear:0.95}))
