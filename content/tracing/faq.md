---
title: Tracing FAQ
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: tracingnav
---

#### What are the naming criteria for services, resources, etc?

* Service names and resource names **must be lowercase, alphanumeric characters**.
* Service names and metadata keys **cannot have more than 50 characters**.
* Metadata and resource names **cannot exceed 5000 bytes**.
* Service, resource, and metadata names cannot contain spaces (spaces will be replaced with underscores).
* Resource and service names must adhere to [metric naming rules](http://docs.datadoghq.com/faq/#api-metric-names).

#### How long is tracing data stored?

Tracing data is stored for about 36 hours.

#### Is the Trace Agent open source?

Yes, [check it out on GitHub](https://github.com/DataDog/datadog-trace-agent).

#### On what platforms can I run the Trace Agent?

Trace Agent packages are available for:

* Linux — packaged with the Datadog Agent since v5.11.0
* Mac OS — packaged separately, see the [Trace Agent releases](https://github.com/DataDog/datadog-trace-agent/releases/)
* Docker — included in the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) container

For other platforms, you must install from source.

#### Can I deploy the Trace Agent to any PaaS providers?

Yes, you can deploy it to Heroku via the [Datadog Heroku Buildpack](https://github.com/DataDog/heroku-buildpack-datadog).

#### Ok, I installed the Trace Agent. How do I enable it and verify it is working?

The Datadog Agent does not enable tracing by default. To enable it, add `apm_enabled: true` to your `datadog.conf` file and restart `datadog-agent`. Then, tail the Trace Agent log:

    tail -f /var/log/datadog/trace-agent.log

If tracing is working properly, you will see flushed payload messages similar to the following:

    2017-02-07 23:12:10 INFO (endpoint.go:140) - flushed payload to the API, time:185.409088ms, size:1437
    2017-02-07 23:12:20 INFO (endpoint.go:140) - flushed payload to the API, time:17.781515ms, size:753

#### Why am I getting `[Errno 111] Connection refused` errors in my application logs?

Either the Trace Agent is not running, or your application's tracer client isn't configured correctly. By default, the tracer client libraries submit to localhost on port 8126. If this is not where your Trace Agent is listening—perhaps it's listening in some Docker container adjacent to your application container—point your tracer client to where it's running, e.g. `tracer.configure(hostname="172.17.0.1")`.

If you're running the Trace Agent in a Docker container, see the [docker-dd-agent documentation](https://github.com/DataDog/docker-dd-agent/blob/master/README.md#tracing--apm) for more information.
