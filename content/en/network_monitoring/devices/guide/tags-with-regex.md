---
title: NDM Tags with Regex
aliases:
    - /network_performance_monitoring/devices/guide/tags-with-regex/
further_reading:
- link: "/network_monitoring/devices/snmp_metrics"
  tag: "Documentation"
  text: "Network Device Monitoring SNMP Metrics"
- link: "/getting_started/tagging"
  tag: "Documentation"
  text: "Getting Started with Tags"
---

Datadog Network Device Monitoring (NDM) supports regular expressions to create metric tags in the format `<KEY>:<VALUE>`.

## Setup

### Installation

Follow the [setup instructions][1] to install Datadog Network Device Monitoring, and start collecting SNMP Metrics and Traps.

### Configuration

In the [SNMP conf.yaml][2], you can specify `metric_tags` from an OID. To create multiple tags for devices, use regular expressions to separate the resulting value into multiple tags, or get a substring using the regular [Python engine][3].

#### OID

The example below creates two tags using regex matching on the OID's value. So, if the OID's value is `41ba948911b9`, the tags `host_prefix:41` and `host:ba948911b9` are added to the corresponding metrics.

```yaml
    metric_tags:
     - # From an OID:
       symbol:
          OID: 1.3.6.1.2.1.1.5.0
          name: sysName
       match: (\d\d)(.*)
       tags:
           host_prefix: \1
           host: \2
```

The example below creates tags using regex for a table:

```yaml
metrics:
  - MIB: IF-MIB
    table:
      OID: 1.3.6.1.2.1.2.2
      name: ifTable
    symbols:
      - OID: 1.3.6.1.2.1.2.2.1.10
        name: ifInOctets
    metric_tags:
      - column':
          OID: 1.3.6.1.2.1.2.2.1.2
          name: ifDescr
        match: '(\w)(\w+)'
        tags:
         - prefix: '\1'
         - suffix: '\2'
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/devices/snmp_metrics
[2]: https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/conf.yaml.example
[3]: https://docs.python.org/3/library/re.html
