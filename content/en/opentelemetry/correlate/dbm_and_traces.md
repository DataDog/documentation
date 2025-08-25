---
title: Correlate OpenTelemetry Traces and DBM
further_reading:
- link: "/opentelemetry/otel_tracing/"
  tag: "Documentation"
  text: "Send OpenTelemetry Traces to Datadog"
---

## Overview

Datadog Database Monitoring (DBM) correlates backend traces from your OpenTelemetry-instrumented application with detailed database performance data. This allows you to link spans from your application to related query metrics and execution plans, helping you identify the exact queries that are slowing down your services.

## Requirements

Before you begin, ensure you have configured [unified service tagging][1]. This is required for all data correlation in Datadog.

## Setup

To correlate traces and metrics, you must:

1. **Instrument database spans**: Add specific OpenTelemetry attributes to your database spans to enable correlation with DBM.

2. **Configure trace ingestion path**: Enable the correct feature gate on your Collector or Agent to ensure database spans are properly processed for DBM.

### Step 1: Instrument your database spans

For DBM correlation to work, your database spans must include the following attributes.


| Attribute      | Required? | Description                                                                                                       | Example                                 |
|----------------|-----------|:------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| `db.system`    | Yes       | The database technology.                                                                                          | `postgres`, `mysql`, `sqlserver`        |
| `db.statement` | Yes       | The raw SQL query text. Datadog uses this to set the span's resource name after obfuscation and normalization.    | `SELECT * FROM users WHERE id = ?`      |
| `span.type`    | Yes       | **(Datadog-specific)** The type of span. This is required for the backend to identify and process database spans. | `sql`, `postgres`, `mysql`, `sql.query` |
| `db.name`      | No        | The logical database or schema name being queried.                                                                | `user_accounts`                         |

<div class="alert alert-info">The <code>span.type</code> attribute is a Datadog-specific convention required for the backend to identify and process database spans. It is not part of the standard OpenTelemetry semantic conventions.</div>

#### Auto instrumentation

If you are using an OpenTelemetry auto-instrumentation library, you can add required attributes without changing your application code. Most OpenTelemetry auto-instrumentation libraries already add `db.system` and `db.statement`. For DBM correlation, you typically only need to add the Datadog-specific `span.type` attribute. You can do this by using the OpenTelemetry Collector's `attributes` processor to enrich your spans.

For example, you can add `span.type: sql` to any span that has the `db.system` attribute:

```yaml
processors:
  attributes/add_span_type:
    actions:
      - key: span.type
        value: "sql"
        action: insert
        # Apply this action only to spans that have the db.system attribute
        from_context: span
        when:
          - span.attributes["db.system"] != nil

service:
  pipelines:
    traces:
      # Add the processor to your traces pipeline
      processors: [..., attributes/add_span_type, ...]
```

#### Manual instrumentation

If you are manually creating spans with the OpenTelemetry SDK, you can set the attributes directly in your code. For more information, see the [OpenTelemetry documentation][4].

The following is a conceptual example of manual instrumentation using Python's OpenTelemetry SDK:

```python
from opentelemetry import trace

tracer = trace.get_tracer("my-app.instrumentation")

# When making a database call, create a span and set attributes
with tracer.start_as_current_span("postgres.query") as span:
    # Set attributes required for DBM correlation
    span.set_attribute("span.type", "sql")
    span.set_attribute("db.system", "postgres")
    span.set_attribute("db.statement", "SELECT * FROM users WHERE id = ?")
    span.set_attribute("db.name", "user_accounts")

    # Your actual database call would go here
    # db_cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

### Step 2: Configure your ingest path

Depending on how you send traces to Datadog, you may need to enable specific feature gates to ensure database spans are processed correctly.

{{< tabs >}}
{{% tab "Datadog Agent (DDOT Collector)" %}}


If you are using the Datadog Helm chart (v3.107.0 or later), set the feature gate in your `values.yaml`:

```yaml
datadog:
  otelCollector:
    featureGates: "datadog.EnableReceiveResourceSpansV2,datadog.EnableOperationAndResourceNameV2"
```

{{% /tab %}}
{{% tab "OTel Collector" %}}

When starting the Collector, you must enable the correct feature gate for your version.

#### Collector v0.124.0 and later

For recent versions of the Collector, enable the `datadog.EnableOperationAndResourceNameV2` feature gate:

```sh
otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableOperationAndResourceNameV2
```
#### Collector v0.118.0 - v0.123.0

For older versions of the Collector, both of the following feature gates are required:

```sh
otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableReceiveResourceSpansV2,datadog.EnableOperationAndResourceNameV2
```

{{% /tab %}}

{{% tab "Datadog Agent (OTLP Ingest)" %}}

In your Datadog Agent configuration, ensure the `DD_APM_FEATURES` environment variable includes `enable_operation_and_resource_name_logic_v2`.

{{% /tab %}}

{{< /tabs >}}

### View correlated data in Datadog

After your application is sending traces, you can see the correlation in the APM Trace View:

1. Navigate to [**APM** > **Traces**][3].
2. Find and click on a trace from your instrumented service.
3. In the trace's flame graph, select a database span (for example, a span with `span.type: sql`)
4. In the details panel, click the **SQL Queries** tab. You should see performance metrics and execution plans for the query.

## Troubleshooting

If you don't see the expected correlation between your APM traces and DBM, it's typically due to a missing or incorrect configuration. Check the following common causes:

- **All required attributes (`db.system`, `db.statement`, `span.type`) must be present** on the database span.
- **Incorrect unified service tagging**: The `service` tag on your traces must match the `service` tag on your database host metrics. Verify that [unified service tagging][1] is configured correctly.
- **The SQL query may not be parsable**: The correlation relies on Datadog's ability to parse the SQL query from the `db.statement` attribute. If the query uses non-standard or complex syntax, parsing may fail. If you suspect this is the case, [contact Datadog support][5] for assistance.
- **The correct feature gates must be enabled** for your specific trace ingestion path as described in the setup steps.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
[2]: /opentelemetry/integrations/host_metrics
[3]: https://app.datadoghq.com/apm/traces
[4]: https://opentelemetry.io/docs/languages/
[5]: /help