/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';


import {Mode} from './question/question-enums';
import {Launch} from './launch/launch';
import {Practice} from './practice/practice';

require('./shared.less')

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ FORM_PROVIDERS, HTTP_PROVIDERS, ROUTER_PROVIDERS],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ROUTER_DIRECTIVES ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  /*styles: [`
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    main {
      padding: 1em;
    }
  `],*/
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./app.less') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <div class="container">
    <div class="light" id="l1"></div>
    <div class="light" id="l2"></div>
    <div class="light" id="l3"></div>
    <header role="banner">
        <h2><span>Math</span>FACTS</h2>
    </header>
    <div class="content clearfix" role="main">
      <router-outlet></router-outlet>
    </div>
  </div>
  `
})
@RouteConfig([
  {path: '/', name: 'LaunchCmp', component: Launch},
  {path: '/practice', name: 'Practice', component: Practice, data: { mode: Mode.PRACTICE }},
  {path: '/timed', name: 'Timed', component: Practice, data: { mode: Mode.TIMED }}
])
export class App {
  // These are member type
  title: string;
  data: Array<any> = []; // default data
  // TypeScript public modifiers
  constructor(public http: Http) {
    this.title = 'Angular 2';
  }

  onInit() {
    // Our API
    // Before you start the app, run these commands in another process:
    //
    // - npm run express-install
    // - npm run express
    //
    // This will start a process that will listen for requests on port 3001

    const BASE_URL = 'http://localhost:3001';
    const TODO_API_URL = '/api/todos';
    //const JSON_HEADERS = new Headers();

    //JSON_HEADERS.append('Accept', 'application/json');
    //JSON_HEADERS.append('Content-Type', 'application/json');
    
    /*
    this.http
      .get(BASE_URL + TODO_API_URL, {
        headers: JSON_HEADERS
      })
      .subscribe(
        // onNext callback
        data => this.serverData(data),
        // onError callback
        err  => this.errorMessage(err),
        // onComplete callback
        ()   => console.log('complete')
      );//end http
      */
  }


}



/*
 * Please review the examples/ folder for more angular app examples
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * you can change the `entry` in webpack.config to quickly view the examples
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
