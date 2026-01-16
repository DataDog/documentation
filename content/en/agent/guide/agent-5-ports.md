---
title: Agent 5 ports
disable_toc: false
private: true
---

This page covers the ports used by Agent 5. For information on the latest version of the Agent, see [Network Traffic][1].

<div class="alert alert-danger">
All outbound traffic is sent over SSL through TCP or UDP.
<br><br>
Ensure the Agent is only accessible by your applications or trusted network sources using a firewall rule or similar network restriction. Untrusted access can allow malicious actors to perform several invasive actions, including but not limited to writing traces and metrics to your Datadog account, or obtaining information about your configuration and services.
</div>

Open the following ports to benefit from all the **Agent** functionalities:

#### Outbound

443/tcp
: Port for most Agent data (Metrics, APM, Live Processes & Containers).

123/udp
: Port for NTP ([more details on the importance of NTP][2]).<br>
See [default NTP targets][3].

#### Inbound

6062/tcp
: Port for the debug endpoints for the Process Agent.

6162/tcp
: Port for configuring runtime settings for the Process Agent.

8125/udp
: Port for DogStatsD unless `dogstatsd_non_local_traffic` is set to true. This port is available on localhost: `127.0.0.1`, `::1`, `fe80::1`.

8126/tcp
: Port for the [APM Receiver][4].

17123/tcp
: Agent forwarder, used to buffer traffic in case of network splits between the Agent and Datadog.

17124/tcp
: Optional graphite adapter.

[1]: /agent/network
[2]: /agent/faq/network-time-protocol-ntp-offset-issues/
[3]: /integrations/ntp/#overview
[4]: /tracing/
