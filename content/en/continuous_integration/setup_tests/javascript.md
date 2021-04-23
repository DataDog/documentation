---
title: JavaScript Tests
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---

## Supported CI providers

* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## Jest Instrumentation

### Compatibility

* Only `jsdom` (in package `jest-environment-jsdom`) and `node` (in package `jest-environment-node`) are supported as test environments. Custom environments like `@jest-runner/electron/environment` in `jest-electron-runner` are not supported yet.
* Only [`jest-circus`][1] is supported as a `testRunner`. 

### Install dependencies
* [`dd-trace`][2]: Datadog APM tracing client for Node.js.
* [`jest-circus`][1]: Test runner for Jest.

```bash
yarn add --dev dd-trace jest-circus
```

### Configure Jest
Configure a custom [testEnvironment][3] and [testRunner][4] in your `jest.config.js` or however you are configuring [jest][5]:

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
require('dd-trace').init()
// jest-environment-jsdom is an option too
module.exports = require('jest-environment-node') 
```

The default configuration should work for most cases, but depending on the volume and speed of your tests, the tracer or the Agent might drop some of the spans. Alleviate this by increasing the `flushInterval` when initializing the tracer:

```javascript
require('dd-trace').init({
  flushInterval: 300000
})
```

## Mocha instrumentation

### Install dependencies

```bash
yarn add --dev dd-trace
```

### Configure Mocha
Add `--require dd-trace/init` to however you normally run your `mocha` tests, e.g. update your `package.json`:

```javascript
// package.json
'scripts': {
  'test': 'mocha --require dd-trace/init'
},
```

## Disable for local development

If you want to disable the testing instrumentation for local development (where you might not be running the Datadog Agent), these are some options:

### Jest

When initializing the tracer, you might check whether you are in CI:

```javascript
require('dd-trace').init({
  enabled: !!process.env.CI // the environment variable to use depends on the CI provider
})
```

### Mocha

You might use different test scripts for CI and local development:

```javascript
// package.json
'scripts': {
  'test': 'mocha',
  'test:ci': 'mocha --require dd-trace/init'
},
```


## Datadog Agent 

The Datadog Agent must be accessible by the environment you're using to run your tests on.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/facebook/jest/tree/master/packages/jest-circus
[2]: https://github.com/DataDog/dd-trace-js
[3]: https://jestjs.io/docs/en/configuration#testenvironment-string
[4]: https://jestjs.io/docs/en/configuration#testrunner-string
[5]: https://jestjs.io/docs/en/configuration
