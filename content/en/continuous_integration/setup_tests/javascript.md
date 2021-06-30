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
  * Mocha >=9.0.0 has [partial support](#known-limitations).

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

{{< code-block lang="bash" >}}
yarn add --dev dd-trace
{{< /code-block >}}

For more information, see the [JavaScript tracer installation docs][4].

## Instrument your tests

### Jest instrumentation

1. Install the `jest-circus` test runner:

    {{< code-block lang="bash" >}}
yarn add --dev jest-circus
{{< /code-block >}}


    **Important**: The installed version of `jest-circus` and `jest` must be the same. For example, if you're using `jest@25.5.4`, run:
    {{< code-block lang="bash" >}}
yarn add --dev jest-circus@25.5.4
{{< /code-block >}}

2. Configure a custom [testEnvironment][5] and [testRunner][6] in your `jest.config.js` or however you are configuring [jest][7]:

    {{< code-block lang="javascript" filename="jest.config.js" >}}
module.exports = {
  // ...
  testRunner: 'jest-circus/runner',
  // It may be another route. It refers to the file below.
  testEnvironment: '<rootDir>/testEnvironment.js',
  // ...
}
{{< /code-block >}}

    And in `testEnvironment.js`:

    {{< code-block lang="javascript" filename="testEnvironment.js" >}}
require('dd-trace').init({
  service: 'ui-tests' // The name of the Test Service that will appear in the CI Tests tab.
})
// jest-environment-jsdom is an option too
module.exports = require('jest-environment-node')
{{< /code-block >}}

    **Important**: `jest-environment-node` and `jest-environment-jsdom` are installed together with `jest`, so they do not normally appear in your `package.json`. If you've extracted any of these libraries in your `package.json`, make sure the installed version is the same as the one of `jest`.

**Note**: The default configuration should work for most cases, but depending on the volume and speed of your tests, the tracer or the Agent might drop some of the spans. Alleviate this by increasing the `flushInterval` (a value in milliseconds) when initializing the tracer:

{{< code-block lang="javascript" >}}
require('dd-trace').init({
  flushInterval: 300000
})
{{< /code-block >}}

### Mocha instrumentation

Add `--require dd-trace/init` to however you normally run your `mocha` tests, for example in your `package.json`:

{{< code-block lang="javascript" >}}
// package.json
'scripts': {
  'test': 'mocha --require dd-trace/init'
},
{{< /code-block >}}

## Disabling instrumentation in local development

If you want to disable the testing instrumentation for local development (where you might not be running the Datadog Agent), these are some options:

### Jest

When initializing the tracer, check whether you are in CI:

{{< code-block lang="javascript" >}}
require('dd-trace').init({
  enabled: !!process.env.CI // the environment variable to use depends on the CI provider
})
{{< /code-block >}}

### Mocha

Use different test scripts for CI and local development:

{{< code-block lang="javascript" >}}
// package.json
'scripts': {
  'test': 'mocha',
  'test:ci': 'mocha --require dd-trace/init'
},
{{< /code-block >}}

## Known limitations

### ES modules
[Mocha >=9.0.0][8] uses an ESM-first approach to load test files. That means that if ES modules are used (for example, by defining test files with the `.mjs` extension), _the instrumentation will be limited_. Tests are detected, but there isn't visibility into your test. For more information about ES modules, see [the NodeJS documentation][9].

### Browser tests
The JavaScript tracer does not support browsers, so if you run browser tests with `mocha` or `jest`, there isn't visibility within the test itself.

## Best practices

Follow these practices to take full advantage of the testing framework and CI Visibility.


### Parameterized tests

Whenever possible, leverage the tools that testing frameworks provide for parameterized tests. For example, for `jest`:

Avoid this:
{{< code-block lang="javascript" >}}
[[1,2,3], [3,4,7]].forEach((a,b,expected) => {
  test('sums correctly', () => {
    expect(a+b).toEqual(expected)
  })
})
{{< /code-block >}}

And use [`test.each`][10] instead:
{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

For `mocha`, use [`mocha-each`][11]:
{{< code-block lang="javascript" >}}
const forEach = require('mocha-each');
forEach([
  [1,2,3],
  [3,4,7]
])
.it('adds %i and %i then returns %i', (a,b,expected) => {
  expect(a+b).to.equal(expected)
});
{{< /code-block >}}

When you use this approach, both the testing framework and CI Visibility can tell your tests apart.


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
[8]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[9]: https://nodejs.org/api/packages.html#packages_determining_module_system
[10]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[11]: https://github.com/ryym/mocha-each
