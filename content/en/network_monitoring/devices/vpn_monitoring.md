---
title: VPN Monitoring
description: Get started with monitoring your devices VPN tunnels.
further_reading:
  - link: "https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/"
    tag: "Knowledge Center"
    text: "SNMP Monitoring Overview"
  - link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
    tag: "Blog"
    text: "Monitor SNMP with Datadog"
---

## Overview

VPN monitoring provides visibility into your devices' VPN tunnels within Network Device Monitoring (NDM). This feature allows you to keep track of critical data and metrics to examine the health of your VPN tunnels.

When configured, the SNMP check collects VPN tunnel data from your devices. This can be configured for [individual][4] as well as [Autodiscovered][5] devices.

## Prerequisites

Agent version `7.70` or higher.
### Limitations

- Support is limited to Cisco IPsec VPN tunnels.

## Configuration

1. Install or upgrade the [Datadog Agent][1] to v7.70+.

2. Edit the `snmp.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][2] for individual devices, or the [`datadog.yaml`][3] Agent configuration file for Autodiscovery.

{{< tabs >}}
{{% tab "Individual" %}}

To enable VPN monitoring to all _manually_ configured devices, add the `collect_vpn` configuration in the `init_config` section:

{{< highlight yaml "hl_lines=4" >}}
init_config:
  loader: core
  use_device_id_as_hostname: true
  collect_vpn: true          # (default false) enable collecting VPN tunnel data
instances:
  - ip_address: '1.2.3.4'
    community_string: 'sample-string'
    tags:
    - 'key1:val1'
    - 'key2:val2'
{{< /highlight >}}

Or, apply the `collect_vpn` configuration _per_ instance:

{{< highlight yaml "hl_lines=10" >}}
init_config:
  loader: core
  use_device_id_as_hostname: true
instances:
  - ip_address: '1.2.3.4'
    community_string: 'sample-string'
    tags:
      - 'key1:val1'
      - 'key2:val2'
    collect_vpn: true        # (default false) enable collecting VPN tunnel data
{{< /highlight >}}

{{% /tab %}}

{{% tab "Autodiscovery" %}}

To enable VPN monitoring to all _Autodiscovery_ subnets, add the `collect_vpn` configuration under the `network_devices.autodiscovery` section:

{{< highlight yaml "hl_lines=7" >}}
network_devices:
  autodiscovery:
    workers: 100
    discovery_interval: 3600
    loader: core
    use_device_id_as_hostname: true
    collect_vpn: true        # (default false) enable collecting VPN tunnel data
    configs:
      - network_address: 10.10.0.0/24
        loader: core
        snmp_version: 2
        port: 161
        community_string: '***'
        tags:
        - "key1:val1"
        - "key2:val2"
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

## Viewing VPN tunnels

To view VPN tunnels for a device, click the device in the [NDM device list][8] or the [Device Topology Map][7] to open the NDM device view. The **Dependencies** section shows the number of connected devices and VPN tunnels at a glance.

{{< img src="/network_device_monitoring/vpn_monitoring/dependency_tab.png" alt="The NDM device view showing the Dependencies section with connected devices and a VPN tunnel count." style="width:100%;" >}}

Click **View dependencies** to open the full device page. On the **Dependencies** tab, select the **VPN** filter to see all VPN tunnels for the device. The table displays the local outside IP, remote peer IP, protocol, tunnel interface, destination subnets, bytes in, bytes out, and active time for each tunnel.

{{< img src="/network_device_monitoring/vpn_monitoring/vpn_dependency.png" alt="The Dependencies tab on the NDM device page with the VPN filter selected, showing a table of VPN tunnels with connection details." style="width:100%;" >}}

### Metrics collected

The following metrics are made available after enabling VPN monitoring:

<table style="width: 100%;">
  <thead>
    <tr>
      <th style="width: 40%;">Metric Name</th>
      <th style="width: 65%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>snmp.cipSecTunActiveTime</code></td>
      <td>The duration the tunnel has been active in hundredths of seconds.</td>
    </tr>
    <tr>
      <td><code>snmp.cipSecTunHcInOctets</code></td>
      <td>The number of octets received by the tunnel.</td>
    </tr>
    <tr>
      <td><code>snmp.cipSecTunHcOutOctets</code></td>
      <td>The number of octets sent by the tunnel.</td>
    </tr>
    <tr>
      <td><code>snmp.cipSecTunInPkts</code></td>
      <td>The number of packets received by the tunnel.</td>
    </tr>
    <tr>
      <td><code>snmp.cipSecTunOutPkts</code></td>
      <td>The number of packets sent by the tunnel.</td>
    </tr>
    <tr>
      <td><code>snmp.cipSecTunInAuthFails</code></td>
      <td>The number of inbound authentications that ended in failure for the tunnel.</td>
    </tr>
    <tr>
      <td><code>snmp.cipSecTunOutAuthFails</code></td>
      <td>The number of outbound authentications that ended in failure for the tunnel.</td>
    </tr>
    <tr>
      <td><code>snmp.cipSecTunInDecryptFails</code></td>
      <td>The number of inbound decryptions that ended in failure for the tunnel.</td>
    </tr>
    <tr>
      <td><code>snmp.cipSecTunOutEncryptFails</code></td>
      <td>The number of outbound encryptions that ended in failure for the tunnel.</td>
    </tr>
  </tbody>
</table>

## Troubleshooting

If you experience issues using VPN monitoring, use the following troubleshooting guidelines. If you need further assistance, contact [Datadog support][6].

### VPN tunnels not displayed

The VPN tunnel data is collected with SNMP. If VPN tunnels are missing on a device, ensure the following:

- Datadog Agent version 7.70 or later is installed.
- Verify the device exposes the relevant VPN tunnel data with SNMP by running the following command:

```shell
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.171.1.3.2
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /network_monitoring/devices/vpn_monitoring/?tab=individual#configuration
[5]: /network_monitoring/devices/vpn_monitoring/?tab=autodiscovery#configuration
[6]: /help
[7]: /network_monitoring/devices/topology/
[8]: https://app.datadoghq.com/devices

