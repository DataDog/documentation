---
title: Azure Status and Count Metrics
kind: faq
aliases:
  - /integrations/faq/azure-vm-status-is-not-reporting
---

## Overview

Datadog generates two additional metrics for each resource monitored with the [Azure integration][1]: `azure.*.status` and `azure.*.count`. For example, Azure Virtual Machines monitored by Datadog reports `azure.vm.status` and `azure.vm.count`. These two metrics cover similar information.

The `azure.*.count` metric is an improvement over `azure.*.status`, which will be deprecated.

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

**Note**: In some cases, the default visualization settings can make it appear as though resources are being double counted intermittently in charts or query widgets. This will not affect monitors or widgets scoped to a specific status.
You can reduce this effect by turning off [interpolation][2] in charts or query widgets by setting Interpolation > none or using ‘.fill(null)’. 

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

## Status metric

The `azure.*.status` metric is the previous solution for this same type of information. It reports the number of available resources for each Azure resource type.

### Differences

The key differences between the `.status` and `.count` metric:

- `azure.*.count` includes all resources that exist in the Azure account while `azure.*.status` only reports the number of available resources.
- `azure.*.count` includes a `status` tag, which reports the specific availability state for the resource while `azure.*.status` only includes the standard tags for the resource type.
- `azure.*.count` includes improvements in the accuracy and reliability of the metric value.

## Troubleshooting

If your Azure integration is reporting metrics but not `azure.*.status`, or `azure.*.count` is returning `status:query_failed`, your Azure subscription needs to register the Azure Resource Health provider.

Using the Azure Command Line Interface:
```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

The `azure.*.status` metric should show in Datadog within 5 - 10 minutes.

[1]: /integrations/azure/
[2]: /dashboards/faq/interpolation-the-fill-modifier-explained/
