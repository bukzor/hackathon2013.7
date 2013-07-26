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
            assert.deepEqual(['eval'], bogolisp.parse([]));
        });
        it('Parses print statement', function() {
            assert.deepEqual(
                ['eval', ['print', ['+', '1', '2']]],
                bogolisp.parse(['(', 'print', '(', '+', '1', '2', ')', ')'])
            );
        });
        it('Parses 2 print statements', function() {
            assert.deepEqual(
                ['eval', ['print', 'foo'], ['print', 'bar']],
                bogolisp.parse(['(', 'print', 'foo', ')', '(', 'print', 'bar', ')'])
            );
        });
        it('Parses nested stuff', function() {
            assert.deepEqual(
                ['eval', [[[],[]]]],
                bogolisp.parse(['(', '(', '(', ')', '(', ')', ')', ')'])
            );
        });
    });

    describe('Bogolisp\'s Interpreter', function() {
        it('Can do nothing', function() {
            assert.equal(undefined, bogolisp.interpret([]));
            assert.equal(undefined, bogolisp.interpret(['eval']));
        });
        it('Can number', function() {
            assert.equal(1, bogolisp.interpret('1'));
            assert.equal(1.5, bogolisp.interpret('1.5'));
        });
        it('Can string', function() {
            assert.equal('1', bogolisp.interpret(['quote', '1']));
            assert.equal('(', bogolisp.interpret(['quote', '(']));
            // TODO: lexer should able to produce this syntax tree
            assert.equal(')', bogolisp.interpret(['quote', '(', ')'])); // wat
        });
        it('Can list', function() {
            assert.deepEqual(['+', '1', '2'], bogolisp.interpret(['list', '+', '1', '2']));
        });
        it('Can eval', function() {
            assert.equal(2, bogolisp.interpret(['eval', '1', '2']));
        });
        it('Can add', function() {
            assert.equal(6, bogolisp.interpret(['+', '1', '2', '3']));
            assert.equal(6, bogolisp.interpret(['eval', ['+', '1', '2', '3']]));
            assert.equal(6, bogolisp.interpret(['eval', 'fooooo', ['+', '1', '2', '3']]));
        });
        it('Can add (2)', function() {
            assert.equal(6, bogolisp.interpret(['+', '1', ['+', '2', '3']]));
        });
        it('Can log', sinon.test(function() {
            var consoleStub = this.stub(console, 'log');
            assert.equal(undefined, bogolisp.interpret(['log', 'foo', 'bar']));
            consoleStub.firstCall.calledWith('foo')
            consoleStub.secondCall.calledWith('bar')
        }));
    });
})();
