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
* Cucumber-js >= 7.0.0

## Prerequisites

[Install the Datadog Agent to collect tests data][2].

## Installing the JavaScript tracer

To install the [JavaScript tracer][3], run:

{{< code-block lang="bash" >}}
yarn add --dev dd-trace
{{< /code-block >}}

For more information, see the [JavaScript tracer installation docs][4].

## Instrument your tests

{{< tabs >}}
{{% tab "Jest" %}}

1. Install the `jest-circus` test runner:

```bash
yarn add --dev jest-circus
```

**Important**: The installed version of `jest-circus` and `jest` must be the same. For example, if you're using `jest@25.5.4`, run:

```bash
yarn add --dev jest-circus@25.5.4
```

2. Configure a custom [testEnvironment][1] and [testRunner][2] in your `jest.config.js` or however you are configuring `jest`:

```javascript
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
  // Only activates test instrumentation on CI
  enabled: process.env.DD_ENV === 'ci',

  // Name of the service or library under test
  service: 'my-ui-app',

  // To guarantee test span delivery
  flushInterval: 300000
})

// jest-environment-jsdom is an option too
module.exports = require('jest-environment-node')
```

<div class="alert alert-warning"><strong>Note</strong>: <code>jest-environment-node</code> and <code>jest-environment-jsdom</code> are installed together with <code>jest</code>, so they do not normally appear in your <code>package.json</code>. If you've extracted any of these libraries in your <code>package.json</code>, make sure the installed version is the same as the one of <code>jest</code>.</div>

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

```bash
DD_ENV=ci npm test
```


[1]: https://jestjs.io/docs/en/configuration#testenvironment-string
[2]: https://jestjs.io/docs/en/configuration#testrunner-string
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

All other [Datadog Tracer configuration][5] options can also be used.

### Collecting Git and build metadata

Correct Git information is essential for the CI visibility product. Both pipeline visualization and testing instrumentation use git to identify and group their results. Git metadata and build information is automatically collected using CI provider environment variables and is also collected using the local `.git` folder at the project path.

The user can also provide Git information by using custom environment variables. This is useful for adding Git information for non-supported CI providers, or for .git folders that are not available from the running process. Custom environment variables are also useful for overwriting existing Git information. If these environment variables are set, they take precedence over those coming from the CI or from the .git folder. The list of supported environment variables for Git information includes the following:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored.
**Example**: `git@github.com:MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Branch where this commit belongs.
**Example**: `develop`

`DD_GIT_TAG`
: Tag of the commit, if it has one.
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Commit SHA.
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Author name.
**Example**: `John Doe`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Author email.
**Example**: `john@doe.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Author date. ISO 8601 format.
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Committer name.
**Example**: `Jane Doe`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Committer email.
**Example**: `jane@doe.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Committer date. ISO 8601 format.
**Example**: `2021-03-12T16:00:28Z`


## Known limitations

### ES modules
[Mocha >=9.0.0][6] uses an ESM-first approach to load test files. That means that if ES modules are used (for example, by defining test files with the `.mjs` extension), _the instrumentation is limited_. Tests are detected, but there isn't visibility into your test. For more information about ES modules, see the [NodeJS documentation][7].

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

And use [`test.each`][8] instead:
{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

For `mocha`, use [`mocha-each`][9]:
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
[5]: /tracing/setup_overview/setup/nodejs/?tab=containers#configuration
[6]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[7]: https://nodejs.org/api/packages.html#packages_determining_module_system
[8]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[9]: https://github.com/ryym/mocha-each
