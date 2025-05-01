---
title: High Availability support of the Datadog Agent
further_reading:
- link: "/network_monitoring/devices/glossary"
  tag: "Documentation"
  text: "NDM Terms and Concepts"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning"> High Availability support of the Datadog Agent is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

<div class="alert alert-info"> High Availability support of the Datadog Agent is in Preview. Reach out to your Datadog representative to sign up.</div>

## Overview

High Availability (HA) support of the Datadog Agent enables seamless failover between a designated active Agent and a standby Agent. If the active Agent becomes unavailable, due to unexpected issues or planned events like OS patches or Agent upgrades, the standby Agent automatically takes over. This configuration eliminates the Agent as a single point of failure, ensuring uninterrupted monitoring and increased resilience across your infrastructure.

You can configure Agents as active-standby pairs in several [supported integrations](#supported-integrations). If the active Agent becomes unavailable, the standby Agent automatically takes over within 90 seconds. You can designate a preferred active Agent, allowing the primary Agent to automatically resume its role when it becomes available. This enables proactive Agent switching ahead of scheduled maintenance.

## Supported integrations

The following integrations are supported for High Availability in Network Device Monitoring:

| Category                | Supported Integrations       |
|-------------------------|------------------------------|
| **Network Monitoring**  | [SNMP][1], [Network Path][2], [HTTP Check][3] |
| **Vendor-Specific**     | [Cisco ACI][4], [Cisco SD-WAN][5]|

## Prerequisites

- Agent 7.64+
- [Remote Configuration][9] enabled on your hosts

**Supported Operating Systems for HA Agent**:

- Linux
- Windows
- macOS

## Setup

### Installation

1. Install two Agents on like hosts (one on each host). The following setup is for hosts with similar capabilities (CPU, RAM, and networking) and configurations (including `datadog.yaml` and integration settings).

2. For both Agents, on each host, configure your `datadog.yaml` with the following settings:

   ```yaml
   ha_agent:
     enabled: true
   config_id: <CONFIG-NAME>  # example: "my-ndm-agents"
                             # only use lowercase alphanumerics, hyphen and underscore
   ```

3. Configure one of the [supported integrations](#supported-integrations) for High Availability:

   For example, to set up the SNMP integration, install it on both Agents using the [SNMP Metrics][1] setup guide.
   **Note**: Both [individual device monitoring][10] and [autodiscovery][11] methods are supported for the SNMP integration.

After configured, the two Agents function as an HA pair:
- The installed integration runs only on the active Agent.
- If the active Agent or host fails (due to a crash or shutdown), the standby Agent automatically takes over, maintaining uninterrupted monitoring.

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

2. The standby Agent should start monitoring the configured integrations after 1-3 minutes.


## FAQ

### How is the active Agent determined?

**If no Preferred active Agent is defined**:

- The active Agent is initially chosen randomly.
- Active Agent switching is minimized to avoid unnecessary failover:
  - If the primary Agent is active and it shuts down or crashes, the secondary Agent takes over as the new active Agent.
  - When the primary Agent recovers, the secondary Agent remains active.

**If a Preferred active Agent is defined**:

- The preferred active Agent takes priority:
  - If the primary Agent is the preferred active Agent and is active, a failover occurs if the primary Agent shuts down or crashes, making the secondary Agent active.
  - When the primary Agent recovers, it automatically resumes the active role, and the secondary Agent returns to standby.

### Why does my Agent have an `unknown` HA Agent state?

- Remote Configuration is not setup correctly.


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


