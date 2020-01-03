---
title: Azure integration billing
kind: documentation
---

## Overview

Datadog bills for all Azure Virtual Machines being monitored in Datadog. These machines are billable regardless of whether the Datadog Agent is installed. **You are not billed twice** if you are running the Agent on an Azure VM picked up by the Azure integration.

Other Azure resources (Azure SQL, Azure App Services, Azure Redis Cache, etc.) are not part of monthly billing.

### VM exclusion

Use the [Datadog-Azure integration tile][1] to filter your VMs monitored by Datadog. Go to the **Configuration** tab and edit an existing tenant or add a new one. Each tenant is controlled under **Optionally filter to VMs with tag**. Limit VMs by [host tag][2]:

{{< img src="account_management/billing/azure_vm_filter.png" alt="Azure VM Filter" >}}

When adding limits to existing Azure tenants within the integration tile, the previously discovered VMs could stay in the [Infrastructure List][3] up to 2 hours. During the transition period, VMs display a status of `???`. This does not count towards your billing.

VMs with a running Agent still display and are included in billing. Using the limit option is only applicable to VMs without a running Agent.

## Troubleshooting

For technical questions, contact [Datadog support][4].

For billing questions, contact your [Customer Success][5] Manager.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /tagging/using_tags/#integrations
[3]: /graphing/infrastructure
[4]: /help
[5]: mailto:success@datadoghq.com
