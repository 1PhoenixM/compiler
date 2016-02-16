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
		   '(': 's12',
		   ')': 's13'
		   },
	    's6' : {'=': 's14', 'accept': 'T_assign'},
	    's7' : {'=': 's15', 'accept': 'T_notEqualTo'},
	    's10' : {/*'r': 's16',
	    	     'a': 's17',
		     'n': 's18',
		     'o': 's19',
		     't': 's20',
		     //'f': 's21',
		     'h': 's22',*/
			 'accept': 'T_id'},
	    /*'s16' : {'i': 's23',
	    	     'u': 's24',},
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
	    's42' : {'e': 's43'},*/
	    
	    //Accepting states
	    's2' : {'accept': 'T_intop'},
		's3' : {'accept': 'T_quoteString'},
		's4' : {'accept': 'T_space'},
		's5' : {'accept': 'T_EOF'},
		's8' : {'accept': 'T_openBlock'},
		's9' : {'accept': 'T_closeBlock'},
		's11' : {'accept': 'T_digit'},
		's12' : {'accept': 'T_openArgList'},
		's13' : {'accept': 'T_closeArgList'},
		's14' : {'accept': 'T_testIfEqual'},
		's15' : {'accept': 'T_notEqualTo'},
		's21' : {'f': 's44', 'n': 's56', 'accept': 'T_id'}, //if or int
		
		's44' : {'accept': 'T_keywordIf'},
		
		's45' : {'r': 's46', 'accept': 'T_id' }, //pr
		's46' : {'i': 's47' }, //pri
		's47' : {'n': 's48' }, //prin
		's48' : {'t': 's49' }, //print
		's49' : { 'accept': 'T_keywordPrint' }, //print
		
		's51' : {'h': 's52', 'accept': 'T_id' }, //wh
		's52' : {'i': 's53' }, //whi
		's53' : {'l': 's54' }, //whil
		's54' : {'e': 's55' }, //while
		's55' : { 'accept': 'T_keywordWhile' }, //while
		
		's56' : {'t': 's57' }, //in
		's57' : { 'accept': 'T_typeInt' }, //int
		
		's58' : {'o': 's59', 'accept': 'T_id' }, //bo
		's59' : {'o': 's60' }, //boo (ghost state)
		's60' : {'l': 's61' }, //bool
		's61' : {'e': 's62' }, //boole
		's62' : {'a': 's63' }, //boolea
		's63' : {'n': 's64' }, //boolean
		's64' : { 'accept': 'T_typeBoolean' }, //boolean
		
		's65' : {'t': 's66', 'accept': 'T_id' }, //st
		's66' : {'r': 's67' }, //str
		's67' : {'i': 's68' }, //stri
		's68' : {'n': 's69' }, //strin
		's69' : {'g': 's70' }, //string
		's70' : { 'accept': 'T_typeString' }, //string
		
		's71' : {'a': 's72', 'accept': 'T_id' }, //fa
		's72' : {'l': 's73' }, //fal
		's73' : {'s': 's74' }, //fals
		's74' : {'e': 's75' }, //false
		's75' : { 'accept': 'T_boolFalse' }, //false
		
		's76' : {'r': 's77', 'accept': 'T_id' }, //tr
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
  var tokens = getTokenStream(sourceCode); /* issue: printf is recognized as print. throws away string when sees a valid keyword */
  //console.log(sourceCode);
  document.getElementById('machine-code').innerHTML = "";
  for(var i = 0; i < tokens.length; i++){
    document.getElementById('machine-code').innerHTML += tokens[i].tokenName + " is a " + tokens[i].tokenKind + " on line " + tokens[i].tokenLineNumber + "<br />";
  }
  //return tokens;
}

function getTokenStream(sourceCode: String){
	var state = 's1';
	var tokens = [];
	var currentString = "";
	var lineNumber = 1;
	var stringMode = false;
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
			if((DFA[state]['accept'] !== null && (DFA[state][cnext] === null) || cnext === '' || cnext === ' ')) { //need to handle unknown chars gracefully
			//&& DFA[state][cnext] === null && DFA[state][cnext]['accept'] === null
				currentString += c;
				var t = new Token(DFA[state]['accept'], currentString, lineNumber);
				if(t.tokenKind == "T_quoteString" && !stringMode){
					stringMode = true;
				}
				else if(t.tokenKind == "T_quoteString" && stringMode){
					stringMode = false;
				}
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
function parse(tokens: Token[]){
   parseProgram(tokens);
}

function parseProgram(tokens){
  parseBlock(tokens.slice(0, length-1));
  //return tokens[tokens.length-1].tokenKind == "T_EOF";    
}

function parseBlock(tokens){ //blocks inside blocks?
  parseStatementList(tokens.slice(1, length-1));
  //return tokens[0].tokenKind == "T_openBlock" && tokens[length-1].tokenKind == "T_closeBlock";
}

function parseStatementList(tokens){
  parseStatement(tokens);
}

function parseStatement(tokens){
  parsePrintStatement();
  parseAssignmentStatement();
  parseVarDeclStatement();
  parseWhileStatement(tokens);
  parseIfStatement(tokens);
  parseBlock(tokens);
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

function parseWhileStatement(tokens){
  //T_while
  parseBooleanExpr();
  parseBlock(tokens);
}

function parseIfStatement(tokens){
  //T_if
  parseBooleanExpr();
  parseBlock(tokens);
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
