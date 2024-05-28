---
title: Collect SNMP Metrics From Your Network Devices
kind: documentation
aliases:
    - /network_performance_monitoring/devices/setup/
    - /network_monitoring/devices/setup/
further_reading:
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Using Profiles with Network Device Monitoring"
- link: "https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/"
  tag: "Knowledge Center"
  text: "SNMP Monitoring Overview"
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Installation

Network Device Monitoring relies on the SNMP Integration included in the [Datadog Agent][1] package. Ensure you are using Agent v7.32+. No additional installation is necessary.

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
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      community_string: 'sample-string'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- For SNMPv3, configure an instance specifying the IP address and SNMPv3 credentials of the device (as appropriate), for example: `user`, `authProtocol`, `authKey`, `privProtocol`, and `privKey`:

    ```yaml
    init_config:
      loader: core  # use core check implementation of SNMP integration. recommended
      use_device_id_as_hostname: true  # recommended
    instances:
    - ip_address: '1.2.3.4'
      snmp_version: 3  # optional, if omitted which version of SNMP you are using is auto-detected
      user: 'user'
      authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
      authKey: 'fakeKey'  # enclose with single quote
      privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
      privKey: 'fakePrivKey'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    ```

{{% /tab %}}
{{< /tabs >}}

- [Restart the Agent][5].

After setup, the Agent collects relevant metrics by matching your devices to one of [Datadog's device profiles][6].

To expand your setup:

* Add more instances to collect metrics from more devices on your network.
* Use [Autodiscovery](#autodiscovery) if you need to collect metrics from lots of devices across a dynamic network.

### Autodiscovery

An alternative to specifying individual devices is to use Autodiscovery to automatically discover all the devices on your network.

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
  workers: 100  # number of workers used to discover devices concurrently
  discovery_interval: 3600  # interval between each autodiscovery in seconds
  loader: core  # use core check implementation of SNMP integration. recommended
  use_device_id_as_hostname: true  # recommended
  configs:
    - network_address: 10.10.0.0/24  # CIDR subnet
      loader: core
      snmp_version: 2
      port: 161
      community_string: '***'  # enclose with single quote
      tags:
      - "key1:val1"
      - "key2:val2"
    - network_address: 10.20.0.0/24
      loader: core
      snmp_version: 2
      port: 161
      community_string: '***'
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
  workers: 100  # number of workers used to discover devices concurrently
  discovery_interval: 3600  # interval between each autodiscovery in seconds
  loader: core  # use core check implementation of SNMP integration. recommended
  use_device_id_as_hostname: true  # recommended
  configs:
    - network_address: 10.10.0.0/24  # CIDR subnet
      snmp_version: 3
      user: 'user'
      authProtocol: 'SHA256'  # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
      authKey: 'fakeKey'  # enclose with single quote
      privProtocol: 'AES256'  # choices: DES, AES, AES192, AES192C, AES256, AES256C
      privKey: 'fakePrivKey'  # enclose with single quote
      tags:
        - 'key1:val1'
        - 'key2:val2'
    - network_address: 10.20.0.0/24
      snmp_version: 3
      user: 'user'
      authProtocol: 'SHA256'
      authKey: 'fakeKey'
      privProtocol: 'AES256'
      privKey: 'fakePrivKey'
      tags:
        - 'key1:val1'
        - 'key2:val2'
```

{{% /tab %}}
{{< /tabs >}}

**Note**: The Datadog Agent automatically configures the SNMP check with each of the IPs that are discovered. A discovered device is an IP that responds successfully when being polled using SNMP.

### Ping

When configured, the SNMP check can also send ICMP pings to your devices. This can be configured for individual as well as Autodiscovered devices.

To set up ping with Network Device Monitoring:

1. Install or upgrade the Datadog Agent to v7.52+. For platform specific instructions, see the [Datadog Agent][7] documentation.

2. Edit the `snmp.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][3] for individual devices or the [`datadog.yaml`][8] Agent configuration file for Autodiscovery. See the [sample snmp.d/conf.yaml][4] for all available configuration options.

3. **Linux Only**: If you're receiving errors when running ping, you may need to configure the integration to send pings using a raw socket. This requires elevated privileges and is done using the Agent's system-probe. See the `linux.use_raw_socket` Agent configuration and system-probe configuration below.

**Note**: For Autodiscovery, Datadog does not ping devices that do not respond to SNMP.

{{< tabs >}}
{{% tab "Individual" %}}

- To apply ping settings to all manually configured devices, create ping configuration in the `init_config` section.

	```yaml
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
	          use_raw_socket: true   # (optional, default false) send pings using a raw socket (see step 3 above)
	```

{{% /tab %}}

{{% tab "Autodiscovery" %}}

- To apply ping settings to all Autodiscovery subnets, create ping configuration under the `snmp_listener` section.

	```yaml
	listeners:
	  - name: snmp
	snmp_listener:
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
	```

{{% /tab %}}
{{< /tabs >}}

##### Use raw sockets (Linux only)

If you're on Linux and want to use raw sockets for ping, you must also enable ping in the system-probe configuration file in addition to the Agent configuration above.

Edit `/etc/datadog-agent/system-probe.yaml` to set the enable flag to true.

```yaml
ping:
  enabled: true
```

## Validation

[Run the Agent's status subcommand][9] and look for `snmp` under the Checks section.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: /agent
[8]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[9]: /agent/configuration/agent-commands/#agent-status-and-information
