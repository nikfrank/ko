'use strict';

var config = browser.params;

describe('DASH2PASCAL(NAME) View', function() {
    var page;

    beforeEach(function() {
        browser.get(config.baseUrl + 'URL');
        page = require('./NAME.po');
    });

    it('should take input or whatever', function() {
        //page.fancyInput.sendKeys(r);
        //expect(page.output.getText()).toBe(r);

        //page.fancyClear.click();
        //expect(page.output.getText()).toBe('');
    });
});
