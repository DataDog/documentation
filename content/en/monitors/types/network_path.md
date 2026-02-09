---
title: Network Path Monitor
description: "Monitor network traffic flow to a destination and alert on round trip time, packet loss, and jitter using Network Path data."
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Check your monitor status"
- link: "/network_monitoring/network_path/"
  tag: "Documentation"
  text: "Network Path Overview"
---

{{< callout url=# btn_hidden="true" header="Join the Preview!">}}
The Network Path monitor is in Preview. To request access, contact your Datadog account team or reach out to <a href="https://docs.datadoghq.com/help/">Datadog Support.
{{< /callout >}}

## Overview

[Network Path][1] provides a visual representation of network traffic flow from its origin to its destination. After you enable Network Path for your organization, you can create a Network Path monitor to alert you when a Network Path metric crosses a set threshold. For example, you can monitor packet loss percentage between a specific source and destination and be alerted when this percentage breaches a configured threshold.

## Monitor creation

To create a Network Path monitor in Datadog, use the main navigation: [**Monitors** > **New Monitor** > **Network Path**][2]

### Define search query

1. Construct a search query using the same logic as Network Path timeseries widgets in your dashboards.
2. Select which data type to monitor on: **Test Runs** or **Hops**.
   * **Test Runs** represent end-to-end traceroute results, including path-level metadata (such as source and destination) and summarized hop information. This dataset is sufficient for most monitoring use cases.
   * **Hops** represent detailed, hop-level data, such as latency between consecutive hops and additional hop-specific attributes. This dataset is intended for deeper, hop-by-hop analysis and should be used less frequently.
3. Choose to monitor over event count, facet, or measure.
   * **Monitor over a Network Path event count:** Use the search bar (optional) and do not select a facet or measure. Datadog evaluates the number of Network Path events over a selected time frame for the selected data type, then compares it to the threshold conditions.
   {{< img src="monitors/monitor_types/network_path/event_count_network_path_query.png" alt="Example configuration for monitoring over a Network Path event count" style="width:100%;" >}}

   * **Monitor over a facet:** If you select a facet, the monitor alerts over the `Unique value count` of the facet.
   {{< img src="monitors/monitor_types/network_path/facet_network_path_query.png" alt="Example configuration for monitoring over a facet" style="width:100%;" >}}
   * **Monitor over measure:** If you select a measure, the monitor alerts over the numerical value of the Network Path facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
   {{< img src="monitors/monitor_types/network_path/measure_network_path_query.png" alt="Example configuration for monitoring over a measure" style="width:100%;" >}}
4. (Optional) Group Network Path events by multiple dimensions: All Network Path events matching the query are aggregated into groups based on the value of up to four facets.
5. (Optional) Add multiple queries and apply formulas and functions:
   * **Multiple queries**: Click **Add Query** to analyze multiple different sets of Network Path data in relation to each other.
   * **Formulas and functions**: After adding your desired queries, click the **Add Function** icon to add a mathematical computation.

### Metric Definitions

The following table lists the different Network Path metrics that you can create monitors on.

| Metric Name                    | Definition                                                                     |
| -------------------------------| ------------------------------------------------------------------------------ |
| E2E Probe RTT Latency (Average)| End-to-end round-trip time (RTT) measured for the probe, representing the average time elapsed to receive a response from the destination across all probe packets |
| E2E Probe Packets Sent         | Number of packets sent |
| E2E Probe Packets Received     | Number of packets for which a response was received |
| E2E Probe Packet Loss          | Ratio of packets sent that did not receive a response |
| E2E Probe Jitter               | Variation in round-trip time (RTT) between consecutive packets  |

## Set alert conditions

Configure monitors to trigger if the query value crosses a threshold, and customize advanced alert options for recovery thresholds and evaluation delays. For more information, see [Configure Monitors][3].

## Notifications

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][4] page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/network_path/
[2]: https://app.datadoghq.com/monitors/create/network-path
[3]: /monitors/configuration/
[4]: /monitors/notify/
