---
title: SNMP Traps
kind: documentation
description: "Enable listening for SNMP traps."
---

## Overview

SNMP traps are notifications sent from an SNMP-enabled device to an SNMP manager. Datadog Agent v7.37+ supports listening for SNMP traps.

## Configuration

To enable listening for SNMP traps, add the following to `datadog.yaml`:

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

**Note**: Multiple v3 users/passwords are not supported. If this is a requirement in your environment, contact [Datadog support][]

## Device namespaces

As in Network Device Monitoring, namespaces can be used as tags to differentiate between multiple network devices that may share the same private IP. For example, consider a case of two routers: one in New York, and one in Paris, which share the same private IP. There should be one Agent in the New York datacenter and another in the Paris datacenter. You may wish to tag these with `namespace: nyc` and `namespace: paris`, respectively.

The namespace can then be used to uniquely pivot from an SNMP trap to the emitter device, or from the emitter device to an SNMP trap. If you have multiple Agents configured( one for trap collection, and the other for metrics) you should ensure that the namespaces exist in both places. Alternatively, ensure that the namespaces exist in neither. It is critical to have consistency between the two Agent configurations. 
