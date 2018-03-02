---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/kyototycoon/
git_integration_title: kyototycoon
guid: 2661668b-d804-4c8d-96a7-8019525add8c
has_logo: true
integration_title: Kyoto Tycoon
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: kyototycoon
public_title: Datadog-Kyoto Tycoon Integration
short_description: Track get, set, and delete operations; monitor replication lag.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---



## Overview

The Agent's KyotoTycoon check tracks get, set, and delete operations, and lets you monitor replication lag.

## Setup
### Installation

The KyotoTycoon check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your KyotoTycoon servers.
If you need the newest version of the KyotoTycoon check, install the `dd-check-kyototycoon` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `kyototycoon.yaml` in the Agent's `conf.d` directory. See the [sample kyototycoon.yaml](https://github.com/DataDog/integrations-core/blob/master/kyototycoon/conf.yaml.example) for all available configuration options:

```
init_config:

instances:






- report_url: http://localhost:1978/rpc/report




```

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `kyototycoon` under the Checks section:

```
  Checks
  ======
    [...]

    kyototycoon
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The KyotoTycoon check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "kyototycoon" >}}


### Events
The KyotoTycoon check does not include any event at this time.

### Service Checks

`kyototycoon.can_connect`:

Returns CRITICAL if the Agent cannot connect to KyotoTycoon to collect metrics, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

