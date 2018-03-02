---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/pdh_check/
git_integration_title: pdh_check
guid: D09B3410-00A0-4789-ABD7-7740C3FE211F
has_logo: true
integration_title: Pdh Check
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.21.0
name: pdh_check
public_title: Datadog-Pdh Check Integration
short_description: Collect and graph any Windows PDH metrics.
support: core
supported_os:
- windows
version: 1.1.0
---



## Overview

Get metrics from Windows performance counters in real time to:

* Visualize and monitor windows performance counters

## Setup
### Installation

The PDH check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your servers.

### Configuration

Edit the `pdh_check.yaml` file to collect Windows performance data. See the [sample pdh_check.yaml](https://github.com/DataDog/integrations-core/blob/master/pdh_check/conf.yaml.example) for all available configuration options.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `pdh_check` under the Checks section:

    Checks
    ======

        pdh_check
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The pdh_check check is compatible with Windows.

## Data Collected
### Metrics
See [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/pdh_check/metadata.csv) for a list of metrics provided by this integration.

### Events
The PDH check does not include any event at this time.

### Service Checks
The PDH check does not include any service check at this time.

