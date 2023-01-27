// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      rendersCorrectly(locator: string, length?: number): Chainable<Element>;
    }
  }
}

export {};
