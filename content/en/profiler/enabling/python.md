---
title: Enabling the Python Profiler
code_lang: python
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting/python'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
aliases:
  - /tracing/profiler/enabling/python/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][14].

The Datadog Profiler requires Python 2.7+.

The following profiling features are available depending on your Python version. For more details, read [Profile Types][8]:

|      Feature         | Supported Python versions          |
|----------------------|------------------------------------|
| Wall time profiling  | Python 2.7+                      |
| CPU time profiling   | Python 2.7+ on POSIX platforms   |
| Exception profiling  | Python 3.7+ on POSIX platforms   |
| Lock profiling       | Python 2.7+                      |
| Memory profiling     | Python 3.5+                      |

The installation requires pip version 18 or above.

The following profiling features are available in the following minimum versions of the `dd-trace-py` library:

| Feature                  | Required `dd-trace-py` version |
|--------------------------|--------------------------------|
| [Code Hotspots][12]      | 0.44.0+                        |
| [Endpoint Profiling][13] | 0.54.0+                        |

## Installation

Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

Install `ddtrace`, which provides both tracing and profiling functionalities:

```shell
pip install ddtrace
```

**Note**: Profiling requires the `ddtrace` library version 0.40+.

If you are using a platform where `ddtrace` binary distribution is not available, first install a development environment.

For example, on Alpine Linux, this can be done with:
```shell
apk install gcc musl-dev linux-headers
```

## Usage

To automatically profile your code, set the `DD_PROFILING_ENABLED` environment variable to `true` when you use `ddtrace-run`:

    DD_PROFILING_ENABLED=true \
    DD_ENV=prod \
    DD_SERVICE=my-web-app \
    DD_VERSION=1.0.3 \
    ddtrace-run python app.py

See [Configuration](#configuration) for more advanced usage.

Optionally, set up [Source Code Integration][4] to connect your profiling data with your Git repositories.

After a couple of minutes, visualize your profiles on the [Datadog APM > Profiler page][5].

If you want to manually control the lifecycle of the profiler, use the `ddtrace.profiling.Profiler` object:

```python
from ddtrace.profiling import Profiler

prof = Profiler(
    env="prod",  # if not specified, falls back to environment variable DD_ENV
    service="my-web-app",  # if not specified, falls back to environment variable DD_SERVICE
    version="1.0.3",   # if not specified, falls back to environment variable DD_VERSION
)
prof.start()  # Should be as early as possible, eg before other imports, to ensure everything is profiled
```

## Caveats

When your process forks using `os.fork`, the profiler needs to be started in
the child process. In Python 3.7+, this is done automatically. In Python < 3.7,
you need to manually start a new profiler in your child process:

```python
# For ddtrace-run users, call this in your child process
ddtrace.profiling.auto.start_profiler()  # Should be as early as possible, eg before other imports, to ensure everything is profiled

# Alternatively, for manual instrumentation,
# create a new profiler in your child process:
from ddtrace.profiling import Profiler

prof = Profiler(...)
prof.start()  # Should be as early as possible, eg before other imports, to ensure everything is profiled
```

## Configuration

You can configure the profiler using the [environment variables][6].

### Code provenance

The Python profiler supports code provenance reporting, which provides
insight into the library that is running the code. While this is
disabled by default, you can turn it on by setting
`DD_PROFILING_ENABLE_CODE_PROVENANCE=1`.

## Not sure what to do next?

The [Getting Started with Profiler][7] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /integrations/guide/source-code-integration/?tab=python
[5]: https://app.datadoghq.com/profiling
[6]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
[7]: /getting_started/profiler/
[8]: /profiler/profile_types/?code-lang=python
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /profiler/enabling/supported_versions/
