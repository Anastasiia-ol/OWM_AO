import * as Auth from "../utils/Helper/pageObject/Auth";

describe('Auth - Sign In', () => {


    context('Sign In.', () => {
      const lblHeadData = "Sign in";
      const lbl1Data = "Log into your OWM account.";
      const lblNearChangePageData = "Don’t have an account?";
      const lblTermsData = "By signing in, you agree to our Privacy Policy and Terms and Conditions.";
      const lblOrData = "Or";
      const lblChangeAuthData= "Sign up";
      const lblSignInBtnData = "Sign in";
      const lblEmailData = "Email address";
      const lblPasswordData = "Password";
      const lblRememberMeData = "Remember me";
      const lblForgotPasswordData = "Forgot password?";
      const lblContinueWithGoogleData = "Continue with Google";
      const lblContinueWithLinkedInData = "Continue with LinkedIn";
      const plhdEmailData = "Enter your email here";
      const plhdPasswordData = "At least 8 characters";
      const errorMsgEmailData = `Email is invalid!`;
      const errorPasswordEmailData = `Password is invalid`;
      let emailData = `anastasia.oliyarnyk+ci01@scrumlaunch.com`;
      let passwordData = `21250178OwM`;
      let incorrectEmailData = `incorrect@scrumlaunch.com`;
      const incorrectPasswordData = `Password is invalid`;
      const alertEmailData = "Incorrect format";
      const alertPasswordData = "This field is required";
      let emailUnconfirmedData = `anastasia.oliyarnyk+ciwhcf@scrumlaunch.com`;
      const errorMsgEmailConfirmationData = "Email comfirmation required!";

      //const lblHeadData ="Let’s get started";


        /*
        Test Description
    
        Test Steps:
        1. Navigate to Auth page
        2. Verify that labels on the Sing In page are shown with correct text
        3. Verify that the email and password placeholders contain the correct text
        4. Verify that "Sign Up" button to change page is enabled
        5. Verify that "Remember Me" checkbox is not selected
        6. Verify that "Forgot Password" button is enabled
        7. Verify that "Sign In" button is disabled
        8. Verify that "Continue With Google" button is enabled
        9. Verify that "Continue with LinkedIn" button is enabled
  
        */
        it('Verify Sign In page labels and buttons status.', () => {
          cy.visit('https://stage.owm.ai/auth');
          Auth.checkLabelsSignInPage({
            signUpFlag: false,
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData,
            lblHeadText: lblHeadData, 
            lbl1Text: lbl1Data,
             lblEmailText: lblEmailData, lblPasswordText: lblPasswordData,
             lblRememberMeText: lblRememberMeData, 
             lblForgotPasswordText: lblForgotPasswordData, 
             lblSignInBtnText: lblSignInBtnData, 
             lblTermsText: lblTermsData, 
             lblOrText: lblOrData,
             lblContinueWithGoogleText: lblContinueWithGoogleData, 
             lblContinueWithLinkedInText: lblContinueWithLinkedInData});

             Auth.checkPlaceholdersEmailPassword (plhdEmailData, plhdPasswordData);
             Auth.checkChangePageBtnEnabled();
             Auth.checkRememberMeChbIsNotSelected();
             Auth.checkForgotPasswordBtnEnabled();
             Auth.checkSignInBtnDisabled();
             Auth.checkContinueWithGoogleBtnEnabled();
             Auth.checkContinueWithLinkedIBtnEnabled();
          
        });

        /*
        Test Description
    
        Test Steps:
        1. Navigate to Auth page
        2. Fill "Email address" and "Password" fields with icorrect data
        3. Verify that "Sign In" button is enabled
        4. Click "Sign In" button
        5. Verify that error message is shown with correct text
        6. Verify that Sign In page is opened
        */

        it('Verify an error message when sign in with incorrect email.', () => {
          cy.visit('https://stage.owm.ai/auth');
          
          Auth.fillSignInPage({
            emailText: incorrectEmailData,
            passwordText: passwordData
          });
          Auth.checkSignInBtnEnabled();
          Auth.clickSignInBtn();
          Auth.checkErrorMsg(errorMsgEmailData);
          Auth.checkLabelsSignInPage({
            signUpFlag: false,
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData,
            lblHeadText: lblHeadData, 
            lbl1Text: lbl1Data,
             lblEmailText: lblEmailData, lblPasswordText: lblPasswordData,
             lblRememberMeText: lblRememberMeData, 
             lblForgotPasswordText: lblForgotPasswordData, 
             lblSignInBtnText: lblSignInBtnData, 
             lblTermsText: lblTermsData, 
             lblOrText: lblOrData,
             lblContinueWithGoogleText: lblContinueWithGoogleData, 
             lblContinueWithLinkedInText: lblContinueWithLinkedInData});
    
        });

        /*
        Test Description
    
        Test Steps:
        1. Navigate to Auth page
        2. Fill "Email address"field with correct data
        3. Fill "Password" field with icorrect data
        4. Verify that "Sign In" button is enabled
        5. Click "Sign In" button
        6. Verify that error message is shown with correct text
        7. Verify that Sign In page is opened
        */

        it('Verify an error message when sign in with incorrect password.', () => {
          cy.visit('https://stage.owm.ai/auth');
          
          Auth.fillSignInPage({
            emailText: emailData,
            passwordText: incorrectPasswordData
          });
          Auth.checkSignInBtnEnabled();
          Auth.clickSignInBtn();
          Auth.checkErrorMsg(errorPasswordEmailData);
          Auth.checkLabelsSignInPage({
            signUpFlag: false,
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData,
            lblHeadText: lblHeadData, 
            lbl1Text: lbl1Data,
             lblEmailText: lblEmailData, lblPasswordText: lblPasswordData,
             lblRememberMeText: lblRememberMeData, 
             lblForgotPasswordText: lblForgotPasswordData, 
             lblSignInBtnText: lblSignInBtnData, 
             lblTermsText: lblTermsData, 
             lblOrText: lblOrData,
             lblContinueWithGoogleText: lblContinueWithGoogleData, 
             lblContinueWithLinkedInText: lblContinueWithLinkedInData});
    
        });

        /*
        Test Description
    
        Test Steps:
        1. Navigate to Auth page
        2. Fill "Email address" and "Password" fields with invalid data
        3. Verify that "Sign In" button is enabled
        3. Click "Sign In" button
        4. Verify that an alert is shown with correct text
        5. Verify that "Sign In" button is enabled
        6. Fill "Email address" with invalid data
        7. Remove data from "Password" field
        8. Verify that alerts are shown with correct text
        9. Verify that "Sign In" button is disabled
        10. Remove "Email address" with invalid data
        11. Fill "Password" field with data
        12. Verify that an alert is shown with correct text
        13. Verify that "Sign In" button is dsabled
        */

        it('Verify required fields and field validation.', () => {
          let incorrectFormatEmailData1 = "bbb";
          let incorrectFormatEmailData2 = "bbb@b";
          cy.visit('https://stage.owm.ai/auth');
          
          Auth.fillSignInPage({
            emailText: incorrectFormatEmailData1,
            passwordText: incorrectPasswordData
          });
          Auth.checkSignInBtnEnabled();
          Auth.clickSignInBtn();
          Auth.checkAlertForEmailPassword(alertEmailData);
          Auth.checkSignInBtnEnabled();
          Auth.fillSignInPage({
            emailText: incorrectFormatEmailData2,
            clearPassword: true
          })
          Auth.checkAlertForEmailPassword(alertEmailData, alertPasswordData);
          Auth.checkSignInBtnDisabled();
          Auth.fillSignInPage({
            passwordText: incorrectPasswordData,
            clearEmail: true
          });
          Auth.checkAlertForEmailPassword(alertEmailData);
          Auth.checkSignInBtnDisabled();
          
        });

        /*
        Test Description
    
        Test Steps:
        1. Navigate to Auth page
        2. Fill "Email address" and "Password" fields with correct data
        5. Click "Sign In" button
        6. Verify that Home Page is opened
        */
        it('Verify successful login.', () => {
          cy.visit('https://stage.owm.ai/auth');
          
          Auth.fillSignInPage({
            emailText: emailData,
            passwordText: passwordData
          });
          Auth.clickSignInBtn();
          //Verify elements on Home Page
    
        });

         /*
        Test Description
    
        Test Steps:
        1. Navigate to Auth page
        2. Fill "Email address" field with uncofirmed email 
        3. Fill "Password" field with correct data
        5. Click "Sign In" button
        6. Verify error message is shown with correct data
        */
        it('Verify an error message when sign in with uncofirmed email.', () => {
          cy.visit('https://stage.owm.ai/auth');
          
          Auth.fillSignInPage({
            emailText: emailUnconfirmedData,
            passwordText: passwordData
          });
          Auth.clickSignInBtn();
          Auth.checkErrorMsg(errorMsgEmailConfirmationData);
          
        });

    });

});
