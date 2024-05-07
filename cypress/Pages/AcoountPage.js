import { AppConfig } from "../../config";
import LoginPage from "./LoginPage";
const LP = new LoginPage();
class AccountPage {
  addRandomCharacter(title) {
    const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Générer une lettre minuscule aléatoire

    const modifiedTitle = title + randomChar; // Ajouter le caractère aléatoire au titre
    return modifiedTitle;
  }

  navigateToAccount() {
    LP.waitForVisibilityOfElement("#user-dropdown");
    cy.get("#user-dropdown").click();
    cy.get("#account-nav").click();
  }
  ChangeFirstName(firstName) {
    LP.waitForVisibilityOfElement("#firstName");
    cy.get("#firstName").clear().type(firstName);
    cy.get("#edit-btn").click();
  }

  SuccesToChangeHisFirstName(firstName) {
    cy.reload();
    LP.waitForVisibilityOfElement("#firstName");

    cy.get("#firstName")
      .invoke("val")
      .then((newFirstName) => {
        const change = newFirstName.toUpperCase() === firstName.toUpperCase();
        cy.wrap(change).should("be.true");
      });
  }
  FailToChangeHisFirstName(firstName) {
    cy.reload();
    LP.waitForVisibilityOfElement("#firstName");

    cy.get("#firstName")
      .invoke("val")
      .then((newFirstName) => {
        const change = newFirstName.toUpperCase() === firstName.toUpperCase();
        cy.wrap(change).should("be.false");
      });
  }
  ChangeLastName(lastName) {
    LP.waitForVisibilityOfElement("#lastName");
    cy.get("#lastName").clear().type(lastName);
    cy.get("#edit-btn").click();
  }

  SuccesToChangeHislastName(lastName) {
    cy.reload();
    LP.waitForVisibilityOfElement("#lastName");

    cy.get("#lastName")
      .invoke("val")
      .then((newlastName) => {
        const change = newlastName.toUpperCase() === lastName.toUpperCase();
        cy.wrap(change).should("be.true");
      });
  }
  FailToChangeHislastName(lastName) {
    cy.reload();
    LP.waitForVisibilityOfElement("#lastName");

    cy.get("#lastName")
      .invoke("val")
      .then((newlastName) => {
        const change = newlastName.toUpperCase() === lastName.toUpperCase();
        cy.wrap(change).should("be.false");
      });
  }
  userClickOnPasswordLink(oldPwd) {
    LP.navigate(AppConfig.URL);

    LP.EnterEmailAndPassword(AppConfig.emailPhotographe, oldPwd);
    this.navigateToAccount();

    cy.get("#changePwLink").click();
  }
  PasswordLink() {
    LP.waitForVisibilityOfElement("#changePwLink");
    cy.get("#changePwLink").click();
  }
  CliqueSurBoutonModifierMdp() {
    cy.get("#change-pw-btn").click();
  }

  SaisirConfirmationMotDePasse(confirmPWD) {
    cy.get("#confirmPwd").type(confirmPWD);
  }

  SaisirNouveauMotDePasse(newpwd) {
    cy.get("#newPwd").type(newpwd);
  }

  SaisirAncienMotDePasse(oldPWD) {
    cy.get("#oldPwd").type(oldPWD);
  }
  userConnectWithHisNewcredentials(newpass) {
    cy.get("#user-dropdown").click();

    cy.get("#testLogout").click();
    LP.waitForVisibilityOfElement("#email");

    LP.EnterEmailAndPassword(AppConfig.emailPhotographe, newpass);
    LP.SuccesLogin;
  }
  FailTochangeHisPassword() {
    cy.get("#confirmPwd").should("be.visible");

    cy.get("#newPwd").should("be.visible");

    cy.get("#oldPwd").should("be.visible");
    cy.get("#change-pw-btn").should("be.visible");
  }
}

export default AccountPage;
