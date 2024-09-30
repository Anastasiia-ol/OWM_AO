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
//
/*
const faker = require('faker');

Cypress.Commands.add('generateRandomEmail', () => {
  const randomEmail = `anastasia.oliyarnyk${faker.random.alphaNumeric(5)}@scrumlaunch.com`;
  return randomEmail;
});*/
Cypress.Commands.add('generateRandomEmail', () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  return `anastasia.oliyarnyk+ci${randomString}@scrumlaunch.com`;
});
// for email
import 'cypress-mailslurp';
//Login
//Cypress.Commands.add('login', (username, parrword)){}

import 'cypress-mailosaur';


// cypress/support/commands.ts
import { domain as Auth0Domain } from '../../auth_config.json';

function logIntoGoogle(username, password, name) {
  Cypress.on(
    'uncaught:exception',
    (err) =>
      !err.message.includes('ResizeObserver loop') &&
      !err.message.includes('Error in protected function')
  )
  cy.visit('http://localhost:3000')
  cy.get('#qsLoginBtn').click()

  cy.origin(Auth0Domain, () => {
    cy.scrollTo('bottom')
    cy.get('form[data-provider="google"]').submit()
  })

  cy.origin(
    'https://accounts.google.com',
    {
      args: {
        username,
        password,
      },
    },
    ({ username, password }) => {
      Cypress.on(
        'uncaught:exception',
        (err) =>
          !err.message.includes('ResizeObserver loop') &&
          !err.message.includes('Error in protected function')
      )

      cy.get('input[type="email"]').type(username, {
        log: false,
      })
      // NOTE: The element exists on the original form but is hidden and gets rerendered, which leads to intermittent detached DOM issues
      cy.contains('Next').click().wait(4000)
      cy.get('[type="password"]').type(password, {
        log: false,
      })
      cy.contains('Next').click().wait(4000)
    }
  )

  cy.get('h6.dropdown-header').should('contain', name)
}

