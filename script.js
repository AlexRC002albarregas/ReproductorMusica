let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let updateTimer;

const music_list = [{
        img: 'images/warriors.jpg',
        name: 'Warriors',
        artist: 'Imagine Dragons',
        music: 'music/warriors.mp3'
    },
    {
        img: 'images/worldscollide.jpg',
        name: 'Worlds Collide',
        artist: 'Nicky Taylor',
        music: 'music/worldscollide.mp3'
    },
    {
        img: 'images/ignite.jpg',
        name: 'Ignite',
        artist: 'Zedd',
        music: 'music/ignite.mp3'
    },
    {
        img: 'images/legends.jpg',
        name: 'Legends Never Die',
        artist: 'Against the Current',
        music: 'music/legendsneverdie.mp3'
    },
    {
        img: 'images/rise.jpg',
        name: 'RISE',
        artist: 'Glitch Mob, Mako, Word Alive',
        music: 'music/rise.mp3'
    },
    {
        img: 'images/phoenix.png',
        name: 'Phoenix',
        artist: 'Cailin Russo y Chrissy Costanza',
        music: 'music/phoenix.mp3'
    },
    {
        img: 'images/takeover.jpg',
        name: 'Take Over',
        artist: 'Jeremy McKinnon, MAX y Henry',
        music: 'music/takeover.mp3'
    },
    {
        img: 'images/burn.jpg',
        name: 'Burn It All Down',
        artist: 'PVRIS',
        music: 'music/burnitalldown.mp3'
    },
    {
        img: 'images/starwalkin.jpg',
        name: 'STAR WALKIN',
        artist: 'Lil Nas X',
        music: 'music/starwalkin.mp3'
    },
    {
        img: 'images/gods.png',
        name: 'GODS',
        artist: 'NewJeans',
        music: 'music/gods.mp3'
    },
    {
        img: 'images/nggyu.jpg',
        name: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
        music: 'music/nggyu.mp3'
    },
];

loadTrack(track_index);


function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Sonando canción " + (track_index + 1) + " de " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}


function randomTrack() {
    isRandom = !isRandom;

    let randomIcon = document.querySelector('.random-track i');

    if (isRandom) {
        randomIcon.classList.add('active');
    } else {
        randomIcon.classList.remove('active');
    }
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    isRepeat = !isRepeat;

    let repeatIcon = document.querySelector('.repeat-track i');

    if (isRepeat) {
        curr_track.loop = true;
        repeatIcon.classList.add('active');
    } else {
        curr_track.loop = false;
        repeatIcon.classList.remove('active');
    }
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function displayPlaylist() {
    const playlistContainer = document.querySelector('.playlist');
    music_list.forEach((song, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        playlistItem.onclick = () => {
            loadTrack(index);
            playTrack();
        };

        const playlistItemImage = document.createElement('img');
        playlistItemImage.src = song.img;

        const playlistItemDetails = document.createElement('div');
        playlistItemDetails.classList.add('playlist-item-details');
        playlistItemDetails.textContent = `${song.name} - ${song.artist}`;

        playlistItem.appendChild(playlistItemImage);
        playlistItem.appendChild(playlistItemDetails);

        playlistContainer.appendChild(playlistItem);
    });
}
displayPlaylist();