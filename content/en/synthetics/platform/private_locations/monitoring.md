---
title: Private Location Monitoring
kind: documentation
description: Monitor your private locations
aliases:
- /synthetics/private_locations/monitoring
further_reading:
- link: "getting_started/synthetics/private_location"
  tag: "Documentation"
  text: "Getting Started with Private Locations"
- link: "synthetics/private_locations/dimensioning"
  tag: "Documentation"
  text: "Dimension your Private Locations"
- link: "agent/"
  tag: "Documentation"
  text: "Install the Datadog Agent"
---

## Overview

With private locations, you have a set of out-of-the-box [metrics][1] to keep track of your private location health at a high level. You can visualize these metrics in the side panel of each private location on the [Settings][2] page or graph these metrics in a [dashboard][3].

{{<img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="Private location monitor list" style="width:100%;">}}

In [**Synthetics Settings**][2], the **Private Locations** tab displays your private locations along with their reporting status and monitor status. 

When you click on a private location, a panel containing **Health** and **Metadata** details appears. The table in the **Health** tab displays all reporting workers and the image version they are running. You can get a sense of how many workers you need to pull for the new image version. 

In **Monitors**, you can see status warnings such as `ALERT` when something is going wrong with your private location. For example, the private location stops reporting, the private location becomes under-provisioned, or the private location worker runs an outdated image version.

{{<img src="synthetics/private_locations/pl_monitoring_side_panel.png" alt="Private location monitoring side panel" style="width:100%;">}}

## Default monitors

When you create a private location, three monitors are added to your account:

| Monitor Name                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[Synthetic Private Locations] {{location_id.name}} stopped reporting**              | This monitor triggers a `NO DATA` alert when the [`synthetics.pl.worker.running`][1] metric stops reporting data for one of your private locations. This indicates that your private location workers may have been killed or stopped running.                                                                                                                                                                                                                                                                                  |
| **[Synthetic Private Locations] {{location_id.name}} is underprovisioned**            | This monitor triggers an `ALERT` when the [`synthetics.pl.worker.remaining_slots`][1] metric goes below 1.5 on average for 30 minutes. This indicates that your private location is underprovisioned. [Vertically or horizontally scale your private location][4] to ensure that your private location has enough resources to execute all the tests that are assigned to it.                                                                                                                                                      |
| **[Synthetic Private Locations] {{location_id.name}} uses an outdated image version** | This monitor triggers an `ALERT` when the [`synthetics.pl.worker.outdated`][1] metric starts reporting `1` for one of your private locations. This indicates that at least one of your private location workers is running an outdated version of the private location image. Check for the latest image version in the [Google Container Registry][5] or the [Windows Installer List][8] and upgrade your workers to that image version by pulling the `datadog/synthetics-private-location-worker` image with the `latest` tag. |

By default, no handle is set in these monitors. To be alerted in case one of your monitors starts failing, add a handle in your monitors' [Notification section][6].

Monitors in the **Monitors** tab either have a group that corresponds to your private location ID or are tagged with `location_id:<ID_OF_THE_PL>`.

## Monitor your private locations with the Datadog Agent

In addition to the out-of-the-box private location metrics, Datadog recommends installing the [Datadog Agent][7] alongside your private location. 

The [Datadog Agent][7] enables in-depth visibility of your private locations by providing health metrics for the underlying workers (such as memory usage, limits, CPU, and disk). You can create a graph using these metrics and set an alert for low resources.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /synthetics/metrics/
[2]: https://app.datadoghq.com/synthetics/settings/private-locations
[3]: /dashboards/
[4]: /synthetics/private_locations/dimensioning
[5]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
[6]: /monitors/notify/
[7]: /agent/
[8]: https://ddsynthetics-windows.s3.amazonaws.com/installers.json