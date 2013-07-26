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
    var i, operator, operands, result;

    // Numeric values.
    if (statement.constructor === String) {
        result = Number(statement);
        if ( isNaN(result) ) {
            throw new Error("unknown identifier: '" + statement + "'");
        } else {
            return result;
        };
    }

    operator = statement[0];
    operands = statement.slice(1);
    if (operator === undefined) {
        return undefined;
    } else if (operator === 'quote') {
        return operands[operands.length-1];
    } else if (operator === 'list') {
        return operands;
    }

    // All other operators interpret their operands.
    for (i=0; i<operands.length; i++) {
        operands[i] = bogolisp.interpret(operands[i]);
    }
    if (operator === 'eval') {
        result = operands[operands.length-1];
    } else if (operator === '+') {
        result = 0;
        for (i=0; i<operands.length; i++) {
            result += operands[i];
        }
    } else if (operator === 'log') {
        for (i=0; i<operands.length; i++) {
            console.log(operands[i]);
        }
    } else {
        throw new Error("unknown operator: '" + operator + "'");
    }

    return result;
};

/**
 * Takes a bogolisp script and evaluate it.
 */
bogolisp.eval = function(script) {
    return bogolisp.interpret(bogolisp.parse(bogolisp.lex(script)));
};