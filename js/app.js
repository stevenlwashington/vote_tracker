'use strict';

var Photo = function(fileLocation){
  this.path = fileLocation;
  this.votes = 1;
}

var kitten1 = new Photo('img/kittens/kitten1.jpg');
var kitten2 = new Photo('img/kittens/kitten2.jpg');
var kitten3 = new Photo('img/kittens/kitten3.jpg');
var kitten4 = new Photo('img/kittens/kitten4.jpg');
var kitten5 = new Photo('img/kittens/kitten5.jpg');
var kitten6 = new Photo('img/kittens/kitten6.jpg');
var kitten7 = new Photo('img/kittens/kitten7.jpg');
var kitten8 = new Photo('img/kittens/kitten8.jpg');
var kitten9 = new Photo('img/kittens/kitten9.jpg');
var kitten10 = new Photo('img/kittens/kitten10.jpg');
var kitten11 = new Photo('img/kittens/kitten11.jpg');
var kitten12 = new Photo('img/kittens/kitten12.jpg');
var kitten13 = new Photo('img/kittens/kitten13.jpg');
var kitten14 = new Photo('img/kittens/kitten14.jpg');

var photoArray = [kitten1, kitten2, kitten3, kitten4, kitten5, kitten6,kitten7, kitten8, kitten9, kitten10, kitten11, kitten12, kitten13, kitten14];

var Tracker = function (){
  this.leftPhoto = "";
  this.rightPhoto = "";
  //left or right photo? per Sam's code.
}

var tracker = new Tracker();

Tracker.prototype.genRand = function() {
  var randLeft = Math.floor(Math.random() * (14 - 1)) +1 ;
  var randRight = Math.floor(Math.random() * (14 - 1)) +1 ;

  console.log(randLeft);
  console.log(randRight);

  while (randLeft == randRight) {
    randLeft = Math.floor(Math.random() * (14 - 1)) +1 ;
  }
  this.leftPhoto = photoArray[randLeft].path;
  this.rightPhoto = photoArray[randRight].path;
  console.log(this.leftPhoto);
  console.log(this.rightPhoto);
}

Tracker.prototype.displayPhoto = function() {
  tracker.genRand();
  var elLeft = document.getElementById('displayLeft');
  var elRight = document.getElementById('displayRight');
    elLeft.src =  this.leftPhoto;
    elRight.src = this.rightPhoto;
}

Tracker.prototype.waitVote = function(){
  //this is state1 when the user needs to vote on a kitten
  //at the end of this method, something needs to transition us to displayWinner
  //generate 2 Random numbers to prevent dupes
  //displayPhoto
  //display neutral chart as 50/50
  //receiveVote using event listener
  //this is a reminder that receiveVote needs to kick us to displayWinner
}

Tracker.prototype.displayWinner = function(){
  //this is state2 after vote that displays the result
  //something needs to transition us to waitVote
  //this will highlight the winning photo
  //this will update chart data
  //this will display chart data
  //display div id="nextKitten"
  //update h2 id="message"
}

// tracker.genRand();
tracker.displayPhoto();


