const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  env: {
   "MAILOSAUR_API_KEY": "OINAGTYZ2cIw3MQgzBtpTLkry2V4BGg1",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
       //return require('./cypress/plugins/index.js')(on, config)
    },
     baseUrl: 'https://stage.owm.ai/auth/',
     specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
     //defaultCommandTimeout: 130000, // Set global timeout to 130 seconds
     browser: 'chrome',
  },
});
