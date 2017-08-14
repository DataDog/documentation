---
title: Datadog-Zookeeper Integration
integration_title: Zookeeper
git_integration_title: zookeeper
kind: integration
newhlevel: true
---

{{< img src="integrations/zendesk/zendesk_dash.png" alt="Zendesk Dashboard" >}}

## Overview

Connect ZooKeeper to Datadog in order to:

* Visualize ZooKeeper performance and utilization.
* Correlate the performance of ZooKeeper with the rest of your applications.

## Setup
### Configuration

1.  Configure the Agent to connect to ZooKeeper. Edit `conf.d/zk.yaml`
{{< highlight yaml>}}
init_config:

instances:
  - host: localhost
    port: 2181
    timeout: 3
{{< /highlight >}}

2.  Restart the Agent

{{< insert-example-links conf="zk" check="zk" >}}

### Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell>}}
Checks
======

  [...]

  zk
  --
    - instance #0 [OK]
    - Collected 8 metrics & 0 events
{{< /highlight >}}
# Metrics

{{< get-metrics-from-git >}}