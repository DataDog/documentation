---
title: Adaptive Sampling
description: Automatically adjust sampling rates to match specific budgets while maintaining visibility over service endpoints.
disable_toc: false
aliases:
    - /tracing/guide/adaptive_sampling
further_reading:
    - link: "/tracing/trace_pipeline/ingestion_mechanisms"
      tag: "Documentation"
      text: "Ingestion Mechanisms"
    - link: "/tracing/trace_pipeline/ingestion_controls"
      tag: "Documentation"
      text: "Ingestion Controls"
---

## Overview

Datadog **adaptive sampling** helps you capture more relevant traces while remaining close to a specific budget (ingested gigabytes).

When you choose adaptive sampling as your sampling strategy, you select a target monthly volume for trace ingestion for one or more services. This ensures that the consumption of these services matches the target volume at the end of the month, while keeping visibility over their endpoints.

Adaptive sampling uses [remote configuration][3] plus the existing [sampling rules][7] mechanisms to dynamically adjust sampling rates for each environment, service, and resource combination. This helps you to:
- Match your specified monthly budget.
- Ensure visibility for low-traffic services and endpoints by capturing at least one trace for each combination of service, resource, and environment every 5 minutes.

To configure services to use adaptive sampling, follow the instructions listed below.

## Requirements

- Datadog Agent [7.53.0][2] or higher.
- [Remote Configuration][3]  enabled for your Agent.
- `APM Remote Configuration Write` [permission][4].  
   **Note**: If you don't have this permission, ask your Datadog admin to update your permissions from your organization settings.

### Tracing library versions

The following table lists minimum tracing library versions required for adaptive sampling:

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

## Configure the adaptive sampling target

To get started with adaptive sampling, you first need to pick a target strategy setting:

- **Set Budget by Number of APM Hosts**: Configure a budget that is proportional to your allotment and the number of services onboarded (for example, based on the number of APM hosts)
- **Set Budget by Data Volume**: Configure a fixed target in gigabytes per month


|          | Budget by Number of APM Hosts                                                                                                              | Budget by Data Volume                                                                 |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **Pros** | Scales with the number of APM hosts and the number of services onboarded; you only have to set it once                                                 | Ensures you never go over budget                                                      |
| **Cons** | Not a good fit if you want to stay below a specific volume, as it may vary depending on the number of hosts reporting APM data to Datadog | You have to edit the budget every time you onboard a new service to adaptive sampling |

To set the adaptive sampling monthly target:
1. Navigate to the [Ingestion Control][18] page.
2. Click **Manage Adaptive Sampling Target**.
  {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_target_cta.png" alt="Call to action to set adaptive sampling target" style="width:100%;">}}
3. Choose a target strategy for sampling:
   - [Set budget by number of APM hosts](#set-budget-by-number-of-apm-hosts-recommended)
   - [Set budget by data volume](#set-budget-by-data-volume)
4. Click **Apply**.

### Set budget by number of APM hosts (Recommended)

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_setting.png" alt="Percentage based target setting" style="width:100%;">}}

Set your monthly target to a percentage of your allotment. At the bottom of the page, you are provided with a more complete explanation of how that percentage is converted in a monthly target volume. It is the product of: 

- The **global allotment**: `150GB * number_of_APM_hosts + 50GB * number_of_traced_serverless_invocations (if applicable) + 10GB * number_of_fargate_tasks (if applicable)`
- The **percentage of allotment** configured above
- The **contribution of onboarded services** to the allotment. For example, if the services onboarded to adaptive sampling contribute to 10% of the total ingested volume, Datadog targets 10% of the global allotment. This number increases with the number of services onboarded.

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_computation.png" alt="Percentage based target computation" style="width:100%;">}}

That monthly target volume is recomputed every 30 minutes.

### Set budget by data volume

{{< img src="/tracing/guide/adaptive_sampling/volume_based_target_setting.png" alt="Volume based target setting" style="width:100%;">}}

If you are configuring the first service to adaptive sampling, ensure that the ingestion volume target is `>0`. For subsequent services, you should increase the allocated budget after the new service is onboarded to account for the new volume.  
  <div class="alert alert-info">The configured budget is only allocated to services enrolled in adaptive sampling. It does not include ingested volume from services not enrolled in adaptive sampling, local sampling rules, or other <a href="/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent">sampling mechanisms</a> configured locally in the Agent or tracing libraries.</div>

## Configure adaptive sampling for a service

### View sampling rates by resource for a service

Before you configure adaptive sampling for a service, you can view the current ingestion configuration for the service.

To see configured sampling rates:

1. Navigate to the [Ingestion Control][18] page.
2. Click a service to view the **Service Ingestion Summary**.
3. View the table listing the applied sampling rates by resource of the service.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Sampling rates table by resource" style="width:100%;">}}

The table includes:
- **Ingested bytes**: Ingested bytes from spans of the service and resource.
- **Downstream bytes**: Ingested bytes from spans where the sampling decision starts from that service and resource, including downstream services.
- **Configuration**: Source of the resource sampling rate:
  - `AUTOMATIC`: [Default head-based sampling mechanism][8] from the Agent.
  - `CONFIGURED LOCAL`: [Sampling rule][7] set locally in the tracing library.
  - `CONFIGURED REMOTE`: Remote sampling rule set from the Datadog UI.
  - `ADAPTIVE REMOTE`: Adaptive sampling rules set by Datadog.

Once a service is onboarded to adaptive sampling, the sampling rates are adjusted and recomputed every 10 minutes.

### Onboard a service to adaptive sampling

To onboard a service to adaptive sampling:

1. Navigate to the [Ingestion Control][18] page.
2. Click a service to view the **Service Ingestion Summary**.
3. Click **Manage Ingestion Rate**.
4. Choose **Datadog adaptive sampling rates** as your service's sampling strategy.
5. (Optional) Configure explicit [sampling rates][15] for specific resources, for which you would like to capture more (for example, 100% of `GET /checkout` endpoints) or less (for example, 0.1% of `/health` requests) data.
6. Click **Apply**.

<div class="alert alert-info">If applying this configuration <strong>Remotely</strong> is disabled, ensure the <a href="#requirements">Remote Configuration requirements</a> are met.</div>

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_setting_modal.png" alt="Adaptive sampling setting modal" style="width:70%;">}}

The configuration should take effect in 5-6 minutes, the time it takes for Datadog to observe the service's traffic pattern, compute, then apply the sampling rates. Resources that have been configured remotely display as `Configured Remote` in the **Configuration** column.

## Permissions

By default, only users with the `Datadog Admin` role can modify adaptive sampling configurations or onboard services to adaptive sampling.

If your organization uses custom roles, assign your user to a custom role that includes `APM Remote Configuration Write` and `APM Service Ingest Write` [permissions.][4]

### Restrict access
Use [granular access controls][19] to manage who can modify a service's adaptive sampling configuration. You can restrict access based on roles, teams, or individual users.

{{< img src="/tracing/guide/adaptive_sampling/add_restriction.png" alt="Restrict permission modal" style="width:60%;">}}

To restrict access:

{{< img src="/tracing/guide/adaptive_sampling/restrict_service_ingestion_permissions.png" alt="Open granular access control modal" style="width:100%;">}}

**Note**: Only users with the `remote_config_write` permission can restrict access to the adaptive sampling configuration of individual services.

1. Open the **Permissions** section in the Ingestion Control side panel of the service.

2. Click **Restrict access**.

3. Select the teams, roles, or users to grant access to.

4. Click **Add**.

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
[18]: https://app.datadoghq.com/apm/traces/ingestion-control
[19]: /account_management/rbac/granular_access/
