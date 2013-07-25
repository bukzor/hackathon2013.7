/**
 * This is our lexer namespace.
 */
var lexer = {};

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
};
