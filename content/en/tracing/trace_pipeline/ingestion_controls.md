---
title: Ingestion Controls
aliases:
    - /tracing/trace_ingestion/control_page
    - /tracing/trace_ingestion/ingestion_control_page
    - /account_management/billing/usage_control_apm/
    - /tracing/app_analytics/
    - /tracing/guide/ingestion_control_page/
    - /tracing/trace_ingestion/ingestion_controls
description: "Learn how to control Ingestion rates with APM."
further_reading:
- link: "/tracing/trace_pipeline/ingestion_mechanisms/"
  tag: "Documentation"
  text: "Ingestion Mechanisms"
- link: "/tracing/trace_pipeline/metrics/"
  tag: "Documentation"
  text: "Usage Metrics"
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Ingestion Sampling Rules" >}}

Ingestion controls affect what traces are sent by your applications to Datadog. [APM Metrics][1] are always calculated based on all traces, and are not impacted by ingestion controls.

The Ingestion Control page provides visibility into the ingestion configuration of your applications and services. From the [ingestion control page][2]:

- Gain visibility on your service-level ingestion configuration.
- Adjust trace sampling rates for high throughput services or endpoints to better manage ingestion budget.
- Adjust trace sampling rates for low throughput, rare traffic services or endpoints to increase visibility.
- Understand which [ingestion mechanisms][11] are responsible for sampling most of your traces.
- Investigate and act on potential ingestion configuration issues, such as limited CPU or RAM resources for the Agent.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Ingestion Control Page Overview" >}}

## Understanding your ingestion configuration

Use the data in the ingestion control header to monitor your trace ingestion. The header displays the total amount of data ingested over the past hour, your estimated monthly usage, and the percentage of your allocated monthly ingestion limit, calculated based on your active APM infrastructure (such as hosts, Fargate tasks, and serverless functions).

If the monthly usage is under `100%`, the projected ingested data fits within your [monthly allotment][3]. A monthly usage value over `100%` means that the monthly ingested data is projected to be over your monthly allotment.

### Ingestion levels by service

The service table contains information about the ingested volumes and ingestion configuration, broken down by service:

Type
: The service type: web service, database, cache, browser, etc...

Name
: The name of each service sending traces to Datadog. The table contains root and non-root services for which data was ingested in the past one hour.

Ingested Traces/s
: Average number of traces per second ingested starting from the service over the past one hour.

Ingested Bytes/s
: Average number of bytes per second ingested for the service over the past one hour.

Downstream Bytes/s
: Average number of bytes per second ingested for which the service _makes the sampling decision_. This includes the bytes of all downstream services' spans in the call stack that follow the decision made at the head of the trace. This column's data is based on the `sampling_service` dimension, set on the `datadog.estimated_usage.apm.ingested_bytes` metrics. For more information, read [APM usage metrics][15].

Traffic Breakdown
: A detailed breakdown of traffic sampled and unsampled for traces starting from the service. See [Traffic breakdown](#traffic-breakdown) for more information.

Ingestion Configuration
: Shows `Automatic` if the [default head-based sampling mechanism][4] from the Agent applies. If the ingestion was configured with [trace sampling rules][8], the service is marked as `Configured`; a `Local` label is set when the sampling rule is applied from configuration in the tracing library, a `Remote` label is set when the sampling rule is applied remotely, from the UI. For more information about configuring ingestion for a service, read about [changing the default ingestion rate](#configure-the-service-ingestion-rate).

Infrastructure
: Hosts, containers, and functions on which the service is running.

Service status
: Shows `Limited Resource` when some spans are dropped due to the Datadog Agent reaching CPU or RAM limits set [in its configuration][9], `Legacy Setup` when some spans are ingested through the legacy [App Analytics mechanism][7], or `OK` otherwise.

Filter the page by environment, configuration, and status to view services for which you need to take an action. To reduce the global ingestion volume, sort the table by the `Downstream Bytes/s` column to view services responsible for the largest share of your ingestion.

**Note**: The table is powered by the [usage metrics][10] `datadog.estimated_usage.apm.ingested_spans` and `datadog.estimated_usage.apm.ingested_bytes`. These metrics are tagged by `service`, `env` and `ingestion_reason`.

#### Traffic breakdown

The Traffic Breakdown column breaks down the destination of all traces starting from the service. It gives you an estimate of the share of traffic that is ingested and dropped, and for which reasons.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Traffic breakdown of trace ingestion" >}}

The breakdown is composed of the following parts:

- **Complete traces ingested** (blue): The percentage of traces that have been ingested by Datadog.
- **Complete traces not retained** (gray): The percentage of traces that have not been ingested by Datadog. Some traces might be dropped because: 

    1. By default, the [Agent automatically sets a sampling rate][4] on services, depending on service traffic.
    2. The service is configured to ingest a certain percentage of traces using [sampling rules][8].

- **Complete traces dropped by the tracer rate limiter** (orange): When you choose to manually set the service ingestion rate as a percentage with trace sampling rules, a rate limiter is automatically enabled, set to 100 traces per second by default. See the [rate limiter][8] documentation to change this rate.

- **Traces dropped due to the Agent CPU or RAM limit** (red): This mechanism may drop spans and create incomplete traces. To fix this, increase the CPU and memory allocation for the infrastructure that the Agent runs on.

## Configuring ingestion for a service

Click on any service to view the Service Ingestion Summary, which provides actionable insights and configuration options for managing that service's trace ingestion.

### Ingestion configuration for a service

#### Sampling rates by resource

The table lists the applied sampling rates by resource of the service.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Sampling rates table by resource" style="width:100%;">}}

- The `Ingested bytes` column surfaces the ingested bytes from spans of the service and resource, while the `Downstream bytes` column surfaces the ingested bytes from spans where the sampling decision is made starting from that service and resource, including bytes from downstream services in the call chain.
- The `Configuration` column surfaces where the resource sampling rate is being applied from: 
  - `Automatic` if the [default head-based sampling mechanism][8] from the Agent applies.
  - `Local Configured` if a [sampling rule][7] was set locally in the tracing library.
  - `Remote Configured` if a remote sampling rule was set from the Datadog UI. To learn how to configure sampling rules from the Ingestion Control page, read the section on [remotely configuring sampling rules](#configure-the-service-ingestion-rates-by-resource).

**Note**: If the service is not making sampling decisions, the service's resources will be collapsed under the `Resources not making sampling decisions` row.

#### Ingestion Reasons and sampling decision makers

Explore the **Ingestion reasons breakdown** to see which mechanisms are responsible for your service ingestion. Each ingestion reason relates to one specific [ingestion mechanism][11]. After changing your service ingestion configuration, you can observe the increase or decrease of ingested bytes and spans in this timeseries graph based on the past hour of ingested data.

If most of your service ingestion volume is due to decisions taken by upstream services, investigate the detail of the **Sampling decision makers** top list. For example, if your service is non-root, (meaning that it **never decides** to sample traces), observe all upstream services responsible for your non-root service ingestion. Configure upstream root services to reduce your overall ingestion volume.

For further investigations, use the [APM Trace - Estimated Usage Dashboard][12], which provides global ingestion information as well as breakdown graphs by `service`, `env` and `ingestion reason`.

#### Agent and tracing library versions

See the **Datadog Agent and tracing library versions** your service is using. Compare the versions in use to the latest released versions to make sure you are running recent and up-to-date Agents and libraries.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Agent and tracing library versions" >}}

**Note**: You need to upgrade the Agent to v6.34 or v7.34 for the version information to be reported.

### Configure the service ingestion rates by resource

{{< callout url="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/" btn_hidden="false" header="Adaptive sampling is in Preview!" >}}
<b>Adaptive sampling rates</b> let Datadog control sampling rates on your behalf to match a configured monthly ingested volume budget. Follow the instructions in the <a href="/tracing/guide/adaptive_sampling">Adaptive sampling guide</a> to get started. To request access to the feature, complete the following form.
{{< /callout >}}

To configure sampling rates for the service by resource name: 
1. Click **Manage Ingestion rate**.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_modal.png" alt="Configuration Modal" style="width:100%;">}}
2. Click **Add new rule** to set sampling rates for some resources. Sampling rules use glob pattern matching, so you can use wildcards (`*`) to match against multiple resources at the same time.

#### if the Remote configuration option is available

3. Click **Apply** to save the configuration. 

The configuration should take effect in less than a minute. You **do not need** to redeploy the service for the change to take effect. You can observe the configuration changes from the [Live Search Explorer][9].

From the **Service Ingestion Summary**, resources for which the sampling rate are remotely applied should show as `Remote Configured` in the **Configuration** column.

#### if the Remote configuration option is disabled

If the remote configuration option is disabled, make sure that the listed [requirements](#remote-configuration-requirements) are all met to be able to use remote configuration.

3. Apply the appropriate configuration generated from these choices to the indicated service and redeploy the service. 
**Note**: The service name value is case sensitive. It should match the case of your service name.

4. Confirm on the Ingestion Control Page that your new percentage has been applied by looking at the Traffic Breakdown column, which surfaces the sampling rate applied. The resources for which the sampling rate was applied should show as `Local Configured`.

#### Remote configuration requirements

- Datadog Agent [7.41.1][2] or higher.
- [Remote Configuration][3]  enabled for your Agent.
- `APM Remote Configuration Write` [permissions][4]. If you don’t have these permissions, ask your Datadog admin to update your permissions from your organization settings.

Find below the minimum tracing library version required for the feature:

Language  | Minimum version required
----------|--------------------------
Java      | [v1.34.0][5]
Go        | [v1.64.0][6]
Python    | [v.2.9.0][10]
Ruby      | [v2.0.0][11]
Node.js   | [v5.16.0][12]
PHP       | [v1.4.0][15]
.NET      | [v.2.53.2][13]
C++       | [v0.2.2][14]

## Managing Datadog Agent ingestion configuration

Click **Configure Datadog Agent Ingestion** to manage default head-based sampling rates, error sampling and rare sampling.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Agent Level Configuration Modal" >}}

- **[Head-based Sampling][4]**: When no sampling rules are set for a service, the Datadog Agent automatically computes sampling rates to be applied for your services, targeting **10 traces per second per Agent**. Change this target number of traces in Datadog, or set `DD_APM_MAX_TPS` locally at the Agent level.
- **[Error Spans Sampling][5]**: For traces not caught by head-based sampling, the Datadog Agent catches local error traces **up to 10 traces per second per Agent**. Change this target number of traces in Datadog, or set `DD_APM_ERROR_TPS` locally at the Agent level.
- **[Rare Spans Sampling][6]**: For traces not caught by head-based sampling, the Datadog Agent catches local rare traces **up to 5 traces per second per Agent**. This setting is disabled by default. Enable the collection of rare traces in Datadog, or set `DD_APM_ENABLE_RARE_SAMPLER` locally at the Agent level.

With remote configuration, you don't have to restart the Agent to update these parameters. Click `Apply` to save the configuration changes, and the new configuration takes effect immediately. Remote configuration for Agent sampling parameters is available if you are using Agent version [7.42.0][13] or higher.

**Note**: The `Other Ingestion Reasons` (gray) section of the pie chart represents other ingestion reasons which _are not configurable_ at the Datadog Agent level. 

**Note**: Remotely configured parameters take precedence over local configurations such as environment variables and `datadog.yaml` configuration.

### Sampling precedence rules

If sampling rules are set in multiple locations, the following precedence rules apply in order, where rules that appear first on the list can override lower precedence rules:

1. Remotely configured sampling rules, set through [resource-based sampling](#configure-the-service-ingestion-rates-by-resource)
1. [Adaptive sampling rules][17]
1. [Locally configured sampling rules][8] (`DD_TRACE_SAMPLING_RULES`)
1. [Remotely configured global sampling rate][8]
1. [Locally configured global sampling rate][8] (`DD_TRACE_SAMPLE_RATE`)
1. [rates from the trace agent controlled indirectly with Agent settings](#managing-datadog-agent-ingestion-configuration) remotely or locally (`DD_APM_MAX_TPS`)

To phrase it another way, Datadog uses the following precedence rules:
- Tracer settings > Agent settings
- Sampling rules > Global sampling rate
- Remote > Local

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: /agent/remote_config/#enabling-remote-configuration
[4]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[5]: /tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[6]: /tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[7]: /tracing/trace_pipeline/ingestion_mechanisms/#single-spans-app-analytics
[8]: /tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[10]: /tracing/trace_pipeline/metrics
[11]: /tracing/trace_pipeline/ingestion_mechanisms/
[12]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[13]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[14]: /agent/remote_config/#enabling-remote-configuration
[15]: /tracing/trace_pipeline/metrics#what-is-the-sampling-service
[17]: /tracing/guide/adaptive_sampling/
[18]: /tracing/guide/trace_ingestion_volume_control/#globally-configure-the-ingestion-sampling-rate-at-the-agent-level
