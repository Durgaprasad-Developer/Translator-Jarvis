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
const copyButton = document.getElementById('copyButton');

let recognition; // Declare recognition globally
let recognizedText = ""; // Store the recognized text

// Start Voice Command
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    doneButton.disabled = false;
    stopButton.disabled = false;

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "te-IN";

    recognition.start();

    recognition.onresult = function(event) {
        recognizedText = event.results[0][0].transcript;
        document.getElementById('recognizedText').innerText = `Recognized: ${recognizedText}`;
        translateText(recognizedText); // Call translation function
    };

    recognition.onerror = function(event) {
        alert("Sorry, I couldn't hear you. Please try again.");
        resetButtons();
    };

    recognition.onend = function() {
        if (!doneButton.disabled) {
            alert("Speech recognition stopped.");
            resetButtons();
        }
    };
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

// Copy Button - Copy translated text
copyButton.addEventListener('click', () => {
    const translatedText = document.getElementById('translatedText').innerText;
    navigator.clipboard.writeText(translatedText).then(() => {
        alert("Text copied to clipboard!");
    });
});

// Reset buttons
function resetButtons() {
    startButton.disabled = false;
    doneButton.disabled = true;
    stopButton.disabled = true;
}

// Translate text to English
function translateText(text) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=te|en`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const translated = data.responseData.translatedText;
            document.getElementById('translatedText').innerText = `Translated: ${translated}`;
            copyButton.style.display = "inline"; // Show the copy button
        })
        .catch(error => {
            console.error("Translation error:", error);
            alert("Translation failed. Please try again.");
        });
}
