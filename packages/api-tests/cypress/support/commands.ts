/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('rendersCorrectly', (locator, length = 1) => {
  cy.get(locator).should('be.visible').should('have.length', length);
});

import './commands';
Cypress.on('uncaught:exception', () => {
  return false;
});

Cypress.on('uncaught:error', () => {
  return false;
});

export {};
