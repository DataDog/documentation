---
title: Intelligent Test Runner for Swift
kind: documentation
aliases:
  - /continuous_integration/intelligent_test_runner/dotnet
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

## Compatibility

Intelligent Test Runner is only supported on `dd-sdk-swift>= 2.2.0`.

## Setup

Prior to setting up Intelligent Test Runner, you must have finished setting up [Test Visibility for Swift][1]. If you are reporting data through the Datadog Agent you need to use v6.40+/v7.40+.

To enable Intelligent Test Runner, the following environment variables need to be set:

`DD_TEST_RUNNER`
: Enables or disables the instrumentation of tests. Set this value to `$(DD_TEST_RUNNER)` so you can enable and disable test instrumentation with a environment variable defined outside of the test process (for example, in the CI build).<br/>
**Default**: `false`<br/>
**Recommended**: `$(DD_TEST_RUNNER)`

`DD_APPLICATION_KEY` (Required)
: The [Datadog Application key][2] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

#### UI activation
In addition to setting the environment variables, you or a user in your organization with "Intelligent Test Runner Activation" permissions must activate the Intelligent Test Runner on the [Test Service Settings][3] page.

{{< img src="continuous_integration/itr_overview.png" alt="Intelligent test runner enabled in test service settings in the CI section of Datadog.">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/swift
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[5]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options
