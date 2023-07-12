---
title: Topology Maps
kind: documentation
further_reading:
- link: "/network_monitoring/devices/data"
  tag: "Documentation"
  text: "Data Collected with Network Device Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Overview

Datadog Topology Maps show you the various network elements in your network as an interactive graph. Inspect the details and flows of your switches, routers, and other devices to gain insights into your network, and use the data to enhance troubleshooting, prediction capabilities, and network management.

{{< img src="/network_device_monitoring/topology_maps/topology_map.png" alt="The topology maps page in the Datadog application" style="width:80%;" >}}

## Setup

### Prerequisites

1. LLDP is enabled on the device with LLDP data exposed through SNMP.
2. Agent version 7.45 or later is installed.

### Enable Topology data collection

1. Follow the instructions for setting up [NDM Metrics collection][1].
2. Enable topology data collection with the `collect_topology: true` setting for your environment:

{{< tabs >}}
{{% tab "Autodiscovery setup" %}}
If you use autodiscovery through the `datadog.yaml` file, add `collect_topology` inside the `snmp_listener` section: 

{{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true" collapsible="false" >}}
listeners:
  - name: snmp
snmp_listener:
  workers: 100  # number of workers used to discover devices concurrently
  discovery_interval: 3600  # interval between each autodiscovery in seconds
  loader: core  # use core check implementation of SNMP integration. recommended
  use_device_id_as_hostname: true  # recommended
  collect_topology: true
  configs:
    - network_address: 10.10.0.0/24  # CIDR subnet
      snmp_version: 2
      port: 161
      community_string: '***'  # enclose with single quote
      tags:
      - "<key1>:<val1>"
      - "<key2>:<val2>"
{{< /code-block >}}
{{% /tab %}}

{{% tab "Individual device setup" %}}
If you monitor individual devices through configurations in `conf.d/snmp.d/conf.yaml` files, add `collect_topology` inside the `init_config` section: 

{{< code-block lang="yaml" filename="conf.yaml" disable_copy="true" collapsible="false" >}}
init_config:
  loader: core  # use core check implementation of SNMP integration. recommended
  use_device_id_as_hostname: true  # recommended
  collect_topology: true
instances:
- ip_address: '<1.2.3.4>'
  community_string: '<sample-string>'  # enclose with single quote
  tags:
    - '<key1>:<val1>'
    - '<key2>:<val2>'
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Validation

Verify that the device is exposing LLDP data with the following command:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/devices/snmp_metrics/