document.getElementById('footer').style.color = "blue";
var keywordTest = new RegExp("print|while|if");
var typeTest = new RegExp("int|string|boolean");

class Token{
    constructor(public tokenKind, public tokenName, public tokenLineNumber) {
        this.tokenKind = tokenKind;
        this.tokenName = tokenName;
        this.tokenLineNumber = tokenLineNumber;
    }
}

interface TokenArray{
	[index: number]: Token;
}

//Step 1
function lex(sourceCode: string){
  tokens = regexTest(0, sourceCode, []);
  document.getElementById('machine-code').innerHTML = "";
  for(var i = 0; i < tokens.length; i++){
    document.getElementById('machine-code').innerHTML += tokens[i].tokenName + " is a " + tokens[i].tokenKind + " on line " + tokens[i].tokenLineNumber;
  }
  //return tokens;
}

//Step 1 Helper
function regexTest(charPointer: number, possibleLexeme: string, tokens: Token[]){
  if(charPointer == possibleLexeme.length){
    return tokens;
  }
  else if(keywordTest.test(possibleLexeme.substring(charPointer,possibleLexeme.length))){
    var t = new Token("keyword", possibleLexeme, 0);
    tokens.push(t);
    regexTest(charPointer+1, possibleLexeme, tokens);
  }
  else if(typeTest.test(possibleLexeme.substring(charPointer,possibleLexeme.length))){
    var t = new Token("type", possibleLexeme, 0);
    tokens.push(t);
    regexTest(charPointer+1, possibleLexeme, tokens);
  }
  else{
    regexTest(charPointer+1, possibleLexeme, tokens);
  }
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
