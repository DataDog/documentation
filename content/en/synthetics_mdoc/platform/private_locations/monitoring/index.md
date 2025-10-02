---
title: Private Location Monitoring
description: Monitor your private locations
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Platform > Run Synthetic Tests from
  Private Locations > Private Location Monitoring
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/platform/private_locations/monitoring/index.html
---

# Private Location Monitoring

## Overview{% #overview %}

With private locations, you have a set of out-of-the-box [metrics](https://docs.datadoghq.com/synthetics/metrics/) to keep track of your private location health at a high level. You can visualize these metrics in the side panel of each private location on the [Settings](https://app.datadoghq.com/synthetics/settings/private-locations) page or graph these metrics in a [dashboard](https://docs.datadoghq.com/dashboards/).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_monitoring_table_reporting_1.28828235a7f604b0de81a5b48624b30b.png?auto=format"
   alt="Private location monitor list" /%}

In [**Synthetic Monitoring Settings**](https://app.datadoghq.com/synthetics/settings/private-locations), the **Private Locations** tab displays your private locations along with their reporting status and monitor status.

When you click on a private location, a panel containing **Health** and **Metadata** details appears. The table in the **Health** tab displays all reporting workers and the image version they are running. You can get a sense of how many workers you need to pull for the new image version.

In **Monitors**, you can see status warnings such as `ALERT` when something is going wrong with your private location. For example, the private location stops reporting, the private location becomes under-provisioned, or the private location worker runs an outdated image version.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/private_locations/pl_monitoring_side_panel.dd7cf473195b1bb2bb3c1492264c379b.png?auto=format"
   alt="Private location monitoring side panel" /%}

## Default monitors{% #default-monitors %}

When you create a private location, three monitors are added to your account:

| Monitor Name                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Synthetic Private Locations] {{location\_id.name}} stopped reporting**              | This monitor triggers a `NO DATA` alert when the [`synthetics.pl.worker.running`](https://docs.datadoghq.com/synthetics/metrics/) metric stops reporting data for one of your private locations. This indicates that your private location workers may have been killed or stopped running.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **[Synthetic Private Locations] {{location\_id.name}} is underprovisioned**            | This monitor triggers an `ALERT` when the [`synthetics.pl.worker.remaining_slots`](https://docs.datadoghq.com/synthetics/metrics/) metric goes below 1.5 on average for 30 minutes. This indicates that your private location is underprovisioned. [Vertically or horizontally scale your private location](https://docs.datadoghq.com/synthetics/private_locations/dimensioning) to ensure that your private location has enough resources to execute all the tests that are assigned to it.                                                                                                                                                                                                                                            |
| **[Synthetic Private Locations] {{location\_id.name}} uses an outdated image version** | This monitor triggers an `ALERT` when the [`synthetics.pl.worker.outdated`](https://docs.datadoghq.com/synthetics/metrics/) metric starts reporting `1` for one of your private locations. This indicates that at least one of your private location workers is running an outdated version of the private location image. Check for the latest image version in the [Google Container Registry](https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker) or the [Windows Installer List](https://ddsynthetics-windows.s3.amazonaws.com/installers.json) and upgrade your workers to that image version by pulling the `datadog/synthetics-private-location-worker` image with the `latest` tag. |

By default, no handle is set in these monitors. To be alerted in case one of your monitors starts failing, add a handle in your monitors' [Notification section](https://docs.datadoghq.com/monitors/notify/).

Monitors in the **Monitors** tab either have a group that corresponds to your private location ID or are tagged with `location_id:<ID_OF_THE_PL>`.

## Monitor your private locations with the Datadog Agent{% #monitor-your-private-locations-with-the-datadog-agent %}

In addition to the out-of-the-box private location metrics, Datadog recommends installing the [Datadog Agent](https://docs.datadoghq.com/agent/) alongside your private location.

The [Datadog Agent](https://docs.datadoghq.com/agent/) enables in-depth visibility of your private locations by providing health metrics for the underlying workers (such as memory usage, limits, CPU, and disk). You can create a graph using these metrics and set an alert for low resources.

## Further Reading{% #further-reading %}

- [Getting Started with Private Locations](https://docs.datadoghq.com/getting_started/synthetics/private_location)
- [Dimension your Private Locations](https://docs.datadoghq.com/synthetics/private_locations/dimensioning)
- [Install the Datadog Agent](https://docs.datadoghq.com/agent/)
