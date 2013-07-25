/*global describe, it */
'use strict';

(function () {
    describe('Verify that our testing setup works properly', function () {
        it('should run a chai assertion here', function () {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });

    describe('Lexer', function() {
        it('is included in the test suite', function() {
            assert.equal("I'm here", lexer);
        })
    });
})();
