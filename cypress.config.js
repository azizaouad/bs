const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://www.uwas.fr",
    videos: false,

    setupNodeEvents(on, config) {},
  },
});
