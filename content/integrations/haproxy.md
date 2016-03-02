---
title: Datadog-HAProxy Integration
integration_title: HAProxy
kind: integration
git_integration_title: haproxy
---

### Overview

Capture HAProxy activity in Datadog to:

* Visualize HAProxy load-balancing performance.
* Know when a server goes down.
* Correlate the performance of HAProxy with the rest of your applications.

![HAProxy default dashboard](/static/images/haproxy.png)

Learn more about how to monitor HAProxy performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor HAProxy.


From the open-source Agent:

* [ HAProxy YAML example][1]
* [ HAProxy checks.d][2]



## Metrics

<%= get_metrics_from_git() %>

[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/haproxy.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/haproxy.py


