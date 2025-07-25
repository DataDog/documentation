---
title: JavaScript and TypeScript Tests
code_lang: javascript
type: multi-code-lang
code_lang_weight: 20
aliases:
  - /continuous_integration/setup_tests/javascript
  - /continuous_integration/tests/javascript
  - /continuous_integration/tests/setup/javascript
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/test_impact_analysis/javascript"
      tag: "Documentation"
      text: "Speed up your test jobs with Test Impact Analysis"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting Test Optimization"
---

## Compatibility

Supported test frameworks:

| Test Framework | Version | Notes |
|---|---|---|
| Jest | >= 24.8.0 | Only `jsdom` (in the `jest-environment-jsdom` package) and `node` (in the `jest-environment-node` package) are supported as test environments. Custom environments like `@jest-runner/electron/environment` in `jest-electron-runner` are not supported.<br><br>Only [`jest-circus`][1] is supported as [`testRunner`][2].<br><br>[`test.concurrent`](#jests-testconcurrent) is not supported. |
| Mocha | >= 5.2.0 |
| Cucumber | >= 7.0.0 |
| Cypress | >= 6.7.0 |
| Playwright | >= 1.18.0 |
| Vitest | >= 1.16.0 | Supported from `dd-trace>=4.42.0` and `dd-trace>=5.18.0`. Only supported from Node.js>=18.19 or Node.js>=20.6 |

The instrumentation works at runtime, so any transpilers such as TypeScript, Webpack, or Babel are supported out-of-the-box.

## Configuring reporting method

To report test results to Datadog, you need to configure the Datadog JavaScript library:

{{< tabs >}}
{{% tab "CI Provider with Auto-Instrumentation Support" %}}
{{% ci-autoinstrumentation %}}

<div class="alert alert-warning">
  <strong>Note</strong>: Auto-instrumentation is not supported for Cypress tests. To instrument Cypress tests, follow the manual instrumentation steps outlined below.
</div>

{{% /tab %}}

{{% tab "Other Cloud CI Provider" %}}
<div class="alert alert-info">Agentless mode is available in Datadog JavaScript library versions >= 2.5.0</div>
{{% ci-agentless %}}

{{% /tab %}}
{{% tab "On-Premises CI Provider" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Installing the JavaScript tracer

To install the [JavaScript Tracer][3], run:

```bash
yarn add --dev dd-trace
```

For more information, see the [JavaScript Tracer installation documentation][4].

## Instrument your tests

{{< tabs >}}
{{% tab "Jest/Mocha" %}}
Set the `NODE_OPTIONS` environment variable to `-r dd-trace/ci/init`. Run your tests as you normally would, optionally specifying a name for your test session with `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=unit-tests yarn test
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


### Adding custom measures to tests

Just like tags, you can add custom measures to your tests by using the current active span:

```javascript
  it('sum function can sum', () => {
    const testSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

For more information about custom measures, see the [Add Custom Measures Guide][2].

### Mocha ECMAScript modules (ESM)
[Mocha >=9.0.0][3] uses an ESM-first approach to load test files. Set `NODE_OPTIONS` to `-r dd-trace/ci/init --import dd-trace/register.js` to get full visibility into your tests. See [`dd-trace-js` ESM support][4] for more information.


[1]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /tests/guides/add_custom_measures/?tab=javascripttypescript
[3]: https://github.com/mochajs/mocha/releases/tag/v9.0.0
[4]: https://github.com/datadog/dd-trace-js?tab=readme-ov-file#ecmascript-modules-esm-support
{{% /tab %}}

{{% tab "Playwright" %}}
Set the `NODE_OPTIONS` environment variable to `-r dd-trace/ci/init`. Run your tests as you normally would, optionally specifying a name for your test session with `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=e2e-tests yarn test:e2e
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

You can add custom tags to your tests by using the [custom annotations API from Playwright][1]:

```javascript
test('user profile', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.memory.usage]', // DD_TAGS is mandatory and case sensitive
    description: 'low',
  });
  test.info().annotations.push({
    type: 'DD_TAGS[test.task.id]',
    description: '41123',
  });
  // ...
});

test('landing page', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.cpu.usage]',
    description: 'high',
  });
  // ...
});
```

The format of the annotations is the following, where `$TAG_NAME` and `$TAG_VALUE` are *strings* representing tag name and value respectively:

```json
{
  "type": "DD_TAGS[$TAG_NAME]",
  "description": "$TAG_VALUE"
}
```

### Adding custom measures to tests

Custom measures also use custom annotations:

```javascript
test('user profile', async ({ page }) => {
  test.info().annotations.push({
    type: 'DD_TAGS[test.memory.allocations]', // DD_TAGS is mandatory and case sensitive
    description: 16, // this is a number
  });
});
```

The format of the annotations is the following, where `$TAG_NAME` is a *string* representing the tag name and `$TAG_VALUE` is a *number* representing the tag value:

```json
{
  "type": "DD_TAGS[$TAG_NAME]",
  "description": $TAG_VALUE
}
```
**Note**: `description` values in annotations are [typed as strings][2]. Numbers also work, but you may need to disable the typing error with `// @ts-expect-error`.

<div class="alert alert-warning">
  <strong>Important</strong>: The <code>DD_TAGS</code> prefix is mandatory and case sensitive.
</div>

### Playwright - RUM integration

If the browser application being tested is instrumented using [Browser Monitoring][3], the Playwright test results and their generated RUM browser sessions and session replays are automatically linked. For more information, see the [Instrumenting your browser tests with RUM guide][4].

[1]: https://playwright.dev/docs/test-annotations#custom-annotations
[2]: https://playwright.dev/docs/api/class-testinfo#test-info-annotations
[3]: /real_user_monitoring/browser/setup/
[4]: /continuous_integration/guides/rum_integration/
{{% /tab %}}

{{% tab "Cucumber" %}}
Set the `NODE_OPTIONS` environment variable to `-r dd-trace/ci/init`. Run your tests as you normally would, optionally specifying a name for your test session with `DD_TEST_SESSION_NAME`:
```bash
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=integration-tests yarn test:integration
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


### Adding custom measures to tests

You may also add custom measures to your test by grabbing the current active span:

```javascript
  When('the function is called', function () {
    const stepSpan = require('dd-trace').scope().active()
    testSpan.setTag('memory_allocations', 16)
    // test continues normally
    // ...
  })
```

For more information about custom measures, see the [Add Custom Measures Guide][2].

[1]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[2]: /tests/guides/add_custom_measures/?tab=javascripttypescript
{{% /tab %}}

{{% tab "Cypress" %}}

### Cypress version 10 or later

Use the Cypress API documentation to [learn how to use plugins][1] for `cypress>=10`.

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
      return require('dd-trace/ci/cypress/plugin')(on, config)
    }
  }
})
{{< /code-block >}}

#### Cypress `after:run` event
Datadog requires the [`after:run`][2] Cypress event to work, and Cypress does not allow multiple handlers for that event. If you defined handlers for `after:run` already, add the Datadog handler manually by importing `'dd-trace/ci/cypress/after-run'`:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // other plugins
      on('after:run', (details) => {
        // other 'after:run' handlers
        // important that this function call is returned
        return require('dd-trace/ci/cypress/after-run')(details)
      })
    }
  }
})
{{< /code-block >}}

#### Cypress `after:spec` event
Datadog requires the [`after:spec`][3] Cypress event to work, and Cypress does not allow multiple handlers for that event. If you defined handlers for `after:spec` already, add the Datadog handler manually by importing `'dd-trace/ci/cypress/after-spec'`:

{{< code-block lang="javascript" filename="cypress.config.js" >}}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('dd-trace/ci/cypress/plugin')(on, config)
      // other plugins
      on('after:spec', (...args) => {
        // other 'after:spec' handlers
        // Important that this function call is returned
        // Important that all the arguments are passed
        return require('dd-trace/ci/cypress/after-spec')(...args)
      })
    }
  }
})
{{< /code-block >}}

### Cypress before version 10

These are the instructions if you're using a version older than `cypress@10`. See the [Cypress documentation][4] for more information about migrating to a newer version.

1. Set [`pluginsFile`][5] to `"dd-trace/ci/cypress/plugin"`, for example, through [`cypress.json`][6]:
{{< code-block lang="json" filename="cypress.json" >}}
{
  "pluginsFile": "dd-trace/ci/cypress/plugin"
}
{{< /code-block >}}

If you already defined a `pluginsFile`, initialize the instrumentation with:
{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // your previous code is before this line
  return require('dd-trace/ci/cypress/plugin')(on, config)
}
{{< /code-block >}}

2. Add the following line to the **top level** of your [`supportFile`][7]:
{{< code-block lang="javascript" filename="cypress/support/index.js" >}}
// Your code can be before this line
// require('./commands')
require('dd-trace/ci/cypress/support')
// Your code can also be after this line
// Cypress.Commands.add('login', (email, pw) => {})
{{< /code-block >}}

#### Cypress `after:run` event
Datadog requires the [`after:run`][2] Cypress event to work, and Cypress does not allow multiple handlers for that event. If you defined handlers for `after:run` already, add the Datadog handler manually by importing `'dd-trace/ci/cypress/after-run'`:

{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // your previous code is before this line
  require('dd-trace/ci/cypress/plugin')(on, config)
  on('after:run', (details) => {
    // other 'after:run' handlers
    // important that this function call is returned
    return require('dd-trace/ci/cypress/after-run')(details)
  })
}
{{< /code-block >}}

#### Cypress `after:spec` event
Datadog requires the [`after:spec`][3] Cypress event to work, and Cypress does not allow multiple handlers for that event. If you defined handlers for `after:spec` already, add the Datadog handler manually by importing `'dd-trace/ci/cypress/after-spec'`:

{{< code-block lang="javascript" filename="cypress/plugins/index.js" >}}
module.exports = (on, config) => {
  // your previous code is before this line
  require('dd-trace/ci/cypress/plugin')(on, config)
  on('after:spec', (...args) => {
    // other 'after:spec' handlers
    // Important that this function call is returned
    // Important that all the arguments are passed
    return require('dd-trace/ci/cypress/after-run')(...args)
  })
}
{{< /code-block >}}


Run your tests as you normally would, optionally specifying a name for your test session with `DD_TEST_SESSION_NAME`:

{{< code-block lang="shell" >}}
DD_TEST_SESSION_NAME=ui-tests yarn test:ui
{{< /code-block >}}


### Adding custom tags to tests

To add additional information to your tests, such as the team owner, use `cy.task('dd:addTags', { yourTags: 'here' })` in your test or hooks.

For example:

```javascript
beforeEach(() => {
  cy.task('dd:addTags', {
    'before.each': 'certain.information'
  })
})
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'team.owner': 'ui'
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][8] section of the Node.js custom instrumentation documentation.

### Adding custom measures to tests

To add custom measures to your tests, such as memory allocations, use `cy.task('dd:addTags', { yourNumericalTags: 1 })` in your test or hooks.

For example:

```javascript
it('renders a hello world', () => {
  cy.task('dd:addTags', {
    'memory_allocations': 16
  })
  cy.get('.hello-world')
    .should('have.text', 'Hello World')
})
```

For more information about custom measures, see the [Add Custom Measures Guide][9].

### Cypress - RUM integration

If the browser application being tested is instrumented using [Browser Monitoring][10], the Cypress test results and their generated RUM browser sessions and session replays are automatically linked. For more information, see the [Instrumenting your browser tests with RUM guide][11].


[1]: https://docs.cypress.io/guides/tooling/plugins-guide#Using-a-plugin
[2]: https://docs.cypress.io/api/plugins/after-run-api
[3]: https://docs.cypress.io/api/plugins/after-spec-api
[4]: https://docs.cypress.io/guides/references/migration-guide#Migrating-to-Cypress-100
[5]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Plugins-file
[6]: https://docs.cypress.io/guides/references/configuration#cypress-json
[7]: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file
[8]: /tracing/trace_collection/custom_instrumentation/nodejs?tab=locally#adding-tags
[9]: /tests/guides/add_custom_measures/?tab=javascripttypescript
[10]: /real_user_monitoring/browser/setup/
[11]: /continuous_integration/guides/rum_integration/
{{% /tab %}}

{{% tab "Vitest" %}}
<div class="alert alert-warning">
  <strong>Note</strong>: <a href="https://github.com/vitest-dev/vitest?tab=readme-ov-file#features">Vitest is ESM first</a>, so its configuration is different from other test frameworks.
</div>

`vitest` and `dd-trace` require Node.js>=18.19 or Node.js>=20.6 to work.

Set the `NODE_OPTIONS` environment variable to `--import dd-trace/register.js -r dd-trace/ci/init`. Run your tests as you normally would, optionally specifying a name for your test session with `DD_TEST_SESSION_NAME`:

```bash
NODE_OPTIONS="--import dd-trace/register.js -r dd-trace/ci/init" DD_TEST_SESSION_NAME=smoke-tests yarn test:smoke
```

**Note**: If you set a value for `NODE_OPTIONS`, make sure it does not overwrite `--import dd-trace/register.js -r dd-trace/ci/init`. This can be done using the `${NODE_OPTIONS:-}` clause:

{{< code-block lang="json" filename="package.json" >}}
{
  "scripts": {
    "test": "NODE_OPTIONS=\"--max-old-space-size=12288 ${NODE_OPTIONS:-}\" vitest run"
  }
}
{{< /code-block >}}

### Adding custom tags or measures to tests

Not supported.

{{% /tab %}}

{{< /tabs >}}

### How to fix "Cannot find module 'dd-trace/ci/init'" errors

When using `dd-trace`, you might encounter the following error message:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

This might be because of an incorrect usage of `NODE_OPTIONS`.

For example, if your GitHub Action looks like this:
```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
    # Invalid NODE_OPTIONS
    env:
      NODE_OPTIONS: -r dd-trace/ci/init
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

**Note:** This does not work because `NODE_OPTIONS` are interpreted by every node process, including `npm install`. If you try to import `dd-trace/ci/init` before it's installed, this step fails.

Your GitHub Action should instead look like this:
```yml
jobs:
  my-job:
    name: Run tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install node
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
        env:
          NODE_OPTIONS: -r dd-trace/ci/init
```

Follow these best practices:

* Make sure the `NODE_OPTIONS` environment variable is only set to the process running tests.
* Specifically avoid defining `NODE_OPTIONS` in the global environment variables settings in your pipeline or job definition.


#### Using Yarn 2 or later

If you're using `yarn>=2` and a `.pnp.cjs` file, you might also get the same error:

```text
 Error: Cannot find module 'dd-trace/ci/init'
```

You can fix it by setting `NODE_OPTIONS` to the following:

```bash
NODE_OPTIONS="-r $(pwd)/.pnp.cjs -r dd-trace/ci/init" yarn test
```

## Reporting code coverage

When tests are instrumented with [Istanbul][5], the Datadog Tracer (v3.20.0 or later) reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

You can see the evolution of the test coverage in the **Coverage** tab of a test session.

For more information, see [Code Coverage][6].

## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer.

`test_session.name`
: Use it to identify a group of tests, such as `integration-tests`, `unit-tests` or `smoke-tests`.<br/>
**Environment variable**: `DD_TEST_SESSION_NAME`<br/>
**Default**: (CI job name + test command)<br/>
**Example**: `unit-tests`, `integration-tests`, `smoke-tests`

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

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][7]. All other [Datadog Tracer configuration][8] options can also be used.

## Collecting Git metadata

{{% ci-git-metadata %}}

## Manual testing API

<div class="alert alert-warning">
  <strong>Note</strong>: The manual testing API is available starting in <code>dd-trace</code> versions <code>5.23.0</code> and <code>4.47.0</code>.
</div>

If you use Jest, Mocha, Cypress, Playwright, Cucumber, or Vitest, **do not use the manual testing API**, as Test Optimization automatically instruments them and sends the test results to Datadog. The manual testing API is **incompatible** with already supported testing frameworks.

Use the manual testing API only if you use an unsupported testing framework or have a different testing mechanism.

The manual testing API leverages the `node:diagnostics_channel` module from Node.js and is based on channels you can publish to:

```javascript
const { channel } = require('node:diagnostics_channel')

const { describe, test, beforeEach, afterEach, assert } = require('my-custom-test-framework')

const testStartCh = channel('dd-trace:ci:manual:test:start')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')
const testSuite = __filename

describe('can run tests', () => {
  beforeEach((testName) => {
    testStartCh.publish({ testName, testSuite })
  })
  afterEach((status, error) => {
    testFinishCh.publish({ status, error })
  })
  test('first test will pass', () => {
    assert.equal(1, 1)
  })
})
```

### Test start channel

Grab this channel by its ID `dd-trace:ci:manual:test:start` to publish that a test is starting. A good place to do this is a `beforeEach` hook or similar.

```typescript
const { channel } = require('node:diagnostics_channel')
const testStartCh = channel('dd-trace:ci:manual:test:start')

// ... code for your testing framework goes here
  beforeEach(() => {
    const testDefinition = {
      testName: 'a-string-that-identifies-this-test',
      testSuite: 'what-suite-this-test-is-from.js'
    }
    testStartCh.publish(testDefinition)
  })
// code for your testing framework continues here ...
```

The payload to be published has attributes `testName` and `testSuite`, both strings, that identify the test that is about to start.

### Test finish channel

Grab this channel by its ID `dd-trace:ci:manual:test:finish` to publish that a test is ending. A good place to do this is an `afterEach` hook or similar.

```typescript
const { channel } = require('node:diagnostics_channel')
const testFinishCh = channel('dd-trace:ci:manual:test:finish')

// ... code for your testing framework goes here
  afterEach(() => {
    const testStatusPayload = {
      status: 'fail',
      error: new Error('assertion error')
    }
    testStartCh.publish(testStatusPayload)
  })
// code for your testing framework continues here ...
```

The payload to be published has attributes `status` and `error`:

* `status` is a string that takes one of three values:
  * `'pass'` when a test passes.
  * `'fail'` when a test fails.
  * `'skip'` when a test has been skipped.

* `error` is an `Error` object containing the reason why a test failed.

### Add tags channel

Grab this channel by its ID `dd-trace:ci:manual:test:addTags` to publish that a test needs custom tags. This can be done within the test function:

```typescript
const { channel } = require('node:diagnostics_channel')
const testAddTagsCh = channel('dd-trace:ci:manual:test:addTags')

// ... code for your testing framework goes here
  test('can sum', () => {
    testAddTagsCh.publish({ 'test.owner': 'my-team', 'number.assertions': 3 })
    const result = sum(2, 1)
    assert.equal(result, 3)
  })
// code for your testing framework continues here ...
```

The payload to be published is a dictionary `<string, string|number>` of tags or measures that are added to the test.


### Run the tests

When the test start and end channels are in your code, run your testing framework like you normally do, including the following environment variables:

```shell
NODE_OPTIONS="-r dd-trace/ci/init" DD_TEST_SESSION_NAME=custom-tests yarn run-my-test-framework
```



## Known limitations

### Browser tests
Browser tests executed with `mocha`, `jest`, `cucumber`, `cypress`, `playwright`, and `vitest` are instrumented by `dd-trace-js`, but visibility into the browser session itself is not provided by default (for example, network calls, user actions, page loads, and more.).

If you want visibility into the browser process, consider using [RUM & Session Replay][9]. When using Cypress or Playwright, test results and their generated RUM browser sessions and session replays are automatically linked. For more information, see the [Instrumenting your browser tests with RUM guide][10].

### Cypress interactive mode

Cypress interactive mode (which you can enter by running `cypress open`) is not supported by Test Optimization because some cypress events, such as [`before:run`][11], are not fired. If you want to try it anyway, pass `experimentalInteractiveRunEvents: true` to the [cypress configuration file][12].

### Jest's `test.concurrent`
Jest's [test.concurrent][13] is not supported.

### Jest's `--forceExit`
Jest's [--forceExit][14] option may cause data loss. Datadog tries to send data immediately after your tests finish, but shutting down the process abruptly can cause some requests to fail. Use `--forceExit` with caution.

### Mocha's `--exit`
Mocha's [--exit][15] option may cause data loss. Datadog tries to send data immediately after your tests finish, but shutting down the process abruptly can cause some requests to fail. Use `--exit` with caution.

## Best practices

Follow these practices to take full advantage of the testing framework and Test Optimization.

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

And use [`test.each`][16] instead:

{{< code-block lang="javascript" >}}
test.each([[1,2,3], [3,4,7]])('sums correctly %i and %i', (a,b,expected) => {
  expect(a+b).toEqual(expected)
})
{{< /code-block >}}

For `mocha`, use [`mocha-each`][17]:

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

When you use this approach, both the testing framework and Test Optimization can tell your tests apart.

### Test session name `DD_TEST_SESSION_NAME`

Use `DD_TEST_SESSION_NAME` to define the name of the test session and the related group of tests. Examples of values for this tag would be:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

If `DD_TEST_SESSION_NAME` is not specified, the default value used is a combination of:

- CI job name
- Command used to run the tests (such as `yarn test`)

The test session name should be unique within a repository to help you distinguish different groups of tests.

#### When to use `DD_TEST_SESSION_NAME`

There's a set of parameters that Datadog checks to establish correspondence between test sessions. The test command used to execute the tests is one of them. If the test command contains a string that changes for every execution, such as a temporary folder, Datadog considers the sessions to be unrelated to each other. For example:

- `yarn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`
- `pnpm vitest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recommends using `DD_TEST_SESSION_NAME` if your test commands vary between executions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/facebook/jest/tree/main/packages/jest-circus
[2]: https://jestjs.io/docs/configuration#testrunner-string
[3]: /tracing/trace_collection/dd_libraries/nodejs
[4]: https://github.com/DataDog/dd-trace-js#version-release-lines-and-maintenance
[5]: https://istanbul.js.org/
[6]: /tests/code_coverage/?tab=javascripttypescript
[7]: /getting_started/tagging/unified_service_tagging
[8]: /tracing/trace_collection/library_config/nodejs/?tab=containers#configuration
[9]: /real_user_monitoring/browser/
[10]: /continuous_integration/guides/rum_integration/
[11]: https://docs.cypress.io/api/plugins/before-run-api
[12]: https://docs.cypress.io/guides/references/configuration#Configuration-File
[13]: https://jestjs.io/docs/api#testconcurrentname-fn-timeout
[14]: https://jestjs.io/docs/cli#--forceexit
[15]: https://mochajs.org/#-exit
[16]: https://jestjs.io/docs/api#testeachtablename-fn-timeout
[17]: https://www.npmjs.com/package/mocha-each
