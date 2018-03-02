---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/btrfs/
git_integration_title: btrfs
guid: 54f9329a-8270-4f5a-bd4b-cd169abfc791
has_logo: true
integration_title: Btrfs
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: btrfs
public_title: Datadog-Btrfs Integration
short_description: Monitor usage on Btrfs volumes so you can respond before they fill
  up.
support: core
supported_os:
- linux
- mac_os
version: 1.0.0
---


{{< img src="integrations/btrfs/btrfs_metric.png" alt="btrfs metric" responsive="true" popup="true">}}
## Overview

Get metrics from btrfs service in real time to:

* Visualize and monitor btrfs states
* Be notified about btrfs failovers and events.

## Setup
### Installation

The Btrfs check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on every server that uses at least one Btrfs filesystem.

If you need the newest version of the Btrfs check, install the `dd-check-btrfs` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

1. Configure the Agent according to your needs, edit `conf.d/btrfs.yaml`. See the [sample btrfs.yaml](https://github.com/DataDog/integrations-core/blob/master/btrfs/conf.yaml.example) for all available configuration options.
2. [Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent)

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `btrfs` under the Checks section:

```
  Checks
  ======
    [...]

    btrfs
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The Btrfs check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "btrfs" >}}


### Events
The Btrfs check does not include any event at this time.

### Service Checks
The Btrfs check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

