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
    AbstractSyntaxTree.prototype.addLeafNode = function (nodeName, nodeVal, setType, lineNumber) {
        var n = new ASTLeafNode(nodeName, nodeVal, setType, lineNumber, false, null, [], false);
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
//The abstract syntax tree leaf node class. Each represents a type, value, or variable in the program
var ASTLeafNode = (function (_super) {
    __extends(ASTLeafNode, _super);
    function ASTLeafNode(nodeName, nodeVal, nodeType, lineNumber, isUsed, parent, children, visited) {
        _super.call(this, nodeName, parent, children, visited);
        this.nodeName = nodeName;
        this.nodeVal = nodeVal;
        this.nodeType = nodeType;
        this.lineNumber = lineNumber;
        this.isUsed = isUsed;
        this.parent = parent;
        this.children = children;
        this.visited = visited;
        this.nodeVal = nodeVal;
        this.nodeType = nodeType;
        this.lineNumber = lineNumber;
        this.isUsed = isUsed;
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
        if (n.nodeVal === 0) {
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
    //Unused
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
    //Backtracks
    SymbolTable.prototype.backtrack = function () {
        this.current = this.current.parent;
    };
    ;
    //Prints the symbol table
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
var StaticTableEntry = (function () {
    //Entries are created to map memory locations onto variables in the program
    function StaticTableEntry(temp, variable, scope, address) {
        this.temp = temp;
        this.variable = variable;
        this.scope = scope;
        this.address = address;
        this.temp = temp;
        this.variable = variable;
        this.scope = scope;
        //address is not yet known at creation time
    }
    StaticTableEntry.prototype.setAddress = function (address) {
        this.address = address;
    };
    return StaticTableEntry;
})();
var JumpTableEntry = (function () {
    //Entries are created to map temporary jump placeholders to their actual jump distance
    function JumpTableEntry(temp, distance) {
        this.temp = temp;
        this.distance = distance;
        this.temp = temp;
        //distance is not yet known at creation time
    }
    JumpTableEntry.prototype.setDistance = function (distance) {
        this.distance = distance;
    };
    return JumpTableEntry;
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
function compile() {
    if (document.getElementById('error-log') !== null) {
        document.getElementById('error-log').innerHTML = "";
        document.getElementById('error-log').id = 'machine-code';
    }
    lex();
}
//Step 1
//Lexical analysis: Constructs tokens and filters whitespace and bogus characters.
//Takes in source code string, outputs array of tokens.
function lex() {
    //Get the source code.	
    var sourceCode = document.getElementById('source-code').value;
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
    if (document.getElementById('machine-code') !== null) {
        document.getElementById('machine-code').innerHTML += logString + "Parse complete!";
    }
    else {
        document.getElementById('error-log').innerHTML += logString;
    }
    logString = "";
    programCount = 0;
    //semanticAnalysis(CST);
}
var notError = true;
//Ensure a program contains a block and ends with an EOF.
//Continue to read in programs as long as there are more tokens after EOF.
function parseProgram() {
    notError = true; //no errors... yet.
    //var CST = new ConcreteSyntaxTree(null, null);
    CST.addBranchNode("Program");
    parseBlock();
    if (match(["T_EOF"], false, false)) {
        programCount++;
        log("Program " + programCount + "<br />");
        log("Concrete Syntax Tree for Program " + programCount + ":<br />"); //fixing logging
        CST.toString(CST.root, "-");
        semanticAnalysis(CST, programCount);
        //Next program
        CST = new ConcreteSyntaxTree(null, null); //reset CST
        if (currentToken < tokens.length) {
            parseProgram();
        } //parse the next program if there is one
    }
    else {
        errorlog("Parse Error - Missing End of Program marker, '$'.");
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
            errorlog("Parse Error - Expected '}' to end block, got " + tokens[currentToken].tokenName);
        }
    }
    else {
        errorlog("Parse Error - Expected '{' to start a block, got " + tokens[currentToken].tokenName);
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
        errorlog("Parse Error - Invalid statement, cannot begin with " + tokens[currentToken].tokenName);
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
                errorlog("Parse Error - Expected ')' to end print statement, got " + tokens[currentToken].tokenName);
            }
        }
        else {
            errorlog("Parse Error - Expected '(' for print statement, got " + tokens[currentToken].tokenName);
        }
    }
    else {
        errorlog("Parse Error - Expected 'print' to begin print statement, got " + tokens[currentToken].tokenName);
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
        errorlog("Parse Error - Expected = to assign ID to something, got " + tokens[currentToken].tokenName);
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
        errorlog("Parse Error - Expected type declaration 'int', 'string' or 'boolean', got " + tokens[currentToken].tokenName);
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
        errorlog("Parse Error - Expected 'while' to begin while statement, got " + tokens[currentToken].tokenName);
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
        errorlog("Parse Error - Expected 'if' to begin if statement, got " + tokens[currentToken].tokenName);
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
                errorlog("Parse Error - Expecting + in integer expression, got " + tokens[currentToken].tokenName);
            }
        }
        else if (match(["T_digit"], false, false)) {
            log("Integer Expression");
        }
    }
    else {
        errorlog("Parse Error - Expecting digit to begin integer expression, got " + tokens[currentToken].tokenName);
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
            errorlog("Parse Error - Unterminated string literal");
        }
    }
    else {
        errorlog("Parse Error - Expected \" to begin string, got " + tokens[currentToken].tokenName);
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
                errorlog("Parse Error - Expected ')' to close boolean expression, got " + tokens[currentToken].tokenName);
            }
        }
        else {
            errorlog("Parse Error - Missing boolean operator like == or !=, got instead " + tokens[currentToken].tokenName);
        }
    }
    else if (match(["T_boolTrue"], false, false) || match(["T_boolFalse"], false, false)) {
        log("Boolean Expression");
    }
    else {
        errorlog("Parse Error - Expected boolean expression, got " + tokens[currentToken].tokenName);
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
        errorlog("Parse Error - Expected an ID a-z, got " + tokens[currentToken].tokenName);
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
    if (verboseMode && notError) {
        logString += toAdd + "<br />";
    }
}
function errorlog(toAdd) {
    logString += "<span style='color:red'>" + "Error: " + toAdd + "</span><br />"; //change to error div - does not continue to compile. & machine code div shows "not generated"
    //end compile
    if (document.getElementById('machine-code') !== null) {
        document.getElementById('machine-code').id = 'error-log';
    } //no more output will occur
    document.getElementById('hex-code').innerHTML = "Machine Code was not generated due to an error, see logger for details.";
    notError = false;
}
//Set verbose status and button
function verboseToggle() {
    if (verboseMode) {
        verboseMode = false;
        document.getElementById('verbose').style["background-color"] = 'grey';
        document.getElementById('verbose').innerHTML = 'Verbose OFF';
        compile(); //compile again with verbose off
    }
    else {
        verboseMode = true;
        document.getElementById('verbose').style["background-color"] = 'green';
        document.getElementById('verbose').innerHTML = 'Verbose ON';
        compile(); //compile again with verbose on
    }
}
/* Project Two */
//The abstract syntax tree
var AST = new AbstractSyntaxTree(null, null);
//The current scope pointer
var currentScope = null;
//The symbol table (tree)
var SymbolTableInstance = new SymbolTable(null, null);
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
function semanticAnalysis(CST, programCount) {
    //From the CST, build the AST	
    buildAST(CST.root);
    //Print the AST
    log("Abstract Syntax Tree for Program " + programCount + ": <br />");
    AST.toString(AST.root, "-");
    //Scope and type check the AST
    scopeAndTypeCheck(AST.root);
    //currentScope.toString();
    //Print the symbol table
    SymbolTableInstance.toString(SymbolTableInstance.root, "-");
    //Generate machine code
    codeGeneration();
    //reset all these globals
    AST = new AbstractSyntaxTree(null, null);
    currentScope = null;
    SymbolTableInstance = new SymbolTable(null, null);
    activeValue = null;
    //codeGeneration();
    //document.getElementById('machine-code').innerHTML += "Semantic Analysis complete!" + "<br />"; //multiple programs
    //CST.root.children - if important, add branch or leaf to AST
    //traverse in order depth first CST and select important nodes
    //build AST with those
    //include subtree recipes of what to look for
    //scope check - w/ symbol table
    //type check
}
//This is a saved ASTLeafNode, the last one that was visited. Its type will be set when we know what kind of Exp it is.
var activeValue = null;
//next step: AST and symbol table classes like CST one. report errors & warnings. cst duplication of nodes?
//recursive calls need to remember which child (leaf) was evaluated last and continue from there
//todo: blocks should have stmt children so scopes can close. types need to be checked earlier. step through this
function buildAST(root) {
    //If not a leaf node...
    if (root !== null && root.children.length > 0) {
        //For each CST child...
        for (var i = 0; i < root.children.length; i++) {
            //If the CST node is useful to the AST...
            if (typeof ASTNodes[root.children[i].nodeName] !== "undefined") {
                //Rename from CST to AST nodeName
                //Block
                if (ASTNodes[root.children[i].nodeName] === "Block") {
                    //StatementList -> a Statement and another StatementList which may or may not be empty
                    //Statement is some kind of Statement that translates to an AST node..
                    //Add a block AST node
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name.
                    //Recurse over Statements
                    buildAST(root.children[i]);
                    //Back up to Block when done
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
                    AST.addLeafNode("LeftVal", root.children[i].children[0].nodeVal, true, root.children[i].children[0].lineNumber);
                    AST.addLeafNode("RightVal", root.children[i].children[1].children[0].nodeVal, true, root.children[i].children[1].children[0].lineNumber);
                    AST.backtrack();
                }
                else if (ASTNodes[root.children[i].nodeName] === "Assignment") {
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name
                    //has an ID -> t_char and an Expression which is some kind of Expression
                    //try different types
                    AST.addLeafNode("LeftVal", root.children[i].children[0].children[0].nodeVal, true, root.children[i].children[0].children[0].lineNumber);
                    if (root.children[i].children[2].children[0].nodeName === "IntegerExpression") {
                        if (root.children[i].children[2].children[0].children.length > 2 && root.children[i].children[2].children[0].children[1].nodeName === "T_intop") {
                            AST.addLeafNode("RightVal", findIDInAdd(root.children[i].children[2].children[0]), true, root.children[i].children[2].children[0].children[0].lineNumber);
                        }
                        else {
                            AST.addLeafNode("RightVal", root.children[i].children[2].children[0].children[0].nodeVal, true, root.children[i].children[2].children[0].children[0].lineNumber);
                        }
                    }
                    else {
                        AST.addLeafNode("RightVal", root.children[i].children[2].children[0].children[0].nodeVal, true, root.children[i].children[2].children[0].children[0].lineNumber);
                    }
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
                        AST.addLeafNode("OutputVal", root.children[i].children[2].children[0].children[0].nodeVal, true, root.children[i].children[2].children[0].children[0].lineNumber);
                    }
                    else {
                        AST.addLeafNode("OutputVal", findIDInAdd(root.children[i].children[2].children[0]), true, 0);
                    }
                    AST.backtrack();
                }
                else if (ASTNodes[root.children[i].nodeName] === "If" || ASTNodes[root.children[i].nodeName] === "While") {
                    //has a BooleanExpression -> with TWO Expressions and a T_boolop. and a Block.
                    //to do: token differentiation between !== and ==. store values in symbol table
                    AST.addBranchNode(ASTNodes[root.children[i].nodeName]); //with new name
                    AST.addBranchNode("CompareTest");
                    if (root.children[i].children[1].children[1].children.length !== 0) {
                        AST.addLeafNode("LeftVal", root.children[i].children[1].children[1].children[0].children[0].nodeVal, true, root.children[i].children[1].children[1].children[0].children[0].lineNumber);
                        AST.addLeafNode("RightVal", root.children[i].children[1].children[3].children[0].children[0].nodeVal, true, root.children[i].children[1].children[3].children[0].children[0].lineNumber);
                    }
                    else {
                        AST.addLeafNode("LeftVal", root.children[i].children[1].children[1].children[0].nodeVal, true, root.children[i].children[1].children[1].children[0].lineNumber);
                        AST.addLeafNode("RightVal", root.children[i].children[1].children[1].children[0].nodeVal, true, root.children[i].children[1].children[1].children[0].lineNumber);
                    }
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
            //Block handles own recursive call
            if (ASTNodes[root.children[i].nodeName] !== "Block") {
                buildAST(saved);
            }
        }
    }
    else {
        return;
    }
}
//If an int expression contains an ID, such as in 1+2+3+a, this finds it
function findIDInAdd(intExpr) {
    if (intExpr.nodeName === "IntegerExpression") {
        if (intExpr.children !== null) {
            if (intExpr.children.length > 2) {
                if (intExpr.children[2].children[0].nodeName === "ID") {
                    return intExpr.children[2].children[0].children[0].nodeVal;
                }
                else {
                    return findIDInAdd(intExpr.children[2].children[0]);
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
    //Block sets scope
    if (root.nodeName === "Block") {
        if (root.visited === true) {
            currentScope = currentScope.parent;
        }
        else {
            root.visited = true;
            //Make new scope for new block
            if (currentScope !== null) {
                var oldScope = currentScope; //toString the scope tree
                currentScope = new SymbolTableNode('Scope', currentScope.nodeVal + 1, {}, currentScope, []); //should start off w/ a base scope
                oldScope.children.push(currentScope);
                currentScope.parent = oldScope;
            }
            else {
                currentScope = new SymbolTableNode('Scope', 0, {}, null, []);
                SymbolTableInstance = new SymbolTable(currentScope, currentScope);
            }
            //Check each Statement
            for (var i = 0; i < root.children.length; i++) {
                scopeAndTypeCheck(root.children[i]);
            }
            //scopeAndTypeCheck(root); //will close the scope
            //When done checking all Statements under this Block, close the scope and return to the parent scope
            if (currentScope.parent !== null) {
                currentScope = currentScope.parent;
            }
        }
    }
    else if (root.nodeName === "VariableDeclaration") {
        if (currentScope.find(root.children[1])) {
            errorlog("Semantic Analysis Warning - Variable " + root.children[1].nodeVal + " was redeclared on line " + root.children[1].lineNumber); //errorlog() to end compilation
        }
        else {
            currentScope.addVariable(root.children[1], root.children[0]);
        }
    }
    else if (root.nodeName === "Assignment") {
        var isFound = false;
        var parentType = "";
        //check if var exists in current scope in symbol table - and parent scope, if not
        if (root.children[0].nodeName === "LeftVal") {
            isFound = currentScope.find(root.children[0]);
        }
        if (!isFound) {
            if (currentScope.parent !== null) {
                var searchScope = currentScope.parent;
                isFound = searchScope.find(root.children[0]);
                if (isFound) {
                    parentType = searchScope.getType(root.children[0]);
                }
                while (searchScope.parent !== null && !isFound) {
                    searchScope = searchScope.parent;
                    isFound = searchScope.find(root.children[0]);
                    if (isFound) {
                        parentType = searchScope.getType(root.children[0]);
                    }
                }
            }
            if (!isFound) {
                errorlog("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is not found on line " + root.children[0].lineNumber);
            }
            else {
                root.children[0].isUsed = true;
            }
        }
        var type = "";
        if (parentType === "") {
            type = currentScope.getType(root.children[0]);
        }
        else {
            type = parentType;
        }
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
            errorlog("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is of type " + type + " and cannot be set to type " + otherType + " on line " + root.children[0].lineNumber);
        }
        else if (otherType === "" && type !== root.children[1].nodeType) {
            errorlog("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is of type " + type + " and cannot be set to type " + root.children[1].nodeType + " on line " + root.children[0].lineNumber);
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
                isFound = searchScope.find(root.children[0]);
                while (searchScope.parent !== null && !isFound) {
                    searchScope = searchScope.parent;
                    isFound = searchScope.find(root.children[0]);
                }
            }
            if (!isFound) {
                errorlog("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is not found on line " + root.children[0].lineNumber);
            }
            else {
                root.children[0].isUsed = true;
            }
        }
    }
    else if (root.nodeName === "If" || root.nodeName === "While") {
        scopeAndTypeCheck(root.children[0]); //check test
        scopeAndTypeCheck(root.children[1]); //check block
    }
    else if (root.nodeName === "CompareTest") {
        var isFound = false;
        var parentType = "";
        //check if var exists in current scope in symbol table - and parent scope, if not
        if (root.children[0].nodeName === "LeftVal") {
            isFound = currentScope.find(root.children[0]);
        }
        if (!isFound) {
            if (currentScope.parent !== null) {
                var searchScope = currentScope.parent;
                isFound = searchScope.find(root.children[0]);
                if (isFound) {
                    parentType = searchScope.getType(root.children[0]);
                }
                while (searchScope.parent !== null && !isFound) {
                    searchScope = searchScope.parent;
                    isFound = searchScope.find(root.children[0]);
                    if (isFound) {
                        parentType = searchScope.getType(root.children[0]);
                    }
                }
            }
            if (!isFound) {
                errorlog("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is not found on line " + root.children[0].lineNumber);
            }
            else {
                root.children[0].isUsed = true;
            }
        }
        var type = "";
        if (parentType === "") {
            type = currentScope.getType(root.children[0]);
        }
        else {
            type = parentType;
        }
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
            errorlog("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is of type " + type + " and cannot be compared to type " + otherType + " on line " + root.children[0].lineNumber);
        }
        else if (otherType === "" && type !== root.children[1].nodeType) {
            errorlog("Semantic Analysis Error - Variable " + root.children[0].nodeVal + " is of type " + type + " and cannot be compared to type " + root.children[1].nodeType + " on line " + root.children[0].lineNumber);
        }
    }
    else {
    }
}
//Contains 256 nybbles of machine code
var machineCode = [];
//Contains 32 lines of 8 nybbles each
var machineCodeStrings = [];
//Static table
var staticTable = [];
//Jump Entries - track jumps
var jumpTable = [];
/* Final project */
//Step 4 - Input: AST & symbol table, Output: Equivalent hex codes
function codeGeneration() {
    //static table & jump table
    //instruction selection
    //translate into hex/bin
    //traverse AST
    //initialize
    machineCode = [];
    machineCodeStrings = [];
    ncount = 0;
    heapcount = 255;
    staticcount = 0;
    //Empty code section
    document.getElementById('hex-code').innerHTML = "";
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
    //256 nybbles of 00 in the array
    for (var b = 0; b < 257; b++) {
        machineCode.push("00");
    }
    //Traverse AST, write 6502 codes into array
    writeCodes(AST.root);
    machineCode[ncount] = "00"; //finish code
    ncount++; //static space begins here, unless exceeds 256
    //use this to...
    //backpatch w/ tables
    for (var i = 0; i < staticTable.length; i++) {
        staticTable[i].setAddress(ncount.toString(16));
        ncount++;
    }
    for (var y = 0; y < 257; y++) {
        if (y !== 256) {
            var memLoc = machineCode[y] + machineCode[y + 1];
            for (var j = 0; j < staticTable.length; j++) {
                if (memLoc === staticTable[j].temp) {
                    machineCode[y] = staticTable[j].address;
                    machineCode[y + 1] = "00";
                }
            }
        }
    }
    for (var i = 0; i < jumpTable.length; i++) {
    }
    //One line of 8 nybbles
    var codeStr = "";
    //Keeps track of nybbles
    var nybbleCounter = 0;
    //Holds onto first nybble in the line
    var firstNybble = 0;
    //For each nybble...
    for (var b = 0; b < 257; b++) {
        //Put in a line and increment counter
        codeStr += " " + machineCode[b];
        nybbleCounter++;
        //When multiple of 8 reached...
        if (nybbleCounter % 8 === 0) {
            //First nybble is saved
            firstNybble = nybbleCounter - 8;
            //Create a line with the nybble # and 8 nybbles of code
            machineCodeStrings.push(codeStr); //firstNybble.toString(16)
            //Reset for the next line
            codeStr = "";
        }
    }
    //For each line, write it into the code section with a line break
    for (var e = 0; e < machineCodeStrings.length; e++) {
        document.getElementById('hex-code').innerHTML += machineCodeStrings[e] + "<br />";
    }
}
//Keeps track of which nybble to write next
var ncount = 0;
//Keeps track of the heap space
var heapcount = 255;
//Keeps track of how many static variables there are
var staticcount = 0;
//Static Entries - track static variables
staticTable = [];
//Jump Entries - track jumps
jumpTable = [];
function writeCodes(root) {
    if (root.nodeName === "Block") {
        //Write codes for all children
        for (var i = 0; i < root.children.length; i++) {
            writeCodes(root.children[i]);
        }
    }
    else if (root.nodeName === "VariableDeclaration") {
        machineCode[ncount] = "A9"; //load the accumulator
        ncount++;
        machineCode[ncount] = "00"; //with 00 - all variables are initialized to 00
        ncount++;
        machineCode[ncount] = "8D"; //save 00
        ncount++;
        machineCode[ncount] = "T" + staticTable.length; //at this memory location for the new variable
        ncount++;
        machineCode[ncount] = "XX"; //extra address space
        ncount++;
        staticTable.push(new StaticTableEntry("T" + staticTable.length + "XX", root.children[1].nodeVal, 0, ""));
    }
    else if (root.nodeName === "Assignment") {
        machineCode[ncount] = "A9"; //load the accumulator
        ncount++;
        if (root.children[1].nodeType === "string") {
            //have heap space pointer...
            machineCode[heapcount] = "00";
            heapcount--;
            for (var i = 0; i < root.children[1].nodeVal.length; i++) {
                machineCode[heapcount] = root.children[1].nodeVal.charCodeAt(i);
                heapcount--;
            }
            machineCode[ncount] = (heapcount + 1).toString(16); //static pointer where string begins
        }
        else if (root.children[1].nodeType === "boolean") {
            if (root.children[1].nodeVal === "true") {
                machineCode[ncount] = "01"; //true
            }
            else {
                machineCode[ncount] = "00"; //false
            }
        }
        else {
            machineCode[ncount] = "0" + root.children[1].nodeVal; //with the assigned value - may not work for added numbers
        }
        ncount++;
        machineCode[ncount] = "8D"; //save the assigned value
        ncount++;
        var existingVar = "00";
        for (var i = 0; i < staticTable.length; i++) {
            if (staticTable[i].variable === root.children[0].nodeVal) {
                existingVar = staticTable[i].temp.substring(0, 2);
            }
        }
        machineCode[ncount] = existingVar; //in the variable's memory location
        ncount++;
        machineCode[ncount] = "XX"; //extra address space
        ncount++;
    }
    else if (root.nodeName === "Output") {
        machineCode[ncount] = "AC"; //load the y register
        ncount++;
        var existingVar = "00";
        for (var i = 0; i < staticTable.length; i++) {
            if (staticTable[i].variable === root.children[0].nodeVal) {
                existingVar = staticTable[i].temp.substring(0, 2);
            }
        }
        machineCode[ncount] = existingVar; //from this memory location
        ncount++;
        machineCode[ncount] = "XX"; //extra address space
        ncount++;
        machineCode[ncount] = "A2"; //load the x register
        ncount++;
        machineCode[ncount] = "01"; //system code for "print" for ints only
        ncount++;
        machineCode[ncount] = "FF"; //system call
        ncount++;
    }
    else if (root.nodeName === "If" || root.nodeName === "While") {
        machineCode[ncount] = "AE"; //load the y register?
        ncount++;
        var existingVar = "00";
        for (var i = 0; i < staticTable.length; i++) {
            if (staticTable[i].variable === root.children[0].children[0].nodeVal) {
                existingVar = staticTable[i].temp.substring(0, 2);
            }
        }
        machineCode[ncount] = existingVar; //from this memory location
        ncount++;
        machineCode[ncount] = "XX"; //extra address space
        ncount++;
        machineCode[ncount] = "EC"; //compare to and set z flag
        ncount++;
        var existingVar = "00";
        for (var i = 0; i < staticTable.length; i++) {
            if (staticTable[i].variable === root.children[0].children[1].nodeVal) {
                existingVar = staticTable[i].temp.substring(0, 2);
            }
        }
        machineCode[ncount] = existingVar; //this memory location
        ncount++;
        machineCode[ncount] = "XX"; //extra address space
        ncount++;
        machineCode[ncount] = "D0"; //check z flag and decide to jump or not
        ncount++;
        machineCode[ncount] = "J0"; //jump this many bytes
        ncount++;
        jumpTable.push(new JumpTableEntry("J0", ""));
        writeCodes(root.children[1]); //write the block
    }
}
//Left:
//Jump distance backpatching
//Project 2 errors/nonerrors
//Not generating code when error
//Semantic analysis undefined errors and line numbers
//Add in AST
//Adding, strings, and if/while in codegen
//Track multiple vars in codegen
//Check over grammar
//Testing 
