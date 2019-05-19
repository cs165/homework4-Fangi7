// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(gifElement) {
    this.audioPlayer = new AudioPlayer();
    this.playAudio = this.playAudio.bind(this);
    this._onKick = this._onKick.bind(this);
    this.clickbuttom = this.clickbuttom.bind(this);
    this.gifElement = gifElement;
    this.kicknum = 1;

    this.pauseElement = document.querySelector(".imgDiv");
    this.pauseElement.addEventListener('click',this.clickbuttom);
    // TODO(you): Implement the constructor and add fields as necessary.
  }
  playAudio(songUrl){
    this.audioPlayer.setSong(songUrl);
    this.audioPlayer.setKickCallback(this._onKick);
    this.audioPlayer.play();
  }
  _onKick() {
   console.log('kick!');
   this.gifElement.nextgif(this.kicknum);
   this.kicknum = this.kicknum + 1;
   if(this.kicknum>=25) this.kicknum = 0;
 }
 clickbuttom(event){
    console.log(event.target);
    if(event.target.getAttribute('src') == './images/pause.png'){
      this.audioPlayer.pause();
      event.target.src = './images/play.png';
    }
    else{
      this.audioPlayer.play();
      event.target.src = './images/pause.png';
    }
 }
  // TODO(you): Add methods as necessary.
}
