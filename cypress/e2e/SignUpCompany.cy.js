import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
import * as ComplexAPI from "../utils/Helper/pageObject/ComplexAPI";


describe('Auth - Sign Up', () => {


    context('Sign Up.', () => {

      beforeEach(() => {
        ComplexAPI.navigateToPage({navigateTo: `SignUpCompany`});
      });

      const authTypeData = `SignUpCompany`;
     
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
      const alertRequiredFieldData = "Required field";
      const alertPasswordData01 = "At least 8 characters";
      const alertPasswordData02 = "At least one lowercase letter";
      const alertPasswordData03 = "At least one uppercase letter";
      const alertPasswordData04 = "At least one number";
      const errorMsgExistAcc = "User already exists!";

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button
        3. Click "Sign up as a company" button

        Test Steps:
        1. Verify that labels on the Company Sing Up page are shown with correct text
        2. Verify that the email and password placeholders contain the correct text
        3. Verify that "Continue With Google" button is enabled
        4. Verify that "Continue with LinkedIn" button is enabled
        5 Verify that "Sign up as an individual" button is enabled
        6. Verify that "Sign in" button is enabled
        7. Verify that "Next" button is enabled
        */

        it.only('Verify Sign Up page labels and buttons status.', () => {
          Auth.checkLabelsAuthPage(authTypeData);
          Auth.checkPlaceholdersEmailPassword (plhdEmailData, plhdPasswordData);
          Auth.checkContinueWithGoogleBtnEnabled();
          Auth.checkContinueWithLinkedIBtnEnabled();
          Auth.checkIndividualSignUpBtnEnabled();
          Auth.checkSignInOnSignUpPageEnabled();
          Auth.checkSubmitBtnEnabled();
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button
        3. Click "Sign up as a company" button

        Test Steps:
        1. Click "Sign In" button
        2. Verify that the user is navigated to Sign In page:
        2.1. Verify that labels on the Sing In page are shown with correct text
        2.2. Verify that the email and password placeholders contain the correct text
        2.3. Verify that "Sign Up" button to change page is enabled
        2.4. Verify that "Remember Me" checkbox is not selected
        2.5. Verify that "Forgot Password" button is enabled
        2.6. Verify that "Sign In" button is disabled
        2.7. Verify that "Continue With Google" button is enabled
        2.8. Verify that "Continue with LinkedIn" button is enabled
        */

        it.only('Verify Sign In button leads to Sign In page.', () => {
          Auth.clickSignInBtnOnSignUpPage();
          CommonActions.waitForElementIsVisible(Auth.btnSignIn);
          Auth.checkLabelsAuthPage(`SignIn`);
          Auth.checkPlaceholdersEmailPassword (plhdEmailData, plhdPasswordData);
          Auth.checkSignUpBtnEnabled();
          Auth.checkRememberMeChbIsNotSelected();
          Auth.checkForgotPasswordBtnEnabled();
          Auth.checkSignInBtnDisabled();
          Auth.checkContinueWithGoogleBtnEnabled();
          Auth.checkContinueWithLinkedIBtnEnabled();
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button
        3. Click "Sign up as a company" button

        Test Steps:
        1. Click "Sign up as an individual" button
        2. Verify that the user is navigated to Individiaul Sign Up page:
        2.1. Verify that labels on the Individual Sing Up page are shown with correct text
        2.2. Verify that the email and password placeholders contain the correct text
        2.3. Verify that "Continue With Google" button is enabled
        2.4. Verify that "Continue with LinkedIn" button is enabled
        2.5. Verify that "Sign up as an individual" button is enabled
        2.6. Verify that "Sign in" button is enabled
        2.7. Verify that "Next" button is enabled
        */

        it.only('Verify "Sign up as an individual" button leads to Individual Sign Up page.', () => {
          Auth.clickIndividualSignUpBtn();
          cy.wait(3000);
          Auth.checkLabelsAuthPage(`SignUpIndividual`);
          Auth.checkPlaceholdersEmailPassword (plhdEmailData, plhdPasswordData);
          Auth.checkContinueWithGoogleBtnEnabled();
          Auth.checkContinueWithLinkedIBtnEnabled();
          Auth.checkCompanySignUpBtnEnabled();
          Auth.checkSignInOnSignUpPageEnabled();
          Auth.checkSubmitBtnEnabled();
        });

        /* 
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Click "Next" button
        4. Verify that alerts for required fileds are shown
        4. Fill "Email address" field with invalid data 
        5. Fill "Password" field with invalid data (less than 8 characters)
        6. Click "Next" button
        7. Verify that alerts are shown with correct text
        9. Fill "Password" field with invalid data (without lowercase letter)
        10. Verify that alerts are shown with correct text
        11. Verify that "Next" button is enabled
        12. Fill "Password" field with invalid data (without uppercase letter)
        13. Verify that alerts are shown with correct text
        15. Fill "Password" field with invalid data (without number)
        16. Verify that alerts are shown with correct text
        18. Remove data from "Email address" and "Password" fields
        19. Verify that alerts for required fileds are shown
        */
        it('Verify required fields and fields validation.', () => {
          Auth.clickSubmitBtn();
          //Auth.checkAlertForEmailPassword({alertEmailText: alertRequiredFieldData, alertPasswordText: alertRequiredFieldData});
          Auth.fillSignInPage({
            emailText: invalidEmail01,
            passwordText: invalitPassword01
          });
          Auth.clickSubmitBtn();
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData, alertPasswordText: alertPasswordData01});
          Auth.checkSubmitBtnEnabled();
          Auth.fillSignInPage({
            emailText: invalidEmail02,
            passwordText: invalitPassword02
          });
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData, alertPasswordText: alertPasswordData02});
          Auth.fillSignInPage({
            passwordText: invalitPassword03
          });
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData, alertPasswordText: alertPasswordData03});
          Auth.fillSignInPage({
            passwordText: invalitPassword04
          });
          Auth.checkAlertForEmailPassword({alertEmailText: alertEmailData, alertPasswordText: alertPasswordData04});
          Auth.fillSignInPage({
            clearEmail: true,
            clearPassword: true
          });
          //Auth.checkAlertForEmailPassword({alertEmailText: alertRequiredFieldData, alertPasswordText: alertRequiredFieldData});
        });

        /* 
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Fill email with already created account
        4. Fill password
        5. Click "Next" button
        6. Verify that error message is shown with correct text
        */
        it('Verify an error message when sign up with already created account.', () => {
          Auth.fillSignInPage({
            emailText: emailData,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
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

        it.skip('Verify labels and button statuses on Success Sing Up page.', () => {
          const lblEmailTitleData = "You're almost done!";
          const lblEmailDescriprionData = "We've sent an email to the address you gave. Just click the link in the email to confirm and then you can log in.";
          const lblResendTextData = "If you can't find it, you can resend the email.(Or maybe it's you, not us).";
          const lbllResendEmailBtnData = "Resend confirmation email";
          const randomString = Math.random().toString(36).substring(2, 7);
          const randomEmailData =  `anastasia.oliyarnyk+ci${randomString}@scrumlaunch.com`;
          cy.log(`Generated Email: ${randomEmailData}`);
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickSignUpBtn();
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
         it.skip('Verify Back button on Success Sign Up page leads to Sign Up page.', () => {
       
          const randomString = Math.random().toString(36).substring(2, 7);
          const randomEmailData =  `anastasia.oliyarnyk+ci${randomString}@scrumlaunch.com`;
          cy.log(`Generated Email: ${randomEmailData}`);
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickSignUpBtn();
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


          cy.log(`Generated Email: ${randomEmailData}`);
          
          Auth.fillSignInPage({
            emailText: randomEmailData,
            passwordText: passwordData
          });
          Auth.clickSignUpBtn();
          CommonActions.waitForElementIsVisible(Auth.btnGoBack);
          //cy.wait(3000);
          Auth.clickSignUpBtn();
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
       

        it.skip('Verify Resend Confirmation Email.', () => {
          
          const randomString = Math.random().toString(36).substring(2, 7);
          const randomEmailData =  `anastasia.oliyarnyk+ci${randomString}@scrumlaunch.com`;
          const lblAfterResendingEmailData = "Sent";
          cy.log(`Generated Email: ${randomEmailData}`);
          cy.visit('https://stage.owm.ai/auth');
          Auth.clickSignUpBtn();
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
