import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_BINDINGS} from 'angular2/router'

import {Mode} from '../question/question-enums';
/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'launch', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  
  providers: [ ],
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./launch.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
    <div id="startup">
        <div class="mode">
            <input [routerLink]="['/Practice']" id="practice" type="button" class="roundbutton right" />
            <div>Practice</div>
            <span>work through problems with no time pressure</span>
            
        </div>
        <hr/>
        <div class="mode">
            <input [routerLink]="['/Timed']" id="timed" type="button" class="roundbutton right" />
            <div>Timed</div>
            <span>get ready for the test</span>
            
        </div>
    </div>
  `
})
export class Launch {
   public Mode: any = Mode;
}