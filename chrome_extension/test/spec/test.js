/*global describe, it */
'use strict';

(function () {
    describe('Verify that our testing setup works properly', function () {
        it('should run a chai assertion here', function () {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });

    describe('Bogolisp\'s Lexer', function() {
        it('Returns empty token list for silly values', function() {
            assert.deepEqual([], bogolisp.lex(undefined));
            assert.deepEqual([], bogolisp.lex(null));
            assert.deepEqual([], bogolisp.lex(0));
            assert.deepEqual([], bogolisp.lex(''));
            assert.deepEqual([], bogolisp.lex(/regex/));
        });

        it('Tokenizes a print statement', function() {
            assert.deepEqual(
                ['(', 'print', '(', '+', '1', '2', ')', ')'],
                bogolisp.lex('(print (+\t1\n2)     ) \n\t')
            );
        });
    });

    describe('Bogolisp\'s Parse', function() {
        it('Parses Empty list', function() {
            assert.deepEqual([], bogolisp.parse([]));
        });
    });
})();
