---
title: Correlate OpenTelemetry Traces and DBM
further_reading:
- link: "/opentelemetry/otel_tracing/"
  tag: "Documentation"
  text: "Send OpenTelemetry Traces to Datadog"
---

## Overview

Correlate backend traces to detailed database performance data in Datadog Database Monitoring (DBM). This allows you to link spans from your OpenTelemetry-instrumented application to related query metrics and execution plans to identify the exact queries that are slowing down your application.

## Requirements

Before you begin, ensure you have configured [unified service tagging][1]. This is required for all data correlation in Datadog.

## Setup

To correlate traces and metrics, you must:

1. **Instrument database spans**: Add specific OpenTelemetry attributes to your database spans to enable correlation with DBM.

2. **Configure trace ingestion path**: Enable the correct feature gate on your Collector or Agent to ensure database spans are properly processed for DBM.

### Step 1: Instrument your database spans

For DBM correlation to work, your database spans must include the following attributes.

| Attribute      | Description                                                                                         | Example                            |
|----------------|-----------------------------------------------------------------------------------------------------|------------------------------------|
| `db.system`    | **Required.** The database technology, such as `postgres`, `mysql`, or `sqlserver`.                 | `postgres`                         |
| `db.statement` | **Required.** The raw SQL query text. This is used for obfuscation and normalization.               | `SELECT * FROM users WHERE id = ?` |
| `db.name`      | The logical database or schema name being queried.                                                  | `user_accounts`                    |
| `span.type`    | **Required (Datadog-specific).** The type of span such as `sql`,`postgres`, `mysql`, or `sql.query` | `sql`                              |

#### Example

The method for adding these attributes depends on your setup. If you are using an OpenTelemetry auto-instrumentation library for your database client, see its documentation for configuration options. If you are manually creating spans with the OpenTelemetry SDK, you can set the attributes directly in your code. For more information, see the [OpenTelemetry documentation][4].

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
    featureGates: datadog.EnableOperationAndResourceNameV2
```

{{% /tab %}}
{{% tab "OTel Collector" %}}

When starting the Collector, enable the `datadog.EnableOperationAndResourceNameV2` feature gate. This is available in Collector v0.118.0 and later.

```sh
otelcontribcol --config=config.yaml \
--feature-gates=datadog.EnableOperationAndResourceNameV2
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
- **The SQL query may not be parsable**: The correlation relies on Datadog's ability to parse the SQL query from the `db.statement` attribute. If the query uses non-standard or highly complex syntax, parsing may fail. If you suspect this is the case, [contact Datadog support][5] for assistance.
- **The correct feature gates must be enabled** for your specific trace ingestion path as described in the setup steps.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
[2]: /opentelemetry/integrations/host_metrics
[3]: https://app.datadoghq.com/apm/traces
[4]: https://opentelemetry.io/docs/languages/
[5]: /help