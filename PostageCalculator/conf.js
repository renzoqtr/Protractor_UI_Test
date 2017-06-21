exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  specs: ['PostageCalculator.js'],
  jasmineNodeOpts: {
  	showColors: true,
    defaultTimeoutInterval: 30000
  }
};

