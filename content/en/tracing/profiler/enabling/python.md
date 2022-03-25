---
title: Enabling the Python Profiler
kind: Documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

The Datadog Profiler requires Python 2.7+ and Agent version [7.20.2][2]+ or
[6.20.2][3]+.

The following profiling features are available depending on your Python version:

|      Feature         | Supported Python versions          |
|----------------------|------------------------------------|
| Wall time profiling  | Python >= 2.7                      |
| CPU time profiling   | Python >= 2.7 on POSIX platforms   |
| Exception profiling  | Python >= 3.7 on POSIX platforms   |
| Lock profiling       | Python >= 2.7                      |
| Memory profiling     | Python >= 3.5                      |

Continuous Profiler is not supported on serverless platforms, such as AWS Lambda.

## Installation

Install `ddtrace`, which provides both tracing and profiling functionalities:

```shell
pip install ddtrace
```

**Note**: Profiling requires the `ddtrace` library version 0.40+.

If you are using a platform where `ddtrace` binary distribution is not available, install a development environment.

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

It is strongly recommended that you add tags like `service` or `version`, as they provide the ability to filter and group your profiles across these dimensions. See [Configuration](#configuration) below.

After a couple of minutes, visualize your profiles on the [Datadog APM > Profiler page][4].

If you want to manually control the lifecycle of the profiler, use the `ddtrace.profiling.profiler.Profiler` object:

```python
from ddtrace.profiling import Profiler

prof = Profiler(
    env="prod",  # if not specified, falls back to environment variable DD_ENV
    service="my-web-app",  # if not specified, falls back to environment variable DD_SERVICE
    version="1.0.3",   # if not specified, falls back to environment variable DD_VERSION
)
prof.start()
```

## Caveats

When your process forks using `os.fork`, the profiler is actually stopped in
the child process and needs to be restarted. For Python 3.7+ on Unix platforms,
a new profiler is automatically started.

If you use Python < 3.7, or run on a non-Unix platform, you need to manually
start a new profiler in your child process.

```python
# For ddtrace-run users, call this in your child process
ddtrace.profiling.auto.start_profiler()

# Alternatively, for manual instrumentation,
# create a new profiler in your child process:
from ddtrace.profiling import Profiler

prof = Profiler()
prof.start()
```

## Configuration

You can configure the profiler using the [environment variables][5].

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
[6]: /getting_started/profiler/
