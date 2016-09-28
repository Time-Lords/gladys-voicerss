const config = require('./config');
const fse = require('fs-extra');

module.exports = function(){

  // Create cache folder
  fse.mkdirsSync(config.cacheDirectory);

  // Install notification module
  return gladys.notification.install({
    service: 'voicerss', 
    name: 'Speak (Voicerss)'
  });

};