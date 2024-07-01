---
title: Alibaba Integration Billing
---

## Overview

Datadog bills for all Alibaba Virtual Machines being monitored in Datadog. These machines are billable regardless of whether the Datadog Agent is installed. **You are not billed twice** if you are running the Agent on an Alibaba VM picked up by the Alibaba integration.

Other Alibaba resources (CDNs, Express Connect Instances, Aspara DBs, etc.) are not part of monthly billing.

## Alibaba VM exclusion

Use the [Datadog-Alibaba integration][1] tile to filter your VMs monitored by Datadog using [host tags][2]. Go to the **Configuration** tab and edit an existing account or add a new one. Filtering for each account is controlled by clicking it and filling in the field for **Optionally limit metrics collection to hosts with tag**:

{{< img src="account_management/billing/alibaba_filter.png" alt="Alibaba VM Filter" >}}

When adding limits to existing Alibaba accounts within the integration tile, the previously discovered VMs could stay in the [Infrastructure List][3] up to 2 hours. During the transition period, VMs display a status of `???`. This does not count towards your billing.

VMs with a running Agent still display and are included in billing, so using the limit option is only useful for VMs without a running Agent.

## Troubleshooting

For technical questions, contact [Datadog support][4].

For billing questions, contact your [Customer Success][5] Manager.

[1]: https://app.datadoghq.com/account/settings#integrations/alibaba-cloud
[2]: /getting_started/tagging/using_tags/#integrations
[3]: /infrastructure/
[4]: /help/
[5]: mailto:success@datadoghq.com
