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
export function checkElementContainText(locator, text, index =0){
        cy.get(locator).eq(index).should('contain', 'Welcome');
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


export function waitForElementIsNotExist(locator, wait_time = 5, index = 0) {
        cy.get(locator, {timeout: wait_time * 1000}).eq(index).should('not.exist', wait_time* 1000);
}

export function checkElementIsAbsent(locator, index = 0) {
         cy.get('body').then(($body) => {
                if ($body.find(locator).eq(index).length > 0) {
                    expect(`Element is NOT present`).to.equal(`Element is present`)
                  } else {
                    expect(`Element is NOT present`).to.equal(`Element is NOT present`)
                    }
                })         
}
export function checkElementIsPresent(locator, index = 0) {
        cy.get('body').then(($body) => {
            if ($body.find(locator).eq(index).length > 0) {
                expect(`Element is present`).to.equal(`Element is present`)
            } else {
                expect(`Element is present`).to.equal(`Element is NOT present`)
            }
        })
}

export function waitForElementIsVisible(locator, wait_time = 10, index = 0, last = false) {
        if (last) {
                cy.get(locator, {timeout: wait_time * 1000}).last().should('be.visible', wait_time)
        } else {
                cy.get(locator, {timeout: wait_time * 1000}).eq(index).should('be.visible', wait_time)
    
        }
        
}

export function waitForElementIsNotVisible(locator, wait_time = 5, index = 0) {
        cy.get(locator, {timeout: wait_time * 1000}).eq(index).should('not.be.visible', wait_time * 1000);
}

export function checkElementHasValue(locator, text, index = 0) {
        cy.get(locator).eq(index).scrollIntoView().should('have.value', text)       
}
export function checkElementContainsValue(locator, text) {
        cy.get(locator).invoke('attr', 'value').should('contain', text)
}
    