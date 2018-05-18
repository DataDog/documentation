---
autotocdepth: 2
customnav: tracingnav
hideguides: true
kind: Documentation
placeholder: true
title: Tracing Docker Applications
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

Enable the [datadog-trace-agent](https://github.com/DataDog/datadog-trace-agent) in the `docker-dd-agent` container by passing `DD_APM_ENABLED=true` as an environment variable

**Note: APM is NOT available on Alpine Images**

<div class="alert alert-info">
For additional information, please see <a href="https://github.com/DataDog/docker-dd-agent/blob/master/README.md">the project README on Github</a>
</div>

## Tracing from the host

Tracing can be available on port 8126/tcp from anywhere by adding the options `-p 8126:8126/tcp` to the `docker run` command

To make it available from your host only, use `-p 127.0.0.1:8126:8126/tcp` instead.

For example, the following command will allow the agent to receive traces from anywhere

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={your_api_key_here} \
  -e DD_APM_ENABLED=true \
  -p 8126:8126/tcp \
  datadog/docker-dd-agent
```

Previous instructions required binding to port 7777.
This is a legacy port used by former client libraries and has been replaced by 8126.

## Tracing from other containers
As with DogStatsD, traces can be submitted to the agent from other containers either
using the Docker host IP or with Docker links

### Using Docker links

```
docker run  --name my_container           \
            --all_your_flags              \
            --link dd-agent:dd-agent    \
            my_image
```

will expose `DD_AGENT_PORT_8126_TCP_ADDR` and `DD_AGENT_PORT_8126_TCP_PORT` as environment variables. Your application tracer can be configured to submit to this address.

An example in Python:

```
import os
from ddtrace import tracer
tracer.configure(
    hostname=os.environ["DD_AGENT_PORT_8126_TCP_ADDR"],
    port=os.environ["DD_AGENT_PORT_8126_TCP_PORT"]
)
```

### Using Docker host IP

Agent container port 8126 should be linked to the host directly, Having determined the address of the default route of this container, with `ip route` for example, you can configure your application tracer to report to it.

An example in python, assuming `172.17.0.1` is the default route:

```
from ddtrace import tracer; tracer.configure(hostname="172.17.0.1", port=8126)
```
