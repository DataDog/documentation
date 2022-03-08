---
title: Tracing Python Applications
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 10
aliases:
    - /tracing/python/
    - /tracing/languages/python/
    - /agent/apm/python/
    - /tracing/setup/python
    - /tracing/setup_overview/python
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

When you set up tracing, you're also setting up Continuous Profiler, and you need only [enable Profiler][2] to start receiving profiling data from your app.

## Installation and getting started

### Follow the in-app documentation (recommended)

Follow the [Quickstart instructions][3] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces, and Trace ID injection into logs during setup.

Otherwise, to begin tracing applications written in Python, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

**Note:** This command requires pip version `18.0.0` or greater.  For Ubuntu, Debian, or another package manager, update your pip version with the following command:

```python
pip install --upgrade pip
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data by default at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After the application is instrumented, the trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable. Some examples:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket
   ```

   The connection for traces can also be configured in code:

   ```python
   from ddtrace import tracer

   # Network sockets
   tracer.configure(
       https=False,
       hostname="custom-hostname",
       port="1234",
   )

   # Unix domain socket configuration
   tracer.configure(
       uds_path="/var/run/datadog/apm.socket",
   )
   ```

   Similarly, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist then stats are sent to `http://localhost:8125`.

   If a different configuration is required, the `DD_DOGSTATSD_URL` environment variable can be used. Some examples:
   ```
   DD_DOGSTATSD_URL=http://custom-hostname:1234
   DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket
   ```
   The connection for stats can also be configured in code:

   ```python
   from ddtrace import tracer

   # Network socket
   tracer.configure(
     dogstatsd_url="http://localhost:8125",
   )

   # Unix domain socket configuration
   tracer.configure(
     dogstatsd_url="unix:///var/run/datadog/dsd.socket",
   )
   ```
{{< site-region region="us3,us5,eu,gov" >}} 

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Service][4].

For other environments, please refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}

Once you've finished setup and are running the tracer with your application, you can run `ddtrace-run --info` to check that configurations are working as expected. Note that the output from this command does not reflect configuration changes made during runtime in code.

For more advanced usage, configuration, and fine-grain control, see Datadog's [API documentation][3].

## Configuration

When using **ddtrace-run**, the following [environment variable options][4] can be used:

`DD_TRACE_DEBUG`
: **Default**: `false`<br>
Enable debug logging in the tracer.

`DATADOG_PATCH_MODULES`
: Override the modules patched for this application execution. Follow the format: `DATADOG_PATCH_MODULES=module:patch,module:patch...`

It is recommended to use `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services. Refer to the [Unified Service Tagging][5] documentation for recommendations on how to configure these environment variables.

`DD_ENV`
: Set the application’s environment, for example: `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][6]. Available in version 0.38+.

`DD_SERVICE`
: The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations like Pylons, Flask, or Django. For tracing without a web integration, it is recommended that you set the service name in code ([for example, see these Django docs][7]). Available in version 0.38+.

`DD_SERVICE_MAPPING`
: Define service name mappings to allow renaming services in traces, for example: `postgres:postgresql,defaultdb:postgresql`. Available in version 0.47+.

`DD_VERSION`
: Set the application’s version, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Available in version 0.38+.

`DD_TRACE_SAMPLE_RATE`
: Enable [Tracing without Limits][8].

`DD_TRACE_RATE_LIMIT`
: Maximum number of spans to sample per-second, per-Python process. Defaults to `100` when `DD_TRACE_SAMPLE_RATE` is set. Otherwise, delegates rate limiting to the Datadog Agent.

`DD_TAGS`
: A list of default tags to be added to every span and profile, for example: `layer:api,team:intake`. Available in version 0.38+.

`DD_TRACE_ENABLED`
: **Default**: `true`<br>
Enable web framework and library instrumentation. When `false`, the application code doesn't generate any traces.

`DD_AGENT_HOST`
: **Default**: `localhost`<br>
Override the address of the trace Agent host that the default tracer attempts to submit traces to.

`DD_AGENT_PORT`
: **Default**: `8126`<br>
Override the port that the default tracer submit traces to.

`DD_TRACE_AGENT_URL`
: The URL of the Trace Agent that the tracer submits to. If set, this takes priority over hostname and port. Supports Unix Domain Sockets (UDS) in combination with the `apm_config.receiver_socket` configuration in your `datadog.yaml` file or the `DD_APM_RECEIVER_SOCKET` environment variable set on the Datadog Agent. For example, `DD_TRACE_AGENT_URL=http://localhost:8126` for HTTP URL and `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket` for UDS.

`DD_DOGSTATSD_URL`
: The URL used to connect to the Datadog Agent for DogStatsD metrics. If set, this takes priority over hostname and port. Supports Unix Domain Sockets (UDS) in combination with the `dogstatsd_socket` configuration in your `datadog.yaml` file or the `DD_DOGSTATSD_SOCKET` environment variable set on the Datadog Agent. For example, `DD_DOGSTATSD_URL=udp://localhost:8126` for UDP URL and `DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket` for UDS.

`DD_DOGSTATSD_HOST`
: **Default**: `localhost`<br>
Override the address of the trace Agent host that the default tracer attempts to submit DogStatsD metrics to. Use `DD_AGENT_HOST` to override `DD_DOGSTATSD_HOST`.

`DD_DOGSTATSD_PORT`
: **Default**: `8126`<br>
Override the port that the default tracer submits DogStatsD metrics to.

`DD_LOGS_INJECTION`
: **Default**: `false`<br>
Enable [connecting logs and trace injection][9].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: /tracing/profiler/enabling/?tab=python
[3]: https://app.datadoghq.com/apm/docs
[4]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[5]: /getting_started/tagging/unified_service_tagging
[6]: /tracing/guide/setting_primary_tags_to_scope/
[7]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[8]: /tracing/trace_ingestion/
[9]: /tracing/connect_logs_and_traces/python/
