---
title: Adaptive sampling

disable_toc: false
private: true
further_reading:
- link: "/tracing/trace_pipeline/ingestion_mechanisms"
  tag: "Documentation"
  text: "Ingestion Mechanisms"
- link: "/tracing/trace_pipeline/ingestion_controls"
  tag: "Documentation"
  text: "Ingestion Control Page"
---

{{< callout url="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/" header="Request access to the Preview!" >}}
Adaptive sampling is in Preview. To request access, complete the form.
{{< /callout >}}

## Overview

Datadog **Adaptive Sampling** helps you capture more relevant traces while remaining close to a specific budget (ingested gigabytes). To get started:
1. Set a target monthly volume for trace ingestion
2. Enroll one or more services to adaptive sampling. 
This ensures that the consumption of these services matches the target volume at the end of the month, while keeping visibility over its endpoints.

Adaptive Sampling relies on [remote configuration][3] and on the existing [sampling rules][7] mechanisms to dynamically adjust sampling rates for each environment, service and resource combination, in order to:
- match your specified monthly budget
- ensure **visibility for low-traffic services and endpoints** by capturing at least one trace for each combination of service, resource and environment every 5 minutes.

To enroll new services to adaptive sampling and manage ingested volumes from the [Datadog Ingestion control page][1], follow the instructions listed below.

## Requirements

- Datadog Agent [7.53.0][2] or higher.
- [Remote Configuration][3]  enabled for your Agent.
- `APM Remote Configuration Write` [permissions][4]. If you don’t have these permissions, ask your Datadog admin to update your permissions from your organization settings.

### Tracing library versions

The following table lists minimum tracing library versions required for Adaptive Sampling:

| Language    | Minimum version required |
|-------------|--------------------------|
| Java        | [v1.34.0][5]             |
| Go          | [v1.68.0][6]             |
| Python      | [v2.9.6][10]             |
| Ruby        | [v2.0.0][11]             |
| Node.js     | [v5.16.0][12]            |
| .NET        | [v2.54.0][13]            |
| C++/Proxies | [v0.2.2][14]             |
| PHP         | [v1.4.0][17]             |

## View sampling rates by resource

To see configured sampling rates:

1. Navigate to the Ingestion Controls [Service Ingestion Summary][1].
2. View the table listing the applied sampling rates by resource of the service.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Sampling rates table by resource" style="width:100%;">}}

The table includes:
- `Ingested bytes`: Ingested bytes from spans of the service and resource.
- `Downstream bytes`: Ingested bytes from spans where the sampling decision starts from that service and resource, including downstream services.
- `Configuration`: Source of the resource sampling rate:
  - `AUTOMATIC`: [Default head-based sampling mechanism][8] from the Agent.
  - `LOCAL CONFIGURED`: [Sampling rule][7] set locally in the tracing library.
  - `REMOTE CONFIGURED`: Remote sampling rule set from the Datadog UI.
  - `ADAPTIVE REMOTE`: Adaptive sampling rules set by Datadog.

## Configure adaptive sampling for a service

To configure adaptive sampling for the service:
1. Navigate to the [Datadog Ingestion Control page][16].
  {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_budget_cta.png" alt="Call to action to set adaptive sampling budget" style="width:100%;">}}

2. Open the modal to set/edit the **Monthly Ingestion Target** for adaptive sampling. Make sure that the ingestion volume target is `>0` when enrolling a first service to adaptive sampling. For subsequent services, you can increase the allocated budget after the new service is onboarded to account for the new volume. 

**Note**: the configured budget is only allocated to services enrolled to adaptive sampling. It does not account for the additional volume from services that use local sampling rules or other [sampling mechanisms][8] configured locally in the Agent or the tracing library.

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_budget_modal.png" alt="Adaptive sampling budget modal" style="width:70%;">}}

3. Navigate to the [Service Ingestion Summary page][1] for your service.
4. Click **Manage Ingestion Rate**. If the remote configuration option is disabled, make sure that the listed [requirements](#compatibility-requirements) are all met.
5. Set your service's sampling strategy to **Datadog Adaptive Sampling Rates** and click **Apply** to save the configuration.
6. _[Optional]_ Configure explicit [sampling rates][15] for specific resources, for which you would like to capture more (e.g. 100% of `GET /checkout` endpoints) or less (e.g. 0.1% of `/health` requests) data.

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_setting_modal.png" alt="Adaptive sampling setting modal" style="width:70%;">}}

The configuration should take effect in 5-6 minutes, the time it takes for Datadog to observe the service's traffic pattern, compute, then apply the sampling rates. Resources controlled by adaptive sampling will appear marked as `Adaptive Remote` in the **Configuration** column.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.53.0
[3]: /agent/remote_config
[4]: /account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.68.0
[7]: /tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.6
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.54.0
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: /tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rates-by-resource
[16]: /tracing/trace_pipeline/ingestion_controls
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0
