/*
* Melissa Iori
* Compiler
* CMPT 432
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Ensure .js is working. Also makes things prettier.
document.getElementById('footer').style.color = "blue";
//Global array of tokens.
var tokens = [];
//Flag for verbose mode.
var verboseMode = true;
//The Token class.
//A token has a kind (digit, openBlock, keywordIf), a name (the actual characters it consists of), and a line number on which it was found.
//Example: The string "while" is a token of type T_keywordWhile and the string "6" is a token of type T_digit.
var Token = (function () {
    function Token(tokenKind, tokenName, tokenLineNumber) {
        this.tokenKind = tokenKind;
        this.tokenName = tokenName;
        this.tokenLineNumber = tokenLineNumber;
        this.tokenKind = tokenKind; //enum
        this.tokenName = tokenName;
        this.tokenLineNumber = tokenLineNumber;
    }
    return Token;
})();
//The SymbolTableEntry class.
var SymbolTableEntry = (function () {
    function SymbolTableEntry(symbol) {
        this.symbol = symbol;
        this.symbol = symbol;
    }
    return SymbolTableEntry;
})();
//The concrete syntax tree class.
var ConcreteSyntaxTree = (function () {
    function ConcreteSyntaxTree(root, current) {
        this.root = root;
        this.current = current;
        this.root = root;
        this.current = current;
    }
    ConcreteSyntaxTree.prototype.addBranchNode = function (nodeName) {
        var n = new CSTBranchNode(nodeName, null, []);
        if (n.nodeName === "Program") {
            this.root = n;
            this.current = this.root;
        }
        else {
            n.parent = this.current;
            n.parent.children.push(n);
            this.current = n;
        }
    };
    ;
    ConcreteSyntaxTree.prototype.addLeafNode = function (nodeName, nodeVal) {
        var n = new CSTLeafNode(nodeName, nodeVal, null, []);
        if (n.nodeName === "Program") {
        }
        else {
            n.parent = this.current;
            n.parent.children.push(n);
        }
    };
    ;
    ConcreteSyntaxTree.prototype.backtrack = function () {
        this.current = this.current.parent;
    };
    ;
    ConcreteSyntaxTree.prototype.toString = function (rootNode) {
        if (rootNode.children.length > 0) {
            for (var i = 0; i < rootNode.children.length; i++) {
                return this.toString(rootNode.children[i]) + "\\" + rootNode.children[i].nodeName;
            }
        }
        else {
            return rootNode.nodeName;
        }
    };
    ;
    return ConcreteSyntaxTree;
})();
//The concrete syntax tree node class.
var CSTNode = (function () {
    function CSTNode(nodeName, parent, children) {
        this.nodeName = nodeName;
        this.parent = parent;
        this.children = children;
        this.nodeName = nodeName;
        this.parent = parent;
        this.children = children;
    }
    return CSTNode;
})();
//The concrete syntax tree branch node class. Each represents a nonterminal.
var CSTBranchNode = (function (_super) {
    __extends(CSTBranchNode, _super);
    function CSTBranchNode(nodeName, parent, children) {
        _super.call(this, nodeName, parent, children);
        this.nodeName = nodeName;
        this.parent = parent;
        this.children = children;
    }
    return CSTBranchNode;
})(CSTNode);
//The concrete syntax tree leaf node class. Each represents a terminal.
var CSTLeafNode = (function (_super) {
    __extends(CSTLeafNode, _super);
    function CSTLeafNode(nodeName, nodeVal, parent, children) {
        _super.call(this, nodeName, parent, children);
        this.nodeName = nodeName;
        this.nodeVal = nodeVal;
        this.parent = parent;
        this.children = children;
        this.nodeVal = nodeVal;
    }
    return CSTLeafNode;
})(CSTNode);
//The deterministic finite automaton (used like a matrix)
//Gives paths from state to state for accepted strings of characters.
var DFA = { 's1': { '+': 's2',
        '"': 's3',
        '\ ': 's4',
        '$': 's5',
        '=': 's6',
        '!': 's7',
        '{': 's8',
        '}': 's9',
        'a': 's10',
        'b': 's58',
        'c': 's10',
        'd': 's10',
        'e': 's10',
        'f': 's71',
        'g': 's10',
        'h': 's10',
        'i': 's21',
        'j': 's10',
        'k': 's10',
        'l': 's10',
        'm': 's10',
        'n': 's10',
        'o': 's10',
        'p': 's45',
        'q': 's10',
        'r': 's10',
        's': 's65',
        't': 's76',
        'u': 's10',
        'v': 's10',
        'w': 's51',
        'x': 's10',
        'y': 's10',
        'z': 's10',
        '0': 's11',
        '1': 's11',
        '2': 's11',
        '3': 's11',
        '4': 's11',
        '5': 's11',
        '6': 's11',
        '7': 's11',
        '8': 's11',
        '9': 's11',
        '\(': 's12',
        '\)': 's13'
    },
    's6': { '=': 's14', 'accept': 'T_assign' },
    's7': { '=': 's15', 'accept': 'T_notEqualTo' },
    's10': { 'accept': 'T_char' },
    's2': { 'accept': 'T_intop' },
    's3': { 'accept': 'T_quoteString' },
    's4': { 'accept': 'T_space' },
    's5': { 'accept': 'T_EOF' },
    's8': { 'accept': 'T_openBlock' },
    's9': { 'accept': 'T_closeBlock' },
    's11': { 'accept': 'T_digit' },
    's12': { 'accept': 'T_openList' },
    's13': { 'accept': 'T_closeList' },
    's14': { 'accept': 'T_boolop' },
    's15': { 'accept': 'T_boolop' },
    's21': { 'f': 's44', 'n': 's56', 'accept': 'T_char' },
    's44': { 'accept': 'T_keywordIf' },
    's45': { 'r': 's46', 'accept': 'T_char' },
    's46': { 'i': 's47' },
    's47': { 'n': 's48' },
    's48': { 't': 's49' },
    's49': { 'accept': 'T_keywordPrint' },
    's51': { 'h': 's52', 'accept': 'T_char' },
    's52': { 'i': 's53' },
    's53': { 'l': 's54' },
    's54': { 'e': 's55' },
    's55': { 'accept': 'T_keywordWhile' },
    's56': { 't': 's57' },
    's57': { 'accept': 'T_typeInt' },
    's58': { 'o': 's59', 'accept': 'T_char' },
    's59': { 'o': 's60' },
    's60': { 'l': 's61' },
    's61': { 'e': 's62' },
    's62': { 'a': 's63' },
    's63': { 'n': 's64' },
    's64': { 'accept': 'T_typeBoolean' },
    's65': { 't': 's66', 'accept': 'T_char' },
    's66': { 'r': 's67' },
    's67': { 'i': 's68' },
    's68': { 'n': 's69' },
    's69': { 'g': 's70' },
    's70': { 'accept': 'T_typeString' },
    's71': { 'a': 's72', 'accept': 'T_char' },
    's72': { 'l': 's73' },
    's73': { 's': 's74' },
    's74': { 'e': 's75' },
    's75': { 'accept': 'T_boolFalse' },
    's76': { 'r': 's77', 'accept': 'T_char' },
    's77': { 'u': 's78' },
    's78': { 'e': 's79' },
    's79': { 'accept': 'T_boolTrue' } //true
};
//Step 1
//Lexical analysis: Constructs tokens and filters whitespace and bogus characters.
//Takes in source code string, outputs array of tokens.
function lex(sourceCode) {
    tokens = getTokenStream(sourceCode);
    //Clear log area and print tokens + completion message
    document.getElementById('machine-code').innerHTML = "";
    if (tokens !== []) {
        if (verboseMode) {
            for (var i = 0; i < tokens.length; i++) {
                document.getElementById('machine-code').innerHTML += tokens[i].tokenName + " is a " + tokens[i].tokenKind + " on line " + tokens[i].tokenLineNumber + "<br />";
            }
        }
        document.getElementById('machine-code').innerHTML += "Lex complete!" + "<br />";
        //On to parse step
        parse();
    }
    else {
        document.getElementById('machine-code').innerHTML += "Lexical error!";
    }
}
//Traverses DFA to test whether a string is accepted or not
function getTokenStream(sourceCode) {
    //s1 is the start state
    var state = 's1';
    //Clear tokens
    var tokens = [];
    //Start with empty string
    var currentString = "";
    //Line number count starts at 1
    var lineNumber = 1;
    //Not currently reading in a "string literal"
    var stringMode = false;
    //For each source code character...
    for (var i = 0; i < sourceCode.length; i++) {
        //Get the character and the one after it
        var c = sourceCode.charAt(i);
        var cnext = sourceCode.charAt(i + 1);
        //If newline, just move on to a new line
        if (c == "\n") {
            lineNumber++;
        }
        else {
            //Based on current state and current character, get the next state
            state = DFA[state][c];
            //If there is no next state, the string is illegal
            if (typeof state === "undefined") {
                var t = new Token("T_unknown", currentString, lineNumber);
                tokens.push(t);
                return tokens;
            }
            //If this is an accepting state and there is no path to continue from here, create a token
            if ((DFA[state]['accept'] !== null) && (typeof DFA[state][cnext] === "undefined" || cnext === '' || cnext === ' ')) {
                //&& DFA[state][cnext] === null && DFA[state][cnext]['accept'] === null //try-catch here
                //Add to current string
                currentString += c;
                //Other check for illegality
                if (typeof DFA[state] !== "undefined") {
                    //If found a space and NOT reading in a "string literal"
                    if (DFA[state]['accept'] === "T_space" && !stringMode) {
                    }
                    else if (DFA[state]['accept'] === "T_quoteString") {
                        //Make a new token and add it
                        var t = new Token(DFA[state]['accept'], currentString, lineNumber);
                        //If string mode is off, set it to on. If string mode is on, set it to off.
                        stringMode = stringMode ? false : true;
                        tokens.push(t);
                    }
                    else {
                        var t = new Token(DFA[state]['accept'], currentString, lineNumber);
                        tokens.push(t);
                    }
                }
                else {
                    var t = new Token("T_unknown", currentString, lineNumber);
                    tokens.push(t);
                    return tokens;
                }
                //Reset current string and go back to start state to look for more tokens
                currentString = "";
                state = 's1';
            }
            else {
                currentString += c;
            }
        }
    }
    return tokens;
}
//Step 2 - Input: tokens, Output: CST
//Parser ensures that syntax is correct
//Current token pointer in token array.
var currentToken = 0;
//String to be logged.
var logString = "";
//Number of programs parsed
var programCount = 0;
//Concrete syntax tree. One instance per program
var CST = new ConcreteSyntaxTree(null, null);
//Kick off the parse phase
function parse() {
    currentToken = 0;
    parseProgram();
    document.getElementById('machine-code').innerHTML += logString + "Parse complete!";
    logString = "";
    programCount = 0;
}
//Ensure a program contains a block and ends with an EOF.
//Continue to read in programs as long as there are more tokens after EOF.
function parseProgram() {
    //var CST = new ConcreteSyntaxTree(null, null);
    CST.addBranchNode("Program");
    parseBlock();
    if (match(["T_EOF"], false, false)) {
        programCount++;
        log("Program " + programCount + "<br />");
        log("Concrete Syntax Tree for Program " + programCount + ":<br />" + CST.toString(CST.root));
        CST = new ConcreteSyntaxTree(null, null);
        if (currentToken < tokens.length) {
            parseProgram();
        }
    }
    else {
        log("Parse Error - Missing End of Program marker, '$'.");
    }
}
//Ensure a block starts with an open block delimiter, contains a statement list, and ends with a close block delimiter.
function parseBlock() {
    CST.addBranchNode("Block");
    if (match(["T_openBlock"], false, false)) {
        parseStatementList();
        if (match(["T_closeBlock"], false, false)) {
            log("Block");
        }
        else {
            log("Parse Error - Expected '}' to end block, got " + tokens[currentToken].tokenName);
        }
    }
    else {
        log("Parse Error - Expected '{' to start a block, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure a statement list contains zero or more statements by checking for first sets and using tail end recursion
function parseStatementList() {
    CST.addBranchNode("StatementList");
    if (match(["T_keywordPrint", "T_char", "T_typeInt", "T_typeString", "T_typeBoolean", "T_keywordWhile", "T_keywordIf", "T_openBlock"], true, false)) {
        parseStatement();
        parseStatementList();
    }
    else {
        //nothing, no statement. epsilon
        return;
    }
    log("Statement List");
    CST.backtrack();
}
//Ensure a statement is one of the statement types by what it begins with
function parseStatement() {
    CST.addBranchNode("Statement");
    if (match(["T_keywordPrint"], true, false)) {
        parsePrintStatement();
        log("Statement");
    }
    else if (match(["T_char"], true, false)) {
        parseAssignmentStatement();
        log("Statement");
    }
    else if (match(["T_typeInt"], true, false) || match(["T_typeString"], true, false) || match(["T_typeBoolean"], true, false)) {
        parseVarDeclStatement();
        log("Statement");
    }
    else if (match(["T_keywordWhile"], true, false)) {
        parseWhileStatement();
        log("Statement");
    }
    else if (match(["T_keywordIf"], true, false)) {
        parseIfStatement();
        log("Statement");
    }
    else if (match(["T_openBlock"], true, false)) {
        parseBlock();
        log("Statement");
    }
    else {
        log("Parse Error - Invalid statement, cannot begin with " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure a print statement contains the print keyword, opens a list, contains an expression to be printed, and closes its list.
function parsePrintStatement() {
    CST.addBranchNode("PrintStatement");
    if (match(["T_keywordPrint"], false, false)) {
        if (match(["T_openList"], false, false)) {
            parseExpr();
            if (match(["T_closeList"], false, false)) {
                log("Print Statement");
            }
            else {
                log("Parse Error - Expected ')' to end print statement, got " + tokens[currentToken].tokenName);
            }
        }
        else {
            log("Parse Error - Expected '(' for print statement, got " + tokens[currentToken].tokenName);
        }
    }
    else {
        log("Parse Error - Expected 'print' to begin print statement, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure an assignment statement contains an ID, the assignment operator, and an expression.
function parseAssignmentStatement() {
    CST.addBranchNode("AssignmentStatement");
    parseID();
    if (match(["T_assign"], false, false)) {
        parseExpr();
        log("Assignment Statement");
    }
    else {
        log("Parse Error - Expected = to assign ID to something, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure a variable declaration contains one of the types and an ID.
function parseVarDeclStatement() {
    CST.addBranchNode("VariableDeclarationStatement");
    if (match(["T_typeInt", "T_typeString", "T_typeBoolean"], false, false)) {
        parseID();
        log("Variable Declaration");
    }
    else {
        log("Parse Error - Expected type declaration 'int', 'string' or 'boolean', got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure a while statement contains the while keyword, a boolean expression test, and a block.
function parseWhileStatement() {
    CST.addBranchNode("WhileStatement");
    if (match(["T_keywordWhile"], false, false)) {
        parseBooleanExpr();
        parseBlock();
        log("While Statement");
    }
    else {
        log("Parse Error - Expected 'while' to begin while statement, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure an if statement contains the if keyword, a boolean expression test, and a block.
function parseIfStatement() {
    CST.addBranchNode("IfStatement");
    if (match(["T_keywordIf"], false, false)) {
        parseBooleanExpr();
        parseBlock();
        log("If Statement");
    }
    else {
        log("Parse Error - Expected 'if' to begin if statement, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure an expression is one of the valid types.
function parseExpr() {
    CST.addBranchNode("Expression");
    if (match(["T_digit"], true, false)) {
        parseIntExpr();
    }
    else if (match(["T_quoteString"], true, false)) {
        parseStringExpr();
    }
    else if (match(["T_openList"], true, false) || match(["T_boolTrue"], true, false) || match(["T_boolFalse"], true, false)) {
        parseBooleanExpr();
    }
    else if (match(["T_char"], true, false)) {
        parseID();
    }
    log("Expression");
    CST.backtrack();
}
//Ensure an integer expression starts with a digit, and optionally includes an integer operator and another expression. Must use lookahead to tell.
function parseIntExpr() {
    CST.addBranchNode("IntegerExpression");
    if (match(["T_digit"], true, false)) {
        if (match(["T_intop"], true, true)) {
            match(["T_digit"], false, false);
            if (match(["T_intop"], false, false)) {
                parseExpr();
                log("Integer Expression");
            }
            else {
                log("Parse Error - Expecting + in integer expression, got " + tokens[currentToken].tokenName);
            }
        }
        else if (match(["T_digit"], false, false)) {
            log("Integer Expression");
        }
    }
    else {
        log("Parse Error - Expecting digit to begin integer expression, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure a string expression contains an opening quote, a char list, and a closing quote.
function parseStringExpr() {
    CST.addBranchNode("StringExpression");
    if (match(["T_quoteString"], false, false)) {
        parseCharList();
        if (match(["T_quoteString"], false, false)) {
            log("String Expression");
        }
        else {
            log("Parse Error - Unterminated string literal");
        }
    }
    else {
        log("Parse Error - Expected \" to begin string, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure a boolean expression contains an open list delimiter, an expression, a boolean operator, another expression, and a close list delimiter.
//Or, it could be a true or a false.
function parseBooleanExpr() {
    CST.addBranchNode("BooleanExpression");
    if (match(["T_openList"], false, false)) {
        parseExpr();
        if (match(["T_boolop"], false, false)) {
            parseExpr();
            if (match(["T_closeList"], false, false)) {
                log("Boolean Expression");
            }
            else {
                log("Parse Error - Expected ')' to close boolean expression, got " + tokens[currentToken].tokenName);
            }
        }
        else {
            log("Parse Error - Missing boolean operator like == or !=, got instead " + tokens[currentToken].tokenName);
        }
    }
    else if (match(["T_boolTrue"], false, false) || match(["T_boolFalse"], false, false)) {
        log("Boolean Expression");
    }
    else {
        log("Parse Error - Expected boolean expression, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Ensure a char list is empty, or contains chars and/or spaces only.
function parseCharList() {
    CST.addBranchNode("CharList");
    if (match(["T_char"], false, false) || match(["T_space"], false, false)) {
        parseCharList();
    }
    else {
    }
    log("Character List");
    CST.backtrack();
}
//Ensure an ID is a char.
function parseID() {
    CST.addBranchNode("ID");
    if (match(["T_char"], false, false)) {
        log("ID");
    }
    else {
        log("Parse Error - Expected an ID a-z, got " + tokens[currentToken].tokenName);
    }
    CST.backtrack();
}
//Matches the current token based on kinds
//If noConsume is set, will not consume a token, just check for it
//If lookahead is set, will check the next character
function match(kinds, noConsume, lookahead) {
    for (var j = 0; j < kinds.length; j++) {
        if (lookahead && tokens[currentToken + 1].tokenKind === kinds[j]) {
            return true;
        }
        else {
            if (tokens[currentToken].tokenKind === kinds[j]) {
                if (!noConsume) {
                    CST.addLeafNode(tokens[currentToken].tokenKind, tokens[currentToken].tokenName); //have real names, T_digit >> Digit
                    currentToken++;
                }
                return true;
            }
        }
    }
    return false;
}
//Log information on the compilation process to the user
function log(toAdd) {
    if (verboseMode) {
        logString += toAdd + "<br />";
    }
}
//Set verbose status and button
function verboseToggle() {
    if (verboseMode) {
        verboseMode = false;
        document.getElementById('verbose').style["background-color"] = 'grey';
        document.getElementById('verbose').innerHTML = 'Verbose OFF';
        lex(document.getElementById('source-code').value); //compile again with verbose off
    }
    else {
        verboseMode = true;
        document.getElementById('verbose').style["background-color"] = 'green';
        document.getElementById('verbose').innerHTML = 'Verbose ON';
        lex(document.getElementById('source-code').value); //compile again with verbose on
    }
}
/*Project 2 and beyond!*/
//Step 3 - Input: CST, Output: AST
function semanticAnalysis() {
}
//Step 4 - Input: AST, Output: Equivalent hex codes
function codeGeneration() {
}
