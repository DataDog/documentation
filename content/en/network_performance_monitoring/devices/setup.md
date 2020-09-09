---
title: NDM Setup
kind: documentation
further_reading:
- link: "/network_performance_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Using Profiles with Network Device Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Installation

Network Device Monitoring is included in the [Datadog Agent][1] package. No additional installation is necessary.

## Configuration

Datadog Network Device Monitoring automatically discovers network devices on a provided subnet, and collects metrics using Datadog's sysOID mapped device profiles.

### Standard

For the standard configuration:

1. Edit the subnet and SNMP version in the `snmp.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][2]. See the [sample snmp.d/conf.yaml][3] for all available configuration options.

2. [Restart the Agent][4].

### Autodiscovery

To use Autodiscovery with Network Device Monitoring:

1. Install or upgrade the Datadog Agent to v6.16+. For platform specific instructions, see the [Datadog Agent][5] documentation.

2. Edit the [snmp.d/conf.yaml][3] file in the `conf.d/` folder at the root of your [Agent's configuration directory][2].

#### Sample config

The following sample config provides required parameters, default values, and examples for Autodiscovery.

{{< code-block lang="yaml" filename="snmp.d/conf.yaml" disable_copy="true" >}}
```yaml
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
```
{{< /code-block >}}

## Validation

[Run the Agent's status subcommand][6] and look for `snmp` under the Checks section.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[4]: /agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: /agent
[6]: /agent/guide/agent-commands/#agent-status-and-information
