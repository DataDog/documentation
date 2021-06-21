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
* .NET Core 2.1+
* .NET Core 3.0+
* .NET 5.0+

Supported test frameworks:
* xUnit 2.2+
* NUnit 3.0+
* MsTest V2 14+ (experimental)

Supported CI providers:
* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing tracing

To install the `dd-trace` command globally on the machine, run:

{{< code-block lang="bash" >}}
dotnet tool install -g dd-trace
{{< /code-block >}}

Or, if you have a previous version of the tool, update it by running:

{{< code-block lang="bash" >}}
dotnet tool update -g dd-trace
{{< /code-block >}}

## Instrumenting your tests

To instrument your test suite, prefix your test command with `dd-trace`. For example:

{{< code-block lang="bash" >}}
dd-trace dotnet test
{{< /code-block >}}

All tests are instrumented automatically.

### Configuration settings

You can change the default configuration of the CLI by using command line arguments or environment variables. For a full list of configuration settings, run:

{{< code-block lang="bash" >}}
dd-trace --help
{{< /code-block >}}

The following list shows the default values for key configuration settings:


`--set-ci`
: Sets up the clr profiler environment variables for all the CI pipeline. <br/>
**Default**: `false`

`--dd-env`
: Environment name for unified service tagging.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `(empty)`

`--dd-service`
: Service name for unified service tagging. <br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `(ProcessName)` 

`--dd-version` 
: Version for unified service tagging. <br/>
**Environment variable**: `DD_VERSION`<br/>
**Default**: `(empty)`

`--agent-url` 
: Datadog trace agent URL. <br/>
**Environment variable**: `DD_TRACE_AGENT_URL`<br/>
**Default**: `http://localhost:8126`

Additionally, all [Datadog Tracer configuration][2] options can be used during test phase. 

For example, to run a test suite with a custom agent URL and a custom service name:

{{< code-block lang="bash" >}}
dd-trace --agent-url=http://agent:8126 --dd-service=my-app dotnet test
{{< /code-block >}}

### Passing parameters to the application

If the application expects command line arguments, use a `--` separator before the target application to avoid parameter collision.

The following example shows how to instrument the command `dotnet test --framework netcoreapp3.1` with `ci` as environment:

{{< code-block lang="bash" >}}
dd-trace --dd-env=ci -- dotnet test --framework netcoreapp3.1
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
