---
title: Datadog-btrfs Integration
integration_title: btrfs
kind: integration
doclevel: basic
git_integration_title: btrfs
---
{{< img src="integrations/btrfs/btrfs_metric.png" >}}

## Overview 

Capture Btrfs metrics into Datadog to:

* Visualize your file system performance.
* Correlate the performance of Btrfs file system with the rest of your applications.

## Configuration 
To capture Btrfs metrics you need to install the Datadog Agent:

1. Configure the Agent according to your needs, edit `conf.d/btrfs.yaml`
{{< highlight yaml>}}
init_config:

instances:
    - excluded_devices: []
{{< /highlight >}}

2. Restart the Agent

{{< insert-example-links >}}

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell >}}
Checks
======

  [...]

  btrfs
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}


## Metrics

{{< get-metrics-from-git >}}

