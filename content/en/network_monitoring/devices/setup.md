---
title: Network Device Monitoring Setup
kind: documentation
aliases:
    - /network_performance_monitoring/devices/setup/
further_reading:
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Using Profiles with Network Device Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Installation

Network Device Monitoring uses the SNMP protocol included in the [Datadog Agent][1] package. No additional installation is necessary.

## Configuration

Datadog Network Device Monitoring supports collecting metrics from individual devices, or auto-discovering devices (unique IP addresses) on entire subnets.

Choose your collection strategy based on the number of devices present on your network, and how dynamic your network is (meaning frequency of adding or removing devices):

- For small and mostly static networks, see [Monitoring individual devices](#monitoring-individual-devices).
- For larger or dynamic networks, see [Autodiscovery](#autodiscovery).

Regardless of the collection strategy, leverage Datadog's [sysObjectID mapped device profiles][2] to automatically collect relevant metrics from your devices.

### Monitoring individual devices

To monitor individual devices:

- Include the IP address and any additional devices metadata (as tags) in the `snmp.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][3]. See the [sample snmp.d/conf.yaml][4] for all available configuration options.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- For SNMPv2, configure an instance specifying the IP address and _community string_ of the device:

    ```yaml
    init_config:
      loader: core
    instances:
      - ip_address: "1.2.3.4"
      community_string: “sample-string”
      tags:
        - "key1:val1"
        - "key2:val2"
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- For SNMPv3, configure an instance specifying the IP address and SNMPv3 credentials of the device (as appropriate), for example: `user`, `authProtocol`, `authKey`, `privProtocol`, and `privKey`:

    ```yaml
    init_config:
      loader: core
    instances:
    - ip_address: "1.2.3.4"
      snmp_version: 3			# optional, if omitted we will autodetect which version of SNMP you are using
      user: "user"
      authProtocol: "fakeAuth"
      authKey: "fakeKey"
      privProtocol: "fakeProtocol"
      privKey: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
    ```

{{% /tab %}}
{{< /tabs >}}

- [Restart the Agent][5].

After setup, the Agent collects relevant metrics by matching your devices to one of [Datadog's device profiles][6].

To expand your setup:

* Add more instances to collect metrics from more devices on your network.
* Use [Autodiscovery](#autodiscovery) if you need to collect metrics from lots of devices across a dynamic network.

### Autodiscovery

An alternative to specifying individual devices is to use autodiscovery to automatically discover all the devices on your network.

Autodiscovery polls each IP on the configured subnet, and checks for a response from the device. Then, the Datadog Agent looks up the `sysObjectID` of the discovered device and maps it to one of [Datadog's device profiles][6]. The profiles contain lists of predefined metrics to collect for various types of devices.

To use Autodiscovery with Network Device Monitoring:

1. Install or upgrade the Datadog Agent to v7.27+. For platform specific instructions, see the [Datadog Agent][7] documentation.

2. Edit the [`datadog.yaml`][8] Agent configuration file to include all the subnets for Datadog to scan. The following sample config provides required parameters, default values, and examples for Autodiscovery.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100 # number of workers used to discover devices concurrently
  discovery_interval: 3600 # interval between each autodiscovery in seconds
  configs:
    - network: 1.2.3.4/24 # CIDR notation, we recommend no larger than /24 blocks
      version: 2
      port: 161
      community: ***
      tags:
      - "key1:val1"
      - "key2:val2"
    - network: 2.3.4.5/24
      version: 2
      port: 161
      community: ***
      tags:
      - "key1:val1"
      - "key2:val2"
```

{{% /tab %}}

{{% tab "SNMPv3" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100 # number of workers used to discover devices concurrently
  discovery_interval: 3600 # interval between each autodiscovery in seconds
  configs:
    - network: 1.2.3.4/24 # CIDR notation, we recommend no larger than /24 blocks
      version: 3
      user: "user"
      authentication_protocol: "fakeAuth"
      authentication_key: "fakeKey"
      privacy_protocol: "fakeProtocol"
      privacy_key: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
    - network: 2.3.4.5/24
      version: 3
      snmp_version: 3
      user: "user"
      authentication_protocol: "fakeAuth"
      authentication_key: "fakeKey"
      privacy_protocol: "fakeProtocol"
      privacy_key: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
```

{{% /tab %}}
{{< /tabs >}}

**Note**: The Datadog Agent automatically configures the SNMP check with each of the IPs that are discover. A discovered device is an IP that responds successfully when being polled using SNMP.

## Validation

[Run the Agent's status subcommand][9] and look for `snmp` under the Checks section.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: /agent
[8]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: /agent/guide/agent-commands/#agent-status-and-information
