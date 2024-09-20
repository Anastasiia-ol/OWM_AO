import * as Auth from "../utils/Helper/pageObject/Auth";
import * as Home from "../utils/Helper/pageObject/Home";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
import * as ComplexAPI from "../utils/Helper/pageObject/ComplexAPI";

describe('Auth - Sign In', () => {

    context('Sign In.', () => {

      beforeEach(() => {
        ComplexAPI.navigateToPage({navigateTo: `SignIn`});
      });
      
      const authTypeData = `SignIn`;
      const plhdEmailData = `Enter your email here`;
      const plhdPasswordData = `At least 8 characters`;
      const errorMsgEmailPasswordData = `Email or password is invalid!`
      //const errorMsgEmailData = `Email is invalid!`;
      //const errorPasswordEmailData = `Password is invalid`;
      let emailData = `anastasia.oliyarnyk+ci01@scrumlaunch.com`; //registered user
      let passwordData = `21250178OwM`;
      let nonExistentEmailData = `incorrect@scrumlaunch.com`;
      const incorrectPasswordData = `Password is invalid`;
      const alertEmailData = `Incorrect format`;
      const alertPasswordData = `This field is required`;
      let emailUnconfirmedData = `anastasia.oliyarnyk+ciwhcf@scrumlaunch.com`;
      const errorMsgEmailConfirmationData = `Email comfirmation required!`;

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
    
        Test Steps:
        1. Verify that labels on the Sing In page are shown with correct text
        2. Verify that the email and password placeholders contain the correct text
        3. Verify that "Sign Up" button to change page is enabled
        4. Verify that "Remember Me" checkbox is not selected
        5. Verify that "Forgot Password" button is enabled
        6. Verify that "Sign In" button is disabled
        7. Verify that "Continue With Google" button is enabled
        8. Verify that "Continue with LinkedIn" button is enabled
  
        */
        it('Verify Sign In page labels and buttons status.', () => {
          Auth.checkLabelsAuthPage(authTypeData);
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
    
        Test Steps:
        1. Fill "Email address" with non-existent email
        2. Fill "Password" fields
        3. Verify that "Sign In" button is enabled
        4. Click "Sign In" button
        5. Verify that error message is shown with correct text
        6. Verify that Sign In page is opened
        */

        it('Verify an error message when sign in with non-existent email.', () => {
          Auth.fillSignInPage({
            emailText: nonExistentEmailData,
            passwordText: passwordData
          });
          Auth.checkSignInBtnEnabled();
          Auth.clickSignInBtn();
          Auth.checkErrorMsg(errorMsgEmailPasswordData);
          Auth.checkLabelsAuthPage(authTypeData);
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
    
        Test Steps:
        1. Fill "Email address"field with correct data
        2. Fill "Password" field with icorrect data
        3. Verify that "Sign In" button is enabled
        4. Click "Sign In" button
        5. Verify that error message is shown with correct text
        6. Verify that Sign In page is opened
        */

        it('Verify an error message when sign in with incorrect password.', () => {
          
          Auth.fillSignInPage({
            emailText: emailData,
            passwordText: incorrectPasswordData
          });
          Auth.checkSignInBtnEnabled();
          Auth.clickSignInBtn();
          Auth.checkErrorMsg(errorMsgEmailPasswordData);
          Auth.checkLabelsAuthPage(authTypeData);
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
    
        Test Steps:
        1. Fill "Email address" and "Password" fields with invalid data
        2. Verify that "Sign In" button is enabled
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
        Test Description:
        Prerequisite:
        1. Navigate to Auth page

        Test Steps:
        1. Fill "Email address" and "Password" fields with correct data
        2. Click "Sign In" button
        3. Verify that Welcome text is shown
        */
        it('Verify successful login.', () => {
          cy.visit('https://stage.owm.ai/auth');
          
          Auth.fillSignInPage({
            emailText: emailData,
            passwordText: passwordData
          });
          Auth.clickSignInBtn();
          CommonActions.waitForElementIsVisible(Home.btnGetStarted);
          Home.checkWelcomeText();

        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
    
        Test Steps:
        1. Fill "Email address" field with uncofirmed email 
        2. Fill "Password" field with correct data
        3. Click "Sign In" button
        4. Verify that the user is navigate to "You're almost done!" page when sign in with uncofirmed email 
        */

        it('Verify the user is navigate to Almost done! page  when sign in with uncofirmed email.', () => {
          cy.visit('https://stage.owm.ai/auth');
          
          Auth.fillSignInPage({
            emailText: emailUnconfirmedData,
            passwordText: passwordData
          });
          Auth.clickSignInBtn();
          Auth.checkLblSingUpAlmostDone();
        });
    });

});
