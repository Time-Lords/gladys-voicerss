const queue = require('queue');
const fs = require('fs');

const Speaker = require('speaker');
const lame = require('lame');

var q = queue({
  concurrency: 1
});

q.start((err) => console.log(err));

function play(mp3, callback){
  fs.createReadStream(mp3)
    .pipe(new lame.Decoder())
    .on('format', function (format) {
      var speaker = new Speaker(format);
      speaker.on('close', callback);
      this.pipe(speaker);
    });
};

module.exports = function(dest){

  return new Promise(function(resolve, reject){

    // Add to queue
    q.push(function(cb){
      play(dest, cb);
    });

    // Start queue
    q.start(() => {});

    resolve();
  });
  
};
