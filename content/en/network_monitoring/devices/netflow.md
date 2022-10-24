---
title: NetFlow Monitoring
kind: documentation
is_beta: true
further_reading:
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Using Profiles with Network Device Monitoring"
---

<div class="alert alert-warning">NetFlow Monitoring for Datadog Network Device Monitoring is in public beta.</div>

## Overview

Use NetFlow Monitoring in Datadog to visualize and monitor your flow records from your Netflow-enabled devices.

## Installation

To use NetFlow Monitoring with Network Device Monitoring, ensure you are using the [Agent][1] version 7.39 or newer.

**Note:** Configuring [metric collection from Network Device Monitoring][2] is not a requirement for sending NetFlow data, although it is strongly recommended.

## Configuration

To configure your devices to send NetFlow, sFlow, or IPFIX traffic to the Agent NetFlow server, your devices must be configured to send traffic to the IP address that the Datadog Agent is installed on, specifically the `flow_type` and `port`.

Edit your [`datadog.yaml`][3] Agent configuration file to enable NetFlow:

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices must send traffic to this port
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
```

After saving your changes, [restart the Agent][4].


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /network_monitoring/devices/snmp_metrics/
[3]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
