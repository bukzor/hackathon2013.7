/**
 * This is our lexer namespace.
 */
var lexer = {};


String.prototype.in = function(str) {
    return (str.indexOf(this) !== -1);
};

/*
 * Convert a string into tokens. That's all.
 */
lexer.parse = function(str) {
    var isString = typeof str === 'string';
    if (!isString || (isString && str.length === 0)) {
        // Returns an empty list of tokens on non-string values and empty
        // strings.
        return [];
    }

    var i, tokens = [], curToken = '';

    var pushToken = function(){
        if (curToken !== '') {
            tokens.push(curToken);
            curToken = '';
        }
    }

    for (i=0; i < str.length; i++) {
        if (str[i].in(' \t\n')) {
            pushToken();
            continue
        } else if (str[i].in('()')) {
            pushToken();
            tokens.push(str[i]);
        } else {
            curToken += str[i];
        }
    }

    return tokens;
};
