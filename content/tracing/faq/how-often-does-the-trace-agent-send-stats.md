---
title: How often does the trace agent send stats?
kind: faq
autotocdepth: 3
customnav: tracingnav
---

The application code instrumentation flushes to the Agent every 1 s ([see here for the Python client](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159) for instance) and the Agent flushes to the [Datadog API every 10s](https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L170).