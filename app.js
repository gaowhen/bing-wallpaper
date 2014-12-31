//http://stackoverflow.com/questions/10639914/is-there-a-way-to-get-bings-photo-of-the-day

var request = require('request');
var fs = require('fs');
var path = require('path');
var config = require('./config.js');

function fetch() {
  var uri = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';

  request(uri, function (error, response, body) {
    try {
      var data = JSON.parse(body);
      var images = data.images;

      images.forEach(function (image) {
        var ext = path.extname(image.url);
        var img = path.join(config.path.pictures, image.fullstartdate + ext);

        if (!fs.existsSync(img)) {
          request(image.url).pipe(fs.createWriteStream(img));
        } else {
          console.log('already exists');
        }
      });
    } catch (e) {
      console.error(e);
    }
  });
}

fetch();
