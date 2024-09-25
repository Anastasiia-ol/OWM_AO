import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
import * as ComplexAPI from "../utils/Helper/pageObject/ComplexAPI";


describe('Auth - Individual Sign Up', () => {


    context('Individual Sign Up.', () => {

      beforeEach(() => {
        ComplexAPI.navigateToPage({navigateTo: `SignUpIndividual`});
      });

      const authTypeData = `SignUpIndividual`;
     
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

        Test Steps:
        1. Verify that labels on the Individual Sing Up page are shown with correct text
        2. Verify that the email and password placeholders contain the correct text
        3. Verify that "Continue With Google" button is enabled
        4. Verify that "Continue with LinkedIn" button is enabled
        5. Verify that "Sign up as an individual" button is enabled
        6. Verify that "Sign in" button is enabled
        7. Verify that "Next" button is enabled
        */

        it('Verify Sign Up page labels and buttons status.', () => {
          Auth.checkLabelsAuthPage(authTypeData);
          Auth.checkPlaceholdersEmailPassword (plhdEmailData, plhdPasswordData);
          Auth.checkContinueWithGoogleBtnEnabled();
          Auth.checkContinueWithLinkedIBtnEnabled();
          Auth.checkCompanySignUpBtnEnabled();
          Auth.checkSignInOnSignUpPageEnabled();
          Auth.checkSubmitBtnEnabled();
        });

        /* 
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Click "Next" button
        2. Verify that alerts for required fileds are shown
        3. Fill "Email address" field with invalid data 
        4. Fill "Password" field with invalid data (less than 8 characters)
        5. Click "Next" button
        7. Verify that alerts are shown with correct text
        8. Fill "Password" field with invalid data (without lowercase letter)
        9. Verify that alerts are shown with correct text
        10. Verify that "Next" button is enabled
        11. Fill "Password" field with invalid data (without uppercase letter)
        12. Verify that alerts are shown with correct text
        13. Fill "Password" field with invalid data (without number)
        14. Verify that alerts are shown with correct text
        15. Remove data from "Email address" and "Password" fields
        16. Verify that alerts for required fileds are shown
        */
        it('Verify required fields and fields validation.', () => {
          Auth.clickSubmitBtn();
          Auth.checkAlertForEmailPassword({alertEmailText: alertRequiredFieldData, alertPasswordText: alertRequiredFieldData});
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
          Auth.checkAlertForEmailPassword({alertEmailText: alertRequiredFieldData, alertPasswordText: alertRequiredFieldData});
        });

        /* 
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill email with already created account
        2. Fill password
        3. Click "Next" button
        4. Verify that error message is shown with correct text
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
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Click "Sig up as a company" button
        2. Verify that the user is navigated to Company Sign Up page:
        2.1. Verify that labels on the Company Sing Up page are shown with correct text
        2.2. Verify that the email and password placeholders contain the correct text
        2.3. Verify that "Continue With Google" button is enabled
        2.4. Verify that "Continue with LinkedIn" button is enabled
        2.5. Verify that "Sign up as an individual" button is enabled
        2.6. Verify that "Sign in" button is enabled
        2.7. Verify that "Next" button is enabled
        */

        it('Verify that "Sign up as a company" button leads to Company Sign Up page.', () => {
          Auth.clickCompanySignUpBtn();
          cy.wait(3000);
          Auth.checkLabelsAuthPage(`SignUpCompany`);
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

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Veriry that "Tell us about yourself" page is shown with correct labels
        4. Click "Step Back" button
        5. Verify that Email address is pre filled 
        */
         it('Verify Back button on Success Sign Up page leads to Sign Up page.', () => {
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.clickSubmitBtn(); 
          cy.wait(3000);
          Auth.clickStepBackBtn();
          cy.wait(3000);
          Auth.checkEmailAddressHasValue(emailDataRandom);
          Auth.checkPasswordHasValue(passwordData);
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

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

        it('Verify Sign In button leads to Sign In page.', () => {
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

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Veriry that "Tell us about yourself" page is shown with correct labels
        4. Verify that "Step Back" button is enabled
        5. Verify that "Let's Go" button is enabled
        6. Verify that "Investor" button is enabled
        7. Verify that "Advisor" button is enabled
        8. Verify that "Talent" button is enabled
        9. Verify that "Vendor" button is enabled
        10. Verify that "Other important person" button is enabled
        11. Click "Other important person" button
        12. Verify that "First name", "Last Name", "Phone number" and field for "Other important person" have correct placeholders
        */
        it('Verify labels and buttons status on "Tell us about yourself" page.', () => {
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.checkLabelsTellAboutYourself();
          Auth.checkStepBackBtnEnabled();
          Auth.checkInvestorBtnEnabled();
          Auth.checkAdvisorBtnEnabled();
          Auth.checkTalentBtnEnabled();
          Auth.checkVendorBtnEnabled();
          Auth.checkOtherBtnEnabled();
          Auth.clickOtherBtn();
          Auth.checkPlaceholdersTellAboutYourself();
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Click "Let's Go" button
        4. Verify that alerts are shown for reqired  First Name and Last Name fields
        5. Fill First Name field with data
        6. Click "Let's Go" button
        7. Verify that alert is shown for reqired Last Name field
        8. Fill Last Name field with correct data
        9. Fill Phone Number with icorrect data
        10. Verify that alert for Phone Number is shown
        11. Remove data from Phone Number field
        12. Click "Let's Go" button
        13. Verify that error message is shown for required personal type
        */

        it('Verify required field on "Tell us about yourself" page.', () => {

          const alertEmailRequiredData = `First name is a required field`;
          const alertPasswordRequiredData = `Last name is a required field`;
          const alertPhoneNumberData = `Enter a valid phone number: (xxx) xxx-xxxx`;
          const errorMsgPersonalType = `Please choose person type`;
          let firstNameData = `Leslie`;
          let lastNameData = `Jennings`;
          let randomIncorrectPhoneNumberData = Math.random().toString().substring(2, 11);
          cy.log(`Generated Phon Number: ${randomIncorrectPhoneNumberData}`);
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;

          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.clickSubmitBtn();
          Auth.checkAlertForEmailPassword({
            alertEmailText: alertEmailRequiredData,
            alertPasswordText: alertPasswordRequiredData
          });
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData
          });
          Auth.clickSubmitBtn();
          Auth.checkAlertForEmailPassword({
            alertPasswordText: alertPasswordRequiredData
          });
          Auth.fillAboutYourselfPage({
            lastNameText: lastNameData
          });
          Auth.fillAboutYourselfPage({
            phoneNumberText: randomIncorrectPhoneNumberData
          });
          Auth.checkAlertForEmailPassword({
            alertPhoneNumberText: alertPhoneNumberData
          });
          Auth.fillAboutYourselfPage({
            clearPhoneNumber: true
          });
          Auth.clickSubmitBtn();
          Auth.checkErrorMsg(errorMsgPersonalType);
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Investor" button
        6. Click "Let's Go" button
        7. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        8. Verify that page is shown with correct labels
        9. Verify that "Resend Confirmation Email" button is enabled  
        */

        it('Verify successful investor registration.', () => {
          let firstNameData = `Leslie`;
          let lastNameData = `Jennings`;
         
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.clickSubmitBtn(); 
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData, 
            lastNameText: lastNameData
          });
          Auth.clickInvestorBtn();
          Auth.clickSubmitBtn();
          CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
          Auth.checkLblSuccessSingUp();
          Auth.checkResendConfirmationEmailBtnIsEnabled();
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Advisor" button
        6. Click "Let's Go" button
        7. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        8. Verify that page is shown with correct labels
        9. Verify that "Resend Confirmation Email" button is enabled  
        */

        it('Verify successful Advisor registration.', () => {
          let firstNameData = `Leslie`;
          let lastNameData = `Jennings`;
         
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000); 
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData, 
            lastNameText: lastNameData
          });
          Auth.clickAdvisorBtn();
          Auth.clickSubmitBtn();
          CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
          Auth.checkLblSuccessSingUp();
          Auth.checkResendConfirmationEmailBtnIsEnabled();
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Talent" button
        6. Click "Let's Go" button
        7. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        8. Verify that page is shown with correct labels
        9. Verify that "Resend Confirmation Email" button is enabled  
        */

        it('Verify successful Talent registration.', () => {
          let firstNameData = `Leslie`;
          let lastNameData = `Jennings`;
         
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData, 
            lastNameText: lastNameData
          });
          Auth.clickTalentBtn();
          Auth.clickSubmitBtn();
          CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
          Auth.checkLblSuccessSingUp();
          Auth.checkResendConfirmationEmailBtnIsEnabled();
        });

         /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Step Back" button
        5. Change password value
        6. Click "Next" button
        7. Fill First Name and Last Name fields with data
        8. Click "Talent" button
        9. Click "Let's Go" button
        10. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        11. Verify that page is shown with correct labels
        12. Verify that "Resend Confirmation Email" button is enabled  
        */

        it('Verify successful registration after changing password.', () => {
          let firstNameData = `Leslie`;
          let lastNameData = `Jennings`;
         
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          let newPasswordData = `21250178OwNew`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData, 
            lastNameText: lastNameData
          });
          Auth.clickStepBackBtn();
          cy.wait(3000);
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: newPasswordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData, 
            lastNameText: lastNameData
          });
          Auth.clickTalentBtn();
          Auth.clickSubmitBtn();
          CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
          Auth.checkLblSuccessSingUp();
          Auth.checkResendConfirmationEmailBtnIsEnabled();
        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Vendor" button
        6. Click "Let's Go" button
        7. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        8. Verify that page is shown with correct labels
        9. Verify that "Resend Confirmation Email" button is enabled  
        */

        it('Verify successful Vendor registration.', () => {
          let firstNameData = `Leslie`;
          let lastNameData = `Jennings`;
         
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData, 
            lastNameText: lastNameData
          });
          Auth.clickVendorBtn();
          Auth.clickSubmitBtn();
          CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
          Auth.checkLblSuccessSingUp();
          Auth.checkResendConfirmationEmailBtnIsEnabled();
        });

         /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Other important person" button
        6. Click "Let's Go" button
        7. Verify that alert is required for other person type
        8. Fill other person type
        9. Click "Let's Go" button
        10. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        11. Verify that page is shown with correct labels
        12. Verify that "Resend Confirmation Email" button is enabled  
        */

        it('Verify successful other important person registration.', () => {
          let firstNameData = `Leslie`;
          let lastNameData = `Jennings`;
          let personTypeData = `CEO`;
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          const alertRequiredOtherData = `This field is required`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData, 
            lastNameText: lastNameData
          });
          Auth.clickOtherBtn();
          Auth.clickSubmitBtn();
          Auth.checkAlertForEmailPassword({
            alertOtherImportantPersonText: alertRequiredOtherData
          })
          Auth.fillAboutYourselfPage({
            otherText: personTypeData
          })
          Auth.clickSubmitBtn();
          CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
          Auth.checkLblSuccessSingUp();
          Auth.checkResendConfirmationEmailBtnIsEnabled();

        });

        /*
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button

        Test Steps:
        1. Fill emaila and  password  fields with correct data
        2. Click "Next" button
        3. Fill First Name, Last Name and Phone Number fields with data
        4. Click "Investor" button
        6. Click "Let's Go" button
        7. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        11. Click "Resend Confirmation Email" button
        12. Verfy that label is changed
        13. Verify that "Resend Confirmation Email" button is not exist 
        */
        it('Verify Resend Confirmation Email.', () => {
          
          let firstNameData = `Leslie`;
          let lastNameData = `Jennings`;
         
          let emailDataRandom;
          let passwordData = `21250178OwM`;
          const randomString = new Date().getTime();
          emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          let randomIncorrectPhoneNumberData = Math.random().toString().substring(2, 12);
          cy.log(`Generated Phon Number: ${randomIncorrectPhoneNumberData}`);
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.clickSubmitBtn(); 
          Auth.fillAboutYourselfPage({
            firstNameText: firstNameData, 
            lastNameText: lastNameData,
            phoneNumberText: randomIncorrectPhoneNumberData
          });
          Auth.clickInvestorBtn();
          Auth.clickSubmitBtn();
          CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
          Auth.checkLblSuccessSingUp();
          Auth.clickResendConfirmationEmailAfterSignUpBtn()
          Auth.checkLblSuccessSingUp(true);
          Auth.checkResendConfirmationEmailBtnNotExist();
        });
        

    });

});
