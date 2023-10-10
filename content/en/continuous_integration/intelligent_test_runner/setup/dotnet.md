---
title: Intelligent Test Runner for .NET
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 0
aliases:
  - continuous_integration/intelligent_test_runner/dotnet/
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

## Compatibility

Intelligent Test Runner is only supported on `dd-trace>= 2.22.0` (execute `dd-trace --version` to get the version of the tool).

## Setup

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for .NET][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

### Enable Intelligent Test Runner

To enable Intelligent Test Runner, set the following environment variable:

`DD_APPLICATION_KEY` (Required)
: The [Datadog Application key][2] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

After setting the environment variable, run your tests as you normally do by using [dotnet test][4] or [VSTest.Console.exe][5]:

{{< tabs >}}

{{% tab "dotnet test" %}}


{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

{{% /tab %}}

{{% tab "VSTest.Console" %}}


{{< code-block lang="shell" >}}
dd-trace ci run --dd-service=my-dotnet-app --dd-env=ci -- VSTest.Console.exe {test_assembly}.dll
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/dotnet
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[5]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options
