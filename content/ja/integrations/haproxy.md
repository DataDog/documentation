---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-HAProxy Integration
integration_title: HAProxy
kind: integration
doclevel: complete
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

    haproxy.bytes.in_rate
    haproxy.bytes.out_rate
    haproxy.denied.req_rate
    haproxy.denied.resp_rate
    haproxy.errors.con_rate
    haproxy.errors.req_rate
    haproxy.errors.resp_rate
    haproxy.queue.current
    haproxy.requests.rate
    haproxy.session.current
    haproxy.session.limit
    haproxy.session.rate
    haproxy.warnings.redis_rate
    haproxy.warnings.retr_rate
