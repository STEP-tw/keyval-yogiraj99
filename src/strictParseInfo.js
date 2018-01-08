const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key,isCaseSensitive) {
  return list.find(function(validKey){
    if (isCaseSensitive) {
      return key==validKey;
    }
    return key.toLowerCase()==validKey.toLowerCase();
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,isCaseSensitive) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.isCaseSensitive=isCaseSensitive;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  if(!contains(this.validKeys,this.currentKey,this.isCaseSensitive))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
