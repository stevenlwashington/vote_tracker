'use strict';
$(document).ready(function(){


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
}

var tracker = new Tracker();
var randLeft = 0;
var randRight = 0;

Tracker.prototype.genRand = function() {
  randLeft = Math.floor(Math.random() * (14 - 1)) +1 ;
  randRight = Math.floor(Math.random() * (14 - 1)) +1 ;

  console.log(randLeft);
  console.log(randRight);

  while (randLeft == randRight) {
    randLeft = Math.floor(Math.random() * (14 - 1)) +1 ;
  }
  this.leftPhoto = photoArray[randLeft].path;
  this.rightPhoto = photoArray[randRight].path;
  console.log(this.leftPhoto);
  console.log(this.rightPhoto);
};

Tracker.prototype.displayPhoto = function() {
  tracker.genRand();
  $('#displayLeft').attr('src', this.leftPhoto);
  $('#displayRight').attr('src', this.rightPhoto);
};


Tracker.prototype.displayChart = function (leftData, rightData) {
 var chart = document.getElementById('chart').getContext("2d");
 console.log(chart);
 var pieData = [
   {
     value : (rightData/(leftData + rightData)),
     color : "#1BBC9B"
   },
   {
     value: (leftData/(leftData + rightData)),
     color:"#E64C66"
   }
 ];
  var pieOptions = {
     segmentShowStroke : false,
     animateScale : true,
   }
  new Chart(chart).Pie(pieData, pieOptions);
};

Tracker.prototype.receiveVote = function (e) {
    // e.preventDefault();
    var target = e.target;
    console.log("left index is: " + randLeft);
    console.log("right index is: " + randRight);
    if(target.id == 'displayLeft') {
      photoArray[randLeft].votes = photoArray[randLeft].votes + 1;
      console.log("left votes: " + photoArray[randLeft].votes);
    } else  {
      photoArray[randRight].votes = photoArray[randRight].votes + 1;
      console.log("right votes: " + photoArray[randRight].votes);
    }
    console.dir(target);
};

$('#displayLeft').on('click', function (e) {
  tracker.receiveVote(e);
  tracker.displayWinner(e);
});

$('#displayRight').on('click', function (e) {
  tracker.receiveVote(e);
  tracker.displayWinner(e);
});

$('#nextButton').on('click', function (e) {
  tracker.waitVote(e);
});


Tracker.prototype.waitVote = function(){
  console.log("I got back to wait Vote");
  $('.winner').removeClass('winner');
  tracker.displayChart(1, 1);
  tracker.displayPhoto(); //calls genRand
  $('#nextButton').hide();
  $('#message').text('Pick your favorite kitten!');
};

Tracker.prototype.displayWinner = function(){
  console.log("I got into display winner");
  tracker.displayChart(photoArray[randLeft].votes, photoArray[randRight].votes);
  $('#nextButton').show();

  if (photoArray[randRight].votes > photoArray[randLeft].votes){
      $('#message').text('Survey says right is cuter!');
      $('#displayRight').addClass('winner');
  } else if (photoArray[randLeft].votes > photoArray[randRight].votes){
      $('#message').text('Survey says left is cuter!');
      $('#displayLeft').addClass('winner');

    } else {
      $('#message').text('Survey says they are both cute!');
    }

};

tracker.waitVote();

});

