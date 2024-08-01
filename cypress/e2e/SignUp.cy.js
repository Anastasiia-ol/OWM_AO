import * as Auth from "../utils/Helper/pageObject/Auth";

describe('Auth - Sign Up', () => {


    context('Sign Up.', () => {
      const lblHeadData = "Let’s get started";
      const lbl1Data = "Create your OWM account now!";
      const lblNearChangePageData = "Already have an account?";
      const lblTermsData = "By creating an account, you agree to our Privacy Policy and Terms and Conditions.";
      const lblOrData = "Or";
      const lblChangeAuthData =  "Sign in"; 
      const lblSignInBtnData = "I wanna Own it with OWM";
      const lblEmailData = "Email address";
      const lblPasswordData = "Password";
    
      const lblContinueWithGoogleData = "Continue with Google";
      const lblContinueWithLinkedInData = "Continue with LinkedIn";
      const plhdEmailData = "Enter your email here";
      const plhdPasswordData = "At least 8 characters";
      let emailData = `anastasia.oliyarnyk+ci01@scrumlaunch.com`;
      let passwordData = `21250178OwM`;
      let invalidEmail01 = `anastasia.oliyarnyk+2@scrumlaunch`;
      let invalidEmail02 = `anastasia.oliyarnyk+2@scrumlaunch.`;
      let invalitPassword01 = `OwM1`;
      let invalitPassword02 = `OWM010824`;
      let invalitPassword03 = `owm010824`;
      let invalitPassword04 = `PasswordOWM`;

      const alertEmailData = "Incorrect format";
      const alertPasswordData01 = "At least 8 characters";
      const alertPasswordData02 = "At least one lowercase letter";
      const alertPasswordData03 = "At least one uppercase letter";
      const alertPasswordData04 = "At least one number";
      const errorMsgExistAcc = "Email already exists!";

        /*
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Verify that "Sign In" button to change page is enabled
        4. Verify that labels on the Sing Up page are shown with correct text
        5. Verify that the email and password placeholders contain the correct text
        6. Verify that "I wanna Own it with OWM" button is disabled
        7. Verify that "Continue With Google" button is enabled
        8. Verify that "Continue with LinkedIn" button is enabled
        
        */
        it('Verify Sign Up page labels and buttons status.', () => {
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.checkChangePageBtnEnabled();
          Auth.checkLabelsSignInPage({
            signUpFlag: true,
            lblNearChangePageText: lblNearChangePageData, 
            lblChangeAuthText: lblChangeAuthData,
            lblHeadText: lblHeadData, 
            lbl1Text: lbl1Data,
            lblEmailText: lblEmailData, 
            lblPasswordText: lblPasswordData,
            lblSignUpBtnText: lblSignInBtnData, 
            lblTermsText: lblTermsData, 
            lblOrText: lblOrData,
            lblContinueWithGoogleText: lblContinueWithGoogleData, 
            lblContinueWithLinkedInText: lblContinueWithLinkedInData});

          Auth.checkPlaceholdersEmailPassword (plhdEmailData, plhdPasswordData);
          Auth.checkIWannaOWMBtnDisabled();
          Auth.checkContinueWithGoogleBtnEnabled();
          Auth.checkContinueWithLinkedIBtnEnabled();
        });

        /* 
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Verify that "I wanna Own it with OWM" button is disabled
        4. Fill "Email address" field with invalid data 
        5. Fill "Password" field with invalid data (less than 8 characters)
        6. Verify that alerts are shown with correct text
        7. Verify that "I wanna Own it with OWM" button is enabled
        8. Fill "Password" field with invalid data (without lowercase letter)
        9. Verify that alerts are shown with correct text
        10. Verify that "I wanna Own it with OWM" button is enabled
        11. Fill "Password" field with invalid data (without uppercase letter)
        12. Verify that alerts are shown with correct text
        13. Verify that "I wanna Own it with OWM" button is enabled
        14. Fill "Password" field with invalid data (without number)
        15. Verify that alerts are shown with correct text
        16. Verify that "I wanna Own it with OWM" button is enabled
        17. Remove data from "Email address" and "Password" fields
        18. Verify that "I wanna Own it with OWM" button is disabled
        */


        it('Verify required fields and field validation.', () => {
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.checkSignUpBtnDisabled();
          Auth.fillSignInPage({
            emailText: invalidEmail01,
            passwordText: invalitPassword01
          });
          Auth.clickSignUpBtn();
          Auth.checkAlertForEmailPassword(alertEmailData, alertPasswordData01);
          Auth.checkSignUpBtnEnabled();
          Auth.fillSignInPage({
            emailText: invalidEmail02,
            passwordText: invalitPassword02
          });
          Auth.checkAlertForEmailPassword(alertEmailData, alertPasswordData02);
          Auth.checkSignUpBtnEnabled();
          Auth.fillSignInPage({
            passwordText: invalitPassword03
          });
          Auth.checkAlertForEmailPassword(alertEmailData, alertPasswordData03);
          Auth.checkSignUpBtnEnabled();
          Auth.fillSignInPage({
            passwordText: invalitPassword04
          });
          Auth.checkAlertForEmailPassword(alertEmailData, alertPasswordData04);
          Auth.checkSignUpBtnEnabled();
          Auth.fillSignInPage({
            clearEmail: true,
            clearPassword: true
          });
          Auth.checkSignUpBtnDisabled();
        });

        /* */
        it('Verify an error message when sign up with already created account.', () => {
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.fillSignInPage({
            emailText: emailData,
            passwordText: passwordData
          });
          Auth.clickSignUpBtn();
          Auth.checkErrorMsg(errorMsgExistAcc);
          
        });
        /* */
        it('Verify Sign Up page labels and buttons status.', () => {
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.clickContinueWithGoogleBtn();
      
        });

    });

});
