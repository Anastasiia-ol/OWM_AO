import * as CommonActions from "./CommonActions";

const fldEmail =`input[name = "email"]`;
const fldPassword =`input[name = "password"]`;

export const btnSignIn = `#btn-sign-in`;
const lblNotIndividual = `#not-an-individual-text`;
const lblHaveAccount = `#already-have-account-text`;
const lblHaveAccount2 = `#already-have-account`;
const btnCompanySignUp = `#company-sign-up`;
const lblStep = `#step-text`;
const btnSubmit = `#send-button`;
const btnSignInOnSignUpPage = `#sign-in-button`;
const btnIndividualSignUp =`#individual-sign-up`
const lblNotACompany = `#not-a-company`;
//const btnSingUp = `#btn-sign-up`; 


const btnForgonPassword = `#btn-forgot-pass`;
const btnContinueWithGoogle = `#btn-google-sign-in`;
const btnContinueWithLinkedIn = `#btn-linkedin-sign-in`;
const btnSingUp = `#btn-change-auth-page`;

const chbRememberMe = `.checkmark`;

const lblHead = `h1[class='text-center']`;
const lbl1 =`h1.text-center + p`; 
const lblEmailSignUp = `label[for="input-email"]`; 
const lblPasswordSignUp = `label[for='input-pass']`;
const lblEmailSignIn = `label[for='input-username']`; 
const lblPasswordSignIn = `label[for='input-user-pass']`;
const lblRememberMe = `.text`;
const lblNearSignUpBtn = `.text-body`;
const lblTerms = `#privacy-policy-p`;
const lblOr = `#or-text`;
const lblEmailResetPswd = `label`;
const lblAfterResendingEmail =`span[class='text-button !text-success-500']`;

const lblAboutYourself = `h1`;
const lblFirstName = `label[for='input-user-name']`;
const lblLastName = `label[for='input-email']`;
const lblPhoneNumber = `#phone-label`;
const lblIAm = `#i-am-a-text`;
const fldFirstName= `input[name = "firstName"]`;
const fldLastName = `input[name = "lastName"]`;
const fldPhoneNumber = `#phone-number-input`;
const btnInvestor = `#investor-option`;
const btnAdvisor= `#advisor-option`;
const btnTalent = `#talent-option`;
const btnVendor = `#vendor-option`;
const btnOtherOption= `#other-option`;
const fldDescribeYourself = `#input-person-type`;
const btnStepBack = `#step-back-button`;

const lblHeadVerityEmail = `#verify-email-title`;
const lblVerityEmailDescription1 = `#email-sent-desc`;
const lblVerityEmailDescription2 = `#if-not-found-text`
export const btnResendConfirmationEmail = `#resend-button`;

const errorMsg = `div[role='alert'] div:nth-child(2)`;
const alert = `.error-message`;

export const btnSendResetLink =`button[type='submit']`;// #resend-email-button
export const btnBackToLogIn = `#reset-password-back-button`;
const btnBackTop = `#reset-password-back-top-button`;

export const btnGoBack = `#go-back-button`;
const lblEmailTitle = `#email-sent-title`;
const lblEmailDescriprion = `#email-sent-description`;
const lblResendText = `#email-sent-resend-text`;
const btnResendEmail=`#resend-email-button`;
const lblHeadResetPswdStep2 = `#reset-password-title`;
export const fldNewPassword = `input[name="password"]`;
const fldPasswordConfirmation =`input[name="passwordConfirmation"]`;
export const btnForgotPasswordGoBack=`#forgot-password-back-top-button`;

export const lblHeadInvalidResetLink = `h1[class="text-center mb-[8px] mt-[24px]"]`;

export const btnBackToResetPassword = `button[option="prim"]`;

export function clickSignUpBtn(){
    cy.get(btnSingUp).click();
}

export function checkSignInBtnDisabled(){
    CommonActions.checkElementIsDisabled(btnSignIn);
}
export function checkSignInBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnSignIn);
}
export function checkSignUpBtnDisabled(){
    CommonActions.checkElementIsDisabled(btnSingUp);
}
export function checkSignUpBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnSingUp);
}

export function checkContinueWithGoogleBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnContinueWithGoogle);
}
export function checkContinueWithLinkedIBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnContinueWithLinkedIn);
}
export function checkForgotPasswordBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnForgonPassword);
}

export function checkLabelsAuthPage(authType) {
    let url = ``;
    switch (authType) {
        case `SignIn`:
            CommonActions.checkElementText(lblNearSignUpBtn, `Don’t have an account?`);
            CommonActions.checkElementText(btnSignIn, `Sign in`);
            CommonActions.checkElementText(lblRememberMe, `Remember me`);
            CommonActions.checkElementText(btnForgonPassword, `Forgot password?`);
            CommonActions.checkElementText(lblEmailSignIn, `Email address`);
            CommonActions.checkElementText(lblPasswordSignIn, `Password`);
            CommonActions.checkElementText(btnSingUp, `Sign up`);
            CommonActions.checkElementText(lblHead, `Sign in`);
            CommonActions.checkElementText(lbl1, `Log into your OWM account.`);
            CommonActions.checkElementText(lblTerms, `By signing in, you agree to our Privacy Policy and Terms and Conditions.`);
            CommonActions.checkElementText(lblOr, `Or`);
            CommonActions.checkElementText(btnContinueWithGoogle, `Continue with Google`);
            CommonActions.checkElementText(btnContinueWithLinkedIn, `Continue with LinkedIn`);
            break;
        case `SignUpIndividual`:
            CommonActions.checkElementText(lblEmailSignUp, `Email address`);
            CommonActions.checkElementText(lblPasswordSignUp, `Password`);
            CommonActions.checkElementText(lblHead, `Let’s create your account`);
            CommonActions.checkElementText(lblTerms, `By creating an account, you agree to our Privacy Policy and Terms and Conditions.`);
            CommonActions.checkElementText(lblOr, `Or`);
            CommonActions.checkElementText(btnContinueWithGoogle, `Continue with Google`);
            CommonActions.checkElementText(btnContinueWithLinkedIn, `Continue with LinkedIn`);
            CommonActions.checkElementText(lblNotIndividual, `Not an individual?`);
            CommonActions.checkElementText(btnCompanySignUp, `Sign up as a company`);
            CommonActions.checkElementText(lblHaveAccount, `Already have an account?`);
            CommonActions.checkElementText(btnSignInOnSignUpPage, `Sign in`);
            CommonActions.checkElementText(lblStep, `Step 1/2`);
            CommonActions.checkElementText(btnSubmit, `Next`);
            break;
        case `SignUpCompany`:
            CommonActions.checkElementText(lblEmailSignUp, `Company email address`);
            CommonActions.checkElementText(lblPasswordSignUp, `Password`);
            CommonActions.checkElementText(lblHead, `Let’s create your company account`);
            CommonActions.checkElementText(lblTerms, `By creating an account, you agree to our Privacy Policy and Terms and Conditions.`);
            CommonActions.checkElementText(lblOr, `Or`);
            CommonActions.checkElementText(btnContinueWithGoogle, `Continue with Google`);
            CommonActions.checkElementText(btnContinueWithLinkedIn, `Continue with LinkedIn`);
            CommonActions.checkElementText(lblNotACompany, `Not a company?`);
            CommonActions.checkElementText(btnIndividualSignUp, `Sign up as an individual`);
            CommonActions.checkElementText(lblHaveAccount2, `Already have an account?`);
            CommonActions.checkElementText(btnSignInOnSignUpPage, `Sign in`);
            CommonActions.checkElementText(lblStep, `Step 1/3`);
            CommonActions.checkElementText(btnSubmit, `Next`);
            break;
       
        case `Home`:
            url = `https://${env}.owm.ai/auth`;
            cy.log(`URL is: ${url}`);
            cy.visit(url);
            break;

        default:
            cy.log(`Navigation page has not been provided.`)
    }
}
export function checkLabelsIndividualSignUpStep2(){
    CommonActions.checkElementText(lblAboutYourself, `Tell us about yourself`);
    CommonActions.checkElementText(lblStep, `Step 2/2`);
    CommonActions.checkElementText(lblFirstName, `First name`);
    CommonActions.checkElementText(lblLastName, `Last name`);
   // CommonActions.checkElementText(lblPhoneNumber, `Phone number (optional)`);
    CommonActions.checkElementText(lblIAm, `I’m a:`);
    CommonActions.checkElementText(btnInvestor, `Investor`);
    CommonActions.checkElementText(btnAdvisor, `Advisor`);
    CommonActions.checkElementText(btnTalent, `Talent`);
    CommonActions.checkElementText(btnVendor, `Vendor`);
    CommonActions.checkElementText(btnOtherOption, `Other important person`);
    CommonActions.checkElementText(btnStepBack, `Step back`);
    CommonActions.checkElementText(btnSubmit, `Let’s Go`);   
}
export function checkPlaceholdersTellAboutYourself(other = true){
    CommonActions.checkPlaceholderText(fldFirstName, `Enter your name here`);
    CommonActions.checkPlaceholderText(fldLastName, `Enter your name here`);
    CommonActions.checkPlaceholderText(fldPhoneNumber, `e.g., (123) 456-7890`);
    other? CommonActions.checkPlaceholderText(fldDescribeYourself, `Describe yourself`): `Other information is not provided`;
}
export function checkStepBackBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnStepBack);
}
export function checkInvestorBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnInvestor);
}
export function checkAdvisorBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnAdvisor);
}
export function checkTalentBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnTalent);
}
export function checkVendorBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnVendor);
}
export function checkOtherBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnOtherOption);
}

export function clickInvestorBtn(){
    cy.get(btnInvestor).click();
}
export function clickAdvisorBtn(){
    cy.get(btnAdvisor).click();
}
export function clickTalentBtn(){
    cy.get(btnTalent).click();
}
export function clickVendorBtn(){
    cy.get(btnVendor).click();
}
export function clickOtherBtn(){
    cy.get(btnOtherOption).click();
}
export function clickStepBackBtn(){
    cy.get(btnStepBack).click();
}
export function fillAboutYourselfPage({firstNameText, lastNameText, phoneNumberText, otherText, clearPhoneNumber = false}){
    firstNameText? cy.get(fldFirstName).clear().type(firstNameText): `Parameter is not provided`;
    lastNameText? cy.get(fldLastName).clear().type(lastNameText): `Parameter is not provided`;
    phoneNumberText? cy.get(fldPhoneNumber).clear().type(phoneNumberText): `Parameter is not provided`;
    otherText? cy.get(fldDescribeYourself).clear().type(otherText): `Parameter is not provided`;
    clearPhoneNumber? cy.get(fldPhoneNumber).clear(): `Parameter is not provided`;

}
export function checkEmailAddressHasValue(emailText){
    CommonActions.checkElementHasValue(fldEmail, emailText)
}
export function checkPasswordHasValue(passwordText){
    CommonActions.checkElementHasValue(fldPassword, passwordText)
}
export function checkIndividualSignUpBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnIndividualSignUp);  
}
export function clickIndividualSignUpBtn(){
    cy.get(btnIndividualSignUp).click()
}

export function clickCompanySignUpBtn(){
    cy.get(btnCompanySignUp).click()
}

export function checkCompanySignUpBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnCompanySignUp)
}
export function checkSignInOnSignUpPageEnabled(){
    CommonActions.checkElementIsEnabled(btnSignInOnSignUpPage)
}
export function clickSignInBtnOnSignUpPage(){
    cy.get(btnSignInOnSignUpPage).click()
}
export function checkSubmitBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnSubmit)
}
export function clickSubmitBtn(){
    cy.get(btnSubmit).click();
}

export function fillSignInPage({emailText, passwordText, clearEmail = false, clearPassword = false}){
    emailText? cy.get(fldEmail).clear().type(emailText): `Parameter is not provided`;
    passwordText? cy.get(fldPassword).clear().type(passwordText): `Parameter is not provided`;
    clearEmail? cy.get(fldEmail).clear(): `Parameter is not provided`;
    clearPassword? cy.get(fldPassword).clear(): `Parameter is not provided`;   
}
export function clickSignInBtn(){
    cy.get(fldEmail).click();//to move cursor
    cy.get(btnSignIn).click();
}

export function checkPlaceholdersEmailPassword(plhdEmailText, plhdPasswordText){
    plhdEmailText? CommonActions.checkPlaceholderText(fldEmail, plhdEmailText): `Parameter is not provided`;
    plhdPasswordText? CommonActions.checkPlaceholderText(fldPassword, plhdPasswordText): `Parameter is not provided`;
}
export function checkRememberMeChbIsNotSelected(){
    CommonActions.checkCheckBoxIsNotSelected(chbRememberMe);
}
export function checkErrorMsg(errorMsgText){
    CommonActions.checkElementText(errorMsg, errorMsgText);
}
export function checkAlertForEmailPassword({alertEmailText, alertPasswordText, alertPhoneNumberText,  alertOtherImportantPersonText}){
    alertEmailText? CommonActions.checkElementText(alert, alertEmailText) : `The text is not specified`;
    alertPasswordText? CommonActions.checkElementText(alert, alertPasswordText, 1) : `The text is not specified`;
    alertPhoneNumberText? CommonActions.checkElementText(alert, alertPhoneNumberText, 2) : `The text is not specified`;
    alertOtherImportantPersonText? CommonActions.checkElementText(alert, alertOtherImportantPersonText,0, true) : `The text is not specified`;
}
export function clickContinueWithGoogleBtn(){
    cy.get(btnContinueWithGoogle).click();
}
export function login(emailText, passwordText ){
    cy.visit('https://stage.owm.ai/auth');
    fillSignInPage({emailText, passwordText});
    clickSignInBtn();
}

export function checkLabelsResetPasswordPage({lblNearChangePageText, lblChangeAuthText, lblHeadText, lbl1Text, 
    lblEmailText, lblSendResetLinkBtnText, btnBackToLogInBtnText, step1=true}){
        CommonActions.checkElementText(lblNearSignUpBtn, lblNearChangePageText);
        CommonActions.checkElementText(btnSingUp, lblChangeAuthText);
        CommonActions.checkElementText(lbl1, lbl1Text);
        if (step1){
            CommonActions.checkElementText(lblEmailResetPswd, lblEmailText);
            CommonActions.checkElementText(lblHead, lblHeadText);
            CommonActions.checkElementText(btnSendResetLink, lblSendResetLinkBtnText);
        } else{
            CommonActions.checkElementText(btnBackToLogIn, btnBackToLogInBtnText);
            CommonActions.checkElementText(lblHeadResetPswdStep2, lblHeadText);
            
        }       
}
export function clickForgotPasswordBtn(){
    cy.get(btnForgonPassword).click();
}
export function checkSendResetLinkDisabled(){
    CommonActions.checkElementIsDisabled(btnSendResetLink);
}
export function checkSendResetLinkEnabled(){
    CommonActions.checkElementIsEnabled(btnSendResetLink);
}
export function fillEmailForResetPassword(emailForResetPasswordText, clearEmail = false){
    clearEmail? cy.get(fldEmail).clear(): cy.get(fldEmail).clear().type(emailForResetPasswordText);
}
export function clickSendResetLinkBnt(){
    cy.get(btnSendResetLink).click();
}
export function checkBackToLogInBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnBackToLogIn);
}
export function checkBackAtTheTopEnabled(){
    CommonActions.checkElementIsEnabled(btnBackTop);
}
export function clickBackToLogInBtn(){
    cy.get(btnBackToLogIn).click();
}
export function clickBackAtTheTop(){
    cy.get(btnBackTop).click();
}

export function checkGoBackBtnIsEnabled(){
    CommonActions.checkElementIsEnabled(btnGoBack);
}
export function clickGoBackBtn(){
    cy.get(btnGoBack).click();
}
export function checkLblSuccessSingUp(resendEmail = false){
    CommonActions.checkElementText(lblHeadVerityEmail, `You’re human, right? Please verify your email.`);
    CommonActions.checkElementText(lblVerityEmailDescription1, `We've sent an email to the address you gave. Just click the link in the email to confirm and then you can log\n        in.`);
    CommonActions.checkElementText(lblVerityEmailDescription2, `If you can’t find it, you can resend the email.(Or maybe it's you, not us).`);
    resendEmail? CommonActions.checkElementText(lblAfterResendingEmail, `Sent`): CommonActions.checkElementText(btnResendConfirmationEmail, `Resend confirmation email`);
}
export function checkLblSingUpAlmostDone(resendEmail = false){
    CommonActions.checkElementText(lblEmailTitle, `You're almost done!`);
    CommonActions.checkElementText(lblEmailDescriprion, `We've sent an email to the address you gave. Just click the link in the email to confirm and then you can log in.`);
    CommonActions.checkElementText(lblResendText, `If you can't find it, you can resend the email.(Or maybe it's you, not us).`);
    resendEmail? CommonActions.checkElementText(lblAfterResendingEmail, `Sent`): CommonActions.checkElementText(btnResendEmail, `Resend confirmation email`);
}

export function checkResendConfirmationEmailBtnIsEnabled(){
    CommonActions.checkElementIsEnabled(btnResendConfirmationEmail);
}

export function checkResendEmailBtnIsEnabled(){
    CommonActions.checkElementIsEnabled(btnResendEmail);
}

export function clickResendConfirmationEmailAfterSignUpBtn(){
    cy.get(btnResendConfirmationEmail).click();
}

export function clickResendConfirmationEmailBtn(){
    cy.get(btnResendEmail).click();
}
export function checkResendConfirmationEmailBtnNotExist(){
    CommonActions.checkElementIsAbsent(btnResendConfirmationEmail);
}
export function checkLblCreateNewPassword(lblNearChangePageText, lblChangeAuthText, lblCreateNewPasswordHeadText, lblNewPasswordSubheadText, 
    lblNewPasswordText,lblConfirmPasswordText, lblResetPasswordBtnText){
    CommonActions.checkElementText(lblNearChangePage, lblNearChangePageText);
    CommonActions.checkElementText(btnSingUp, lblChangeAuthText);
    CommonActions.checkElementText(lblHead, lblCreateNewPasswordHeadText);
    CommonActions.checkElementText(lbl1, lblNewPasswordSubheadText);
    CommonActions.checkElementText(lblEmailResetPswd, lblNewPasswordText, 0);
    CommonActions.checkElementText(lblEmailResetPswd, lblConfirmPasswordText, 1);
    CommonActions.checkElementText(btnSendResetLink,lblResetPasswordBtnText);
}
export function checkResetPasswordBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnSendResetLink);
}
export function checkResetPasswordBtnDisabled(){
    CommonActions.checkElementIsDisabled(btnSendResetLink);
}
export function clickResetPasswordBtn(){
    cy.get(btnSendResetLink).click();
}
export function checkPlaceholdersPasswordConfirm(plhdNewPasswordText, plhdPasswordCofirmationText){
    CommonActions.checkPlaceholderText(fldNewPassword, plhdNewPasswordText);
    CommonActions.checkPlaceholderText(fldPasswordConfirmation, plhdPasswordCofirmationText);
}
export function checkLblAfterResendingEmailConfirmation(){
    CommonActions.checkElementText(lblAfterResendingEmail, `Sent`)
}
export function fillCreateNewPassword(newPasswordText, newPasswordConfirmationText, clearNewEmail = false, clearConfirmationPassword = false){
    cy.get(lblHead).click();
    newPasswordConfirmationText? cy.get(fldPasswordConfirmation).clear().type(newPasswordConfirmationText): `Parameter is not provided`;
    cy.get(lblHead).click();
    newPasswordText? cy.get(fldNewPassword).clear().type(newPasswordText): `Parameter is not provided`;
    cy.get(lblHead).click();
    clearNewEmail? cy.get(fldNewPassword).clear(): `Parameter is not provided`;
    clearConfirmationPassword? cy.get(fldPasswordConfirmation).clear(): `Parameter is not provided`;   
}
export function checkLblInvalidResetLink(lblNearChangePageText, lblChangeAuthText, lblInvalidResetLinkHeadText, lblInvalidResetLinkSubheadText, 
    lblBackToResetPasswordText){
    CommonActions.checkElementText(lblNearChangePage, lblNearChangePageText);
    CommonActions.checkElementText(btnSingUp, lblChangeAuthText);
    CommonActions.checkElementText(lblHeadInvalidResetLink, lblInvalidResetLinkHeadText);
    CommonActions.checkElementText(lbl1, lblInvalidResetLinkSubheadText);
    CommonActions.checkElementText(btnBackToResetPassword,lblBackToResetPasswordText);
}
export function checkBackToResetPasswordBntEnabled(){
    CommonActions.checkElementIsEnabled(btnBackToResetPassword);
}
export function clickBackToResetPasswordBtn(){
    cy.get(btnBackToResetPassword).click();
}

