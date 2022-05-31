function _(query){
  return document.querySelector(query)
}
function _all(query){
  return document.querySelectorAll(query)
}
let songList = [
  {
    thumbnail: '일기예보.png',
    audio: '일기예보.mp3',
    songname: '일기예보',
    artistname: '화정'
  },
  {
    thumbnail: '정동원 - 불러와.png',
    audio: '정동원 - 불러와.mp3',
    songname: '불러와',
    artistname: '정동원'
  },
  {
    thumbnail: '가끔 미치도록 네가 안고 싶어질때가 있어.png',
    audio: '가끔 미치도록 네가 안고 싶어질때가 있어.mp3',
    songname: '가끔 미치도록 네가 안고 싶어질때가 있어',
    artistname: '가을방학'
  },
  {
    thumbnail: '일기예보.png',
    audio: '일기예보.mp3',
    songname: '일기예보',
    artistname: '화정'
  },
  {
    thumbnail: '정동원 - 불러와.png',
    audio: '정동원 - 불러와.mp3',
    songname: '불러와',
    artistname: '정동원'
  },
  {
    thumbnail: '가끔 미치도록 네가 안고 싶어질때가 있어.png',
    audio: '가끔 미치도록 네가 안고 싶어질때가 있어.mp3',
    songname: '가끔 미치도록 네가 안고 싶어질때가 있어',
    artistname: '가을방학'
  },
  {
    thumbnail: '일기예보.png',
    audio: '일기예보.mp3',
    songname: '일기예보',
    artistname: '화정'
  },
  {
    thumbnail: '정동원 - 불러와.png',
    audio: '정동원 - 불러와.mp3',
    songname: '불러와',
    artistname: '정동원'
  },
  {
    thumbnail: '가끔 미치도록 네가 안고 싶어질때가 있어.png',
    audio: '가끔 미치도록 네가 안고 싶어질때가 있어.mp3',
    songname: '가끔 미치도록 네가 안고 싶어질때가 있어',
    artistname: '가을방학'
  },
]
let currentSongIndex = 0
let player = _(".player"),
    toggleSongList = _('.player .toggle-list')

let main = {
  audio: _('.player .main audio'),
  thumbnail: _('.player .main .thumbnail img'),
  seekbar: _('.player .main .seekbar input'),
  songname: _('.player .main .details h2'),
  artistname: _('.player .main .details p'),
  prevControl: _('.player .main .controls .prev-control'),
  playPauseControl: _('.player .main .controls .play-pause-control'),
  nextControl: _('.player .main .controls .next-control'),
}
toggleSongList.addEventListener('click', function(){
  player.classList.toggle('activeSongList')
})
_('.player .player-list .list').innerHTML = (songList.map(function(song, songIndex){
  return `
    <div class="item" songIndex="${songIndex}">
      <div class="thumbnail">
        <img src="./files/${song.thumbnail}" alt="">
      </div>
      <div class="details">
        <h2>${song.songname}</h2>
        <p>${song.artistname}</p>
      </div>
    </div>
  `
})).join('')

let songListItems = _all('.player .player-list .list .item')
for(let i=0;i<songListItems.length;i++){
  songListItems[i].addEventListener('click', function(){
    currentSongIndex = songListItems[i].getAttribute('songIndex')
    loadSong(currentSongIndex)
    player.classList.remove('activeSongList')
  })
}
function loadSong(songIndex){
  let song = songList[songIndex]
  main.thumbnail.setAttribute('src', `./files/${song.thumbnail}`)
  document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('./files/${song.thumbnail}') center no-repeat`
  document.body.style.backgroundSize = 'cover'
  main.songname.innerText = song.songname
  main.artistname.innerText = song.artistname
  main.audio.setAttribute('src', `./files/${song.audio}`)
  main.seekbar.setAttribute('value', 0)
  main.seekbar.setAttribute('min', 0)
  main.seekbar.setAttribute('max', 0)
  main.audio.addEventListener('canplay', function(){
    main.audio.play()
    if(!main.audio.paused){
      main.playPauseControl.classList.remove('paused')
    }
    main.seekbar.setAttribute('max', parseInt(main.audio.duration))
    main.audio.onended = function(){
      main.nextControl.click()
    }
  })
}
setInterval(function(){
  main.seekbar.value = parseInt(main.audio.currentTime)
}, 1000)

main.prevControl.addEventListener('click', function(){
  currentSongIndex--;
  if(currentSongIndex < 0){
    currentSongIndex = songList.length + currentSongIndex
  }
  loadSong(currentSongIndex)
})
main.nextControl.addEventListener('click', function(){
  currentSongIndex = (currentSongIndex + 1) % songList.length
  loadSong(currentSongIndex)
})
main.playPauseControl.addEventListener('click', function(){
  if(main.audio.paused){
    main.playPauseControl.classList.remove('paused')
    main.audio.play()
  }else{
    main.playPauseControl.classList.add('paused')
    main.audio.pause()
  }
})
main.seekbar.addEventListener('change', function(){
  main.audio.currentTime = main.seekbar.value 
})
loadSong(currentSongIndex)


