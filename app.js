// Display Time
function displayTime() {
    const timeElement = document.getElementById('time');
    const date = new Date();
    timeElement.innerHTML = `${date.toLocaleTimeString()}`;
}

// Update time every second
setInterval(displayTime, 1000);

// Buttons and Controls
const startButton = document.getElementById('startButton');
const controls = document.getElementById('controls');
const micIcon = document.getElementById('mic-icon');
const doneButton = document.getElementById('doneButton');
const stopButton = document.getElementById('stopButton');

let recognition; // Declare recognition globally

// Start Voice Command
startButton.addEventListener('click', () => {
    startButton.classList.add("hidden");
    controls.classList.remove("hidden");
    micIcon.classList.add("listening");

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "te-IN";

    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        alert(`You said: ${transcript}`);
    };

    recognition.onerror = function() {
        alert("Sorry, I couldn't hear you. Please try again.");
        resetUI();
    };

    recognition.onend = function() {
        if (!doneButton.disabled) {
            alert("Speech recognition stopped.");
            resetUI();
        }
    };
});

// Done Button - Complete recording
doneButton.addEventListener('click', () => {
    if (recognition) {
        recognition.stop();
        alert("Recording completed!");
        resetUI();
    }
});

// Stop Button - Cancel recording
stopButton.addEventListener('click', () => {
    if (recognition) {
        recognition.abort();
        alert("Recording stopped.");
        resetUI();
    }
});

// Reset UI
function resetUI() {
    startButton.classList.remove("hidden");
    controls.classList.add("hidden");
    micIcon.classList.remove("listening");
}
