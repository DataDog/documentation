---
title: Intelligent Test Runner
kind: documentation
is_beta: true
further_reading:
  - link: "https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/"
    tag: "Blog"
    text: "Streamline CI testing with Intelligent Test Runner"
  - link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
    tag: "Blog"
    text: "Monitor all your CI pipelines with Datadog"
---
{{< beta-callout url="https://docs.google.com/forms/d/e/1FAIpQLSdz9w6cIC-rhHz5kU-i2aTjVa2H1lH54lM7rhjPx-8viNfdDw/viewform?usp=pp_url" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
Intelligent Test Runner for CI Visibility is in private beta. You can request access by completing this form.
{{< /beta-callout >}}

## Overview

Intelligent Test Runner is Datadog's test impact analysis solution. It allows you to only run the impacted tests for a given commit and skip any that are irrelevant.


{{< img src="continuous_integration/itr_overview.png" alt="Intelligent test runner enabled in test service settings in the CI section of Datadog.">}}

By only running tests on relevant code, when tests fail, it is likely a legitimate failure that pertains to the modified code.


## Setup

Prior to setting up Intelligent Test Runner, you must have finished setting up [Test Visibility][1] for your particular language.

### JavaScript

To enable Intelligent Test Runner, the following environment variables need to be set:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`<br/>
**Note**: Required only during Beta phase

`DD_API_KEY` (Required)
: The [Datadog API key][2] used to upload the test results.<br/>
**Default**: `(empty)`

`DD_APPLICATION_KEY` (Required)
: The [Datadog Application key][3] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

`DD_SITE` (Required)
: The [Datadog site][4] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

`DD_CIVISIBILITY_GIT_UPLOAD_ENABLED=true` (Required)
: Flag to enable git metadata upload.<br/>
**Default**: `false`<br/>
**Note**: Required only during Beta phase

`DD_CIVISIBILITY_ITR_ENABLED=true` (Required)
: Flag to enable test skipping. <br/>
**Default**: `false`<br/>
**Note**: Required only during Beta phase

After setting these environment variables, run your tests as you normally do:

{{< code-block lang="bash" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$API_KEY DD_CIVISIBILITY_GIT_UPLOAD_ENABLED=true DD_CIVISIBILITY_ITR_ENABLED=true yarn test
{{< /code-block >}}

#### UI activation
In addition to setting the environment variables above, you need to activate the Intelligent Test Runner on the [Test Service Settings][5] page.

#### Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `dd-trace>=3.4.0`
* `jest>=24.8.0`
  * Only `jest-circus/runner` is supported as `testRunner`.
  * Only `jsdom` and `node` are supported as test environments.

### .NET

To enable Intelligent Test Runner, the version of the `dd-trace` tool must be >= 2.16.0 (execute `dd-trace --version` to get the version of the tool) and the following environment variables must be set:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`<br/>
**Note**: Required only during Beta phase

`DD_API_KEY` (Required)
: The [Datadog API key][2] used to upload the test results.<br/>
**Default**: `(empty)`

`DD_APPLICATION_KEY` (Required)
: The [Datadog Application key][3] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

`DD_SITE` (Required)
: The [Datadog site][4] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

`DD_CIVISIBILITY_ITR_ENABLED=true` (Required)
: Flag to enable Intelligent Test Runner. <br/>
**Default**: `false`<br/>
**Note**: Required only during Beta phase

After setting these environment variables, run your tests as you normally do by using [dotnet test][6] or [VSTest.Console.exe][7]:

{{< tabs >}}

{{% tab "dotnet test" %}}


{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}


{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

#### UI activation

In addition to setting the environment variables above, you need to activate the Intelligent Test Runner on the [Test Service Settings][5] page.

### Swift

To enable Intelligent Test Runner, the version of the `dd-sdk-swift` framework must be >= 2.2.0-rc.1. The `Code Coverage` option must also be enabled in the test settings of your scheme or test plan, or  `--enable-code-coverage` must be added to your `swift test` command (if using a SPM target).

The following environment variables must also be set:

`DD_TEST_RUNNER`
: Enables or disables the instrumentation of tests. Set this value to `$(DD_TEST_RUNNER)` so you can enable and disable test instrumentation with a environment variable defined outside of the test process (for example, in the CI build).<br/>
**Default**: `false`<br/>
**Recommended**: `$(DD_TEST_RUNNER)`

`DD_API_KEY` (Required)
: The [Datadog API key][2] used to upload the test results.<br/>
**Default**: `(empty)`

`DD_APPLICATION_KEY` (Required)
: The [Datadog Application key][3] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

`DD_SITE` (Required)
: The [Datadog site][4] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

#### UI activation

In addition to setting the environment variables above, you need to activate the Intelligent Test Runner on the [Test Service Settings][5] page.

## Configuration

The default branch is automatically excluded from having Intelligent Test Runner enabled to reduce irrelevant test noise, but it remains configurable. Because impacted tests could be missed by this exclusion, Datadog recommends including your default branch.

{{< img src="continuous_integration/itr_configuration.png" alt="Select branches to exclude from intelligent test runner" style="width:80%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /getting_started/site/
[5]: https://app.datadoghq.com/ci/settings/test-service
[6]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[7]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options
