import {badge_icon_dropdown} from "./CreateEdit_Initiative_Setup";

require('cypress-xpath');
const faker = require('faker');

const imageCropAndUseButton = '[data-test-id="photopicker-crop-button"]';

export function imageCropAndUseButtonClick() {
    cy.get(imageCropAndUseButton).click();
}

export function check_element_text(locator, text, index = 0, xpath = false, last = false, lovercased = false) {
    if (!xpath) {
        if (last) {
            cy.get(locator).last().scrollIntoView().then(($ell) => {
                lovercased ? expect($ell.text().toLowerCase()).to.equal(text.toLowerCase()) :
                    expect($ell.text()).to.equal(text);
            })
        } else {
            cy.get(locator).eq(index).scrollIntoView().then(($ell) => {
                lovercased ? expect($ell.text().toLowerCase()).to.equal(text.toLowerCase()) :
                    expect($ell.text()).to.equal(text);
            })
        }
    } else {
        if (last) {
            cy.xpath(locator).last().scrollIntoView().then(($ell) => {
                lovercased ? expect($ell.text().toLowerCase()).to.equal(text.toLowerCase()) :
                    expect($ell.text()).to.equal(text);
            })
        } else {
            cy.xpath(locator).eq(index).scrollIntoView().then(($ell) => {
                lovercased ? expect($ell.text().toLowerCase()).to.equal(text.toLowerCase()) :
                    expect($ell.text()).to.equal(text);
            })
        }
    }
}

export function check_element_has_value(locator, text, index = 0, xpath = false) {
    if (!xpath) {
        cy.get(locator).eq(index).scrollIntoView().should('have.value', text)
    } else {
        cy.xpath(locator).eq(index).scrollIntoView().should('have.value', text)
    }
}

export function check_element_contains_value(locator, text, xpath = false) {
    if (!xpath) {
        cy.get(locator).invoke('attr', 'value').should('contain', text)
    } else {
        cy.xpath(locator).invoke('attr', 'value').should('contain', text)
    }
}

export function check_element_contains_text_on_class(locator, text, index = 0, xpath = false) {
    if (!xpath) {
        cy.get(locator).eq(index).invoke('attr', 'class').should('contain', text)
    } else {
        cy.xpath(locator).eq(index).invoke('attr', 'class').should('contain', text)
    }
}

export function check_element_contains_text(locator, text, index = 0, xpath = false, wait_time = 10, last = false) {
    if (!xpath) {
        if(last){
            cy.get(locator, {timeout: wait_time * 1000}).last().scrollIntoView().then(($ell) => {
                expect($ell.text()).to.include(text)
            })

        } else {
            cy.get(locator, {timeout: wait_time * 1000}).eq(index).scrollIntoView().then(($ell) => {
                expect($ell.text()).to.include(text)
            })
        }
        
    } else {
        if (last){
            cy.xpath(locator).last().scrollIntoView().then(($ell) => {
                expect($ell.text()).to.include(text)
            })

        } else {
            cy.xpath(locator).eq(index).scrollIntoView().then(($ell) => {
                expect($ell.text()).to.include(text)
            })

        }
        
    }
}

// range_array - is an Array, so it should be passed in square braces []
export function check_element_in_range({locator, range_array, index = 0, xpath = false, delete_all_after_character = ''}) {
    if (!xpath) {
        cy.get(locator)
            .eq(index)
            .should(($el) => {
                expect(range_array).to.include($el.text().split(delete_all_after_character)[0])
            })
    } else {
        cy.xpath(locator)
            .eq(index)
            .should(($el) => {
                expect(range_array).to.include($el.text().split(delete_all_after_character)[0])
            })
    }
}

export function check_element_contains_text_is_visible(locator, text, xpath = false, wait_time = 8, index = 0) {
    if (!xpath) {
        cy.get(locator, {timeout: wait_time * 1000}).eq(index).contains(text).should(`be.visible`, wait_time)
    } else {
        cy.xpath(locator).eq(index).contains(text).should(`be.visible`, wait_time)
    }
}

export function check_placeholder_text(locator, text, xpath = false) {
    if (!xpath) {
        cy.get(locator).invoke('attr', 'placeholder').should('contain', text)
    } else {
        cy.xpath(locator).invoke('attr', 'placeholder').should('contain', text)
    }
}

export function verify_sm_message_shown(message) {
    check_element_contains_text_is_visible('body', message)
}

export function check_element_is_enabled(locator, index = 0, xpath = false) {
    if (!xpath) {
        cy.get(locator).eq(index).then(($ell) => {
            expect($ell).not.to.be.disabled
        })
    } else {
        cy.xpath(locator).eq(index).then(($ell) => {
            expect($ell).not.to.be.disabled
        })
    }
}

export function check_element_is_disabled(locator, index = 0, xpath = false) {
    if (!xpath) {
        cy.get(locator).eq(index).then(($ell) => {
            expect($ell).to.be.disabled
        })
    } else {
        cy.xpath(locator).eq(index).then(($ell) => {
            expect($ell).to.be.disabled
        })
    }
}

export function check_element_is_visible(locator, index = 0, xpath = false) {
    if (!xpath) {
        cy.get(locator).eq(index).then(($ell) => {
            expect($ell).to.be.visible
        })
    } else {
        cy.xpath(locator).eq(index).then(($ell) => {
            expect($ell).to.be.visible
        })
    }
}

export function check_element_is_not_exist(locator, xpath = false) {
    if (!xpath) {
        cy.get(locator).should('not.exist');
    } else {
        cy.xpath(locator).should('not.exist');
    }
}

export function wait_for_element_is_not_exist(locator, wait_time = 5, xpath = false, index =0) {
    if (!xpath) {
        cy.get(locator, {timeout: wait_time * 1000}).eq(index).should('not.exist', wait_time* 1000);
    } else {
        cy.xpath(locator, {timeout: wait_time * 1000}).eq(index).should('not.exist', wait_time);
    }
}
/*
//Alternative
export function wait_for_element_is_not_exist(locator, xpath = false, index = 0) {
    if (!xpath) {
        cy.waitUntil(function() {
            return cy.get(locator).eq(index).should('not.exist');
        })

    } else {
        cy.waitUntil(function() {
            return cy.xpath(locator).eq(index).should('not.exist');
        })
    }
}*/

export function check_radiobutton_is_selected(locator, index = 0, xpath = false) {
    if (!xpath) {
        cy.get(locator).eq(index).then(($ell) => {
            expect($ell).to.be.checked
        })
    } else {
        cy.xpath(locator).eq(index).then(($ell) => {
            expect($ell).to.be.checked
        })
    }
}

export function check_radiobutton_is_not_selected(locator, index = 0, xpath = false) {
    if (!xpath) {
        cy.get(locator).eq(index).then(($ell) => {
            expect($ell).not.to.be.checked
        })
    } else {
        cy.xpath(locator).eq(index).then(($ell) => {
            expect($ell).not.to.be.checked
        })
    }
}

export function click_button(button) {
    return cy.get(`button`, {timeout: 5 * 1000}).contains(button).click({force: true})
}

export function check_element_is_present(locator, index = 0, xpath = false) {
    cy.get('body').then(($body) => {
        if ($body.find(locator).eq(index).length > 0) {
            expect(`Element is present`).to.equal(`Element is present`)
        } else {
            expect(`Element is present`).to.equal(`Element is NOT present`)
        }
    })
}

export function check_element_is_absent(locator, index = 0, xpath = false) {
    if (!xpath){
        cy.get('body').then(($body) => {
            if ($body.find(locator).eq(index).length > 0) {
                expect(`Element is NOT present`).to.equal(`Element is present`)
              } else {
                expect(`Element is NOT present`).to.equal(`Element is NOT present`)
                }
            })
        }
        /*else {
            cy.get('body').then(($body) => {
                if ($body.find(locator).eq(index).length > 0) {
                    expect(`Element is NOT present`).to.equal(`Element is present`)
                } else {
                    expect(`Element is NOT present`).to.equal(`Element is NOT present`)
                }
            })
        }*/
}

export function turn_on_switcher(locator, turn_on = true, index = 0, xpath = false) {
    if (!xpath) {

        cy.get(locator.toString()).eq(index).then($aria => {
            if (turn_on.toString() != $aria.attr('aria-checked')) {
                cy.get(locator.toString()).eq(index).click()
            } else {
                expect(`Switcher is turned ON = ${turn_on}`).to.equal(`Switcher is turned ON = ${turn_on}`)
            }
        })
    }
    else{
        cy.xpath(locator.toString()).eq(index).then($aria => {
            expect(turn_on.toString() == $aria.attr('aria-checked')).to.exist
        })
    }
}

export function is_switcher_checked(locator, checked = true, index = 0, xpath = false) {
    if (!xpath) {
        cy.get(locator.toString()).eq(index).then($aria => {
            expect(checked.toString() == $aria.attr('aria-checked')).to.exist
        })
    } else {
        cy.xpath(locator.toString()).eq(index).then($aria => {
            expect(checked.toString() == $aria.attr('aria-checked')).to.exist
        })

    }
}

export function validateUrlShouldContain(expectedString) {
    cy.url().should('include', expectedString)
}

export function soft_wait_for_element(locator, wait_time = 5) {
    var i;
    for (i = 0; i < wait_time; i++) {
        cy.get('body').then((body) => {
            if (body.find(locator).length > 0) {
                cy.log(`'${locator}' element was found.`);
            } else {
                setTimeout(body.find(locator).length, 1000);
                cy.log(`Waited for '${locator}' element for ${i} seconds.`);
            }
        });
    }
}

export function wait_for_element(locator, wait_time = 5, xpath = false, index = 0, last = false) {
    if (!xpath) {
        if (last) {
            cy.get(locator, {timeout: wait_time * 1000}).last().should('be.visible', wait_time)
        } else {
            cy.get(locator, {timeout: wait_time * 1000}).eq(index).should('be.visible', wait_time)

        }
    } else {
        if (last) {
            cy.xpath(locator).last().should('be.visible', wait_time * 1000)
        } else {
            cy.xpath(locator).eq(index).should('be.visible', wait_time * 1000)
        }
    }
}

export function wait_for_element_existing(locator, wait_time = 5, xpath = false, index = 0, last = false) {
    if (!xpath) {
        if (last) {
            cy.get(locator, {timeout: wait_time * 1000}).last().should('exist', wait_time)
        } else {
            cy.get(locator, {timeout: wait_time * 1000}).eq(index).should('exist', wait_time)

        }
    } else {
        if (last) {
            cy.xpath(locator).last().should('exist', wait_time * 1000)
        } else {
            cy.xpath(locator).eq(index).should('exist', wait_time * 1000)
        }
    }
}
export function wait_for_element_is_absent(locator, wait_time = 5, xpath = false, index = 0) {
    if (!xpath) {
        cy.get(locator, {timeout: wait_time * 1000}).eq(index).should('not.be.visible', wait_time * 1000);
    } else {
        cy.xpath(locator).eq(index).should('not.be.visible', wait_time * 1000);
    }
}

// See more details about "waitUntil"  function here: https://www.npmjs.com/package/cypress-wait-until
export function wait_until(locator, wait_time = 5) {
    cy.waitUntil(() => cy.get(locator, {timeout: wait_time * 1000}).should(`be.visible`), {
        errorMsg: `'${locator}' element is not found!`, // overrides the default error message
        timeout: wait_time * 1000, // waits up to 2000 ms, default to 5000
        interval: 500 // performs the check every 500 ms, default to 200
    });
}

export function check_dropdown_option_is_selectable(locator, option) {
    cy.get(locator).select(option).should('have.value', option)
}

export function scroll_into_view(locator, index = 0, xpath = false) {
    if (!xpath) {
        cy.xpath(locator).eq(index).scrollIntoView()
    } else {
        cy.get(locator).eq(index).scrollIntoView()
    }
}

export function replaceAll(string, search, replace) {
    // if(string.indexOf(search) !== -1) {
    //     return string.split(search).join(replace);
    // }
    return string.split(search).join(replace);
}

export function get_utc_date_time({change_seconds = 0, change_days = 0, get_date_not_time = true}) {
    var today = new Date();

    today.setTime(today.getTime() + change_seconds * 1000);
    today.setDate(today.getDate() + change_days);

    const dd = String(today.getUTCDate()).padStart(2, '0');
    const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = today.getUTCFullYear();

    const hh = String(today.getUTCHours()).padStart(2, '0');
    const min = String(today.getUTCMinutes()).padStart(2, '0');
    const ss = String(today.getUTCSeconds()).padStart(2, '0');

    return get_date_not_time ? `${yyyy}-${mm}-${dd}` : `${hh}:${min}:${ss}`;
}

export function getDate(change_days = 0) {
    var today = new Date();
    today.setDate(today.getDate() + change_days);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}

export function getUTCDate(change_days = 0, time_format = `yyyy-mm-dd`) {
    var today = new Date();
    today.setDate(today.getDate() + change_days);
    const dd = String(today.getUTCDate()).padStart(2, '0');
    const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = today.getUTCFullYear();

    return time_format == `yyyy-mm-dd` ? `${yyyy}-${mm}-${dd}` : `${mm}/${dd}/${yyyy}`;
}

export function getTime(change_seconds = 0) {
    var now = new Date();
    now.setTime(now.getTime() + change_seconds * 1000);
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

export function getUTCTime(change_seconds = 0) {
    var now = new Date();
    now.setTime(now.getTime() + change_seconds * 1000);
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const mm = String(now.getUTCMinutes()).padStart(2, '0');
    const ss = String(now.getUTCSeconds()).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

export var consoleStorage = [];

console.log = function (msg) {
    consoleStorage.push(msg);
    console.warn(msg); // if you need to print the output
};

export function find_in_console(text_to_find) {
    //read console record by record
    var text = ``;
    consoleStorage.forEach(msg => {
        if (msg.indexOf(text_to_find) >= 0) {
            cy.log(`msg is: ${msg}`);
            text = msg
        }
    });
    return text
}

export function get_text_in_quotes(str, quote = `"`) {
    var singleQuoted = str.match(/"(.*?)"/g);
    return singleQuoted
}

export function get_quoted_data_from_console(search) {
    const console_message = find_in_console(search);
    return get_text_in_quotes(console_message)
}

export function random_organization_name() {
    const name = `${faker.fake("{{finance.accountName}}")}_${faker.random.number({
        'min': 0,
        'max': 100000000
    })}`;
    return name
}

export function random_number() {
    const name = `${faker.random.number({
        'min': 0,
        'max': 100000000
    })}`;
    return name
}

// example of using:
/*
waitForVariable('someVariable', function() {
  // do something here now that someVariable is defined
});
*/
export function waitForVariable(variable, callback) {
    var interval = setInterval(function () {
        if (variable) {
            clearInterval(interval);
            callback();
        }
    }, 200);
}

export function check_ifarme_elemet_text(element_locator, element_text, index = 0, xpath = false, iframe_locator = `.zoid-component-frame`) {
    if (xpath) {
        cy.iframe(iframe_locator)
            .xpath(element_locator)
            .eq(0)
            .contains(element_text)
            .scrollIntoView()
            .should(`exist`, 30);
    } else {
        cy.iframe(iframe_locator)
            .find(element_locator)
            .eq(0)
            .contains(element_text)
            .scrollIntoView()
            .should(`exist`, 30);
    }

    // cy.get(iframe_locator, {timeout: 40 * 1000})
    //     .should('exist')
    //     .get(iframe_locator, {timeout: 40 * 1000})
    //     .then(($iframe) => {
    //         const $body = $iframe.contents().find('body')[0];
    //         // Look for the new text in the preview
    //         cy.wrap($body)
    //             .find(element_locator, {timeout: 40 * 1000})
    //             .eq(index)
    //             .contains(element_text)
    //             .should('exist')
    //     })
}

export function wait_for_ifarme_elemet(element_locator, wait_time, index = 0, xpath = false, iframe_locator = `.zoid-component-frame`) {
    if (xpath) {
        cy.iframe(iframe_locator)
            .xpath(element_locator)
            .should('be.visible', wait_time)
            .eq(index)
            .scrollIntoView()
    } else {
        cy.iframe(iframe_locator)
            .find(element_locator, {timeout: wait_time * 1000})
            .eq(index)
            .should('be.visible', wait_time)
            .scrollIntoView()
    }
}

import {Env} from '../../../Config'

const url_link = {
    // host: Env.publicHost || 'http://localhost:8000'
    host: Env.publicHost || Env.environmentPublicLink
};

export function create_public_url({org_name, init_name, story_name, idea_submission_form = false}) {
    var url;
    const initiative_name_temp = replaceAll(init_name, ' ', '-');
    const initiative_name = replaceAll(initiative_name_temp, '_', '-').toLocaleLowerCase();
    if (story_name) {
        const story_name_url = replaceAll(story_name, ' ', '-');
        url = `${url_link.host}/o/${org_name}/i/${initiative_name}/s/${story_name_url}`;
    } else if (idea_submission_form){
        url = `${url_link.host}/o/${org_name}/i/${initiative_name}-idea`;
    }
    else{
        url = `${url_link.host}/o/${org_name}/i/${initiative_name}`;
    }
    return String(url)
}

export function create_slug_from_name(name) {
    var slug;
    slug = replaceAll(name, ' ', '-');
    cy.log(`slug 1 = ${slug}`);
    slug = replaceAll(slug, '_', '-');
    cy.log(`slug 2 = ${slug}`);
    slug = slug.toLocaleLowerCase();
    cy.log(`slug 3 = ${slug}`);
    return String(slug)
}

export function select_dropdown_option(dropdown_data_test_id, option){
    cy.xpath(`//div[@data-test-id='${dropdown_data_test_id}']//div[contains(@class, '-control')]`).click()
    .wait(1000)
    .xpath(`//div[@data-test-id='${replaceAll(option, " ", "-")}']`).click();
}


export function select_dropdown_option_fund(dropdown_data_test_id, option){
    cy.xpath(`//div[@data-test-id='${dropdown_data_test_id}']//div[contains(@class, '-control')]`).click()
    cy.wait(1000)
    cy.xpath(`//div[contains(@data-test-id, "'${replaceAll(option, " ", "-")}'+%")]`).click();
}

export function close_copy_to_clipboard_pop_up(): void{
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('DISABLED WINDOW PROMPT');
    });
}

export function scroll_bottom_public_page_and_search_element({locator}){
    cy.intercept(`POST`, `/graphql`).as(`graphqlScrollRequest`); // Intercept all requests to '/graphql'
    cy.wait(2000);
    cy.scrollTo(`bottom`); // Scroll down the page
    cy.wait(`@graphqlScrollRequest`); // Wait for GraphQL query to complete
    cy.xpath(locator, { timeout: 10000 }).should(`be.visible`); //The Element should be visible
}

export function select_option_by_text_in_dropdown(locator, option_text) {
    cy.get(locator)
        .select(option_text);
}