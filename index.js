module.exports = function(sails) {
  return {

    // Method called by gladys to install/init module
    install: require('./lib/install'),

    // Method called by gladys to notify
    notify: require('./lib/notify'),

    // This method can be called in a script
    // gladys.module.voicerss.say({text:"MyText",lang:"fr-fr"})
    say: require('./lib/say')

  };
};