---
categories:
- web
- network
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/network/
git_integration_title: network
guid: 43631795-8a1f-404d-83ae-397639a84050
has_logo: true
integration_title: Network
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: network
public_title: Datadog-Network Integration
short_description: Track bytes and packets in/out, connection states, round trip times,
  and more.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.4.0
---


{{< img src="integrations/network/netdashboard.png" alt="Network Dashboard" responsive="true" popup="true">}}
## Overview

The network check collects TCP/IP stats from the host operating system.

## Setup
### Installation

The network check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on any host.

If you need the newest version of the Network check, install the `dd-check-network` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

The Agent enables the network check by default, but if you want to configure the check yourself, create a file `network.yaml` in the Agent's `conf.d` directory. See the [sample network.yaml](https://github.com/DataDog/integrations-core/blob/master/network/conf.yaml.default) for all available configuration options:

```
init_config:

instances:
  # Network check only supports one configured instance
  - collect_connection_state: false # set to true to collect TCP connection state metrics, e.g. SYN_SENT, ESTABLISHED
    excluded_interfaces: # the check will collect metrics on all other interfaces
      - lo
      - lo0


```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to effect any configuration changes.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `network` under the Checks section:

```
  Checks
  ======
    [...]

    network
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 0 service checks

    [...]
```

## Compatibility

The network check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "network" >}}


### Events
The Network check does not include any event at this time.

### Service Checks
The Network check does not include any service check at this time.

## Troubleshooting

* [How to send TCP/UDP host metrics via the Datadog API ?](https://docs.datadoghq.com/integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api)

## Further Reading
### Datadog Blog
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

### Knowledge Base
* [Built a network monitor on an http check](https://docs.datadoghq.com/monitors/monitor_types/network)

