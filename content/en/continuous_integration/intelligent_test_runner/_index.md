---
title: Intelligent Test Runner
kind: documentation
is_beta: true
further_reading:
  - link: "https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/"
    tag: "Blog"
    text: "Streamline CI testing with Datadog Intelligent Test Runner"
  - link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
    tag: "Blog"
    text: "Monitor all your CI pipelines with Datadog"
---
{{< callout url="https://app.datadoghq.com/ci/getting-started" >}}
Intelligent Test Runner for CI Visibility is in private beta. You can request access by completing the form on the CI Visibility Getting Started page.
{{< /callout >}}

## Overview

Intelligent Test Runner is Datadog's test impact analysis solution. It allows you to only run the impacted tests for a given commit and skip any that are irrelevant.


{{< img src="continuous_integration/itr_overview.png" alt="Intelligent test runner enabled in test service settings in the CI section of Datadog.">}}

By only running tests on relevant code, when tests fail, it is likely a legitimate failure that pertains to the modified code.

## Limitations during beta

During the beta of Intelligent Test Runner there are certain limitations:

- Some of the environment variables required in the following sections are only required during the beta.
- Intelligent Test Runner only works without the Datadog Agent. The configuration steps in this page cause the Datadog Library to send data directly to the backend without going through the Agent. If you are currently using the Agent, you will lose correlation with host metrics.
- There are known limitations in the current implementation of Intelligent Test Runner that can cause it to skip tests that should be run. Intelligent Test Runner is not able to detect:
  - Changes in library dependencies.
  - Changes in compiler options.
  - Changes in external services.
  - Changes to data files in data-driven tests.

To override Intelligent Test Runner and run all tests, add `ITR:NoSkip` (case insensitive) anywhere in your Git commit message.

## Setup Datadog Library

Prior to setting up Intelligent Test Runner, you must have finished setting up [Test Visibility][1] for your particular language.

### JavaScript

To enable Intelligent Test Runner, the following environment variables need to be set:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`<br/>
**Note**: Required only during Beta

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
**Note**: Required only during Beta

`DD_CIVISIBILITY_ITR_ENABLED=true` (Required)
: Flag to enable test skipping. <br/>
**Default**: `false`<br/>
**Note**: Required only during Beta

After setting these environment variables, run your tests as you normally do:

{{< code-block lang="bash" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$API_KEY DD_CIVISIBILITY_GIT_UPLOAD_ENABLED=true DD_CIVISIBILITY_ITR_ENABLED=true yarn test
{{< /code-block >}}


#### UI activation
In addition to setting the environment variables, you or a user in your organization with admin permissions must activate the Intelligent Test Runner on the [Test Service Settings][5] page.

#### Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `dd-trace>=3.4.0`
* `jest>=24.8.0`
  * Only `jest-circus/runner` is supported as `testRunner`.
  * Only `jsdom` and `node` are supported as test environments.
* `mocha>=5.2.0`

#### Suite skipping
Intelligent test runner for Javascript will skip entire _test suites_ (test files) rather than individual tests.

### .NET

To enable Intelligent Test Runner, the version of the `dd-trace` tool must be >= 2.16.0 (execute `dd-trace --version` to get the version of the tool) and the following environment variables must be set:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`<br/>
**Note**: Required only during Beta

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
**Note**: Required only during Beta

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

In addition to setting the environment variables, you or a user in your organization with admin permissions must activate the Intelligent Test Runner on the [Test Service Settings][5] page.

### Swift

To enable Intelligent Test Runner, the version of the `dd-sdk-swift` framework must be >= 2.2.0. The `Code Coverage` option must also be enabled in the test settings of your scheme or test plan, or  `--enable-code-coverage` must be added to your `swift test` command (if using a SPM target).

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

In addition to setting the environment variables, you or a user in your organization with admin permissions must activate the Intelligent Test Runner on the [Test Service Settings][5] page.

## Setup CI Job

Intelligent Test Runner uses git metadata information (commit history) to work. However, some CI providers use a git shallow clone (`git clone --depth=0`) which only downloads the target commit without downloading any historical commit information. This setup does not contain enough information for Intelligent Test Runner to work. If your CI is using shallow clones, it must be changed.

An efficient alternative to shallow clones are partial clones (supported in Git v2.27+), which will clone the current commit plus the necessary git metadata without retrieving all past versions of all files: `git clone --filter=blob:none`.

## Configuration

The default branch of your repository is automatically excluded from having Intelligent Test Runner enabled. Due to the limitations described above, the Intelligent Test Runner might skip some of the tests that should be run, therefore Datadog recommends to continue running all tests in your default branch (or the branch you release from).

If there are other branches you want to exclude, you can add them from the Intelligent Test Runner settings page. The query bar supports the wildcard character `*` to exclude any branches that match.

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
