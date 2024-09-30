import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
import * as ComplexAPI from "../utils/Helper/pageObject/ComplexAPI";

describe('Reset Password - Mailosaur', () => {
    context('Reset Password from Email via Mailosaur.', () => {
        const Mailosaur = require('mailosaur');
      
        const apiKey = 'OINAGTYZ2cIw3MQgzBtpTLkry2V4BGg1';
        const mailosaur = new Mailosaur(apiKey);
        const serverId = 'uksj5vnw';
        const serverDomain = '@uksj5vnw.mailosaur.net';
        let emailAddress;
        const randomString = new Date().getTime();
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let emailData = `1724833137664@uksj5vnw.mailosaur.net`;

          it('Verify that page with success message is shown after reset password.', () => { 
            ComplexAPI.navigateToPage({navigateTo: `ResetPassword`});
            CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
            Auth.fillEmailForResetPassword(emailData);
            Auth.checkSendResetLinkEnabled();
            Auth.clickSendResetLinkBnt();
            CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
            Auth.checkLabelsResetPasswordPage(false);
            Auth.checkSignUpBtnEnabled();
            Auth.checkBackToLogInBtnEnabled();
            Auth.checkBackAtTheTopEnabled();
          });

        /*
        Test Steps:
        1. Navigate to Create New Password page from email
        2. Verify that page is shown with correct labels
        3. Verify that New Password and Password Confirmation fields have correct placeholders
        4. Verify that "Reset Password" button is disabled
        */

          it('Retrive the link for reset password. Verify that page with success message is shown after reset password', () => { 
            cy.mailosaurGetMessage(serverId, {sentTo: emailData, subject: 'Forgot Your Password?'})
             .then((email)=>{
                
                 let confirmSignupLink = email.html.links[0].href;
                 cy.visit(confirmSignupLink);
                 Auth.checkLblCreateNewPassword();
                 Auth.checkPlaceholdersPasswordConfirm();  
                 Auth.checkResetPasswordBtnDisabled();
             })           
         })
         /*
        Test Steps:
        1. Navigate to Create New Password page from email
        2. Verify that "Reset Password" button is disabled
        3. Fill "New Password" and "Password Confirmation" fields with invalid data (less than 8 characters)
        4. Click "Reset Password" button
        5. Verify that alert is shown with correct text
        6. Verify that "Reset Password" button is enabled
        7. Fill "New Password" and "Password Confirmation" fields with invalid data (without lowercase letter)
        8. Verify that alert is shown with correct text
        9. Verify that "Reset Password" button is enabled
        10. Fill "New Password" and "Password Confirmation" fields with invalid data (without uppercase letter)
        11. Verify that alert is shown with correct text
        12. Verify that "Reset Password" button is enabled
        13. Fill "New Password" and "Password Confirmation" fields with invalid data (without number)
        14. Verify that alert is shown with correct text
        15. Verify that "Reset Password" button is enabled
        16. Fill "New Password" field with correct data and "Password Confirmation" field with different data
        17. Click "Reset Password" button
        18. Verify that alert is shown with correct text
        19. Verify that "Reset Password" button is enabled
        20. Remove data from "Password Confirmation" field
        21. Verify that "Reset Password" button is disabled
        */

         it('Verify fields validation and buttons statuses', () => { 
            let invalitPassword01 = `OwM1`;
            let invalitPassword02 = `OWM010824`;
            let invalitPassword03 = `owm010824`;
            let invalitPassword04 = `PasswordOWM`;
            const alertPasswordData01 = "At least 8 characters";
            const alertPasswordData02 = "At least one lowercase letter";
            const alertPasswordData03 = "At least one uppercase letter";
            const alertPasswordData04 = "At least one number";
            const alertPasswordData05 = "Password does not match";

            cy.mailosaurGetMessage(serverId, {sentTo: emailData, subject: 'Forgot Your Password?'})
             .then((email)=>{
                let confirmSignupLink = email.html.links[0].href;
                cy.visit(confirmSignupLink);
                 Auth.checkResetPasswordBtnDisabled();
                 Auth.fillCreateNewPassword(invalitPassword01, invalitPassword01);
                 Auth.checkResetPasswordBtnEnabled();
                 Auth.clickResetPasswordBtn();
                 Auth.checkAlertForEmailPassword({alertEmailText: alertPasswordData01});
                 Auth.checkResetPasswordBtnEnabled();
                 Auth.fillCreateNewPassword(invalitPassword02, invalitPassword02);
                 Auth.checkAlertForEmailPassword({alertEmailText: alertPasswordData02});
                 Auth.checkResetPasswordBtnEnabled();
                 Auth.fillCreateNewPassword(invalitPassword03, invalitPassword03);
                 Auth.checkAlertForEmailPassword({alertEmailText: alertPasswordData03});
                 Auth.checkResetPasswordBtnEnabled();
                 Auth.fillCreateNewPassword(invalitPassword04, invalitPassword04);
                 Auth.checkAlertForEmailPassword({alertEmailText: alertPasswordData04});
                 Auth.checkResetPasswordBtnEnabled();
                 Auth.fillCreateNewPassword(passwordData, invalitPassword04);
                 Auth.clickResetPasswordBtn();
                 Auth.checkAlertForEmailPassword({alertPasswordText: alertPasswordData05});
                 Auth.checkResetPasswordBtnEnabled();
                 Auth.fillCreateNewPassword(passwordData, invalitPassword04, false, true);
                 Auth.checkResetPasswordBtnDisabled();
             })           
         })
        
        /*
        Test Steps:
        1. Navigate to Create New Password page
        2. Click "Sign Up" button
        3. Verify that the user is navigated to Sign Up page. The Sign Up page is shown with correctt labels
        */

         it('Verify "Sing Up" button at the top of Create New Password page leads to Sign Up page.', () => { 
            cy.mailosaurGetMessage(serverId, {sentTo: emailData, subject: 'Forgot Your Password?'})
             .then((email)=>{
                let confirmSignupLink = email.html.links[0].href;
                cy.visit(confirmSignupLink);
                Auth.clickSignUpBtn();
                CommonActions.waitForElementIsVisible(Auth.btnSubmit);
                Auth.checkLabelsAuthPage(`SignUpIndividual`);
             })      
         })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject, sender, email text are correct
        */
         it('Verify email for reset password', () => { 
          
            cy.mailosaurGetMessage(serverId, {sentTo: emailData})
            .then((email)=>{
               expect(email.subject).to.equal('Forgot Your Password?');
               expect(email.from[0].email).to.equal('hello@owm.ai'); 
               expect(email.from[0].name).to.equal('OWM'); 
               
               const body = email.html.body;
               cy.document().then((doc) => {
                doc.write(body);
                doc.close();
                Auth.checkEmailResetPassword();
               })
            })        
             
       })
       /*
        Test Steps:
        1. Navigate to Create New Password page from email
        2. Fill "New Password" and "Password Confirmation" fields with correct data 
        3. Click "Reset Password" button
        4. Verify success message is shown
        5. Verify that the user is navigated to Sign In page. The Sign In page is shown with correctt labels
        */

        it('Verify succesfull change password', () => { 
          const successMsgData = "Your password was changed successfully.";
          
            cy.mailosaurGetMessage(serverId, {sentTo: emailData, subject: 'Forgot Your Password?'})
             .then((email)=>{
                let confirmSignupLink = email.html.links[0].href;
                cy.visit(confirmSignupLink);
                Auth.fillCreateNewPassword(passwordData, passwordData);
                Auth.clickResetPasswordBtn();
                Auth.checkErrorMsg(successMsgData);
                CommonActions.waitForElementIsVisible(Auth.btnSignIn);
                Auth.checkLabelsAuthPage(`SignIn`);     
          })
        })

      })

  })