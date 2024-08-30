import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";


describe('Auth - Sign Up', () => {


    context('Sign Up.', () => {
      
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
            lblSignUpBtnText: lblSignUpBtnData, 
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
        6. Click "I wanna Own it with OWM" button
        7. Verify that alerts are shown with correct text
        8. Verify that "I wanna Own it with OWM" button is enabled
        9. Fill "Password" field with invalid data (without lowercase letter)
        10. Verify that alerts are shown with correct text
        11. Verify that "I wanna Own it with OWM" button is enabled
        12. Fill "Password" field with invalid data (without uppercase letter)
        13. Verify that alerts are shown with correct text
        14. Verify that "I wanna Own it with OWM" button is enabled
        15. Fill "Password" field with invalid data (without number)
        16. Verify that alerts are shown with correct text
        17. Verify that "I wanna Own it with OWM" button is enabled
        18. Remove data from "Email address" and "Password" fields
        19. Verify that "I wanna Own it with OWM" button is disabled
        */
        it('Verify required fields and fields validation.', () => {
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.checkSignUpBtnDisabled();
          Auth.fillSignInPage({
            emailText: invalidEmail01,
            passwordText: invalitPassword01
          });
          Auth.clickSignUpBtn();
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData, alertPasswordText: alertPasswordData01});
          Auth.checkSignUpBtnEnabled();
          Auth.fillSignInPage({
            emailText: invalidEmail02,
            passwordText: invalitPassword02
          });
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData, alertPasswordText: alertPasswordData02});
          Auth.checkSignUpBtnEnabled();
          Auth.fillSignInPage({
            passwordText: invalitPassword03
          });
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData, alertPasswordText: alertPasswordData03});
          Auth.checkSignUpBtnEnabled();
          Auth.fillSignInPage({
            passwordText: invalitPassword04
          });
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData, alertPasswordText: alertPasswordData04});
          Auth.checkSignUpBtnEnabled();
          Auth.fillSignInPage({
            clearEmail: true,
            clearPassword: true
          });
          Auth.checkSignUpBtnDisabled();
        });

        /* 
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Fill email with already created account
        4. Fill password
        5. Click "I wanna Own it with OWM" button
        6. Verify that error message is shown with correct text
        */
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
        /* 
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Fill email and password with correct data
        4. Click "I wanna Own it with OWM" button
        5. Verify that labels are shown correctly on Success Sign Up page
        6. Verify that Back button is enabled
        7. Verify that "Send Confirmation Email" button is enabled
        */

        it('Verify labels and button statuses on Success Sing Up page.', () => {
          const lblEmailTitleData = "You're almost done!";
          const lblEmailDescriprionData = "We've sent an email to the address you gave. Just click the link in the email to confirm and then you can log in.";
          const lblResendTextData = "If you can't find it, you can resend the email.(Or maybe it's you, not us).";
          const lbllResendEmailBtnData = "Resend confirmation email";
          const randomString = Math.random().toString(36).substring(2, 7);
          const randomEmailData =  `anastasia.oliyarnyk+ci${randomString}@scrumlaunch.com`;
          cy.log(`Generated Email: ${randomEmailData}`);
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.fillSignInPage({
            emailText: randomEmailData,
            passwordText: passwordData
          });
          Auth.clickSignUpBtn();
          //cy.wait(3000);
          CommonActions.waitForElementIsVisible(Auth.btnGoBack);
          Auth.checkLblSuccessSingUp(lblNearChangePageData, lblChangeAuthData, lblEmailTitleData, lblEmailDescriprionData, lblResendTextData, lbllResendEmailBtnData);
          Auth.checkGoBackBtnIsEnabled();
          Auth.checkResendConfirmationEmailBtnIsEnabled();
        });

         /* 
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Fill email and password with correct data
        4. Click "I wanna Own it with OWM" button
        5. Verify that Back button is enabled
        6. Click Back button
        7. Verify that the user is navigated to Sign Up page. The Sign Up page is shown with correctt labels
        */
         it('Verify Back button on Success Sign Up page leads to Sign Up page.', () => {
       
          const randomString = Math.random().toString(36).substring(2, 7);
          const randomEmailData =  `anastasia.oliyarnyk+ci${randomString}@scrumlaunch.com`;
          cy.log(`Generated Email: ${randomEmailData}`);
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.fillSignInPage({
            emailText: randomEmailData,
            passwordText: passwordData
          });
          Auth.clickSignUpBtn();
         // cy.wait(3000);
         CommonActions.waitForElementIsVisible(Auth.btnGoBack);
          Auth.checkGoBackBtnIsEnabled();
          Auth.clickGoBackBtn();
         // cy.wait(3000);
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
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Fill email and password with correct data
        4. Click "I wanna Own it with OWM" button
        5. Verify that Back button is enabled
        6. Click Back button
        7. Verify that the user is navigated to Sign Up page. The Sign Up page is shown with correctt labels
        */
        it('Verify "Sing In" button at the top of Success Sign Up page leads to Sign In page.', () => {
       
          const randomString = Math.random().toString(36).substring(2, 7);
          const randomEmailData =  `anastasia.oliyarnyk+ci${randomString}@scrumlaunch.com`;

          const lblNearChangePageSSUPData = "Don’t have an account?";
          const lblChangeAuthSSUPData= "Sign up";
          const lblHeadSIData = "Sign in";
          const lblSI1Data = "Log into your OWM account.";
          const lblRememberMeData = "Remember me";
          const lblForgotPasswordData = "Forgot password?";
          const lblSignInBtnData = "Sign in";
          const lblTermsSIData = "By signing in, you agree to our Privacy Policy and Terms and Conditions.";

          cy.log(`Generated Email: ${randomEmailData}`);
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.fillSignInPage({
            emailText: randomEmailData,
            passwordText: passwordData
          });
          Auth.clickSignUpBtn();
          CommonActions.waitForElementIsVisible(Auth.btnGoBack);
          //cy.wait(3000);
          Auth.changeAuthPage();
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
        });

        /* 
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Fill email and password with correct data
        4. Click "I wanna Own it with OWM" button
        5. Verify that "Send Confirmation Email"  button is enabled
        6. Verify that "Send Confirmation Email" button is enabled
        7. Verify page after send
        */
       

        it('Verify Resend Confirmation Email.', () => {
          
          const randomString = Math.random().toString(36).substring(2, 7);
          const randomEmailData =  `anastasia.oliyarnyk+ci${randomString}@scrumlaunch.com`;
          const lblAfterResendingEmailData = "Sent";
          cy.log(`Generated Email: ${randomEmailData}`);
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          Auth.fillSignInPage({
            emailText: randomEmailData,
            passwordText: passwordData
          });
          Auth.clickSignUpBtn(); 
          CommonActions.waitForElementIsVisible(Auth.btnGoBack);
          //cy.wait(3000);
          Auth.checkResendConfirmationEmailBtnIsEnabled();
          Auth.clickResendConfirmationEmailBtn(); Auth.clickResendConfirmationEmailBtn();
          Auth.checkLblAfterResendingEmailConfirmation(lblAfterResendingEmailData);
          Auth.checkResendConfirmationEmailBtnNotExist();
        });

    });

});
