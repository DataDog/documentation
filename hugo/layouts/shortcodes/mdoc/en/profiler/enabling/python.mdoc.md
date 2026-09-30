<!--
Python profiler setup — self-contained.
-->

The profiler is shipped within Datadog SDKs. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][2].

- Verify your Python and SDK versions are compatible by reviewing the [Python Compatibility Requirements][4].
- Some features depend on newer Python versions than the minimum required version for the SDK. For more details, read [Profile Types][5].
- The installation requires pip version 18 or above.
- Continuous Profiler support is in Preview for some serverless platforms, such as [AWS Lambda][6].

## Installation

To begin profiling applications:

1. Make sure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][3].

2. Install `ddtrace`, which provides both tracing and profiling functionalities:

   ```shell
   pip install ddtrace
   ```

   If you are using a platform where `ddtrace` binary distribution is not available, first install a development environment. For example, on Alpine Linux:

   ```shell
   apk install gcc musl-dev linux-headers
   ```

3. Enable the profiler and specify your service, environment, and version:

   ```shell
   DD_PROFILING_ENABLED=true \
   DD_ENV=prod \
   DD_SERVICE=my-web-app \
   DD_VERSION=1.0.3 \
   ddtrace-run python app.py
   ```

   To manually control the life cycle of the profiler, use the `ddtrace.profiling.Profiler` object:

   ```python
   from ddtrace.profiling import Profiler

   prof = Profiler(
       env="prod",  # if not specified, falls back to environment variable DD_ENV
       service="my-web-app",  # if not specified, falls back to environment variable DD_SERVICE
       version="1.0.3",   # if not specified, falls back to environment variable DD_VERSION
   )
   prof.start()  # Should be as early as possible, eg before other imports, to ensure everything is profiled
   ```

4. Optional: Set up [Source Code Integration][7] to connect your profiling data with your Git repositories.

5. After a couple of minutes, your profiles appear on the [Datadog APM > Profiler page][8]. If they do not, see the [Troubleshooting][9] guide.

### Caveats

When your process forks using `os.fork`, the profiler is automatically restarted
in the child process on supported Python versions. No manual restart is required.

## Configuration

You can configure the profiler using the [environment variables][10].

### Code provenance

The Python profiler supports code provenance reporting, which provides
insight into the library that is running the code. While this is
enabled by default, you can turn it off by setting
`DD_PROFILING_ENABLE_CODE_PROVENANCE=0`.

## Set up the profiler with an AI coding assistant

Use the following prompt with a local AI coding agent to set up the Python profiler for your service. Copy and paste this prompt into your AI agent to get started.

```text
You are helping me set up Datadog Continuous Profiler for my Python service.

First, scan my project to auto-detect as much as possible. Look for:
- requirements.txt, pyproject.toml, setup.py, setup.cfg, or Pipfile to
  determine the Python version and whether ddtrace is already installed.
- Dockerfile or docker-compose.yml for the base image (check if it is
  Alpine/musl or a slim image that may lack build tools), startup command,
  and existing Datadog configuration.
- Procfile, gunicorn.conf.py, uvicorn config, or manage.py to determine
  how the application starts.
- Existing environment variables or .env files referencing DD_SERVICE,
  DD_ENV, DD_VERSION, DD_PROFILING_ENABLED, or ddtrace-run.
- Existing ddtrace usage in code (imports of ddtrace, calls to
  ddtrace.profiling.Profiler, or ddtrace-run in startup scripts).

Present a summary of what you detected, then ask ONLY about what you could
not determine:
- DD_SERVICE, DD_ENV, and DD_VERSION values (if not already set).
- Datadog Agent deployment method (if no Agent config found in the project).
- Whether to enable via environment variables or in code (if no existing
  pattern was detected).
- Anything ambiguous from the project files.

Generate the setup steps tailored to what you found:
- Install ddtrace with pip if not already present.
- If the base image is Alpine or musl-based, add build prerequisites
  (gcc, musl-dev, linux-headers).
- Enable the profiler using ddtrace-run with DD_PROFILING_ENABLED=true
  or the ddtrace.profiling.Profiler API, matching the project's existing
  pattern.
- Set DD_SERVICE, DD_ENV, and DD_VERSION.
- Show the complete modified startup command or Dockerfile.

Reference: https://docs.datadoghq.com/profiler/enabling/?code-lang=python
```

[1]: /tracing/trace_collection/
[2]: /profiler/enabling/supported_versions/
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: /tracing/trace_collection/compatibility/python
[5]: /profiler/profile_types/?tab=python
[6]: /serverless/aws_lambda/profiling/
[7]: /integrations/guide/source-code-integration/?tab=python
[8]: https://app.datadoghq.com/profiling
[9]: /profiler/profiler_troubleshooting/python/
[10]: https://ddtrace.readthedocs.io/en/stable/configuration.html#configuration
