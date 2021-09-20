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
  * Only [`jest-circus`][1] and [`jest-jasmine2`][2] are supported as [`testRunner`][3].
* Mocha >= 5.2.0
  * Mocha >= 9.0.0 has [partial support](#known-limitations).
* Cucumber-js >= 7.0.0

## Prerequisites

[Install the Datadog Agent to collect tests data][4].

## Installing the JavaScript tracer

To install the [JavaScript tracer][5], run:

{{< code-block lang="bash" >}}
yarn add --dev dd-trace
{{< /code-block >}}

For more information, see the [JavaScript tracer installation docs][6].

## Instrument your tests

{{< tabs >}}
{{% tab "Jest" %}}

1. Configure a custom [`testEnvironment`][1] in your `jest.config.js` or however you are configuring `jest`:

```javascript
module.exports = {
  // ...
  // It may be another route. It refers to the file below.
  testEnvironment: '<rootDir>/testEnvironment.js',
  // ...
}
```

2. In `testEnvironment.js`:

```javascript
require('dd-trace').init({
  // Only activates test instrumentation on CI
  enabled: process.env.DD_ENV === 'ci',
  // Name of the service or library under test
  service: 'my-javascript-app',
  // To guarantee test span delivery
  flushInterval: 300000
})

// jest-environment-jsdom is an option too
module.exports = require('jest-environment-node')
```

<div class="alert alert-warning"><strong>Note</strong>: <code>jest-environment-node</code>, <code>jest-environment-jsdom</code>, <code>jest-jasmine2</code>, and <code>jest-circus</code> (as of Jest 27) are installed together with <code>jest</code>, so they do not normally appear in your <code>package.json</code>. If you've extracted any of these libraries in your <code>package.json</code>, make sure the installed versions are the same as the one of <code>jest</code>.</div>

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

```bash
DD_ENV=ci npm test
```


[1]: https://jestjs.io/docs/en/configuration#testenvironment-string
{{% /tab %}}

{{% tab "Mocha" %}}

Create a file in your project (for example, `init-tracer.js`) with the following contents:

```javascript
require('dd-trace').init({
  // Only activates test instrumentation on CI
  enabled: process.env.DD_ENV === 'ci',

  // Name of the service or library under test
  service: 'my-ui-app'
})
```

Add `--require init-tracer` to the run command for your `mocha` tests, for example in your `package.json`:

```json
"scripts": {
  "test": "mocha --require init-tracer"
},
```

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

```bash
DD_ENV=ci npm test
```

{{% /tab %}}
{{% tab "Cucumber" %}}

Add `--require-module dd-trace/init` to however you normally run your `cucumber-js` tests, for example in your `package.json`:

{{< code-block lang="json" filename="package.json" >}}
"scripts": {
  "test": "DD_SERVICE=my-ui-app cucumber-js --require-module=dd-trace/init"
},
{{< /code-block >}}

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci npm test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cypress" %}}

1. Set [`pluginsFile`][1] to `"dd-trace/cypress/plugin"`, for example through [`cypress.json`][2]:
{{< code-block lang="json" filename="cypress.json" >}}
{
  "pluginsFile": "dd-trace/cypress/plugin"
}
{{< /code-block >}}

If you've already defined a `pluginsFile`, you can still initialise the instrumentation with:
{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // your previous code goes here
  require('dd-trace/cypress/plugin')(on, config)
}
{{< /code-block >}}

2. Add the following line to the [`supportFile`][3]:
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// your previous code goes here
require('dd-trace/cypress/support')
{{< /code-block >}}


Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci npm test
{{< /code-block >}}



[1]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[2]: https://docs.cypress.io/guides/references/configuration#cypress-json
[3]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
{{% /tab %}}
{{< /tabs >}}

## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer. They can be either passed in on its `init()` function, or as environment variables:

`service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: (test framework name)<br/>
**Example**: `my-ui`

`env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

`url`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Environment variable**: `DD_TRACE_AGENT_URL`<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][7] options can also be used.


## Known limitations

### ES modules
[Mocha >=9.0.0][8] uses an ESM-first approach to load test files. That means that if ES modules are used (for example, by defining test files with the `.mjs` extension), _the instrumentation is limited_. Tests are detected, but there isn't visibility into your test. For more information about ES modules, see the [NodeJS documentation][9].

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
[2]: https://github.com/facebook/jest/tree/master/packages/jest-jasmine2
[3]: https://jestjs.io/docs/configuration#testrunner-string
[4]: /continuous_integration/setup_tests/agent/
[5]: https://github.com/DataDog/dd-trace-js
[6]: /tracing/setup_overview/setup/nodejs
[7]: /tracing/setup_overview/setup/nodejs/?tab=containers#configuration
[8]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[9]: https://nodejs.org/api/packages.html#packages_determining_module_system
[10]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[11]: https://github.com/ryym/mocha-each
