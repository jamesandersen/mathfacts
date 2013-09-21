/*jslint browser: true*/
/*jslint bitwise: true*/
/*jslint plusplus: true*/
/*global $, jQuery*/

window.MF = (function () {
    'use strict';

    var Modes = {
        STARTUP: 0,
        PRACTICE: 1,
        TIMED: 2
    },
        Operations = {
            ADDITION: 0x1,
            SUBTRACTION: 0x2,
            MULTIPLICATION: 0x4,
            DIVISION: 0x8
        }, TEST_SECONDS = 120,
        NUM_QUESTIONS = 30,
        maxNumber = 12,
        maxSubtractionNumber = 7,
        questionIndex = 0,
        currentAnswer, mode = Modes.STARTUP,
        currentProblemIndex = 0,
        operations = Operations.ADDITION | Operations.SUBTRACTION,
        timerId = null,
        testStartTime = null,
        lastProblem = null;

    function resetProblem(problem) {
        $(problem).css('-webkit-transition-duration', '0s');
        $(problem).css('-ms-transition-duration', '0s');
        $(problem).css('-o-transition-duration', '0s');
        $(problem).css('-moz-transition-duration', '0s');
        $(problem).css('transition-duration', '0s');
        $(problem).toggleClass('problemOut', false);
        $(problem).toggleClass('problemActive', false);

        $(problem).css('-webkit-transform', 'skewx(-30deg) translatex(-150px)');
    }
    
    function onTick() {
        var elapsed = (+new Date()) - testStartTime,
            pctElapsed;
        if (elapsed > (TEST_SECONDS * 1000)) {
            clearTimeout(timerId);
        } else {
            pctElapsed = (elapsed / (TEST_SECONDS * 1000)) * 100;
            $('#elapsed').height(pctElapsed + '%');
        }
    }
    
    function endTest() {
        clearTimeout(timerId);
        var numCorrect = $('#questions').find('.correct').length;
        $('#results').css('display', 'block');
        $("#results > div").html('Done!\n' + numCorrect + ' of ' + NUM_QUESTIONS + ' correct');
    }
    
    function nextQuestion() {
        var oper = Math.floor(Math.random() * 4 + 1),
            num1 = Math.floor(Math.random() * maxNumber + 1),
            num2 = Math.floor(Math.random() * maxNumber + 1),
            operator = '+',
            ready = false,
            foo,
            problem;
        
        if (mode === Modes.TIMED && questionIndex >= 0) {
            $('#questions').find('div').eq(questionIndex).toggleClass('current');
        }

        questionIndex++;

        if (mode === Modes.TIMED) {
            if (questionIndex === NUM_QUESTIONS) {
                endTest();
            } else {
                $('#questions').find('div').eq(questionIndex).toggleClass('current');
            }
        }
        
        while (!ready) {
            ready = true;
            if (oper === 1 && (operations & Operations.ADDITION)) {
                currentAnswer = num1 + num2;
            } else if (oper === 2 && (operations & Operations.SUBTRACTION)) {
                num1 = Math.floor(Math.random() * maxSubtractionNumber + 1);
                num2 = Math.floor(Math.random() * maxSubtractionNumber + 1);
                foo = num1;
                num1 = num1 + num2;
                currentAnswer = foo;
                operator = '-';
            } else if (oper === 3 && (operations & Operations.MULTIPLICATION)) {
                operator = '*';
            } else if (oper === 4 && (operations & Operations.DIVISION)) {
                operator = '/';
            } else {
                oper = Math.floor(Math.random() * 4 + 1);
                ready = false;
            }
        }

        // transition out the old problem
        problem = $('.problem').eq(currentProblemIndex);
        problem.toggleClass('problemActive', false);
        problem.toggleClass('problemOut', true);
        problem.css('-webkit-transform', 'skewx(30deg) translatex(150px)');
        lastProblem = problem;
        setTimeout(function () {
            resetProblem(lastProblem.get(0));
        }, 500);

        // initialize the next problem
        currentProblemIndex = (currentProblemIndex === 0 ? 1 : 0);
        problem = $('.problem').eq(currentProblemIndex);
        problem.find('.num1').text(num1);
        problem.find('.operator').text(operator);
        problem.find('.num2').text(num2);

        // transition in the new problem
        problem.css('-webkit-transition-duration', '0.5s');
        problem.css('-moz-transition-duration', '0.5s');
        problem.css('-o-transition-duration', '0.5s');
        problem.css('-ms-transition-duration', '0.5s');
        problem.css('transition-duration', '0.5s');
        problem.toggleClass('problemActive', true);

        problem.css('-webkit-transform', 'skewx(0deg) translatex(0px)');
    }

    function startPractice() {
        mode = Modes.PRACTICE;
        $('#startup').css('display', 'none');
        $('#return').css('visibility', 'visible');
        $('.question').css('display', 'block');
        nextQuestion();
    }

    function startTimed() {
        var i, questions, q;
        mode = Modes.TIMED;
        $('#startup').css('display', 'none');
        $('#progress').css('visibility', 'visible');
        $('.submit').css('visibility', 'visible');
        $('.question').css('display', 'block');

        // setup the question progress bar
        questionIndex = -1;
        questions = $('#questions');
        questions.empty();
        for (i = 0; i < NUM_QUESTIONS; i++) {
            q = $('<div class="next"/>');
            questions.append(q);
        }

        // start the timer
        testStartTime = +new Date();
        $('#elapsed').height('0%');
        timerId = setInterval(onTick, 500);
        nextQuestion();
    }

    function returnToStartup() {
        $('#results').css('display', 'none');
        $('#return').css('visibility', 'hidden');
        $('#progress').css('visibility', 'hidden');
        $('#startup').css('display', 'block');
        $('.question').css('display', 'none');
        $('.submit').css('visibility', 'hidden');
        clearTimeout(timerId);

        $('.problem').each(function (index, item) {
            resetProblem(item);
        });
    }

    function clearResponse() {
        $('.response').val('');
    }

    function responseUpdated(response) {
        var correct = parseInt(response, 10) === currentAnswer,
            questions;
        if (mode === Modes.TIMED) {
            questions = $('#questions');
            questions.find('div').eq(questionIndex).toggleClass('next');
            questions.find('div').eq(questionIndex).toggleClass(correct ? 'correct' : 'incorrect');
        }

        if (correct || mode === Modes.TIMED) {
            clearResponse();
            nextQuestion();
        }
    }

    function isValidResponseKey(keyCode) {
        return (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105) ||
            keyCode === 27 ||
            keyCode === 8;
    }

    function init() {
        $('#next').click(nextQuestion);
        $('#practice').click(startPractice);
        $('#timed').click(startTimed);
        $('#return').click(returnToStartup);
        $('#done').click(returnToStartup);

        var response = $('.response');

        // don't use keypress here because firefox doesn't yield a keycode
        response.keydown(function (event) {
            return isValidResponseKey(event.keyCode);
        });

        response.keyup(function (event) {
            if (event.keyCode === '27') {
                clearResponse();
            } else if (event.keyCode === 13) {
                if (mode === Modes.TIMED) {
                    responseUpdated($(this).val());
                }
            } else { // assuming only valid numeric input at this point 
                if (mode !== Modes.TIMED) {
                    responseUpdated($(this).val());
                }
            }
        });

        response.change(function (event) {
            responseUpdated($(this).val());
        });

        response.focus();
    }

    return {
        nextQuestion: nextQuestion,
        clearResponse: clearResponse,
        responseUpdated: responseUpdated,
        isValidResponseKey: isValidResponseKey,
        init: init
    };

}());


$(document).ready(function () {
    'use strict';

    window.MF.init();
});