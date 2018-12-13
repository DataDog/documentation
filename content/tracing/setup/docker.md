---
title: Tracing Docker Applications
kind: Documentation
aliases:
- /tracing/docker/
further_reading:
- link: "https://github.com/DataDog/datadog-trace-agent"
  tag: "Github"
  text: "Source code"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

Enable the [datadog-trace-agent][1] in the `datadog/agent` container by passing `DD_APM_ENABLED=true` as an environment variable.

List of all environment variables available:

| Environment variable       | Description                                                                                   |
| ------                     | ------                                                                                        |
| `DD_API_KEY`               | [Datadog API Key][2]                                                                          |
| `DD_APM_ENABLED`           | When set to `true`, the Datadog Agent accepts trace metrics.                                  |
| `DD_APM_DD_URL`            | Datadog API endpoint where traces are sent.                                                   |
| `DD_PROXY_HTTPS`           | Set up the URL for the proxy to use.                                                          |
| `DD_HOSTNAME`              | Set manually the Agent hostname.                                                              |
| `DD_BIND_HOST`             | Set the StatsD & receiver hostname.                                                           |
| `DD_RECEIVER_PORT`         | Port that the Datadog Agent's trace receiver listen on. Default value is `8126`.              |
| `DD_DOGSTATSD_PORT`        | Set the DogStatsD port.                                                                       |
| `DD_APM_NON_LOCAL_TRAFFIC` | Allow non-local traffic when [tracing from other containers](#tracing-from-other-containers). |
| `DD_IGNORE_RESOURCE`       | A comma-separated list of resources that the Agent should ignore.                             |
| `DD_LOG_LEVEL`             | Set the logging level. (`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)               |
| `DD_APM_ANALYZED_SPANS`    | Configure the spans to analyze for transactions.                                              |


## Tracing from the host

Tracing is available on port `8126/tcp` from *any host* by adding the option `-p 8126:8126/tcp` to the `docker run` command.

To make it available from *your host only*, use `-p 127.0.0.1:8126:8126/tcp` instead.

For example, the following command allows the Agent to receive traces from anywhere:

```bash
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              -e DD_APM_ENABLED=true \
              datadog/agent:latest
```

## Tracing from other containers

As with DogStatsD, traces can be submitted to the Agent from other containers either using [Docker networks](#docker-network) or with the [Docker host IP](#host-ip).

### Docker Network

As a first step, create a user-defined bridge network:

```bash
docker network create <NETWORK_NAME>
```

Then start the Agent and the application container, connected to the network previously created:

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              datadog/agent:latest

# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              company/app:latest
```

This exposes the hostname `datadog-agent` in your `app` container.
If you're using `docker-compose`, `<NETWORK_NAME>` parameters are the ones defined under the `networks` section of your `docker-compose.yml`.

Your application tracers must be configured to submit traces to this address. See the examples below for each supported language:

{{< tabs >}}
{{% tab "Java" %}}
Either update the Java Agent configuration via environment variables:

```bash
DD_AGENT_HOST=datadog-agent \
DD_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

or via system properties:

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=datadog-agent \
     -Ddd.agent.port=8126 \
     -jar /your/app.jar
```
{{% /tab %}}
{{% tab "Python" %}}
```python
from ddtrace import tracer

tracer.configure(
    hostname='datadog-agent',
    port=8126,
)
```
{{% /tab %}}
{{% tab "Ruby" %}}
```ruby
Datadog.configure do |c|
  c.tracer hostname: 'datadog-agent',
           port: 8126
end
```
{{% /tab %}}
{{% tab "Go" %}}
```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithAgentAddr("datadog-agent:8126"))
    defer tracer.Stop()
}
```
{{% /tab %}}
{{% tab "Node.js" %}}
```javascript
const tracer = require('dd-trace').init({
  hostname: 'datadog-agent',
  port: 8126
})
```
{{% /tab %}}
{{< /tabs >}}

### Docker host IP

Agent container port `8126` should be linked to the host directly.
Configure your application tracer to report to the default route of this container (determine this using the `ip route` command).

The following is an example for the Python Tracer, assuming `172.17.0.1` is the default route:

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-trace-agent
[2]: https://app.datadoghq.com/account/settings#api
