---
title: Migrate to New Operation Name Mappings
further_reading:
- link: "/opentelemetry/schema_semantics/"
  tag: "Documentation"
  text: "Mapping Datadog and OpenTelemetry Conventions"
---

## Overview

When using OpenTelemetry with Datadog, you might see unclear or lengthy operation names in your traces, and some traces might not appear in your service pages. This happens because of missing mappings between OpenTelemetry SDK information and Datadog operation names, which are span attributes that classify [entry points into a service][1].

Datadog now provides new operation name mappings that improve trace visibility in the service page. This feature requires opt-in configuration now but will become the default in the near future.

<div class="alert alert-warning">
Datadog strongly recommends migrating to the new mappings as soon as possible before they become the default.
</div>

## Prerequisites

Before migrating, remove any existing span name configuration:

{{< tabs >}}
{{% tab "OpenTelemetry Collector" %}}

Remove `span_name_as_resource_name` and `span_name_remappings` from your Datadog exporter and connector configurations:

{{< highlight py "hl_lines=4-6 11" >}}
# Remove the highlighted lines if they exist in your configuration
exporters:
  datadog:
    traces:
      span_name_as_resource_name: true
      span_name_remappings:
        "old_name1": "new_name"

connectors:
  datadog/connector:
    traces:
      span_name_as_resource_name: true
{{< /highlight >}}

{{% /tab %}}
{{% tab "Datadog Agent" %}}

1. Remove `span_name_as_resource_name` and `span_name_remappings` from your Agent configuration:
{{< highlight py "hl_lines=4-6" >}}
# Remove the highlighted lines if they exist in your configuration
otlp_config:
  traces:
    span_name_as_resource_name: true
    span_name_remappings:
      "old_name1": "new_name"
{{< /highlight >}}

2. Unset these environment variables:
   - `DD_OTLP_CONFIG_TRACES_SPAN_NAME_AS_RESOURCE_NAME`
   - `DD_OTLP_CONFIG_TRACES_SPAN_NAME_REMAPPINGS`

{{% /tab %}}
{{< /tabs >}}

## Enable new operation name mappings

{{< tabs >}}
{{% tab "OpenTelemetry Collector" %}}

Launch the OpenTelemetry Collector with the feature gate:

```shell
otelcol --config=config.yaml --feature-gates=datadog.EnableOperationAndResourceNameV2
```

### Replace removed configurations

If you previously used span name configurations, replace them with processor configurations:

#### Replace SpanNameAsResourceName

The removed `span_name_as_resource_name` configuration pulled the `span.name` attribute from your OpenTelemetry trace to populate the Datadog operation name. To maintain this functionality, use a transform processor to map span names to the `operation.name` attribute:

```yaml
processors:
  transform:
    trace_statements:
      - context: span
        statements:
        - set(attributes["operation.name"], name)
```

#### Replace SpanNameRemappings

The removed `span_name_remappings` configuration allowed automatic mapping between operation names. To maintain this functionality, use a transform processor to set specific operation names:

```yaml
processors:
  transform:
    trace_statements:
      - context: span
        statements:
        - set(attributes["operation.name"], "new_name") where name == "old_name"
```

{{% /tab %}}
{{% tab "Datadog Agent" %}}

Enable the feature using one of these methods:

- Add the feature flag to your Agent configuration:

    ```yaml
    apm_config:
      features: ["enable_operation_and_resource_name_logic_v2"]
    ```
- Set the environment variable:

    ```shell
    export DD_APM_FEATURES="enable_operation_and_resource_name_logic_v2"
    ```

<div class="alert alert-info"><strong>Replace removed configurations</strong><br>If you previously used span name configurations and need to maintain similar functionality, set the <code>operation.name</code> attribute directly in your application code.</div>

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/configuring-primary-operation/#primary-operations
