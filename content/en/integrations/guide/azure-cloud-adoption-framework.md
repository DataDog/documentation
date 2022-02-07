---
title: Azure Cloud Adoption Framework with Datadog
kind: guide
further_reading:
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Azure integration"
---

# Introduction

Migrating your services to a new cloud environment from an on-prem or other cloud environment is risky. Azure's Cloud Adoption Framework provides a proven strategy for successful migrations, and Datadog's monitoring further ensures safe and speedy migrations by measuring the health of both your new and original environments together in the same system of observability and incident response. 

For organizations that are following Azure's Cloud Adoption Framework through their migration journey, this document will guide you and your teams to...

1. Prepare your Datadog account for your teams to efficiently execute their workload migrations (a "plan" stage focus)
2. Use Datadog to measure the health of your original environments and new workloads as your teams launch them in your new Landing Zones (a "migration" stage focus). 

# Plan

During the plan stage of your migration, you will want to prepare your Datadog account to effectively monitor your new workloads as soon as they are migrated to your Azure account. What you will do here...

1. Enable Datadog-Azure integrations that your new workloads will use to indicate their performance and health
2. Document a tagging strategy that your teams will use to describe their workloads as they migrate
3. Configure dashboards that stakeholders can use to follow migration progress and understand the overall health of the new workloads
4. Establish communication channels for incident response

## Enable Datadog-Azure Integrations

If you don't yet have a Datadog account, you can [start a free 2-week trial from this link][1].

Datadog and Azure partner together to offer Datadog's services from within your Azure account. For each of your landing zones, you can create a Datadog Resource to link your Datadog account to your Azure account and access your observability data from within Azure. [This guide][2]will walk you through that process, and will help you determine which of your Azure data to collect into Datadog.

The Datadog Resource will streamline the setup of a large list of Datadog-Azure integrations and significantly increase your teams' visibility on the health and performance of their new Azure workloads. One additional integration we recommend enabling is the [Azure DevOps integration][3] which will enable your teams to correlate workload performance data with release and build events. Setup instructions for that integration can be found [here][4].

Finally, Datadog offers many integrations to help communicate with your teams when something needs their attention, for example Microsoft Teams or Slack. We recommend adding all the communication integrations that your organization uses. The full list of these integrations and their setup instructions can be found [here][5]. 

## Tagging Strategy

Tagging is critical to effective monitoring of applications and environments, so before you begin migrating to your Azure landing zone, you will want to implement a solid tagging strategy. That might sound intimidating, but it doesn't have to be complicated or time consuming to do. 

Any data that can be useful for categorizing your infrastructure or services is a good tag candidate. Datadog highly recommends adding the following tags to your resources whenever applicable:

1. `env` (for `prod`, `staging`, `dev`, etc.)
2. `service` (when in doubt, use the same value as `ApplicationName`)
3. `version` (to identify which version of an application is in use)
4. `team` (defines what team built or manages the resource; we recommend creating a separate MS teams channel devoted to each team that they can use to receive communications about the health of their services)
5. `owner` (defines who specifically is responsible for a resource)
6. `workload` (clarifies what workload a resource relates to, assists in legacy-to-cloud performance and KPI comparisons)
7. `landing-zone` (identifies what landing-zone a resource exists in, if any; assists in legacy-to-cloud performance and KPI comparisons)

Azures Cloud Adoption Framework also offers a [pre-defined tagging strategy][6] which even has some overlap with the list above. We recommend reviewing this document and implementing those tags that apply to your organization, and especially those listed in the "Minimum Suggested Tags" section. 

## Stakeholder Dashboards

Datadog offers many dashboards out-of-the-box for customers using Azure-related services. [You can find that list of dashboards here][7]. 

Once you have a tagging strategy that fits well for your organization, we recommend [cloning the out-of-the-box dashboards][8] and adding [Dashboard Template Variables][9] from your list of standardized tags. With Dashboard Template Variables, Datadog dashboards can give visibility both on wide summaries of data, and on specific subsets of data by tag. For example, if you add a template variable for the "workload" tag to a dashboard, you can use that dashboard as a summary of the performance of many workloads, and you can also filter the whole dashboard down to the performance of any specific workload. A single dashboard becomes useful for all dashboards without needing to manage separate dashboards for each workload. 

## Communication Channels for Incident Response

Many organizations choose to set up dedicated communication channels that reflect the ownership hierarchy of their services or workloads. We strongly encourage this, and we recommend pairing the naming convention of these communication channels with your tagging strategy. If, for example, you have standardized on using an  `owner` tag, you can configure investigative email groups or communication channels whose names are defined by that `owner` tag value. As a result, it will become easier for your teams to ensure that the right alert goes to the right responder by configuring [dynamic handles][10]. 

# Migrate

Once you have your Datadog account prepared, your teams can begin using Datadog to ensure a smooth migration from their original environments to the new landing zone workloads. For each workload, this process will involve...

1. Install and configure the Datadog agent to ensure comprehensive and consistent monitoring of both legacy environments and new workloads. 
2. Configure dashboards so that you can observe the health of both legacy environments new workloads side-by-side
3. Configure monitors so that investigative teams can respond to important changes in performance KPIs
4. Add Synthetics tests to proactively monitor unexpected degradations in user experience
5. Configure SLOs to document the health of your KPIs for stakeholder visibility

## Resolve Observability Gaps in your Original Environment

As a workload or service owner, the best way to get comprehensive and consistent observability across both your original environment and new azure workloads is to install the Datadog agent. The Datadog agent is very lightweight; it is designed to run across all your servers (whether on prem or in a cloud provider) to collect the data you need to verify the health of your services and bring it all together in your Datadog account. [This page][11] will guide you through the installation of the agent on individual servers, as well as installation via your configuration management tool of choice (recommended).

Once the agent is installed, add the following data collection methods to get more complete visibility into the health of your environment:

  1. [Add integrations to collect data][12] specific to the technologies your services employ
  2. [Enable Application Performance Monitoring (APM)][13] to measure the request counts, latency, and error rates of your services
  3. [Capture the logs generated by your environment][14] to get deeper context when your metrics and traces behave unexpectedly (if you have a lot, you can opt to [store only the most critical][15])
  4. [Enable Network Performance Monitoring (NPM)][16] to ensure efficient communication between your services. This will be especially important during the migration since your original environment may need to communicate across to your new cloud environment.

We recommend installing the agent and configuring complete data collection on your legacy environment and designing your new workloads to include the Datadog agent with the same complete data collection before you migrate your new workload. In doing so, make sure to follow your organization's tagging standards to make sure all the performance data can be consistently understood and identified to their appropriate team, workload, landing zone, etc.

## Workload Health and Migration Dashboards

Once your health data is flowing into your Datadog account, you can view and understand your environment from Datadog's visualization maps ([host][17], [container][18], [service][19], [network traffic][20]), and from any of the [out of the box dashboards][21] specific to the technologies you've integrated with. Of course you can clone and customize those dashboards, or create custom dashboards to see the data you need for your specific use-cases.

In some cases it may make sense to visualize the performance of your legacy environment and new workloads side-by-side. You can find an example of such a dashboard by taking the following steps:

1. In your Datadog account, [create a new dashboard][22].
2. Select the 'cog' at the top right corner
3. Select 'import dashboard content' ([setting documented here][23])
4. Paste in the JSON definition of the dashboard found [here][24]

## Send Actionable Alerts to Workload Owners

As you migrate your workloads, you will want to make sure the right people can be automatically alerted when important performance KPIs thresholds are crossed. To do this, create monitors in Datadog that constantly observe the health of your workloads and trigger notifications to your communication channels, wether over MS Teams, Slack, paging services, or ticketing systems.

We recommend reviewing [this guide on how to set up actionable and effective alerts][25]. If your tags map effectively to dedicated investigative channels (e.g, if you have a Teams channel for every "owner" or "team" or "workspace", then you can configure your monitors to [dynamically notify the appropriate communication channel][10] with monitor template variables. 

Configuring truly actionable and effective alerting differs widely from organization to organization, so you will likely have best results if you configure new monitors that are specific to your own teams' needs. That said, here you will find the definitions of a sample monitor that may give you a head start and that demonstrate some of our best practices in action: [Notify MS Teams for any service's elevated error rate over 15 minutes][26]

## Proactive Monitoring with Synthetics

We recommend configuring [Synthetics tests][27] to proactively verify a healthy customer experience for your end customers. This can be especially critical in those cases where your new workloads will serve the same end users as your legacy environments -- in this way, if an unexpected error or degradation is introduced by the migration, you can catch it and respond before customers are actually impacted. You can even [incorporate these tests in your CI/CD][28] in Azure DevOps so as to test end user experience as part of your deployment process. 

## Document Success with SLOs

Finally, we recommend configuring Service Level Objectives (SLOs) to document your workloads' availability targets and success throughout the process of migration. [This document][29] will describe how to configure SLOs and expose them to stakeholders with dashboards. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://us3.datadoghq.com/signup
[2]: /integrations/azure/?tab=link&site=us3
[3]: /integrations/azure_devops/#overview
[4]: /integrations/azure_devops/#setup
[5]: /integrations/#cat-collaboration
[6]: https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging#minimum-suggested-tags
[7]: https://app.datadoghq.com/dashboard/lists/preset/3?q=azure
[8]: /dashboards/#clone-dashboard
[9]: /dashboards/template_variables/
[10]: /monitors/notify/variables/?tab=is_alert#dynamic-handles
[11]: https://app.datadoghq.com/account/settings#agent
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
