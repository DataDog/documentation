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
* Jest >= 24.8.0
  * Only `jsdom` (in package `jest-environment-jsdom`) and `node` (in package `jest-environment-node`) are supported as test environments. Custom environments like `@jest-runner/electron/environment` in `jest-electron-runner` are not supported.
  * Only [`jest-circus`][1] is supported as a `testRunner`.
* Mocha >= 5.2.0
  * Mocha >= 9.0.0 has [partial support](#known-limitations).

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
  service: 'my-ui-app',  // Name of the service or library under test
  flushInterval: 300000  // To guarantee test span delivery
})

// jest-environment-jsdom is an option too
module.exports = require('jest-environment-node')
{{< /code-block >}}

    **Note**: `jest-environment-node` and `jest-environment-jsdom` are installed together with `jest`, so they do not normally appear in your `package.json`. If you've extracted any of these libraries in your `package.json`, make sure the installed version is the same as the one of `jest`.

Run your tests as you normally do, specifying the environment where test are being run (e.g. `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci npm test
{{< /code-block >}}

### Mocha instrumentation

Add `--require dd-trace/init` to however you normally run your `mocha` tests, for example in your `package.json`:

{{< code-block lang="javascript" filename="package.json" >}}
'scripts': {
  'test': 'DD_SERVICE=my-ui-app mocha --require dd-trace/init'
},
{{< /code-block >}}

Run your tests as you normally do, specifying the environment where test are being run (e.g. `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci npm test
{{< /code-block >}}

## Additional configuration settings

The following is a list of the most important configuration settings that can be used with the tracer. They can be either passed in on its `init()` function, or as environment variables:

`service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: (test framework name)<br/>
**Example**: `my-ui`

`env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `(empty)`<br/>
**Examples**: `local`, `ci`

`enabled`
: Setting this to `false` completely disables the instrumentation.<br/>
**Environment variable**: `DD_TRACE_ENABLED`<br/>
**Default**: `true`

`hostname`
: The Datadog Agent hostname.<br/>
**Environment variable**: `DD_TRACE_AGENT_HOSTNAME`<br/>
**Default**: `localhost`

`port`
: The Datadog Agent trace collection port.<br/>
**Environment variable**: `DD_TRACE_AGENT_PORT`<br/>
**Default**: `8126`

All other [Datadog Tracer configuration][12] options can also be used.


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
[12]: /tracing/setup_overview/setup/nodejs/?tab=containers#configuration
