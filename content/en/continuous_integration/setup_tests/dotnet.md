---
title: .NET Tests
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

## Compatibility

Supported .NET versions:
* .NET Core >= 2.1 and >= 3.0
* .NET >= 5.0

Supported test frameworks:
* xUnit >= 2.2
* NUnit >= 3.0
* MsTest V2 >= 14

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing the .NET tracer

To install the `dd-trace` command globally on the machine, run:

{{< code-block lang="bash" >}}
dotnet tool install -g dd-trace
{{< /code-block >}}

## Instrumenting tests

{{< tabs >}}
{{% tab "xUnit and NUnit" %}}

To instrument your test suite, prefix your test command with `dd-trace`, providing the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter. For example:

{{< code-block lang="bash" >}}
dd-trace --dd-service=my-dotnet-app --dd-env=ci -- dotnet test
{{< /code-block >}}

All tests will be automatically instrumented.

{{% /tab %}}
{{% tab "MsTest V2" %}}

To instrument your test suite, prefix your test command with `dd-trace`, providing the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter.

Also, configure the tracer to use call target instrumentation by setting `DD_TRACE_CALLTARGET_ENABLED=true`, which is not the default value.

For example:

* In Bash:
{{< code-block lang="bash" >}}
DD_TRACE_CALLTARGET_ENABLED=true dd-trace \
  dd-trace --dd-service=my-dotnet-app --dd-env=ci -- \
  dotnet test
{{< /code-block >}}

* In CMD:
{{< code-block lang="bash" >}}
SET DD_TRACE_CALLTARGET_ENABLED=true && ^
dd-trace --dd-service=my-dotnet-app --dd-env=ci -- ^
dotnet test
{{< /code-block >}}

* In PowerShell:
{{< code-block lang="powershell" >}}
$env:DD_TRACE_CALLTARGET_ENABLED="true"; `
  dd-trace --dd-service=my-dotnet-app --dd-env=ci -- `
  dotnet test
{{< /code-block >}}

All tests will be automatically instrumented.

{{% /tab %}}
{{< /tabs >}}

### Additional configuration settings

You can change the default configuration of the CLI by using command line arguments or environment variables. For a full list of configuration settings, run:

{{< code-block lang="bash" >}}
dd-trace --help
{{< /code-block >}}

The following list shows the default values for key configuration settings:

`--dd-service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: The repository name<br/>
**Example**: `my-dotnet-app`

`--dd-env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

`--agent-url`
: Datadog Agent URL for traces.<br/>
**Environment variable**: `DD_TRACE_AGENT_URL`<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][2] options can also be used.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration
