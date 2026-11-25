---
title: On-Demand Packet Capture
description: Run header-only packet captures on the hosts in a Cloud Network Monitoring connection, then review a Bits summary or download the raw `.pcapng` file.
further_reading:
    - link: '/network_monitoring/cloud_network_monitoring/network_analytics/'
      tag: 'Documentation'
      text: 'Network Analytics'
    - link: '/network_monitoring/cloud_network_monitoring/setup/'
      tag: 'Documentation'
      text: 'Cloud Network Monitoring setup'
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!">}}
On-Demand Packet Capture is in Preview. Contact your account manager for access.
{{< /callout >}}

## Overview

Cloud Network Monitoring (CNM) shows when a connection is degraded through metrics such as throughput, latency, TCP retransmits, and resets. To find out why a connection degraded at the packet level, you can run an on-demand packet capture (PCAP) on that connection's hosts directly in Datadog. After the capture completes, Datadog provides a [Bits summary](#bits-summary) of what it observed. You can also download an archive of the raw `.pcapng` file to verify the summary or continue your investigation in tools such as Wireshark.

### Limitations

Packet capture has the following limitations:

- Each capture runs for 30 seconds. You cannot configure the duration or filter packets with Berkeley Packet Filter (BPF) expressions.
- Each capture request can include up to 25 hosts from the selected connection.
- Each host is limited to 100 MB of captured data. If a host reaches this limit, the capture data is truncated.
- Only Linux hosts are supported.

## Start a packet capture

To start a packet capture on a connection:

1. Navigate to [Network Analytics][1].
1. Filter, group, and sort aggregate connections to find the connection you want to investigate.

    For example, group by `client_service` and `server_service` and sort by latency or round-trip time (RTT) to see the service-to-service connections with the highest latency.
1. Open the packet capture configuration panel using one of these options:
    - Click the kebab menu on the aggregate connection row and select {{< ui >}}Packet Capture{{< /ui >}}.
    - Click the aggregate connection to open its side panel, then click {{< ui >}}Configure Packet Capture{{< /ui >}}.
1. Review the selected hosts. Up to 25 hosts are listed and selected by default. See the [Host selection](#host-selection) section for how Datadog chooses them.
    - Sort by hostname, role, resets, failures, or retransmits.
    - Clear the checkbox for any host you don't want to include.
1. Click {{< ui >}}Start Packet Capture{{< /ui >}}.

Datadog sends a remote command to the Agents on the selected hosts, and the Agents run the capture. A packet capture typically takes 1-2 minutes to complete, including the 30-second capture and processing time, but can take up to 10 minutes before it times out. The capture runs in the background, so you can close the panel. To review the results, see the [View packet capture results](#view-packet-capture-results) section.

### Host selection

A network connection in CNM is an aggregation based on the tags you group by, so a single connection can span hundreds or thousands of hosts. To focus the capture on the hosts most likely to show the problem, Datadog samples up to 25 hosts from the network connection based on:

- Highest resets
- Highest failure rate
- Highest retransmits
- A random sample of the remaining hosts

Datadog selects hosts for each criterion separately. For example, Datadog might select the following 25 hosts:
- 6 hosts with the most resets
- 6 hosts with the highest failure rates
- 6 hosts with the most retransmits
- 7 randomly selected hosts

Datadog doesn't rank hosts by a combined score across the three criteria or show duplicate hosts in the list.

Hosts are labeled by their role in the connection: client, server, or both, depending on the tags used to define the connection.

## View packet capture results

To view packet capture results:

1. Navigate to [Network Analytics][1].
1. Click the {{< ui >}}Packet Capture{{< /ui >}} tab to see a list of packet capture requests.
1. Click a request to open the side panel for details of the capture.
1. (Optional) To download the raw headers-only packet data, click {{< ui >}}Download .pcap{{< /ui >}} in the capture side panel. The download is a `.gz` file that contains a single `.pcapng` file, which appends the results across all the hosts that are part of the packet capture request.

### Packet capture request status

Packet capture requests have one of the following states:

| Status     | Description                                                                                     |
|------------|-------------------------------------------------------------------------------------------------|
| Queued     | The capture request is waiting to run.                                                          |
| Running    | The Agents are capturing packets.                                                               |
| Processing | The capture is complete and the results are being processed.                                    |
| Complete   | The capture completed successfully on all selected hosts.                                       |
| Partial    | One or more selected hosts failed to capture packets.                                           |
| Failed     | All selected hosts failed to capture packets.                                                   |
| Canceled   | A user manually stopped the packet capture request.                                             |
| Expired    | The results are past their retention period. See the [Data retention](#data-retention) section. |

A capture can fail for several reasons, including:

- The host shut down after CNM observed it.
- Permissions on the host don't allow packet capture.

### Packet capture result details

The results for each capture include:

- **Metadata**: The connection's client and server tags, the number of hosts, the completion time, and other capture details.
- **Bits summary**: A plain-language analysis of the capture. See the [Bits summary](#bits-summary) section.
- **Per-host breakdown**: The details for each host in the capture.
- **`.pcapng` file**: A `.zip` file of the `.pcapng` file from all hosts in the capture. Use the files to analyze raw packets in a third-party tool such as Wireshark, or share them with other users.

#### Bits summary

The Bits summary describes the capture results and labels which findings are directly observed and which are inferred. Each finding includes the host it applies to and supporting evidence.

Based on packet header data, the summary can identify:

- Connection attempts that get no response or are refused
- Repeated connection attempts (SYN retries)
- Connections closed with FIN or reset with RST, and which side sent the packet
- Handshake time as seen from the client
- TTL differences that suggest asymmetric routing
- Connection churn (many short-lived connections)

## Security and data handling

### Captured data

Packet capture records only packet header metadata, such as IP addresses, ports, TCP flags, sequence and acknowledgment numbers, window size, and time to live (TTL). The Agent uses a dynamic snap length to read each packet only up to the end of its headers. Payload data is not captured and is not included in the `.pcapng` file or the summary.

### Access and auditing

- For auditing, each packet capture request records the user who initiated it.
- Packet captures are visible to everyone in the organization.
- Users need the `network_connections_read` permission to access CNM pages, including the {{< ui >}}Packet Capture{{< /ui >}} tab and packet capture configuration side panel.

### Data retention

Datadog retains packet capture data for the following periods:

| Data                                 | Retention |
|--------------------------------------|-----------|
| `.pcapng` file                        | 15 days   |
| Bits summary and capture metadata    | 90 days   |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network
