---
autotocdepth: 2
customnav: tracingnav
hideguides: true
kind: Documentation
placeholder: true
title: Tracing FAQ
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

### What are the naming criteria for services, resources, etc?

* Service names and resource names **must be lowercase, alphanumeric characters**.
* Service names and metadata keys **cannot have more than 50 characters**.
* Metadata and resource names **cannot exceed 5000 bytes**.
* Service, resource, and metadata names cannot contain spaces (spaces will be replaced with underscores).
* Resource and service names must adhere to [metric naming rules](https://docs.datadoghq.com/developers/metrics/#naming-metrics).

### How long is tracing data stored?

Tracing data is stored for about 36 hours.

### How often does the trace agent send stats?

The application code instrumentation flushes to the Agent every 1 s ([see here for the Python client](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159) for instance) and the Agent flushes to the [Datadog API every 10s](https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L95).

### Is the Trace Agent open source?

Yes, [check it out on GitHub](https://github.com/DataDog/datadog-trace-agent).

### On what platforms can I run the Trace Agent?

Trace Agent packages are available for:

* Linux - packaged with the Datadog Agent since v5.11.0
* Mac OS - packaged separately, see the [Trace Agent releases](https://github.com/DataDog/datadog-trace-agent/releases/)
* Docker - included in the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) container

For other platforms, you must install from source.

### Can I deploy the Trace Agent to any PaaS providers?

Yes, you can deploy it to Heroku via the [Datadog Heroku Buildpack](https://github.com/DataDog/heroku-buildpack-datadog).

### Ok, I installed the Trace Agent. How do I enable it and verify it is working?

The Trace (APM) Agent is automatically enabled for Datadog agent versions 5.13+.  To manually enable it, add `apm_enabled: true` to your `datadog.conf` file and restart `datadog-agent`. Then, tail the Trace Agent log:

    tail -f /var/log/datadog/trace-agent.log

If tracing is working properly, you should see flushed payload messages similar to the following:

    2017-02-07 23:12:10 INFO (endpoint.go:140) - flushed payload to the API, time:185.409088ms, size:1437
    2017-02-07 23:12:20 INFO (endpoint.go:140) - flushed payload to the API, time:17.781515ms, size:753

To disable APM, set `apm_enabled: false` and restart `datadog-agent`.

### Why am I getting `[Errno 111] Connection refused` errors in my application logs?

Either the Trace Agent is not running, or your application's tracer client isn't configured correctly. By default, the tracer client libraries submit to localhost on port 8126. If this is not where your Trace Agent is listening-perhaps it's listening in some Docker container adjacent to your application container-point your tracer client to where it's running, e.g. `tracer.configure(hostname="172.17.0.1")`.

If you're running the Trace Agent in a Docker container, see the [docker-dd-agent documentation](https://github.com/DataDog/docker-dd-agent/blob/master/README.md#tracing--apm) for more information.
