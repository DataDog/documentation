---
title: Datadog-Elasticsearch Integration
integration_title: Elasticsearch
kind: integration
newhlevel: true
git_integration_title: elasticsearch
---

# Overview

Connect Elasticsearch to Datadog in order to:

* Visualize Elasticsearch performance.
* Correlate Elasticsearch performance with the rest of your applications.


From the open-source Agent:

* [ ElasticSearch YAML example][1]
* [ ElasticSearch checks.d][2]

# Installation

No installation steps are required for this integration

# Configuration

1.  Edit your conf.d/elastic.yaml file as follows:

        init_config:

        instances:
          - url: http://elastic:9200
            # The format for the url entry is url: http://servername:port

2.  Restart the agent

# Validation

To validate that the integration is working, run ```datadog-agent info```. You should see results similar to the following:

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

# Metrics
<%= get_metrics_from_git()%>



[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/elastic.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/elastic.py
