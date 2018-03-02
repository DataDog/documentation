---
aliases:
- /integrations/gearman
categories:
- processing
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/gearmand/
git_integration_title: gearmand
guid: bdd65394-92ff-4d51-bbe3-ba732663fdb2
has_logo: true
integration_title: Gearman
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: gearmand
public_title: Datadog-Gearman Integration
short_description: Track the number of jobs queued and running - in total or by task.
support: core
supported_os:
- linux
- mac_os
version: 1.0.1
---



## Overview

Collect Gearman metrics to:

* Visualize Gearman performance.
* Know how many tasks are queued or running.
* Correlate Gearman performance with the rest of your applications.

## Setup
### Installation

The Gearman check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Gearman job servers.
If you need the newest version of the Gearman check, install the `dd-check-gearman` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `gearmand.yaml` in the Agent's `conf.d` directory. See the [sample gearmand.yaml](https://github.com/DataDog/integrations-core/blob/master/gearmand/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - server: localhost
    port: 4730
```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to begin sending Gearman metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `gearmand` under the Checks section:

```
  Checks
  ======
    [...]

    gearmand
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The gearmand check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "gearmand" >}}


### Events
The Gearmand check does not include any event at this time.

### Service Checks

`gearman.can_connect`:

Returns `Critical` if the Agent cannot connect to Gearman to collect metrics.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

