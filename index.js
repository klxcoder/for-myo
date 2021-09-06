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

// Make sure sw are supported
if('serviceWorker' in navigator) {
    console.log('sw is supported');
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./sw.js')
            .then(reg => console.log('sw is registered'))
            .catch(err => console.log(`sw error with error: ${err}`));
    })
}