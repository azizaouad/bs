class LoginPage {
  waitForVisibilityOfElement(locator) {
    cy.get(locator, { timeout: 10000 }).should("be.visible");
  }
  waitForElementToBeClickable(locator) {
    cy.get(locator, { timeout: 10000 })
      .should("be.enabled")
      .should("be.visible");
  }
  navigate(url) {
    cy.visit(url);
    cy.viewport(1920, 1080);
  }
  closeBrowser() {
    cy.end();
  }
  SuccesLogin() {
    this.waitForVisibilityOfElement("#user-dropdown");
    cy.get("#user-dropdown").should("be.visible");
    cy.url().should("not.include", "/login");
  }
  FailToLogin() {
    cy.get("#email").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.url().should("contain", "/login");
  }

  EmptyPassword(email) {
    cy.get("input").first().type(email);
    cy.get("input").last().clear();
    cy.get("button").click();
  }

  EmptyEmail(Password) {
    cy.get("input").first().clear();
    cy.get("input").last().type(Password);
    cy.get("button").click();
  }

  EmptyFields() {
    cy.get("input").first().clear();
    cy.get("input").last().clear();
    cy.get("button").click();
  }

  EnterEmailAndPassword(email, password) {
    cy.get("input").first().type(email);
    cy.get("input").last().type(password);
    cy.get("button").click();
  }
  UI() {
    cy.get(".login-page__formContainer-forgot").should(
      "have.text",
      "Forgot Password?"
    );
    cy.get(".login-page__formContainer-signup-item").should(
      "contain",
      "Sign up now!"
    );
    cy.get("input").first().should("have.attr", "type");
    cy.get("input").last().should("have.attr", "type");
    cy.get("button").should("have.attr", "type");
    cy.get("button").should("have.text", "Sign in");
    cy.get("button").should(
      "have.css",
      "background-color",
      "rgb(22, 119, 255)"
    );
  }
}
export default LoginPage;
