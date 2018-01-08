const src=function(filePath){return "../src/"+filePath};
const errors=function(filePath){return "../src/errors/"+filePath};

const assert = require('chai').assert;
const StrictParser=require(src('index.js')).StrictParser;
const InvalidKeyError=require(errors('invalidKeyError.js'));

var invalidKeyErrorChecker=function(key,pos) {
  return function(err) {
    if(err instanceof InvalidKeyError && err.invalidKey==key && err.position==pos)
      return true;
    return false;
  }
}

describe("strict parser",function(){
  it("should only parse keys that are specified for a single key",function(){
    let kvParser=new StrictParser(["name"]);
    let expected=()=>{
      try {
        var p=kvParser.parse("age=23");
      } catch (e) {
        return invalidKeyErrorChecker("age",5)(e);
      }
    }
    assert.isTrue(expected());
  });

  it("should only parse keys that are specified for multiple keys",function(){
    let kvParser=new StrictParser(["name","age"]);
    let actualValue=kvParser.parse("name=john age=23");
    let expectedValue={name:"john",age:"23"};
    assert.ownInclude(expectedValue,actualValue);
    let expected=()=>{
      try {
        var p=kvParser.parse("color=blue");
      } catch (e) {
        return invalidKeyErrorChecker("color",9)(e);
      }
    }
    assert.isTrue(expected());
  });

  it("should throw an error when one of the keys is not valid",function(){
    let errorValidator=invalidKeyErrorChecker("color",20);
    let expected=()=>{
      try {
        let kvParser=new StrictParser(["name","age"]);
        kvParser.parse("name=john color=blue age=23");
      } catch (e) {
        return errorValidator(e);
      }
    }
    assert.isTrue(expected());
  });

  it("should throw an error on invalid key when there are spaces between keys and assignment operators",function(){
    let errorValidator=invalidKeyErrorChecker("color",13);
    let expected=()=>{
      try {
        let kvParser=new StrictParser(["name","age"]);
        kvParser.parse("color   = blue");
      } catch (e) {
        return errorValidator(e);
      }
    }
    assert.isTrue(expected());
  });

  it("should throw an error on invalid key when there are quotes on values",function(){
    let errorValidator=invalidKeyErrorChecker("color",15);
    let expected=()=>{
      try {
        let kvParser=new StrictParser(["name","age"]);
        kvParser.parse("color   = \"blue\"");
      } catch (e) {
        return errorValidator(e);
      }
    }
    assert.isTrue(expected());
  });

  it("should throw an error on invalid key when there are cases of both quotes and no quotes",function(){
    let errorValidator=invalidKeyErrorChecker("color",33);
    let expected=()=>{
      try {
        let kvParser=new StrictParser(["name","age"]);
        kvParser.parse("name = john color   = \"light blue\"");
      } catch (e) {
        return errorValidator(e);
      }
    }
    assert.isTrue(expected());
  });

  it("should throw an error when no valid keys are specified",function(){
    let errorValidator=invalidKeyErrorChecker("name",8);
    let expected=()=>{
      try {
        let kvParser=new StrictParser([]);
        kvParser.parse("name=john");
      } catch (e) {
        return errorValidator(e);
      }
    }
    assert.isTrue(expected());
  });

  it("should throw an error when no array is passed",function(){
    let errorValidator=invalidKeyErrorChecker("name",8);
    let expected=()=>{
      try {
        let kvParser=new StrictParser([]);
        kvParser.parse("name=john");
      } catch (e) {
        return errorValidator(e);
      }
    }
    assert.isTrue(expected());
  });

});
