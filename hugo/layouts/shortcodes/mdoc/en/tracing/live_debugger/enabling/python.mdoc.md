<!--
Live Debugger Python enablement — included when prog_lang is python.
-->

You can enable Live Debugger in-app in one of two ways:

- On the [Live Debugger Settings page][1], enable the service and environment.
- Start a Debug Session. Live Debugger is enabled automatically on the selected service and environment.

Either option requires Datadog Python SDK version 3.10.0 or higher.

If your SDK version is lower, or you prefer to configure Live Debugger with environment variables, use the following manual configuration.

**SDK version**: [Datadog Python SDK (`ddtrace`)][2] version 4.11.0 or higher is strongly recommended. The minimum SDK version is 2.9.0, but it may result in unexpected errors and a degraded experience.

Install `ddtrace`, then start your service with `DD_DYNAMIC_INSTRUMENTATION_ENABLED=true` and `ddtrace-run`:

```shell
pip install ddtrace
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
ddtrace-run python -m myapp.py
```

[1]: https://app.datadoghq.com/debugging/settings
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
