import * as Auth from "../utils/Helper/pageObject/Auth";

describe('Auth - Reset Password', () => {


    context('Reset Password.', () => {
    
      const lblNearChangePageData = "Don’t have an account?";
      
      const lblChangeAuthData= "Sign up";
      
      const lblEmailData = "Email address";
      const plhdEmailData = "Enter your email here";
      
      let emailData = `anastasia.oliyarnyk+ci01@scrumlaunch.com`;
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
        Test Description
    
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
          cy.wait(3000);
          Auth.checkLabelsResetPasswordPage({
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData, 
            lblHeadText: lblHeadResetPswdData, 
            lbl1Text: lbl1ResetPswData, 
            lblEmailText: lblEmailData, 
            lblSendResetLinkBtnText: lblSendResetLinkBtnData
          });
          Auth.checkChangePageBtnEnabled();
          Auth.checkSendResetLinkDisabled();
          Auth.checkPlaceholdersEmailPassword(plhdEmailData);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
         // Auth.clickSendResetLinkBnt();
          
        });

        /*Test Description
    
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
          cy.wait(3000);
          Auth.fillEmailForResetPassword(nonExistentEmailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          Auth.checkErrorMsg(errorMsgEmailData); 
        });

        /*Test Description
    
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
          cy.wait(3000);
          Auth.checkSendResetLinkDisabled();
          Auth.fillEmailForResetPassword(incorrectFormatEmailData1);
          Auth.clickSendResetLinkBnt();
          Auth.checkAlertForEmailPassword(alertEmailData);
          Auth.checkSendResetLinkEnabled();
          Auth.fillEmailForResetPassword(incorrectFormatEmailData2);
          Auth.checkAlertForEmailPassword(alertEmailData);
          Auth.fillEmailForResetPassword(incorrectFormatEmailData2, true);
          Auth.checkSendResetLinkDisabled();
        });

         /*
        Test Description
    
        Test Steps:
        1. Navigate to Auth page
        2. Click "Forgot Password?" button
        3. Fill "Email address" field with correct data
        4. Verify that "Send rest link" button is enabled
        5. Click "Send rest link" button
        6. Verify that page is swhon with correct labels
        7. Veriry that "Sign Up" button iis nebled at the top of the page
        8. Verify that "Back to log in" butto is enabled
        */
        it('Verify that page with success message is shown after reset password.', () => {
          
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickForgotPasswordBtn();
          cy.wait(3000);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          cy.wait(3000);
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
        Test Description
    
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
          cy.wait(3000);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          cy.wait(3000);
          Auth.checkBackAtTheTopEnabled();
          Auth.clickBackAtTheTop();
          cy.wait(3000);
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
        Test Description
    
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

          cy.visit('https://stage.owm.ai/auth');
          Auth.clickForgotPasswordBtn();
          cy.wait(3000);
          Auth.fillEmailForResetPassword(emailData);
          Auth.checkSendResetLinkEnabled();
          Auth.clickSendResetLinkBnt();
          cy.wait(3000);
          Auth.checkBackToLogInBtnEnabled();
          Auth.clickBackToLogInBtn();
          cy.wait(3000);
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
    });

});
