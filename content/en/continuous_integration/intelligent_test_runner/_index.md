---
title: Intelligent Test Runner
kind: documentation
is_beta: true
---
{{< beta-callout url="https://docs.google.com/forms/d/e/1FAIpQLSdz9w6cIC-rhHz5kU-i2aTjVa2H1lH54lM7rhjPx-8viNfdDw/viewform?usp=pp_url" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
Intelligent Test Runner for CI Visibility is in beta. You can request access by completing this form.
{{< /beta-callout >}}
## Overview

Intelligent Test Runner is Datadog's test impact analysis solution. It allows you to only run the impacted tests for a given commit and skip any that are irrelevant.

By only running tests on relevant code, when tests do fail it's more likely a legitimate failure that pertains to the modified code.

## Setup


### Javascript

To enable Intelligent Test Runner, the following environment variables need to be set:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][1] used to upload the test results.<br/>
**Default**: `(empty)`

`DD_SITE` (Required)
: The [Datadog site][3] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

`DD_CIVISIBILITY_GIT_UPLOAD_ENABLED=true` (Required)
: Flag to enable git metadata upload.<br/>
**Default**: `false`

`DD_CIVISIBILITY_ITR_ENABLED=true` (Required)
: Flag to enable test skipping. <br/>
**Default**: `false`

After setting these environment variables, run your tests as you normally do:

{{< code-block lang="bash" >}}
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$API_KEY DD_CIVISIBILITY_GIT_UPLOAD_ENABLED=true DD_CIVISIBILITY_ITR_ENABLED=true yarn test
{{< /code-block >}}

#### UI activation
In addition to the environment variables above, the Intelligent Test Runner needs to be activated in [Test Service Settings][4].

#### Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `dd-trace>=3.4.0`
* `jest>=24.8.0`
  * Only `jest-circus/runner` is supported as `testRunner`.
  * Only `jsdom` and `node` are supported as test environments.

### .NET

To enable Intelligent Test Runner, the version of the `dd-trace` tool must be >= 2.16.0 (execute `dd-trace --version` to get the version of the tool) and the following environment variables are set:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][1] used to upload the test results.<br/>
**Default**: `(empty)`

`DD_APPLICATION_KEY` (Required)
: The [Datadog Application key][2] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

`DD_SITE` (Required)
: The [Datadog site][3] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

`DD_CIVISIBILITY_ITR_ENABLED=true` (Required)
: Flag to enable intelligent test runner. <br/>
**Default**: `false`

After setting these environment variables, run your tests as you normally do:

{{< tabs >}}

{{% tab "dotnet test" %}}

By using <a href="https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test">dotnet test</a>

{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}

By using <a href="https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options">VSTest.Console.exe</a>

{{< code-block lang="bash" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

#### UI activation
In addition to the environment variables above, the Intelligent Test Runner needs to be activated in [Test Service Settings][4].

### Swift

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/ci/settings/test-service
