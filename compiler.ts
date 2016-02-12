//Ensure .js is working. Also makes things prettier.
document.getElementById('footer').style.color = "blue";

//Keyword test
var keywordTest = new RegExp("print|while|if");
//Must be literal tests
//Type test
var typeTest = new RegExp("int|string|boolean");

//Program test
var programTest = new RegExp(".*\$");

//Open block test
var openBlockTest = new RegExp("{");

//Close block test
var closeBlockTest = new RegExp("}");

//Open param list test
var openParamListTest = new RegExp("[(]");

//Close param list test
//var closeParamListTest = new RegExp(")");

//StatementList

//Statement

//PrintStatement

//AssignmentStatement

//VarDecl

//WhileStatement

//IfStatement

//Expr - IntExpr, StringExpr, BooleanExpr, Id, CharList

//Char test
var charTest = new RegExp("[a-z]");

//Space test
var spaceTest = new RegExp(" ");

//Digit test
var digitTest = new RegExp("[0-9]");

//BoolOP test
var boolopTest = new RegExp("==|\!=");

//BoolVal test
var boolvalTest = new RegExp("true|false");

//IntOP test
var intopTest = new RegExp("[+]");

class Token{
    constructor(public tokenKind, public tokenName, public tokenLineNumber) {
        this.tokenKind = tokenKind;
        this.tokenName = tokenName;
        this.tokenLineNumber = tokenLineNumber;
    }
}

class SymbolTableEntry{
    constructor(public symbol){
	this.symbol = symbol;
    }
}

interface SymbolTableArray{
	[index: number]: SymbolTableEntry;
}

interface TokenArray{
	[index: number]: Token;
}

var testDFA = {'s1' : {'a': 's2', 'b': 's2', 'isAccepting': false }, 's2': {'isAccepting': true} };
var DFA = {'s1' : {'+': 's2',
		   '"': 's3',
		   ' ': 's4',
		   '$': 's5',
		   '=': 's6',
		   '!': 's7',
		   '{': 's8',
		   '{': 's9',
		   'a': 's10',
		   'b': 's10',
		   'c': 's10',
		   'd': 's10',
		   'e': 's10',
		   'f': 's10',
		   'g': 's10',
		   'h': 's10',
		   'i': 's10',
		   'j': 's10',
		   'k': 's10',
		   'l': 's10',
		   'm': 's10',
		   'n': 's10',
		   'o': 's10',
		   'p': 's10',
		   'q': 's10',
		   'r': 's10',
		   's': 's10',
		   't': 's10',
		   'u': 's10',
		   'v': 's10',
		   'w': 's10',
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
		   '(': 's12',
		   ')': 's13'
		   }
	    's6' : {'=': 's14'},
	    's7' : {'=': 's15'},
	    's10' : {'r': 's16',
	    	     'a': 's17',
		     'n': 's18',
		     'o': 's19',
		     't': 's20',
		     'f': 's21',
		     'h': 's22'},
	    's16' : {'i': 's23',
	    	     'u': 's24'},
	    's23' : {'n': 's25'},
	    's25' : {'t': 's26'},
	    's17' : {'l': 's27'},
	    's27' : {'s': 's28'},
	    's28' : {'e': 's29'},
	    's24' : {'e': 's30'},
	    's18' : {'t': 's31'},
	    's19' : {'o': 's32'},
	    's32' : {'l': 's33'},
	    's33' : {'e': 's34'},
	    's34' : {'a': 's35'},
	    's35' : {'n': 's36'},
	    's20' : {'r': 's37'},
	    's37' : {'i': 's38'},
	    's38' : {'n': 's39'},
	    's39' : {'g': 's40'},
	    's22' : {'i': 's41'},
	    's41' : {'l': 's42'},
	    's42' : {'e': 's43'},
	    
	    //Accepting states
	    's2' : {'accept': 'intop'}
	    };

//Step 1
function lex(sourceCode: string){
  var tokens = regexT("", 0, "", sourceCode, []); /* issue: printf is recognized as print. throws away string when sees a valid keyword */
  //console.log(sourceCode);
  /*document.getElementById('machine-code').innerHTML = "";
  for(var i = 0; i < tokens.length; i++){
    document.getElementById('machine-code').innerHTML += tokens[i].tokenName + " is a " + tokens[i].tokenKind + " on line " + tokens[i].tokenLineNumber;
  }*/
  //return tokens;
}

//Step 1 Helper
/*function regexTest(charPointer: number, possibleLexeme: string, tokens: Token[]){
  console.log(possibleLexeme.toString().substring(charPointer,possibleLexeme.length));
  if(charPointer == possibleLexeme.length){
     document.getElementById('machine-code').innerHTML = "";
  	for(var i = 0; i < tokens.length; i++){
  	  document.getElementById('machine-code').innerHTML += tokens[i].tokenName + " is a " + tokens[i].tokenKind + " on line " + tokens[i].tokenLineNumber;
 	 }
     return tokens;
  }
  else if(keywordTest.test(possibleLexeme.toString().substring(charPointer,possibleLexeme.length))){
    var t = new Token("keyword", possibleLexeme, 0);
    tokens.push(t);
    regexTest(charPointer+1, possibleLexeme, tokens);
  }
  else if(typeTest.test(possibleLexeme.toString().substring(charPointer,possibleLexeme.length))){
    var t = new Token("type", possibleLexeme, 0);
    tokens.push(t);
    regexTest(charPointer+1, possibleLexeme, tokens);
  }
  else{
    regexTest(charPointer+1, possibleLexeme, tokens);
  }
}
*/
//Keep running total of newline characters for line reporting
function regexT(c: string, charPointer: number, currentLexeme: string, sourceCode: string, tokens: Token[]){
	currentLexeme += c;
	console.log(currentLexeme);
	if(charPointer > sourceCode.length){
		/*if(keywordTest.test(currentLexeme)){
			var t = new Token("keyword", currentLexeme, 0);
			tokens.push(t);
		}
		else if(typeTest.test(currentLexeme)){
			var t = new Token("type", currentLexeme, 0);
			tokens.push(t);
		}*/
        	document.getElementById('machine-code').innerHTML = "";
  		for(var i = 0; i < tokens.length; i++){
  		  document.getElementById('machine-code').innerHTML += tokens[i].tokenName + " is a " + tokens[i].tokenKind + " on line " + tokens[i].tokenLineNumber + "<br />"; };
	     return tokens;
	}
	else{
		var t = new Token("", currentLexeme, 0);
		if(keywordTest.test(currentLexeme)){
			t.tokenKind = "keyword";
		}
		else if(typeTest.test(currentLexeme)){
			t.tokenKind = "type";
		}
		else{

		}
		if(t.tokenKind == ""){
			//console.log(currentLexeme);
			regexT(sourceCode.charAt(charPointer), charPointer+1, currentLexeme, sourceCode, tokens);	
		}
		else{
			tokens.push(t);
			regexT(sourceCode.charAt(charPointer), charPointer+1, "", sourceCode, tokens);	

		}
	}
	/*
	var nextState = testDFA.s1[sourceCode.charAt(charPointer)];
	if (testDFA.nextState.isAccepting) {var t = new Token("", "", 0)}
	if (testDFA.nextState.sourceCode.charAt(charPointer+1) !== null) {//no token yet. wait for longest match}
	*/
	/*
	var state = 's1';
        state = DFA.state.sourceCode.charAt(charPointer);
	if(DFA.state.isAccepting) {var t = new Token(DFA.state.tokenKind, "", 0);}
	if(DFA.state.sourceCode.charAt(charPointer+1) !== null) {//wait for longest match}
	//Matrix here
	*/
	/*else if(keywordTest.test(currentLexeme)){
		var t = new Token("keyword", currentLexeme, 0);
		tokens.push(t);
		regexT(sourceCode.charAt(charPointer), charPointer+1, "",
		sourceCode, tokens);
	}
	else if(typeTest.test(currentLexeme)){
		var t = new Token("type", currentLexeme, 0);
		tokens.push(t);
		regexT(sourceCode.charAt(charPointer), charPointer+1, "",
		sourceCode, tokens);
	}
	else{
		regexT(sourceCode.charAt(charPointer), charPointer+1, currentLexeme, sourceCode, tokens);
	}*/
}

//Step 2 - Input: tokens, Output: CST
function parse(tokens: Token[]){
   parseProgram(tokens);
}

function parseProgram(tokens){
  parseBlock(tokens[0..length-1]);
  //return tokens[tokens.length-1].tokenKind == "T_EOF";    
}

function parseBlock(){ //blocks inside blocks?
  parseStatementList(tokens[1..length-1]);
  //return tokens[0].tokenKind == "T_openBlock" && tokens[length-1].tokenKind == "T_closeBlock";
}

function parseStatementList(){
  parseStatement(tokens);
}

function parseStatement(){
  parsePrintStatement();
  parseAssignmentStatement();
  parseVarDeclStatement();
  parseWhileStatement();
  parseIfStatement();
  parseBlock();
}

function parsePrintStatement(){
  //T_print, T_openList, T_closeList
  parseExpr();
}

function parseAssignmentStatement(){
  //T_ID
  //T_Assign
  parseExpr();
}

function parseVarDeclStatement(){
 //T_Type, T_ID
}

function parseWhileStatement(){
  //T_while
  parseBooleanExpr();
  parseBlock();
}

function parseIfStatement(){
  //T_if
  parseBooleanExpr();
  parseBlock();
}

function parseExpr(){
  parseIntExpr();
  parseStringExpr();
  parseBooleanExpr();
  //T_ID
}

function parseIntExpr(){
 //T_Digit, T_Intop
 parseExpr();
 //or T_Digit
}

function parseStringExpr(){
  //T_openString
  parseCharList();
  //T_closeString
}

function parseBooleanExpr(){
  //T_openList
  parseExpr();
  //T_boolop
  parseExpr();
  //T_closeList
  //or, T_boolval
}

function parseCharList(){
  //empty
  //T_char
  //T_space
}

/**/
//Step 3 - Input: CST, Output: AST
function semanticAnalysis(){
  
}

//Step 4 - Input: AST, Output: Equivalent hex codes
function codeGeneration(){
  
}
