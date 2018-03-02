---
categories:
- monitoring
- notification
- network
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/snmpwalk/
git_integration_title: snmpwalk
guid: a2864821-994c-4ebb-8532-b6879ea9a9ab
has_logo: false
integration_title: SNMP walk
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: snmpwalk
public_title: Datadog-SNMP walk Integration
short_description: snmpwalk description.
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 0.1.0
---



## Overview

Get metrics from SNMP walk service in real time to:

* Visualize and monitor SNMP walk states
* Be notified about SNMP walk failovers and events.

## Setup
### Installation

Install the `dd-check-snmpwalk` package manually or with your favorite configuration manager.

### Configuration

Edit the `snmpwalk.yaml` file to point to your server and port, set the masters to monitor.

### Validation

[Run the Agent's `info` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/), you should see something like the following:

    Checks
    ======

        snmpwalk
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The SNMP walk check is compatible with all major platforms.

## Data Collected
### Metrics

The SNMP walk check does not include any metrics at this time.

### Events
The SNMP walk check does not include any events at this time.

### Service Checks
The SNMP walk check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
