document.getElementById('footer').style.color = "blue";
var keywordTest = "print|while|if";
var typeTest = "int|string|boolean";

class Token{
    kind : string;
    name : string;
    lineNumber : int;
    constructor(public kind, public name, public lineNumber) {
        this.kind = kind;
        this.name = name;
        this.lineNumber = lineNumber;
    }
}

//Step 1
function lex(sourceCode: string){
  tokens = regexTest(0, sourceCode, []);
  document.getElementById('machine-code').innerHTML = "";
  for(i = 0; i < tokens.length; i++){
    document.getElementById('machine-code').innerHTML += tokens[i].name + " is a " + tokens[i].kind + " on line " + tokens[i].lineNumber;
  }
  //return tokens;
}

//Step 1 Helper
function regexTest(charPointer: int, possibleLexeme: string, tokens: array){
  if(charPointer == possibleLexeme.length){
    return tokens;
  }
  else if(possibleLexeme.substring(charPointer,possibleLexeme.length).test(keywordTest)){
    t = new Token("keyword", possibleLexeme, 0);
    tokens.push(t);
    regexTest(charPointer+1, possibleLexeme, tokens);
  }
  else if(possibleLexeme.substring(charPointer,possibleLexeme.length).test(typeTest)){
    t = new Token("type", possibleLexeme, 0);
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
