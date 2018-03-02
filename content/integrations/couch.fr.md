---
aliases:
- /integrations/couchdb
categories:
- data store
ddtype: check
description: Apache CouchDB is a document-oriented database that can be queried and
  indexed using JavaScript in a MapReduce fashion.
display_name: couch
doc_link: https://docs.datadoghq.com/integrations/couch/
git_integration_title: couch
guid: 9e7ed68c-669a-40f0-8564-548d49aa8098
has_logo: true
integration_title: CouchDB
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: couch
public_title: Datadog-CouchDB Integration
short_description: Track and graph your CouchDB activity and performance metrics.
support: core
supported_os:
- linux
- mac_os
- windows
version: 2.4.0
---


{{< img src="integrations/couchdb/couchdb_graph.png" alt="CouchDb Graph" responsive="true" popup="true">}}
## Overview

Capture CouchDB data in Datadog to:

* Visualize key CouchDB metrics.
* Correlate CouchDB performance with the rest of your applications.

For performance reasons, the CouchDB version you're using is cached, so you cannot monitor CouchDB instances with different versions with the same agent instance.

## Setup
### Installation

The CouchDB check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your CouchDB servers.

If you need the newest version of the CouchDB check, install the `dd-check-couchdb` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

Create a file `couch.yaml` in the Agent's `conf.d` directory. See the [sample  couch.yaml](https://github.com/DataDog/integrations-core/blob/master/couch/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - server: http://localhost:5984 # or wherever your CouchDB is listening
  #user: <your_username>
  #password: <your_password>
  #name: <A node's Erlang name> # Only for CouchDB 2.x
  #max_nodes_per_check: If no name is specified, the agent will scan all nodes up. As that may be very long, you can limit how many to collect per check. Default: 20
  #max_dbs_per_check. Maximum number of databases to report on. Default: 50
  #tags: A list of tags applied to all metrics collected. Tags may be simple strings or key-value pairs. Default: []
```

Optionally, provide a `db_whitelist` and `db_blacklist` to control which databases the Agent should and should not collect metrics from.

[Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent) to begin sending CouchDB metrics to Datadog.

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `couch` under the Checks section:

```
  Checks
  ======
    [...]

    couch
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Data Collected
### Metrics
{{< get-metrics-from-git "couch" >}}


### Events

The Couch check does not include any event at this time.

### Service Checks

`couchdb.can_connect`: Returns `Critical` if the Agent cannot connect to CouchDB to collect metrics.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Monitoring CouchDB performance with Datadog](https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog/)

