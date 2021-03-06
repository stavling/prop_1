'use strict';

var findFunction = function (object, functionName, functionArg) {
    if(object.superClassList !== null) {
        for (var i = 0; i < object.superClassList.length; ++i) {
            if(object.superClassList[i].hasOwnProperty(functionName)) {
                return object.superClassList[i][functionName].apply(this, functionArg);
            }
            var found = findFunction(object.superClassList[i], functionName, functionArg);
            if(found) return found;
        }    
    }
}

var createClass = function(className, superClassList) {
    
    if(typeof className === 'string' && 
       (superClassList === null || superClassList.constructor === Array)) {
        
        return {
            className : className,
            superClassList : superClassList,
            new : function () {
                var newObject = {};
                newObject.classReference = this;
                newObject.call = function(functionName, functionArg) {
                    if (this.hasOwnProperty(functionName)) {
                        return this[functionName].apply(this, functionArg);
                    } else {
                        return findFunction(this.classReference, functionName, functionArg);
                    }   
                };
                
                return newObject;
            }
        }
                                
    } else {
        alert("Wrong input");   
    }
     
};
 


var class0 = createClass("Class0", null); 
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);
alert(result); 