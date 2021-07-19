const chromedriver = require('chromedriver');
const baseConfig = require('./@cucumber/cucumber.conf');

const config = {
    ...baseConfig,
    src_folders:['tests']
}
module.exports = config;
