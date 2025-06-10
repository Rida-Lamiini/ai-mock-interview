import { describe, it } from "mocha";
import { cy } from "cypress";
import Cypress from "cypress";

describe("Responsive Design Tests", () => {
  const sizes = ["iphone-6", "ipad-2", [1024, 768], [1920, 1080]];

  sizes.forEach((size) => {
    it(`Should display correctly on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }

      cy.visit("/");
      cy.wait(500); // Allow time for any responsive adjustments

      // Header should always be visible
      cy.get("header").should("be.visible");

      // On mobile, menu should be collapsed
      if (size === "iphone-6") {
        cy.get("header")
          .find("button[aria-label='Toggle mobile menu']")
          .should("be.visible");
        cy.contains("Dashboard").should("not.be.visible");

        // Open mobile menu and check items
        cy.get("button[aria-label='Toggle mobile menu']").click();
        cy.contains("Dashboard").should("be.visible");
      }
      // On larger screens, navigation should be visible
      else if (Cypress._.isArray(size) && size[0] >= 1024) {
        cy.contains("Dashboard").should("be.visible");
        cy.get("header")
          .find("button[aria-label='Toggle mobile menu']")
          .should("not.be.visible");
      }

      // Hero section should be visible on all devices
      cy.contains("Master Your Interviews").should("be.visible");

      // Check that the layout adjusts for different screen sizes
      if (size === "iphone-6") {
        // On mobile, buttons should stack
        cy.get(".flex-col").should("exist");
      } else if (Cypress._.isArray(size) && size[0] >= 1024) {
        // On desktop, features should be in multiple columns
        cy.get(".lg\\:grid-cols-3").should("exist");
      }
    });
  });
});
