// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

/*
//for cypress
Cypress.Commands.add('xpath', (selector, options = {}) => {
    return cy.wrap({
      timeout: Cypress.config('defaultCommandTimeout'),
      ...options,
    }).xpath(selector);
  });*/

/// <reference path="../../node_modules/cypress/types/index.d.ts" />
// For more details see https://www.npmjs.com/package/cypress-iframe
import 'cypress-iframe'
// See more details about "waitUntil"  function here: https://www.npmjs.com/package/cypress-wait-until
import 'cypress-wait-until';

// See more details about "attachFile" feature here: https://github.com/abramenal/cypress-file-upload
import 'cypress-file-upload';
