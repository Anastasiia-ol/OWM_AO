import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
import * as ComplexAPI from "../utils/Helper/pageObject/ComplexAPI";

describe('Auth - Reset Password', () => {


    context('Reset Password.', () => {
    
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

      beforeEach(() => {
        ComplexAPI.navigateToPage({navigateTo: `ResetPassword`});
      });
      

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button

        Test Steps:
        1. Verify that page is show with correct labels
        2. Veriry that "Sign Up" button is enabled at the top of the page
        3. Verify that "Send reset link" button is disabled
        4. Verify that "Email address" field contains correct placeholder
        */
        it('Verify Reset Password Page page labels and buttons status.', () => {
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.checkLabelsResetPasswordPage();
          Auth.checkSignUpBtnEnabled();
          Auth.checkSendResetLinkDisabled();
          Auth.checkPlaceholdersEmailPassword(plhdEmailData);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();   
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button

        Test Steps:
        1. Fill "Email address" field with non-existent email
        2. Verify that "Send reset link" button is enabled
        3. Verify error message is shown with correct data
        */
         
        it('Verify an error message for non-existent email.', () => {
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.fillEmailForResetPassword(nonExistentEmailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          Auth.checkErrorMsg(errorMsgEmailData); 
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button

        Test Steps:
        1. Verify that "Send reset link" button is disabled
        2. Fill "Email address" field with incorrect data
        3. Verify that an alert is shown with correct text
        4. Verify that "Send reset link" button is enabled
        5. Fill "Email address" field with another incorrect data
        6. Verify that an alert is shown with correct text
        7. Verify that "Send reset link" button is enabled
        8. Remove data from "Email address" field
        9. Verify that "Send reset link" button is disabled
        */
        it('Verify required fields and field validation.', () => {
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
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        
        Test Steps:
        1. Fill "Email address" field with correct data
        2. Verify that "Send rest link" button is enabled
        3. Click "Send rest link" button
        4. Verify that "Back" button is enabled at the top of the page
        5. Click "Back" button
        6. Verify that the user is navigated to previous page. The page is shown with correct labels
        */
        it('Verify that the user is navigated to previous page after clicking "Back" button.', () => {
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
          Auth.checkBackAtTheTopEnabled();
          Auth.clickBackAtTheTop();
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.checkLabelsResetPasswordPage();
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        
        Test Steps:
        1. Fill "Email address" field with correct data
        2. Verify that "Send rest link" button is enabled
        3. Click "Send rest link" button
        4. Verify that "Back to log in" button is enabled
        5. Click "Back to log in" button
        6. Verify that the user is navigated to "Sign In" page. The page is shown with correct labels
        */
        it('Verify that the user is navigated to "Log In" page after clicking "Back to log in" button.', () => {
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
          Auth.checkBackToLogInBtnEnabled();
          Auth.clickBackToLogInBtn();
          CommonActions.waitForElementIsVisible(Auth.btnSignIn);
          Auth.checkLabelsAuthPage(`SignIn`);
        });
        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        
        Test Steps:
        1. Fill "Email address" field with correct data
        2. Verify that "Send rest link" button is enabled
        3. Click "Send rest link" button
        4. Verify that "Sign up" button is enabled
        5. Click "Sign up" button
        6. Verify that the user is navigated to Individual Sign Up page. The page is shown with correct labels
        */
        it('Verify "Sing Up" button at the top of Success Reset Password page leads to Sign Up page.', () => {
          CommonActions.waitForElementIsVisible(Auth.btnForgotPasswordGoBack);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          CommonActions.waitForElementIsVisible(Auth.btnBackToLogIn);
          Auth.checkSignUpBtnEnabled();
          Auth.clickSignUpBtn();
          CommonActions.waitForElementIsVisible(Auth.btnSubmit);
          Auth.checkLabelsAuthPage(`SignUpIndividual`);
        });
        

       
       
    });

    context('Reset Password - expired link.', () => {

      beforeEach(() => {
        cy.visit('https://stage.owm.ai/auth/new-password?resetPasswordToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYXN0YXNpYS5vbGl5YXJueWsrY2kwMUBzY3J1bWxhdW5jaC5jb20iLCJpZCI6Mjk5LCJpYXQiOjE3MjQzMTA2MTZ9.BxuMNEjM2and4f0ECRJY6CAukf-07qqQJ3-9TMli4qQ');
      });

      /*
      Test Description:
      Prerequisite:
      1. Navigate to invalid reset link

      Test Steps:
      1. Verify that page is shown with correct labels
      2. Verify that "Back To Reset Password" button is enabled
      */


      it('Verify that page is shown with correct elements when reset link is invalid.', () => {
        CommonActions.waitForElementIsVisible(Auth.lblHeadInvalidResetLink);
        Auth.checkLblInvalidResetLink();
        Auth.checkBackToResetPasswordBntEnabled();
      });

      /*
      Test Description:
      Prerequisite:
      1. Navigate to invalid reset link

      Test Steps:
      1. Click "Back To Reset Password" button
      2. Verify that the user is navigated to Reset Password page. The Reset Password page is shown with correctt labels
      */
     
      it('Verify that "Back To Reset Password" button on Invalid Reset Link page leads to Reset Password page.', () => {
        CommonActions.waitForElementIsVisible(Auth.lblHeadInvalidResetLink);
        Auth.clickBackToResetPasswordBtn();
        CommonActions.waitForElementIsVisible(Auth.btnSendResetLink);
        Auth.checkLabelsResetPasswordPage();
      });

    })

});
