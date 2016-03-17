import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, RouteParams, RouteData, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_BINDINGS} from 'angular2/router'
import {BrowserDetails, CssAnimationBuilder} from 'angular2/animate';
import {BrowserDomAdapter} from 'angular2/platform/browser';

import {Question} from '../question/question'
import {Mode, Operation} from '../question/question-enums'
import {QuestionEngine} from '../question/question-engine'

const TEST_NUM_QUESTIONS: number = 30;
   
/*
 * App Component
 * Top Level Component
 */
@Component({
   providers: [QuestionEngine], 
   // The selector is what angular internally uses
   // for `document.querySelectorAll(selector)` in our index.html
   // where, in this case, selector is the string 'app'
   selector: 'practice', // <app></app>
   // We need to tell Angular's compiler which directives are in our template.
   // Doing so will allow Angular to attach our behavior to an element
   directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
   // Our list of styles in our component. We may add more to compose many styles together
   styles: [require('./practice.less')],
   // Every Angular template is first compiled by the browser before Angular runs it's compiler
   // 
   // 
   template: require('./practice.html')
})
export class Practice implements OnInit, AfterViewInit {
   
   public question1: Question = QuestionEngine.getQuestion();
   public question2: Question = QuestionEngine.getQuestion();
   public currentQuestion: Question = this.question1;
   public answer: number;
   public mode: Mode = Mode.PRACTICE;
   public Mode: any = Mode; // expose enum template context
   public numCorrect: number = 0;
   
   // TIMED properties
   private timer: any;
   private testProgress: number = 0;
   private testQuestions: Question[] = [];
   private modalOpen: CssAnimationBuilder;

   constructor(
      private routeData: RouteData, 
      private questionEngine: QuestionEngine, 
      private browserDetails: BrowserDetails,
      private browserDomAdapter: BrowserDomAdapter) {
   }

   ngOnInit() {
      this.mode = this.routeData.get('mode') as Mode;
      if (this.mode == Mode.TIMED) {
         
         for(let x: number = 0; x < TEST_NUM_QUESTIONS; x++) {
            this.testQuestions.push(QuestionEngine.getQuestion());
         }
         this.question1 = this.currentQuestion = this.testQuestions[0];
         
         this.timer = setInterval(() => {
            this.testProgress += 0.5;
            if (this.testProgress > 100) {
               clearInterval(this.timer);
            }
         }, 500);
      }
   }
   
   ngAfterViewInit() {
      this.modalOpen = new CssAnimationBuilder(this.browserDetails)
         .addAnimationClass('modal-on-active')
         .addClass('modal-on');
   }
   
   /* Toggle questions */
   nextQuestion() {
      // get the next question
      let nextQ : Question;
      if(this.mode === Mode.TIMED) {
         let index: number = this.testQuestions.indexOf(this.currentQuestion);
         if(index < this.testQuestions.length - 1) {
            nextQ = this.testQuestions[index+1];
         } else {
            this.showResults();
            return;
         }
      } else {
         nextQ = QuestionEngine.getQuestion();
      }
      
      let onFirstQuestion = this.currentQuestion === this.question1;
      if (onFirstQuestion) {
         this.question2 = nextQ;
      } else {
         this.question1 = nextQ;
      }
      this.currentQuestion = onFirstQuestion ? this.question2 : this.question1;
      this.answer = null;
   }

   onAnswerChange(currentAnswer: number = null) {
      if(currentAnswer !== null) {
         this.answer = currentAnswer;
      }
      
      this.currentQuestion.isCorrect = this.answer === this.currentQuestion.answer;
      if ((this.mode == Mode.PRACTICE && this.currentQuestion.isCorrect) ||
          (this.mode === Mode.TIMED && currentAnswer === null)) {
         setTimeout(() => this.nextQuestion(), this.mode == Mode.TIMED ? 0 : 100);
      }
   }

   getOperationStr(op: Operation): string {
      switch (op) {
         case Operation.ADDITION:
            return "+";
         case Operation.SUBTRACTION:
            return "-";
         case Operation.MULTIPLICATION:
            return "x";
         case Operation.DIVISION:
            return "	&divide;";
      }
   }
   
   showResults() {
      clearInterval(this.timer);
      this.numCorrect = this.testQuestions.reduce(function(sum, currentQ) { return sum += currentQ.isCorrect ? 1 : 0; }, 0);
      var animation = this.modalOpen.start(this.browserDomAdapter.query('.modal'));
   }
}