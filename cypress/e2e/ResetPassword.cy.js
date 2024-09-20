import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";

describe('Auth - Reset Password', () => {


    context('Reset Password.', () => {
    
      const lblNearChangePageData = "Don’t have an account?";
      const lblChangeAuthData= "Sign up";
      
      const lblEmailData = "Email address";
      const plhdEmailData = "Enter your email here";
      
      let emailData = `1724833137664@uksj5vnw.mailosaur.net`;//existed user
      let passwordData = `21250178OwM`;
      let nonExistentEmailData = `incorrect@scrumlaunch.com`;
      
      let emailUnconfirmedData = `anastasia.oliyarnyk+ciwhcf@scrumlaunch.com`;
      const errorMsgEmailData = "Email address does not exist";
      let incorrectFormatEmailData1 = "bbb";
      let incorrectFormatEmailData2 = "bbb@b";
      const alertEmailData = "Incorrect format";
      const lblHeadResetPswdData = "Reset password";
      const lbl1ResetPswData = "Enter your email and we'll send you a reset link.";
      const lbl2ResetPswData = "We've sent you an email with instructions on how to reset your password.";
      const lblSendResetLinkBtnData = "Send reset link";
      const lblBackToLogInBtnData = "Back to log in";
      

         /*
        Test Steps:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        3. Verify that page is show with correct labels
        4. Veriry that "Sign Up" button is enabled at the top of the page
        5. Verify that "Send reset link" button is disabled
        6. Verify that "Email address" field contains correct placeholder
        */
        it('Verify Reset Password Page page labels and buttons status.', () => {
          
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickForgotPasswordBtn();
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.checkLabelsResetPasswordPage({
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData, 
            lblHeadText: lblHeadResetPswdData, 
            lbl1Text: lbl1ResetPswData, 
            lblEmailText: lblEmailData, 
            lblSendResetLinkBtnText: lblSendResetLinkBtnData
          });
          Auth.checkSignUpBtnEnabled();
          Auth.checkSendResetLinkDisabled();
          Auth.checkPlaceholdersEmailPassword(plhdEmailData);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();   
        });

        /*
        Test Steps:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        3. Fill "Email address" field with non-existent email
        5. Verify that "Send reset link" button is enabled
        6. Verify error message is shown with correct data
        */
         
        it('Verify an error message for non-existent email.', () => {
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickForgotPasswordBtn();
          //cy.wait(3000);
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.fillEmailForResetPassword(nonExistentEmailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          Auth.checkErrorMsg(errorMsgEmailData); 
        });

        /*
        Test Steps:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        3. Verify that "Send reset link" button is disabled
        4. Fill "Email address" field with incorrect data
        5. Verify that an alert is shown with correct text
        6. Verify that "Send reset link" button is enabled
        7. Fill "Email address" field with another incorrect data
        8. Verify that an alert is shown with correct text
        9. Verify that "Send reset link" button is enabled
        10. Remove data from "Email address" field
        11. Verify that "Send reset link" button is disabled
        */
        it('Verify required fields and field validation.', () => {
          
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickForgotPasswordBtn();
          //cy.wait(3000);
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.checkSendResetLinkDisabled();
          Auth.fillEmailForResetPassword(incorrectFormatEmailData1);
          Auth.clickSendResetLinkBnt();
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData});
          Auth.checkSendResetLinkEnabled();
          Auth.fillEmailForResetPassword(incorrectFormatEmailData2);
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData});
          Auth.fillEmailForResetPassword(incorrectFormatEmailData2, true);
          Auth.checkSendResetLinkDisabled();
        });

        /*
        
        Test Steps:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        3. Fill "Email address" field with correct data
        4. Verify that "Send rest link" button is enabled
        5. Click "Send rest link" button
        6. Verify that "Back" button is enabled at the top of the page
        7. Click "Back" button
        8. Verify that the user is navigated to previous page. The page is shown with correct labels
        */
        it('Verify that the user is navigated to previous page after clicking "Back" button.', () => {
          
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickForgotPasswordBtn();
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
          Auth.checkBackAtTheTopEnabled();
          Auth.clickBackAtTheTop();
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.checkLabelsResetPasswordPage({
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData, 
            lblHeadText: lblHeadResetPswdData, 
            lbl1Text: lbl1ResetPswData, 
            lblEmailText: lblEmailData, 
            lblSendResetLinkBtnText: lblSendResetLinkBtnData
          });
        });

        /*
        
        Test Steps:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        3. Fill "Email address" field with correct data
        4. Verify that "Send rest link" button is enabled
        5. Click "Send rest link" button
        6. Verify that "Back to log in" button is enabled
        7. Click "Back to log in" button
        8. Verify that the user is navigated to "Sign In" page. The page is shown with correct labels
        */
        it('Verify that the user is navigated to "Log In" page after clicking "Back to log in" button.', () => {
          const lblHeadData = "Sign in";
          const lbl1Data = "Log into your OWM account.";
          const lblPasswordData = "Password";
          const lblRememberMeData = "Remember me";
          const lblForgotPasswordData = "Forgot password?";
          const lblContinueWithGoogleData = "Continue with Google";
          const lblContinueWithLinkedInData = "Continue with LinkedIn";
          const lblSignInBtnData = "Sign in";
          const lblTermsData = "By signing in, you agree to our Privacy Policy and Terms and Conditions.";
          const lblOrData = "Or";

          cy.visit('https://stage.owm.ai/auth');
          Auth.clickForgotPasswordBtn();
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
          Auth.checkBackToLogInBtnEnabled();
          Auth.clickBackToLogInBtn();
          CommonActions.waitForElementIsVisible(Auth.btnSignIn);
          Auth.checkLabelsSignInPage({
            signUpFlag: false,
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData,
            lblHeadText: lblHeadData, 
            lbl1Text: lbl1Data,
             lblEmailText: lblEmailData, 
             lblPasswordText: lblPasswordData,
             lblRememberMeText: lblRememberMeData, 
             lblForgotPasswordText: lblForgotPasswordData, 
             lblSignInBtnText: lblSignInBtnData, 
             lblTermsText: lblTermsData, 
             lblOrText: lblOrData,
             lblContinueWithGoogleText: lblContinueWithGoogleData, 
             lblContinueWithLinkedInText: lblContinueWithLinkedInData});
        });
        /*
        
        Test Steps:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        3. Fill "Email address" field with correct data
        4. Verify that "Send rest link" button is enabled
        5. Click "Send rest link" button
        6. Verify that "Back to log in" button is enabled
        7. Click "Back to log in" button
        8. Verify that the user is navigated to "Sign In" page. The page is shown with correct labels
        */
        it('Verify "Sing Up" button at the top of Success Reset Password page leads to Sign Up page.', () => {
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
          
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickForgotPasswordBtn();
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
          Auth.checkSignUpBtnEnabled();
          Auth.clickSignUpBtn();
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
        });
        

        /*
        Test Steps:
        1. Navigate to invalid reset link
        2. Verify that page is shown with correct labels
        3. Verify that "Back To Reset Password" button is enabled
        */

        it('Verify that page is shown with correct elements when reset link is invalid.', () => {
          
          const lblInvalidResetLinkHeadData = "Apologies, the link you've attempted to use is expired."; 
          const lblInvalidResetLinkSubheadData = "The password reset link may be broken or has expired. If you still need to reset your password, kindly request a new link by revisiting the password reset page."; 
          const lblBackToResetPasswordData = "Back to reset password";
          
          cy.visit('https://stage.owm.ai/auth/new-password?resetPasswordToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYXN0YXNpYS5vbGl5YXJueWsrY2kwMUBzY3J1bWxhdW5jaC5jb20iLCJpZCI6Mjk5LCJpYXQiOjE3MjQzMTA2MTZ9.BxuMNEjM2and4f0ECRJY6CAukf-07qqQJ3-9TMli4qQ');
          
          CommonActions.waitForElementIsVisible(Auth.lblHeadInvalidResetLink);
          Auth.checkLblInvalidResetLink (lblNearChangePageData, lblChangeAuthData, lblInvalidResetLinkHeadData, lblInvalidResetLinkSubheadData, 
            lblBackToResetPasswordData
            );
          Auth.checkBackToResetPasswordBntEnabled();
        });

        /*
        Test Steps:
        1. Navigate to invalid reset link
        2. Click "Back To Reset Password" button
        3. Verify that the user is navigated to Reset Password page. The Reset Password page is shown with correctt labels
        */

        it('Verify that "Back To Reset Password" button on Invalid Reset Link page leads to Reset Password page.', () => {
          
          const lblInvalidResetLinkHeadData = "Apologies, the link you've attempted to use is expired."; 
          const lblInvalidResetLinkSubheadData = "The password reset link may be broken or has expired. If you still need to reset your password, kindly request a new link by revisiting the password reset page."; 
          const lblBackToResetPasswordData = "Back to reset password";
          
          cy.visit('https://stage.owm.ai/auth/new-password?resetPasswordToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYXN0YXNpYS5vbGl5YXJueWsrY2kwMUBzY3J1bWxhdW5jaC5jb20iLCJpZCI6Mjk5LCJpYXQiOjE3MjQzMTA2MTZ9.BxuMNEjM2and4f0ECRJY6CAukf-07qqQJ3-9TMli4qQ');
          CommonActions.waitForElementIsVisible(Auth.lblHeadInvalidResetLink);
          Auth.clickBackToResetPasswordBtn();
          CommonActions.waitForElementIsVisible(Auth.btnSendResetLink);
          Auth.checkLabelsResetPasswordPage({
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData, 
            lblHeadText: lblHeadResetPswdData, 
            lbl1Text: lbl1ResetPswData, 
            lblEmailText: lblEmailData, 
            lblSendResetLinkBtnText: lblSendResetLinkBtnData
          });

        });
    });

});
