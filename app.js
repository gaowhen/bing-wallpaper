//http://stackoverflow.com/questions/10639914/is-there-a-way-to-get-bings-photo-of-the-day

var request = require('request');
var fs = require('fs');
var path = require('path');

function fetch() {
  var uri = 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';

  request(uri, function (error, response, body) {
    try {
      var data = JSON.parse(body);
      var images = data.images;

      images.forEach(function (image) {
        var idx = image.url.lastIndexOf('.');
        var subfix = image.url.substr(idx);
        var dist = path.resolve(__dirname, '../../../Pictures/bing-wallpapers');
        var img = path.join(dist, image.fullstartdate + subfix);

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
