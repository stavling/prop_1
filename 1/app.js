'use strict';

var myObject = {};

var findFunction = function(object, functionName, functionArg) {
    for(var i = 0; i < object.prototypeList.length; ++i) {
        if(object.prototypeList[i].hasOwnProperty(functionName)) {
            return object.prototypeList[i][functionName].apply(this, functionArg);
        }
        var found = findFunction(object.prototypeList[i], functionName, functionArg);
        if(found) return found;
    } 
}
 
myObject.call = function (functionName, functionArg) {
    if (this.hasOwnProperty(functionName)) {
        return this[functionName].apply(this, functionArg);
    } else {
        return findFunction(this, functionName, functionArg);
    }
}; 

myObject.create = function (prototypeList) {
    if(prototypeList.constructor === Array || prototypeList === null) { 
    
            return {
                prototypeList : prototypeList, 
                create : myObject.create,
                call : myObject.call 
            };
         
    } else {
        alert("Input was not array or null");   
    }
}; 
 

var obj0 = myObject.create([]);
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);


//fixa så att argumentlistan faktiskt delar upp sig i flera argument
alert(obj3.call("func", ["hello"]));
