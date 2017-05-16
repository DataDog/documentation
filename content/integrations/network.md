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
---
# Overview

![Network Dashboard](/static/images/netdashboard.png)

The network check collects TCP and IP network metrics from the agent's host.


# Configuration

The network check is enabled by default. If you would like to make any changes to the check, rename `network.yaml.default` to `network.yaml` and edit:

    init_config:

    instances:
      # Network check only supports one configured instance
      - collect_connection_state: false
        excluded_interfaces:
          - lo
          - lo0
        # Optionally completely ignore any network interface
        # matching the given regex:
        # excluded_interface_re: my-network-interface.*

# Metrics

<%= get_metrics_from_git('system', 'system.net') %>
