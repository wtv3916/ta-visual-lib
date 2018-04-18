module.exports = function(casper, scenario, vp) {
    console.log('SCENARIO> ' + scenario.label);
    require('./clickAndHoverHelper')(casper, scenario);
    console.log("Wait page loaded...");
    // Wait page finish load
    casper.waitFor(function check() {
      return this.evaluate(function(status) {
          console.log("Page load status: "+document.readyState);
          return document.readyState == "complete";
      });
    }, function then() {
      console.log("backstopjs_ready");
      var html = this.evaluate(function() {
      	return document.documentElement.outerHTML;
      });
      console.log(html.substring(0,50), "...");
    }, function timeout() { // step to execute if check has failed
      console.log("backstopjs_ready");
      console.log("timeout occured");
      console.log("exit phantomjs...");
      this.bypass(1);
    });
    // For more casper info, please refer to: http://docs.casperjs.org/en/latest/modules/casper.html
};