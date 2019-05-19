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
    this.onJsonReady = this.onJsonReady.bind(this);
    this.showgif = this.showgif.bind(this);
  }

  onJsonReady(json) {
    this.gifInfo = json;
    console.log(this.gifInfo);
    this.showgif();
  }

  _onResponse(response) {
    return response.json();
 }
 loadgif(){
   fetch('http://api.giphy.com/v1/gifs/search?q='+this.keyword+'&api_key=63MNNgrWZ0dbDNnxQjl7PdyPmWFJsrgw&limit=25&rating=g')
       .then(this._onResponse)
       .then(this.onJsonReady);
   console.log("success got data");

 }
 showgif(){
   console.log(this.gifInfo);
   const gifUrl = this.gifInfo.data[0].images.downsized.url;
   var gifscreen = document.querySelector('#music_screen');
   console.log(gifUrl);
   console.log(gifscreen.style);
   gifscreen.style.backgroundImage = "url("+gifUrl+")";

 }
 nextgif(num){
   if(num>=25) num = 0;
   const gifUrl = this.gifInfo.data[num].images.downsized.url;
   var gifscreen = document.querySelector('#music_screen');
   gifscreen.style.backgroundImage = "url("+gifUrl+")";
 }
}
