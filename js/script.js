/* Author: James Andersen
*/

window.MF = (function()
{
	var Modes = {
		STARTUP : 0,
		PRACTICE : 1,
		TIMED : 2
	};
	
	var TEST_SECONDS = 120;
	var NUM_QUESTIONS = 30;
	
	var maxNumber = 12;
	var questionIndex = 0;
	var currentAnswer;
	var mode = Modes.STARTUP;
	var nextQuestionId = "question1";
	var timerId = null;
	var testStartTime = null;
	
	var startPractice = function()
	{
		mode = Modes.PRACTICE;
		$('#startup').css('display', 'none');
		$('#return').css('visibility', 'visible');
		$('.question').css('visibility', 'visible');
		nextQuestion();
	};
	
	var startTimed = function()
	{
		mode = Modes.TIMED;
		$('#startup').css('display', 'none');
		$('#progress').css('visibility', 'visible');
		//$('#return').css('visibility', 'visible');
		$('.submit').css('visibility', 'visible');
		$('.question').css('visibility', 'visible');
		
		// setup the question progress bar
		questionIndex = -1;
		var questions = $('#questions');
		questions.empty();
		for(var i = 0; i < NUM_QUESTIONS; i++)
		{
			var q = $('<div class="' + (i === 0 ? 'next' : 'next') + '"/>');
			questions.append(q);
		}
		
		// start the timer
		testStartTime = +new Date();
		$('#elapsed').height('0%');
		timerId = setInterval(onTick, 500);
		nextQuestion();
	};
	
	var onTick = function()
	{
		var elapsed = (+new Date()) - testStartTime;
		if(elapsed > (TEST_SECONDS * 1000))
		{
			clearTimeout(timerId);
		}
		else
		{
			var pctElapsed = (elapsed / (TEST_SECONDS * 1000)) * 100;
			$('#elapsed').height(pctElapsed + '%');
		}
	}
	
	var endTest = function()
	{
		clearTimeout(timerId);
		var numCorrect = $('#questions').find('.correct').length;
		alert('Done!\n' + numCorrect + ' of ' + NUM_QUESTIONS + ' correct');
		returnToStartup();
	};
	
	var returnToStartup = function()
	{
		$('#return').css('visibility', 'hidden');
		$('#progress').css('visibility', 'hidden');
		$('#startup').css('display', 'block');
		$('.question').css('visibility', 'hidden');
		$('.submit').css('visibility', 'hidden');
		clearTimeout(timerId);
	};
	
	var nextQuestion = function()
	{
		if(mode === Modes.TIMED && questionIndex >= 0)
		{
			$('#questions').find('div').eq(questionIndex).toggleClass('current');
		}
		
		questionIndex++;
		
		if(mode === Modes.TIMED)
		{
			if(questionIndex === NUM_QUESTIONS)
			{
				endTest();
			}
			else
			{
				$('#questions').find('div').eq(questionIndex).toggleClass('current');
			}
		}
		
		var num1 = Math.floor(Math.random() * maxNumber + 1);
		var num2 = Math.floor(Math.random() * maxNumber + 1);
		
		currentAnswer = num1 + num2;
		
		$('#' + nextQuestionId).find('.num1').text(num1);
		$('#' + nextQuestionId).find('.num2').text(num2);
	};
	
	var clearResponse = function()
	{
		$('.response').val('');
	};
	
	var responseUpdated = function(response)
	{
		var correct = parseInt(response) === currentAnswer;
		if(mode === Modes.TIMED)
		{
			var questions = $('#questions');
			questions.find('div').eq(questionIndex).toggleClass('next');
			questions.find('div').eq(questionIndex).toggleClass(correct ? 'correct' : 'incorrect');
		}
			
		if(correct || mode === Modes.TIMED)
		{
			clearResponse();
			nextQuestion();
		}
	};
	
	var isValidResponseKey = function(keyCode)
	{
		return (keyCode >= 48 && keyCode <= 57) || 
	  		 	(keyCode >= 96 && keyCode <= 105) ||
	  			keyCode === 27 || 
	  			keyCode === 8;

	};
	
	var init = function()
	{
		$('#next').click(nextQuestion);
		$('#practice').click(startPractice);
		$('#timed').click(startTimed);
		$('#return').click(returnToStartup);
	  
		var response = $('.response');
	  
		response.keypress(function(event) {
		  return MF.isValidResponseKey(event.keyCode);
		});
	
		response.keyup(function(event) {
		  if (event.keyCode == '27') {
		     clearResponse();
		  }
		  else if(event.keyCode === 8)
		  {
		  	// do nothing
		  }
		  else if(event.keyCode === 13)
		  {
			if(mode === Modes.TIMED)
			{
				responseUpdated($(this).val());
			}
		  }
		  else // assuming only valid numeric input at this point
		  {
		  	if(mode !== Modes.TIMED)
			{
				responseUpdated($(this).val());
			}
		  }
		});
		
		response.change(function(event){
			responseUpdated($(this).val());
		});
		
		response.focus();
		
		$('#submit').click(function(event){
			responseUpdated($('#' + nextQuestionId).find('.response').val());
		});
	};
	
	return {
		nextQuestion: nextQuestion,
		clearResponse: clearResponse,
		responseUpdated: responseUpdated,
		isValidResponseKey: isValidResponseKey,
		init : init
	};

})();


$(document).ready(function(){
	
	// Run Matt Kersley's jQuery Responsive menu plugin (see plugins.js)
	if ($.fn.mobileMenu) {
		$('ol#id').mobileMenu({
			switchWidth: 768,                   // width (in px to switch at)
			topOptionText: 'Choose a page',     // first option text
			indentString: '&nbsp;&nbsp;&nbsp;'  // string for indenting nested items
		});
	}

	// Run Mathias Bynens jQuery placeholder plugin (see plugins.js)
	if ($.fn.placeholder) {
		$('input, textarea').placeholder();		
	}
	
	MF.init();
});
