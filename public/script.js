document.addEventListener('DOMContentLoaded', () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Your browser does not support the Speech Recognition API. Try using Chrome or Edge.');
        return;
    }

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const transcriptionDiv = document.getElementById('transcription');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        console.log('Speech recognition started');
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        console.log('Speech recognition stopped');
    });

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR'; // english


    recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        transcriptionDiv.innerHTML = `
            <p class="final">${finalTranscript}</p>
            <p class="interim">${interimTranscript}</p>
        `;
    };

    // map errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onend = () => {
        console.log('Speech recognition ended');
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    // Initialize button states
    stopBtn.disabled = true;
});