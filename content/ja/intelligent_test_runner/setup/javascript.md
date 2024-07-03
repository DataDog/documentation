---
aliases:
- /ja/continuous_integration/intelligent_test_runner/javascript/
- /ja/continuous_integration/intelligent_test_runner/setup/javascript/
code_lang: javascript
code_lang_weight: 20
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Explore Test Results and Performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Troubleshooting CI Visibility
kind: documentation
title: Intelligent Test Runner for JavaScript and TypeScript
type: multi-code-lang
---

## Overview

Intelligent Test Runner for JavaScript skips entire _test suites_ (test files) rather than individual tests.


## Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `jest>=24.8.0`
  * From `dd-trace>=4.17.0` or `dd-trace>=3.38.0`.
  * Only `jest-circus/runner` is supported as `testRunner`.
  * Only `jsdom` and `node` are supported as test environments.
* `mocha>=5.2.0`
  * From `dd-trace>=4.17.0` or `dd-trace>=3.38.0`.
  * Run mocha with [`nyc`][1] to enable code coverage.
* `cucumber-js>=7.0.0`
  * From `dd-trace>=4.17.0` or `dd-trace>=3.38.0`.
  * Run cucumber-js with [`nyc`][1] to enable code coverage.
* `cypress>=6.7.0`
  * From `dd-trace>=4.17.0` or `dd-trace>=3.38.0`.
  * Instrument your web application with [code coverage][2].

## セットアップ

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for JavaScript and TypeScript][3]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

After completing setup, run your tests as you normally do:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

After completing setup, run your tests as you normally do:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY yarn test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress

For Intelligent Test Runner for Cypress to work, you must instrument your web application with code coverage. For more information about enabling code coverage, see the [Cypress documentation][2].

To check that you've successfully enabled code coverage, navigate to your web app with Cypress and check the `window.__coverage__` global variable. This is what `dd-trace` uses to collect code coverage for Intelligent Test Runner.

## Inconsistent test durations

In some frameworks, such as `jest`, there are cache mechanisms that make tests faster after other tests have run (see [jest cache][4] docs). If Intelligent Test Runner is skipping all but a few test files, these suites might run slower than they usually do. This is because they run with a colder cache. Regardless of this, total execution time for your test command should still be reduced.

## Disabling skipping for specific tests

You can override the Intelligent Test Runner's behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### Why make tests unskippable?

The Intelligent Test Runner uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

Examples include:

* Tests that read data from text files
* Tests that interact with APIs outside of the code being tested (such as remote REST APIs)

Designating tests as unskippable ensures that the Intelligent Test Runner runs them regardless of coverage data.

### Marking tests as unskippable

{{< tabs >}}
{{% tab "Jest/Mocha/Cypress" %}}
You can use the following docblock at the top of your test file to mark a suite as unskippable. This prevents any of the tests defined in the test file from being skipped by Intelligent Test Runner. This is similar to jest's [`testEnvironmentOptions`][1].

```javascript
/**
 * @datadog {"unskippable": true}
 */

describe('context', () => {
  it('can sum', () => {
    expect(1 + 2).to.equal(3)
  })
})
```

[1]: https://jestjs.io/docs/configuration#testenvironmentoptions-object
{{% /tab %}}
{{% tab "Cucumber" %}}
You can use the `@datadog:unskippable` [tag][1] in your feature file to mark it as unskippable. This prevents any of the scenarios defined in the feature file from being skipped by Intelligent Test Runner.

```
@datadog:unskippable
Feature: Greetings
  Scenario: Say greetings
    When the greeter says greetings
    Then I should have heard "greetings"
```
[1]: https://cucumber.io/docs/cucumber/api/?lang=javascript#tags
{{% /tab %}}
{{< /tabs >}}

### Examples of tests that should be unskippable

This section shows some examples of tests that should be marked as unskippable.

#### Tests that depend on fixtures
```javascript
/**
 * We have a `payload.json` fixture file in `./fixtures/payload`
 * that is processed by `processPayload` and put into a snapshot.
 * Changes in `payload.json` do not affect the test code coverage but can
 * make the test fail.
 */

/**
 * @datadog {"unskippable": true}
 */
import processPayload from './process-payload';
import payload from './fixtures/payload';

it('can process payload', () => {
    expect(processPayload(payload)).toMatchSnapshot();
});
```

#### Tests that communicate with external services
```javascript
/**
 * We query an external service running outside the context of
 * the test.
 * Changes in this external service do not affect the test code coverage
 * but can make the test fail.
 */

/**
 * @datadog {"unskippable": true}
 */
it('can query data', (done) => {
    fetch('https://www.external-service.com/path')
        .then((res) => res.json())
        .then((json) => {
            expect(json.data[0]).toEqual('value');
            done();
        });
});
```

```
# Same way as above we're requesting an external service

@datadog:unskippable
Feature: Process the payload
  Scenario: Server responds correctly
    When the server responds correctly
    Then I should have received "value"
```


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[3]: /ja/continuous_integration/tests/javascript
[4]: https://jestjs.io/docs/cli#--cache