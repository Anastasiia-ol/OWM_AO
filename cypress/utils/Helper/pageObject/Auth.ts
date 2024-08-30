import * as CommonActions from "./CommonActions";

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

export function changeAuthPage(){
    cy.get(btnChangeAuthPage).click();
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
export function checkIWannaOWMBtnEnable(){
    CommonActions.checkElementIsEnabled(btnSingUp);

}
export function checkIWannaOWMBtnDisabled(){
    CommonActions.checkElementIsDisabled(btnSingUp);

}
export function checkChangePageBtnEnabled(){
    CommonActions.checkElementIsEnabled(btnChangeAuthPage);
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
export function checkLabelsSignInPage({signUpFlag = true, lblNearChangePageText, lblChangeAuthText, lblHeadText, lbl1Text, 
                                        lblEmailText, lblPasswordText,lblRememberMeText, lblForgotPasswordText, lblSignInBtnText, 
                                        lblSignUpBtnText, lblTermsText, lblOrText,
                                        lblContinueWithGoogleText, lblContinueWithLinkedInText}){
    if (signUpFlag){
        CommonActions.checkElementText(btnSingUp, lblSignUpBtnText)
        CommonActions.checkElementText(lblEmailSignUp, lblEmailText);
        CommonActions.checkElementText(lblPasswordSignUp, lblPasswordText);
    }
    else{
        CommonActions.checkElementText(btnSignIn, lblSignInBtnText);
        CommonActions.checkElementText(lblRememberMe, lblRememberMeText);
        CommonActions.checkElementText(btnForgonPassword, lblForgotPasswordText);
        CommonActions.checkElementText(lblEmailSignIn, lblEmailText);
        CommonActions.checkElementText(lblPasswordSignIn, lblPasswordText);
    }
    CommonActions.checkElementText(lblNearChangePage, lblNearChangePageText);
    CommonActions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
    CommonActions.checkElementText(lblHead, lblHeadText);
    CommonActions.checkElementText(lbl1, lbl1Text);
    CommonActions.checkElementText(lblTerms, lblTermsText);
    CommonActions.checkElementText(lblOr, lblOrText);
    CommonActions.checkElementText(btnContinueWithGoogle, lblContinueWithGoogleText);
    CommonActions.checkElementText(btnContinueWithLinkedIn, lblContinueWithLinkedInText);
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
    plhdEmailText? CommonActions.checkPlaceholderText(fldEmail, plhdEmailText): `Parameter is not provided`;
    plhdPasswordText? CommonActions.checkPlaceholderText(fldPassword, plhdPasswordText): `Parameter is not provided`;
}
export function checkRememberMeChbIsNotSelected(){
    CommonActions.checkCheckBoxIsNotSelected(chbRememberMe);
}
export function checkErrorMsg(errorMsgText){
    CommonActions.checkElementText(errorMsg, errorMsgText);
}
export function checkAlertForEmailPassword({alertEmailText, alertPasswordText}){
    alertEmailText? CommonActions.checkElementText(alert, alertEmailText) : `The text is not specified`;
    alertPasswordText? CommonActions.checkElementText(alert, alertPasswordText, 1) : `The text is not specified`;
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
        CommonActions.checkElementText(lblNearChangePage, lblNearChangePageText);
        CommonActions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
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
export function checkLblSuccessSingUp(lblNearChangePageText, lblChangeAuthText, lblEmailTitleText, lblEmailDescriprionText, lblResendText1, lbllResendEmailBtnText){
    CommonActions.checkElementText(lblNearChangePage, lblNearChangePageText);
    CommonActions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
    CommonActions.checkElementText(lblEmailTitle, lblEmailTitleText);
    CommonActions.checkElementText(lblEmailDescriprion, lblEmailDescriprionText);
    CommonActions.checkElementText(lblResendText, lblResendText1);
    CommonActions.checkElementText(btnResendEmail,lbllResendEmailBtnText);
}
export function checkResendConfirmationEmailBtnIsEnabled(){
    CommonActions.checkElementIsEnabled(btnResendEmail);
}
export function clickResendConfirmationEmailBtn(){
    cy.get(btnResendEmail).click();
}
export function checkResendConfirmationEmailBtnNotExist(){
    CommonActions.checkElementIsAbsent(btnResendEmail);
}
export function checkLblCreateNewPassword(lblNearChangePageText, lblChangeAuthText, lblCreateNewPasswordHeadText, lblNewPasswordSubheadText, 
    lblNewPasswordText,lblConfirmPasswordText, lblResetPasswordBtnText){
    CommonActions.checkElementText(lblNearChangePage, lblNearChangePageText);
    CommonActions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
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
export function checkLblAfterResendingEmailConfirmation(lblAfterResendingEmailText){
    CommonActions.checkElementText(lblAfterResendingEmail, lblAfterResendingEmailText)
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
    CommonActions.checkElementText(btnChangeAuthPage, lblChangeAuthText);
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

