module.exports = function (chromy, scenario, vp) {
  require('./loadCookies')(chromy, scenario);

  // IGNORE ANY CERT WARNINGS
  chromy.ignoreCertificateErrors();

  // Emulate iPhone
  if (vp.label == "iPhone6,6s,7,8") {
	chromy.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
  }
}