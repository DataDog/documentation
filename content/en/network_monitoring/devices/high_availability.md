---
title: NDM High Availability
further_reading:
- link: "/network_monitoring/devices/glossary"
  tag: "Documentation"
  text: "NDM Terms and Concepts"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning"> Datadog Agent High Availability in Network Device Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

<div class="alert alert-info"> Datadog Agent High Availability in Network Device Monitoring is in Preview. Reach out to your Datadog representative to sign up.</div>

## Overview

High Availability (HA) in Network Device Monitoring allows you to designate an active Agent and a standby Agent, ensuring automatic failover if the active Agent encounters an issue. This setup eliminates the Agent as a single point of failure, maintaining continuous monitoring during unexpected incidents or planned maintenance, such as OS updates and Agent upgrades.

You can configure active and standby Agents to function as an HA pair in NDM. If the active Agent goes down, the standby Agent takes over within 90 seconds, becoming the new active Agent. Additionally, you can designate a preferred active Agent, allowing NDM to automatically revert to it once it becomes available again. This feature allows for proactive Agent switching ahead of scheduled maintenance.

## Supported integrations

The following integrations are supported for High Availability in Network Device Monitoring:

| Category                | Supported Integrations       |
|-------------------------|------------------------------|
| **Network Monitoring**  | [SNMP][1], [Network Path][2], [HTTP Check][3] |
| **Vendor-Specific**     | [Cisco ACI][4], [Cisco SD-WAN][5], Versa |
| **Virtualization**      | [vSphere][6], [OpenStack Controller][7] |

## Prerequisites

- Agent 7.64+
- [Remote Configuration][9] enabled on your hosts

## Setup

HA Agent is supported on Linux, Windows, and macOS. Are there separate setup instructions for each?

### Installation

1. Install two Agents on like hosts (one on each host). The following setup is for hosts with similar capabilities (CPU, RAM, and networking) and configurations (including `datadog.yaml` and integration settings).

2. For both Agents, on each host, configure your `datadog.yaml` with the following settings:

   ```yaml
   ha_agent:
     enabled: true
   config_id: <CONFIG-NAME>  # example: "my-ndm-agents"
                          # only use lowercase alphanumerics, hyphen and underscore
   ```

3. Configure the SNMP integration:

   - Setup the SNMP integration on _both_ Agents by following the [SNMP Metrics][1] setup instructions.

     **Note**: Both [Monitoring individual][10] devices and [Autodiscovery][11] installation methods are supported.

At this point, the two Agents are fully configured for High Availability (HA).

- The SNMP integration only runs on the Active Agent.
- If the Active Agent or host fails (crashes or shuts down), the standby Agent automatically takes over as the new active Agent, ensuring uninterrupted monitoring.


### Define a preferred active Agent 

1. Go to **Integrations > Fleet Automation > View Agents**.

2. Search for your previously configured Agents using tags, hostname, for example, `config_id:<CONFIG-NAME>`.

**placeholder**
{{< img src="/network_device_monitoring/high_availability/fleet-view-agents.png" alt="Fleet Automation View Agents" style="width:100%;" >}}

3. Click on the Agent you would like to define as Preferred.

4. In the **HA Preferred Active Agent** dropdown, select the Agent you would like to define as preferred.

**placeholder**
{{< img src="/network_device_monitoring/high_availability/agent-preferred.png" alt="Fleet Automation View Agents" style="width:100%;" >}}

## Testing and validation

1. Test that failover works by shutting down the Agent/Host that is Active.

2. The standby Agent should start monitoring the SNMP integrations after 1-3min.


## FAQ

### How is the Active Agent determined?

**If no Preferred Active Agent is defined**:

- The active Agent is initially chosen randomly.
- Switching the active Agent is minimized:
  - If Agent1 is active and Agent2 is Standby, and Agent1 shuts down or crashes, failover occurs, and Agent2 becomes Active.
  - If Agent1 becomes healthy again, Agent2 remains Active.

**If a Preferred Active Agent is defined**:

- The Preferred Active Agent takes priority:
  - If Agent1 is the Preferred active Agent and is Active, and Agent2 is Standby, failover occurs if Agent1 shuts down or crashes, making Agent2 Active.
  - When Agent1 becomes healthy again, it automaticallyreverts to being Active,and Agent2 returns to Standby.

### Why does my Agent have an `unknown` HA Agent state?

- One common reason is that Remote Configuration is not setup correctly.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/snmp_metrics
[2]: /network_monitoring/network_path/
[3]: https://docs.datadoghq.com/integrations/http_check/
[4]: https://docs.datadoghq.com/integrations/cisco_aci/
[5]: https://docs.datadoghq.com/integrations/cisco_sdwan/
[6]: https://docs.datadoghq.com/integrations/vsphere/
[7]: https://docs.datadoghq.com/integrations/vsphere/
[8]: https://docs.datadoghq.com/integrations/openstack_controller/
[9]: https://docs.datadoghq.com/agent/remote_config/
[10]: /network_monitoring/devices/snmp_metrics?tab=snmpv2#monitoring-individual-devices
[11]: /network_monitoring/devices/snmp_metrics?tab=snmpv2#autodiscovery


