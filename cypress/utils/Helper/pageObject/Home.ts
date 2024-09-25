import * as CommonActions from "./CommonActions";

const lblWelcome = `#welcome-text`;
const btnLogout = `#logout-button`;
export const btnGetStarted = `#get-started-button`;
const btnAddMyAgreements = `#add-my-agreements-button`;
//navigator
const btnHome = `#home-nav-link`;
const btnPortfolio = `#portfolio-nav-link`;
const btnToDos = `#to-dos-nav-link`;
const btnMyTeam = `#my-team-nav-link`;
const btnMyProfile = `#my-profile-nav-link`;

const btnUserNameBottom = `#sidebar-desktop-profile-wrapper`;
const lblUserNameBottom = `#sidebar-desktop-profile-name`;
const lblUserEmailBottom = `#sidebar-desktop-profile-email`;
const btnViewingAs = `#header-profile-dropdown-button`;

export function checkWelcomeText (onlyWelcome = true, userNameText){
    onlyWelcome? CommonActions.checkElementContainText(lblWelcome, `Welcome`): CommonActions.checkElementText(lblWelcome, `Welcome ${userNameText}`)
}
export function clickViewingAsBtn(){
    cy.get(btnViewingAs);
}