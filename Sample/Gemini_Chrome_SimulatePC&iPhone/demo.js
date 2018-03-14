gemini.suite('1', function(suite) { 
	suite.setUrl('https://github.com/gemini-testing/gemini') 
	.before(function(actions) { actions.wait(1000); }) 
	.setCaptureElements('html') 
	.capture('plain') 
});
