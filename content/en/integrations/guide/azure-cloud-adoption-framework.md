---
title: Azure Cloud Adoption Framework with Datadog

further_reading:
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Datadog-Azure Integration"
  - link: "https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/"
    tag: "Blog"
    text: "Migrate to Azure with Microsoft Cloud Adoption Framework"
---

## Overview

Using Azure's Cloud Adoption Framework with Datadog can help you ensure safe, speedy migrations to a new cloud environment, whether from on-premises or other cloud enivornments.

You can:

1. Prepare your Datadog account for your teams to efficiently execute their workload migrations. This is the "planning" stage.
2. Use Datadog to measure the health of your original environments and new workloads as your teams launch them in your new landing zones. This is the "migrating" stage.

This guide documents the migration process for organizations that follow Azure's Cloud Adoption Framework.

If you don't have a Datadog account yet, you can [start a two-week trial][1].

## Planning

When planning your migration, prepare your Datadog account to monitor your new workloads as soon as they are migrated into your Azure account by doing the following:

1. Enable the [Datadog-Azure integration][2] so your new workloads can indicate their performance and health.
2. Document a tagging strategy that your teams can use to describe their workloads as they migrate.
3. Configure dashboards that stakeholders can use to follow along the migration progress and understand the overall health of the new workloads.
4. Establish communication channels for incident response.

### Enable Datadog-Azure Integrations

Datadog and Azure have partnered together to offer Datadog's services within your Azure account. For each one of your landing zones, you can create a Datadog resource to link your Datadog account with your Azure account and access your observability data in Azure.

For more information about this process to help you determine what Azure data you want to collect in Datadog, see the [Microsoft Azure documentation][2].

The Datadog resource streamlines the setup of a large list of Datadog-Azure integrations and significantly increases your teams' visibility on the health and performance of new Azure workloads. Datadog recommends enabling the [Azure DevOps integration][3] so your teams can correlate workload performance data with build and release events.

For more information about setting up this integration, see [Microsoft Azure DevOps][4].

Datadog offers many integrations to improve communication with your teams when something needs their attention, like Microsoft Teams or Slack.

Add all of the communication integrations your organization uses. For the full list of integrations and setup instructions, see [Integrations][5].

### Tags

Tagging is critical in the effective monitoring of your applications and environments. Before you begin migrating to your Azure landing zone, you should implement a tagging strategy.

While it may sound intimidating, this does not require a lot of time or complexity. Good tag candidates include any data that is useful in categorizing your infrastructure or services.

Add the following tags to your resources whenever applicable:

| Tag Name       | Description                                                                                                                                                                                                     |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `env`          | For `prod`, `staging`, and `dev`.                                                                                                                                                                               |
| `service`      | When in doubt, use the same value as `ApplicationName`.                                                                                                                                                         |
| `version`      | Identifies which version of an application is being used.                                                                                                                                                       |
| `team`         | Defines what team has built or manages the resource. Create a separate Microsoft Teams channel devoted to each team so they can receive communications about the health of their services. |
| `owner`        | Defines who specifically is responsible for a resource.                                                                                                                                                         |
| `workload`     | Clarifies what workload a resource relates to, and assists in legacy-to-cloud performance and KPI comparisons.                                                                                                  |
| `landing-zone` | Identifies what landing zone a resource exists in (if any) and assists in legacy-to-cloud performance and KPI comparisons.                                                                                     |

Azure's Cloud Adoption Framework offers a [pre-defined tagging strategy][6] which slightly overlaps with the list above. Review this document and implement the tags that apply to your organization, especially those that are listed in the **Minimum Suggested Tags** section.

### Dashboards

Datadog offers several out-of-the-box dashboards for customers using Azure-related services. For a list of available dashboards, see [Azure Integrations][7].

Once you have a tagging strategy that fits well for your organization, Datadog recommends [cloning out-of-the-box dashboards][8] and adding [dashboard template variables][9] from your list of standardized tags.

With dashboard template variables, Datadog dashboards provide visibility into wide summaries of data and specific subsets of data by tag. For example, if you add a template variable for the `workload` tag to a dashboard, you can use that dashboard as a summary of the performance of many workloads, and filter the entire dashboard into the performance of a specific workload.

This way, a single dashboard becomes useful for all your workloads without requiring you to manage separate dashboards for each workload.

### Communication channels for incident response

Many organizations choose to set up dedicated communication channels that reflect the ownership hierarchy of their services or workloads. Datadog recommends pairing the naming convention of these communication channels with your tagging strategy.

For example, if you have standardized using an `owner` tag, configure the investigative email groups or communication channels whose names are defined by that `owner` tag value. Configuring [dynamic handles][10] enables your teams to ensure that the right alert goes to the appropriate responder.

## Migrating

Once you have your Datadog account prepared, your teams can use Datadog to ensure a smooth migration from their original environments to the new landing zone workloads.

For each workload, this process involves the following:

1. Install and configure the Datadog Agent to ensure the comprehensive, consistent monitoring of legacy environments and new workloads.
2. Configure dashboards so you can observe the health of your legacy environments and new workloads side-by-side.
3. Configure monitors so investigative teams can respond to important changes in performance KPIs.
4. Add Synthetics tests to proactively monitor unexpected degradations in the user experience.
5. Configure SLOs to document the health of your KPIs for stakeholder visibility.

### Resolve observability gaps in your original environment

As a workload or service owner, the best way to gain comprehensive, consistent observability across your original environment and new azure workloads is to install the Datadog Agent.

The Datadog Agent is lightweight and designed to run across all your servers (on-premises or in a cloud provider) and collect the data you need to verify the health of your services and bring it all together in your Datadog account.

[This page][11] guides you through the Agent installation on individual servers as well as the installation with your configuration management tool of choice (preferred).

Once you have installed the Datadog Agent, add the following data collection methods to gain more complete visibility into the health of your environment:

  1. [Add integrations to collect data][12] specific to the technologies your services employ.
  2. [Enable Application Performance Monitoring (APM)][13] to measure the request counts, latency, and error rates of your services.
  3. [Capture the logs generated by your environment][14] to gain deeper context into when your metrics and traces behave unexpectedly. If you have a lot of logs, [store only the most critical logs][15].
  4. [Enable Network Performance Monitoring (NPM)][16] to ensure efficient communication between your services. NPM is crucial in the migration process because your original environment may need to communicate with your new cloud environment.

Before you migrate your new workload, install the Agent, configure complete data collection on your legacy environment, and design your new workloads to include the Datadog Agent with the same complete data collection.

Follow your organization's tagging standards to ensure that all performance data can be consistently understood and identified to their appropriate team, workload, and landing zone.

### Workload health and migration dashboards

Once the health data is flowing into your Datadog account, you can view and understand your environment from Datadog's visualization maps including the [host][17], [container][18], [service][19], and [network traffic][20] maps, and from any of the [out-of-the-box dashboards][21] that are specific to the technologies you've integrated.

You can clone and customize those dashboards or create custom dashboards to see the data you need for your specific use cases.

In some cases, it may make sense to visualize the performance of your legacy environment and new workloads side-by-side.

Follow these steps to create an example dashboard:

1. [Create a dashboard][22] in your Datadog account.
2. Click the **Settings** icon on the right hand corner.
3. Click **Import dashboard JSON**. For more information, see [Dashboard Settings][23].
4. Paste or upload the JSON definition for the dashboard found in [`azure_caf_side_by_side_dashboard.json`][24].

### Send actionable alerts to workload owners

As you migrate your workloads, ensure that the right people are automatically alerted when important performance KPI thresholds are crossed.

To do this, create monitors in Datadog that constantly observe the health of your workloads and trigger notifications to your communication channels over Microsoft Teams, Slack, paging services, and ticketing systems. For more information, see [Monitors][25].

If your tags map effectively to dedicated investigative channels (for example, if you have a Teams channel for every owner, team, or workspace), you can configure your monitors to [dynamically notify the appropriate communication channel][10] with monitor template variables.

Configuring actionable, effective alerting varies widely across organizations, so configure new monitors to be specific to your teams' needs. See the [`azure_caf_service_errors_15_min.json` file][26] for the definition of a sample monitor.

### Proactive Synthetic Monitoring

You can configure [Synthetics tests][27] to proactively verify a healthy customer experience for your end users.

Synthetic tests are critical when your new workloads serve the same end users as your legacy environments. If an unexpected error or degradation is introduced by the migration, you can flag and respond to issues before customers are impacted.

You can also [incorporate these tests in your CI/CD pipelines][28] in Azure DevOps to test the end user experience as part of your deployment process.

### Document success with SLOs

Configure Service Level Objectives (SLOs) to document your workloads' availability targets and success throughout the migration.

For more information about how to configure SLOs and exposing them to stakeholders with dashboards, see [Service Level Objectives][29].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://us3.datadoghq.com/signup
[2]: /integrations/azure/?tab=link&site=us3
[3]: /integrations/azure_devops/#overview
[4]: /integrations/azure_devops/#setup
[5]: /integrations/#cat-collaboration
[6]: https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging#minimum-suggested-tags
[7]: https://app.datadoghq.com/dashboard/lists/preset/3?q=azure
[8]: /dashboards/configure/#configuration-actions
[9]: /dashboards/template_variables/
[10]: /monitors/notify/variables/?tab=is_alert#dynamic-handles
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: https://app.datadoghq.com/account/settings#integrations
[13]: https://app.datadoghq.com/apm/getting-started
[14]: https://app.datadoghq.com/logs/onboarding
[15]: /logs/guide/getting-started-lwl/
[16]: /network_monitoring/performance/
[17]: https://app.datadoghq.com/infrastructure/map
[18]: https://app.datadoghq.com/infrastructure/map?node_type=container
[19]: https://app.datadoghq.com/apm/map
[20]: https://app.datadoghq.com/network/map
[21]: https://app.datadoghq.com/dashboard/lists/preset/3
[22]: https://app.datadoghq.com/dashboard/lists#
[23]: /dashboards/#copy-import-or-export-dashboard-json
[24]: /resources/json/azure_caf_side_by_side_dashboard.json
[25]: /monitors/
[26]: /resources/json/azure_caf_service_errors_15_min.json
[27]: /synthetics/
[28]: /synthetics/cicd_integrations/configuration?tab=npm
[29]: /monitors/service_level_objectives/
