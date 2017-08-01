---
title: Datadog-Couchbase Integration
integration_title: Couchbase
kind: integration
doclevel: basic
git_integration_title: couchbase
---

{{< img src="integrations/couchbase/couchbase_graph.png" alt="couchbase graph" >}}

## Overview

Identify busy buckets, track cache miss ratios, and more. This Agent check collects metrics like:

* Hard disk and memory used by data
* Current connections
* Total objects
* Operations per second
* Disk write queue size

And many more.

# Installation

The Couchbase check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Couchbase nodes.

## Configuration 

To capture Couchbase metrics you need to install the Datadog Agent.

1. Configure the Agent to connect to Couchbase, edit `conf.d/couchbase.yaml`
{{< highlight yaml >}}
init_config:

instances:
    -   server: http://localhost:8091
        tags:
            -   foo
{{< /highlight >}}

2. Restart the Agent

{{< insert-example-links >}}

## Validation
Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

{{< highlight shell>}}
Checks
======

  [...]

  couchbase
  ---------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}

# Service Checks

`couchbase.can_connect`:

Returns `Critical` if the Agent cannot connect to Couchbase to collect metrics.

# Further Reading

To get a better idea of how (or why) to integrate your Couchbase cluster with Datadog, check out our [blog post](https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog/) about it.
