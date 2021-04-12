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

- Edit the subnet and SNMP version in the `snmp.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][3]. See the [sample snmp.d/conf.yaml][4] for all available configuration options.

{{< tabs >}}
{{% tab "SNMPv2" %}}

- For SNMPv2, configure an instance specifying the IP address and _community string_ of the device:

    ```yaml
    instances:
      - ip_address: "<IP_ADDRESS>"
        community_string: "<COMMUNITY_STRING>"
    ```

{{% /tab %}}
{{% tab "SNMPv3" %}}

- For SNMPv3, configure an instance specifying the IP address and SNMPv3 credentials of the device (as appropriate), for example: `user`, `authProtocol`, `authKey`, `privProtocol`, and `privKey`:

    ```yaml
    instances:
      - ip_address: "<IP_ADDRESS>"
        user: "<USER>"
        ## Configure these as appropriate
        # authProtocol: SHA
        # authKey: "<AUTH_KEY>"
        # privProtocol: AES
        # privKey: "<PRIV_KEY>"
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

1. Install or upgrade the Datadog Agent to v6.16+. For platform specific instructions, see the [Datadog Agent][7] documentation.

2. Edit the [snmp.d/conf.yaml][4] file in the `conf.d/` folder at the root of your [Agent's configuration directory][3].

#### Minimal config

```yaml
instances:
  - network_address: "<NETWORK_ADDRESS>"
    community_string: "<COMMUNITY_STRING>"
```

#### Extended config

The following sample config provides required parameters, default values, and examples for Autodiscovery.

{{< code-block lang="yaml" filename="snmp.d/conf.yaml" disable_copy="true" >}}

init_config:
instances:
    ## @param network_address - string - optional
  - network_address: "<NETWORK_ADDRESS>"
    ## @param port - integer - optional - default: 161
    port: 161
    ## @param community_string - string - optional
    community_string: public
    ## @param snmp_version - integer - optional - default: 2
    snmp_version: 2
    ## @param timeout - integer - optional - default: 1
    timeout: 1
    ## @param retries - integer - optional - default: 5
    retries: 5
    ## @param discovery_interval - integer - optional - default: 3600
    discovery_interval: 3600
    ## @param discovery_allowed_failures
    ## integer - optional - default: 3
    discovery_allowed_failures: 3
    ## @param enforce_mib_constraints
    ## boolean - optional - default: true
    enforce_mib_constraints: true
    ## @param bulk_threshold - integer - optional - default: 5
    bulk_threshold: 5
    ## @param tags - list of key:value element - optional
    tags:
       - "<KEY_1>:<VALUE_1>"
       - "<KEY_2>:<VALUE_2>"

{{< /code-block >}}

## Validation

[Run the Agent's status subcommand][8] and look for `snmp` under the Checks section.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /network_monitoring/devices/profiles#sysoid-mapped-devices
[3]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[5]: /agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[7]: /agent
[8]: /agent/guide/agent-commands/#agent-status-and-information
