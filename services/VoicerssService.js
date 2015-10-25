'use strict';

if(sails.config.machine.soundCapable){

	var request = require("request");
	var md5 = require('MD5');
	var fs = require('fs');
	var lame = require('lame');
	var Speaker = require('speaker');


	/**
	 * @method getMusic
	 * @param {} text
	 * @param {} dest
	 * @param {} language
	 * @param {} callback
	 */
	var getMp3 = function(text, dest, language, callback){
		var post = {
			key: sails.config.voicerss.apiKey,
			src: text,
			hl: language,
			r: sails.config.voicerss.speedRate,
			c: sails.config.voicerss.codec,
			f: sails.config.voicerss.audioFormat,
		};
		var req = request.post({url: sails.config.voicerss.apiUrl, form: post});

		var file = fs.createWriteStream(dest);
		req.pipe(file);
		file.on('error', function(err){
			callback(err);
		});
		file.on('finish', function() {
	  		file.close(callback);
		});
	};

	/**
	 * Play a MP3
	 * @method play
	 * @param {} mp3
	 * @return
	 */
	var play = function (mp3){
		fs.createReadStream(mp3)
		  .pipe(new lame.Decoder())
		  .on('format', function (format) {
		    this.pipe(new Speaker(format));
		   });
	};

	/**
	 * Save in the database a sentence
	 * we have just been saying
	 * @method addSpeak
	 * @param {} text
	 * @param {} mp3file
	 * @param {} User
	 * @param {} callback
	 * @return
	 */

	var addSpeak = function(text, mp3file, User, callback){
		var speakObj = {
			text:text,
			mp3file:mp3file,
			user:User.id
		};
		// creating the new Speak
		Speak.create(speakObj, function speakCreated(err,Speak){
			if(err) return sails.log.warn(Speak);
			if(callback)
				callback();
		});
	};
}

module.exports = {

	/**
	 * Say the given text
	 * @method say
	 * @param {} text
	 * @param {} User
	 * @param {} callback
	 * @return
	 */
	say : function(text, User, callback){
		User = User || {};
		callback = callback || function(){};

		if(!sails.config.machine.soundCapable){
			sails.log.warn('Machine can\'t play sound');
			return callback('Machine can\'t play sound');
		}

		/*if(!User || !User.language)
			return sails.log.warn('No User with language given');*/

		Speak.findOne({ text: text})
			 .exec(function speakFound(err, Speak){
			 		if(err){
			 			sails.log.info(err);
			 			return callback(err);
			 		}
					 
			 		if(!Speak){

			 			var language = User.language || sails.config.voicerss.language;
			 			var mp3file = md5(text) + '.mp3';
			 			var pathToMp3 = sails.config.voicerss.cacheDirectory + '/' + mp3file;

			 			getMp3(text, pathToMp3, language, function(err){
			 				if(err)return callback(err);

			 				play(pathToMp3);

			 				if(User.id){
			 					addSpeak(text,mp3file,User);
			 				}
			 				callback();
			 			});

			 		}else{
						//if text has already been said before
			 			// get the path to the mp3 of the sentence
			 			var pathToMp3 = sails.config.voicerss.cacheDirectory + '/' + Speak.mp3file;
			 			// play the mp3 file
			 			play(pathToMp3);
			 			if(User.id){
			 				// add the sentence to Speak database
			 				addSpeak(text,Speak.mp3file,User);
			 			}
			 		}
			 });
	}

};
