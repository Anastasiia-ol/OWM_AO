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
        //const randomString = new Date().getTime();
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        /* 
        Test Steps:
        1. Navigate to Individual Sign Up page
        2. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Advisor" button
        6. Click "Let's Go" button
        7. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        8. Verify that page is shown with correct labels
        9. Verify that "Resend Confirmation Email" button is enabled   
        */

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page', () => {
            ComplexAPI.navigateToPage({navigateTo: `SignUpIndividual`});
            ComplexAPI.deleteToken();
           
            Auth.fillSignInPage({
                emailText: emailAddress,
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
                  CommonActions.waitForElementIsVisible(Home.btnGetStarted);
                  cy.wait(3000);
                  Home.checkWelcomeText(firstNameData);
             })             
         })

    })

    context('Verify successful Investor registration.', () => {
        let emailAddress;
        const randomString = new Date().getTime();
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        /* 
        Test Steps:
        1. Navigate to Individual Sign Up page
        2. Fill email and password fields with correct data
        3. Click "Next" button
        4. Fill First Name and Last Name fields with data
        5. Click "Investor" button
        7. Click "Let's Go" button
        8. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        9. Verify that page is shown with correct labels
        10. Verify that "Resend Confirmation Email" button is enabled  
        */

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page', () => {

            ComplexAPI.navigateToPage({navigateTo: `SignUpIndividual`});
            ComplexAPI.deleteToken();
            Auth.fillSignInPage({
                emailText: emailAddress,
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
                  CommonActions.waitForElementIsVisible(Home.btnGetStarted);
                  cy.wait(3000);
                  Home.checkWelcomeText(firstNameData);
             })             
         })

    })

    context('Verify successful Talent registration.', () => {
      
        let emailAddress;
        const randomString = Math.random().toString(36).substring(2,15);
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        /* 
        Test Steps:
        1. Navigate to Individual Sign Up page
        2. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Talent" button
        6. Click "Let's Go" button
        7. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        8. Verify that page is shown with correct labels
        9. Verify that "Resend Confirmation Email" button is enabled
        */

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page', () => {

            ComplexAPI.navigateToPage({navigateTo: `SignUpIndividual`});
            ComplexAPI.deleteToken();
            let firstNameData = `Leslie`;
            let lastNameData = `Jennings`;
            
            Auth.fillSignInPage({
                emailText: emailAddress,
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
                  CommonActions.waitForElementIsVisible(Home.btnGetStarted);
                  cy.wait(3000);
                  Home.checkWelcomeText(firstNameData);
             })             
         })
    })

    context('Verify successful Vendor registration.', () => {
      
        let emailAddress;
        const randomString = new Date().getTime();
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        /* 
        Test Steps:
        1. Navigate to Individual Sign Up page
        2. Fill email and password fields with correct data
        2. Click "Next" button
        3. Fill First Name and Last Name fields with data
        4. Click "Vendor" button
        6. Click "Let's Go" button
        7. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        8. Verify that page is shown with correct labels
        9. Verify that "Resend Confirmation Email" button is enabled
        */

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page', () => {

            ComplexAPI.navigateToPage({navigateTo: `SignUpIndividual`});
            ComplexAPI.deleteToken();
            let firstNameData = `Leslie`;
            let lastNameData = `Jennings`;
            
            Auth.fillSignInPage({
                emailText: emailAddress,
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
                  CommonActions.waitForElementIsVisible(Home.btnGetStarted);
                  cy.wait(3000);
                  Home.checkWelcomeText(firstNameData);
             })             
         })
    })

    context('Verify successful other important person registration.', () => {
      
        let emailAddress;
        const randomString = Math.random().toString(36).substring(2,15);
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        let firstNameData = `Leslie`;
        let lastNameData = `Jennings`;
        
        /* 
        Test Steps:
        1. Navigate to Individual Sign Up page
        2. Fill email and password fields with correct data
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

        it('Fill Sign Up pages. Verify that the user is navigated to "Please verify your email" page', () => {

            ComplexAPI.navigateToPage({navigateTo: `SignUpIndividual`});
            ComplexAPI.deleteToken();
        
            let personTypeData = `CEO`;
            const alertRequiredOtherData = `This field is required`;
          
            Auth.fillSignInPage({
                emailText: emailAddress,
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
            });
            Auth.fillAboutYourselfPage({
                otherText: personTypeData
            });
            Auth.clickSubmitBtn();
            CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
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
                  CommonActions.waitForElementIsVisible(Home.btnGetStarted);
                  cy.wait(3000);
                  Home.checkWelcomeText(firstNameData);
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
        let randomPhoneNumberData = Math.random().toString().substring(2, 12);
        /* 
        Test Steps:
        1. Navigate to Individual Sign Up page
        2. Fill email and password fields with correct data
        3. Click "Next" button
        4. Fill First Name and Last Name fields with data
        5. Click "Investor" button
        7. Click "Let's Go" button
        8. Verify that the user is navigated to page "You’re human, right? Please verify your email." page.
        9. Verify that page is shown with correct labels
        10. Verify that "Resend Confirmation Email" button is enabled  
        11. Click "Resend Confirmation Email" button
        12. Verify that page is shown with correct labels
        13. Verify that "Resend Confirmation Email" button is not shown
        */

        it('Fill Sign Up page and click Resend confirmation link ', () => {

            ComplexAPI.navigateToPage({navigateTo: `SignUpIndividual`});
            ComplexAPI.deleteToken();
            Auth.fillSignInPage({
                emailText: emailAddress,
                passwordText: passwordData
              });
              Auth.clickSubmitBtn();
              cy.wait(3000);
              Auth.clickSubmitBtn(); 
              Auth.fillAboutYourselfPage({
                firstNameText: firstNameData, 
                lastNameText: lastNameData,
                phoneNumberText: randomPhoneNumberData
              });
              Auth.clickInvestorBtn();
              Auth.clickSubmitBtn();
              CommonActions.waitForElementIsVisible(Auth.btnResendConfirmationEmail);
              Auth.checkLblSuccessSingUp();
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
                  CommonActions.waitForElementIsVisible(Home.btnGetStarted);
                  cy.wait(3000);
                  Home.checkWelcomeText(firstNameData);
             })             
         })

    })
})