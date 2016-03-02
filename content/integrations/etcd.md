---
title: Datadog-etcd Integration
integration_title: etcd
kind: integration
git_integration_title: etcd
---

### Overview

Capture etcd metrics in Datadog to:

* Monitor the health of your etcd cluster.
* Know when host configurations may be out of sync.
* Correlate the performance of etcd with the rest of your applications.

From the open-source Agent:

* [ etcd YAML example][1]
* [ etcd checks.d][2]



## Metrics

<%= get_metrics_from_git()
%>

Furthermore, etcd metrics are tagged with `etcd_state:leader` or `etcd_state:follower`, depending on the node status, so you can easily aggregate metrics by status.

[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/etcd.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/etcd.py
