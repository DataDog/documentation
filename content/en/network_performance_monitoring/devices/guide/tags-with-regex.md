---
title: NDM Tags with Regex
kind: guide
further_reading:
- link: "/network_performance_monitoring/devices/setup"
  tag: "Documentation"
  text: "Network Device Monitoring Setup"
- link: "/getting_started/tagging"
  tag: "Documentation"
  text: "Getting Started with Tags"
---

Datadog Network Device Monitoring (NDM) supports regular expressions to create metric tags in the format `<KEY>:<VALUE>`.

## Setup

### Installation

Follow the [setup instructions][1] to install Datadog NDM.

### Configuration

In the [SNMP conf.yaml][2], you can specify `metric_tags` from a symbol or an OID. To create multiple tags for devices, use regular expressions to separate the resulting value into several tags, or get a substring using the regular [Python engine][3].

#### Symbol

The example below creates two tags using Regex matching on the symbol's value. If the symbol's value is `router-webserver`, the tags `device_type:router` and `host:webserver` are added to the corresponding metrics.

```yaml
    metric_tags:
     - # From a symbol
       MIB: SNMPv2-MIB
       symbol: sysName
       match: (.*)-(.*)
       tags:
           host: \2
           device_type: \1
```

#### OID

The example below creates two tags using Regex matching on the OID's value. If the OID's value is `41ba948911b9`, the tags `host_prefix:41` and `host:ba948911b9` are added to the corresponding metrics.

```yaml
    metric_tags:
     - # From an OID:
       OID: 1.3.6.1.2.1.1.5.0
       symbol: sysName
       match: (\d\d)(.*)
       tags:
           host_prefix: \1
           host: \2
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_performance_monitoring/devices/setup
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[3]: https://docs.python.org/3/library/re.html
