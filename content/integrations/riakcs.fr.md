---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/riakcs/
git_integration_title: riakcs
guid: 55ba6b94-8eeb-486b-aa94-6366a044fdf0
has_logo: true
integration_title: Riak CS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: riakcs
public_title: Datadog-Riak CS Integration
short_description: Track the rate and mean latency of GETs, PUTs, DELETEs, and other
  operations.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Overview

Capture RiakCS metrics in Datadog to:

* Visualize key RiakCS metrics.
* Correlate RiakCS performance with the rest of your applications.

## Setup
### Installation

The RiakCS check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your RiakCS nodes.

If you need the newest version of the RiakCS check, install the `dd-check-riakcs` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `riakcs.yaml` in the Agent's `conf.d` directory. See the [sample riakcs.yaml](https://github.com/DataDog/integrations-core/blob/master/riakcs/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - host: localhost
    port: 8080
    access_id: <YOUR_ACCESS_KEY>
    access_secret: <YOUR_ACCESS_SECRET>


```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to start sending RiakCS metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `riakcs` under the Checks section:

```
  Checks
  ======
    [...]

    riakcs
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The riakcs check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "riakcs" >}}


### Events
The RiackCS check does not include any event at this time.

### Service Checks

**riakcs.can_connect**:

Returns CRITICAL if the Agent cannot connect to the RiakCS endpoint to collect metrics, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
To get a better idea of how (or why) to monitor Riak CS performance and availability with Datadog, check out our [series of blog posts](https://www.datadoghq.com/blog/monitor-riak-cs-performance-and-availability/) about it.

