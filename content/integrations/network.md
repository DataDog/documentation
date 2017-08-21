---
title: Network check
integration_title: Network Check
kind: integration
newhlevel: true
platformmetrics:
  system.net.tcp.retrans_packs:
    - BSD
  system.net.tcp.sent_packs:
    - BSD
  system.net.tcp.rcv_packs:
    - BSD
  system.net.tcp.retrans_segs:
    - Solaris
  system.net.tcp.in_segs:
    - Solaris
  system.net.tcp.out_segs:
    - Solaris
description: "{{< get-desc-from-git >}}"
---

{{< img src="integrations/network/netdashboard.png" alt="Network Dashboard" >}}

## Overview

The network check collects TCP and IP network metrics from the agent's host.

## Setup
### Configuration

The network check is enabled by default. If you would like to make any changes to the check, rename `network.yaml.default` to `network.yaml` and edit:
{{< highlight yaml>}}
init_config:

instances:
  # Network check only supports one configured instance
  - collect_connection_state: false # set to true to collect TCP connection state metrics, e.g. SYN_SENT, ESTABLISHED
    excluded_interfaces:
      - lo
      - lo0
    # Optionally completely ignore any network interface
    # matching the given regex:
    # excluded_interface_re: my-network-interface.*
{{< /highlight >}}

## Data Collected
### Metrics

{{< get-metrics-from-git "network" >}}