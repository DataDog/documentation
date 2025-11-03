---
title: Azure Count Metrics

aliases:
  - /integrations/guide/azure-status-metric
  - /integrations/faq/azure-vm-status-is-not-reporting
  - /integrations/faq/azure-status-metric
  - /integrations/faq/azure-count-metric
---

## Overview

Datadog generates an additional metric for each resource monitored with the [Azure integration][1]: `azure.*.count`. For example, Azure Virtual Machines monitored by Datadog reports `azure.vm.count`.

The `azure.*.count` metric is an improvement over `azure.*.status`, which is deprecated.

## Count metric

The `azure.*.count` metric provides two fundamental pieces of information:

- The number of resources of that type.
- The status of each resource as reported by Azure.

The `azure.*.count` metric is created in the same namespace as the other metrics for that resource type, for example: `azure.network_loadbalancers.count`. It includes all of the same metadata tags as the other metrics in that namespace, plus as additional tag for `status`.

### Use cases

Use the `azure.*.count` metric to:

- Create a view of the number of Virtual Machines broken out by their status over time by graphing `azure.vm.count` over everything and summing by `status`.
- Create query widgets in dashboards to display the number of a given resource type. Use any available tags to scope the count to a relevant aggregation such as region, resource group, kind, or status.
- Create monitors to alert you about the status of different Azure resources.

**Note**: In some cases, the default visualization settings can make it appear as though resources are being double counted intermittently in charts or query widgets. This does not affect monitors or widgets scoped to a specific status.
You can reduce this effect by turning off [interpolation][2] in charts or query widgets by setting Interpolation > none or using `.fill(null)`.

For most resource types, the possible statuses are:

- Running
- Unavailable
- Unknown
- Degraded
- Failed

Virtual machines have more detailed statuses, including:

- Running
- Stopped_deallocated
- Stopped
- Unknown
- Unavailable
- Degraded
- Failed

If you see a status of `query_failed` you need to enable the [Resource Health provider](#troubleshooting) in Azure.

## Troubleshooting

If your Azure integration is reporting metrics but not `azure.*.count`, or `azure.*.count` is returning `status:query_failed`, your Azure subscription needs to register the Azure Resource Health provider.

Using the Azure Command Line Interface:
```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

The `azure.*.count` metric should show in Datadog within 5 - 10 minutes.

[1]: /integrations/azure/
[2]: /metrics/guide/interpolation-the-fill-modifier-explained/
