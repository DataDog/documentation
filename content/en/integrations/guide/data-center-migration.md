---
title: Plan Your Datadog Data Center Migration
kind: guide
description: Prepare to migrate from one Datadog instance to another instance.
further_reading:
- link: "https://github.com/DataDog/datadog-sync-cli"
  tag: "GitHub"
  text: "datadog-sync-cli"
- link: "/agent/configuration/dual-shipping/"
  tag: "Documentation"
  text: "Learn about Dual Shipping"
- link: "/integrations/guide/azure-portal/"
  tag: "Documentation"
  text: "Managing the Azure Native integration"
---

## Overview

If you are interested in migrating Datadog data centers, follow these instructions to plan your migration:

1. Create a Datadog account.
1. Migrate Datadog resources using the `datadog-sync-cli` package. Optionally, use [Dual Shipping][4] to prevent data loss.
1. Migrate Datadog integrations.
1. Migrate real-time data.

In a data center migration, resources are duplicated into your new Datadog organization from the old organization. No data is removed from your old Datadog organization. You have access to the old data and resources until the retention period passes and the data in the old organization expires.

This guide walks you through planning a migration from one Datadog data center to another using the Datadog sync CLI tool (`datadog-sync-cli`) to sync resources across your Datadog organizations and [Dual Shipping][4] to prevent data loss. 

## Create a target account for the migration

[Sign up for a Datadog account][8] and specify the region of your choice or navigate to `https://app.{{< region-param key="dd_site" code="true" >}}/signup`.

If you are signing up through a cloud marketplace such as Azure or GCP, and you are ready to transact data at the time of creating a new Datadog organization, you can sign up and specify the data center of your choice in the cloud marketplace. For example, navigate to the [Azure Portal][9] and select **Create a new Datadog Organization**. 

## Migrate and synchronize Datadog resources across organizations

<div class="alert alert-info">This feature is in beta.</div>

[`datadog-sync-cli`][1] is a command line tool that you can use to synchronize resources, specify resources to migrate, and add filters to selectively migrate resources based on resource attributes. 

When you run the `import` command, the package reads the items from the specified resources in the source organization and saves them locally as JSON files in a `resources/source` folder. After running the `sync` command, the package uses the local cache (unless a `--force-missing-dependencies` flag is passed) to create the resources in the destination organization and saves what was pushed locally. 

You need to specify the API and application keys for a source organization and a destination organization as individual parameters. For more information about commands, see [Usage][10].

### Prerequisites

For information about Python requirements, see the [Installation section][11] of the `datadog-sync-cli` package.

### Resource attributes

A [Datadog resource][5] is an element or tool that you use to monitor your data in Datadog, such as a dashboard, monitor, or a notebook. 

You can use `datadog-sync-cli` to migrate the following resources:

{{% datadog-sync-resources %}}

### Dependent resources

Many Datadog resources are interdependent, meaning that a resource can reference many resources. For example, a `users` resource could reference `roles` and `dashboards` resources, which may include widgets that use Datadog monitor or Synthetic test data. 

While the `datadog-sync-cli` package synchronizes these resources to ensure dependencies are not broken, you must ensure that dependent resources are also imported and synced if you are importing and syncing a _subset_ of resources.

{{% datadog-sync-resources-dependencies %}}

At this point, you have a destination organization in a new data center which possesses a list of Datadog resources migrated from your old Datadog account. These resources are empty because they do not contain any monitoring data.

### Limitations

The `datadog-sync-cli` tool does not migrate intake data such as ingested logs or metrics, and does not migrate API keys or integrations.


### Migrate integrations and real-time data

Migrating to another data center requires you to re-add your integrations.


Next, configure the sources that send data to Datadog (the Datadog Agent, API, and more) to point to the new data center. To maintain historical metrics and prevent data loss, you have two options:

- Migrate to a data center and access historical metrics using the source organization. For example, if you are moving from `US1` to `US5`, you can keep your `US1` organization to access historical metrics. The data remains in the source organization until the metric retention period ends.
- [Dual ship][4] metrics to two data centers until the new Datadog organization possesses the required volume of historical data. 

### Use Dual Shipping

The following products can use Dual Shipping:

| Product |
|---|
| Infrastructure (Metrics, Events, Processes, Containers) |
| Log Management |
| APM |
| Continuous Profiling |
| Database Monitoring |
| CI Visibility |
| Network Performance Monitoring |
| Network Device Monitoring |
| Cloud Security Posture Management |
| Cloud Workload Security |
| Cloud SIEM |

<div class="alert alert-warning">By sending twice the amount of data during the migration, you are billed as if you are maintaining two live Datadog instances.</div>

The following products cannot use Dual Shipping:

| Product |
|---|
| Synthetic Monitoring |
| Continuous Testing |
| Mobile Application Testing |
| Incident Management |
| Real User Monitoring |

### Turn off Dual Shipping

To avoid additional charges in the month associated with products that are billed for [Dual Shipping][4], Datadog recommends disabling hosts or integrations such as AWS and GCP after there is enough data in the destination organization before the next billing cycle starts on the first day of the calendar month at 12:00 am UTC.

## Troubleshooting

### API throttling

You may encounter API throttling when using the `datadog-sync-cli` package, and when you do, you can specify timeouts and retries so you can start uploading from the failed line and re-run the `sync` command.

### Batch update monitors

To reduce noisy monitor alerts, you can programmatically attach the `migration:true` monitor tag to all monitors in the source organization.

1. Use the [Get all monitor details API endpoint][6] to pull all the monitor IDs.
1. Create a script to iterate through all IDs and use the [Edit a monitor API endpoint][7] to attach the `migration:true`.

Set a global downtime on the destination organization to mute all monitors containing the `migration:true` monitor tag.

Run `datadog-sync-cli` to migrate all monitors with `migration:true` from the source organization to the destination organization.

Set up [Dual Shipping](#use-dual-shipping) and remove the global downtime in the destination organization. Iterate through all your monitors in the destination organization and remove the `migration:true` tag.

Don't forget to turn off [Dual Shipping](#turn-off-dual-shipping) after you have enough data in the destination organization.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-sync-cli
[2]: /logs/log_configuration/archives/
[3]: /logs/log_configuration/rehydrating/
[4]: /agent/configuration/dual-shipping/
[5]: /glossary/#resource
[6]: /api/latest/monitors/#get-all-monitor-details/
[7]: /api/latest/monitors/#edit-a-monitor
[8]: https://app.datadoghq.com/signup
[9]: https://portal.azure.com/#create/datadog1591740804488.dd_liftr_v2
[10]: https://github.com/DataDog/datadog-sync-cli#usage
[11]: https://github.com/DataDog/datadog-sync-cli#installation