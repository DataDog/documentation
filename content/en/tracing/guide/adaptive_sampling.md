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
- link: "/tracing/guide/resource_based_sampling/"
  tag: "Documentation"
  text: "Resource-based sampling"
---

{{< callout url="<https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/>" d_target="#signupModal" btn_hidden="false" header="Request access to the Preview!" >}}
Adaptive sampling is in Preview. To request access, complete the form.
{{< /callout >}}

## Overview

Datadog Adaptive Sampling helps you capture more relevant traces while remaining close to a specific budget (ingested gigabytes). This feature allows you to set a target monthly volume for trace ingestion and enroll one or more services to adaptive sampling. This ensures that the consumption of these services matches the target volume at the end of the month, while keeping visibility over all services and endpoints.

Adaptive Sampling uses granular configuration of existing [sampling rules][7] to adjust rates based on resource, service, and environment. Using [remote configuration][3], Datadog dynamically manages these rates to match your specified monthly budget and ensure visibility for low-traffic services and endpoints.

To enroll new services to adaptive sampling and manage ingested volumes from the [Datadog Ingestion Control page][1], follow the instructions listed below.

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
| PHP         |  Not available           |

## View sampling rates by resource

To see configured sampling rates:

1. Navigate to the Ingestion Controls [Service Ingestion Summary][1].
2. View the table listing the applied sampling rates by resource of the service.

{{< img src="/tracing/guide/resource_based_sampling/resource_sampling_rates.png" alt="Sampling rates table by resource" style="width:100%;">}}

The table includes:

- `INGESTED BYTES`: Ingested bytes from spans of the service and resource.
- `DOWNSTREAM BYTES`: Ingested bytes from spans where the sampling decision starts from that service and resource, including downstream services.
- `CONFIGURATION`: Source of the resource sampling rate:
  - `AUTOMATIC`: [Default head-based sampling mechanism][8] from the Agent.
  - `LOCAL` `CONFIGURED`: [Sampling rule][7] set locally in the tracing library.
  - `REMOTE` `CONFIGURED`: Remote sampling rule set from the Datadog UI.
  - `ADAPTIVE`: Sampling rules set remotely by Datadog, adaptively adjusting to your services' traffic conditions.

## Configure adaptive sampling for the service

To configure adaptive sampling for the service:

1. Navigate to the [Datadog Ingestion Control page][16].
1. Configure a **Monthly Ingestion Target** for adaptive sampling. This target bytes applies only to the services using adaptive sampling. Other services are not affected.
1. Navigate to the [Service Ingestion Summary page][1] for your service.
1. Click **Manage Ingestion Rate**. If the remote configuration option is disabled, make sure that the listed [requirements](#compatibility-requirements) are all met.
1. Set your service's sampling strategy to **Datadog Adaptive Sampling Rates** and click **Apply** to save the configuration.
1. (Optional) Set **Sampling Rates for some Resources** in addition to  **Datadog Adaptive Sampling Rates** for additional control of your ingestion.

The configuration should take effect in less than 5 minutes. You can observe the configuration changes from the [Live Search Explorer][9].

From the **Datadog Ingestion Control page** services that use adaptive sampling should show as `ADAPTIVE` `REMOTE` in the **Configuration** column.

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
