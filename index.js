const img = document.querySelector('img');
const audio = document.getElementById("audio");
let audioPlaying = false;
let interval = null;
img.onclick = () => {
    if(audioPlaying) {
        audio.pause();
        audioPlaying = false;
        clearInterval(interval);
    } else {
        audio.play();
        let angle = getComputedStyle(document.documentElement).getPropertyValue('--angle');
        interval = setInterval(() => {
            angle++;
            document.documentElement.style.setProperty('--angle', angle);
        }, 30);
        audioPlaying = true;
    }
}