---
title: Intelligent Test Runner for JavaScript and TypeScript
kind: documentation
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

## Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `jest>=24.8.0`
  * From `dd-trace>=3.16.0` or `dd-trace>=2.29.0`.
  * Only `jest-circus/runner` is supported as `testRunner`.
  * Only `jsdom` and `node` are supported as test environments.
* `mocha>=5.2.0`
  * From `dd-trace>=3.16.0` or `dd-trace>=2.29.0`.
  * Run mocha with [`nyc`][1] to enable code coverage.
* `cucumber-js>=7.0.0`
  * From `dd-trace>=3.16.0` or `dd-trace>=2.29.0`.
  * Run cucumber-js with [`nyc`][1] to enable code coverage.
* `cypress>=6.7.0`
  * From `dd-trace>=4.2.0`, `dd-trace>=3.23.0` or `dd-trace>=2.36.0`.
  * Instrument your web application with code coverage: see more in [Cypress setup](#cypress-setup)
* If you're reporting data through the Datadog Agent, use v6.40+/v7.40+.

## Setup

### Test Visibility setup

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Javascript and Typescript][2]. If you are reporting data through the Agent, use v6.40+/v7.40+.

### UI activation
In addition to setting the environment variables, you or a user in your organization with "Intelligent Test Runner Activation" permissions must activate the Intelligent Test Runner on the [Test Service Settings][3] page.

{{< img src="continuous_integration/itr_overview.png" alt="Intelligent test runner enabled in test service settings in the CI section of Datadog.">}}

### Configuring the test runner environment

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

#### Additional Datadog Agent configuration

In addition to the [Datadog API Key][1], the [Datadog Application key][2] must be specified in the [Agent Configuration File][3]

`app_key` (Required)
: The [Datadog Application key][2] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

`api_key` (Required)
: The [Datadog API key][1] used to upload the test results.<br/>
**Default**: `(empty)`

After configuring the Datadog Agent, run your tests as you normally do:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /agent/guide/agent-configuration-files
{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

#### Environment variables

To enable Intelligent Test Runner in Agentless mode, set the following environment variables:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_APPLICATION_KEY` (Required)
: The [Datadog Application key][1] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

`DD_API_KEY` (Required)
: The [Datadog API key][2] used to upload the test results.<br/>
**Default**: `(empty)`

After setting these environment variables, run your tests as you normally do:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY DD_APPLICATION_KEY=$DD_APPLICATION_KEY yarn test
{{< /code-block >}}

[1]: /organization-settings/application-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{< /tabs >}}


### Cypress setup

For Intelligent Test Runner for Cypress to work, you must instrument your web application with code coverage. You can read more about enabling code coverage in the [Cypress documentation][4]. To check that you've successfully enabled code coverage, navigate to your web app with Cypress and check the global variable `window.__coverage__`. This is what `dd-trace` uses to collect code coverage for Intelligent Test Runner.


#### Suite skipping
Intelligent test runner for Javascript skips entire _test suites_ (test files) rather than individual tests.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: /continuous_integration/tests/javascript
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
