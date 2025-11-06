---
title: Ping 
further_reading:
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Using Profiles with Network Device Monitoring"
- link: "https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/"
  tag: "Knowledge Center"
  text: "SNMP Monitoring Overview"
---

## Overview

When configured, the SNMP check can also send ICMP pings to your devices. This can be configured for individual as well as Autodiscovered devices.

## Prerequistes

- [Agent][1] version `7.52+`.
- SNMP monitoring configured on [Individual devices][7] or with [Autodiscovery][8].

### Setup

1. Edit the `snmp.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][2] for individual devices, or the [`datadog.yaml`][3] Agent configuration file for Autodiscovery. See the [sample snmp.d/conf.yaml][4] for all available configuration options.

2. **Linux Only**: If you're receiving errors when running ping, you may need to configure the integration to send pings using a raw socket. This requires elevated privileges and is done using the Agent's system-probe. See the [linux.use_raw_socket][5] `system-probe` configuration below.

{{< tabs >}}
{{% tab "Individual" %}}

To apply ping settings to all _manually_ configured devices, add the ping configuration in the `init_config` section:

{{< highlight yaml "hl_lines=4-5" >}}

init_config:
  loader: core
  use_device_id_as_hostname: true
  ping:
    enabled: true            # (default false) enable the ping check
    linux:                   # (optional) Linux specific configuration
      use_raw_socket: true     # (optional, default false) send pings using a raw socket (see step 3 above)
instances:
  - ip_address: '1.2.3.4'
    community_string: 'sample-string'
    tags:
    - 'key1:val1'
    - 'key2:val2'

{{< /highlight >}}

Or, apply the ping configuration _per_ instance:

{{< highlight yaml "hl_lines=10-11" >}}

init_config:
  loader: core
  use_device_id_as_hostname: true
instances:
  - ip_address: '1.2.3.4'
    community_string: 'sample-string'
    tags:
      - 'key1:val1'
      - 'key2:val2'
    ping:
      enabled: true            # (default false) enable the ping check
      linux:                   # (optional) Linux specific configuration
        use_raw_socket: true     # (optional, default false) send pings using a raw socket 

{{< /highlight >}}

{{% /tab %}}

{{% tab "Autodiscovery" %}}

Configure ping settings in the `network_devices` section under the Autodiscovery parameter to apply them to _all_ Autodiscovery subnets.

{{< highlight yaml "hl_lines=16-17" >}}
network_devices:
  autodiscovery:
    workers: 100
    discovery_interval: 3600
    loader: core
    use_device_id_as_hostname: true
    configs:
      - network_address: 10.10.0.0/24
        loader: core
        snmp_version: 2
        port: 161
        community_string: '***'
        tags:
        - "key1:val1"
        - "key2:val2"
        ping:
          enabled: true            # (default false) enable the ping check
          linux:                   # (optional) Linux specific configuration
            use_raw_socket: true   # (optional, default false) send pings using a raw socket (see step 3 above)

{{< /highlight >}}

**Note**: For Autodiscovery, Datadog does not ping devices that do not respond to SNMP.

{{% /tab %}}

{{% tab "Use raw sockets (Linux only)" %}}

If you're on Linux and want to use raw sockets for ping, you must also enable ping in the `system-probe` configuration file in addition to the Agent configuration.

Edit `/etc/datadog-agent/system-probe.yaml` to set the enable flag to true.

```yaml
ping:
  enabled: true
```

{{% /tab %}}
{{< /tabs >}}

After ping is enabled on your network devices, the **Ping State** column appears in [Network Device Monitoring][6], displaying the ping status for each device.

{{< img src="/network_device_monitoring/snmp/ping_state_status_2.png" alt="The status column in the NDM UI showing the Ping state toggle enabled with the ping state status column highlighted" style="width:100%;">}}

The following are the status names in the **Ping State** column and their descriptions:

| Status name  | Description                                             |
|--------------|------------------------------------------------------|
| Unreachable  | Device is unreachable through ping.                   |
| Unmonitored  | Ping has not been configured for this device.        |
| Ok           | Device is reachable through ping.                     |
| N/A          | The devices do not support ping. |

### Metrics collected

The following metrics are made available after enabling ping:

| Metric name  | Description                                              |
|--------------|------------------------------------------------------|
| networkdevice.ping.avg_rtt  |       Average round-trip time |
| networkdevice.ping.reachable |   Device reachability status        |
| networkdevice.ping.packet_loss  |   Packet loss percentage |
| networkdevice.ping.unreachable         | Device unreachable status |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /network_monitoring/devices/ping/?tab=userawsocketslinuxonly#setup
[6]: https://app.datadoghq.com/devices
[7]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2#monitoring-individual-devices
[8]: /network_monitoring/devices/snmp_metrics/#autodiscovery
