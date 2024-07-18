// Description: This is the main file for the Tone.js example.  
let synth = new Tone.Synth().toDestination();
let synthPoly = new Tone.PolySynth(Tone.Synth).toDestination();

function playSound(note) {
    synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    // trigger the attack immediately
    synth.triggerAttack(note, now);
    // wait one second before triggering the release
    synth.triggerRelease(now + 1);
}

function filter(synth) {
    const filter = new Tone.Filter(400, "highpass").toDestination();
    const feedbackDelay = new Tone.FeedbackDelay(0.119, 0.6).toDestination();
    // connect the player to the feedback delay and filter in parallel
    synth.connect(filter);
    synth.connect(feedbackDelay);
    (console.log("filter applied to" + synth));
}

function bigDelay(synth) {
    // / Create the Lowpass Comb Filter effect
    const lowpassCombFilter = new Tone.LowpassCombFilter({
        delayTime: 0.1,  // Delay time in seconds
        resonance: 0.5,  // Resonance (feedback amount)
        dampening: 3000  // Dampening (lowpass frequency)
    }).toDestination();
    synth.connect(lowpassCombFilter);
    // Connect the oscillator to the Lowpass Comb Filter
    synth.connect(lowpassCombFilter);
    (console.log(" lowpassCombFilter" + synth));
}

function playNotes() {
    const now = Tone.now();
    synthPoly.triggerAttack("D4", now);
    synthPoly.triggerAttack("F4", now + 0.5);
    synthPoly.triggerAttack("A4", now + 1);
    synthPoly.triggerAttack("C5", now + 1.5);
    synthPoly.triggerAttack("E5", now + 2);
    synthPoly.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
}

// EVENT HANDING
// onclick event handler for sound1 button
document.getElementById("sound1").addEventListener("click", async () => {
    await Tone.start();
    playSound('C4');
    filter(synth);
    console.log("audio is ready");
});

// onclick event handler for sound2 button
document.getElementById("sound2").addEventListener("click", async () => {
    await Tone.start();
    playSound('C5');
    console.log("audio is ready");
});

// onclick event handler for sound3 button
document.getElementById("sound3").addEventListener("click", async () => {
    await Tone.start();
    playSound('D4');
    console.log("audio is ready");
});

// onclick event handler for sound4 button
document.getElementById("sound4").addEventListener("click", async () => {
    await Tone.start();
    playSound('G1');
    console.log("G1 Audio");
});

// onclick event handler for sound4 button
document.getElementById("sound5").addEventListener("click", async () => {
    await Tone.start();
    playNotes('G1');
    console.log("Play Notes");
});

document.getElementById("filter").addEventListener("click", async () => {
    await Tone.start();
    filter(synth);
    filter(synthPoly);
});

document.getElementById("bigDelay").addEventListener("click", async () => {
    await Tone.start();
    bigDelay(synth);
    bigDelay(synthPoly);
});


