---
title: Datadog-Elasticsearch Integration
integration_title: Elasticsearch
kind: integration
newhlevel: true
git_integration_title: elasticsearch
updated_for_agent: 5.8.5
---

## Overview

{{< img src="elasticsearchgraph.png" alt="Elasticsearch" >}}

Connect Elasticsearch to Datadog in order to:

* Visualize Elasticsearch performance.
* Correlate Elasticsearch performance with the rest of your applications.

## Installation

No installation steps are required for this integration

## Configuration

1.  Edit your `conf.d/elastic.yaml` file as follows:
{{< highlight yaml >}}
init_config:

instances:
  # The format for the url entry is url: http://servername:port
  url: http://elastic:9200 
{{< /highlight >}}
2. Restart the agent

{{< insert-example-links conf="elastic" check="elastic" >}}

## Validation

To validate that the integration is working, run ```/etc/init.d/datadog-agent info```. You should see results similar to the following:
{{< highlight shell >}}
Checks
======

    ntp
    ---
      - instance #0 [OK]
      - Collected 1 metric, 0 events & 2 service checks

    disk
    ----
      - instance #0 [OK]
      - Collected 32 metrics, 0 events & 1 service check

    elastic
    -------
      - instance #0 [OK]
      - Collected 97 metrics, 0 events & 3 service checks
{{< /highlight >}}

## Metrics

{{< get-metrics-from-git >}}

