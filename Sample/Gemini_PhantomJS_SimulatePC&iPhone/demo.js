gemini.suite('1', function(suite) { 
	suite.setUrl('http://jmeter.apache.org/') 
	.before(function(actions) { actions.wait(1000); }) 
	.setCaptureElements('html') 
	.capture('plain') 
});
