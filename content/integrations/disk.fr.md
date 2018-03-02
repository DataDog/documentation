---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/disk/
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
has_logo: true
integration_title: Disk
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: disk
public_title: Datadog-Disk Integration
short_description: The disk check gathers metrics on mounted disks.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Overview

Collect metrics related to disk usage and IO.

## Setup
### Installation

The disk check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) anywhere you wish to use it.

If you need the newest version of the Disk check, install the `dd-check-disk` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

The disk check is enabled by default, and the Agent will collect metrics on all local partitions. If you want to configure the check with custom options, create a file `disk.yaml` in the Agent's `conf.d` directory. See the [sample disk.yaml](https://github.com/DataDog/integrations-core/blob/master/disk/conf.yaml.default) for all available configuration options.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `disk` under the Checks section:

```
  Checks
  ======
    [...]

    disk
    -------
      - instance #0 [OK]
      - Collected 40 metrics, 0 events & 0 service checks

    [...]
```

## Data Collected
### Metrics
{{< get-metrics-from-git "disk" >}}


### Events
The Disk check does not include any event at this time.

### Service Checks
The Disk check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

