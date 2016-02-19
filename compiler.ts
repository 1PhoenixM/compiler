//Ensure .js is working. Also makes things prettier.
document.getElementById('footer').style.color = "blue";

var tokens = [];
var verboseMode = true;

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

class CSTNode{
    constructor(public value){
		this.value = value;
    }
}

interface SymbolTableArray{
	[index: number]: SymbolTableEntry;
}

interface TokenArray{
	[index: number]: Token;
}

var DFA = {'s1' : {'+': 's2',
		   '"': 's3',
		   ' ': 's4',
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
		   '\(': 's12', //{ print ( 5 ) } $ works, but { print(5) } $ doesn't
		   '\)': 's13'
		   },
	    's6' : {'=': 's14', 'accept': 'T_assign'},
	    's7' : {'=': 's15', 'accept': 'T_notEqualTo'},
	    's10' : {
			 'accept': 'T_char'},
	    
	    //Accepting states
	    's2' : {'accept': 'T_intop'},
		's3' : {'accept': 'T_quoteString'},
		's4' : {'accept': 'T_space'},
		's5' : {'accept': 'T_EOF'},
		's8' : {'accept': 'T_openBlock'},
		's9' : {'accept': 'T_closeBlock'},
		's11' : {'accept': 'T_digit'},
		's12' : {'accept': 'T_openList'},
		's13' : {'accept': 'T_closeList'},
		's14' : {'accept': 'T_testIfEqual'},
		's15' : {'accept': 'T_notEqualTo'},
		's21' : {'f': 's44', 'n': 's56', 'accept': 'T_char'}, //if or int
		
		's44' : {'accept': 'T_keywordIf'},
		
		's45' : {'r': 's46', 'accept': 'T_char' }, //pr
		's46' : {'i': 's47' }, //pri
		's47' : {'n': 's48' }, //prin
		's48' : {'t': 's49' }, //print
		's49' : { 'accept': 'T_keywordPrint' }, //print
		
		's51' : {'h': 's52', 'accept': 'T_char' }, //wh
		's52' : {'i': 's53' }, //whi
		's53' : {'l': 's54' }, //whil
		's54' : {'e': 's55' }, //while
		's55' : { 'accept': 'T_keywordWhile' }, //while
		
		's56' : {'t': 's57' }, //in
		's57' : { 'accept': 'T_typeInt' }, //int
		
		's58' : {'o': 's59', 'accept': 'T_char' }, //bo
		's59' : {'o': 's60' }, //boo (ghost state)
		's60' : {'l': 's61' }, //bool
		's61' : {'e': 's62' }, //boole
		's62' : {'a': 's63' }, //boolea
		's63' : {'n': 's64' }, //boolean
		's64' : { 'accept': 'T_typeBoolean' }, //boolean
		
		's65' : {'t': 's66', 'accept': 'T_char' }, //st
		's66' : {'r': 's67' }, //str
		's67' : {'i': 's68' }, //stri
		's68' : {'n': 's69' }, //strin
		's69' : {'g': 's70' }, //string
		's70' : { 'accept': 'T_typeString' }, //string
		
		's71' : {'a': 's72', 'accept': 'T_char' }, //fa
		's72' : {'l': 's73' }, //fal
		's73' : {'s': 's74' }, //fals
		's74' : {'e': 's75' }, //false
		's75' : { 'accept': 'T_boolFalse' }, //false
		
		's76' : {'r': 's77', 'accept': 'T_char' }, //tr
		's77' : {'u': 's78' }, //tru
		's78' : {'e': 's79' }, //true
		's79' : { 'accept': 'T_boolTrue' } //true
		
		/*'s26' : {'accept': 'T_keyword'}, //print
		's29' : {'accept': 'T_keyword'}, //false
		's30' : {'accept': 'T_keyword'}, //true
		's43' : {'accept': 'T_keyword'}, //while*/
		
	    };

//Step 1
function lex(sourceCode: string){
  tokens = getTokenStream(sourceCode); /* handle boo and prin etc. */
  document.getElementById('machine-code').innerHTML = "";
  //console.log(sourceCode);
  if(tokens !== []){
	  
	  if(verboseMode){
		  for(var i = 0; i < tokens.length; i++){
			document.getElementById('machine-code').innerHTML += tokens[i].tokenName + " is a " + tokens[i].tokenKind + " on line " + tokens[i].tokenLineNumber + "<br />";
		  }
	  }
	  //return tokens;
	  document.getElementById('machine-code').innerHTML += "Lex complete!" + "<br />";
	  parse();
  }
  else{
	  document.getElementById('machine-code').innerHTML += "Lexical error!";
  }
}

function getTokenStream(sourceCode: String){
	var state = 's1';
	var tokens = [];
	var currentString = "";
	var lineNumber = 1;
	//var stringMode = false;
	for(var i = 0; i < sourceCode.length; i++){
		var c = sourceCode.charAt(i);
		var cnext = sourceCode.charAt(i+1);
		if(c == "\n"){
			lineNumber++;
		}
		else if(c == " "){
			state = 's1';
			currentString = "";
		}
		else{
			state = DFA[state][c];
			/*if(typeof state !== "undefined"){
				var t = new Token("T_unknown", currentString, lineNumber);
				tokens.push(t);
				return tokens;
			}*/
			if((DFA[state]['accept'] !== null && (DFA[state][cnext] === null) || cnext === '' || cnext === ' ')) { //need to handle unknown chars gracefully
			//&& DFA[state][cnext] === null && DFA[state][cnext]['accept'] === null
				currentString += c;
				if(typeof DFA[state] !== "undefined"){
					var t = new Token(DFA[state]['accept'], currentString, lineNumber);
				}
				else{
					var t = new Token("T_unknown", currentString, lineNumber);
					return [];
				}
				//Parse strings instead
				/*if(t.tokenKind == "T_quoteString" && !stringMode){
					stringMode = true;
				}
				else if(t.tokenKind == "T_quoteString" && stringMode){
					stringMode = false;
				}*/
				tokens.push(t);
				currentString = "";
				state = 's1';
			}
			else { currentString += c; }
		}
	}
	return tokens;
}

//Step 2 - Input: tokens, Output: CST

var currentToken = 0;
var logString = "";

function parse(){
   currentToken = 0;
   parseProgram();
   document.getElementById('machine-code').innerHTML += logString + "Parse complete!";
   logString = "";
}

function parseProgram(){
  parseBlock();
  if(match(["T_EOF"])) { log("Program"); }
  else { log("Parse Error - Missing End of Program marker, '$'."); }
}

function parseBlock(){ //blocks inside blocks are handled recursively
  if(match(["T_openBlock"])) {
	  parseStatementList();
	  if(match(["T_closeBlock"])){
		 log("Block");
	  }
	  else{
	     log("Parse Error - Expected '}' to end block.");
	  }
  }
  else{
	  log("Parse Error - No block found to start with '{'.");
  } 
}

function parseStatementList(){
  if(matchWithoutConsumption(["T_keywordPrint", "T_char", "T_typeInt", "T_typeString", "T_typeBoolean", "T_keywordWhile", "T_keywordIf", "T_openBlock"])){ //first sets for statements
	parseStatement();
    parseStatementList();
  }
  else{
	//nothing, no statement. epsilon
	return;
  }
  log("Statement List");
}

function parseStatement(){
  if(matchWithoutConsumption(["T_keywordPrint"])){ parsePrintStatement(); log("Statement"); }
  else if(matchWithoutConsumption(["T_char"])){ parseAssignmentStatement(); log("Statement"); }
  else if(matchWithoutConsumption(["T_typeInt"]) || match(["T_typeString"]) || match(["T_typeBoolean"])){ parseVarDeclStatement(); log("Statement"); }
  else if(matchWithoutConsumption(["T_keywordWhile"])){ parseWhileStatement(); log("Statement"); }
  else if(matchWithoutConsumption(["T_keywordIf"])){ parseIfStatement(); log("Statement"); }
  else if(matchWithoutConsumption(["T_openBlock"])){ parseBlock(); log("Statement"); } 
  else{
	log("Parse Error - Invalid statement.");
  }
}

function parsePrintStatement(){
  if(match(["T_keywordPrint"])){	
	  if(match(["T_openList"])){
		  parseExpr();
		  if(match(["T_closeList"])){
			  log("Print Statement");
		  }
		  else{
			  log("Parse Error - ')' expected to end print statement.");
		  }
	  }
	  else{
		  log("Parse Error - '(' expected after 'print'");
	  }
  }
  else{
	  log("Parse Error - 'print' expected.");
  }
  
}

function parseAssignmentStatement(){
  parseID();
  match(["T_assign"]);
  parseExpr();
  log("Assignment Statement");
}

function parseVarDeclStatement(){
  match(["T_typeInt", "T_typeString", "T_typeBoolean"]);
  parseID();
  log("Variable Declaration");
}

function parseWhileStatement(){
  if(match(["T_keywordWhile"])){
	parseBooleanExpr();
	parseBlock();
	log("While Statement");  
  }
  else{
	  log("Parse Error - Invalid while statement");
  }
}

function parseIfStatement(){
  if(match(["T_keywordIf"])){
	  parseBooleanExpr();
	  parseBlock();
	  log("If Statement");
  }
  else{
	  log("Parse Error - Invalid if statement");
  }
}

function parseExpr(){
  if(matchWithoutConsumption(["T_digit"])) { parseIntExpr(); }
  else if(matchWithoutConsumption(["T_quoteString"])) { parseStringExpr(); }
  else if(matchWithoutConsumption(["T_openList"]) || matchWithoutConsumption(["T_boolTrue"]) || matchWithoutConsumption(["T_boolFalse"])) { parseBooleanExpr(); }
  else if(matchWithoutConsumption(["T_char"])) { parseID(); }
  log("Expression");
}

function parseIntExpr(){
  if(matchWithoutConsumption(["T_digit"])){
	  if(lookahead(["T_intop"])){
		match(["T_digit"]);
		if(match(["T_intop"])){
			 parseExpr();
			 log("Integer Expression");
		}
		else{
			 log("Parse Error - Expecting +");
		}
	  } 
	  else if(match(["T_digit"])){
		  log("Integer Expression");
	  }
  }
  else{
	  log("Parse Error - Invalid Int Expr");
  }
}

function parseStringExpr(){
  if(match(["T_quoteString"])){
	  parseCharList();
	  if(match(["T_quoteString"])){
		log("String Expression");
	  }
	  else{
		log("Parse Error - Unterminated string literal");  
	  }
  }
  else{
	  log("Parse Error - String must start with \"");  
  }
}

function parseBooleanExpr(){
  if(match(["T_openList"])){
	  parseExpr();
	  if(match(["T_boolop"])){
		  parseExpr();
	      if(match(["T_closeList"])){
			  log("Boolean Expression");
		  }
		  else{
			  log("Parse Error - Expected ')' to close boolean expression");
		  }
	  }
	  else{
		  log("Parse Error - Missing boolean operator like == or !=");
	  }
	  
  }
  
  else if(match(["T_boolTrue"]) || match(["T_boolFalse"])){
	  log("Boolean Expression");
  }
  
  else{
	  log("Parse Error - Invalid Boolean Expression");
  }
   
}

function parseCharList(){
  if(match(["T_char"]) || match(["T_space"])){
	parseCharList();
  }
  else{
    //nothing. epsilon
  }
   log("Character List");
}

function parseID(){
  if(match(["T_char"])){
	  log("ID");
  }
  else{
	  log("Parse Error - Expected an ID");
  }
}

//Refactor to bool flag for 'consume'
function match(kinds: String[]){
  for(var j = 0; j < kinds.length; j++){
	if(tokens[currentToken].tokenKind === kinds[j]){
		currentToken++;
		return true;
	}
  }
  return false;
}

function matchWithoutConsumption(kinds: String[]){
  for(var j = 0; j < kinds.length; j++){
	if(tokens[currentToken].tokenKind === kinds[j]){
		return true;
	}
  }
  return false;
}

function lookahead(kinds: String[]){
  for(var j = 0; j < kinds.length; j++){
	if(tokens[currentToken+1].tokenKind === kinds[j]){
		return true;
	}
  }
  return false;
}

function log(toAdd: String){
   if(verboseMode){
      logString += toAdd + "<br />";
   }
}

function verboseToggle(){
	if(verboseMode){
		verboseMode = false;
		document.getElementById('verbose').style["background-color"] = 'grey';
		document.getElementById('verbose').innerHTML = 'Verbose OFF';
	}
	else{
		verboseMode = true;
		document.getElementById('verbose').style["background-color"] = 'green';
		document.getElementById('verbose').innerHTML = 'Verbose ON';
	}
}

/*Project 2 and beyond!*/
//Step 3 - Input: CST, Output: AST
function semanticAnalysis(){
  
}

//Step 4 - Input: AST, Output: Equivalent hex codes
function codeGeneration(){
  
}
