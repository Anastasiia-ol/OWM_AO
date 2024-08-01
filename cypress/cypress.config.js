const { defineConfig } = require('cypress');

module.exports = defineConfig({
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 45000,
  requestTimeout: 45000,
  responseTimeout: 45000,
  video: true,
  videoUploadOnPasses: false,
  chromeWebSecurity: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  projectId: "t7w4h2",

  env: {
    tests_retry_count: 3,
    tests_retry_small_count: 1,
    environment: "CI",
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.

    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});

