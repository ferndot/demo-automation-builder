// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'demo-rule-engine',
      // TODO: Use an environment variable for this
      url: 'http://localhost:8080/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}
