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

```
dotnet tool install -g dd-trace
```

Or, if you have a previous version of the tool, update it by running:

```
dotnet tool update -g dd-trace
```

## Instrumenting your tests

To instrument your test suite, prefix your test command with `dd-trace`. For example:

```
dd-trace dotnet test
```

All tests are instrumented automatically.

### Configuration settings

You can change the default configuration of the CLI by using command line arguments or environment variables. For a full list of configuration settings, run:

```
dd-trace --help
```

The following table shows the default values for key configuration settings:


| CLI option                     | Environment variable          | Default value            | Description                                                             |
|--------------------------------|--------------------------------|-------------------------|-------------------------------------------------------------------------|
| `--set-ci`                     |                                | `false`                 | Sets up the clr profiler environment variables for all the CI pipeline. |
| `--dd-env`                     | `DD_ENV`                       | `(empty)`               | Environment name for unified service tagging.                       |
| `--dd-service`                 | `DD_SERVICE`                   | `(ProcessName)`         | Service name for unified service tagging.                           |
| `--dd-version`                 | `DD_VERSION`                   | `(empty)`               | Version for unified service tagging.                                |
| `--agent-url`                  | `DD_TRACE_AGENT_URL`           | `http://localhost:8126` | Datadog trace agent URL.                                                |

Additionally, all [Datadog Tracer configuration][2] options can be used during test phase. 

For example, to run a test suite with a custom agent URL and a custom service name:

```
dd-trace --agent-url=http://agent:8126 --dd-service=my-app dotnet test
```

### Passing parameters to the application

If the application expects command line arguments, use a `--` separator before the target application to avoid parameter collision.

The following example shows how to instrument the command `dotnet test --framework netcoreapp3.1` with `ci` as environment:

```
dd-trace --dd-env=ci -- dotnet test --framework netcoreapp3.1
```

### Instrumenting MsTest V2 framework

Support for MsTest V2 framework is disabled by default, as it relies on an experimental method of instrumentation (some third-party libraries' instrumentation might be missing). To enable it, set the following environment variable before running the `dd-trace dotnet test` command:

```
DD_TRACE_CALLTARGET_ENABLED=true
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration
