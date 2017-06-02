---
title: Datadog-RiakCS Integration
integration_title: RiakCS
git_integration_title: riakcs
kind: integration
---

### Overview


Capture Riak CS (Cloud Storage) metrics in Datadog to:

* Visualize key RiakCS metrics.
* Correlate RiakCS performance with the rest of your applications.

### Configuration

To configure the RiakCS integration, copy riakcs.yaml.example if the conf.d directory to riakcs.yaml and make the appropriate changes.

    init_config:

    instances:
      - access_id: access-key
        access_secret: access-secret
        #is_secure: True # Uncomment and change to false if you are not using ssl
        #host: localhost # Hostname/IP of your riakcs node
        #port: 8080 # port used by your riakcs node
        #s3_root: s3.amazonaws.com #

<%= insert_example_links%>

### Metrics

<%= get_metrics_from_git() %>

