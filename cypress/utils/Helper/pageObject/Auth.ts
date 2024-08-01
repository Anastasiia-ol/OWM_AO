import * as Common_Actions from "./Common_Actions";

export const fldEmail ='input[name = "email"]';
export const fldPassword =`input[name = "password"]`;

export const btnSignIn = `#btn-sign-in`;
export const btnSingUp = `#btn-sign-up`; 


export const btnForgonPassword = `#btn-forgot-pass`;
export const btnContinueWithGoogle = `#btn-google-sign-in`;
export const btnContinueWithLinkedIn = `#btn-linkedin-sign-in`;
export const btnChangeAuthPage = `#btn-change-auth-page`;

export const chbRememberMe = `.checkmark`;

export const lblHead = `h1[class='text-center']`//`Let’s get started`
export const lbl1 =`p[class='text-center text-xs mb-[30px]']`; //`Create your OWM account now!`
export const lblEmailSignUp = `label[for="input-email"]`; 
export const lblPasswordSignUp = ` label[for='input-pass']`;
export const lblEmailSignIn = `label[for='input-username']`; 
export const lblPasswordSignIn = `label[for='input-user-pass']`;
export const lblRememberMe = `.text`;
export const lblNearChangePage = `.text-body`;
export const lblTerms = `p[class='text-xs text-center mb-[16px]']`;
export const lblOr = `span[class='text-xs z-10 bg-white px-[10px]']`;

export const errorMsg = `div[role='alert'] div:nth-child(2)`;
export const alert = `.error-message`;

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
    Common_Actions.checkPlaceholderText(fldEmail, plhdEmailText);
    Common_Actions.checkPlaceholderText(fldPassword, plhdPasswordText);

}
export function checkRememberMeChbIsNotSelected(){
    Common_Actions.checkCheckBoxIsNotSelected(chbRememberMe);
}
export function checkErrorMsg(errorMsgText){
    Common_Actions.checkElementText(errorMsg, errorMsgText);
}
export function checkAlertForEmailPassword(alertEmailText, alertPasswordText){
    alertEmailText? Common_Actions.checkElementText(alert, alertEmailText) : `The text is not specified`;
    alertPasswordText? Common_Actions.checkElementText(alert, alertPasswordText, 1) : `The text is not specified`;
}
export function clickContinueWithGoogleBtn(){
    cy.get(btnContinueWithGoogle).click();
}

/*

export function check_organization_name(name) {
    Common_Actions.check_element_has_value(organization_name, name)
}

Common_Actions.check_element_text(info_mongoose_key_text_xpath, info_mongoose_key,0,true); // for labels

export function fill_mongoose_key_field(mongoose_key, clear = false){
    clear ? cy.get(mongoose_key_field, { timeout: 10*1000 }).clear() :cy.get(mongoose_key_field).clear().type(mongoose_key);
}

export  function check_save_changes_disabled(){
    Common_Actions.check_element_is_disabled(save_changes_button);
}*/
