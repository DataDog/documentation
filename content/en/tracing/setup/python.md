---
title: Tracing Python Applications
kind: documentation
aliases:
    - /tracing/python/
    - /tracing/languages/python/
    - /agent/apm/python/
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: 'GitHub'
      text: 'Source code'
    - link: 'https://ddtrace.readthedocs.io/en/stable/'
      tag: 'Pypi'
      text: 'API Docs'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
---
## Compatibility requirements

Python versions `2.7+` and `3.5+` are supported.  For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, App Analytics, and Trace ID injection into logs during setup.

Otherwise, to begin tracing applications written in Python, first [install and configure the Datadog Agent][3], see the additional documentation for [tracing Docker applications][4] or [Kubernetes applications][5].

Next, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

For more advanced usage, configuration, and fine-grain control, see Datadog's [API documentation][6].

## Configuration

When using **ddtrace-run**, the following [environment variable options][7] can be used:

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATADOG_TRACE_DEBUG`              | `false`     | Enable debug logging in the tracer.                                                                                                                                                                                                                                         |
| `DATADOG_PATCH_MODULES`            |             | Override the modules patched for this application execution. It should follow the format: `DATADOG_PATCH_MODULES=module:patch,module:patch...`.                                                                                                                            |

It is recommended to use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Refer to the [Unified Service Tagging][8] documentation for recommendations on how to configure these environment variables.

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_ENV`                           |             | Set the application’s environment, for example: `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][9]. Available in version 0.38+.                                                                                                             |
| `DD_SERVICE`                       |             | The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations like Pylons, Flask, or Django. For tracing without a web integration, it is recommended that you [set the service name in code](#integrations). Available in version 0.38+. |
| `DD_VERSION`                       |             | Set the application’s version, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Available in version 0.38+.                                                                                                                                                                  |
| `DD_TAGS`                          |             | A list of default tags to be added to every span, profile, and runtime metric, for example: `layer:api,team:intake`. Available in version 0.38+.                                                                                                                            |
| `DATADOG_TRACE_ENABLED`            | `true`      | Enable web framework and library instrumentation. When `false`, the application code doesn't generate any traces.                                                                                                                                                           |
| `DD_AGENT_HOST`                    | `localhost` | Override the address of the trace Agent host that the default tracer attempts to submit traces to.                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | Override the port that the default tracer submit traces to.                                                                                                                                                                                                                 |
| `DD_TRACE_AGENT_URL`               |             | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.  |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | Enable [Priority Sampling][10].                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | Enable [connecting logs and trace injection][11].                                                                                                                                                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`       | `false`     | Enable App Analytics globally for [web integrations][12].                                                                                                                                                                                                                   |
| `DD_INTEGRATION_ANALYTICS_ENABLED` | `false`     | Enable App Analytics for a specific integration. Example: `DD_BOTO_ANALYTICS_ENABLED=true` .                                                                                                                                                                                |

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname. The Python Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

But you can also set the hostname and port in code:

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname="custom-hostname",
    port="1234",
)
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/docs
[3]: /tracing/send_traces/
[4]: /tracing/setup/docker/
[5]: /agent/kubernetes/apm/
[6]: https://ddtrace.readthedocs.io/en/stable/
[7]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[8]: /getting_started/tagging/unified_service_tagging
[9]: /tracing/guide/setting_primary_tags_to_scope/
[10]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#priority-sampling
[11]: /tracing/connect_logs_and_traces/python/
[12]: /tracing/app_analytics/?tab=python#automatic-configuration
