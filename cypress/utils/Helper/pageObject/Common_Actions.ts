export function checkElementIsEnabled(locator, index = 0) {
        cy.get(locator).eq(index).then(($ell) => {
            expect($ell).not.to.be.disabled
        })
}

export function checkElementIsDisabled(locator, index = 0) {
        cy.get(locator).eq(index).then(($ell) => {
            expect($ell).to.be.disabled
        })
}

export function checkPlaceholderText(locator, text) {
        cy.get(locator).invoke('attr', 'placeholder').should('contain', text)
    
}

export function checkElementText(locator, text, index = 0, last = false) {
    if (last) {
            cy.get(locator).last().scrollIntoView().then(($ell) => {
                    expect($ell.text()).to.equal(text);
            })
    } else {
            cy.get(locator).eq(index).scrollIntoView().then(($ell) => {
                    expect($ell.text()).to.equal(text);
            })
        }
}
export function checkCheckBoxIsNotSelected(locator) {
    cy.get(locator).should('not.be.checked');

}