---
title: High Availability support of the Datadog Agent
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Learn more about Fleet Automation"
- link: "/network_monitoring/devices/glossary"
  tag: "Documentation"
  text: "Network Device Monitoring Terms and Concepts"
site_support_id: high_availability_datadog_agent
---

## Overview

High Availability (HA) support of the Datadog Agent enables seamless failover between a designated active Agent and a standby Agent. If the active Agent becomes unavailable, due to unexpected issues or planned events like OS patches or Agent upgrades, the standby Agent automatically takes over. This configuration eliminates the Agent as a single point of failure, ensuring uninterrupted monitoring and increased resilience across your infrastructure.

You can configure Agents as active-standby pairs in several [supported integrations](#supported-integrations). If the active Agent becomes unavailable, the standby Agent automatically takes over within 90 seconds. You can designate a preferred active Agent, allowing the primary Agent to automatically resume its role when it becomes available. This enables proactive Agent switching ahead of scheduled maintenance.

## Supported integrations

The following integrations are supported for High Availability:

| Category                | Supported Integrations       |
|-------------------------|------------------------------|
| **Database Monitoring**  | [PostgreSQL][15], [MySQL][16], [MongoDB][17], [Oracle][18], [SQL Server][19] |
| **Network Monitoring**   | [SNMP][1], [Network Path][2], [HTTP Check][3] |
| **Vendor-Specific**      | [Cisco ACI][4], [Cisco SD-WAN][5], [Versa][23]|
| **Virtualization**  | [Proxmox][20], [vSphere][21] |
| **Cloud platforms** | [OpenStack Controller][22]|

## Prerequisites

- Agent 7.64+
- [Remote Configuration][9] enabled for your organization.
- [fleet_policies_write][14] permission to configure the [preferred active Agent](#define-a-preferred-active-agent).

**Supported Operating Systems**:

- Linux
- Windows
- macOS

## Setup

### Installation

1. Install the Datadog Agent on two similar hosts (one on each host). The following setup is for hosts with similar capabilities (CPU, RAM, and networking) and configurations (including `datadog.yaml` and integration settings).

2. Configure your `datadog.yaml` on each host, with the following settings:

   ```yaml
   ha_agent:
     enabled: true
   config_id: <CONFIG-NAME>  # example: "my-ndm-agents"
                             # only use lowercase alphanumerics, hyphen and underscore
   ```

3. Configure one of the [supported integrations](#supported-integrations) for High Availability:

   For example, to set up the SNMP integration, install it on both Agents using the [SNMP Metrics][1] setup guide. <br>
   **Note**: Both [individual device monitoring][10] and [Autodiscovery][11] methods are supported for the SNMP integration.

   After the Agents are configured, they function as an HA pair:
   - The installed integration runs only on the _active_ Agent.
   - If the active Agent or host fails (due to a crash or shutdown), the standby Agent automatically takes over, maintaining uninterrupted monitoring.

### Define a preferred active Agent

1. Go to [**Integrations > Fleet Automation > View Agents**][13].

2. Search for your previously configured Agents using tags or hostname, for example, `config_id:<CONFIG-NAME>`.

   {{< img src="/integrations/guide/high_availability/fleet-view-agents_3.png" alt="Fleet Automation View Agents" style="width:100%;" >}}

3. Select the Agent you want to assign as the preferred active Agent and click **View Agent details** to open the side panel.

   {{< img src="/integrations/guide/high_availability/view_agent_details.png" alt="Selecting a host from the Fleet Automation tab and highlighting View Agent details" style="width:50%;" >}}

4. Navigate to the **High Availability** tab and click the three dots next to the Agent you wish to designate as the preferred active Agent.

   {{< img src="/integrations/guide/high_availability/set_preferred.png" alt="Fleet Automation High Availability tab, highlighting the drop-down to select the preferred Active Agent" style="width:100%;" >}}

5. On the same screen, review the health status of the preferred active Agent, standby Agent, and configured integrations:

   {{< img src="/integrations/guide/high_availability/high_availability_tab_fleet.png" alt="Fleet Automation High Availability tab, highlighting HA Preferred Active Agent" style="width:100%;" >}}

## Testing and validation

1. Test failover by shutting down the active Agent or its host.
2. The standby Agent should start monitoring the configured integration(s) after 1-3 minutes.

## FAQ

### How is the active Agent determined?

**Without a preferred active Agent**:
- The active Agent is initially selected at random.
- Failover occurs only when the current active Agent shuts down or crashes.
- When the primary Agent recovers, it does not automatically reclaim the active role.

**With a preferred active Agent**:
- The preferred Agent always takes priority when available.
- If it fails, the standby Agent becomes active.
- When the preferred Agent recovers, it automatically resumes the active role, and the standby Agent returns to standby.

### Why is it not possible to configure the preferred active Agent?

- You may not have the necessary permissions. Review the [prerequisites](#prerequisites) and the [fleet_policies_write][14] documentation.

### Why does my Agent have an `unknown` HA Agent state?

- Remote Configuration may not be setup correctly. For more information, review the [prerequisites](#prerequisites) and the [Remote Configuration setup][12] documentation.


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
[12]: /agent/remote_config/?tab=configurationyamlfile#setup
[13]: https://app.datadoghq.com/fleet
[14]: /account_management/rbac/permissions/#fleet-automation
[15]: /database_monitoring/#postgres
[16]: /database_monitoring/#mysql
[17]: /database_monitoring/#mongodb
[18]: /database_monitoring/#oracle
[19]: /database_monitoring/#sql-server
[20]: https://docs.datadoghq.com/integrations/proxmox/
[21]: https://docs.datadoghq.com/integrations/vsphere/
[22]: https://docs.datadoghq.com/integrations/openstack-controller
[23]: https://docs.datadoghq.com/integrations/versa/


