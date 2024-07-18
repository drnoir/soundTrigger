let mediaRecorder;
let audioChunks = [];

document.querySelector('#start-record').addEventListener('click', async () => {
    if (Tone.context.state !== 'running') {
        await Tone.context.resume();
    }
    startRecording();
});

async function startRecording() {
    // Create a destination node
    const destination = Tone.context.createMediaStreamDestination();
    
    // Connect the destination to the Tone.js master output
    Tone.Master.connect(destination);

    // Set up MediaRecorder to record from the destination node
    const options = {
        mimeType: 'audio/webm;codecs=opus', // WebM Opus codec
        audioBitsPerSecond: 128000          // 128 kbps bit rate
    };

    mediaRecorder = new MediaRecorder(destination.stream, options);
    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = document.querySelector('#audio-playback');
        audio.src = audioUrl;
        audioChunks = []; // Clear chunks for the next recording
    };

    mediaRecorder.start();
    document.querySelector('#start-record').disabled = true;
    document.querySelector('#stop-record').disabled = false;
}

document.querySelector('#stop-record').addEventListener('click', () => {
    mediaRecorder.stop();
    document.querySelector('#start-record').disabled = false;
    document.querySelector('#stop-record').disabled = true;
});