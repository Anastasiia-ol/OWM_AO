const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  env: {
    "MAILOSAUR_API_KEY": "45422fd9b615157cf62274d9e05c53dea9438fd24fbfc1865cb4549473957605",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
       //return require('./cypress/plugins/index.js')(on, config)
    },
   // baseUrl: 'https://stage.owm.ai/auth/',
    //specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    //defaultCommandTimeout: 130000, // Set global timeout to 130 seconds
  },
});
