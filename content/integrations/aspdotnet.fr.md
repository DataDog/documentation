---
git_integration_title: aspdotnet
guid: 475b0c6c-02e5-49ef-806b-9fab377f0839
integration_title: ''
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: aspdotnet
short_description: aspdotnet description.
support: contrib
supported_os:
- windows
version: 0.1.0
---



## Overview

Get metrics from aspdotnet service in real time to:

* Visualize and monitor aspdotnet states
* Be notified about aspdotnet failovers and events.

## Installation

The Aspdotnet check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your servers.

If you need the newest version of the Aspdotnet check, install the `dd-check-aspdotnet` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

## Configuration

Edit the `aspdotnet.yaml` file to point to your server and port, set the masters to monitor

## Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `aspdotnet` under the Checks section:

    Checks
    ======

        aspdotnet
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The aspdotnet check is compatible with all major platforms

