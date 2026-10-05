---
title: Install Serverless Monitoring for Azure Logic Apps
description: Set up tracing and log forwarding for Azure Logic Apps using the Datadog Azure Automated Log Forwarding service and optional APM retention filters, or instrument Standard workflows with OpenTelemetry.
further_reading:
    - link: '/integrations/azure/'
      tag: 'Documentation'
      text: 'Azure Integration'
    - link: '/logs/guide/azure-automated-log-forwarding/'
      tag: 'Documentation'
      text: 'Azure Automated Log Forwarding'
    - link: '/opentelemetry/setup/otlp_ingest/serverless/'
      tag: 'Documentation'
      text: 'OTLP Intake for Serverless'
---

{{< callout url="https://www.datadoghq.com/product-preview/serverless-monitoring-for-azure-logic-apps/"
 btn_hidden="false" header="Join the Preview!">}}
Serverless Monitoring for Azure Logic Apps is in Preview. Complete the form to request access.
{{< /callout >}}

Azure Logic Apps is a fully managed service, and the Datadog Agent cannot be directly installed on Logic Apps. However, Datadog can monitor Logic Apps through Azure diagnostic logs. For Logic Apps Standard workflows, you can also [instrument with OpenTelemetry](#instrumented-with-opentelemetry).

## Prerequisites

- The [Azure Automated Log Forwarding][1] service must be installed

## Setup

### 1. Install Datadog Azure Automated Log Forwarding

Follow the instructions in the [Azure Automated Log Forwarding guide][1] to install the service and setup tags for filtering the intended resource logs. Once installed, all new Logic Apps will automatically have log forwarding configured to send diagnostic logs to Datadog.

**Note**: The Azure Automated Log Forwarding service creates a diagnostic setting named `datadog_log_forwarding_<ID>` on each Logic App. This setting captures workflow execution logs and forwards them to Datadog.

### 2. Configure tags (optional but recommended)

Add `service` and `env` tags to your Logic Apps to organize and filter your workflows in Datadog.

1. In the Azure Portal, open your Logic App
2. Navigate to the {{< ui >}}Tags{{< /ui >}} section
3. Add the following tags:
   - `env`: The environment name (for example, `dev`, `staging`, or `prod`)
   - `service`: The service name for your Logic App

{{< img src="serverless/logic_apps/tags_configuration.png" alt="Azure Logic App tags configuration showing env and service tags" style="width:100%;" >}}

The `env` tag is required to see traces in Datadog and defaults to `dev` if not set. The `service` tag defaults to the Logic App's workflow name if not set.

### 3. Invoke the workflow

After configuring log forwarding, invoke your Logic App workflow a couple of times to generate execution data.

### 4. Verify traces in Datadog

Use Live Search in Datadog APM to verify that traces are being received:

1. Navigate to [APM > Traces][4] in Datadog
2. Use the query `operation_name:azure.logicapps` to filter for Logic Apps traces
3. Live Search returns all spans without sampling, so you should see your executions after they complete

{{< img src="serverless/logic_apps/apm_live_search.png" alt="Datadog APM Live Search showing azure.logicapps traces" style="width:100%;" >}}

## Additional configuration

### Add a retention filter for APM spans (recommended)

To control which traces are retained beyond the default live search period, add a retention filter:

1. In Datadog, search for {{< ui >}}Retention Filters{{< /ui >}} (use Cmd+K and type "retention filters")
2. Click {{< ui >}}Add Retention Filter{{< /ui >}}
3. Set the filter query to `operation_name:azure.logicapps`
4. Add any additional filters for your service, such as `service:<SERVICE_NAME>` and `env:<ENV_NAME>`
5. Configure the retention rate based on your needs

{{< img src="serverless/logic_apps/retention_filter_search.png" alt="Search for Retention Filters in Datadog" style="width:80%;" >}}

{{< img src="serverless/logic_apps/retention_filter_configuration.png" alt="Configure retention filter with operation_name:azure.logicapps query" style="width:100%;" >}}

Adding service and env tags to your retention filter helps save costs by retaining traces only for important environments and services.

See [Trace Retention][5] for more information.

### Add a log index (recommended)

To enable searching and analyzing historic Logic Apps logs, create a dedicated log index:

1. In Datadog, search for {{< ui >}}Indexes{{< /ui >}} (use Cmd+K and type "index")
2. Navigate to {{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}Indexes{{< /ui >}}
3. Click {{< ui >}}New Index{{< /ui >}}
4. Set the filter to `@properties.resource.workflowId:*`
5. Configure the index name and retention settings

{{< img src="serverless/logic_apps/log_index_search.png" alt="Search for Log Indexes in Datadog" style="width:80%;" >}}

{{< img src="serverless/logic_apps/log_index_configuration.png" alt="Configure log index with workflowId filter" style="width:100%;" >}}

{{% serverless/log_to_trace_indexing_note %}}

See [Log Indexes][6] for more information.

## See your Logic App traces in Datadog

After invoking your Logic App:

1. In Datadog, go to [{{< ui >}}APM > Traces{{< /ui >}}][4].
2. Select {{< ui >}}Live Search{{< /ui >}} in the upper right corner.
3. Search for `operation_name:azure.logicapps` to find your traces.

If you cannot see your traces, see [Troubleshooting][7].

## Instrumented with OpenTelemetry

Logic Apps Standard workflows can export traces and logs with Azure's built-in OpenTelemetry support. The Logic App sends this telemetry directly to the [Datadog OTLP intake endpoint][8], without a Datadog Agent or OpenTelemetry Collector.

OpenTelemetry and diagnostic logs capture different data, so you can use them together. For a comparison, see [Compare OpenTelemetry and diagnostic log traces](#compare-opentelemetry-and-diagnostic-log-traces).

### Requirements

- A Logic Apps Standard resource that uses the Workflow Service Plan, App Service Environment v3, or Hybrid hosting option. Logic Apps Consumption is not supported.
- Workflows that start with an **HTTP**, **Service Bus**, or **Event Hubs** trigger. Workflows with other triggers do not emit OpenTelemetry traces.

Logic Apps does not export metrics over OpenTelemetry. For metrics, see [Azure Logic Apps metrics][9].

For more information, see Microsoft's [Set up OpenTelemetry for performance monitoring][10].

### 1. Enable OpenTelemetry in host.json

In the `host.json` file at the root of your Logic App project, set `telemetryMode` to `OpenTelemetry`:

```json
{
  "version": "2.0",
  "telemetryMode": "OpenTelemetry",
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle.Workflows",
    "version": "[1.*, 2.0.0)"
  }
}
```

Deploy the updated `host.json` with your workflows. To edit the file on a deployed Logic App instead, open {{< ui >}}Development Tools{{< /ui >}} > {{< ui >}}Advanced Tools{{< /ui >}} in the Azure Portal and edit `site/wwwroot/host.json` from the Kudu console.

### 2. Configure the OTLP exporter

Add the following app settings to your Logic App. Before you run the command, set the `DD_API_KEY` environment variable in your shell to your [Datadog API key][11].

```shell
az logicapp config appsettings set \
  --name <LOGIC_APP_NAME> \
  --resource-group <RESOURCE_GROUP> \
  --settings \
    "OTEL_SERVICE_NAME=<SERVICE_NAME>" \
    "OTEL_RESOURCE_ATTRIBUTES=deployment.environment.name=<ENV>,service.version=<VERSION>" \
    "OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf" \
    "OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp.{{< region-param key="dd_site" >}}" \
    "OTEL_EXPORTER_OTLP_HEADERS=dd-api-key=${DD_API_KEY}" \
    "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" >}}" \
    "OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
```

| App setting | Description |
|---|---|
| `OTEL_SERVICE_NAME` | The `service` name for your Logic App in Datadog. Without it, traces appear as `unknown_service`. |
| `OTEL_RESOURCE_ATTRIBUTES` | `deployment.environment.name` sets the `env` tag, and `service.version` sets the `version` tag. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` and `OTEL_EXPORTER_OTLP_HEADERS` | The base Datadog OTLP endpoint and API key header. Logs are sent to the [OTLP logs intake endpoint][12] under this base URL. |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` and `OTEL_EXPORTER_OTLP_TRACES_HEADERS` | The [OTLP traces intake endpoint][13] and its headers. `dd-otlp-source=serverless` identifies serverless traffic, and `compute_stats=true` enables [trace metrics][14]. |

Changing app settings restarts the Logic App.

### 3. Invoke the workflow and verify

1. Invoke your workflow a few times.
2. In Datadog, go to [{{< ui >}}APM > Traces{{< /ui >}}][15] and search for `service:<SERVICE_NAME>`.
3. Open a trace and select the {{< ui >}}Logs{{< /ui >}} tab on the Logic App span to see the workflow's logs for that request.

If the request that starts the workflow carries W3C trace context headers (`traceparent`), the Logic App span joins the caller's trace. HTTP actions in the workflow propagate trace context to the services they call, so a chain of instrumented services and workflows appears as a single distributed trace.

### Compare OpenTelemetry and diagnostic log traces

| | OpenTelemetry | Diagnostic logs |
|---|---|---|
| Spans per workflow run | One server span for the request that runs the workflow | One span for the workflow and one span for each action |
| Resource name | HTTP method, for example `POST` | Workflow or action name |
| Action names and durations | Not included | Included |
| Error details | HTTP status code only | Error message for each failed action |
| HTTP attributes | Method, status code, and user agent | Not included |
| Connection to other services | Joins the caller's trace and propagates context through HTTP actions | Standalone trace for each workflow run |
| Supported triggers | HTTP, Service Bus, and Event Hubs | All triggers |

Use OpenTelemetry to follow requests end to end across services, and diagnostic logs to see which action in a workflow failed and how long each action took.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/azure-automated-log-forwarding/
[3]: /integrations/azure/
[4]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[5]: /tracing/trace_pipeline/trace_retention/
[6]: /logs/log_configuration/indexes/
[7]: /serverless/logic_apps/troubleshooting
[8]: /opentelemetry/setup/otlp_ingest/serverless/
[9]: /serverless/logic_apps/metrics
[10]: https://learn.microsoft.com/azure/logic-apps/enable-enhanced-telemetry-standard-workflows#set-up-opentelemetry-for-performance-monitoring
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: /opentelemetry/setup/otlp_ingest/logs/
[13]: /opentelemetry/setup/otlp_ingest/traces/
[14]: /tracing/metrics/
[15]: https://app.datadoghq.com/apm/traces
