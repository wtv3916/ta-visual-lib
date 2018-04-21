const interactions = require('../../../interactions.js')
module.exports = function (chromy, scenario, vp) {
  console.log('SCENARIO > ' + scenario.label);
  require('./clickAndHoverHelper')(chromy, scenario);
  // add more ready handlers here...

  if (scenario.label == 'cookie') {
    interactions
    .init(chromy, vp)
    .click('a[href="https://github.com/garris/BackstopJS"]')
    .wait_page_load()
  }

};
