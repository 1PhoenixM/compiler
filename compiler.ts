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
function parse(){
  
}

//Step 3 - Input: CST, Output: AST
function semanticAnalysis(){
  
}

//Step 4 - Input: AST, Output: Equivalent hex codes
function codeGeneration(){
  
}
