---
title: On-Demand Packet Capture
description: Run header-only packet captures on the hosts in a Cloud Network Monitoring connection, then review a Bits AI summary or download the raw PCAP files.
further_reading:
    - link: '/network_monitoring/cloud_network_monitoring/network_analytics/'
      tag: 'Documentation'
      text: 'Network Analytics'
    - link: '/network_monitoring/cloud_network_monitoring/setup/'
      tag: 'Documentation'
      text: 'Cloud Network Monitoring setup'
---

{{< callout url="false" btn_hidden="true" header="Join the Preview!">}}
On-Demand Packet Capture is in Preview. Contact your account manager for access.
{{< /callout >}}

## Overview

Cloud Network Monitoring (CNM) shows when a connection is degraded through metrics such as throughput, latency, TCP retransmits, and resets. To find out why a connection degraded at the packet level, you can run an on-demand packet capture (PCAP) on that connection's hosts directly in Datadog. After the capture completes, Datadog provides a [Bits summary](#bits-summary) of what was observed, and a downloadable archive of the raw `.pcap` files so you can verify the summary and use it in tools such as Wireshark to continue your investigation.

### Limitations

Packet capture has the following limitations:

- Each capture runs for a fixed duration of 30 seconds. You can't configure the duration or set BPF filters.
- Each capture request can include up to 25 hosts from the selected connection.
- Each host is limited to 100 MB of captured data. If a host reaches this limit, the capture for that host is marked as **Partial**.
- Only Linux hosts are supported.

## Prerequisites

- [Cloud Network Monitoring][1] is set up on the hosts you want to capture packets on.
- The hosts run Linux and have the Datadog Agent installed.

## Start a packet capture

To start a packet capture on a connection:

1. Navigate to [Network Analytics][3].
1. Filter, group by, and sort connections to find relevant network connections.
    - For example, group by `client_service` and `server_service` and sort by latency or round-trip time (RTT) to see the service-to-service connections with the highest latency.
1. Open the packet capture configuration panel using one of these options:
    - Click the kebab menu on the network connection row and select {{< ui >}}Packet Capture{{< /ui >}}.
    - Click the network connection to open its side panel, then click {{< ui >}}Configure Packet Capture{{< /ui >}}.
1. Review the selected hosts. The panel lists up to 25 hosts from the connection, and all of them are selected by default. See [Host selection](#host-selection) for how hosts are chosen.
    - Sort by hostname, role, resets, failures, or retransmits.
    - Clear the checkbox for any host you don't want to include.
1. Click {{< ui >}}Start Packet Capture{{< /ui >}} to start the capture.

Datadog sends a remote command to the Agents on the selected hosts, which run the capture. A packet capture can take a couple of minutes to complete, which includes the 30-second capture and processing time. The capture runs in the background, so you can close the panel while it runs. See the [View packet capture results](#view-packet-capture-results) section for more information on reviewing the results.

### Host selection

A network connection in CNM is an aggregation based on the tags you group by, so a single connection can span hundreds or thousands of hosts. To focus the capture on the hosts most likely to show the problem, Datadog independently samples up to 25 hosts from the network connection based on:

- Highest resets
- Highest failure rate
- Highest retransmits
- A random sample of the remaining hosts

When Datadog is selecting hosts to capture, the host with the highest resets, highest failure rate, highest retransmits are looked at separately. For example, Datadog selects the hosts with the top three highest resets, the hosts with the three highest failure rates, and the hosts with the top three highest retransmits. Datadog is **not** looking at the top three hosts with the highest resets, failure rate, *and* retransmits, or the any combination of them.

Hosts are labeled by their role in the connection: client, server, or both, depending on the tags used to define the connection.

## View packet capture results

To view packet captures:
1. Navigate to [Network Analytics][3].
1. click the {{< ui >}}Packet Capture tab{{< /ui >}} on the [Network Analytics][3] page.
1. Click on your capture to open the side panel.

Packet captures have one of the following states:

| Status     | Description                                                                         |
|------------|-------------------------------------------------------------------------------------|
| Queued     | The capture request is waiting to run.                                              |
| Running    | The Agents are capturing packets.                                                   |
| Processing | The capture is complete and the results are being processed.                        |
| Complete   | The capture completed successfully on all selected hosts.                           |
| Partial    | One or more hosts reached the 100 MB capture limit. See [Limitations](#limitations) for more information.       |
| Failed     | The capture didn't complete.                                                        |
| Expired    | The results are past their retention period. See [Data retention](#data-retention). |

### Results

The results for each capture include:

- **Metadata**: The connection's client and server tags, the number of hosts, the completion time, and other capture details.
- **Bits AI summary**: A plain-language analysis of the capture. See [Bits AI summary](#bits-ai-summary).
- **Per-host breakdown**: The findings for each host in the capture.
- **PCAP files**: A `.zip` file containing the `.pcap` files from all hosts in the capture so you can analyze the raw packets in a third-party tool such as Wireshark, or to share them with other users.
  - Click {{< ui >}}Download .pcap{{< /ui >}} in the capture side panel to download the `.zip` file.

### Bits summary

The Bits summary describes the capture results in plain language and labels which findings are directly observed and which are inferred. Each finding includes the host it applies to and supporting evidence.

Based on packet header data, the summary can identify:

- Whether the TCP handshake completed
- Whether connections closed gracefully or were reset
- Retransmission and packet-loss patterns
- Zero-window conditions
- Out-of-order delivery
- RTT and latency
- Signs of asymmetric routing and MTU issues
- Traffic volume

Based on the summary, you might decide to run another packet capture on a specific host or set of hosts.

## Security and data handling

### Headers-only capture

Packet capture records only packet header metadata, such as IP addresses, ports, TCP flags, sequence and acknowledgment numbers, window size, and TTL. The Agent uses a dynamic snap length to read each packet only up to the end of its headers. Payload data is not captured, and is not included in the `.pcap` files or the summary.

### Auditing and visibility

- Every packet capture is logged with the user who started it, for auditing.
- Packet captures are visible to everyone in the organization, which helps with handoffs during an incident.

### Data retention

| Data                                 | Retention |
|--------------------------------------|-----------|
| `.pcap` files                        | 15 days   |
| Bits AI summary and capture metadata | 90 days   |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/setup/
[2]: /network_monitoring/cloud_network_monitoring/network_analytics/
[3]: https://app.datadoghq.com/network
