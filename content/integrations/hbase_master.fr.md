---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/hbase_master/
git_integration_title: hbase_master
guid: b45e0f05-8ece-4d5c-946b-ce0ee8057e68
has_logo: false
integration_title: Hbase Master
is_public: true
kind: integration
maintainer: everpeace
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: hbase_master
public_title: Datadog-Hbase Master Integration
short_description: HBase master integration.
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 0.1.0
---



## Overview

Get metrics from hbase_master service in real time to:

* Visualize and monitor hbase_master states.
* Be notified about hbase_master failovers and events.

## Setup
### Installation

Install the `dd-check-hbase_master` package manually or with your favorite configuration manager.

### Configuration

Edit the `hbase_master.yaml` file to point to your server and port, set the masters to monitor.

### Validation

[Run the Agent's `info` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/), you should see something like the following:

    Checks
    ======

        hbase_master
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 0 service checks

## Compatibility

The hbase_master check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "hbase_master" >}}


### Events
The Hbase Master check does not include any events at this time.

### Service Checks
The Hbase Master check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).


## Hbase_regionserver Integration

## Overview

Get metrics from hbase_regionserver service in real time to:

* Visualize and monitor hbase_regionserver states.
* Be notified about hbase_regionserver failovers and events.

## Setup
### Installation

Install the `dd-check-hbase_regionserver` package manually or with your favorite configuration manager.

### Configuration

Edit the `hbase_regionserver.yaml` file to point to your server and port, set the masters to monitor.

### Validation

[Run the Agent's `info` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/), you should see something like the following:

    Checks
    ======

        hbase_regionserver
        -----------
          - instance #0 [OK]
          - Collected 150 metrics, 0 events & 0 service checks

## Compatibility

The hbase_regionserver check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "hbase_regionserver" >}}


### Events
The Hbase Region Server check does not include any events at this time.

### Service Checks
The Hbase Region Server check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
