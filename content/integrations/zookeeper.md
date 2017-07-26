---
title: Datadog-Zookeeper Integration
integration_title: Zookeeper
git_integration_title: zookeeper
kind: integration
newhlevel: true
---
## Overview

Connect ZooKeeper to Datadog in order to:

* Visualize ZooKeeper performance and utilization.
* Correlate the performance of ZooKeeper with the rest of your applications.


{{< insert-example-links conf="zk" check="zk" >}}

{{< img src="integrations/zookeeper/zookeepergraph.png" alt="ZooKeeper Graph" >}}

## Configuration

1.  Configure the Agent to connect to ZooKeeper. Edit conf.d/zk.yaml

        init_config:

        instances:
          - host: localhost
            port: 2181
            timeout: 3

1.  Restart the Agent

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

    Checks
    ======

      [...]

      zk
      --
        - instance #0 [OK]
        - Collected 8 metrics & 0 events

# Metrics

{{< get-metrics-from-git >}}