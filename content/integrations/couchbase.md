---
title: Datadog-Couchbase Integration
integration_title: Couchbase
kind: integration
doclevel: basic
git_integration_title: couchbase
---

{{< img src="integrations/couchbase/couchbase_graph.png" alt="couchbase graph" >}}

## Overview

Get metrics from Couchbase in real time to

* Visualize key Couchbase metrics
* Correlate Couchbase performance with the rest of your applications

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
