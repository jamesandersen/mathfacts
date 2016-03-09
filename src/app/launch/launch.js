System.register(['angular2/core', 'angular2/common', 'angular2/router', '../question/question-enums'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, question_enums_1;
    var Launch;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (question_enums_1_1) {
                question_enums_1 = question_enums_1_1;
            }],
        execute: function() {
            /*
             * App Component
             * Top Level Component
             */
            Launch = (function () {
                function Launch() {
                    this.Mode = question_enums_1.Mode;
                }
                Launch = __decorate([
                    core_1.Component({
                        // The selector is what angular internally uses
                        // for `document.querySelectorAll(selector)` in our index.html
                        // where, in this case, selector is the string 'app'
                        selector: 'launch',
                        // We need to tell Angular's compiler which directives are in our template.
                        // Doing so will allow Angular to attach our behavior to an element
                        directives: [common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
                        providers: [],
                        pipes: [],
                        // Our list of styles in our component. We may add more to compose many styles together
                        styles: ["\n    .title {\n      font-family: Arial, Helvetica, sans-serif;\n    }\n    main {\n      padding: 1em;\n    }\n  "],
                        // Every Angular template is first compiled by the browser before Angular runs it's compiler
                        template: "\n  <div role=\"main\">\n\n    <div id=\"startup\">\n        <div class=\"mode\">\n            <div>Practice</div>\n            <span>work through problems with no time pressure</span>\n            <input [routerLink]=\"['/Practice']\" id=\"practice\" type=\"button\" class=\"roundbutton right\" />\n        </div>\n        <hr/>\n        <div class=\"mode\">\n            <div>Timed</div>\n            <span>get ready for the test</span>\n            <input [routerLink]=\"['/Timed']\" id=\"timed\" type=\"button\" class=\"roundbutton right\" />\n        </div>\n    </div>\n    <div id=\"results\">\n        <div></div>\n        <input id=\"done\" type=\"button\" class=\"roundbutton left\" />\n    </div>\n</div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Launch);
                return Launch;
            }());
            exports_1("Launch", Launch);
        }
    }
});
//# sourceMappingURL=launch.js.map