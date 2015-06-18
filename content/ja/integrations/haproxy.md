---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-HAProxy Integration
integration_title: HAProxy
kind: integration
doclevel: complete
---

### Overview
{:#int-overview}

Capture HAProxy activity in Datadog to:

- Visualize HAProxy load-balancing performance.
- Know when a server goes down.
-  Correlate the performance of HAProxy with the rest of your applications.

From the open-source Agent:

* [HAProxy YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/haproxy.yaml.example)
* [HAProxy checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/haproxy.py)

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
