---
title: Datadog-Gearman Integration
integration_title: Gearman
kind: integration
git_integration_title: gearman
---

## Overview

Bring Gearman metrics to Datadog to:

* Visualize Gearman performance.
* Know how many tasks are queued or running.
* Correlate the performance of Gearman with the rest of your applications.

## Configuration
To capture Gearman metrics you need to install the Datadog Agent.

1. Install the python gearman module

2. Configure the Agent to connect to Gearman, edit `conf.d/gearmand.yaml`
{{< highlight yaml >}}
init_config:

instances:
  - server: localhost
    port: 4730
    tags:
        - optional_tag_1
        - optional_tag_2
{{< /highlight >}}

3. Restart the Agent

{{< insert-example-links conf="gearmand" check="gearmand" >}}

## Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:
{{< highlight shell >}}
Checks
======

  [...]

  gearmand
  --------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}
