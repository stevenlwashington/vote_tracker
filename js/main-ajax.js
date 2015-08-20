

var photoArray = []

$.ajax({
  url:'https://api.imgur.com/3/album/DDoWy',
  method: 'GET',
  headers: {
    'Authorization': "Client-ID 84060fd42c5595c"
  }
})
.done(function(res) {
  photoArray = res.data.images;
  console.log(photoArray);

  for(var i = 0 i < photoArray. length; i++) {
    photoArray[i].path = photoArray[i].link;
  }

    showFromImgur();
  })
.fail(function(err) {
  console.log(err);
  });

function showFromImgur(){
  var rand = Math.floor(Math.random() * photoArray.length + 1);
  var displayPic = '<img src"' + photoArray[rand].link + '">';
  $('#picContainer').html(displayPic);
}

$('#another').click(function() {
  showFromImgur();
  console.log('I am sorry I am not sorry');
  });

//pics is array of photos from imgur, so LOOK FOR ARRAY NAME
//photoArray is the existing array of photo objects used by tracker
