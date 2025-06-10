import { describe, beforeEach, it } from "cypress";
import { cy } from "cypress";

describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the header with navigation", () => {
    cy.get("header").should("be.visible");
    cy.contains("Dashboard").should("be.visible");
    cy.contains("Questions").should("be.visible");
    cy.contains("Upgrade").should("be.visible");
    cy.contains("How it Works?").should("be.visible");
  });

  it("displays the hero section with CTA buttons", () => {
    cy.contains("h1", "Master Your Interviews").should("be.visible");
    cy.contains("Start Free Practice").should("be.visible");
    cy.contains("Watch Demo").should("be.visible");
  });

  it("displays the features section", () => {
    cy.contains("h2", "Powerful Features for Success").should("be.visible");
    cy.contains("Realistic Simulations").should("be.visible");
    cy.contains("Speech Recognition").should("be.visible");
    cy.contains("Instant Feedback").should("be.visible");
  });

  it("displays the how it works section", () => {
    cy.contains("h2", "How It Works").should("be.visible");
    cy.contains("Choose Your Path").should("be.visible");
    cy.contains("Practice with AI").should("be.visible");
    cy.contains("Get Smart Feedback").should("be.visible");
  });

  it("displays the testimonials section", () => {
    cy.contains("h2", "Success Stories").should("be.visible");
    // Check for at least one testimonial
    cy.get('[class*="testimonial"]').should("have.length.at.least", 1);
  });

  it("displays the CTA section with email form", () => {
    cy.contains("h2", "Ready to Ace Your Next Interview?").should("be.visible");
    cy.get('input[type="email"]').should("be.visible");
    cy.contains("Get Started Free").should("be.visible");
  });

  it("displays the footer", () => {
    cy.get("footer").should("be.visible");
    cy.contains("AI Mock Interview").should("be.visible");
    cy.contains("© 2024").should("be.visible");
  });

  it("can submit the email form", () => {
    const testEmail = "test@example.com";
    cy.get('input[type="email"]').type(testEmail);
    cy.contains("button", "Get Started Free").click();
    cy.contains("Thank you! We'll be in touch soon.").should("be.visible");
  });

  it("has working navigation links", () => {
    cy.contains("Dashboard").click();
    cy.url().should("include", "/dashboard");
  });
});
