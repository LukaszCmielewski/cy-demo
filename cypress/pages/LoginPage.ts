import {isNil} from "lodash"
import RestApiPath from "./RestApiPath";

class LoginPage {
  private _elements = {
    getUsernameInput: () => cy.get("#login_id"),
    getPasswordInput: () => cy.get("#login_password"),
    getLoginButton: () => cy.get("#login-btn")
  }

  login(data: { username?: string, password?: string, baseUrl?: string }) {
    let username = "CyTester";
    let password = "CyPassword";
    let baseUrl = "https://demo-bank.vercel.app/";
    if (!isNil(data.username)) {
      username = data.username;
    }
    if (!isNil(data.password)) {
      password = data.password
    }
    if (!isNil(data.baseUrl)) {
      password = data.baseUrl
    }
    cy.visit(baseUrl);
    this._elements.getUsernameInput().type(username);
    this._elements.getPasswordInput().type(password);
    cy.intercept("GET", RestApiPath.api.desktop).as("getRequest");
    this._elements.getLoginButton().click();
    cy.wait("@getRequest");
    return;
  }
}

export default new LoginPage()