---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/stardog/
git_integration_title: stardog
guid: 1b32f0d4-49ef-40fb-aec3-365e4e7cd6ee
has_logo: false
integration_title: Stardog
is_public: true
kind: integration
maintainer: support@stardog.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: stardog
public_title: Datadog-Stardog Integration
short_description: A Stardog data collector for DataDog.
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 0.1.0
---



## Overview

Get metrics from Stardog service in real time to:

* Visualize and monitor Stardog states
* Be notified about Stardog failovers and events.

## Setup
### Installation

Install the `dd-check-stardog` package manually or with your favorite configuration manager.

### Configuration

Edit the `stardog.yaml` file to point to your server and set the admin username and password.

### Validation

[Run the Agent's `info` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/), you should see something like the following:

    Checks
    ======

        stardog
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The Stardog check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "stardog" >}}


### Events
The Stardog check does not include any events at this time.

### Service Checks
The Stardog check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).
