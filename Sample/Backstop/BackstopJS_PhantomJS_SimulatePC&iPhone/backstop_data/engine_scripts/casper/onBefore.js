module.exports = function (casper, scenario, vp) {
  require('./loadCookies')(casper, scenario);
  if (vp.label == "iPhone6,6s,7,8") {
  	casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
  } else {
  	casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36');
  }
  casper.page.settings.resourceTimeout = 300000;
  casper.options.waitTimeout = 300000;
  casper.page.onResourceTimeout = function() {
    console.log("Phantomjs failed to donwload the resource in 5 minutes..."); 
    casper.bypass(1);
  };
};
