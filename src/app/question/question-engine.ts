import {Mode, Operation} from './question-enums';
import {Question} from './question';
import {Injectable} from 'angular2/core';

@Injectable()
export class QuestionEngine {

   static TEST_SECONDS: number = 120;
   static NUM_QUESTIONS: number = 30;
   static MAX_NUMBER: number = 12;
   static MAX_SUBTRACTION_NUMBER: number = 7;
   questionIndex = 0;
   currentAnswer;
   mode = Mode.STARTUP;
   currentProblemIndex = 0;
   timerId = null;
   testStartTime = null;
   lastProblem = null;
   odd: boolean = true;

   static getOperation() : Operation {
           var val = Math.floor(Math.random() * 4) + 1,
               bin = '0000';
           var chars = bin.split('');
           chars[val - 1] = '1';
           bin = chars.join('');
           
           return parseInt(bin, 2);
        }

   static getQuestion(allowedOperations: number = Operation.ADDITION | Operation.SUBTRACTION): Question {

      var oper = QuestionEngine.getOperation(),
         num1 = Math.floor(Math.random() * QuestionEngine.MAX_NUMBER + 1),
         num2 = Math.floor(Math.random() * QuestionEngine.MAX_NUMBER + 1),
         answer,
         ready = false;

      while (!ready) {
         if (oper === Operation.SUBTRACTION && (allowedOperations & Operation.SUBTRACTION)) {
            num1 = Math.floor(Math.random() * QuestionEngine.MAX_SUBTRACTION_NUMBER + 1);
            num2 = Math.floor(Math.random() * QuestionEngine.MAX_SUBTRACTION_NUMBER + 1);
            num1 = num1 + num2;
            num2 = Math.min(num1, num2);
            answer = num1 - num2;
            ready = true;
         } else if (oper === Operation.DIVISION && (allowedOperations & Operation.DIVISION)) {
            num1 = num1 * num2;
            answer = num1 / num2;
            ready = true;
         } else if(oper === Operation.ADDITION && (allowedOperations & Operation.ADDITION)) {
            answer = num1 + num2;
            ready = true;
         } else if(oper === Operation.MULTIPLICATION && (allowedOperations & Operation.MULTIPLICATION)) {
            answer = num1 * num2;
            ready = true;
         } else {
            oper = QuestionEngine.getOperation();
            ready = false;
         }
      }

      return new Question(num1, num2, oper, answer);
   }
}