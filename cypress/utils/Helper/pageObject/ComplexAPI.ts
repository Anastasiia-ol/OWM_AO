import * as CommonActions from "./CommonActions";
import * as Auth from "./Auth";

export function navigateToPage({navigateTo, env = 'stage' }) {
    let url = ``;
    switch (navigateTo) {
        case `SignIn`:
            url = `https://${env}.owm.ai/auth`;
            cy.log(`URL is: ${url}`);
            cy.visit(url);
            break;
        case `SignUpIndividual`:
            url = `https://${env}.owm.ai/auth`;
            cy.visit(url);
            Auth.clickSignUpBtn();
            break;
        case `SignUpCompany`:
            url = `https://${env}.owm.ai/auth`;
            cy.log(`URL is: ${url}`);
            cy.visit(url);
            Auth.clickSignUpBtn();
            Auth.clickCompanySignUpBtn();
            break;
       
        case `Home`:
            url = `https://${env}.owm.ai/auth`;
            cy.log(`URL is: ${url}`);
            cy.visit(url);
            break;

        default:
            cy.log(`Navigation page has not been provided.`)
    }
}
