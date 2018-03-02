---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/system_swap/
git_integration_title: system_swap
guid: 4b3dcc12-7bc9-474a-960f-14680eb587a3
has_logo: true
integration_title: System Swap
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: system_swap
public_title: Datadog-System Swap Integration
short_description: Adds some optional swap memory checks.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Overview

This check monitors the number of bytes a host has swapped in and swapped out.

## Setup
### Installation

The system swap check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on any host.

### Configuration

Create a blank Agent check configuration file called `system_swap.yaml` in the Agent's `conf.d` directory. See the [sample system_swap.yaml](https://github.com/DataDog/integrations-core/blob/master/system_swap/conf.yaml.example) for all available configuration options:

```

init_config:

instances: [{}]
```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to start collecting swap metrics.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `system_swap` under the Checks section:

```
  Checks
  ======
    [...]

    system_swap
    -------
      - instance #0 [OK]
      - Collected 2 metrics, 0 events & 0 service checks

    [...]
```

## Compatibility

The system_swap check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "system_swap" >}}


### Events
The System Swap check does not include any event at this time.

### Service Checks
The System Swap check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

