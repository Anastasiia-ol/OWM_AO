import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
import * as ComplexAPI from "../utils/Helper/pageObject/ComplexAPI";


describe('Auth - Company Sign Up', () => {


    context('Company Sign Up.', () => {

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

        it('Verify Sign Up page labels and buttons status.', () => {
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

        it('Verify "Sign up as an individual" button leads to Individual Sign Up page.', () => {
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
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button
        3. Click "Sign up as a company" button

        Test Steps:
        1. Click "Next" button
        2. Verify that alerts for required fileds are shown
        3. Fill "Email address" field with invalid data 
        4. Fill "Password" field with invalid data (less than 8 characters)
        5. Click "Next" button
        6. Verify that alerts are shown with correct text
        7. Fill "Password" field with invalid data (without lowercase letter)
        8. Verify that alerts are shown with correct text
        9. Verify that "Next" button is enabled
        10. Fill "Password" field with invalid data (without uppercase letter)
        11. Verify that alerts are shown with correct text
        12. Fill "Password" field with invalid data (without number)
        13. Verify that alerts are shown with correct text
        14. Remove data from "Email address" and "Password" fields
        15. Verify that alerts for required fileds are shown
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
        3. Click "Sign up as a company" button

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
        3. Click "Sign up as a company" button

        Test Steps:
        1. Fill email and password with correct data
        2. Click "Next" button
        3. Verify that labels are shown with correct text
        4. Verify that "Company name" and "Company website" field contain correct placeholders
        5. Verify that "I don’t have a company website" checkbox is enabled
        6. Verify that "LLC" button is enabled
        7. Verify that "CCorp" button is enabled
        8. Verify that "Not yet incorporated" button is enabled
        9. Verify that "Not yet incorporated" button is not selected
        10. Verify that "Step back" button is enabled
        11. Verify that "Next" button is enabled
        */

        it('Verify labels and buttons status on "Tell us about your company" page.', () => {
          const randomString = new Date().getTime();
          let emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.checkLabelsTellAboutCompany();
          Auth.checkPlaceholdersTellAboutCompany();
          Auth.checkDontHaveWebsiteEnabled();
          Auth.checkDontHaveWebsiteNotSelected();
          Auth.checkLLCBtnEnabled();
          Auth.checkCCorpBtnEnabled();
          Auth.checkNotYetIncorpBtnEnabled();
          Auth.checkStepBackBtnEnabled();
          Auth.checkSubmitBtnEnabled();
        });

         /* 
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button
        3. Click "Sign up as a company" button

        Test Steps:
        1. Fill email and password with correct data
        2. Click "Next" button
        3. Click "Next" button on "Tell us about your company" page
        4. Verify that alert for required company name is shown
        5. Fill company name
        6. Click "Add New Company" button
        7. Click "Next" button
        8. Verify that alert for required website is shown
        9. Fill "Company website" field with correct value
        10. Click "Next" button
        11. Verify that error message is shown for required entity type
        12. Click "LLC" button
        13. Remove website value
        14. Click "Next" button
        15. Verify that alert for required website is shown
        16. Check "I don’t have a company website" checkbox
        17. Verify that "Company website" is disabled
        18. Click "Next" button
        19. Verify that the user is navigated to "Tell us about yourself" page
        */

        it('Verify required fields on "Tell us about your company" page.', () => {
          const randomString = new Date().getTime();
          let emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          let companyNameData = `Company Test ${randomString}`;
          let websiteData = `www.companytest.com`;
          const alertCompanyNameRequiredData = `Required field`;
          const alertCompanyWebsiteRequiredData = `Please enter website address or press the checkbox`;
          const errorMsgCompanyTypeData = `Please choose company entity type`;

          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.clickSubmitBtn();
          Auth.checkAlertForEmailPassword({
            alertEmailText: alertCompanyNameRequiredData
          });
          Auth.fillCompanyName(companyNameData);
          Auth.clickAddNewCompany();
          Auth.clickSubmitBtn();
          Auth.checkAlertForEmailPassword({
            alertPasswordText: alertCompanyWebsiteRequiredData
          });
          Auth.fillWebsite(websiteData);
          Auth.clickSubmitBtn();
          Auth.checkErrorMsg(errorMsgCompanyTypeData);
          Auth.fillWebsite(websiteData, true);
          Auth.clickSubmitBtn();
          Auth.checkAlertForEmailPassword({
            alertPasswordText: alertCompanyWebsiteRequiredData
          });
          Auth.clickLLCBtn();
          Auth.checkDontHaveWebsiteChbx();
          Auth.checkWebsiteDisabled();
          Auth.clickSubmitBtn();
          Auth.checkErrorMsg(errorMsgCompanyTypeData);
          
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.checkLabelsTellAboutYourself(false);
        });

         /* 
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button
        3. Click "Sign up as a company" button

        Test Steps:
        1. Fill email and password with correct data
        2. Click "Next" button
        3. Click "Next" button on "Tell us about your company" page
        4. Fill company name
        5. Click "Add New Company" button
        6. Check "I don’t have a company website" checkbox
        7. Click "LLC" button
        8. Click "Next" button
        9. Verify that error message is shown for already existing company
        10. Click "OK, Go back" button
        11. Verify that modal window is absent
        12. Verify that the user is on "Tell us about your company" page.
        */

        it('Verify that error message is shown when the user tries to create an already existing company.', () => {
          const randomString = new Date().getTime();
          let emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          let companyNameData = `OWM`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillCompanyName(companyNameData);
          Auth.clickAddNewCompany();
          Auth.checkDontHaveWebsiteChbx();
          Auth.clickLLCBtn();
          Auth.clickSubmitBtn();
          Auth.checkLabelsExistingCompanyWindow(); 
          Auth.clickGoBackBtn();
          Auth.checkWindownIsAbsent();   
          Auth.checkLabelsTellAboutCompany();
        });

        /* 
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button
        3. Click "Sign up as a company" button

        Test Steps:
        1. Fill email and password with correct data
        2. Click "Next" button
        3. Click "Next" button on "Tell us about your company" page
        4. Fill company name
        5. Click "Add New Company" button
        6. Fill website
        7. Click "C-Corp" button
        8. Click "Next" button
        9. Verify that "Tell us about yourself" page is shown with correct labels
        10. Verify that "Step Back" button is enabled
        11. Verify that "Let's Go" button is enabled
        12. Verify that "Founder" button is enabled
        13. Verify that "Executive" button is enabled
        14. Verify that "Other important person" button is enabled
        15. Click "Other important person" button
        16. Verify that "First name", "Last Name", "Phone number" and field for "Other important person" have correct placeholders
        */

        it('Verify labels and buttons status on "Tell us about yourself" page.', () => {
          const randomString = new Date().getTime();
          let emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          let companyNameData = `Company Test ${randomString}`;
          let websiteData = `www.companytest.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillCompanyName(companyNameData);
          Auth.clickAddNewCompany();
          Auth.fillWebsite(websiteData);
          Auth.clickCCorpBtn();
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.checkLabelsTellAboutYourself(false);
          Auth.checkStepBackBtnEnabled();
          Auth.checkSubmitBtnEnabled();
          Auth.checkFounderBtnEnabled();
          Auth.checkExecutiveBtnEnabled();
          Auth.checkAdvisorBtnEnabled();
          Auth.checkOtherBtnEnabled();
          Auth.clickOtherBtn();
          Auth.checkPlaceholdersTellAboutYourself();
        });


        /* 
        Test Description:
        Prerequisite:
        1. Navigate to Auth page
        2. Click "Sign up" button
        3. Click "Sign up as a company" button

        Test Steps:
        1. Fill email and password with correct data
        2. Click "Next" button
        3. Click "Next" button on "Tell us about your company" page
        4. Fill company name
        5. Click "Add New Company" button
        6. Fill website
        7. Click "LLC" button
        8. Click "Next" button
        9. Click "Let's Go" button
        10. Verify that alerts are shown for reqired  First Name and Last Name fields
        11. Fill First Name field with data
        12. Click "Let's Go" button
        13. Verify that alert is shown for reqired Last Name field
        14. Fill Last Name field with correct data
        15. Fill Phone Number with icorrect data
        16. Verify that alert for Phone Number is shown
        17. Remove data from Phone Number field
        18. Click "Let's Go" button
        19. Verify that error message is shown for required personal type
        */

        it('Verify required field on "Tell us about yourself" page.', () => {
          const randomString = new Date().getTime();
          let emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          let companyNameData = `Company Test ${randomString}`;
          let websiteData = `www.companytest.com`;

          const alertEmailRequiredData = `First name is a required field`;
          const alertPasswordRequiredData = `Last name is a required field`;
          const alertPhoneNumberData = `Enter a valid phone number: (xxx) xxx-xxxx`;
          const errorMsgPersonalType = `Please choose person type`;
          let firstNameData = `Wendy`;
          let lastNameData = `Jams`;
          let randomIncorrectPhoneNumberData = Math.random().toString().substring(2, 11); 
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillCompanyName(companyNameData);
          Auth.clickAddNewCompany();
          Auth.fillWebsite(websiteData);
          Auth.clickLLCBtn();
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
        3. Click "Sign up as a company" button

        Test Steps:
        1. Fill email and password with correct data
        2. Click "Next" button
        3. Click "Next" button on "Tell us about your company" page
        4. Fill company name
        5. Click "Add New Company" button
        6. Fill website
        7. Click "Not yet incorporated" button
        8. Click "Next" button
        9. Click "Step Back" button
        10. Verify that  "Not yet incorporated" is selected
        11. Verify that "Company name" field contains correct data
        12. Verify that "Company website" field contains correct data
        13. Click "Step Back" button
        14. Verify that "Company email address" filed contains correct data
        15. Verify that "Password" field contains correct data
        16. Click "Next" button
        17. Select "I don’t have a company website" checkbox
        18. Verify that "Website" field is disabled
        19. Click "Next" button
        20. Click "Step Back" button
        21. Select "I don’t have a company website" checkbox
        22. Verify that "Website" field is disabled
         */

        it('Verify that "Step back" button on Step 3 leads to Step2. Step 2 has correct settings .', () => {
          const randomString = new Date().getTime();
          let emailDataRandom = `ci${randomString}@scrumlaunch.com`;
          let companyNameData = `Company Test ${randomString}`;
          let websiteData = `www.companytest.com`;
          
          Auth.fillSignInPage({
            emailText: emailDataRandom,
            passwordText: passwordData
          });
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.fillCompanyName(companyNameData);
          Auth.clickAddNewCompany();
          Auth.fillWebsite(websiteData);
          Auth.clickNotYetIncorpBtn();
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.clickStepBackBtn();
          cy.wait(3000);
          Auth.checkNotYetIncorpBtnSelected();
          Auth.checkCompayNameValue(companyNameData);
          Auth.checkWebsiteValue(websiteData);
          Auth.clickStepBackBtn();
          cy.wait(3000);
          Auth.checkEmailAddressHasValue(emailDataRandom);
          Auth.checkPasswordHasValue(passwordData);
          Auth.clickSubmitBtn();
          Auth.checkDontHaveWebsiteChbx();
          Auth.checkWebsiteDisabled();
          Auth.clickSubmitBtn();
          cy.wait(3000);
          Auth.clickStepBackBtn();
          Auth.checkWebsiteDisabled();
          Auth.checkDontHaveWebsiteIsChecked();
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
        it.skip('Verify "Sing In" button at the top of Success Sign Up page leads to Sign In page.', () => {
       
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
