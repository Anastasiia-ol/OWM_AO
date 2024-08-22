import * as Common_Actions from "./Common_Actions";

const fldEmail =`input[name = "email"]`;
const fldPassword =`input[name = "password"]`;

export const btnSignIn = `#btn-sign-in`;
export const btnSingUp = `#btn-sign-up`; 


const btnForgonPassword = `#btn-forgot-pass`;
const btnContinueWithGoogle = `#btn-google-sign-in`;
const btnContinueWithLinkedIn = `#btn-linkedin-sign-in`;
const btnChangeAuthPage = `#btn-change-auth-page`;

const chbRememberMe = `.checkmark`;

const lblHead = `h1[class='text-center']`;
const lbl1 =`h1.text-center + p`; 
const lblEmailSignUp = `label[for="input-email"]`; 
const lblPasswordSignUp = `label[for='input-pass']`;
const lblEmailSignIn = `label[for='input-username']`; 
const lblPasswordSignIn = `label[for='input-user-pass']`;const lblRememberMe = `.text`;
const lblNearChangePage = `.text-body`;
const lblTerms = `p[class='text-xs text-center mb-[16px]']`;
const lblOr = `span[class='text-xs z-10 bg-white px-[10px]']`;
const lblEmailResetPswd = `label`;
const lblAfterResendingEmail =`span[class='text-button !text-success-500']`;

const errorMsg = `div[role='alert'] div:nth-child(2)`;
const alert = `.error-message`;

export const btnSendResetLink =`button[type='submit']`;
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

export function changeAuthPage(){
    cy.get(btnChangeAuthPage).click();
}

export function checkSignInBtnDisabled(){
    Common_Actions.checkElementIsDisabled(btnSignIn);
}
export function checkSignInBtnEnabled(){
    Common_Actions.checkElementIsEnabled(btnSignIn);
}
export function checkSignUpBtnDisabled(){
    Common_Actions.checkElementIsDisabled(btnSingUp);
}
export function checkSignUpBtnEnabled(){
    Common_Actions.checkElementIsEnabled(btnSingUp);
}
export function checkIWannaOWMBtnEnable(){
    Common_Actions.checkElementIsEnabled(btnSingUp);

}
export function checkIWannaOWMBtnDisabled(){
    Common_Actions.checkElementIsDisabled(btnSingUp);

}
export function checkChangePageBtnEnabled(){
    Common_Actions.checkElementIsEnabled(btnChangeAuthPage);
}
export function checkContinueWithGoogleBtnEnabled(){
    Common_Actions.checkElementIsEnabled(btnContinueWithGoogle);
}
export function checkContinueWithLinkedIBtnEnabled(){
    Common_Actions.checkElementIsEnabled(btnContinueWithLinkedIn);
}
export function checkForgotPasswordBtnEnabled(){
    Common_Actions.checkElementIsEnabled(btnForgonPassword);
}
export function checkLabelsSignInPage({signUpFlag = true, lblNearChangePageText, lblChangeAuthText, lblHeadText, lbl1Text, 
                                        lblEmailText, lblPasswordText,lblRememberMeText, lblForgotPasswordText, lblSignInBtnText, 
                                        lblSignUpBtnText, lblTermsText, lblOrText,
                                        lblContinueWithGoogleText, lblContinueWithLinkedInText}){
    if (signUpFlag){
        Common_Actions.checkElementText(btnSingUp, lblSignUpBtnText)
        Common_Actions.checkElementText(lblEmailSignUp, lblEmailText);
        Common_Actions.checkElementText(lblPasswordSignUp, lblPasswordText);
    }
    else{
        Common_Actions.checkElementText(btnSignIn, lblSignInBtnText);
        Common_Actions.checkElementText(lblRememberMe, lblRememberMeText);
        Common_Actions.checkElementText(btnForgonPassword, lblForgotPasswordText);
        Common_Actions.checkElementText(lblEmailSignIn, lblEmailText);
        Common_Actions.checkElementText(lblPasswordSignIn, lblPasswordText);
    }
    Common_Actions.checkElementText(lblNearChangePage, lblNearChangePageText);
    Common_Actions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
    Common_Actions.checkElementText(lblHead, lblHeadText);
    Common_Actions.checkElementText(lbl1, lbl1Text);
    Common_Actions.checkElementText(lblTerms, lblTermsText);
    Common_Actions.checkElementText(lblOr, lblOrText);
    Common_Actions.checkElementText(btnContinueWithGoogle, lblContinueWithGoogleText);
    Common_Actions.checkElementText(btnContinueWithLinkedIn, lblContinueWithLinkedInText);
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
export function clickSignUpBtn(){
    cy.get(fldEmail).click();
    cy.get(btnSingUp).click();
}
export function checkPlaceholdersEmailPassword(plhdEmailText, plhdPasswordText){
    plhdEmailText? Common_Actions.checkPlaceholderText(fldEmail, plhdEmailText): `Parameter is not provided`;
    plhdPasswordText? Common_Actions.checkPlaceholderText(fldPassword, plhdPasswordText): `Parameter is not provided`;
}
export function checkRememberMeChbIsNotSelected(){
    Common_Actions.checkCheckBoxIsNotSelected(chbRememberMe);
}
export function checkErrorMsg(errorMsgText){
    Common_Actions.checkElementText(errorMsg, errorMsgText);
}
export function checkAlertForEmailPassword({alertEmailText, alertPasswordText}){
    alertEmailText? Common_Actions.checkElementText(alert, alertEmailText) : `The text is not specified`;
    alertPasswordText? Common_Actions.checkElementText(alert, alertPasswordText, 1) : `The text is not specified`;
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
        Common_Actions.checkElementText(lblNearChangePage, lblNearChangePageText);
        Common_Actions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
        Common_Actions.checkElementText(lbl1, lbl1Text);
        if (step1){
            Common_Actions.checkElementText(lblEmailResetPswd, lblEmailText);
            Common_Actions.checkElementText(lblHead, lblHeadText);
            Common_Actions.checkElementText(btnSendResetLink, lblSendResetLinkBtnText);
        } else{
            Common_Actions.checkElementText(btnBackToLogIn, btnBackToLogInBtnText);
            Common_Actions.checkElementText(lblHeadResetPswdStep2, lblHeadText);
            
        }       
}
export function clickForgotPasswordBtn(){
    cy.get(btnForgonPassword).click();
}
export function checkSendResetLinkDisabled(){
    Common_Actions.checkElementIsDisabled(btnSendResetLink);
}
export function checkSendResetLinkEnabled(){
    Common_Actions.checkElementIsEnabled(btnSendResetLink);
}
export function fillEmailForResetPassword(emailForResetPasswordText, clearEmail = false){
    clearEmail? cy.get(fldEmail).clear(): cy.get(fldEmail).clear().type(emailForResetPasswordText);
}
export function clickSendResetLinkBnt(){
    cy.get(btnSendResetLink).click();
}
export function checkBackToLogInBtnEnabled(){
    Common_Actions.checkElementIsEnabled(btnBackToLogIn);
}
export function checkBackAtTheTopEnabled(){
    Common_Actions.checkElementIsEnabled(btnBackTop);
}
export function clickBackToLogInBtn(){
    cy.get(btnBackToLogIn).click();
}
export function clickBackAtTheTop(){
    cy.get(btnBackTop).click();
}

export function checkGoBackBtnIsEnabled(){
    Common_Actions.checkElementIsEnabled(btnGoBack);
}
export function clickGoBackBtn(){
    cy.get(btnGoBack).click();
}
export function checkLblSuccessSingUp(lblNearChangePageText, lblChangeAuthText, lblEmailTitleText, lblEmailDescriprionText, lblResendText1, lbllResendEmailBtnText){
    Common_Actions.checkElementText(lblNearChangePage, lblNearChangePageText);
    Common_Actions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
    Common_Actions.checkElementText(lblEmailTitle, lblEmailTitleText);
    Common_Actions.checkElementText(lblEmailDescriprion, lblEmailDescriprionText);
    Common_Actions.checkElementText(lblResendText, lblResendText1);
    Common_Actions.checkElementText(btnResendEmail,lbllResendEmailBtnText);
}
export function checkResendConfirmationEmailBtnIsEnabled(){
    Common_Actions.checkElementIsEnabled(btnResendEmail);
}
export function clickResendConfirmationEmailBtn(){
    cy.get(btnResendEmail).click();
}
export function checkResendConfirmationEmailBtnNotExist(){
    Common_Actions.checkElementIsAbsent(btnResendEmail);
}
export function checkLblCreateNewPassword(lblNearChangePageText, lblChangeAuthText, lblCreateNewPasswordHeadText, lblNewPasswordSubheadText, 
    lblNewPasswordText,lblConfirmPasswordText, lblResetPasswordBtnText){
    Common_Actions.checkElementText(lblNearChangePage, lblNearChangePageText);
    Common_Actions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
    Common_Actions.checkElementText(lblHead, lblCreateNewPasswordHeadText);
    Common_Actions.checkElementText(lbl1, lblNewPasswordSubheadText);
    Common_Actions.checkElementText(lblEmailResetPswd, lblNewPasswordText, 0);
    Common_Actions.checkElementText(lblEmailResetPswd, lblConfirmPasswordText, 1);
    Common_Actions.checkElementText(btnSendResetLink,lblResetPasswordBtnText);
}
export function checkResetPasswordBtnEnabled(){
    Common_Actions.checkElementIsEnabled(btnSendResetLink);
}
export function checkResetPasswordBtnDisabled(){
    Common_Actions.checkElementIsDisabled(btnSendResetLink);
}
export function clickResetPasswordBtn(){
    cy.get(btnSendResetLink).click();
}
export function checkPlaceholdersPasswordConfirm(plhdNewPasswordText, plhdPasswordCofirmationText){
    Common_Actions.checkPlaceholderText(fldNewPassword, plhdNewPasswordText);
    Common_Actions.checkPlaceholderText(fldPasswordConfirmation, plhdPasswordCofirmationText);
}
export function checkLblAfterResendingEmailConfirmation(lblAfterResendingEmailText){
    Common_Actions.checkElementText(lblAfterResendingEmail, lblAfterResendingEmailText)
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
    Common_Actions.checkElementText(lblNearChangePage, lblNearChangePageText);
    Common_Actions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
    Common_Actions.checkElementText(lblHeadInvalidResetLink, lblInvalidResetLinkHeadText);
    Common_Actions.checkElementText(lbl1, lblInvalidResetLinkSubheadText);
    Common_Actions.checkElementText(btnBackToResetPassword,lblBackToResetPasswordText);
}
export function checkBackToResetPasswordBntEnabled(){
    Common_Actions.checkElementIsEnabled(btnBackToResetPassword);
}
export function clickBackToResetPasswordBtn(){
    cy.get(btnBackToResetPassword).click();
}

