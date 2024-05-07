///<reference types="cypress"/>
import { AppConfig } from "../../config";
import LoginPage from "../Pages/LoginPage";

const LP = new LoginPage();
beforeEach("Before access to URL", () => {
  LP.navigate(`${AppConfig.URL}/login`);
});

afterEach("close browser", () => {
  LP.closeBrowser();
});

describe("Login Tests", () => {
  it("should login with valid credentials", () => {
    LP.waitForVisibilityOfElement("#email");
    LP.EnterEmailAndPassword(AppConfig.emailPhotographe, AppConfig.mdp);
    LP.SuccesLogin();
  });
  const credentials = [
    ["azizaouadi12@gmail.com", "Admin1234!"],
    ["kkkkkk@gmail.com", "Admin123!"],
    ["looooooool@gmail.com", "Admin123456789!"],
  ];

  credentials.forEach(([email, password]) => {
    it("should login with invalid credentials", () => {
      LP.EnterEmailAndPassword(email, password);
      LP.FailToLogin();
    });
  });

  it("empty fields", () => {
    LP.EmptyFields();
    LP.FailToLogin();
  });
  it("empty email", () => {
    LP.EmptyEmail(AppConfig.mdp);
    LP.FailToLogin();
  });
  it("empty password", () => {
    LP.EmptyPassword(AppConfig.emailClient);
    LP.FailToLogin();
  });

  it("Login page UI", () => {
    LP.UI();
  });
});
