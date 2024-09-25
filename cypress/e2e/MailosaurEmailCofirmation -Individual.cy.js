import * as Auth from "../utils/Helper/pageObject/Auth";
import * as CommonActions from "../utils/Helper/pageObject/CommonActions";
const Mailosaur = require('mailosaur')


describe('Auth - Mailosaur', () => {
    context('Mailosaur.', () => {
      
        const apiKey = 'OINAGTYZ2cIw3MQgzBtpTLkry2V4BGg1';
        const mailosaur = new Mailosaur(apiKey);
        const serverId = 'uksj5vnw';
        const serverDomain = '@uksj5vnw.mailosaur.net';
        let emailAddress;
        const randomString = new Date().getTime();
        emailAddress = `${randomString}${serverDomain}`;
        let passwordData = `21250178OwM`;
        /* 
        Test Steps:
        1. Navigate to Auth page
        2. Click "Sign Up" button
        3. Fill email and password with correct data
        4. Click "I wanna Own it with OWM" button
        5. Verify that the user is navigated to Success Sign Up page
        6.  Verify that labels are shown correctly on Success Sign Up page
        */

        it('Fill Sign Up page.', () => {
            
        })

        /* 
        Test Steps:
        1. Open email in Mailosour
        2. Verify that subject, sender, email text are correct
        */

        it('Verify email confirmation letter.', () => {  
            const emailHeader = `Welcome to OWM.`;
            const emailText = `Please verify your email address by clicking the link below.`;
            const lblConfirmBtn = 'Confirm email';
            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
            .then((email)=>{
               expect(email.subject).to.equal('Verify your email address for OWM');
               expect(email.from[0].email).to.equal('hello@owm.ai'); 
               expect(email.from[0].name).to.equal('OWM'); 
               
               const body = email.html.body;
               cy.document().then((doc) => {
                doc.write(body);
                doc.close();
                cy.get('h1').should('contain.text', emailHeader);
                cy.get('p').should('contain.text', emailText);
                cy.get('a').should('contain.text', lblConfirmBtn);
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

        it('Verify that success message is shown after visiting confirmation link.', () => {  
            cy.mailosaurGetMessage(serverId, {sentTo: emailAddress})
             .then((email)=>{
                expect(email.subject).to.equal('Verify your email address for OWM');
                 let confirmSignupLink = email.html.links[0].href;
                 cy.visit(confirmSignupLink);
                 Auth.checkErrorMsg('Email confirmed successfully');
             })
               
         })


    })
})