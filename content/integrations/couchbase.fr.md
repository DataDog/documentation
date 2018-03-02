---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/couchbase/
git_integration_title: couchbase
guid: ba7ce7de-4fcb-4418-8c90-329baa6a5d59
has_logo: true
integration_title: CouchBase
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: couchbase
public_title: Datadog-CouchBase Integration
short_description: Track and graph your Couchbase activity and performance metrics.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.2.0
---


{{< img src="integrations/couchbase/couchbase_graph.png" alt="couchbase graph" responsive="true" popup="true">}}
## Overview

Identify busy buckets, track cache miss ratios, and more. This Agent check collects metrics like:

* Hard disk and memory used by data
* Current connections
* Total objects
* Operations per second
* Disk write queue size

And many more.

## Setup
### Installation

The Couchbase check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Couchbase nodes.

If you need the newest version of the Couchbase check, install the `dd-check-couchbase` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `couchbase.yaml` in the Agent's `conf.d` directory. See the [sample couchbase.yaml](https://github.com/DataDog/integrations-core/blob/master/couchbase/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - server: http://localhost:8091 # or wherever your Couchbase is listening
    #user: <your_username>
    #password: <your_password>
```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to begin sending Couchbase metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `couchbase` under the Checks section:

```
  Checks
  ======
    [...]

    couchbase
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The couchbase check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "couchbase" >}}


### Events
The Couchbase check does not include any event at this time.

### Service Checks

`couchbase.can_connect`:

Returns `Critical` if the Agent cannot connect to Couchbase to collect metrics.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Monitor key Couchbase metrics](https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog/).

