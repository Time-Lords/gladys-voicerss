'use strict';

/**
 * Module Configuration
 */


var param = require('./parametres.js');

module.exports.voicerss = {

  apiKey: '',
  apiUrl: 'https://api.voicerss.org/',
  speedRate: 0,
  audioFormat: '8khz_8bit_mono',
  codec: 'MP3',
  language: 'fr-fr',
  cacheDirectory: 'voicecache/',
    
  // title for the Hook
  title: 'voicerss',
	// the name of the hook folder
  folderName: param.folderName,

  actionTypes : [
    {
      serviceName: 'VoicerssService',
      functionName: 'say',
      name: 'Say (Voicerss)',
      description: 'Say the given text (Voicerss)',
      optionspath: ''
    }
  ]

};
