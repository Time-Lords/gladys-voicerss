const queue = require('queue');
const fs = require('fs');
const config = require('./config');

if(config.soundCapable){
  const Speaker = require('speaker');
  const lame = require('lame');
}

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

    // Can't play sound
    if(!config.soundCapable){
      console.log(`Voicerss : Skip, machine can't play sound`);
      return reject(new Error(`Can't play sound`));
    }

    // Add to queue
    q.push(function(cb){
      play(dest, cb);
    });

    // Start queue
    q.start(() => {});

    resolve();
  });
  
};
