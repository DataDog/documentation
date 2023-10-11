---
title: Intelligent Test Runner for JavaScript and TypeScript
kind: documentation
code_lang: javascript
type: multi-code-lang
code_lang_weight: 20
aliases:
  - continuous_integration/intelligent_test_runner/javascript/
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

## Overview

Intelligent Test Runner for JavaScript skips entire _test suites_ (test files) rather than individual tests.

### Inconsistent test durations

In some frameworks, such as `jest`, there are cache mechanisms that make tests faster after other tests have run (see [jest cache][4] docs). If Intelligent Test Runner is skipping all but a few test files, these suites might run slower than they usually do. This is because they run with a colder cache. Regardless of this, total execution time for your test command should still be reduced.

## Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `jest>=24.8.0`
  * From `dd-trace>=3.16.0` or `dd-trace>=2.29.0`.
  * Only `jest-circus/runner` is supported as `testRunner`.
  * Only `jsdom` and `node` are supported as test environments.
* `mocha>=5.2.0`
  * From `dd-trace>=3.16.0` or `dd-trace>=2.29.0`.
  * Run mocha with [`nyc`][1] to enable [code coverage][5].
* `cucumber-js>=7.0.0`
  * From `dd-trace>=3.16.0` or `dd-trace>=2.29.0`.
  * Run cucumber-js with [`nyc`][1] to enable [code coverage][5].
* `cypress>=6.7.0`
  * From `dd-trace>=4.2.0`, `dd-trace>=3.23.0` or `dd-trace>=2.36.0`.
  * Instrument your web application with [code coverage](#cypress)

## Setup

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for JavaScript and TypeScript][2]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

### Configure the test runner environment

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-itr-agent %}}

{{% /tab %}}
{{% tab "Cloud CI provider (Agentless)" %}}

{{% ci-itr-agentless %}}

{{% /tab %}}
{{< /tabs >}}

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

After configuring the Datadog Agent, run your tests as you normally do:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app yarn test
{{< /code-block >}}

{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

After setting these environment variables, run your tests as you normally do:

{{< code-block lang="shell" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$DD_API_KEY DD_APPLICATION_KEY=$DD_APPLICATION_KEY yarn test
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Cypress

For Intelligent Test Runner for Cypress to work, you must instrument your web application with code coverage. For more information about enabling code coverage, see the [Cypress documentation][3]. 

To check that you've successfully enabled code coverage, navigate to your web app with Cypress and check the `window.__coverage__` global variable. This is what `dd-trace` uses to collect code coverage for Intelligent Test Runner.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/nyc
[2]: /continuous_integration/tests/javascript
[3]: https://docs.cypress.io/guides/tooling/code-coverage#Instrumenting-code
[4]: https://jestjs.io/docs/cli#--cache
[5]: /continuous_integration/guides/code_coverage/