import {Operation} from './question-enums';

export class Question {
   public isCorrect: boolean;
   
   constructor(public num1: number, public num2: number, public operation: Operation, public answer: number) {
   }
}