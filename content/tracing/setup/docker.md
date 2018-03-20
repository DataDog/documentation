---
title: Tracing Docker Applications
kind: Documentation
aliases:
- /tracing/docker/
further_reading:
- link: "https://github.com/DataDog/docker-dd-agent"
  tag: "Github"
  text: Source code
- link: "/tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

Enable the [datadog-trace-agent](https://github.com/DataDog/datadog-trace-agent) in the `docker-dd-agent` container by passing `DD_APM_ENABLED=true` as an environment variable.

**Note: APM is NOT available on Alpine Images**

For additional information, see the [Datadog docker Github repository](https://github.com/DataDog/docker-dd-agent).

## Tracing from the host

Tracing can be available on port `8126/tcp from _any host_ by adding the option `-p 8126:8126/tcp` to the `docker run` command.

To make it available from _your host only_, use `-p 127.0.0.1:8126:8126/tcp` instead.

For example, the following command allows the agent to receive traces from anywhere:

```bash
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={your_api_key_here} \
  -e DD_APM_ENABLED=true \
  -p 8126:8126/tcp \
  datadog/docker-dd-agent
```

## Tracing from other containers

As with DogStatsD, traces can be submitted to the agent from other containers either using Docker links or with the Docker host IP.

### Using Docker links

```bash
docker run  --name my_container \
            --all_your_flags \
            --link dd-agent:dd-agent \
            my_image
```

This exposes `DD_AGENT_PORT_8126_TCP_ADDR` and `DD_AGENT_PORT_8126_TCP_PORT` as environment variables. Your application tracer must be configured to submit traces to this address.

See examples for each supported language below:

#### Python

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_PORT_8126_TCP_ADDR'],
    port=os.environ['DD_AGENT_PORT_8126_TCP_PORT'],
)
```

#### Ruby

```ruby
Datadog.configure do |c|
  c.tracer hostname: ENV['DD_AGENT_PORT_8126_TCP_ADDR'],
           port: ENV['DD_AGENT_PORT_8126_TCP_PORT']
end
```

#### Go

```go
import (
    "os"

    ddtrace "github.com/DataDog/dd-trace-go/opentracing"
)

func main() {
    config := ddtrace.NewConfiguration()
    config.AgentHostname = os.GetEnv("DD_AGENT_PORT_8126_TCP_ADDR")
    config.AgentPort = os.GetEnv("DD_AGENT_PORT_8126_TCP_PORT")

    tracer, closer, err := ddtrace.NewTracer(config)
    defer closer.Close()
}
```

#### Java

You can update the Java Agent configuration via environment variables:

```bash
DD_AGENT_HOST=$DD_AGENT_PORT_8126_TCP_ADDR \
DD_AGENT_PORT=$DD_AGENT_PORT_8126_TCP_PORT \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

or via system properties:

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Dagent.host=$DD_AGENT_PORT_8126_TCP_ADDR \
     -Dagent.port=$DD_AGENT_PORT_8126_TCP_PORT \
     -jar /your/app.jar
```

### Using Docker host IP

Agent container port `8126` should be linked to the host directly. Configure your application tracer to report to the default route of this container (you can determine this using the `ip route` command).

The following is an example for the Python Tracer, assuming `172.17.0.1` is the default route:

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
