---
categories:
- processing
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/storm/
git_integration_title: storm
guid: 5a9ec2c3-8ea0-4337-8c45-a6b8a36b8721
has_logo: false
integration_title: Storm
is_public: true
kind: integration
maintainer: cody.lee@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 7.0.0
min_agent_version: 5.6.3
name: storm
public_title: Datadog-Storm Integration
short_description: Apache Storm 1.x.x Topology Execution Stats
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Overview

Get metrics from Storm service in real time to:

* Visualize and monitor storm cluster and topology metrics.
* Be notified about storm failovers and events.

## Setup
### Installation

Install the `dd-check-storm` package manually or with your favorite configuration manager.

### Configuration

Edit the `storm.yaml` file to point to your server and port, set the masters to monitor.

### Validation

[Run the Agent's `info` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/), you should see something like the following:

    Checks
    ======

        storm
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The storm check is compatible with all major platforms, and apache storm version 1.x.x line.

## Data Collected
### Metrics
{{< get-metrics-from-git "storm" >}}


### Events
The Storm check does not include any events at this time.

### Service Checks
The Storm check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
