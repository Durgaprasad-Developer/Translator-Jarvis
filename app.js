// Display Time
function displayTime() {
    const timeElement = document.getElementById('time');
    const date = new Date();
    timeElement.innerHTML = `${date.toLocaleTimeString()}`;
}

// Update time every second
setInterval(displayTime, 1000);

// Buttons
const startButton = document.getElementById('startButton');
const doneButton = document.getElementById('doneButton');
const stopButton = document.getElementById('stopButton');

let recognition; // Declare recognition globally

// Start Voice Command
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    doneButton.disabled = false;
    stopButton.disabled = false;

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "te-IN";

    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        alert(`You said: ${transcript}`);
    }

    recognition.onerror = function(event) {
        alert("Sorry, I couldn't hear you. Please try again.");
        resetButtons();
    }

    recognition.onend = function() {
        if (!doneButton.disabled) {
            alert("Speech recognition stopped.");
            resetButtons();
        }
    }
});

// Done Button - Complete recording
doneButton.addEventListener('click', () => {
    if (recognition) {
        recognition.stop();
        alert("Recording completed!");
        resetButtons();
    }
});

// Stop Button - Cancel recording
stopButton.addEventListener('click', () => {
    if (recognition) {
        recognition.abort();
        alert("Recording stopped.");
        resetButtons();
    }
});

// Reset buttons
function resetButtons() {
    startButton.disabled = false;
    doneButton.disabled = true;
    stopButton.disabled = true;
}
a
