---
git_integration_title: kubelet
guid: 55039e21-7e89-41fb-968c-ab8bf8f25da0
integration_title: ''
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
max_agent_version: 7.0.0
min_agent_version: 6.0.0
name: kubelet
short_description: Collects container stats from kubelet.
support: core
supported_os:
- linux
---



## Overview

This integration gets container metrics from kubelet

* Visualize and monitor kubelet stats
* Be notified about kubelet failovers and events.

## Installation

Install the `dd-check-kubelet` package manually or with your favorite configuration manager

## Configuration

Edit the `kubelet.yaml` file to point to your server and port, set tags to send along with metrics.

## Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `kubelet` under the Checks section:

    Checks
    ======

        kubelet
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The kubelet check is compatible with Kubernetes version 1.8 or superior.

