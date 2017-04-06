---
title: Network check
integration_title: Network Check
kind: integration
newhlevel: true
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

**Note:** To collect connection state metrics, enable the option `collect_connection_state:` by changing it to **true**.


# Metrics

<%= get_metrics_from_git('system', 'system.net') %>
