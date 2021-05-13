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
## Compatibility Requirements

Python versions `2.7+` and `3.5+` are supported.  For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and getting started

### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][2] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces, and Trace ID injection into logs during setup.

Otherwise, to begin tracing applications written in Python, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

**Note:** This command requires pip version `18.0.0` or greater.  For Ubuntu, Debian, or another package manager, update your pip version with the following command:

```python
sudo -H pip3 install --upgrade pip
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in your main [`datadog.yaml` configuration file][1]

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After having instrumented your application, the tracing client sends traces to `localhost:8126` by default.  If this is not the correct host and port change it by setting the below env variables:

    `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

    You can also set the hostname and port in code:

    ```python
    import os
    from ddtrace import tracer

    tracer.configure(
        hostname="custom-hostname",
        port="1234",
    )
    ```
{{< site-region region="us3,eu,gov" >}} 

4. Set `DD_SITE` to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Services Extension][4].

For other environments, please refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}

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
: The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations like Pylons, Flask, or Django. For tracing without a web integration, it is recommended that you [set the service name in code](#integrations). Available in version 0.38+.

`DD_SERVICE_MAPPING`
: Define service name mappings to allow renaming services in traces, for example: `postgres:postgresql,defaultdb:postgresql`. Available in version 0.47+.

`DD_VERSION`
: Set the application’s version, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Available in version 0.38+.

`DD_TAGS`
: A list of default tags to be added to every span and profile, for example: `layer:api,team:intake`. Available in version 0.38+.

`DD_TRACE_ENABLED`
: **Default**: `true`<br>
Enable web framework and library instrumentation. When `false`, the application code doesn't generate any traces.

`DD_AGENT_HOST`
: **Default**: `localhost`<br>
Override the address of the trace Agent host that the default tracer attempts to submit traces to.

`DATADOG_TRACE_AGENT_PORT`
: **Default**: `8126`<br>
Override the port that the default tracer submit traces to.

`DD_TRACE_AGENT_URL`
: The URL of the Trace Agent that the tracer submits to. Takes priority over hostname and port, if set. Supports Unix Domain Sockets in combination with the `apm_config.receiver_socket` in your `datadog.yaml` file, or the `DD_APM_RECEIVER_SOCKET` environment variable.

`DD_LOGS_INJECTION`
: **Default**: `false`<br>
Enable [connecting logs and trace injection][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/docs
[3]: https://ddtrace.readthedocs.io/en/stable/
[4]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[5]: /getting_started/tagging/unified_service_tagging
[6]: /tracing/guide/setting_primary_tags_to_scope/
[7]: /tracing/connect_logs_and_traces/python/
