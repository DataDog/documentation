---
title: Datadog-Riak Integration
integration_title: Riak
git_integration_title: riak
kind: integration
doclevel: basic
---

{{< img src="integrations/riak/riak_graph.png" alt="Riak Graph" >}}

## Overview

Connect Riak to Datadog in order to:

  * Visualize Riak performance and utilization.
  * Correlate the performance of Riak with the rest of your applications.

## Configuration

**The Riak integration requires the Datadog Agent >= 3.5.0**

1. Configure the Agent to connect to Riak, edit `conf.d/riak.yaml`
{{< highlight yaml>}}
init_config:

instances:
    -    url: http://127.0.0.1:8098/stats
{{< /highlight >}}

2. Restart the Agent

{{< insert-example-links >}}

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell>}}
Checks
======

  [...]

  riak
  ----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}


