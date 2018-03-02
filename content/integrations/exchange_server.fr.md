---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/exchange_server/
git_integration_title: exchange_server
guid: 7bc177b0-b07d-4a83-921f-9cd8deef039b
has_logo: true
integration_title: Exchange Server
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.21.0
name: exchange_server
public_title: Datadog-Exchange Server Integration
short_description: Collect and graph Microsoft exchange server metrics
support: core
supported_os:
- windows
version: 1.0.0
---



## Overview

Get metrics from Microsoft Exchange Server

* Visualize and monitor Exchange server performance

## Setup
### Installation

The Exchange check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your servers.

If you need the newest version of the Exchange check, install the `dd-check-exchange_server` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Edit the `exchange_server.yaml` file to collect Exchange Server performance data. See the [sample exchange_server.yaml](https://github.com/DataDog/integrations-core/blob/master/exchange_server/conf.yaml.example) for all available configuration options.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `exchange_server` under the Checks section:

    Checks
    ======

        exchange_server
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The exchange_server check is compatible with Windows.

## Data Collected
### Metrics
{{< get-metrics-from-git "exchange_server" >}}


### Events
The exchange server check does not include any events at this time.

### Service Checks
The exchange server check does not include any service check at this time.

