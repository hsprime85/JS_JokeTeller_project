const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// disable/enable button
function toggleButton(){
    button.disabled = !button.disabled;
}

// passing joke to voiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'c0ec84eb38a44de7980c15ec71b86200',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}


// get jokes from joke API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist';
    try{
        const res = await fetch(apiUrl);
        const data = await res.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text-to-speech
        tellMe(joke);
        // disable button
        toggleButton();
    } catch(err){
        console.log(err);
    }
}
  
// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

