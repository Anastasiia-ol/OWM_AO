import * as Auth from "../utils/Helper/pageObject/Auth";
import * as Home from "../utils/Helper/pageObject/Home";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
import * as ComplexAPI from "../utils/Helper/pageObject/ComplexAPI";
const Mailosaur = require('mailosaur')


describe('Individual Sign Up - Mailosaur', () => {
    const apiKey = 'OINAGTYZ2cIw3MQgzBtpTLkry2V4BGg1';
    const mailosaur = new Mailosaur(apiKey);
    const serverId = 'uksj5vnw';
    const serverDomain = '@uksj5vnw.mailosaur.net';

    context('Verify successful Advisor registration.', () => {
      
        let emailAddress;
        const randomString = Math.random().toString(36).substring(2,15);
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Wendy`;
        let lastNameData = `Jams`;
        let randomPhoneNumberData = Math.random().toString().substring(2, 12);
        let companyNameData = `Company Test ${randomString}`;
        let websiteData = `www.companytest${randomString}.com`; 
        /* 
        Test Steps:
        1. Navigate to Company Sign Up page
        2. Fill email and password fields with correct data
        3. Click "Next" button
        4. Fill "Company Name" field
        5. Click "Add New Company" button
        6. Fill "Company Website" field
        7. Click "LLC" button
        8. Click "Next" button
        9. Fill "First Name", "Last Name" and "Phone number" fields with correct data
        10. Click "Advisor" button
        11. Click "Let's Go" button
        12. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        13. Verify that page is shown with correct labels
        14. Verify that "Resend Confirmation Email" button is enabled   
        */

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page', () => {
            ComplexAPI.navigateToPage({navigateTo: `SignUpCompany`});
            ComplexAPI.deleteToken();

            Auth.fillSignInPage({
                emailText: emailAddress,
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
            Auth.fillAboutYourselfPage({
                firstNameText: firstNameData,
                lastNameText: lastNameData,
                phoneNumberText: randomPhoneNumberData
            });
            Auth.clickAdvisorBtn();
            Auth.clickSubmitBtn();
            Auth.checkLblSuccessSingUp();
            Auth.checkResendConfirmationEmailBtnIsEnabled();     
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject, sender, email text are correct
        */

        it('Verify email confirmation letter.', () => {  
            
            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
            .then((email)=>{
               expect(email.subject).to.equal('👋 Welcome to OWM!');
               expect(email.from[0].email).to.equal('hello@owm.ai'); 
               expect(email.from[0].name).to.equal('OWM'); 
               
               const body = email.html.body;
               cy.document().then((doc) => {
                doc.write(body);
                doc.close();
                Auth.checkEmailCofirmation();
               })
            })            
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject is correct
        3. Navigate to "Confirm email" link
        4. Verify that the email is cofirmed successfully
        */

        it('Verify that the user is logged in after visiting confirmation link.', () => {  
            ComplexAPI.navigateToPage({navigateTo: `SignIn`});
            Auth.fillSignInPage({
              emailText: emailAddress,
              passwordText: passwordData
            });
            Auth.clickSignInBtn();

            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
             .then((email)=>{
                expect(email.subject).to.equal('👋 Welcome to OWM!');
                 let confirmSignupLink = email.html.links[0].href;
                 cy.log(`confirmSignupLink: ${confirmSignupLink}`);
                 cy.visit(confirmSignupLink);
                 //Auth.checkErrorMsg('Email confirmed successfully');
                  CommonActions.waitForElementIsVisible(Home.btnHome);
                  cy.wait(3000);
                  Home.checkWelcomeText(companyNameData);
             })             
         })

    })

    context('Verify successful Founder registration.', () => {
      
        let emailAddress;
        const randomString = new Date().getTime();
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        let companyNameData = `Company Test ${randomString}`;
        let websiteData = `www.companytest${randomString}.com`;
        let randomPhoneNumberData = Math.random().toString().substring(2, 12);
        /*
        Test Steps:
        1. Navigate to Company Sign Up page
        2. Fill email and password fields with correct data
        3. Click "Next" button
        4. Fill "Company Name" field
        5. Click "Add New Company" button
        6. Fill "Company Website" field
        7. Fill "Company Website" field
        8. Click "C Corp" button
        9. Click "Next" button
        10. Fill "First Name", "Last Name" and "Phone number" fields with correct data
        11. Click "Founder" button
        12. Click "Let's Go" button
        13. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        14. Verify that page is shown with correct labels
        15. Verify that "Resend Confirmation Email" button is enabled 
        */

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page ', () => {
            ComplexAPI.navigateToPage({navigateTo: `SignUpCompany`});
            ComplexAPI.deleteToken();

            Auth.fillSignInPage({
                emailText: emailAddress,
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
            Auth.fillAboutYourselfPage({
                firstNameText: firstNameData,
                lastNameText: lastNameData,
                phoneNumberText: randomPhoneNumberData
            });
            Auth.clickFounderBtn();
            Auth.clickSubmitBtn();
            Auth.checkLblSuccessSingUp();
            Auth.checkResendConfirmationEmailBtnIsEnabled();      
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject, sender, email text are correct
        */

        it('Verify email confirmation letter.', () => {  
            
            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
            .then((email)=>{
               expect(email.subject).to.equal('👋 Welcome to OWM!');
               expect(email.from[0].email).to.equal('hello@owm.ai'); 
               expect(email.from[0].name).to.equal('OWM'); 
               
               const body = email.html.body;
               cy.document().then((doc) => {
                doc.write(body);
                doc.close();
                Auth.checkEmailCofirmation();
               })
            })            
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject is correct
        3. Navigate to "Confirm email" link
        4. Verify that the email is cofirmed successfully
        */

        it('Verify that the user is logged in after visiting confirmation link.', () => {  
            ComplexAPI.navigateToPage({navigateTo: `SignIn`});
            Auth.fillSignInPage({
              emailText: emailAddress,
              passwordText: passwordData
            });
            Auth.clickSignInBtn();

            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
             .then((email)=>{
                expect(email.subject).to.equal('👋 Welcome to OWM!');
                 let confirmSignupLink = email.html.links[0].href;
                 cy.log(`confirmSignupLink: ${confirmSignupLink}`);
                 cy.visit(confirmSignupLink);
                 //Auth.checkErrorMsg('Email confirmed successfully');
                 CommonActions.waitForElementIsVisible(Home.btnHome);
                 cy.wait(3000);
                 Home.checkWelcomeText(companyNameData);
             })             
         })

    })

    context('Verify successful Executive registration.', () => {
      
        let emailAddress;
        const randomString = Math.random().toString(36).substring(2,15);
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        let companyNameData = `Company Test ${randomString}`;
        
        /* 
        Test Steps:
        1. Navigate to Company Sign Up page
        2. Fill email and password fields with correct data
        3. Click "Next" button
        4. Fill "Company Name" field
        5. Select "I don’t have a company website" checkbox
        6. Click "Not yet incorporated" button
        7. Click "Next" button
        8. Fill "First Name" and "Last Name" fields with correct data
        9. Click "Executive" button
        10. Click "Let's Go" button
        11. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        12. Verify that page is shown with correct labels
        13. Verify that "Resend Confirmation Email" button is enabled 
        */

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page', () => {
            ComplexAPI.navigateToPage({navigateTo: `SignUpCompany`});
            ComplexAPI.deleteToken();

            Auth.fillSignInPage({
                emailText: emailAddress,
                passwordText: passwordData
            });
            Auth.clickSubmitBtn();
            cy.wait(3000);
            Auth.fillCompanyName(companyNameData);
            Auth.clickAddNewCompany();
            Auth.clickDontHaveWebsite();
            Auth.clickNotYetIncorpBtn();
            Auth.clickSubmitBtn();
            cy.wait(3000);
            Auth.fillAboutYourselfPage({
                firstNameText: firstNameData,
                lastNameText: lastNameData
            });
            Auth.clickExecutiveBtn();
            Auth.clickSubmitBtn();
            Auth.checkLblSuccessSingUp();
            Auth.checkResendConfirmationEmailBtnIsEnabled();  

        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject, sender, email text are correct
        */

        it('Verify email confirmation letter.', () => {  
            
            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
            .then((email)=>{
               expect(email.subject).to.equal('👋 Welcome to OWM!');
               expect(email.from[0].email).to.equal('hello@owm.ai'); 
               expect(email.from[0].name).to.equal('OWM'); 
               
               const body = email.html.body;
               cy.document().then((doc) => {
                doc.write(body);
                doc.close();
                Auth.checkEmailCofirmation();
               })
            })            
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject is correct
        3. Navigate to "Confirm email" link
        4. Verify that the email is cofirmed successfully
        */

        it('Verify that the user is logged in after visiting confirmation link.', () => {  
            ComplexAPI.navigateToPage({navigateTo: `SignIn`});
            Auth.fillSignInPage({
              emailText: emailAddress,
              passwordText: passwordData
            });
            Auth.clickSignInBtn();

            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
             .then((email)=>{
                expect(email.subject).to.equal('👋 Welcome to OWM!');
                 let confirmSignupLink = email.html.links[0].href;
                 cy.log(`confirmSignupLink: ${confirmSignupLink}`);
                 cy.visit(confirmSignupLink);
                 //Auth.checkErrorMsg('Email confirmed successfully');
                 CommonActions.waitForElementIsVisible(Home.btnHome);
                  cy.wait(3000);
                  Home.checkWelcomeText(companyNameData);
             })             
         })
    })

    context('Verify successful Other important person registration.', () => {
      
        let emailAddress;
        const randomString = Math.random().toString(36).substring(2,15);
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        let companyNameData = `Company Test ${randomString}`;
        let websiteData = `www.companytest${randomString}.com`;
        
        /* 
        Test Steps:
        1. Navigate to Company Sign Up page
        2. Fill email and password fields with correct data
        3. Click "Next" button
        4. Fill "Company Name" field
        5. Click "Add New Company" button
        6. Fill "Company Website" field
        7. Select "I don’t have a company website" checkbox
        8. Click "LLC" button
        9. Click "Next" button
        10. Fill "First Name" and "Last Name" fields with correct data
        11. Click "Other important person" button
        12. Click "Let's Go" button
        13. Verify that alert is shown for required "Other important person" field
        14. Fill "Other important person" field
        15. Click "Let's Go" button
        16. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        17. Verify that page is shown with correct labels
        18. Verify that "Resend Confirmation Email" button is enabled 
        */

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page', () => {
            let personTypeData = `CEO`;
            const alertRequiredOtherData = `Required field`;

            ComplexAPI.navigateToPage({navigateTo: `SignUpCompany`});
            ComplexAPI.deleteToken();

            Auth.fillSignInPage({
                emailText: emailAddress,
                passwordText: passwordData
            });
            Auth.clickSubmitBtn();
            cy.wait(3000);
            Auth.fillCompanyName(companyNameData);
            Auth.clickAddNewCompany();
            Auth.fillWebsite(websiteData);
            Auth.clickDontHaveWebsite();
            Auth.clickLLCBtn();
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
            });
            Auth.fillAboutYourselfPage({
                otherText: personTypeData
            });
            Auth.clickSubmitBtn();
            Auth.checkLblSuccessSingUp();
            Auth.checkResendConfirmationEmailBtnIsEnabled();  
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject, sender, email text are correct
        */

        it('Verify email confirmation letter.', () => {  
            
            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
            .then((email)=>{
               expect(email.subject).to.equal('👋 Welcome to OWM!');
               expect(email.from[0].email).to.equal('hello@owm.ai'); 
               expect(email.from[0].name).to.equal('OWM'); 
               
               const body = email.html.body;
               cy.document().then((doc) => {
                doc.write(body);
                doc.close();
                Auth.checkEmailCofirmation();
               })
            })            
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject is correct
        3. Navigate to "Confirm email" link
        4. Verify that the email is cofirmed successfully
        */

        it('Verify that the user is logged in after visiting confirmation link.', () => {  
            ComplexAPI.navigateToPage({navigateTo: `SignIn`});
            Auth.fillSignInPage({
              emailText: emailAddress,
              passwordText: passwordData
            });
            Auth.clickSignInBtn();

            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
             .then((email)=>{
                expect(email.subject).to.equal('👋 Welcome to OWM!');
                 let confirmSignupLink = email.html.links[0].href;
                 cy.log(`confirmSignupLink: ${confirmSignupLink}`);
                 cy.visit(confirmSignupLink);
                 //Auth.checkErrorMsg('Email confirmed successfully');
                 CommonActions.waitForElementIsVisible(Home.btnHome);
                 cy.wait(3000);
                 Home.checkWelcomeText(companyNameData);
             })             
         })
    })

    context('Verify resend confirmation email. Successful investor registration', () => {
      
        let emailAddress;
        const randomString = new Date().getTime();
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        let companyNameData = `Company Test ${randomString}`;
        /* 
        Test Steps:
        1. Navigate to Company Sign Up page
        2. Fill email and password fields with correct data
        3. Click "Next" button
        4. Select "I don’t have a company website" checkbox
        5. Click "Not yet incorporated" button
        6. Click "Next" button
        7. Fill "First Name" and "Last Name" fields with correct data
        8. Click "Executive" button
        9. Click "Let's Go" button
        10. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        11. Verify that page is shown with correct labels
        12. Verify that "Resend Confirmation Email" button is enabled 
        13. Click "Resend Confirmation Email" button
        14. Verify that page is shown with correct labels
        15. Verify that "Resend Confirmation Email" button is not shown 
        */

        it('Fill Sign Up page and click Resend confirmation link.', () => {
            ComplexAPI.navigateToPage({navigateTo: `SignUpCompany`});
            ComplexAPI.deleteToken();

            Auth.fillSignInPage({
                emailText: emailAddress,
                passwordText: passwordData
            });
            Auth.clickSubmitBtn();
            cy.wait(3000);
            Auth.fillCompanyName(companyNameData);
            Auth.clickAddNewCompany();
            Auth.clickDontHaveWebsite();
            Auth.clickCCorpBtn();
            Auth.clickSubmitBtn();
            cy.wait(3000);
            Auth.fillAboutYourselfPage({
                firstNameText: firstNameData,
                lastNameText: lastNameData
            });
            Auth.clickFounderBtn();
            Auth.clickSubmitBtn();
            Auth.checkLblSuccessSingUp();
            Auth.checkResendConfirmationEmailBtnIsEnabled(); 
            Auth.clickResendConfirmationEmail()
            Auth.checkLblSuccessSingUp(true);
            Auth.checkResendConfirmationEmailBtnNotExist();  
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject, sender, email text are correct
        */

        it('Verify email confirmation letter.', () => {  
            
            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
            .then((email)=>{
               expect(email.subject).to.equal('👋 Welcome to OWM!');
               expect(email.from[0].email).to.equal('hello@owm.ai'); 
               expect(email.from[0].name).to.equal('OWM'); 
               
               const body = email.html.body;
               cy.document().then((doc) => {
                doc.write(body);
                doc.close();
                Auth.checkEmailCofirmation();
               })
            })            
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject is correct
        3. Navigate to "Confirm email" link
        4. Verify that the email is cofirmed successfully
        */

        it('Verify that the user is logged in after visiting confirmation link.', () => {  
            ComplexAPI.navigateToPage({navigateTo: `SignIn`});
            Auth.fillSignInPage({
              emailText: emailAddress,
              passwordText: passwordData
            });
            Auth.clickSignInBtn();

            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
             .then((email)=>{
                expect(email.subject).to.equal('👋 Welcome to OWM!');
                 let confirmSignupLink = email.html.links[0].href;
                 cy.log(`confirmSignupLink: ${confirmSignupLink}`);
                 cy.visit(confirmSignupLink);
                 //Auth.checkErrorMsg('Email confirmed successfully');
                 CommonActions.waitForElementIsVisible(Home.btnHome);
                 cy.wait(3000);
                 Home.checkWelcomeText(companyNameData);
             })             
         })

    })
})