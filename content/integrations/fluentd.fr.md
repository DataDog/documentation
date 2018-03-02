---
categories:
- logging
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/fluentd/
git_integration_title: fluentd
guid: 68100352-b993-43e6-9dc8-5ecd498e160b
has_logo: true
integration_title: FluentD
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: fluentd
public_title: Datadog-FluentD Integration
short_description: Monitor buffer queues and retry counts for each Fluentd plugin
  you've enabled.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---


{{< img src="integrations/fluentd/snapshot-fluentd.png" alt="Fluentd Dashboard" responsive="true" popup="true">}}
## Overview

Get metrics from Fluentd to:

* Visualize Fluentd performance.
* Correlate the performance of Fluentd with the rest of your applications.

## Setup
### Installation

The Fluentd check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Fluentd servers.

If you need the newest version of the Fluentd check, install the `dd-check-fluentd` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration
#### Prepare Fluentd

In your fluentd configuration, add a `monitor_agent` source:

```
<source>
  @type monitor_agent
  bind 0.0.0.0
  port 24220
</source>
```

#### Connect the Datadog Agent

Create a file `fluentd.yaml` in the Agent's `conf.d` directory. See the [sample fluentd.yaml](https://github.com/DataDog/integrations-core/blob/master/fluentd/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - monitor_agent_url: http://localhost:24220/api/plugins.json
    #tag_by: "type" # defaults to 'plugin_id'
    #plugin_ids:    # collect metrics only on your chosen plugin_ids (optional)
    #  - plg1
    #  - plg2
```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to begin sending Fluentd metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `fluentd` under the Checks section:

```
  Checks
  ======
    [...]

    fluentd
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```


## Data Collected
### Metrics
{{< get-metrics-from-git "fluentd" >}}


### Events
The FluentD check does not include any event at this time.

### Service Checks

`fluentd.is_ok`:

Returns 'Critical' if the Agent cannot connect to Fluentd to collect metrics. This is the check which most other integrations would call `can_connect`.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [How to monitor Fluentd with Datadog](https://www.datadoghq.com/blog/monitor-fluentd-datadog/)

