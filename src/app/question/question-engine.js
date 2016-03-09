System.register(['./question-enums', './question', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var question_enums_1, question_1, core_1;
    var QuestionEngine;
    return {
        setters:[
            function (question_enums_1_1) {
                question_enums_1 = question_enums_1_1;
            },
            function (question_1_1) {
                question_1 = question_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            QuestionEngine = (function () {
                function QuestionEngine() {
                    this.questionIndex = 0;
                    this.mode = question_enums_1.Mode.STARTUP;
                    this.currentProblemIndex = 0;
                    this.timerId = null;
                    this.testStartTime = null;
                    this.lastProblem = null;
                    this.odd = true;
                }
                QuestionEngine.getOperation = function () {
                    var val = Math.floor(Math.random() * 4) + 1, bin = '0000';
                    var chars = bin.split('');
                    chars[val - 1] = '1';
                    bin = chars.join('');
                    return parseInt(bin, 2);
                };
                QuestionEngine.getQuestion = function (allowedOperations) {
                    if (allowedOperations === void 0) { allowedOperations = question_enums_1.Operation.ADDITION | question_enums_1.Operation.SUBTRACTION; }
                    var oper = QuestionEngine.getOperation(), num1 = Math.floor(Math.random() * QuestionEngine.MAX_NUMBER + 1), num2 = Math.floor(Math.random() * QuestionEngine.MAX_NUMBER + 1), answer, ready = false;
                    while (!ready) {
                        if (oper === question_enums_1.Operation.SUBTRACTION && (allowedOperations & question_enums_1.Operation.SUBTRACTION)) {
                            num1 = Math.floor(Math.random() * QuestionEngine.MAX_SUBTRACTION_NUMBER + 1);
                            num2 = Math.floor(Math.random() * QuestionEngine.MAX_SUBTRACTION_NUMBER + 1);
                            num1 = num1 + num2;
                            num2 = Math.min(num1, num2);
                            answer = num1 - num2;
                            ready = true;
                        }
                        else if (oper === question_enums_1.Operation.DIVISION && (allowedOperations & question_enums_1.Operation.DIVISION)) {
                            num1 = num1 * num2;
                            answer = num1 / num2;
                            ready = true;
                        }
                        else if (oper === question_enums_1.Operation.ADDITION && (allowedOperations & question_enums_1.Operation.ADDITION)) {
                            answer = num1 + num2;
                            ready = true;
                        }
                        else if (oper === question_enums_1.Operation.MULTIPLICATION && (allowedOperations & question_enums_1.Operation.MULTIPLICATION)) {
                            answer = num1 * num2;
                            ready = true;
                        }
                        else {
                            oper = QuestionEngine.getOperation();
                            ready = false;
                        }
                    }
                    return new question_1.Question(num1, num2, oper, answer);
                };
                QuestionEngine.TEST_SECONDS = 120;
                QuestionEngine.NUM_QUESTIONS = 30;
                QuestionEngine.MAX_NUMBER = 12;
                QuestionEngine.MAX_SUBTRACTION_NUMBER = 7;
                QuestionEngine = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], QuestionEngine);
                return QuestionEngine;
            }());
            exports_1("QuestionEngine", QuestionEngine);
        }
    }
});
//# sourceMappingURL=question-engine.js.map