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
            assert.equal(6, bogolisp.interpret(['eval', ['quote', 'fooooo'], ['+', '1', '2', '3']]));
        });
        it('Can add (2)', function() {
            assert.equal(6, bogolisp.interpret(['+', '1', ['+', '2', '3']]));
        });
        it('Can log', sinon.test(function() {
            var consoleStub = this.stub(console, 'log');
            assert.equal(undefined, bogolisp.interpret(['log', ['quote', 'foo'], ['quote', 'bar']]));
            sinon.assert.calledWith(consoleStub, 'foo')
            sinon.assert.calledWith(consoleStub, 'bar')
            assert(consoleStub.firstCall.calledWith('foo'));
            assert(consoleStub.secondCall.calledWith('bar'));
        }));
        it('Can log and eval', sinon.test(function() {
            var consoleStub = this.stub(console, 'log');
            assert.equal(undefined, bogolisp.interpret(['log', ['+', '1', '2']]));
            sinon.assert.calledWith(consoleStub, 3)
        }));
        it('Errors on unknown operators', function() {
            assert.throw(
                function(){bogolisp.interpret(['foobar'])},
                Error,
                'unknown operator: \'foobar\''
            );
        });
        it('Errors on unknown identifiers', function() {
            assert.throw(
                function(){bogolisp.interpret(['+', 'foo'])},
                Error,
                'unknown identifier: \'foo\''
            );
        });
    });

    describe('Lang Plugin', function() {
        /**
         * Small helper function to create <script> elements
         */
        var createScriptWithMimeAndContent = function(mime, content) {
            var script = document.createElement('script');
            script.type = mime;
            script.text = content;
            return script;
        };

        var assertElementEqual = function(expected, actual) {
            assert.equal(expected.outerHTML, actual.outerHTML);
        };

        describe('LangPlugin\'s runLang', function() {
            it('Is called properly', function() {
                var container = document.createElement('div');
                container.innerHTML = '<script type="mymime">woo</script>';

                var run = sinon.spy();
                langPlugin.runLang(run, 'mymime', container);
                sinon.assert.calledWith(run, 'woo');
            });
        });

        describe('LangPlugin\'s getScriptsForMimeType', function() {
            it('Spots the scripts', function() {
                var container = document.createElement('div');
                container.innerHTML = [
                    '<div>',
                        '<script type="mymime">my script</script>',
                        '<p>blabla</p>',
                        '<script type="notmymime">not parsed</script>',
                        '<marquee>',
                            '<script type="mymime">rocks</script>',
                        '</marquee>',
                    '</div>'
                ].join('');

                var firstExpectedScript = createScriptWithMimeAndContent('mymime', 'my script');
                var secondExpectedScript = createScriptWithMimeAndContent('mymime', 'rocks');

                var actualScripts = langPlugin.getScriptsForMimeType('mymime', container);
                assertElementEqual(firstExpectedScript, actualScripts[0]);
                assertElementEqual(secondExpectedScript, actualScripts[1]);
            });
        });

        describe('LangPlugin\'s getScriptText', function() {
            it('Can load inline script', function() {
                assert.equal(
                    'you win',
                    langPlugin.getScriptText(createScriptWithMimeAndContent('mymime', 'you win'))
                );
            });

            it('Can load remote script', function() {
                var script = document.createElement('script');
                script.src = 'data/bogobogo.bl';

                assert.equal(
                    'bogo bogo\n',
                    langPlugin.getScriptText(script)
                );
            });
        });
    });
})();
