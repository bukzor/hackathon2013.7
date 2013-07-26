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

bogolisp.Reference = function(identifier, scope) {
    if ( ! (this instanceof bogolisp.Reference) ) {
        return new bogolisp.Reference(identifier, scope)
    }
    this.scope = scope;
    this.identifier = identifier;
}

bogolisp.Reference.prototype.assign = function(value){
    this.scope[this.identifier] = value;
    return value
}

bogolisp.Reference.prototype.value = function(){
    var result = this.scope && this.scope[this.identifier]
    if ( result === undefined ) {
        throw new Error("unknown identifier: '" + identifier + "'");
    } else {
        return result;
    }
}

/**
 * Takes a statement (as a syntax tree) and executes it.
 */
bogolisp.interpret = function(statement, scope) {
    var result = bogolisp.interpret2(statement, scope);
    if (result instanceof bogolisp.Reference) {
        return result.value();
    } else {
        return result;
    }
};


bogolisp.interpret2 = function(statement, scope) {
    var i, operator, operands, result, tmp;

    // Numeric values.
    if (statement.constructor === String) {
        result = Number(statement);
        if ( isNaN(result) ) {
            return bogolisp.Reference(statement, scope);
        } else {
            return result;
        };
    }

    operator = statement[0];
    operands = statement.slice(1);
    if (operator === undefined || operator === '#') {
        return undefined;
    } else if (operator === 'quote') {
        return operands[operands.length-1];
    } else if (operator === 'list') {
        return operands;
    } else if (operator === '=') {
        for (i=0; i<operands.length; i=i+2) {
            tmp = bogolisp.interpret2(operands[i], scope)
            if ( ! (tmp instanceof bogolisp.Reference)) {
                // TODO: assert
                throw new Error('Cannot assign to a value: ' + tmp)
            };
            result = operands[i+1];
            if (result === undefined) {
                throw new Error("Wrong number of arguments to assignment: " + operands.length);
            };
            result = bogolisp.interpret(result);
            tmp.assign(result);
        };
        return result;
    } else if (operator === 'function') {
        scope[operands[0]]  = statement.slice(0);
        scope[operands[0]].push(scope);
        return operands[0]; // to make IIFE work correctly
    } else if (operator === '.') {
        result = bogolisp.Reference(operands[0], scope);
        for (i=1; i<operands.length; i++) {
            result = bogolisp.Reference(operands[i], result.value());
        };
        return result
    } else if (operator === '[]') {
        result = bogolisp.Reference(operands[0], scope);
        for (i=1; i<operands.length; i++) {
            result = bogolisp.Reference(
                    scope[operands[i]],
                    result.value()
            );
        };
        return result
    }


    // All other operators interpret their operands.
    for (i=0; i < operands.length; i++) {
        operands[i] = bogolisp.interpret(operands[i]);
    }

   
    // More operators.
    if (operator === 'eval') {
        result = operands[operands.length-1];
    } else if (operator === '+') {
        var result = operands[0];
        for (i=1; i<operands.length; i++) {
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
