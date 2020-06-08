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
    - link: 'http://pypi.datadoghq.com/trace/docs/'
      tag: 'Pypi'
      text: 'API Docs'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
---

<div class="alert alert-info">
For Python Django applications, note that tracing is disabled when your application is launched in <code>DEBUG</code> mode. Find more <a href="http://pypi.datadoghq.com/trace/docs/web_integrations.html#django">here</a>.
</div>

## Installation and Getting Started

If you already have a Datadog account you can find [step-by-step instructions][1] in our in-app guides for either host-based or container-based set ups.

Otherwise, to begin tracing applications written in Python, first [install and configure the Datadog Agent][2], see the additional documentation for [tracing Docker applications][3] or [Kubernetes applications][4].

Next, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

For more advanced usage, configuration, and fine-grain control, see Datadog's [API documentation][5].

### Environment variables

When using **ddtrace-run**, the following [environment variable options][6] can be used:

| Environment Variable               | Default     | Description                                                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_ENV`                           |             | Set the application’s environment e.g. `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][7].                                                                                                                                                  |
| `DD_VERSION`                       |             | Set the application’s version e.g. `1.2.3`, `6c44da20`, `2020.02.13`.                                                                                                                                                                                                       |
| `DD_SERVICE`                       |             | The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations (e.g. Pylons, Flask, Django). For tracing without a web integration, it is recommended that you [set the service name in code](#integrations).      |
| `DATADOG_TRACE_ENABLED`            | `true`      | Enable web framework and library instrumentation. When `false`, the application code doesn't generate any traces.                                                                                                                                                           |
| `DATADOG_TRACE_DEBUG`              | `false`     | Enable debug logging in the tracer. Note that this is [not available with Django][8].                                                                                                                                                                                       |
| `DATADOG_PATCH_MODULES`            |             | Override the modules patched for this application execution. It should follow this format: `DATADOG_PATCH_MODULES=module:patch,module:patch...`.                                                                                                                            |
| `DD_AGENT_HOST`                    | `localhost` | Override the address of the trace Agent host that the default tracer attempts to submit traces to.                                                                                                                                                                          |
| `DATADOG_TRACE_AGENT_PORT`         | `8126`      | Override the port that the default tracer submit traces to.                                                                                                                                                                                                                 |
| `DD_TRACE_AGENT_URL`               |             | The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.  |
| `DATADOG_PRIORITY_SAMPLING`        | `true`      | Enable [Priority Sampling][9].                                                                                                                                                                                                                                              |
| `DD_LOGS_INJECTION`                | `false`     | Enable [connecting logs and traces Injection][10].                                                                                                                                                                                                                           |
| `DD_TRACE_ANALYTICS_ENABLED`       | `false`     | Enable App Analytics globally for [web integrations][11].                                                                                                                                                                                                                   |
| `DD_INTEGRATION_ANALYTICS_ENABLED` | `false`     | Enable App Analytics for a specific integration. Example: `DD_BOTO_ANALYTICS_ENABLED=true` .                                                                                                                                                                                |

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname. The Python Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/install
[2]: /tracing/send_traces/
[3]: /tracing/setup/docker/
[4]: /agent/kubernetes/apm/
[5]: http://pypi.datadoghq.com/trace/docs
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtracerun
[7]: /tracing/guide/setting_primary_tags_to_scope/
[8]: http://pypi.datadoghq.com/trace/docs/web_integrations.html?highlight=django#django
[9]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#priority-sampling
[10]: /tracing/connect_logs_and_traces/python/
[11]: /tracing/app_analytics/?tab=python#automatic-configuration
