---
title: Datadog-HAProxy Integration
integration_title: HAProxy
kind: integration
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





The following metrics are collected by default with the HAProxy integration:

	haproxy.frontend.bytes.in_rate
	haproxy.frontend.bytes.out_rate
	haproxy.frontend.denied.req_rate
	haproxy.frontend.denied.resp_rate
	haproxy.frontend.errors.req_rate
	haproxy.frontend.requests.rate
	haproxy.frontend.response.1xx
	haproxy.frontend.response.2xx
	haproxy.frontend.response.3xx
	haproxy.frontend.response.4xx
	haproxy.frontend.response.5xx
	haproxy.frontend.response.other
	haproxy.frontend.session.current
	haproxy.frontend.session.limit
	haproxy.frontend.session.pct
	haproxy.frontend.session.time

	haproxy.backend.bytes.in_rate
	haproxy.backend.bytes.out_rate
	haproxy.backend.connect.time
	haproxy.backend.denied.req_rate
	haproxy.backend.denied.resp_rate
	haproxy.backend.errors.con_rate
	haproxy.backend.errors.resp_rate
	haproxy.backend.queue.current
	haproxy.backend.queue.time
	haproxy.backend.response.1xx
	haproxy.backend.response.2xx
	haproxy.backend.response.3xx
	haproxy.backend.response.4xx
	haproxy.backend.response.5xx
	haproxy.backend.response.other
	haproxy.backend.response.time
	haproxy.backend.session.current
	haproxy.backend.session.limit
	haproxy.backend.session.pct
	haproxy.backend.session.rate
	haproxy.backend.session.time
	haproxy.backend.warnings.redis_rate
	haproxy.backend.warnings.retr_rate



[1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/haproxy.yaml.example
[2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/haproxy.py


