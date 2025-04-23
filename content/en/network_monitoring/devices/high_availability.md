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

### Network Monitoring
- [SNMP][1]
- [Network Path][2]
- [HTTP Check][3]

### Vendor-Specific integrations
- [Cisco ACI][4]
- [Cisco SD-WAN][5]
- Versa

### Virtualization platforms
- [vSphere][6]
- [OpenStack Controller][7]

## Prerequisites

- Agent 7.64+
- Remote Configuration enabled

## Setup

HA Agent is supported on Linux, Windows, and macOS.

### Install two Agents on hosts with the same capabilities

Two Agents with same capabilities (cpu/ram/networking) and configuration (datadog.yaml and integrations configurations)

1. For both Agents, setup datadog.yaml with

```
ha_agent:
  enabled: true
config_id: <CONFIG-NAME>  # example: "my-ndm-agents"
                          # only use lowercase alphanumerics, hyphen and underscore
```

2. For both Agents, setup SNMP integration

Setup SNMP integrations: [SNMP Metrics][1].

Both Monitoring individual devices and Autodiscovery are supported.

Usage

At this point, the two agents are configured to run as HA.

SNMP integrations will only run on the Active Agent.

If the Active Agent/Host crashes or is shutdown, the Standby Agent will switch to Active.

Dashboard

Once HA Agent is enabled, a dashboard called “HA Agent Overview” is available in Datadog at /dashboard page. It can be used for check the HA Agents status. Example:

Open image-20250113-170823.png
image-20250113-170823.png
Testing that HA Failover works

You can test that failover works by shutting down the Agent/Host that is currently Active.

After that, the standby Agent should start monitoring the SNMP integrations after 1-3min.

You can use the previously mentioned dashboard to monitoring the failover.

Defining a Preferred Active Agent (and View HA Agent status)

You can define a Preferred Active Agent like this:

Go to Integrations > Fleet Automation > View Agents (or directly to /fleet url)

Search for your previously configured Agents using tags, hostname, etc e.g. config_id:<CONFIG-NAME>

Open image-20250222-195513.png
image-20250222-195513.png
Click on the Agent you would like to define as Preferred

In HA Preferred Active Agent dropdown, select the one you would like to define as Preferred.


FAQ

How decision is made on which Agent is Active?

If no Preferred Active Agent is defined:

The Active Agent is initially randomly picked

Switching Active Agent is minimised: If Agent1 is Active and Agent2 is Standby, if Agent1 is shutdown or crashes, failover will happen and Agent2 become Active. If Agent1 become healthy again, the Agent2 will stay Active.

If Preferred Active Agent is defined:

The Preferred Active Agent will be Active in priority: If Agent1 is Active and Agent2 is Standby, if Agent1 is shutdown or crashes, failover will happen and Agent2 become Active. If Agent1 become healthy again, Agent1 will become Active and Agent2 will become Standby.

Why my Agent have “unknown” HA Agent state?

One common reason is that Remote Configuration is not setup correctly.

Please check this page for more details: Remote Configuration 

Migration from 7.62/7.63 to 7.64+

Step 1/ Update datadog.yaml config from



ha_agent:
  enabled: true
  group: snmp-agents-01
to



ha_agent:
  enabled: true
config_id: snmp-agents-01
Step 2/ Install Agent 7.64+

 

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


