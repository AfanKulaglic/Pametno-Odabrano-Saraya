import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // pokreni Next.js ručno
    setupNodeEvents(on, config) {
      // ovdje možeš dodati plugin ako koristiš axe ili druge dodatke
      return config;
    },
    supportFile: false
  },
});
