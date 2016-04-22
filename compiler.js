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
//The concrete syntax tree class.
var ConcreteSyntaxTree = (function () {
    //Makes a new CST
    function ConcreteSyntaxTree(root, current) {
        this.root = root;
        this.current = current;
        this.root = root;
        this.current = current;
    }
    //Adds a branch node to a CST
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
    //Adds a leaf node to a CST
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
    //Backtracks the tree
    ConcreteSyntaxTree.prototype.backtrack = function () {
        this.current = this.current.parent;
    };
    ;
    //Prints the tree
    ConcreteSyntaxTree.prototype.toString = function (rootNode, indent) {
        log("\n" + indent + rootNode.nodeName);
        if (rootNode.children.length > 0) {
            for (var i = 0; i < rootNode.children.length; i++) {
                this.toString(rootNode.children[i], indent + "-");
            }
        }
        else {
        }
    };
    ;
    return ConcreteSyntaxTree;
})();
//The concrete syntax tree node class. Each node has a name, a parent, and an array of children.
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
//The abstract syntax tree class.
var AbstractSyntaxTree = (function () {
    //Creates a new AST
    function AbstractSyntaxTree(root, current) {
        this.root = root;
        this.current = current;
        this.root = root;
        this.current = current;
    }
    //Adds an AST branch node
    AbstractSyntaxTree.prototype.addBranchNode = function (nodeName) {
        var n = new ASTBranchNode(nodeName, null, [], false);
        if (this.root == null) {
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
    //Adds an AST leaf node
    AbstractSyntaxTree.prototype.addLeafNode = function (nodeName, nodeVal, setType) {
        var n = new ASTLeafNode(nodeName, nodeVal, setType, null, [], false);
        n.parent = this.current;
        n.parent.children.push(n);
        activeValue = n;
    };
    ;
    //Backtracks the tree
    AbstractSyntaxTree.prototype.backtrack = function () {
        if (this.current.parent === null) {
        }
        else {
            this.current = this.current.parent;
        }
    };
    ;
    //Prints the tree
    AbstractSyntaxTree.prototype.toString = function (rootNode, indent) {
        log("\n" + indent + rootNode.nodeName);
        if (rootNode.children.length > 0) {
            for (var i = 0; i < rootNode.children.length; i++) {
                this.toString(rootNode.children[i], indent + "-");
            }
        }
        else {
        }
    };
    ;
    return AbstractSyntaxTree;
})();
//The abstract syntax tree node class. Each has a name, a parent, and an array of children.
var ASTNode = (function () {
    function ASTNode(nodeName, parent, children, visited) {
        this.nodeName = nodeName;
        this.parent = parent;
        this.children = children;
        this.visited = visited;
        this.nodeName = nodeName;
        this.parent = parent;
        this.children = children;
        this.visited = visited;
    }
    return ASTNode;
})();
//The abstract syntax tree branch node class. Each represents an important AST branch node, in a subset of CSTNodes.
var ASTBranchNode = (function (_super) {
    __extends(ASTBranchNode, _super);
    function ASTBranchNode(nodeName, parent, children, visited) {
        _super.call(this, nodeName, parent, children, visited);
        this.nodeName = nodeName;
        this.parent = parent;
        this.children = children;
        this.visited = visited;
    }
    return ASTBranchNode;
})(ASTNode);
//The abstract syntax tree leaf node class. Each represents a type, value, or variable.
var ASTLeafNode = (function (_super) {
    __extends(ASTLeafNode, _super);
    function ASTLeafNode(nodeName, nodeVal, nodeType, parent, children, visited) {
        _super.call(this, nodeName, parent, children, visited);
        this.nodeName = nodeName;
        this.nodeVal = nodeVal;
        this.nodeType = nodeType;
        this.parent = parent;
        this.children = children;
        this.visited = visited;
        this.nodeVal = nodeVal;
        this.nodeType = nodeType;
    }
    return ASTLeafNode;
})(ASTNode);
//The symbol table (tree of hash tables) class.
var SymbolTable = (function () {
    //Creates a new Symbol Table tree.
    function SymbolTable(root, current) {
        this.root = root;
        this.current = current;
        this.root = root;
        this.current = current;
    }
    //Adds a new scope.
    SymbolTable.prototype.addBranchNode = function (nodeName, nodeVal) {
        var n = new SymbolTableNode(nodeName, nodeVal, {}, null, []);
        /*if(n.nodeName === "Program"){
            this.root = n;
            this.current = this.root;
        }*/
        n.parent = this.current;
        n.parent.children.push(n);
        this.current = n;
    };
    ;
    SymbolTable.prototype.addLeafNode = function (nodeName, nodeVal) {
        var n = new SymbolTableNode(nodeName, nodeVal, {}, null, []);
        if (n.nodeName === "Program") {
        }
        else {
            n.parent = this.current;
            n.parent.children.push(n);
        }
    };
    ;
    SymbolTable.prototype.backtrack = function () {
        this.current = this.current.parent;
    };
    ;
    SymbolTable.prototype.toString = function (rootNode, indent) {
        log("\n" + "Symbol Table Scope: " + rootNode.nodeVal + " = " + JSON.stringify(rootNode.map));
        if (rootNode !== null) {
            if (rootNode.children.length > 0) {
                for (var i = 0; i < rootNode.children.length; i++) {
                    this.toString(rootNode.children[i], indent + "-");
                }
            }
        }
        /*log("\n" + indent + rootNode.nodeName);
        if(rootNode.children.length > 0){
            for(var i = 0; i < rootNode.children.length; i++){
                this.toString(rootNode.children[i], indent+"-");
                log("\n" + indent + rootNode.children[i].nodeName);
            }
        }
        else{
            //log("\n" + indent + rootNode.nodeName);
        }*/
    };
    ;
    return SymbolTable;
})();
//The symbol table node class, for a hash table on one scope
var SymbolTableNode = (function () {
    //One node is created for each new scope in the program
    function SymbolTableNode(nodeName, nodeVal, map, parent, children) {
        this.nodeName = nodeName;
        this.nodeVal = nodeVal;
        this.map = map;
        this.parent = parent;
        this.children = children;
        this.nodeName = nodeName;
        this.nodeVal = nodeVal;
        this.map = map; //include hasBeenUsed var
        this.parent = parent;
        this.children = children;
    }
    //Adds a variable and its type to the table
    SymbolTableNode.prototype.addVariable = function (symbol, type) {
        this.map[symbol.nodeVal] = type.nodeVal;
    };
    //Finds a given variable if it exists in the table
    SymbolTableNode.prototype.find = function (symbol) {
        return symbol.nodeVal in this.map ? true : false;
    };
    //Gets the type of a given variable in the table
    SymbolTableNode.prototype.getType = function (symbol) {
        return this.map[symbol.nodeVal];
    };
    //The representation of the scope
    SymbolTableNode.prototype.toString = function () {
        log("<br />" + "Symbol Table: " + "<br />" + JSON.stringify(this.map));
    };
    return SymbolTableNode;
})();
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
//Special DFA used only for strings.
var stringDFA = {
    's1': { 'a': 's2',
        'b': 's2',
        'c': 's2',
        'd': 's2',
        'e': 's2',
        'f': 's2',
        'g': 's2',
        'h': 's2',
        'i': 's2',
        'j': 's2',
        'k': 's2',
        'l': 's2',
        'm': 's2',
        'n': 's2',
        'o': 's2',
        'p': 's2',
        'q': 's2',
        'r': 's2',
        's': 's2',
        't': 's2',
        'u': 's2',
        'v': 's2',
        'w': 's2',
        'x': 's2',
        'y': 's2',
        'z': 's2',
        '"': 's3',
        '\ ': 's4'
    },
    's2': { 'accept': 'T_char' },
    's3': { 'accept': 'T_quoteString' },
    's4': { 'accept': 'T_space' }
};
//Step 1
//Lexical analysis: Constructs tokens and filters whitespace and bogus characters.
//Takes in source code string, outputs array of tokens.
function lex(sourceCode) {
    //Turn the source code into tokens.
    tokens = getTokenStream(sourceCode);
    //Clear log area and print tokens + completion message
    document.getElementById('machine-code').innerHTML = "";
    //If there are tokens...
    if (tokens !== []) {
        //Print each token found
        if (verboseMode) {
            for (var i = 0; i < tokens.length; i++) {
                document.getElementById('machine-code').innerHTML += tokens[i].tokenName + " is a " + tokens[i].tokenKind + " on line " + tokens[i].tokenLineNumber + "<br />";
            }
        }
        //Lex complete.
        document.getElementById('machine-code').innerHTML += "Lex complete!" + "<br />";
        //On to parse step...
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
    //Start with empty string to track keywords
    var currentString = "";
    //Line number count starts at 1
    var lineNumber = 1;
    //Not currently reading in a "string literal"
    var stringMode = false;
    //We use two different DFAs, one regular one and one for string literals.
    //Both start with state s1.
    var DFAtype = (function () {
        function DFAtype() {
        }
        return DFAtype;
    })();
    //The current DFA is the default one. Will switch to the string DFA if needed.
    var currentDFA = new DFAtype();
    currentDFA = DFA;
    //For each source code character...
    for (var i = 0; i < sourceCode.length; i++) {
        //Get the character and the one after it
        var c = sourceCode.charAt(i);
        var cnext = sourceCode.charAt(i + 1);
        //If newline, add to line number count
        if (c == "\n") {
            lineNumber++;
        }
        else {
            //Based on current state and current character, get the next state
            state = currentDFA[state][c];
            //If there is no next state, the string is illegal
            if (typeof state === "undefined") {
                var t = new Token("T_unknown", currentString, lineNumber);
                tokens.push(t);
                return tokens;
            }
            //If this is an accepting state and there is no path to continue from here, create a token
            if ((currentDFA[state]['accept'] !== null) && (typeof currentDFA[state][cnext] === "undefined" || cnext === '' || cnext === ' ')) {
                //&& DFA[state][cnext] === null && DFA[state][cnext]['accept'] === null //try-catch here
                //Add to current string
                currentString += c;
                //Other check for illegality
                if (typeof currentDFA[state] !== "undefined") {
                    //If found a space and NOT reading in a "string literal"
                    if (currentDFA[state]['accept'] === "T_space" && !stringMode) {
                    }
                    else if (currentDFA[state]['accept'] === "T_quoteString") {
                        //Make a new token and add it
                        var t = new Token(currentDFA[state]['accept'], currentString, lineNumber);
                        //If string mode is off, set it to on. If string mode is on, set it to off.
                        stringMode = stringMode ? false : true;
                        //Switch to the DFA for reading in strings, or the default one.
                        if (stringMode) {
                            currentDFA = stringDFA;
                        }
                        else {
                            currentDFA = DFA;
                        }
                        tokens.push(t);
                    }
                    else {
                        var t = new Token(currentDFA[state]['accept'], currentString, lineNumber);
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
    //semanticAnalysis(CST);
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
        log("Concrete Syntax Tree for Program " + programCount + ":<br />"); //fixing logging
        CST.toString(CST.root, "-");
        semanticAnalysis(CST);
        //Next program
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
        //nothing, no statement. epsilon. add epsilon node for completeness
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
function errorLog(toAdd) {
    logString += "<span style='color:red'>" + toAdd + "</span><br />";
    //end compile
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
/* Project Two */
//The abstract syntax tree
var AST = new AbstractSyntaxTree(null, null);
//Create new current scope
var currentScope = new SymbolTableNode('Scope', 0, {}, null, []);
//var firstScope = currentScope;
//The symbol table (tree)
var SymbolTableInstance = new SymbolTable(currentScope, currentScope);
//The nodes that transfer from CST to AST
//Translates CST nodes into AST nodes.
var ASTNodes = {
    'T_intop': 'Add',
    'PrintStatement': 'Output',
    'T_boolop': 'CompareTest',
    'T_boolTrue': 'BooleanTrue',
    'T_boolFalse': 'BooleanFalse',
    'Block': 'Block',
    'AssignmentStatement': 'Assignment',
    'VariableDeclarationStatement': 'VariableDeclaration',
    'IfStatement': 'If',
    'WhileStatement': 'While',
    'T_char': 'Character',
    'CharList': 'String',
    'T_digit': 'Number'
};
/*Project 2 */
//Step 3 - Input: CST, Output: AST
function semanticAnalysis(CST) {
    buildAST(CST.root, 0);
    log("Abstract Syntax Tree for Program <>: <br />");
    AST.toString(AST.root, "-");
    scopeAndTypeCheck(AST.root);
    //currentScope.toString();
    SymbolTableInstance.toString(SymbolTableInstance.root, "-");
    //reset these
    AST = new AbstractSyntaxTree(null, null);
    currentScope = new SymbolTableNode('Scope', 0, {}, null, []);
    SymbolTableInstance = new SymbolTable(currentScope, currentScope);
    activeValue = null;
    codeGeneration();
    //document.getElementById('machine-code').innerHTML += "Semantic Analysis complete!" + "<br />"; //multiple programs
    //CST.root.children - if important, add branch or leaf to AST
    //traverse in order depth first CST and select important nodes
    //build AST with those
    //include subtree recipes of what to look for
    //scope check - w/ symbol table
    //type check
}
var activeValue = null;
//next step: AST and symbol table classes like CST one. report errors & warnings. cst duplication of nodes?
//recursive calls need to remember which child (leaf) was evaluated last and continue from there
//todo: blocks should have stmt children so scopes can close. types need to be checked earlier. step through this
function buildAST(root, childNumber) {
    if (root !== null && root.children.length > 0) {
        for (var i = 0; i < root.children.length; i++) {
            if (typeof ASTNodes[root.children[i].nodeName] !== "undefined") {
                //Rename from CST to AST nodeName
                if (ASTNodes[root.children[i].nodeName] === "Block") {
                    //StatementList -> a Statement and another StatementList which may or may not be empty
                    //Statement is some kind of Statement that translates to an AST node..
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name.
                    AST.backtrack();
                }
                else if (root.nodeName === "IntegerExpression") {
                    if (activeValue !== null) {
                        activeValue.nodeType = "int";
                    }
                }
                else if (root.nodeName === "StringExpression") {
                    if (activeValue !== null) {
                        activeValue.nodeType = "string";
                    }
                }
                else if (root.nodeName === "BooleanExpression") {
                    if (activeValue !== null) {
                        activeValue.nodeType = "boolean";
                    }
                }
                else if (root.nodeName === "ID") {
                    if (activeValue !== null) {
                        activeValue.nodeType = "ID";
                    }
                }
                else if (ASTNodes[root.children[i].nodeName] === "VariableDeclaration") {
                    //has a t_type? child and an ID -> t_char
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name
                    AST.addLeafNode("LeftVal", root.children[i].children[0].nodeVal, true);
                    AST.addLeafNode("RightVal", root.children[i].children[1].children[0].nodeVal, true);
                    AST.backtrack();
                }
                else if (ASTNodes[root.children[i].nodeName] === "Assignment") {
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name
                    //has an ID -> t_char and an Expression which is some kind of Expression
                    //try different types
                    AST.addLeafNode("LeftVal", root.children[i].children[0].children[0].nodeVal, true);
                    AST.addLeafNode("RightVal", root.children[i].children[2].children[0].children[0].nodeVal, true);
                    AST.backtrack();
                }
                else if (ASTNodes[root.children[i].nodeName] === "Output") {
                    /*for(var j = 0; j < root.children[i].children; j++){
                        if(root.children[i][j].nodeName === "Expression"){
                            //find leaf of expression
                        }
                    }*/ //search for expression? or expect a certain child index?
                    //root.children[i][2][0][0]; //2 for the expression, 0 for type of expression, 0 for leaf
                    //has an Expression child
                    //though this may crash if it doesn't find the expected thing
                    //print string, save whole string
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name
                    if (root.children[i].children[2].children[0].nodeName === "ID") {
                        AST.addLeafNode("OutputVal", root.children[i].children[2].children[0].children[0].nodeVal, true);
                    }
                    else {
                        AST.addLeafNode("OutputVal", findIDInAdd(root.children[i].children[2].children[0]), true);
                    }
                    AST.backtrack();
                }
                else if (ASTNodes[root.children[i].nodeName] === "If" || ASTNodes[root.children[i].nodeName] === "While") {
                    //has a BooleanExpression -> with TWO Expressions and a T_boolop. and a Block.
                    //to do: token differentiation between !== and ==. store values in symbol table
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name
                    AST.addBranchNode("CompareTest");
                    AST.addLeafNode("LeftVal", root.children[i].children[1].children[0].nodeVal, true);
                    AST.addLeafNode("RightVal", root.children[i].children[0].children[0], true);
                    AST.backtrack();
                    AST.addBranchNode("Block");
                    AST.backtrack();
                }
                else if (ASTNodes[root.children[i].nodeName] === "Add") {
                    //do Add subtree routine
                    //IntegerExpression -> with children t_digit, t_intop, and t_expression.
                    //t_expression is then another t_integerexpression which has a t_digit...
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name
                    AST.backtrack();
                }
            }
            var saved = root.children[i];
            //root.children.splice(i, 1); //remove this
            buildAST(saved, i);
        }
    }
    else {
        return;
    }
}
function findIDInAdd(intExpr) {
    if (intExpr.nodeName === "IntegerExpression") {
        if (intExpr.children !== null) {
            if (intExpr.children.length > 2) {
                if (intExpr.children[2].children[0].nodeName === "ID") {
                    return intExpr.children[2].children[0].children[0].nodeVal;
                }
                else {
                    findIDInAdd(intExpr.children[2].children[0]);
                }
            }
            else {
                if (intExpr.children[0].nodeName === "ID") {
                    return intExpr.children[0].children[0].nodeVal;
                }
                else {
                    return "?";
                }
            }
        }
    }
    else {
        return "?"; //if add contained only digits and no id
    }
}
//Traverses AST and builds symbol table, while checking for scope and type errors
//parent scope, type exp matching / type mismatch (save type)
//undeclared ids *
//redeclared ids in same scope *
//unused ids (?) (save value)
//uninitialized ids (used in output and compare)
//report line number (save line #)
//test programs
//one statement is being checked, nodes should be children. backtrack to block
//differentiate a in one scope from another. close scopes 
//type checking
//check a = a
function scopeAndTypeCheck(root) {
    if (root.nodeName === "Block") {
        if (root.visited === true) {
            currentScope = currentScope.parent;
        }
        root.visited = true;
        for (var i = 0; i < root.children.length; i++) {
            scopeAndTypeCheck(root.children[i]);
        }
        var oldScope = currentScope; //toString the scope tree
        currentScope = new SymbolTableNode('Scope', currentScope.nodeVal + 1, {}, currentScope, []);
        oldScope.children.push(currentScope);
        currentScope.parent = oldScope;
    }
    else if (root.nodeName === "VariableDeclaration") {
        if (currentScope.find(root.children[1])) {
            log("Semantic Analysis Warning - Variable " + root.children[1].nodeVal + " was redeclared."); //errorlog() to end compilation
        }
        else {
            currentScope.addVariable(root.children[1], root.children[0]);
        }
    }
    else if (root.nodeName === "Assignment") {
        var isFound = false;
        //check if var exists in current scope in symbol table - and parent scope, if not
        if (root.children[0].nodeName === "LeftVal") {
            isFound = currentScope.find(root.children[0]);
        }
        if (!isFound) {
            if (currentScope.parent !== null) {
                var searchScope = currentScope.parent;
                while (searchScope.parent !== null) {
                    searchScope = searchScope.parent;
                    isFound = searchScope.find(root.children[0]);
                }
            }
            if (!isFound) {
                log("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is not found.");
            }
        }
        var type = currentScope.getType(root.children[0]);
        var otherType = "";
        if (root.children[1].nodeType === "ID") {
            otherType = currentScope.getType(root.children[1]);
        }
        //type match - integerExpression, stringExpression, booleanExpression
        //does value (root.children[1]) match int (0-9), string ("") or boolean (T/F)? also a = a
        //check if var exists in current scope in symbol table - and parent scope, if not
        //check if type is correct
        //check if a = b; a and b are same type
        if (otherType !== "" && type !== otherType) {
            log("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is of type " + type + " and cannot be set to type " + otherType);
        }
        else if (otherType === "" && type !== root.children[1].nodeType) {
            log("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is of type " + type + " and cannot be set to type " + root.children[1].nodeType);
        }
    }
    else if (root.nodeName === "Output") {
        var isFound = false;
        //check if var exists in current scope in symbol table - and parent scope, if not
        if (root.children[0].nodeName === "OutputVal") {
            if (root.children[0].nodeVal !== "?") {
                isFound = currentScope.find(root.children[0]);
            }
        }
        if (!isFound && root.children[0].nodeVal !== "?") {
            if (currentScope.parent !== null) {
                var searchScope = currentScope.parent;
                while (searchScope.parent !== null) {
                    searchScope = searchScope.parent;
                    isFound = searchScope.find(root.children[0]);
                }
            }
            if (!isFound) {
                log("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is not found.");
            }
        }
    }
    else if (root.nodeName === "If" || root.nodeName === "While") {
        scopeAndTypeCheck(root.children[0]); //check test
        scopeAndTypeCheck(root.children[1]); //check block
    }
    else if (root.nodeName === "CompareTest") {
        var isFound = false;
        //check if var exists in current scope in symbol table - and parent scope, if not
        if (root.children[0].nodeName === "LeftVal") {
            isFound = currentScope.find(root.children[0]);
        }
        if (!isFound) {
            if (currentScope.parent !== null) {
                var searchScope = currentScope.parent;
                while (searchScope.parent !== null) {
                    searchScope = searchScope.parent;
                    isFound = searchScope.find(root.children[0]);
                }
            }
            if (!isFound) {
                log("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is not found.");
            }
        }
        var type = currentScope.getType(root.children[0]);
        if (type !== root.children[1].nodeType) {
            log("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is of type " + type + " and cannot be compared to " + root.children[1].nodeType);
        }
    }
    else {
    }
}
/* Final project */
//Step 4 - Input: AST & symbol table, Output: Equivalent hex codes
function codeGeneration() {
    //instruction selection
    //translate into hex/bin
    //traverse AST
    document.getElementById('hex-code').innerHTML = "<br /> Hex codes TBD...";
    //VariableDeclaration: A9 00 8D T0 XX
    //Assignment (Constant): A9 0<digit> 8D T0 XX
    //Assignment (From Var): AD T1 XX 8D T0 XX
    //Output: AC T0 XX A2 0(1|2) FF
    //CompareTo: AE T0 XX EC T1 XX
    //If (Block): D0 J0
    //Break (and initialize heap space) (safe value to jump to if test fails): 00
    //While: Like IF, only you jump "backward" back to the test again by adding ~128 to wrap around. thus, a loop until test evals to false
    //Add: EE
    //Strings: write backward starting at bottom of heap. have one static pointer (one byte) to the first char of the string and store in ASCII bytes.
    //Runtime image consist of code in hex, static space where vars are, and the rest is heap space where strings can be. Unused heap space should be 00, to fill from 00 - FF in the address space, creating an executable of 256 B, fixed size
    //Static table, jump table, backpatching to replace correct references once known after traversing the code
    //Instruction format, hex format
    writeCodes(AST.root);
}
function writeCodes(root) {
    /*if(root.nodeName === "VariableDeclaration"){
        log("A9 00 8D T0 XX");
    }*/
}
