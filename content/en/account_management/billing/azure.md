---
title: Azure integration billing
kind: documentation
---

## Overview

Datadog bills for all [Azure Virtual Machines being monitored in Datadog][1]. These machines are billable regardless of whether the Datadog Agent is installed. You are not billed twice if you are running the Agent on an Azure VM picked up by the Azure integration.

Additionally, Datadog also counts the nodes inside of Azure App Service Plans as billable hosts. Note that any Shared, Dynamic, or Free tier App Service Plans do not have any associated node counts and will not impact your Datadog bill.
The Azure integration will collect metrics for all other Azure resources (Azure SQL DB, Azure Redis Cache, Azure Load Balancer, etc.) without any impact on monthly billing.

## Azure VM exclusion

Use the Datadog-Azure integration tile to filter your VMs monitored by Datadog. Go to the Configuration tab and edit an existing App Registration or add a new one. Each filter is controlled under “Optionally limit metrics collection to hosts with tag:”

When adding limits to existing Azure tenants within the integration tile, the previously discovered VMs could stay in the Infrastructure List up to two hours. During the transition period, VMs display a status of `???`. This does not count towards your billing.

VMs with a running Agent still display and are included in billing. Using the limit option is only applicable to VMs without a running Agent.

## Azure App Service Plan exclusion

Use the Datadog-Azure integration tile to filter your Azure App Service Plans monitored by Datadog. Go to the Configuration tab and edit an existing App Registration or add a new one. The filter is controlled under “Optionally limit metrics collection to App Service Plans with tag:”

**Note**: This filters the metrics for all Apps or Functions running on the App Service Plan(s).

## Troubleshooting

For technical questions, contact [Datadog support][2].

For billing questions, contact your [Customer Success][3] Manager.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /getting_started/tagging/using_tags/#integrations
[3]: /infrastructure/
