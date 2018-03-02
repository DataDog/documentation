---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/riak/
git_integration_title: riak
guid: e1ed642c-8a15-420c-954b-6fb894905956
has_logo: true
integration_title: Riak
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: riak
public_title: Datadog-Riak Integration
short_description: Track node, vnode and ring performance metrics for RiakKV or RiakTS.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---


{{< img src="integrations/riak/riak_graph.png" alt="Riak Graph" responsive="true" popup="true">}}

## Overview

This check lets you track node, vnode and ring performance metrics from RiakKV or RiakTS.

## Setup
### Installation

The Riak check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Riak servers.

If you need the newest version of the Riak check, install the `dd-check-riak` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `riak.yaml` in the Agent's `conf.d` directory. See the [sample riak.yaml](https://github.com/DataDog/integrations-core/blob/master/riak/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - url: http://127.0.0.1:8098/stats # or whatever your stats endpoint is
```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to start sending Riak metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `riak` under the Checks section:

```
  Checks
  ======
    [...]

    riak
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The riak check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "riak" >}}


### Events
The Riak check does not include any event at this time.

### Service Checks

**riak.can_connect**:

Returns CRITICAL if the Agent cannot connect to the Riak stats endpoint to collect metrics, otherwise OK.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

