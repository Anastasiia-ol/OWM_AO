
import { emit } from "process";
import * as Auth from "../utils/Helper/pageObject/Auth";
Cypress.env('MAILOSAUR_API_KEY');


describe.skip('Auth - Sign Up', () => {


    context('Sign Up.', () => {
      //const mailslurp = new MailSlurp({ apiKey: "2b5983ecd8ccad1122a4de267443cac850d428e7f3c30f38721c30664be99769" });
      //const inbox = await mailslurp.inboxController.createInboxWithDefaults();
      
    
      let emailData = `anastasia.oliyarnyk+ci01@scrumlaunch.com`;
      let passwordData = `21250178OwM`;
      
      
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
       
        /* */
        it('Verify Sign Up page labels and buttons status.', () => {
         
          cy.visit('https://stage.owm.ai/auth');
          Auth.changeAuthPage();
          
          cy.mailslurp().then(mailslurp => mailslurp.createInbox())
          .then (function(inbox){
            expect (inbox.id).to.exist
            
            cy.wrap(inbox.id).as('inboxId')
            cy.wrap(inbox.emailAddress).as('emailAddress')
            cy.wrap(inbox.userId).as(`inboxUserId`)
          })
          cy.then(function(){
            expect(this.emailAddress).to.exist;
            cy.get(`#input-pass`).type('21250178OwM').trigger('change');
            cy.get(`#input-email`).type(this.emailAddress).trigger('change');
            
            cy.get(`#btn-sign-up`).click();
           // cy.get(`#resend-email-button`).click();
          })
          /*cy.then(function(){
            cy.mailslurp().then(mailslurp=> mailslurp.waitForLatestEmail(this.inboxId, 120000, true))
            .then(email=>{
              cy.get('.confirm-btn').click();
              //expect(email.body).to.eq("test")
            })
          })*/
/*work
            cy.then(function(){
              cy.mailslurp().then(mailslurp=> mailslurp.waitForLatestEmail(this.inboxId, 120000, true))
              .then(email => {
                expect(email.subject).to.eq('Verify your email address for OWM')
                cy.wrap(email.id).as('emailId')   
              })*/
                cy.then(function(){
                  cy.mailslurp().then(mailslurp=> mailslurp.waitForLatestEmail(this.inboxId, 120000, true))
                  .then(email => {
                    expect(email.subject).to.eq('Verify your email address for OWM')
                    cy.wrap(email.id).as('emailId')   
                  })
                  .then(mailslurp =>mailslurp.emailController.getEmailPreviewURLs({
                    emailId: this.emailId
                  }))
                })
                  
               
             
              /*cy.then(function () {
                cy.log('Get url for viewing email')
                return this.mailslurp.emailController.getEmailPreviewURLs({
                  emailId: this.emailId
                })
              }).then(emailPreviewUrls => {
                cy.log(`Open email in browser: ${emailPreviewUrls.html}`)
                return cy.origin(emailPreviewUrls.origin, { args: { url: emailPreviewUrls.plainHtmlBodyUrl } }, ({ url }) => {
                  cy.visit(url)
                  cy.get('body').contains('Jack')
                  
                })
              })*/
            })
            
            ////ex
           /* cy.then(function () {
              return this.mailslurp.waitForLatestEmail(this.inbox.id, 120_000, true)
            }).then(email => {
              expect(email.subject).to.eq('Verify your email address for OWM')
              //expect(email.body).to.contain('Jack')
              cy.wrap(email.id).as('emailId')
            })
            cy.then(function () {
              cy.log('Get url for viewing email')
              return this.mailslurp.emailController.getEmailPreviewURLs({
                emailId: this.emailId
              })
            }).then(emailPreviewUrls => {
              cy.log(`Open email in browser: ${emailPreviewUrls.html}`)
              return cy.origin(emailPreviewUrls.origin, { args: { url: emailPreviewUrls.plainHtmlBodyUrl } }, ({ url }) => {
                cy.visit(url)
                cy.get('body').contains('Jack')
                //cy.screenshot('cypress-open-email')
              })
            })*/

      
       // });

    });

});
