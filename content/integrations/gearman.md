---
title: Datadog-Gearman Integration
integration_title: Gearman
kind: integration
---

### Overview

Bring Gearman metrics to Datadog to:

* Visualize Gearman performance.
* Know how many tasks are queued or running.
* Correlate the performance of Gearman with the rest of your applications.

From the open-source Agent:

* [ Gearman YAML example][1]
* [ Gearman checks.d][2]


The following metrics are collected by default with the Gearman integration:

    gearman.queued
    gearman.running
    gearman.unique_tasks
    gearman.workers


[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/gearmand.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/gearmand.py
