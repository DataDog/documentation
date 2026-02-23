---
title: Migrate to New Operation Name Mappings
aliases:
- /opentelemetry/guide/migrate_operation_names/
- /opentelemetry/guide/migrate/migrate_operation_names/
further_reading:
- link: "/opentelemetry/schema_semantics/"
  tag: "Documentation"
  text: "Mapping Datadog and OpenTelemetry Conventions"
---

## Overview

When using OpenTelemetry with Datadog, you might see unclear or lengthy operation names in your traces, and some traces might not appear in your service pages. This happens because of missing mappings between OpenTelemetry SDK information and Datadog operation names, which are span attributes that classify [entry points into a service][1].

Datadog has introduced new logic for generating operation names for OpenTelemetry traces, controlled by the `enable_operation_and_resource_name_logic_v2` feature flag. This new logic improves trace visibility in service pages and standardizes operation naming according to the rules outlined below.

<div class="alert alert-warning">
<strong>Breaking Change:</strong> When this new logic is active (either by opting-in or future default), it is a breaking change for monitors or dashboards that reference operation names based on the old conventions. You must update your monitors and dashboards to use the new naming conventions described in <a href="#new-mapping-logic">New mapping logic</a>. If you cannot update them yet, you can <a href="#disabling-the-new-logic-opt-out">opt out</a> .
</div>

## Default rollout schedule

The `enable_operation_and_resource_name_logic_v2` feature flag controls this new logic. It is enabled by default starting in the following versions:

- **Datadog Distribution of OpenTelemetry (DDOT) Collector**: Datadog Agent v7.65+
- **OpenTelemetry Collector**: OTel Collector v0.126.0+
- **OTel to Datadog Agent (OTLP)**: Datadog Agent v7.66+

If you are using an earlier version and want to use the new logic without upgrading, you can [explicitly enable the new logic](#enabling-the-new-logic-opt-in).

## New mapping logic

When the `enable_operation_and_resource_name_logic_v2` flag is active, the following table shows how operation names are determined based on span attributes and kind. The system processes conditions from top to bottom and uses the first matching rule.

For example, with the new logic active, a span previously named `go.opentelemetry.io_contrib_instrumentation_net_http_otelhttp.server` is now named `http.server.request`.

| Condition on Span Attributes                         | Span Kind                       | Resulting Operation Name      |
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
| `faas.invoked_provider` and `faas.invoked_name` are set | Client                          | `<provider>.<name>.invoke`    |
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

Before enabling the new logic (either by opting-in or by upgrading to a version where it is default), remove any existing legacy span name configurations that might conflict:

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

1. Remove `span_name_as_resource_name` and `span_name_remappings` from your Agent's OTLP ingest configuration (`otlp_config` in `datadog.yaml`):
{{< highlight py "hl_lines=4-6" >}}
# Remove the highlighted lines if they exist in your configuration
otlp_config:
  traces:
    span_name_as_resource_name: true
    span_name_remappings:
      "old_name1": "new_name"
{{< /highlight >}}

2. Remove these environment variables if previously set for the Agent:
   - `DD_OTLP_CONFIG_TRACES_SPAN_NAME_AS_RESOURCE_NAME`
   - `DD_OTLP_CONFIG_TRACES_SPAN_NAME_REMAPPINGS`

{{% /tab %}}
{{< /tabs >}}

## Enabling the new logic (opt-in)

If you are using a version of the Datadog Agent or OpenTelemetry Collector prior to the versions listed in [Rollout Schedule](#default-rollout-schedule), you can enable the new logic using the following methods. Datadog strongly recommends enabling this logic and adapting your monitors and dashboards.

{{< tabs >}}
{{% tab "OpenTelemetry Collector" %}}

Launch the OpenTelemetry Collector with the feature gate (requires Collector v0.98.0+):

```shell
otelcol --config=config.yaml --feature-gates=datadog.EnableOperationAndResourceNameV2
```

{{% /tab %}}
{{% tab "Datadog Agent" %}}

Enable the feature for OTLP ingest using one of these methods:

- Add the feature flag to your Agent configuration (`datadog.yaml`):

   ```yaml
   # datadog.yaml
   apm_config:
     features: ["enable_operation_and_resource_name_logic_v2"]
   ```
- Set the environment variable for the Agent process:

   ```shell
   export DD_APM_FEATURES="enable_operation_and_resource_name_logic_v2"
   ```
   **Note:** If appending to existing features, use a comma-separated list, for example: `export DD_APM_FEATURES="existing_feature:true,enable_operation_and_resource_name_logic_v2"`

{{% /tab %}}
{{< /tabs >}}

## Disabling the new logic (opt-out)

If you are using a version where this logic is enabled by default (see [Rollout Schedule](#default-rollout-schedule)), or if you have manually opted-in, you can disable it and retain the old operation name behavior using the following methods:

{{< tabs >}}
{{% tab "OpenTelemetry Collector" %}}

Launch the OpenTelemetry Collector with the feature gate explicitly disabled using a minus sign (`-`):

```shell
otelcol --config=config.yaml --feature-gates=-datadog.EnableOperationAndResourceNameV2
```

{{% /tab %}}
{{% tab "Datadog Agent" %}}

Disable the feature for OTLP ingest using one of these methods:

- Add the disable flag to your Agent configuration (`datadog.yaml`):

   ```yaml
   # datadog.yaml
   apm_config:
     features: ["disable_operation_and_resource_name_logic_v2"]
   ```

- Set the environment variable for the Agent process:

   ```shell
   export DD_APM_FEATURES="disable_operation_and_resource_name_logic_v2"
   ```

   **Note**: If you already have features configured with this variable, use a comma-separated list, ensuring you disable the correct flag:

   ```shell
   export DD_APM_FEATURES="existing_feature:true,disable_operation_and_resource_name_logic_v2"
   ```

{{% /tab %}}
{{% tab "DDOT Collector" %}}

Since DDOT enables this logic by default, you may need to disable it:

### Helm

Pass the feature gate flag to the embedded DDOT Collector using Helm values:

```shell
helm upgrade -i <RELEASE_NAME> datadog/datadog \
  -f datadog-values.yaml \
  --set datadog.otelCollector.featureGates="-datadog.EnableOperationAndResourceNameV2"
```

### Datadog Operator

If you are using Datadog Operator, use the `DD_APM_FEATURES` environment variable override in `datadog-agent.yaml`:

```yaml
# datadog-agent.yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent: # Or clusterAgent depending on where DDOT runs
      env:
        - name: DD_APM_FEATURES
          value: "disable_operation_and_resource_name_logic_v2" # Add comma-separated existing features if needed
```

{{% /tab %}}
{{< /tabs >}}

## Adapting monitors, dashboards, and custom configuration

After the new naming logic is active, take the following steps:

1.  **(Required) Update monitors and dashboards:**
    - Review the [New mapping logic](#new-mapping-logic) table to predict how your operation names will change.
    - Update any monitors or dashboards that query, filter, or group by `operation_name` to use the new expected names.
    - Update any metric monitors or dashboards observing metrics derived from traces that might change due to the new operation names (for example, metrics starting with `trace.*` tagged by operation name).
2.  **(Optional) Replicate previous customizations:**
    If you previously used the removed configurations in [Prerequisites](#prerequisites) (`span_name_as_resource_name` or `span_name_remappings`) and need equivalent functionality, you must now use different methods:

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

To `replicate span_name_as_resource_name` or `span_name_remappings`, set the `operation.name` span attribute directly within your instrumented application code before the span is exported. This gives you the most control if you need specific overrides. Consult the OpenTelemetry SDK documentation for your language on how to modify span attributes.

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/configuring-primary-operation/#primary-operations