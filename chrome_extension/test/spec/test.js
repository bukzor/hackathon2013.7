/*global describe, it */
'use strict';

(function () {
    describe('Verify that our testing setup works properly', function () {
        it('should run a chai assertion here', function () {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });

    describe('Lexer', function() {
        it('Returns empty token list for silly values', function() {
            assert.deepEqual([], lexer.parse(undefined));
            assert.deepEqual([], lexer.parse(null));
            assert.deepEqual([], lexer.parse(0));
            assert.deepEqual([], lexer.parse(''));
            assert.deepEqual([], lexer.parse(/regex/));
        });
    });
})();
