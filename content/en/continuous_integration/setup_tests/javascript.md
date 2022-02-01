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

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

Supported test frameworks:
* Jest >= 24.8.0
  * Only `jsdom` (in package `jest-environment-jsdom`) and `node` (in package `jest-environment-node`) are supported as test environments. Custom environments like `@jest-runner/electron/environment` in `jest-electron-runner` are not supported.
  * Only [`jest-circus`][1] and [`jest-jasmine2`][2] are supported as [`testRunner`][3].
* Mocha >= 5.2.0
  * Mocha >= 9.0.0 has [partial support](#known-limitations).
* Cucumber-js >= 7.0.0
* Cypress >= 6.7.0
  * From `dd-trace>=1.4.0`

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

// Only activates test instrumentation on CI
if (process.env.DD_ENV === 'ci') {
  require('dd-trace/ci/jest/env')
}

// jest-environment-jsdom is an option too
module.exports = require('jest-environment-node')
```

<div class="alert alert-warning"><strong>Note</strong>: <code>jest-environment-node</code>, <code>jest-environment-jsdom</code>, <code>jest-jasmine2</code>, and <code>jest-circus</code> (as of Jest 27) are installed together with <code>jest</code>, so they do not normally appear in your <code>package.json</code>. If you've extracted any of these libraries in your <code>package.json</code>, make sure the installed versions are the same as the one of <code>jest</code>.</div>

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

```bash
DD_ENV=ci DD_SERVICE=my-javascript-app npm test
```


[1]: https://jestjs.io/docs/en/configuration#testenvironment-string
{{% /tab %}}

{{% tab "Mocha" %}}

Add `--require dd-trace/ci/init` to the run command for your `mocha` tests, for example in your `package.json`:

```json
"scripts": {
  "test": "mocha --require dd-trace/ci/init"
},
```

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

```bash
DD_ENV=ci DD_SERVICE=my-javascript-app npm test
```

{{% /tab %}}
{{% tab "Cucumber" %}}

Add `--require-module dd-trace/ci/init` to however you normally run your `cucumber-js` tests, for example in your `package.json`:

{{< code-block lang="json" filename="package.json" >}}
"scripts": {
  "test": "cucumber-js --require-module=dd-trace/ci/init"
},
{{< /code-block >}}

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci DD_SERVICE=my-javascript-app npm test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cypress" %}}

1. Set [`pluginsFile`][1] to `"dd-trace/ci/cypress/plugin"`, for example through [`cypress.json`][2]:
{{< code-block lang="json" filename="cypress.json" >}}
{
  "pluginsFile": "dd-trace/ci/cypress/plugin"
}
{{< /code-block >}}

If you've already defined a `pluginsFile`, you can still initialize the instrumentation with:
{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // your previous code is before this line
  require('dd-trace/ci/cypress/plugin')(on, config)
}
{{< /code-block >}}

2. Add the following line to the [`supportFile`][3]:
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// your previous code is before this line
require('dd-trace/ci/cypress/support')
{{< /code-block >}}


Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci DD_SERVICE=my-ui-app npm test
{{< /code-block >}}

### Add extra tags

To add additional information to your tests such as the responsible team, use `cy.task('dd:addTags', { yourTags: 'here' })` in your test or hooks.

For example:

{{< code-block lang="javascript">}}
beforeEach(() => {
  cy.task('dd:addTags', { 'before.each': 'certain.information' })
})
it('renders a hello world', () => {
  cy.task('dd:addTags', { 'team.owner': 'ui' })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
{{< /code-block >}}


### CI Visibility - RUM

If your page under test is instrumented using [RUM][4], a link between your `cypress` tests and the RUM sessions generated within those tests will be created automatically.


[1]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[2]: https://docs.cypress.io/guides/references/configuration#cypress-json
[3]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[4]: /real_user_monitoring/browser/
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

### Collecting Git metadata

Datadog uses Git information for visualizing your test results and grouping them by repository, branch, and commit. Git metadata is automatically collected by the test instrumentation from CI provider environment variables and the local `.git` folder in the project path, if available.

If you are running tests in non-supported CI providers or with no `.git` folder, you can set the Git information manually using environment variables. These environment variables take precedence over any auto-detected information. Set the following environment variables to provide Git information:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.<br/>
**Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Git branch being tested. Leave empty if providing tag information instead.<br/>
**Example**: `develop`

`DD_GIT_TAG`
: Git tag being tested (if applicable). Leave empty if providing branch information instead.<br/>
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Full commit hash.<br/>
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.<br/>
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Commit author name.<br/>
**Example**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.<br/>
**Example**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Commit committer name.<br/>
**Example**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.<br/>
**Example**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`


## Known limitations

### ES modules
[Mocha >=9.0.0][8] uses an ESM-first approach to load test files. That means that if ES modules are used (for example, by defining test files with the `.mjs` extension), _the instrumentation is limited_. Tests are detected, but there isn't visibility into your test. For more information about ES modules, see the [NodeJS documentation][9].

### Browser tests
The JavaScript tracer does not support browsers, so browser tests with `mocha` or `jest` do not provide visibility on the browser. For tests with `cypress`, `dd-trace` provides visibility on the node process running the test, but not on the browser.

If you want visibility on the browser, consider [Real User Monitoring][10].

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

And use [`test.each`][11] instead:
{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

For `mocha`, use [`mocha-each`][12]:
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
[10]: /real_user_monitoring/browser/
[11]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[12]: https://github.com/ryym/mocha-each
