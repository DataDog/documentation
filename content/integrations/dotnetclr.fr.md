---
git_integration_title: dotnetclr
guid: 3d21557e-65bd-4b66-99b9-5521f32b5957
integration_title: ''
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: dotnetclr
short_description: dotnetclr description.
support: contrib
supported_os:
- windows
version: 0.1.0
---



## Overview

Get metrics from dotnetclr service in real time to:

* Visualize and monitor dotnetclr states
* Be notified about dotnetclr failovers and events.

## Installation

The Dotnetclr check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your servers.

If you need the newest version of the Dotnetclr check, install the `dd-check-dotnetclr` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

## Configuration

Edit the `dotnetclr.yaml` file to point to your server and port, set the masters to monitor

## Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `dotnetclr` under the Checks section:

    Checks
    ======

        dotnetclr
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The dotnetclr check is compatible with all major platforms

