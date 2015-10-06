---
title: Datadog-HAProxy Integration
integration_title: HAProxy
kind: integration
---

<div id="int-overview">
<h3>Overview</h3>

Capture HAProxy activity in Datadog to:
<ul>
<li> Visualize HAProxy load-balancing performance.</li>
<li> Know when a server goes down.</li>
<li> Correlate the performance of HAProxy with the rest of your applications. </li>
</ul>
</div>


From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/haproxy.yaml.example">
HAProxy YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/haproxy.py">
HAProxy checks.d</a>

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





