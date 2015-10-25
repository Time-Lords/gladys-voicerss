#Gladys Voicerss
This module use voicerss.org to say a given text.
You need to create an account on voicerss.org to get the API key.

##Installation
```bash
# Go to the hooks directory
$ cd gladys/api/hooks

# Clone the repository
$ git clone https://github.com/Time-Lords/gladys-voicerss.git voicerss
$ cd voicerss

# Install NPM dependencies
$ npm install

# Set the API key
$ nano lib/defaults.js

# Restart Gladys
$ pm2 restart gladys
```

##Scenario actions
* Say a given text
