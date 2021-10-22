---
title: Private Location Monitoring
kind: documentation
description: Monitor your private locations
further_reading:
- link: "getting_started/synthetics/private_location"
  tag: "Documentation"
  text: "Getting Started with Private Locations"
- link: "synthetics/private_locations/dimensioning"
  tag: "Documentation"
  text: "Dimensioning your Private Locations"
---

## Out of the box private location monitoring

Private locations come with a set of out of the box [metrics][2] allowing you to keep track of your private location health at a high level. You can visualize these metrics in the side panel of each private location listed on your [settings][4] page or graph these metrics in [dashboards][5], like any other Datadog metric.

The table available on individual private location side panels lists all workers reporting as well as the version they're running. You can view the dashboard to get a sense of the number of containers that would need to pull the new version of the image.

{{<img src="synthetics/private_locations/pl_monitoring_table.png" alt="Private location monitoring table"  style="width:100%;">}}

Individual private location side panels also display warnings in case something is going wrong with your private location, for instance if it stopped reporting, if it's starting to become underprovisioned or if it's running an outdated image version.

{{<img src="synthetics/private_locations/pl_monitoring_side_panel.png" alt="Private location monitoring side panel"  style="width:100%;">}}

#### Default monitors

At your first private location creation, three monitors are created on your account:

* `[Synthetic Private Locations] {{location_id.name}} stopped reporting`: This monitor triggers a `NO DATA` alert whenever the [`synthetics.pl.worker.running`][2] metric stops reporting data for one of your private locations. This indicates your private location containers might have been killed or stopped running.
* `[Synthetic Private Locations] {{location_id.name}} is underprovisioned`: This monitor triggers an `ALERT` whenever the [`synthetics.pl.worker.remaining_slots`][2] metric goes below 1.5 on average for 30 minutes. This indicates that your private location is underprovisioned. You can then either [vertically or horizontally scale your private location][3] to ensure it gets enough resources to execute all the tests that are assigned to it.
* `[Synthetic Private Locations] {{location_id.name}} uses an outdated image version`: This monitor triggers an `ALERT` whenever the [`synthetics.pl.worker.outdated`][2] metric starts reporting 1 for one of your private locations. This indicates that at least one of your private location containers is running an outdated version of the private location image. You can check what the latest version of the image is by looking at the [Google Container Registry][7] and upgrade workers to that version of the image by pulling the `datadog/synthetics-private-location-worker` image with the `latest` tag.

By default, no handle is set in these monitors. If you want to be alerted in case one of your monitors starts failing, you should make sure to add a handle in your monitors' [notification sections][6].

The monitors showing up on private location side panels are monitors that:
* Either have a group that corresponds to the id of your private location,
* Or are tagged with `location_id:<ID_OF_THE_PL>`.

### Monitoring your private locations with the Datadog Agent

In addition to the out of the box private location metrics, Datadog strongly recommend installing the [Datadog Agent][1] alongside your private location. The [Datadog Agent][1] allows you to get in-depth visibility on your private locations by providing you with metrics about the health of the underlying containers (memory usage and limits, CPU, disk, etc.), which you can then use to graph and be alerted on low resources.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/
[2]: /synthetics/metrics/
[3]: synthetics/private_locations/dimensioning
[4]: https://app.datadoghq.com/synthetics/settings/private-locations
[5]: dashboards/
[6]: monitors/notify/
[7]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker