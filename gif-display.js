// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
//
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(keyword) {
    console.log("there is gifDisplay");
    console.log(keyword);
    this.keyword = keyword;
    this.gifInfo = new Array();
    this.preGif = new Array();
    this.audioUrl = '';
    this.onJsonReady = this.onJsonReady.bind(this);
    this.showgif = this.showgif.bind(this);
    this.gifscreen = document.querySelector('#music_screen');
    this.gifscreen2 = document.querySelector('#music_screen2');
    this.audioscreen = document.querySelector('#audio-screen');
    this.menuElement = document.querySelector('#menu');

    // TODO(you): Implement the constructor and add fields as necessary.
  }

  onJsonReady(json) {
    this.gifInfo = json;
    console.log(this.gifInfo);
    if(this.gifInfo.data.length < 2) {
      const error = document.querySelector('#error');
      error.classList.remove('inactive');
      document.querySelector('#audio-screen').style.display = "none";
      document.querySelector('#menu').style.display = "flex";
      console.log("no screen");
      this.pauseElement = document.querySelector(".imgDiv");
      this.pauseElement.removeEventListener('click',this.clickbuttom);
      return ;
    }
    else{
      //preload gif
    this.menuElement.style.display = 'none';
    for(let i=0;i<25;i++){
      console.log("preload");
      this.preGif[i] = new Image();
      this.preGif[i].src =  "https:"+this.gifInfo.data[i].images.downsized.url.slice(6);
    }

    document.querySelector('#audio-screen').style.display = "flex";
    document.querySelector('#load').style.display = 'none';
    this.showgif();
    const musicElement = new MusicScreen(this);
    musicElement.playAudio(this.audioUrl);
  }

  }

  _onResponse(response) {
    return response.json();
 }
 loadgif(targetUrl){
   this.audioUrl = targetUrl;
   fetch('https://api.giphy.com/v1/gifs/search?q='+this.keyword+'&api_key=63MNNgrWZ0dbDNnxQjl7PdyPmWFJsrgw&limit=25&rating=g')
       .then(this._onResponse)
       .then(this.onJsonReady);
   console.log("success got data");

 }
 showgif(){
   console.log(this.gifInfo);
   this.gifscreen.style.zIndex="3";
   this.gifscreen2.style.zIndex="2";
   // const gifUrl = this.gifInfo.data[0].images.downsized.url.slice(6);
   const gifUrl = this.preGif[0].src;
    console.log(gifUrl);
    console.log(this.gifscreen.style);
    this.gifscreen.style.backgroundImage = "url("+gifUrl+")";
   //pre load
   const gifUrl2 = this.preGif[1].src;
    console.log(gifUrl2);
    console.log(this.gifscreen2.style);
    this.gifscreen2.style.backgroundImage = "url("+gifUrl2+")";
 }
 nextgif(nextnum){
   if(nextnum>=25) nextnum = 0; //not wort , just wanna wirte again
   //const gifUrl = this.gifInfo.data[num].images.downsized.url.slice(6);
     //judge display screen1 or music_screen2
   if(this.gifscreen2.style.zIndex=="2"){
     // this.gifscreen2.style.display = 'block';
     // this.gifscreen.style.display = 'none';
    this.gifscreen.style.zIndex="2";
    this.gifscreen2.style.zIndex="3";
      const gifUrl = this.preGif[nextnum].src;
     this.gifscreen.style.backgroundImage = "url("+gifUrl+")";
     console.log("show 1");
     console.log(this.gifscreen.style);
   }
   else{
     // this.gifscreen.style.display = 'block';
     // this.gifscreen2.style.display = 'none';
     this.gifscreen.style.zIndex="3";
     this.gifscreen2.style.zIndex="2";
     const gifUrl2 = this.preGif[nextnum].src;
      console.log("show 2");
      console.log(this.gifscreen2.style);
      this.gifscreen2.style.backgroundImage = "url("+gifUrl2+")";
   }
 }
  // TODO(you): Add methods as necessary.
}
