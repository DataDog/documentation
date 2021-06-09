---
title: JavaScript Tests
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

## Compatibility

Supported test frameworks:
* Jest >=24.8.0
  * Only `jsdom` (in package `jest-environment-jsdom`) and `node` (in package `jest-environment-node`) are supported as test environments. Custom environments like `@jest-runner/electron/environment` in `jest-electron-runner` are not supported.
  * Only [`jest-circus`][1] is supported as a `testRunner`. 
* Mocha >=5.2.0

Supported CI providers:
* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## Prerequisites

[Install the Datadog Agent to collect tests data][2].

## Installing the JavaScript tracer

To install the [JavaScript tracer][3], run:

```bash
yarn add --dev dd-trace
```

For more information, see the [JavaScript tracer installation docs][4].

## Instrument your tests

### Jest instrumentation

1. Install the `jest-circus` test runner:

    ```bash
    yarn add --dev jest-circus
    ```

2. Configure a custom [testEnvironment][5] and [testRunner][6] in your `jest.config.js` or however you are configuring [jest][7]:

    ```javascript
    // jest.config.js
    module.exports = {
      // ...
      testRunner: 'jest-circus/runner',
      // It may be another route. It refers to the file below.
      testEnvironment: '<rootDir>/testEnvironment.js',
      // ...
    }
    ```

    And in `testEnvironment.js`:

    ```javascript
    require('dd-trace').init({
      service: 'ui-tests' // The name of the Test Service that will appear in the CI Tests tab.
    })
    // jest-environment-jsdom is an option too
    module.exports = require('jest-environment-node') 
    ``` 

**Note**: The default configuration should work for most cases, but depending on the volume and speed of your tests, the tracer or the Agent might drop some of the spans. Alleviate this by increasing the `flushInterval` (a value in milliseconds) when initializing the tracer:

```javascript
require('dd-trace').init({
  flushInterval: 300000
})
```

### Mocha instrumentation

Add `--require dd-trace/init` to however you normally run your `mocha` tests, for example in your your `package.json`:

```javascript
// package.json
'scripts': {
  'test': 'mocha --require dd-trace/init'
},
```

## Disabling instrumentation in local development

If you want to disable the testing instrumentation for local development (where you might not be running the Datadog Agent), these are some options:

### Jest

When initializing the tracer, check whether you are in CI:

```javascript
require('dd-trace').init({
  enabled: !!process.env.CI // the environment variable to use depends on the CI provider
})
```

### Mocha

Use different test scripts for CI and local development:

```javascript
// package.json
'scripts': {
  'test': 'mocha',
  'test:ci': 'mocha --require dd-trace/init'
},
```

## Configuration settings

| Environment variable           | Recommendation                                                         |
|--------------------------------|------------------------------------------------------------------------|
| `DD_SERVICE`                   | The name of the Test Service that appears in the Tests tab.     |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/facebook/jest/tree/master/packages/jest-circus
[2]: /continuous_integration/setup_tests/agent/
[3]: https://github.com/DataDog/dd-trace-js
[4]: /tracing/setup_overview/setup/nodejs
[5]: https://jestjs.io/docs/en/configuration#testenvironment-string
[6]: https://jestjs.io/docs/en/configuration#testrunner-string
[7]: https://jestjs.io/docs/en/configuration
