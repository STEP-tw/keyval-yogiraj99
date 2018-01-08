const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys are in lower case with number and actual is in upperrCase with number",function(){
    let kvParser=new StrictParser(["name_123"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME_123"]="jayanth";
    let parsed=kvParser.parse("NAME_123=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys are in lower case and actual is in mixture of lowerCase and upperrCase",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["nAmE"]="jayanth";
    let parsed=kvParser.parse("nAmE=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys are in lower case and actual is in mixture of lowerCase and upperrCase",function(){
    let kvParser=new StrictParser(["name","age"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["nAmE"]="jayanth";
    expected["aGe"]="20";
    let parsed=kvParser.parse("nAmE=jayanth aGe=20");
    assert.deepEqual(parsed,expected);
  });
});

describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });
});

describe("strict parser that is case sensitive byDefault",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"]);
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });
});
