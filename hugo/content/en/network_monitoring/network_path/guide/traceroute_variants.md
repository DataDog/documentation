---
title: Network Path traceroute variants
description: Network Path traceroute tariants
is_beta: true
aliases:
- /network_monitoring/cloud_network_monitoring/guide/traceroute_variants/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-network-path-monitoring/"
  tag: "Blog"
  text: "Get end-to-end network visibility with Datadog Network Path"
---

Most modern operating systems include a built-in `traceroute` tool. For example, Linux and macOS use the `traceroute` command, while Windows uses `tracert`. However, you may observe different results from these commands even when run on the same network. This article explains the reasons behind these differences.

## Traceroute variants by platform

All traceroute tools fundamentally perform the same process: they send packets with a progressively increasing TTL (also known as *hop limit*), to get information about each hop along the route. However, they differ in what type of packet they send. There are three major protocols for traceroutes: ICMP, UDP, and TCP. Linux and macOS `traceroute` use UDP by default, while Windows `tracert` uses ICMP. For the full list of supported traceroutes, see the [support matrix][3].

{{< tabs >}}
{{% tab "Linux" %}}

<table>
  <thead>
    <th>Variant</th>
    <th>Datadog Support</th>
    <th>Equivalent Traceroute</th>
  </thead>
  <tr>
    <td>ICMP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>traceroute -I</code></td>
  </tr>
  <tr>
    <td>UDP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>traceroute</code></td>
  </tr>
  <tr>
    <td>TCP SYN</td>
    <td><i class='icon-check-bold'></td>
    <td><code>tcptraceroute</code></td>
  </tr>
  <tr>
    <td>TCP SACK</td>
    <td><i class='icon-check-bold'></td>
    <td>Third-party tools</td>
  </tr>
</table>

Typically `traceroute` and `tcptraceroute` are made available by official package maintainers, but only `traceroute` is installed by default.

{{% /tab %}}

{{% tab "Windows" %}}

<table>
  <thead>
    <th>Variant</th>
    <th>Datadog Support</th>
    <th>Equivalent Traceroute</th>
  </thead>
  <tr>
    <td>ICMP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>tracert</code></td>
  </tr>
  <tr>
    <td>UDP</td>
    <td><i class='icon-check-bold'></td>
    <td>Third-party tools</td>
  </tr>
  <tr>
    <td>TCP SYN</td>
    <td><i class='icon-check-bold'></td>
    <td>Third-party tools</td>
  </tr>
  <tr>
    <td>TCP SACK</td>
    <td><i class='icon-check-bold'></td>
    <td>N/A</td>
  </tr>
</table>

Windows does not have officially distributed TCP or UDP `traceroute` tools. Third-party solutions like `nmap` and `tracetcp` exist however.

{{% /tab %}}

{{% tab "macOS" %}}

<table>
  <thead>
    <th>Variant</th>
    <th>Datadog Support</th>
    <th>Equivalent Traceroute</th>
  </thead>
  <tr>
    <td>ICMP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>traceroute -I</code></td>
  </tr>
  <tr>
    <td>UDP</td>
    <td><i class='icon-check-bold'></td>
    <td><code>traceroute</code></td>
  </tr>
  <tr>
    <td>TCP SYN</td>
    <td><i class='icon-check-bold'></td>
    <td><code>tcptraceroute (via homebrew)</td>
  </tr>
  <tr>
    <td>TCP SACK</td>
    <td><i class='icon-check-bold'></td>
    <td>N/A</td>
  </tr>
</table>
{{% /tab %}}
{{< /tabs >}}


## Firewall impact on traceroute variants

Firewalls are a key factor in choosing which traceroute variant to use. For example, a network might block all UDP packets except DNS requests, or an HTTP server could be configured to reject all incoming traffic (including ICMP and UDP), allowing only TCP connections on port 443.

Using TCP-based traceroutes can be more effective because they match the protocol of normal application traffic, increasing the likelihood that firewalls will allow the packets through.

## TCP SACK traceroutes

While TCP SYN (synchronize) traceroutes are useful, they can be blocked by firewalls in some cases. Because they initiate half-open connections, they may be misinterpreted as SYN floods or port scans. In contrast, SACK (Selective Acknowledgement) traceroutes operate after a full TCP connection is established. They use selective acknowledgement to prompt the target to acknowledge packets without requiring actual data transmission.

SACK traceroutes do send packets with data, but they introduce a deliberate gap that triggers [Head-of-line blocking][1], preventing the data from reaching the application layer.

Datadog currently supports TCP SACK traceroutes on Linux only.

## ICMP traceroutes

All traceroutes rely on "ICMP TTL Exceeded" (Internet Control Message Protocol Time to Live) packets to build a network path. This often causes confusion regarding what defines an ICMP traceroute, since all traceroute variants receive ICMP responses. The key difference lies in what packets the traceroute is *sending*, not receiving. 

An ICMP traceroute specifically sends [ICMP Echo Request][2] packets, the same type used by the `ping` command. If a packet's TTL (Time to Live) is too low, a router along the path responds with an ICMP Time Exceeded message. At the final hop, the Echo Request reaches the destination, which replies with an ICMP Echo Response.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://en.wikipedia.org/wiki/Head-of-line_blocking#In_reliable_byte_streams
[2]: https://en.wikipedia.org/wiki/Ping_(networking_utility)#Message_format
[3]: https://github.com/DataDog/datadog-traceroute?tab=readme-ov-file#support-matrix-for-ipv4