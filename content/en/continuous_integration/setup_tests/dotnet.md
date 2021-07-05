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

## Instrumenting your tests

To instrument your test suite, prefix your test command with `dd-trace`, providing the name of the service or library under test as the `--dd-service` parameter, and the environment where tests are being run (i.e. `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) as the `--dd-env` parameter. For example:

{{< code-block lang="bash" >}}
dd-trace --dd-service my-dotnet-app --dd-env ci dotnet test
{{< /code-block >}}

All tests will be automatically instrumented.

### Additional configuration settings

You can change the default configuration of the CLI by using command line arguments or environment variables. For a full list of configuration settings, run:

{{< code-block lang="bash" >}}
dd-trace --help
{{< /code-block >}}

The following list shows the default values for key configuration settings:

`--dd-service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `(ProcessName)`<br/>
**Example**: `my-dotnet-app`

`--dd-env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `(empty)`<br/>
**Examples**: `local`, `ci`

`--agent-url`
: Datadog Agent URL for traces.<br/>
**Environment variable**: `DD_TRACE_AGENT_URL`<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][2] options can also be used.

### Passing parameters to the application

If the application expects command line arguments, use a `--` separator before the target application to avoid parameter collision.

The following example shows how to instrument the command `dotnet test --framework netcoreapp3.1` with `ci` as environment:

{{< code-block lang="bash" >}}
dd-trace --dd-service my-dotnet-app --dd-env=ci -- dotnet test --framework netcoreapp3.1
{{< /code-block >}}

### Instrumenting MsTest V2 framework

Support for MsTest V2 framework is disabled by default, as it relies on an experimental method of instrumentation (some third-party libraries' instrumentation might be missing). To enable it, set the following environment variable before running the `dd-trace dotnet test` command:

{{< code-block lang="bash" >}}
DD_TRACE_CALLTARGET_ENABLED=true
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration
