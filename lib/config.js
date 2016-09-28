
module.exports = {
  // Default true, used for development
  soundCapable: typeof(process.env.GLADYS_SOUND_CAPABLE) != 'undefined' ? (process.env.GLADYS_SOUND_CAPABLE === 'true') : true,
  
  apiUrl: 'https://api.voicerss.org/',
  speedRate: 0,
  audioFormat: '8khz_8bit_mono',
  codec: 'MP3',
  language: 'fr-fr',
  cacheDirectory: './cache/voicecache/'
};
