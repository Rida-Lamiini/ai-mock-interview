// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Import necessary variables
const Cypress = require("cypress");
const { expect } = require("chai");

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// Custom command to test dark mode
Cypress.Commands.add("toggleDarkMode", () => {
  // This assumes you have a dark mode toggle button
  cy.get('[data-testid="dark-mode-toggle"]').click();
});

// Custom command to check if element is in viewport
Cypress.Commands.add("isInViewport", { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state("window")).height();
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.lessThan(bottom);
  expect(rect.bottom).to.be.greaterThan(0);

  return subject;
});
