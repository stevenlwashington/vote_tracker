'use strict';
$(document).ready(function(){

var Photo = function(fileLocation){
  this.path = fileLocation;
  this.votes = 1;
}

var imgurPics = [];
var photoArray = new Array();

$.ajax({
  url: 'https://api.imgur.com/3/album/DDoWy',
  method: 'GET',
  headers: {
    'Authorization': 'Client-ID 84060fd42c5595c'
  }
})

.done(function(res) {
  $('#nextButton').hide();
  imgurPics = res.data.images;
  newKitten();
  tracker.displayPhoto();
})

.fail(function(err) {
});

var newKitten = function () {
  for (var i = 0; i < imgurPics.length; i++) {
    photoArray[i] = new Photo(imgurPics[i].link);
  }
}

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
 var doughnutData = [
   {
     value : (rightData/(leftData + rightData)),
     color : "#F0812B"
   },
   {
     value: (leftData/(leftData + rightData)),
     color:"#5FB8DE"
   }
 ];
  var doughnutOptions = {
     segmentShowStroke : false,
     animateScale : true,
   }
  new Chart(chart).Doughnut(doughnutData, doughnutOptions);
};


Tracker.prototype.receiveVote = function (e) {
    var target = e.target;
    if(target.id == 'displayLeft') {
      photoArray[randLeft].votes = photoArray[randLeft].votes + 1;
    } else  {
      photoArray[randRight].votes = photoArray[randRight].votes + 1;
    }
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


Tracker.prototype.displayMessage = function () {
  if (photoArray[randRight].votes > photoArray[randLeft].votes){
    $('#message').text('Survey says: Right is cuter!');
    $('displayRight').addClass('winner');
  } else if (photoArray[randLeft].notes > photoArray[randRight].votes){
    $('#message').text('Survey says: Left is cuter!');
    $('displayLeft').addClass('winner');

  } else {
    $('message').text('Survey says: They are both cute!').hide();
  }
 }


Tracker.prototype.waitVote = function(){
  console.log("I got back to wait Vote");
  $('.winner').removeClass('winner');
  tracker.displayChart(1, 1);
  tracker.displayPhoto(); //calls genRand
  $('#nextButton').hide();
  $('#message').text('Pick your favorite kitten!');
};


Tracker.prototype.displayWinner = function(){
  console.log("Got to display winner");
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

