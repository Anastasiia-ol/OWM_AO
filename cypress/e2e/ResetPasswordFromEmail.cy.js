import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";

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
            const lblNearChangePageData = "Don’t have an account?";
            const lblChangeAuthData= "Sign up";
            const lblHeadResetPswdData = "Reset password";
            const lbl2ResetPswData = "We've sent you an email with instructions on how to reset your password.";
            const lblBackToLogInBtnData = "Back to log in";
          
            cy.visit('https://stage.owm.ai/auth');
            Auth.clickForgotPasswordBtn();
            CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
            Auth.fillEmailForResetPassword(emailData);
            Auth.checkSendResetLinkEnabled();
            Auth.clickSendResetLinkBnt();
            CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
            Auth.checkLabelsResetPasswordPage({
              lblNearChangePageText: lblNearChangePageData, 
              lblChangeAuthText: lblChangeAuthData, 
              lblHeadText: lblHeadResetPswdData, 
              lbl1Text: lbl2ResetPswData, 
              btnBackToLogInBtnText: lblBackToLogInBtnData,
              step1: false   
            });
            Auth.checkChangePageBtnEnabled();
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
            const lblNearChangePageData = "Don’t have an account?";
            const lblChangeAuthData= "Sign up";
            const lblCreateNewPasswordHeadDataText = "Create new password"; 
            const lblNewPasswordSubheadText = "Enter and confirm your new password."; 
            const lblNewPasswordText = "New password";
            const lblConfirmPasswordText = "Password confirmation";
            const lblResetPasswordBtnText = "Reset password";
            const plhdNewPasswordData = "Create your new password";
            const plhdPasswordCofirmationData = "Re-type your new password";

            cy.mailosaurGetMessage(serverId, {sentTo: emailData, subject: 'Forgot Your Password?'})
             .then((email)=>{
                
                 let confirmSignupLink = email.html.links[0].href;
                 cy.visit(confirmSignupLink);
                 Auth.checkLblCreateNewPassword (lblNearChangePageData, lblChangeAuthData, 
                    lblCreateNewPasswordHeadDataText, lblNewPasswordSubheadText, 
                    lblNewPasswordText,lblConfirmPasswordText, lblResetPasswordBtnText);
                 Auth.checkPlaceholdersPasswordConfirm(plhdNewPasswordData, plhdPasswordCofirmationData);  
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
        1. Navigate to Create New Password page from email
        2. Fill "New Password" and "Password Confirmation" fields with correct data 
        3. Click "Reset Password" button
        4. Verify success message is shown
        5. Verify that the user is navigated to Sign In page. The Sign In page is shown with correctt labels
        */

         it('Verify succesfull change password', () => { 
          const lblNearChangePageSSUPData = "Don’t have an account?";
          const lblChangeAuthSSUPData= "Sign up";
          const lblHeadSIData = "Sign in";
          const lblSI1Data = "Log into your OWM account.";
          const lblRememberMeData = "Remember me";
          const lblForgotPasswordData = "Forgot password?";
          const lblSignInBtnData = "Sign in";
          const lblTermsSIData = "By signing in, you agree to our Privacy Policy and Terms and Conditions.";
          const lblPasswordData = "Password";
          const lblOrData = "Or";
          const lblContinueWithGoogleData = "Continue with Google";
          const lblContinueWithLinkedInData = "Continue with LinkedIn";
          const successMsgData = "Your password was changed successfully.";
          const lblEmailData = "Email address";

            cy.mailosaurGetMessage(serverId, {sentTo: emailData, subject: 'Forgot Your Password?'})
             .then((email)=>{
                let confirmSignupLink = email.html.links[0].href;
                cy.visit(confirmSignupLink);
                Auth.fillCreateNewPassword(passwordData, passwordData);
                Auth.clickResetPasswordBtn();
                Auth.checkErrorMsg(successMsgData);
                CommonActions.waitForElementIsVisible(Auth.btnSignIn);
                
                Auth.checkLabelsSignInPage({
                    signUpFlag: false,
                    lblNearChangePageText: lblNearChangePageSSUPData, 
                    lblChangeAuthText: lblChangeAuthSSUPData,
                    lblHeadText: lblHeadSIData, 
                    lbl1Text: lblSI1Data,
                    lblEmailText: lblEmailData, 
                    lblPasswordText: lblPasswordData,
                    lblRememberMeText: lblRememberMeData, 
                    lblForgotPasswordText: lblForgotPasswordData, 
                    lblSignInBtnText: lblSignInBtnData, 
                    lblTermsText: lblTermsSIData, 
                    lblOrText: lblOrData,
                    lblContinueWithGoogleText: lblContinueWithGoogleData, 
                    lblContinueWithLinkedInText: lblContinueWithLinkedInData});
                    })       
         })

        /*
        Test Steps:
        1. Navigate to Create New Password page
        2. Click "Sign Up" button
        3. Verify that the user is navigated to Sign Up page. The Sign Up page is shown with correctt labels
        */

         it('Verify "Sing Up" button at the top of Create New Password page leads to Sign Up page.', () => { 
          const lblHeadData = "Let’s get started";
          const lbl1Data = "Create your OWM account now!";
          const lblNearChangePageData = "Already have an account?";
          const lblTermsData = "By creating an account, you agree to our Privacy Policy and Terms and Conditions.";
          const lblOrData = "Or";
          const lblChangeAuthData =  "Sign in"; 
          const lblSignUpBtnData = "I wanna Own it with OWM";
          const lblEmailData = "Email address";
          const lblPasswordData = "Password";
          const lblContinueWithGoogleData = "Continue with Google";
          const lblContinueWithLinkedInData = "Continue with LinkedIn";

            cy.mailosaurGetMessage(serverId, {sentTo: emailData, subject: 'Forgot Your Password?'})
             .then((email)=>{
                let confirmSignupLink = email.html.links[0].href;
                cy.visit(confirmSignupLink);
                Auth.changeAuthPage();
                CommonActions.waitForElementIsVisible(Auth.btnSingUp);
                Auth.checkLabelsSignInPage({
                    signUpFlag: true,
                    lblNearChangePageText: lblNearChangePageData, 
                    lblChangeAuthText: lblChangeAuthData,
                    lblHeadText: lblHeadData, 
                    lbl1Text: lbl1Data,
                    lblEmailText: lblEmailData, 
                    lblPasswordText: lblPasswordData,
                    lblSignUpBtnText: lblSignUpBtnData, 
                    lblTermsText: lblTermsData, 
                    lblOrText: lblOrData,
                    lblContinueWithGoogleText: lblContinueWithGoogleData, 
                    lblContinueWithLinkedInText: lblContinueWithLinkedInData});
             })      
         })

    })
})