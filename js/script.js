/* Author:

*/

window.MF = (function()
{
	var maxNumber = 12;
	var currentAnswer;
	
	var nextQuestion = function()
	{
		var num1 = Math.floor(Math.random() * maxNumber + 1);
		var num2 = Math.floor(Math.random() * maxNumber + 1);
		
		currentAnswer = num1 + num2;
		
		$('#num1').text(num1);
		$('#num2').text(num2);
	}
	
	var clearResponse = function()
	{
		$('#response').val('');
	};
	
	var responseUpdated = function(response)
	{
		if(parseInt(response) === currentAnswer)
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
		nextQuestion();
  
	  $('#next').click(nextQuestion);
	  
	  var response = $('#response');
	  
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
		  else // assuming only valid numeric input at this point
		  {
		  	responseUpdated($(this).val());
		  }
		});
		
		response.change(function(event){
			responseUpdated($(this).val());
		});
		
		response.focus();
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
