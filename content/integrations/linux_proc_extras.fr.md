---
categories:
- os & system
ddtype: check
git_integration_title: linux_proc_extras
guid: 47f243d7-5df4-47b5-9f1a-923b4f7cefe7
has_logo: true
integration_title: Linux Proc Extras
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: linux_proc_extras
public_title: Datadog-Linux Proc Extras Integration
short_description: linux_proc_extras description.
support: core
supported_os:
- linux
version: 1.0.0
---



## Overview
Get metrics from linux_proc_extras service in real time to:

* Visualize and monitor linux_proc_extras states
* Be notified about linux_proc_extras failovers and events.

## Setup
### Installation

The Linux_proc_extras check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your servers.

### Configuration

Edit the `linux_proc_extras.yaml` file to point to your server and port, set the masters to monitor. See the [sample linux_proc_extras.yaml](https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/conf.yaml.example) for all available configuration options.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `linux_proc_extras` under the Checks section:

    Checks
    ======

        linux_proc_extras
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibility

The linux_proc_extras check is compatible with all major platforms

## Data Collected
### Metrics
The Linux proc extras check does not include any metric at this time.

### Events
The Linux proc extras check does not include any event at this time.

### Service Checks
The Linux proc extras check does not include any service check at this time.

## Troubleshooting

Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

