---
title: Azure integration billing
kind: faq
---

As of September 1, 2018, we bill for all Azure Virtual Machines being monitored in Datadog. These machines are billable regardless of whether the Datadog Agent is installed. **Note**: You are not charged twice if you are running the Agent on an Azure Virtual machine that is also picked up by the Azure Integration.

Other Azure resources (e.g. Azure SQL, Azure App Services, Azure Redis Cache) are not currently part of monthly billing but this may change in the future.

If you would like to control which Azure Virtual Machines are being monitored in Datadog, go the the Azure Integration tile add tag filters in the **Optionally filter to VMs with tag** section.

This comma separated list of tags (in the form `<KEY>:<VALUE>`) defines a filter used for collecting metrics from Azure VMs. Wildcards, such as `?` (for single characters) and `*` (for multiple characters) can also be used. Only VMs that match one of the defined tags are imported into Datadog. The rest are ignored.

VMs matching a given tag can also be excluded by adding `!` before the tag. An example entry is below:

```
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

{{< img src="account_management/billing/azure_vm_filter.png" alt="Azure VM Filter" responsive="true">}}

## Troubleshooting
For technical questions, contact [Datadog support][1].

For billing questions, contact your Customer Success Manager.

[1]: /help
