/**
 * This is our bogolisp namespace.
 */
var bogolisp = {};


/**
 * Hey, it's HACKATHON
 */
String.prototype.in = function(str) {
    return (str.indexOf(this) !== -1);
};

/*
 * Convert a string into tokens. That's all. LEX IT!
 */
bogolisp.lex = function(str) {
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

/**
 * Takes a list of tokens and return a (abstract?) syntax tree
 */
bogolisp.parse = function(tokens) {
    var i,
        frames = [],
        tree = ['eval'];

    for (i=0; i < tokens.length; i++) {
        var token = tokens[i];
        if ( token === '(' ) {
            frames.push(tree);
            tree = [];
        } else if ( token === ')' ) {
            token = tree;
            tree = frames.pop();
            tree.push(token);
        } else {
            tree.push(token);
        }
    }

    return tree;
};

/**
 * Takes a statement (as a syntax tree) and executes it.
 */
bogolisp.interpret = function(statement) {
    var j, operator, operands, result;

    if (statement.constructor === String) {
        return Number(statement);
    }

    operator = statement[0];
    operands = statement.slice(1);
    if (operator === undefined) {
        return undefined;
    } else if (operator === 'eval') {
        for (j=0; j<operands.length; j++) {
            result = bogolisp.interpret(operands[j]);
        }
    } else if (operator === 'quote') {
        result = operands[operands.length-1];
    } else if (operator === 'list') {
        result = operands;
    } else if (operator === '+') {
        result = 0;
        for (j=0; j<operands.length; j++) {
            result += bogolisp.interpret(operands[j]);
        }
    } else if (operator === 'log') {
        for (j=0; j<operands.length; j++) {
            console.log(operands[j]);
        }
    } else {
        debugger;
        throw new Error("unknown operator: '" + operator + "'");
    }

    return result;
};
