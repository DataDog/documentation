---
title: Migrating to the SNMP Core Check (in Go) from the Python-based Check
further_reading:
- link: network_monitoring/devices/setup
  tag: Documentation
  text: Learn more about NDM Setup
---

## Overview

The Datadog Agent 7.27.0 introduces a new SNMP check version in Go that has both memory and performance improvements to the Agent when monitoring devices using SNMP. The purpose of this guide is to assist in migration over to the new core check.

### Agent v7.27.0 changes

- Autodiscovery is now a core Agent process, and needs to be loaded in the main SNMP integration check with `loader:core` under the `init_config`, and configured in the main Datadog Agent `datadog.yaml`.

- Direct reference to MIBs by their human readable names only are no longer supported. Instead, all OID references should be made by their numerical address, and human readable name. All Datadog shipped profiles have been updated, but custom profiles will need to be updated. Examples for migration are provided below.

- The Core check does not support manually compiling MIBs to be used as a profile, therefore the following parameters are no longer supported:
  - `mibs_folder`
  - `optimize_mib_memory_usage`
  - `enforce_mib_constraints`
  - `bulk_threshold` - Removed this in favor of other `GET` functions

## Instructions

1. Upgrade to Datadog Agent version 7.27+ for your corresponding Agent platform.

2. Update the `init_config` in the SNMP check to reference the new core check in `snmp.d/conf.yaml`.

``` yaml
  init_config:
      loader: core
```
3. The following step is only applicable if you use Autodiscovery/subnet scanning: Move the configuration for each instance (subnet) from the SNMP check configuration to the main Datadog Agent `datadog.yaml`.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
network_devices:
  autodiscovery:
    workers: 100  # number of workers used to discover devices concurrently
    discovery_interval: 3600  # interval between each autodiscovery in seconds
    loader: core  # use core check implementation of SNMP integration. recommended
    use_device_id_as_hostname: true  # recommended
    configs:
      - network_address: 10.10.0.0/24  # CIDR subnet
        snmp_version: 2
        port: 161
        community_string: '***'  # enclose with single quote
        tags:
        - "key1:val1"
        - "key2:val2"
      - network_address: 10.20.0.0/24
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
network_devices:
  autodiscovery:
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
        privProtocol: 'AES256'  # choices: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
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

**Note**: Make sure you are on Agent 7.53+ for this syntax. For previous versions, see the [previous config_template.yaml][1]

### Migrating custom profiles (independent of deployment)

SNMP no longer supports only listing OIDs by their human-readable name. You can reference by address (table name and index) or MIB entry address. If you have written any profiles yourself or modified any existing profiles, migrate them to the new format. Below are examples of migration.

#### Scalar symbols

**Before Agent 7.27.0:**

{{< code-block lang="yaml" filename="scalar_symbols.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    symbol: hrSystemUptime
{{< /code-block >}}

**With Agent 7.27.0:**

{{< code-block lang="yaml" filename="scalar_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    symbol:
      OID: 1.3.6.1.2.1.25.1.1.0
      name: hrSystemUptime
{{< /code-block >}}

#### Table symbols

**Before Agent 7.27.0:**

{{< code-block lang="yaml" filename="table_symbols.yaml" >}}

metrics:
  - MIB: HOST-RESOURCES-MIB
    table: hrStorageTable
    symbols:
      - hrStorageAllocationUnits
      - hrStoageSize
    metrics_tags:
      - tag: storagedec
        column: hrStorageDescr

{{< /code-block >}}


**With Agent 7.27.0:**

{{< code-block lang="yaml" filename="table_symbols_7_27.yaml" >}}
metrics:
  - MIB: HOST-RESOURCES-MIB
    table:
      OID: 1.3.6.1.2.1.25.2.3
      name: hrStorageTable
    symbols:
      - OID: 1.3.6.1.2.1.25.2.3.1.4
        name: hrStorageAllocationUnits
      - OID: 1.3.6.1.2.1.25.2.3.1.5
        name: hrStoageSize
    metrics_tags:
      - tag: storagedec
        column:
          OID: 1.3.6.1.2.1.25.2.3.1.3
          name: hrStorageDescr
{{< /code-block >}}


#### Metrics tags

**Before Agent 7.27.0:**

{{< code-block lang="yaml" filename="metrics_tags.yaml" >}}
metrics_tags:
  - symbol: sysName
    tag: snmp_host
{{< /code-block >}}

**With Agent 7.27.0:**

{{< code-block lang="yaml" filename="metrics_tags_7_27.yaml" >}}
metrics_tags:
  - OID: 1.3.6.1.2.1.1.5.0
    symbol: sysName
    tag: snmp_host
{{< /code-block >}}

[1]: https://github.com/DataDog/datadog-agent/blob/51dd4482466cc052d301666628b7c8f97a07662b/pkg/config/config_template.yaml#L855