---
title: Migrating to the SNMP Core Check (in Go) from the Python-based Check
kind: guide
further_reading:
- link: "network_monitoring/devices/setup"
  tag: "Documentation"
  text: "Learn more about NDM Setup"
---

## Overview

Agent 7.27.0 introduces a new SNMP check version in Go that has both memory and performance improvements to the Agent when monitoring devices using SNMP. The purpose of this guide is to assist in migration over to the new Core Check.

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

### Migrating custom profiles (independent of deployment)

SNMP no longer supports only listing OIDs by their human-readable name. You can reference by address (table name and index) or MIB entry address. If you have written any profiles yourself or modified any existing profiles, migrate them to the new format. Below is an example of updating Scalar symbols.

**Before Agent 7.27.0:**

```yaml
metrics:
  - MIB: HOST-RESOURCES-MIB
  symbol: hrSystemUptime
```

**With Agent 7.27.0:**

```yaml
metrics:
  - MIB: HOST-RESOURCES-MIB
  symbol:
    OID: 1.3.6.1.2.1.25.1.1.0
    name: hrSystemUptime
```
