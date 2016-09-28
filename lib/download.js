const config = require('./config');
const request = require('request');
const md5 = require('md5');
const fs = require('fs');


module.exports = function(apiKey, lang, text){
  return new Promise(function(resolve, reject){

    var dest = config.cacheDirectory + md5(lang + text) + '.mp3';

    var post = {
      key: apiKey,
      src: text,
      hl: lang,
      r: config.speedRate,
      c: config.codec,
      f: config.audioFormat
    };

    // we test first if the file does not already exist
    fs.exists(dest, function(exists) {
      if(exists){ 
        console.log('Voicerss : Using cache, file already exist');
        return resolve(dest);
      }else{
      
        var req = request.post({url: config.apiUrl, form: post}, function(err, res, body){
          if(err)
            return reject(err);
          if(res.statusCode != 200)
            return reject(new Error(`Unvalid status code : ${res.statusCode}`));
          if(res.headers['content-type'] != 'audio/mpeg')
            return reject(new Error(`Unvalid content-type : ${res.headers['content-type']}`));

          var file = fs.createWriteStream(dest);
          req.pipe(file);

          file.on('error', reject);

          file.on('finish', function() {
            resolve(dest);
            file.close();
          });
        });
      }
    });
  });
}