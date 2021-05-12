---
title: .NET Tests
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---

## Supported .NET versions

* .NET Core 2.1+
* .NET Core 3.0+
* .NET 5.0+

## Supported Test frameworks

* xUnit 2.2+
* NUnit 3.0+
* MsTest V2 14+

## Supported CI providers

* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

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

All tests will be instrumented automatically.

## CLI configuration settings

You can change the default configuration of the CLI by using command line arguments or environment variables. For a full list of configuration settings, run:

```
dd-trace --help
```

The following table shows the default values for key configuration settings:


| CLI option                     | Environment variable          | Default value            | Description                                                             |
|--------------------------------|--------------------------------|-------------------------|-------------------------------------------------------------------------|
| `--set-ci`                     |                                | `false`                 | Sets up the clr profiler environment variables for all the CI pipeline. |
| `--dd-env`                     | `DD_ENV`                       | `(empty)`               | Environment name for the unified service tagging.                       |
| `--dd-service`                 | `DD_SERVICE`                   | `(ProcessName)`         | Service name for the unified service tagging.                           |
| `--dd-version`                 | `DD_VERSION`                   | `(empty)`               | Version for the unified service tagging.                                |
| `--agent-url`                  | `DD_TRACE_AGENT_URL`           | `http://localhost:8126` | Datadog trace agent url.                                                |

Additionally, all [Datadog Tracer configuration][1] options can be used during test phase.

### Example

To run a test suite with a custom agent URL and environment name:

```
dd-trace --agent-url=http://agent:8126 --dd-env=ci dotnet test
```

## Passing parameters to the application

If the application expects command line arguments, use a `--` separator before the target application to avoid parameter collision.

The following example shows how to instrument the command `dotnet test --framework netcoreapp3.1` with `ci` as environment:

```
dd-trace --dd-env=ci -- dotnet test --framework netcoreapp3.1
```

## Instrumenting MsTest V2 framework

MsTest V2 framework is disabled by default. To enable it, set the following environment variable before running the `dd-trace dotnet test` command:

```
DD_TRACE_CALLTARGET_ENABLED=true
```

This enables the new instrumentation format in the .NET tracer.

## Datadog Agent 

The Datadog Agent must be accessible by the environment you're using to run your tests on.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/setup/dotnet-core/?tab=windows#configuration
