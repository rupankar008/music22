const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const volumeControl = document.getElementById('volume-control');
const volumePercentage = document.getElementById('volume-percentage');
const backwardButton = document.getElementById('backward');
const forwardButton = document.getElementById('forward');
const fileInput = document.getElementById('file-input');
const loadFileButton = document.getElementById('load-file');
const queue = document.getElementById('queue');

let queueList = [];
let currentIndex = 0;

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseButton.textContent = '▶️';
    }
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    updateCurrentTimeDisplay();
});

audio.addEventListener('ended', () => {
    currentIndex++;
    if (currentIndex < queueList.length) {
        loadSong(queueList[currentIndex]);
    } else {
        playPauseButton.textContent = '▶️';
    }
});

progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
    volumePercentage.textContent = `${Math.round(volumeControl.value * 100)}%`;
});

volumeControl.addEventListener('mouseover', () => {
    volumePercentage.style.display = 'block';
});

volumeControl.addEventListener('mouseout', () => {
    volumePercentage.style.display = 'none';
});

backwardButton.addEventListener('click', () => {
    audio.currentTime -= 10; // rewind 10 seconds
});

forwardButton.addEventListener('click', () => {
    audio.currentTime += 10; // forward 10 seconds
});

loadFileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        queueList.push(file);
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        queue.appendChild(listItem);

        if (queueList.length === 1) {
            loadSong(file);
        }
    }
});

function loadSong(file) {
    const fileURL = URL.createObjectURL(file);
    audio.src = fileURL;
    audio.play();
    playPauseButton.textContent = '⏸️';
}

function updateCurrentTimeDisplay() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
