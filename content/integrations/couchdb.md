---
title: Datadog-CouchDB Integration
integration_title: CouchDB
kind: integration
git_integration_title: couchdb
---

{{< img src="integrations/couchdb/couchdb_graph.png" alt="CouchDb Graph"  style="width:60%;" >}}

## Overview

Capture CouchDB data in Datadog to:

* Visualize key CouchDB metrics.
* Correlate CouchDB performance with the rest of your applications.

## Setup
### Installation

The CouchDB check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your CouchDB servers.

### Configuration 

To capture CouchDB metrics you need to install the Datadog Agent.

1. Configure the Agent to connect to CouchDB, edit `conf.d/couch.yaml`
{{< highlight yaml >}}
init_config:

instances:
    - server: http://localhost:5984
{{< /highlight >}}

2. Restart the Agent

{{< insert-example-links conf="couch" check="couch" >}}

### Validation 

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell >}}
Checks
======

  [...]

  couch
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Data Collected
### Metrics

{{< get-metrics-from-git "couch" >}}

### Service Checks

`couchdb.can_connect`:

Returns `Critical` if the Agent cannot connect to CouchDB to collect metrics.

## Further Reading
### Blog Article
To get a better idea of how (or why) to integrate your CouchDB cluster with Datadog, check out our [blog post](https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog/) about it.