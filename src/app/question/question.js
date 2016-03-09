System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Question;
    return {
        setters:[],
        execute: function() {
            Question = (function () {
                function Question(num1, num2, operation, answer) {
                    this.num1 = num1;
                    this.num2 = num2;
                    this.operation = operation;
                    this.answer = answer;
                }
                return Question;
            }());
            exports_1("Question", Question);
        }
    }
});
//# sourceMappingURL=question.js.map