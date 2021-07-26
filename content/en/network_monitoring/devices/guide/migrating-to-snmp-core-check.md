---
title: Migrating to the SNMP Core Check (in Go) from the Python-based Check
kind: guide
further_reading:
- link: "network_monitoring/devices/setup"
  tag: "Documentation"
  text: "Learn more about NDM Setup"
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

### For non-K8s/DCA environments

1. Upgrade to Datadog Agent version 7.27+ for your corresponding Agent platform.

2. Update the `init_config` in the SNMP check to reference the new core check in `snmp.d/conf.yaml`.

``` yaml
  init_config
      loader: core
```
3. The following step is only applicable if you use Autodiscovery/subnet scanning: Move the configuration for each instance (subnet) from the SNMP check configuration to the main Datadog Agent `datadog.yaml`.

{{< tabs >}}
{{% tab "SNMPv2" %}}

```yaml
listeners:
  - name: snmp
snmp_listener:
  workers: 100              # number of workers used to discover devices concurrently
  discovery_interval: 3600  # seconds
  configs:
    - network: 1.2.3.4/24   # CIDR notation, we recommend no larger than /24 blocks
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
  workers: 100              # number of workers used to discover devices concurrently
  discovery_interval: 3600  # interval between each autodiscovery in seconds
  configs:
    - network: 1.2.3.4/24   # CIDR notation, we recommend no larger than /24 blocks
      snmp_version: 3
      user: "user"
      authProtocol: "fakeAuth"
      authKey: "fakeKey"
      privProtocol: "fakeProtocol"
      privKey: "fakePrivKey"
      tags:
        - "key1:val1"
        - "key2:val2"
    - network: 2.3.4.5/24
      version: 3
      snmp_version: 3
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

### DCA specific migration

Some parameters used in `snmp_listener` have changed. For example, `network_address` is now `network`, and `community_string` is now `community`. See the complete list of changed parameters below:

| Integration configs (Python & core) | snmp_listener                                                    |
| ----------------------------------- | -----------------------------------------------------------------|
| `community_string`                  | `community`                                                      |
| `network_address`                   | `network`                                                        |
| `authKey`                           | `authentication_key`                                             |
| `authProtocol`                      | `authentication_protocol`                                        |
| `privKey`                           | `privacy_key`                                                    |
| `privProtocol`                      | `privacy_protocol`                                               |
| `snmp_version`                      | `version`                                                        |
| `discovery_allowed_failures`        | `allowed_failures`, top config: `snmp_listener.allowed_failures` |

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
  -MIB: HOST-RESOURCES-MIB
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
  -MIB: HOST-RESOURCES-MIB
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
