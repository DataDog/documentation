---
title: JavaScript Tests
kind: documentation
further_reading:
    - link: "/continuous_integration/setup_tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
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
  * Jest >= 28 is only supported from `dd-trace>=2.7.0`
* Mocha >= 5.2.0
  * Mocha >= 9.0.0 has [partial support](#known-limitations).
* Cucumber-js >= 7.0.0
* Cypress >= 6.7.0
  * From `dd-trace>=1.4.0`

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

To install the [JavaScript tracer][4], run:

{{< code-block lang="bash" >}}
yarn add --dev dd-trace
{{< /code-block >}}

For more information, see the [JavaScript tracer installation docs][5].


## Instrument your tests

{{< tabs >}}
{{% tab "Jest/Mocha/Cucumber" %}}
Set `NODE_OPTIONS` environment variable to `-r dd-trace/ci/init`. Run your tests as you normally would, specifying the environment where the tests are run in the `DD_ENV` environment variable. For example, set `DD_ENV` to `local` when running tests on a developer workstation, or `ci` when running them on a CI provider:

{{< code-block lang="bash" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

### Using Yarn >=2

If you're using `yarn>=2` and a `.pnp.cjs` file, and you get the following error message when using `NODE_OPTIONS`:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

You can fix it by setting `NODE_OPTIONS` to the following:

{{< code-block lang="bash" >}}
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress<10

These are the instructions if you're using a version older than `cypress@10`.

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

### Cypress >=10

Use the Cypress API documentation to [learn how to write plugins][4] for `cypress>=10`.

In your `cypress.config.js` file, set the following:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents: require('dd-trace/ci/cypress/plugin'),
    supportFile: 'cypress/support/index.js'
  }
})
{{< /code-block >}}

Your `supportFile` should look the same as in `cypress<10`:

{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// your previous code is before this line
require('dd-trace/ci/cypress/support')
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


#### Add extra tags to your Cypress test

To add additional information to your tests, such as the team owner, use `cy.task('dd:addTags', { yourTags: 'here' })` in your test or hooks.

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

#### Cypress - RUM integration

If the browser application being tested is instrumented using [RUM][5], your Cypress test results and their generated RUM browser sessions and session replays are automatically linked. Learn more in the [RUM integration][6] guide.

[1]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[2]: https://docs.cypress.io/guides/references/configuration#cypress-json
[3]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[4]: https://docs.cypress.io/api/plugins/writing-a-plugin#Plugins-API
[5]: /real_user_monitoring/browser/#setup
[6]: /continuous_integration/guides/rum_integration/
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

All other [Datadog Tracer configuration][6] options can also be used.

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
[Mocha >=9.0.0][7] uses an ESM-first approach to load test files. That means that if ES modules are used (for example, by defining test files with the `.mjs` extension), _the instrumentation is limited_. Tests are detected, but there isn't visibility into your test. For more information about ES modules, see the [NodeJS documentation][8].

### Browser tests
Browser tests executed with `mocha`, `jest`, `cucumber` and `cypress` are instrumented by `dd-trace-js`, but visibility into the browser session itself is not provided by default (for example, network calls, user actions, page loads, and so on).

If you want visibility into the browser process, consider using [RUM & Session Replay][9]. When using Cypress, test results and their generated RUM browser sessions and session replays are automatically linked. Learn more in the [RUM integration][10] guide.



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


[1]: https://github.com/facebook/jest/tree/main/packages/jest-circus
[2]: https://github.com/facebook/jest/tree/main/packages/jest-jasmine2
[3]: https://jestjs.io/docs/configuration#testrunner-string
[4]: https://github.com/DataDog/dd-trace-js
[5]: /tracing/trace_collection/dd_libraries/nodejs
[6]: /tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[7]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[8]: https://nodejs.org/api/packages.html#packages_determining_module_system
[9]: /real_user_monitoring/browser/
[10]: /continuous_integration/guides/rum_integration/
[11]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[12]: https://www.npmjs.com/package/mocha-each
