---
title: Why am I getting `[Errno 111] Connection refused` errors in my application logs?
kind: faq
autotocdepth: 3
hideguides: true
customnav: tracingnav
---

Either the Trace Agent is not running, or your application's tracer client isn't configured correctly. By default, the tracer client libraries submit to localhost on port 8126. If this is not where your Trace Agent is listening—perhaps it's listening in some Docker container adjacent to your application container—point your tracer client to where it's running, e.g. `tracer.configure(hostname="172.17.0.1")`.

If you're running the Trace Agent in a Docker container, see the [docker-dd-agent documentation](https://github.com/DataDog/docker-dd-agent/blob/master/README.md#tracing--apm) for more information.