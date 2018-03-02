---
categories:
- processing
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/mapreduce/
git_integration_title: mapreduce
guid: 1c143492-84ac-42d2-89d5-a45c718092b0
has_logo: true
integration_title: Map Reduce
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: mapreduce
public_title: Datadog-Map Reduce Integration
short_description: Monitor the status and duration of map and reduce tasks.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Overview

Get metrics from mapreduce service in real time to:

* Visualize and monitor mapreduce states
* Be notified about mapreduce failovers and events.

## Setup
### Installation

The Mapreduce check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your servers.

### Configuration

Edit the `mapreduce.yaml` file to point to your server and port, set the masters to monitor. See the [sample mapreduce.yaml](https://github.com/DataDog/integrations-core/blob/master/mapreduce/conf.yaml.example) for all available configuration options.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `mapreduce` under the Checks section:

    Checks
    ======

        mapreduce
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The mapreduce check is compatible with all major platforms

## Data Collected
### Metrics
{{< get-metrics-from-git "mapreduce" >}}


### Events
The Mapreduce check does not include any event at this time.

### Service Checks
The Mapreduce check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Hadoop architectural overview](https://www.datadoghq.com/blog/hadoop-architecture-overview/)
* [How to monitor Hadoop metrics](https://www.datadoghq.com/blog/monitor-hadoop-metrics/)
* [How to collect Hadoop metrics](https://www.datadoghq.com/blog/collecting-hadoop-metrics/)
* [How to monitor Hadoop with Datadog](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog/)

