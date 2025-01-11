// app.js

// Display Time
function displayTime() {
    const timeElement = document.getElementById('time');
    const date = new Date();
    timeElement.innerHTML = `${date.toLocaleTimeString()}`;
}

// Update time every second
setInterval(displayTime, 1000);

// Start Voice Command
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startVoiceCommand);

// Simple placeholder for voice command functionality
function startVoiceCommand() {
    alert("Voice command feature coming soon!");
}

// Enable Speech-to-Text
function startVoiceCommand() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        alert(`You said: ${transcript}`);
    }

    recognition.onerror = function(event) {
        alert("Sorry, I couldn't hear you. Please try again.");
    }
}
