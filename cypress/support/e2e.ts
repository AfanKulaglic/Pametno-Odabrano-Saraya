// Ovaj fajl se automatski učitava prije svakog E2E testa
// Možeš tu dodati globalne komande, axe integraciju itd.

import 'cypress-axe';

// primjer custom komande
Cypress.Commands.add('checkA11yPage', () => {
  cy.injectAxe();
  cy.checkA11y();
});
