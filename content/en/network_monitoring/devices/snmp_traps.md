---
title: SNMP Traps
kind: documentation
description: "Enable listening for SNMP Traps."
further_reading:
  - link: "https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/"
    tag: "Blog"
    text: "Monitor and diagnose network performance issues with SNMP Traps"
---

## Overview

SNMP Traps are notifications sent from an SNMP-enabled device to an SNMP manager. When a network device encounters unusual activity, such as a sudden state change on a piece of equipment, the device triggers an SNMP Trap event.

Monitoring SNMP Traps helps you to capture issues that might otherwise go unnoticed due to device instability. For example, if an interface is flapping between an available and a broken state every 15 seconds, relying on polls that run every 60 seconds could lead you to misjudge the degree of network instability. Traps can also fill visibility gaps for certain hardware components, such as device battery or chassis health.

Datadog Agent v7.37+ supports listening for SNMP Traps, enabling you to set up [monitors][1] for specific Trap events.

## Configuration

To enable listening for SNMP Traps, add the following to `datadog.yaml`:

```yaml
network_devices:
  namespace: <NAMESPACE> # optional, defaults to “default”.
  snmp_traps:
    enabled: true
    port: 9162 # on which ports to listen for traps
    community_strings: # which community strings to allow for v2 traps
      - <STRING_1>
      - <STRING_2>
    bind_host: 0.0.0.0
    users: # limited to only a single v3 user
      - username: 'user'
        authKey: 'fakeKey'
        authProtocol: 'SHA' # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
        privKey: 'fakePrivKey'
        privProtocol: 'AES' # choices: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
```

**Note**: Multiple v3 users and passwords are not supported. If this is a requirement in your environment, contact [Datadog support][2].

## Device namespaces

As in [Network Device Monitoring][3], namespaces can be used as tags to differentiate between multiple network devices that may share the same private IP. For example, consider a case of two routers: one in New York and one in Paris, which share the same private IP. There should be one Agent in the New York data center and another in the Paris data center. You may wish to tag these with `namespace: nyc` and `namespace: paris`, respectively.

The namespace can then be used to uniquely pivot from an SNMP Trap to the emitter device, or from the emitter device to an SNMP Trap. 

It is critical to have consistency between the multiple Agent configurations. For instance, if you have two Agents configured (for example, one for trap collection, and the other for metrics) you must ensure that the namespaces exist in both places. Alternatively, ensure that the namespaces exist in neither. 

## Resolution

Each SNMP Trap has a specific OID-based format. The Datadog Agent performs a _resolution_ step to convert OIDs into more readable strings.

An SNMP Trap consists of:
- Emitter information (for example, the IP of the device)
- An OID that defines the type of trap
- "Variables"—that is, a list of pairs (`OID:value`) that provides additional context for the trap.

Decoding is performed on the Agent side, using a mapping stored on disk at `$<PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/dd_traps_db.json.gz`. Datadog supports more than 11,000 different management information bases (MIBs).

### Mapping format

Mappings are stored as TrapsDB files, and can be YAML or JSON.

#### Examples

{{< tabs >}}
{{% tab "YAML" %}}
```yaml
mibs:
- NET-SNMP-EXAMPLES-MIB
traps:
  1.3.6.1.4.1.8072.2.3.0.1:
    mib: NET-SNMP-EXAMPLES-MIB
    name: netSnmpExampleHeartbeatNotification
vars:
  1.3.6.1.4.1.8072.2.3.2.1:
    name: netSnmpExampleHeartbeatRate
```
{{% /tab %}}
{{% tab "JSON" %}}
```json
{
  "mibs": [
    "NET-SNMP-EXAMPLES-MIB"
  ],
  "traps": {
    "1.3.6.1.4.1.8072.2.3.0.1": {
      "mib": "NET-SNMP-EXAMPLES-MIB",
      "name": "netSnmpExampleHeartbeatNotification"
    }
  },
  "vars": {
    "1.3.6.1.4.1.8072.2.3.2.1": {
      "name": "netSnmpExampleHeartbeatRate"
    }
  }
}
```
{{% /tab %}}
{{< /tabs >}}

### Extend the Agent

To extend the capabilities of the Agent, create your own mappings and place them in the `$<PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/` directory.

You can write these mappings by hand, or generate mappings from a list of MIBs using Datadog's developer toolkit, [`ddev`][4].

#### Generate a TrapsDB file from a list of MIBs

**Prerequisites**:
- Python 3
- [`ddev`][4] (`pip3 install "datadog-checks-dev[cli]"`)
- [`pysmi`][5] (`pip3 install pysmi`)

Put all your MIBs into a dedicated folder. Then, run:
`ddev meta snmp generate-traps-db -o ./output_dir/ /path/to/my/mib1 /path/to/my/mib2 /path/to/my/mib3 ...`

If your MIBs have dependencies, `ddev` fetches them online if they can be found. Alternatively, put all your dependencies in a separate folder and use the `--mib-sources` parameter to specify this folder.



[1]: /monitors/
[2]: /help/
[3]: /network_monitoring/devices
[4]: /developers/integrations/new_check_howto/?tab=configurationtemplate#developer-toolkit
[5]: https://pypi.org/project/pysmi/
