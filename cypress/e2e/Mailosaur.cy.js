import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
const Mailosaur = require('mailosaur')

//SKIP
describe.skip('Auth - Mailosaur', () => {
    context('Mailosaur.', () => {
      
        const apiKey = 'OINAGTYZ2cIw3MQgzBtpTLkry2V4BGg1';
        const mailosaur = new Mailosaur(apiKey);
        const serverId = 'uksj5vnw';
        const serverDomain = '@uksj5vnw.mailosaur.net';
        let emailAddress;
        const randomString = new Date().getTime();
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;

        it('Fill Sign Up page.', () => {
            cy.visit('https://stage.owm.ai/auth');
            Auth.changeAuthPage();
            Auth.fillSignInPage({
              emailText: emailAddress,
              passwordText: passwordData
            });
            Auth.clickSignUpBtn();
        })

        it('Retrieve the link email and visit.', () => {  
           cy.mailosaurGetMessage(serverId, {sentTo: emailAddress, subject: 'Verify your email address for OWM'})
            .then((email)=>{
               // expect(email.subject).to.equal('Verify your email address for OWM')
               // expect (email.from)
                let confirmSignupLink = email.html.links[0].href;
                cy.visit(confirmSignupLink);
            })
            cy.mailosaurDeleteAllMessages(serverId);
              
        })

        it('Verify that page with success message is shown after reset password.', () => {
          
            cy.visit('https://stage.owm.ai/auth');
            Auth.clickForgotPasswordBtn();
            //cy.wait(3000);
            CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
            Auth.fillEmailForResetPassword(emailAddress);
            Auth.checkSendResetLinkEnabled();
            Auth.clickSendResetLinkBnt();
            CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
            //cy.wait(3000);
           /* Auth.checkLabelsResetPasswordPage({
              lblNearChangePageText: lblNearChangePageData, 
              lblChangeAuthText: lblChangeAuthData, 
              lblHeadText: lblHeadResetPswdData, 
              lbl1Text: lbl2ResetPswData, 
              btnBackToLogInBtnText: lblBackToLogInBtnData,
              step1: false   
            });*/
            Auth.checkChangePageBtnEnabled();
            Auth.checkBackToLogInBtnEnabled();
            Auth.checkBackAtTheTopEnabled();
          });

          it('Retrive the link for reset password and visit.', () => {  
            cy.mai
            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress,  subject: 'Forgot Your Password?'})
             .then((email)=>{
                 //expect(email.subject).to.equal('Forgot Your Password?')
                 //expect (email.from)
                 let confirmSignupLink = email.html.links[0].href;
                 cy.visit(confirmSignupLink);
                 Auth.checkPlaceholdersPasswordConfirm(plhdNewPasswordData, plhdPasswordCofirmationData);  
                 Auth.checkResetPasswordBtnDisabled();

             })
               
         })
    })
})