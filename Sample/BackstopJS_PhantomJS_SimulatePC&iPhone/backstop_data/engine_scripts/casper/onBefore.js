module.exports = function (casper, scenario, vp) {
  require('./loadCookies')(casper, scenario);
  casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36');
  casper.page.settings.resourceTimeout = 300000;
  casper.options.waitTimeout = 300000;
  casper.page.onResourceTimeout = function() {
    console.log("Phantomjs failed to donwload the resource in 5 minutes..."); 
    casper.bypass(1);
  };
};
