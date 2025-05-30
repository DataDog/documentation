---
title: Network Path Traceroute Variants FAQ
description: Frequently Asked Questions About Traceroute Variants
is_beta: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Path for Datadog Cloud Network Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Most modern OSes come with a built-in traceroute tool. For example, Linux/macOS come with the `traceroute` command, and Windows has `tracert`. However, you might notice different results from these two commands, on the exact same network. How could that be? This article seeks to provide an explanation for this behavior.

## Traceroute variants by platform

All traceroute tools fundamentally perform the same process: they send packets with a progressively increasing TTL (also known as *hop limit*), to get information about each hop along the route. However, they differ in what type of packet they send. There are three major protocols for traceroutes: ICMP, UDP, and TCP. Linux and macOS `traceroute` use UDP by default, and Windows `tracert` uses ICMP.

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
    <td>Planned</td>
    <td>`traceroute -I`</td>
  </tr>
  <tr>
    <td>UDP</td>
    <td><i class='icon-check-bold'></td>
    <td>`traceroute`</td>
  </tr>
  <tr>
    <td>TCP SYN</td>
    <td><i class='icon-check-bold'></td>
    <td>`tcptraceroute`</td>
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
    <td>Planned</td>
    <td>`tracert`</td>
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
    <td>Planned</td>
    <td>N/A</td>
  </tr>
</table>

Windows does not have officially distributed TCP or UDP traceroute tools. Third-party solutions like `nmap` and `tracetcp` exist however.

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
    <td>Planned</td>
    <td>`traceroute -I`</td>
  </tr>
  <tr>
    <td>UDP</td>
    <td>Planned</td>
    <td>`traceroute`</td>
  </tr>
  <tr>
    <td>TCP SYN</td>
    <td>Planned</td>
    <td>`tcptraceroute` (via homebrew)</td>
  </tr>
  <tr>
    <td>TCP SACK</td>
    <td>Planned</td>
    <td>N/A</td>
  </tr>
</table>
{{% /tab %}}
{{< /tabs >}}


## How do firewalls impact traceroute variants?

Firewalls are a major reason to prefer one variant of traceroute over another. For example, a network may drop all UDP packets besides DNS requests, or an HTTP server might be configured to  ignore all incoming traffic (including ICMP/UDP), except for TCP connections on port 443.

This is a reason to consider TCP traceroutes: By matching our traceroute variant to that of typical application traffic, we can have more confidence firewalls will allow our traffic through.

## What is TCP SACK traceroute?
TCP SYN traceroutes can still be blocked by firewalls in certain cases: because they create half-open connections, they can be mistakenly recognized as a SYN flood or port scan.  SACK (or Selective Acknowledgement) traceroutes begin after a connection has already been fully established, using a clever application of selective acknowledgement to ensure the target acknowledges packets it receives without actually sending any data.  More specifically, SACK traceroute *does* send packets with data, but uses a gap to ensure [Head-of-line blocking][1] prevents them from being delivered to the server.  Datadog currently supports TCP SACK traceroutes on Linux, with support coming soon to other platforms.

[1]: https://en.wikipedia.org/wiki/Head-of-line_blocking#In_reliable_byte_streams

## What does it mean to run an ICMP traceroute?

All traceroutes read ICMP TTL Exceeded packets to build a network path.  This can lead to confusion regarding what an ICMP traceroute is, since all traceroute variants use ICMP.  The distinction lies in what packets the traceroute is *sending*, not receiving.  To perform an ICMP traceroute, the device sends [ICMP Echo Request][1] packets, the same type of packet `ping` sends. If the packet TTL is too low, the device receives an ICMP TTL Exceeded response from a router, same as all other variants. However, for the very last hop, the Echo Request will be delivered and result in an ICMP Echo Response.

[1]: https://en.wikipedia.org/wiki/Ping_(networking_utility)#Message_format