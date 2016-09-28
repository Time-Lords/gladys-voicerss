const download = require('./download');
const play = require('./play');

module.exports = function(params){

  // Get voircerss key saved by user
  return gladys.param.getValue('voicerss_key')

    // Then download the mp3 or get from cache
    .then((key) => download(key, params.language, params.text))

    // Then play file
    .then((dest) => play(dest));

};