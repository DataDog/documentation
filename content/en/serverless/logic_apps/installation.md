---
title: Install Serverless Monitoring for Azure Logic Apps
further_reading:
    - link: '/integrations/azure/'
      tag: 'Documentation'
      text: 'Azure Integration'
    - link: '/logs/guide/azure-automated-log-forwarding/'
      tag: 'Documentation'
      text: 'Azure Automated Log Forwarding'
---

## How it works
Azure Logic Apps is a fully managed service, and the Datadog Agent cannot be directly installed on Logic Apps. However, Datadog can monitor Logic Apps through Azure diagnostic logs.

Datadog collects Logic Apps logs through [Azure Automated Log Forwarding][1]. This service automatically configures diagnostic settings for new Logic Apps to forward logs to Datadog. Datadog uses these ingested logs to generate traces for your Logic App executions.

## Prerequisites
- The [Datadog Azure integration][3] must be configured
- The [Azure Automated Log Forwarding][1] service must be installed

## Setup

### 1. Install Datadog Azure Automated Log Forwarding

Follow the instructions in the [Azure Automated Log Forwarding guide][1] to install the service. Once installed, all new Logic Apps will automatically have log forwarding configured to send diagnostic logs to Datadog.

**Note**: The Azure Automated Log Forwarding service creates a diagnostic setting named `datadog_log_forwarding_` on each Logic App. This setting captures workflow execution logs and forwards them to Datadog.

### 2. Configure tags (optional but recommended)

Add `service` and `env` tags to your Logic Apps to organize and filter your workflows in Datadog.

1. In the Azure Portal, open your Logic App
2. Navigate to the **Tags** section
3. Add the following tags:
   - `env`: The environment name (for example, `dev`, `staging`, or `prod`)
   - `service`: The service name for your Logic App

{{< img src="serverless/logic_apps/tags_configuration.png" alt="Azure Logic App tags configuration showing env and service tags" style="width:100%;" >}}

The `env` tag is required to see traces in Datadog and defaults to `dev` if not set. The `service` tag defaults to the Logic App's name if not set.

### 3. Invoke the workflow

After configuring log forwarding, invoke your Logic App workflow a couple of times to generate execution data.

### 4. Verify traces in Datadog

Use Live Search in Datadog APM to verify that traces are being received:

1. Navigate to [APM > Traces][4] in Datadog
2. Use the query `operation_name:azure.logicapps` to filter for Logic Apps traces
3. Live Search returns all spans without sampling, so you should see your executions immediately after they complete

{{< img src="serverless/logic_apps/apm_live_search.png" alt="Datadog APM Live Search showing azure.logicapps traces" style="width:100%;" >}}

## Additional configuration

### Add a retention filter for APM spans (recommended)

To control which traces are retained beyond the default live search period, add a retention filter:

1. In Datadog, search for **Retention Filters** (use Cmd+K and type "retention filters")
2. Click **New Retention Filter**
3. Set the filter query to `operation_name:azure.logicapps`
4. Add any additional filters for your service, such as `service:<SERVICE_NAME>` and `env:<ENV_NAME>`
5. Configure the retention rate based on your needs

{{< img src="serverless/logic_apps/retention_filter_search.png" alt="Search for Retention Filters in Datadog" style="width:80%;" >}}

{{< img src="serverless/logic_apps/retention_filter_configuration.png" alt="Configure retention filter with operation_name:azure.logicapps query" style="width:100%;" >}}

Adding service and env tags to your retention filter helps save costs by retaining traces only for important environments and services.

See [Trace Retention][5] for more information.

### Add a log index (recommended)

To enable searching and analyzing historic Logic Apps logs, create a dedicated log index:

1. In Datadog, search for **Indexes** (use Cmd+K and type "index")
2. Navigate to **Logs > Configuration > Indexes**
3. Click **New Index**
4. Set the filter to `@properties.resource.workflowId:*`
5. Configure the index name and retention settings

{{< img src="serverless/logic_apps/log_index_search.png" alt="Search for Log Indexes in Datadog" style="width:80%;" >}}

{{< img src="serverless/logic_apps/log_index_configuration.png" alt="Configure log index with workflowId filter" style="width:100%;" >}}

See [Log Indexes][6] for more information.

**Note**: Indexing logs may incur additional costs. Consider your retention requirements and budget when configuring indexes.

## See your Logic App metrics, logs, and traces in Datadog

After invoking your Logic App, go to the [**Serverless app**][2] in Datadog. Search for `service:<YOUR_LOGIC_APP_NAME>` to see the relevant logs and traces associated with that Logic App. If you set the `service` tag on your Logic App to a custom value, search for `service:<CUSTOM_VALUE>`.

If you cannot see your traces, see [Troubleshooting][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/azure-automated-log-forwarding/
[2]: https://app.datadoghq.com/functions
[3]: /integrations/azure/
[4]: https://app.datadoghq.com/apm/traces?query=operation_name%3Aazure.logicapps
[5]: /tracing/trace_pipeline/trace_retention/
[6]: /logs/log_configuration/indexes/
[7]: /serverless/logic_apps/troubleshooting
