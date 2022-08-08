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

[1]: /monitors/
[2]: /help/
[3]: /network_monitoring/devices
