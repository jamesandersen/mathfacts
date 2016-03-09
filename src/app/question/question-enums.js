System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Mode, Operation;
    return {
        setters:[],
        execute: function() {
            (function (Mode) {
                Mode[Mode["STARTUP"] = 0] = "STARTUP";
                Mode[Mode["PRACTICE"] = 1] = "PRACTICE";
                Mode[Mode["TIMED"] = 2] = "TIMED";
            })(Mode || (Mode = {}));
            exports_1("Mode", Mode);
            ;
            (function (Operation) {
                Operation[Operation["ADDITION"] = 1] = "ADDITION";
                Operation[Operation["SUBTRACTION"] = 2] = "SUBTRACTION";
                Operation[Operation["MULTIPLICATION"] = 4] = "MULTIPLICATION";
                Operation[Operation["DIVISION"] = 8] = "DIVISION";
            })(Operation || (Operation = {}));
            exports_1("Operation", Operation);
        }
    }
});
//# sourceMappingURL=question-enums.js.map