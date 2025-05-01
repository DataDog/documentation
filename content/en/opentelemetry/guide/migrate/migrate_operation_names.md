---
title: Migrate to New Operation Name Mappings
aliases:
- "/opentelemetry/guide/migrate_operation_names/"
further_reading:
- link: "/opentelemetry/schema_semantics/"
  tag: "Documentation"
  text: "Mapping Datadog and OpenTelemetry Conventions"
---

## Overview

When using OpenTelemetry with Datadog, you might see unclear or lengthy operation names in your traces, and some traces might not appear in your service pages. This happens because of missing mappings between OpenTelemetry SDK information and Datadog operation names, which are span attributes that classify [entry points into a service][1].

Datadog is updating how operation names are generated for OpenTelemetry traces by enabling a new feature flag (`enable_operation_and_resource_name_logic_v2`) **by default**. This change improves trace visibility in service pages and standardizes operation naming.

<div class="alert alert-danger">
This is a <strong>breaking change</strong> for monitors or dashboards that reference operation names. You must update your monitors and dashboards to use the new naming conventions, or explicitly <a href="#opting-out">opt out</a>.
</div>

## New mapping logic

The following table shows how operation names are determined based on span attributes and kind. The system processes conditions from top to bottom and uses the first matching rule.

For example, with the new logic, a span previously named `go.opentelemetry.io_contrib_instrumentation_net_http_otelhttp.server` is now named `http.server.request`.

| Conditions on Span Attributes                         | Span Kind                       | Resulting Operation Name      |
|-------------------------------------------------------|---------------------------------|-------------------------------|
| `operation.name` is set                               | Any                             | Value of `operation.name`     |
| `http.request.method` or `http.method` is set         | Server                          | `http.server.request`         |
| `http.request.method` or `http.method` is set         | Client                          | `http.client.request`         |
| `db.system` is set                                    | Client                          | `<db.system>.query`           |
| `messaging.system` and `messaging.operation` are set  | Client/Server/Consumer/Producer | `<system>.<operation>`        |
| `rpc.system == "aws-api"` and `rpc.service` are set   | Client                          | `aws.<service>.request`       |
| `rpc.system == "aws-api"`                             | Client                          | `aws.client.request`          |
| `rpc.system` is set                                   | Client                          | `<rpc.system>.client.request` |
| `rpc.system` is set                                   | Server                          | `<rpc.system>.server.request` |
| `faas.invoked_provider` + `faas.invoked_name` are set | Client                          | `<provider>.<name>.invoke`    |
| `faas.trigger` is set                                 | Server                          | `<trigger>.invoke`            |
| `graphql.operation.type` is set                       | Any                             | `graphql.server.request`      |
| `network.protocol.name` is set                        | Server                          | `<protocol>.server.request`   |
| `network.protocol.name` is set                        | Client                          | `<protocol>.client.request`   |
| No matching attributes                                | Server                          | `server.request`              |
| No matching attributes                                | Client                          | `client.request`              |
| No matching attributes                                | Any non-unspecified kind        | `<spanKind>.String()`         |
| No matching attributes                                | Unspecified                     | `internal`                    |

**Note**: `<attribute>` placeholders like `<db.system>` represent the value of the corresponding span attribute.

## Prerequisites

Remove any existing span name configuration that conflicts with the [new logic](#new-operation-name-mapping-logic):

{{< tabs >}}
{{% tab "OpenTelemetry Collector" %}}

Remove `span_name_as_resource_name` and `span_name_remappings` from your Datadog exporter and connector configurations:

{{< highlight py "hl_lines=4-7 11-12" >}}
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

2. Remove these environment variables:
   - `DD_OTLP_CONFIG_TRACES_SPAN_NAME_AS_RESOURCE_NAME`
   - `DD_OTLP_CONFIG_TRACES_SPAN_NAME_REMAPPINGS`

{{% /tab %}}
{{< /tabs >}}

## Migrating (Recommended)

Datadog strongly recommends using the new default mappings, which are enabled by default. Ensure you have completed the prerequisite steps.

If you previously used the removed configurations (`span_name_as_resource_name` or `span_name_remappings`) and need equivalent functionality, you must now use different methods:

{{< tabs >}}
{{% tab "OpenTelemetry Collector" %}}

Use processors in your Collector pipeline:

- **To replicate `span_name_as_resource_name`**: Use a `transform` processor to explicitly set `operation.name` from the span name. This is generally **not recommended** as it overrides the improved standard logic, but can be used if specific span names are required as operation names.
    ```yaml
    processors:
      transform:
        trace_statements:
          - context: span
            statements:
            - set(attributes["operation.name"], name)
    ```
- **To replicate `span_name_remappings`**: Use a `transform` processor to conditionally set `operation.name`. This allows targeted overrides while letting the default logic handle other cases.
    ```yaml
    processors:
      transform:
        trace_statements:
          - context: span
            statements:
            # Example: Rename spans named "old_name" to "new_name"
            - set(attributes["operation.name"], "new_name") where name == "old_name"
            # Add more specific renaming rules as needed
    ```

{{% /tab %}}
{{% tab "Datadog Agent" %}}

To replicate `span_name_as_resource_name` or `span_name_remappings`: The recommended approach is to set the `operation.name` span attribute directly within your instrumented application code *before* the span is exported. This gives you the most control if specific overrides are needed. Consult the OpenTelemetry SDK documentation for your language on how to modify span attributes.

{{% /tab %}}
{{% /tabs %}}

## Opting out

If you cannot migrate your dashboards or monitors immediately, you can temporarily opt-out and retain the old operation name behavior by explicitly disabling the feature flag.

{{% tabs %}}
{{% tab "OpenTelemetry Collector" %}}

Launch the OpenTelemetry Collector with the feature gate explicitly disabled using a minus sign (`-`):

```shell
otelcol --config=config.yaml --feature-gates=-datadog.EnableOperationAndResourceNameV2
```

{{< /tab >}}
{{% tab "Datadog Agent" %}}

Disable the feature using one of these methods:

- Add the feature flag set to false in your Agent configuration (`datadog.yaml`):

   ```yaml
   apm_config:
     features: ["disable_operation_and_resource_name_logic_v2"]
   ```

- Set the environment variable:

   ```shell
   export DD_APM_FEATURES="disable_operation_and_resource_name_logic_v2"
   ```

   **Note**: If you already have features configured with this variable, use a comma-separated list: 

   ```shell
   export DD_APM_FEATURES="existing_feature,disable_operation_and_resource_name_logic_v2"
   ```

{{% /tab %}}
{{% tab "DDOT Collector" %}}

### Helm

If you are using the Helm chart with the Datadog Distribution of OpenTelemetry (DDOT) Collector enabled, pass the feature gate flag to the DDOT Collector:

```shell
helm upgrade -i <RELEASE_NAME> datadog/datadog \
  -f datadog-values.yaml \
  --set datadog.otelCollector.featureGates="-datadog.EnableOperationAndResourceNameV2"
```

### Datadog Operator

If you are using Datadog Operator, use the `DD_APM_FEATURES` environment variable override in `datadog-agent.yaml`:

```yaml
spec:
  # ...
  override:
    nodeAgent:
      env:
        - name: DD_APM_FEATURES
          value: "disable_operation_and_resource_name_logic_v2"
```

{{% /tab %}}
{{% /tabs %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/configuring-primary-operation/#primary-operations
