const interactions = require('../../../interactions.js')
module.exports = function (chromy, scenario, vp) {
  console.log('SCENARIO > ' + scenario.label);
  require('./clickAndHoverHelper')(chromy, scenario);
  // add more ready handlers here...
  if (scenario.label == '2') {
    interactions
    .init(chromy, vp)
    .click('a[class="chromy"]:nth-child(1)')
    .sleep(5000)
  }


};
