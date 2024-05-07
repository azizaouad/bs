///<reference types="cypress"/>
import { AppConfig } from "../../config";
import AccountPage from "../Pages/AcoountPage";
import LoginPage from "../Pages/LoginPage";

const LP = new LoginPage();
const AP = new AccountPage();

beforeEach("GO To account", () => {
  if (Cypress.mocha.getRunner().suite.ctx.currentTest.title === `Skip this`) {
  } else {
    LP.navigate(`${AppConfig.URL}/login`);
    LP.EnterEmailAndPassword(AppConfig.emailPhotographe, AppConfig.mdp);
    //   LP.SuccesLogin();
    AP.navigateToAccount();
  }
});

afterEach("close browser", () => {
  LP.closeBrowser();
});

describe("first Name Test Case", () => {
  it("Succes to change his first name", () => {
    const newFirstName = AP.addRandomCharacter("first");
    AP.ChangeFirstName(newFirstName);
    AP.SuccesToChangeHisFirstName(newFirstName);
  });

  const FirstNames = ["3li", "@li", "@3ll", "li", "   "];
  FirstNames.forEach((newFirstName) => {
    it("fail to change his first name ", () => {
      AP.ChangeFirstName(newFirstName);
      AP.FailToChangeHisFirstName(newFirstName);
    });
  });
});
describe("last Name Test Case", () => {
  it("Succes to change his last name", () => {
    const newLastName = AP.addRandomCharacter("last");
    AP.ChangeLastName(newLastName);
    AP.SuccesToChangeHislastName(newLastName);
  });

  const LastNames = ["3li", "@li", "@3ll", "li", "   "];
  LastNames.forEach((newLastName) => {
    it("fail to change his last name", () => {
      AP.ChangeLastName(newLastName);
      AP.FailToChangeHislastName(newLastName);
    });
  });
});
describe("Password field TestCase", () => {
  const Pass = [
    ["Admin123!", "Admin123!!"],
    ["Admin123!!", "Admin123!"],
  ];

  Pass.forEach(([OldPWD, NewPwd]) => {
    it("Skip this", () => {
      AP.userClickOnPasswordLink(OldPWD);
      AP.SaisirAncienMotDePasse(OldPWD);
      AP.SaisirNouveauMotDePasse(NewPwd);
      AP.SaisirConfirmationMotDePasse(NewPwd);
      AP.CliqueSurBoutonModifierMdp();
      cy.wait(4000);
      AP.userConnectWithHisNewcredentials(NewPwd);
    });
  });

  it("user want to change his password without put the correct actual password", () => {
    AP.PasswordLink();
    AP.SaisirAncienMotDePasse("AzizAzizError");
    AP.SaisirNouveauMotDePasse("Aziz1996@");
    AP.SaisirConfirmationMotDePasse("Aziz1996@");
    AP.CliqueSurBoutonModifierMdp();
    AP.FailTochangeHisPassword();
  });

  const passwords = [
    ["admin6542!", "admin6542!"],
    ["Edmin65412", "Edmi65412"],
    ["ADMIN6542!", "ADMIN6542!"],
    ["ADMINadmi!", "ADMINadmi!"],
    ["Admin1!", "Admin1!"],
    ["Admin1!", "Admin123!"],
    ["Admin123!", "Admin123456!"],
  ];
  passwords.forEach(([Newpwd, confirmpwd]) => {
    it("user want to change his password without respecting the field criterias", () => {
      AP.PasswordLink();
      AP.SaisirAncienMotDePasse(AppConfig.mdp);
      AP.SaisirNouveauMotDePasse(Newpwd);
      AP.SaisirConfirmationMotDePasse(confirmpwd);
      AP.CliqueSurBoutonModifierMdp();
      AP.FailTochangeHisPassword();
    });
  });
});
