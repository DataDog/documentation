---
title: Configuring the Python Tracing Library (DRAFT)
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: 'GitHub'
      text: 'Source code'
    - link: 'https://ddtrace.readthedocs.io/en/stable/'
      tag: 'Pypi'
      text: 'API Docs'
    - link: "/tracing/trace_collection/trace_context_propagation/python/"
      tag: "Documentation"
      text: "Propagating trace context"
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

## Unified service tagging

### Set the application environment

**Variable**: `DD_ENV`  
**Description**: Set the application's environment, like `prod`, `pre-prod`, `staging`. Learn more about [how to setup your environment][3].  
**Version**: Available in version 0.38+.  
**Default**: N/A.  
**Example**:

{{< tabs >}}
{{% tab "Host" %}}
```
DD_ENV: prod
```
{{< /tab >}}
{{% tab "Container" %}}
Placeholder
{{< /tab >}}
{{< /tabs >}}

### Set the application service name

**Variable**: `DD_Service`  
**Description**: The service name to be used for this application. The value is passed through when setting up middleware for web framework integrations like Pylons, Flask, or Django. For tracing without a web integration, it is recommended that you set the service name in code (for example, see these [Django docs][4]).  
**Version**: Available in version 0.38+.  
**Default**: N/A.  
**Example**:

{{< tabs >}}
{{% tab "Host" %}}
```
DD_SERVICE: test
```
{{< /tab >}}
{{% tab "Container" %}}
Learn more...
{{< /tab >}}
{{< /tabs >}}

### Set the application version

**Variable**: `DD_SERVICE`  
**Description**: Set the application's version like `1.2.3`, `6c44da20`, or `2020.02.13`.  
**Version**: Available in version 0.38+.  
**Default**: N/A.  
**Example**:

{{< tabs >}}
{{% tab "Host" %}}
```
DD_VERSION: 1.2.00
```
{{< /tab >}}
{{% tab "Container" %}}
Learn more...
{{< /tab >}}
{{< /tabs >}}

## Tracer configuration

### Enable debug logging

**Variable**: `DD_TRACE_DEBUG`  
**Description**: Enable debug logging in the tracer.  
**Version**: Available in version X.XX.  
**Default**: `false`  
**Example**:

{{< tabs >}}
{{% tab "Host" %}}
```
DD_TRACE_DEBUG: false
```
{{< /tab >}}
{{% tab "Container" %}}
Learn more...
{{< /tab >}}
{{< /tabs >}}

## Application Security Monitoring (ASM) configuration

### Enable Application Security Monitoring

**Variable**: `DD_APPSEC_ENABLED`  
**Description**: Enable Application Security Monitoring (ASM).  
**Version**: Available in version 0.38+.  
**Default**: `false`  
**Example**:

{{< tabs >}}
{{% tab "Host" %}}
```
DD_APPSEC_ENABLED: true
```
{{< /tab >}}
{{% tab "Container" %}}
Learn more...
{{< /tab >}}
{{< /tabs >}}

## Profiling configuration

### Set the logging level

**Variable**: `DD_PROFILING_LOG_LEVEL`  
**Description**: Set the logging level to either `trace`, `debug`, `info`, `warn`, `error`, `critical`, or `off`.  
**Version**: Available in version 0.38+.  
**Default**: N/A.  
**Example**:

{{< tabs >}}
{{% tab "Host" %}}
```
DD_PROFILING_LOG_LEVEL: debug
```
{{< /tab >}}
{{% tab "Container" %}}
Learn more...
{{< /tab >}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /tracing/guide/setting_primary_tags_to_scope/
[4]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[5]: /tracing/trace_pipeline/ingestion_mechanisms/
[6]: /tracing/other_telemetry/connect_logs_and_traces/python/
[13]: /agent/configuration/network/#configure-ports
