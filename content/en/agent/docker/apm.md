---
title: Tracing Docker Applications
kind: Documentation
aliases:
  - /tracing/docker/
  - /tracing/setup/docker/
  - /agent/apm/docker
further_reading:
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/trace"
  tag: "Github"
  text: Source code
- link: "https://docs.datadoghq.com/integrations/amazon_ecs/#trace-collection"
  tag: "Documentation"
  text: "Trace your ECS applications"
- link: "tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

Enable the Trace Agent in the `datadog/agent` container by passing `DD_APM_ENABLED=true` as an environment variable.

## Tracing from the host

Tracing is available on port `8126/tcp` from *your host only* by adding the option `-p 127.0.0.1:8126:8126/tcp` to the `docker run` command.

To make it available from *any host*, use `-p 8126:8126/tcp` instead.

For example, the following command allows the Agent to receive traces from your host only:

```shell
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<YOUR_API_KEY> \
              -e DD_APM_ENABLED=true \
              datadog/agent:latest
```

## Docker APM Agent Environment Variables

List of all environment variables available for tracing within the Docker Agent:

| Environment variable       | Description                                                                                                                                                                                                                                                                                                                             |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | [Datadog API Key][1]                                                                                                                                                                                                                                                                                                                    |
| `DD_PROXY_HTTPS`           | Set up the URL for the proxy to use.                                                                                                                                                                                                                                                                                                    |
| `DD_REPLACE_TAGS`          | [Scrub sensitive data from your span’s tags][2].                                                                                                                                                                                                                                                                                        |
| `DD_HOSTNAME`              | Manually set the hostname to use for metrics if autodection fails, or when running the Datadog Cluster Agent.                                                                                                                                                                                                                           |
| `DD_DOGSTATSD_PORT`        | Set the DogStatsD port.                                                                                                                                                                                                                                                                                                                 |
| `DD_BIND_HOST`             | Set the StatsD & receiver hostname.                                                                                                                                                                                                                                                                                                     |
| `DD_LOG_LEVEL`             | Set the logging level. (`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                                         |
| `DD_APM_ENABLED`           | When set to `true`, the Datadog Agent accepts trace metrics.                                                                                                                                                                                                                                                                            |
| `DD_APM_CONNECTION_LIMIT`  | Sets the maximum connection limit for a 30 second time window.                                                                                                                                                                                                                                                                          |
| `DD_APM_DD_URL`            | Datadog API endpoint where traces are sent. For Datadog EU site set `DD_APM_DD_URL` to `https://trace.agent.datadoghq.eu`                                                                                                                                                                                                               |
| `DD_APM_RECEIVER_PORT`     | Port that the Datadog Agent's trace receiver listens on. Default value is `8126`.                                                                                                                                                                                                                                                       |
| `DD_APM_NON_LOCAL_TRAFFIC` | Allow non-local traffic when [tracing from other containers](#tracing-from-other-containers).                                                                                                                                                                                                                                           |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. i.e. <code>"GET /ignore-me,(GET&#124;POST) /and-also-me"</code>.                                                                                                                                                                    |
| `DD_APM_ANALYZED_SPANS`    | Configure the spans to analyze for transactions. Format should be comma separated instances of `\<SERVICE_NAME>&#124;\<OPERATION_NAME>=1`. i.e. `my-express-app&#124;express.request=1,my-dotnet-app&#124;aspnet_core_mvc.request=1`. You can also [enable it automatically][3] with the configuration parameter in the Tracing Client. |
| `DD_APM_ENV`               | Sets the default [environment][4] for your traces.                                                                                                                                                                                                                                                                                      |
| `DD_APM_MAX_EPS`           | Sets the maximum Analyzed Spans per second.                                                                                                                                                                                                                                                                                             |
| `DD_APM_MAX_TPS`           | Sets the maximum traces per second.                                                                                                                                                                                                                                                                                                     |

## Tracing from other containers

As with DogStatsD, traces can be submitted to the Agent from other containers either using [Docker networks](#docker-network) or with the [Docker host IP](#docker-host-ip).

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

Your application tracers must be configured to submit traces to this address. Set environment variables with the `DD_AGENT_HOST` as the Agent container name, and `DD_TRACE_AGENT_PORT` as the Agent Trace port in your application containers. (In this example case, `datadog-agent` and `8126`, respectively.)

Alternately, see the examples below to set the Agent host manually in each supported language:

{{< tabs >}}
{{% tab "Java" %}}
Either update the Java Agent configuration via environment variables:

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
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

[1]: https://app.datadoghq.com/account/settings#api
[2]: /tracing/guide/security/#replace-rules
[3]: /tracing/app_analytics/#automatic-configuration
[4]: /tracing/setting_primary_tags_to_scope/#environment
