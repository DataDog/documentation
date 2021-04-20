---
title: Getting Started
kind: Documentation
aliases:
    - /tracing/profiling/getting_started/python
code_lang: python
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'tracing/profiler/intro_to_profiling'
      tag: 'Documentation'
      text: 'Intro to profiling.'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types.'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---


**Requirements**

The Datadog Profiler requires Python 2.7+ and Agent version [7.20.2][1]+ or
[6.20.2][1]+.

The following profiling features are available depending on your Python version:

|      Feature         | Supported Python versions          |
|----------------------|------------------------------------|
| Wall time profiling  | Python >= 2.7                      |
| CPU time profiling   | Python >= 2.7 on POSIX platforms   |
| Exception profiling  | Python >= 3.7 on POSIX platforms   |
| Lock profiling       | Python >= 2.7                      |
| Memory profiling     | Python >= 3.5                      |

**Installation**

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

**Usage**

To automatically profile your code, set the `DD_PROFILING_ENABLED` environment variable to `true` when you use `ddtrace-run`:

    DD_PROFILING_ENABLED=true \
    DD_ENV=prod \
    DD_SERVICE=my-web-app \
    DD_VERSION=1.0.3 \
    ddtrace-run python app.py

It is strongly recommended that you add tags like `service` or `version`, as they provide the ability to slice and dice your profiles across these dimensions. See [Configuration] below.

After a couple of minutes, visualize your profiles on the [Datadog APM > Profiler page][2].

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

**Caveats**

When your process forks using `os.fork`, the profiler is actually stopped in
the child process and needs to be restarted. For Python 3.7+ on Unix platforms,
a new profiler is automatically started.

If you use Python < 3.7, or run on a non-Unix platform, you need to manually
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

**Configuration**

You can configure the profiler using the following environment variables:

| Environment Variable    | Keyword Argument to `Profiler` | Type                       | Description                                                         |
| ------------------------|------------------------------- | -------------------------- | --------------------------------------------------------------------|
| `DD_PROFILING_ENABLED`  |                                | Boolean                    | Set to `true` to enable profiler.                                   |
| `DD_SERVICE`            | `service`                      | String                     | The Datadog [service][3] name.                                      |
| `DD_ENV`                | `env`                          | String                     | The Datadog [environment][4] name, for example, `production`.       |
| `DD_VERSION`            | `version`                      | String                     | The version of your application.                                    |
| `DD_TAGS`               | `tags`                         | String / Dictionary        | Tags to apply to an uploaded profile. If set with an environment variable, it must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`. If set with keyword argument, it must be a dictionary where keys are tag names and values are tag values such as:`{"layer": "api", "team": "intake"}`.  |


## Not sure what to do next?

The [Intro to Profiling][5] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/profiling
[3]: /tracing/visualization/#services
[4]: /tracing/guide/setting_primary_tags_to_scope/#environment
[5]: /tracing/profiler/intro_to_profiling/
