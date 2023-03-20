---
title: JavaScript and TypeScript Tests
kind: documentation
aliases:
  - /continuous_integration/setup_tests/javascript
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/intelligent_test_runner/javascript"
      tag: "Documentation"
      text: "Speed up your test jobs with Intelligent Test Runner"
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
  * Jest >= 28 is only supported from `dd-trace>=2.7.0`
* Mocha >= 5.2.0
  * Mocha >= 9.0.0 has [partial support](#known-limitations).
* Cucumber-js >= 7.0.0
* Cypress >= 6.7.0
  * From `dd-trace>=1.4.0`
* Playwright >= 1.18.0
  * From `dd-trace>=3.13.0` and `dd-trace>=2.26.0` for 2.x release line.

The instrumentation works at runtime, so any transpilers such as TypeScript, Webpack, Babel, or others are supported out of the box.

### Test suite level visibility compatibility
[Test suite level visibility][4] is fully supported from `dd-trace>=3.14.0` and `dd-trace>=2.27.0`. Jest, Mocha, Playwright, Cypress, and Cucumber are supported.

* Jest >= 24.8.0
  * From `dd-trace>=3.10.0`.
  * Only [`jest-circus`][1] is supported as [`testRunner`][3].
* Mocha >= 5.2.0
  * From `dd-trace>=3.10.0` and `dd-trace>=2.12.0` for 2.x release line.
* Playwright >= 1.18.0
  * From `dd-trace>=3.13.0` and `dd-trace>=2.26.0` for 2.x release line.
* Cypress >= 6.7.0
  * From `dd-trace>=3.14.0` and `dd-trace>=2.27.0` for 2.x release line.
* Cucumber >= 7.0.0
  * From `dd-trace>=3.14.0` and `dd-trace>=2.27.0` for 2.x release line.

## Configuring reporting method

To report test results to Datadog, you need to configure the Datadog JavaScript library:

{{< tabs >}}

{{% tab "On-Premises CI provider (Datadog Agent)" %}}

If you are running tests on an on-premises CI provider, such as Jenkins or self-managed GitLab CI, install the Datadog Agent on each worker node by following the [Agent installation instructions][1]. This is the recommended option as test results are then automatically linked to the underlying host metrics.

If the CI provider is using a container-based executor, set the `DD_AGENT_HOST` environment variable on all builds (which defaults to `http://localhost:8126`) to an endpoint that is accessible from within build containers, as `localhost` inside the build references the container itself and not the underlying worker node where the Datadog Agent is running.

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Admission Controller][2], which automatically sets the `DD_AGENT_HOST` environment variable in the build pods to communicate with the local Datadog Agent.


[1]: /agent
[2]: /agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

<div class="alert alert-info">Agentless mode is available in Datadog JavaScript library versions >= 2.5.0</div>

If you are using a cloud CI provider without access to the underlying worker nodes, such as GitHub Actions or CircleCI, configure the library to use the Agentless mode. For this, set the following environment variables:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][1] used to upload the test results.<br/>
**Default**: `(empty)`

Additionally, configure which [Datadog site][2] to which you want to send data.

`DD_SITE` (Required)
: The [Datadog site][2] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
{{% /tab %}}

{{< /tabs >}}

## Installing the JavaScript tracer

To install the [JavaScript tracer][5], run:

```bash
yarn add --dev dd-trace
```

For more information, see the [JavaScript tracer installation docs][6].


## Instrument your tests

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
Set the `NODE_OPTIONS` environment variable to `-r dd-trace/ci/init`. Run your tests as you normally would, specifying the environment where the tests are run in the `DD_ENV` environment variable. For example, set `DD_ENV` to `local` when running tests on a developer workstation, or `ci` when running them on a CI provider:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
```

**Important**: if you set a value for `NODE_OPTIONS`, make sure it does not overwrite `-r dd-trace/ci/init`. This can be done using the `${NODE_OPTIONS:-}` clause:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Adding custom tags to tests

You can add custom tags to your tests by using the current active span:

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][1] section of the Node.js custom instrumentation documentation.

[1]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
{{% /tab %}}

{{% tab "Playwright" %}}
Set the `NODE_OPTIONS` environment variable to `-r dd-trace/ci/init`. Run your tests as you normally would, specifying the environment where the tests are run in the `DD_ENV` environment variable. For example, set `DD_ENV` to `local` when running tests on a developer workstation, or `ci` when running them on a CI provider:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
```

**Important**: if you set a value for `NODE_OPTIONS`, make sure it does not overwrite `-r dd-trace/ci/init`. This can be done using the `${NODE_OPTIONS:-}` clause:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Adding custom tags to tests

Custom tags are not supported for Playwright.

{{% /tab %}}

{{% tab "Cucumber" %}}
Set the `NODE_OPTIONS` environment variable to `-r dd-trace/ci/init`. Run your tests as you normally would, specifying the environment where the tests are run in the `DD_ENV` environment variable. For example, set `DD_ENV` to `local` when running tests on a developer workstation, or `ci` when running them on a CI provider:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
```

**Note**: If you set a value for `NODE_OPTIONS`, make sure it does not overwrite `-r dd-trace/ci/init`. This can be done using the `${NODE_OPTIONS:-}` clause:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" jest"
  }
}
{{< /code-block >}}

### Adding custom tags to tests

You can add custom tags to your test by grabbing the current active span:

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('team_owner', 'my_team')
    // test continues normally
    // ...
  })
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][1] section of the Node.js custom instrumentation documentation.

[1]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress >=10

Use the Cypress API documentation to [learn how to write plugins][1] for `cypress>=10`.

In your `cypress.config.js` file, set the following:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/e2e.js'
  }
})
{{< /code-block >}}

Add the following line to the **top level** of your `supportFile`:

{{< code-block lang="javascript" filename="cypress/support/e2e.js" >}}
// Your code can be before this line
// require('./commands')
require('dd-trace/ci/cypress/support')
// Also supported:
// import 'dd-trace/ci/cypress/support'
// Your code can also be after this line
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

If you're using other Cypress plugins, your `cypress.config.js` file should contain the following:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // your previous code is before this line
      require('dd-trace/ci/cypress/plugin')(on, config)
    }
  }
})
{{< /code-block >}}

### Cypress<10

These are the instructions if you're using a version older than `cypress@10`.

1. Set [`pluginsFile`][2] to `"dd-trace/ci/cypress/plugin"`, for example through [`cypress.json`][3]:
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

2. Add the following line to the **top level** of your [`supportFile`][4]:
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// Your code can be before this line
// require('./commands')
require('dd-trace/ci/cypress/support')
// Your code can also be after this line
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}


Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-ui-app npm test
{{< /code-block >}}


### Adding custom tags to tests

To add additional information to your tests, such as the team owner, use `cy.task('dd:addTags', { yourTags: 'here' })` in your test or hooks.

For example:

```javascript
beforeEach(() => {
  cy.task('dd:addTags', {
    'before.each':
    'certain.information'
  })
})
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'team.owner': 'ui',
    'test.importance': 3
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][5] section of the Node.js custom instrumentation documentation.

### Cypress - RUM integration

If the browser application being tested is instrumented using [RUM][6], your Cypress test results and their generated RUM browser sessions and session replays are automatically linked. Learn more in the [RUM integration][7] guide.


[1]: https://docs.cypress.io/api/plugins/writing-a-plugin#Plugins-API
[2]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[3]: https://docs.cypress.io/guides/references/configuration#cypress-json
[4]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[5]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[6]: /real_user_monitoring/browser/#setup
[7]: /continuous_integration/guides/rum_integration/
{{% /tab %}}

{{< /tabs >}}

### Using Yarn >=2

If you're using `yarn>=2` and a `.pnp.cjs` file, and you get the following error message when using `NODE_OPTIONS`:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

You can fix it by setting `NODE_OPTIONS` to the following:

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```


## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer.

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

## Git metadata upload

From `dd-trace>=3.15.0` and `dd-trace>=2.28.0`, CI Visibility automatically uploads git metadata information (commit history). This metadata contains file names but no file contents. If you want to opt out of this behavior, you can do so by setting `DD_CIVISIBILITY_GIT_UPLOAD_ENABLED` to `false`. However, this is not recommended, as features like Intelligent Test Runner and others do not work without it.

## Known limitations

### ES modules
[Mocha >=9.0.0][8] uses an ESM-first approach to load test files. That means that if ES modules are used (for example, by defining test files with the `.mjs` extension), _the instrumentation is limited_. Tests are detected, but there isn't visibility into your test. For more information about ES modules, see the [Node.js documentation][9].

### Browser tests
Browser tests executed with `mocha`, `jest`, `cucumber`, `cypress`, and `playwright` are instrumented by `dd-trace-js`, but visibility into the browser session itself is not provided by default (for example, network calls, user actions, page loads, etc.).

If you want visibility into the browser process, consider using [RUM & Session Replay][10]. When using Cypress, test results and their generated RUM browser sessions and session replays are automatically linked. Learn more in the [RUM integration][11] guide.

### Cypress interactive mode

Cypress interactive mode (which you can enter by running `cypress open`) is not supported by CI Visibility because some cypress events, such as [`before:run`][12], are not fired. If you want to try it anyway, pass `experimentalInteractiveRunEvents: true` to the [cypress configuration file][13].


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

And use [`test.each`][14] instead:
{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

For `mocha`, use [`mocha-each`][15]:
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

## Information collected

When CI Visibility is enabled, the following data is collected from your project:

* Test names and durations.
* Predefined environment variables set by CI providers.
* Git commit history including the hash, message, author information, and files changed (without file contents).
* Information from the CODEOWNERS file.

In addition to that, if [Intelligent Test Runner][16] is enabled, the following data is collected from your project:

* Code coverage information, including file names and line numbers covered by each test.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://github.com/facebook/jest/tree/main/packages/jest-circus
[2]: https://github.com/facebook/jest/tree/main/packages/jest-jasmine2
[3]: https://jestjs.io/docs/configuration#testrunner-string
[4]: /continuous_integration/tests/#test-suite-level-visibility
[5]: https://github.com/DataDog/dd-trace-js
[6]: /tracing/trace_collection/dd_libraries/nodejs
[7]: /tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[8]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[9]: https://nodejs.org/api/packages.html#packages_determining_module_system
[10]: /real_user_monitoring/browser/
[11]: /continuous_integration/guides/rum_integration/
[12]: https://docs.cypress.io/api/plugins/before-run-api
[13]: https://docs.cypress.io/guides/references/configuration#Configuration-File
[14]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[15]: https://www.npmjs.com/package/mocha-each
[16]: /continuous_integration/intelligent_test_runner/
