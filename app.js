/* General Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    text-align: center;
}

header {
    background-color: #007bff;
    color: white;
    padding: 1em 0;
}

#dashboard main {
    padding: 2em;
}

button {
    padding: 0.5em 1em;
    margin: 0.5em;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}

/* Listening Icon */
#listeningIcon {
    position: relative;
    display: inline-block;
    margin-top: 1em;
}

.hidden {
    display: none;
}

.circle {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    border: 3px solid #007bff;
    border-radius: 50%;
    animation: pulse 1.5s infinite ease-in-out;
}

.circle.delay1 {
    animation-delay: 0.2s;
}

.circle.delay2 {
    animation-delay: 0.4s;
}

/* Pulse Animation */
@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.6;
    }
    50% {
        transform: scale(1.5);
        opacity: 1;
    }
}
