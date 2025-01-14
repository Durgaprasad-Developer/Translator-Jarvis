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
const listeningIcon = document.getElementById('listeningIcon');

let recognition; // Declare recognition globally
let recognizedText = ""; // Store the recognized text

// Start Voice Command
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    doneButton.disabled = false;
    stopButton.disabled = false;

    listeningIcon.classList.remove('hidden'); // Show listening icon

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
    const translatedText = document.getElementById('translatedText').textContent.replace("Translated: ", "").trim();
    if (translatedText) {
        navigator.clipboard.writeText(translatedText).then(() => {
            alert("Translated text copied to clipboard!");
        }).catch(err => {
            alert("Failed to copy text. Please try again.");
            console.error(err);
        });
    } else {
        alert("No translated text to copy!");
    }
});

// Reset buttons
function resetButtons() {
    startButton.disabled = false;
    doneButton.disabled = true;
    stopButton.disabled = true;
    listeningIcon.classList.add('hidden'); // Hide listening icon
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

// changes
let pinput = document.querySelector("#prompt");
let submitbtn = document.querySelector("#button");

console.log(submitbtn)

submitbtn.addEventListener("click", () => {
    const url = "http://localhost:3030/response"; // Replace with your server URL
    
    const data = {
      prompt: pinput.value,
    };
    
    console.log("Sending data:", data); // Debugging log
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    
    let varun = ""
    
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        varun = data.generatedText ;
        document.querySelector("#dpbhai").innerText = varun ;
        console.log("POST request succeeded with JSON response:", data.generatedText);
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });

});
