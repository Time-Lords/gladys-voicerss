const say = require('./say');

module.exports = function(notification, user){

  // Get house
  return gladys.machine.getMyHouse()

    // Then test if user is at home
    .then((house) => gladys.house.isUserAtHome({user: user.id, house: house.id}))

    // Then say text if user is at home
    .then((userAtHome) => {

      if(!userAtHome){
        console.log(`Voicerss : User ${user.firstname} not at home`);
        return Promise.reject(new Error(`User ${user.firstname} not at home`));
      }

      return say({text:notification.text, language:user.language.toLowerCase()});
    });

};