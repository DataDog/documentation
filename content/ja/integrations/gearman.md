---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Gearman Integration
integration_title: Gearman
kind: integration
doclevel: complete
---

### Overview
{:#int-overview}

Bring Gearman metrics to Datadog to:

- Visualize Gearman performance.
-  Know how many tasks are queued or running.
- Correlate the performance of Gearman with the rest of your applications.


From the open-source Agent:

*
[Gearman YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/gearmand.yaml.example)
* [Gearman checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/gearmand.py)

The following metrics are collected by default with the Gearman integration:

    gearman.queued
    gearman.running
    gearman.unique_tasks
    gearman.workers
