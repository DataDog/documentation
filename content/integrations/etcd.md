---
title: Datadog-etcd Integration
integration_title: etcd
kind: integration
git_integration_title: etcd
---

{{< img src="integrations/etcd/etcd_graph.png" alt="Etcd Graph" >}}

## Overview

Capture etcd metrics in Datadog to:

* Monitor the health of your etcd cluster.
* Know when host configurations may be out of sync.
* Correlate the performance of etcd with the rest of your applications.

## Configuration

1. Configure the Agent to connect to etcd, edit `conf.d/etcd.yaml`
{{< highlight yaml >}}
init_config:

instances:
# url, the API endpoint of your etcd instance
#    - url: "https://server:port"
# timeout, time to wait on a etcd API request
#      timeout: 5
{{< /highlight >}}

2. Restart the Agent

{{< insert-example-links >}}

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

{{< highlight shell >}}
Checks
======

  [...]

  etcd
  ----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}

Furthermore, etcd metrics are tagged with `etcd_state:leader` or `etcd_state:follower`, depending on the node status, so you can easily aggregate metrics by status.
