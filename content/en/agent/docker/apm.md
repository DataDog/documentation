---
title: Tracing Docker Applications
kind: Documentation
aliases:
    - /tracing/docker/
    - /tracing/setup/docker/
    - /agent/apm/docker
further_reading:
    - link: 'https://github.com/DataDog/datadog-agent/tree/main/pkg/trace'
      tag: 'Github'
      text: Source code
    - link: '/integrations/amazon_ecs/#trace-collection'
      tag: 'Documentation'
      text: 'Trace your ECS applications'
    - link: "/agent/docker/log/"
      tag: "Documentation"
      text: "Collect your application logs"
    - link: "/agent/docker/integrations/"
      tag: "Documentation"
      text: "Collect automatically your applications metrics and logs"
    - link: "/agent/guide/autodiscovery-management/"
      tag: "Documentation"
      text: "Limit data collection to a subset of containers only"
    - link: "/agent/docker/tag/"
      tag: "Documentation"
      text: "Assign tags to all data emitted by a container"
---

As of Agent 6.0.0, the Trace Agent is enabled by default. If it has been turned off, you can re-enable it in the `gcr.io/datadoghq/agent` container by passing `DD_APM_ENABLED=true` as an environment variable.

## Tracing from the host

Tracing is available on port `8126/tcp` from _your host only_ by adding the option `-p 127.0.0.1:8126:8126/tcp` to the `docker run` command.

To make it available from _any host_, use `-p 8126:8126/tcp` instead.

For example, the following command allows the Agent to receive traces from your host only:

{{< tabs >}}
{{% tab "Linux" %}}

```shell
docker run -d --cgroupns host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              gcr.io/datadoghq/agent:latest
```
Where your `<DATADOG_SITE>` is {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              gcr.io/datadoghq/agent:latest
```
Where your `<DATADOG_SITE>` is {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

## Docker APM Agent environment variables

List of all environment variables available for tracing within the Docker Agent:

| Environment variable       | Description                                                                                                                                                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | [Datadog API Key][1]                                                                                                                                                                                                                                                                                                                                 |
| `DD_PROXY_HTTPS`           | Set up the URL for the proxy to use.                                                                                                                                                                                                                                                                                                                 |
| `DD_APM_REPLACE_TAGS`      | [Scrub sensitive data from your span’s tags][2].                                                                                                                                                                                                                                                                                                     |
| `DD_APM_FILTER_TAGS_REQUIRE`      | Defines required tags that traces must have in order to be sent to Datadog.                                                                                                                                                                                                                                                                                                     |
| `DD_APM_FILTER_TAGS_REJECT`      | Defines rejection tags. The Agent drops traces that have these tags.       |
| `DD_HOSTNAME`              | Manually set the hostname to use for metrics if autodetection fails, or when running the Datadog Cluster Agent.                                                                                                                                                                                                                                        |
| `DD_DOGSTATSD_PORT`        | Set the DogStatsD port.                                                                                                                                                                                                                                                                                                                              |
| `DD_APM_RECEIVER_SOCKET`   | Collect your traces through a Unix Domain Sockets and takes priority over hostname and port configuration if set. Off by default, when set it must point to a valid sock file.                                                                                                                                                                       |
| `DD_BIND_HOST`             | Set the StatsD & receiver hostname.                                                                                                                                                                                                                                                                                                                  |
| `DD_LOG_LEVEL`             | Set the logging level. (`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                                                      |
| `DD_APM_ENABLED`           | When set to `true` (the default), the Datadog Agent accepts traces and trace metrics.                                                                                                                                                                                                                                                                                         |
| `DD_APM_CONNECTION_LIMIT`  | Sets the maximum connection limit for a 30 second time window. The default limit is 2000 connections.                                                                                                                                                                                                                                                    |
| `DD_APM_DD_URL`            | Set the Datadog API endpoint where your traces are sent: `https://trace.agent.{{< region-param key="dd_site" >}}`. Defaults to `https://trace.agent.datadoghq.com`.                                                                                                                                                                                                                            |
| `DD_APM_RECEIVER_PORT`     | Port that the Datadog Agent's trace receiver listens on. Default value is `8126`.                                                                                                                                                                                                                                                                    |
| `DD_APM_NON_LOCAL_TRAFFIC` | Allow non-local traffic when [tracing from other containers](#tracing-from-other-containers).                                                                                                                                                                                                                                                        |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. Example: <code>GET /ignore-me,(GET\|POST) /and-also-me</code>.                                                                                                                                                                                |                                                                                                                                                                                                                                                                                        

## Tracing from other containers

As with DogStatsD, traces can be submitted to the Agent from other containers either using [Docker networks](#docker-network) or with the [Docker host IP](#docker-host-ip).

### Docker network

As a first step, create a user-defined bridge network:

```bash
docker network create <NETWORK_NAME>
```

Then start the Agent and the application container, connected to the network previously created:

{{< tabs >}}
{{% tab "Standard" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

Where your `<DATADOG_SITE>` is {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).

{{% /tab %}}
{{% tab "Windows" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --cgroupns host \
              --network "<NETWORK_NAME>" \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
Where your `<DATADOG_SITE>` is {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

This exposes the hostname `datadog-agent` in your `app` container.
If you're using `docker-compose`, `<NETWORK_NAME>` parameters are the ones defined under the `networks` section of your `docker-compose.yml`.

Your application tracers must be configured to submit traces to this address. Set environment variables with the `DD_AGENT_HOST` as the Agent container name, and `DD_TRACE_AGENT_PORT` as the Agent Trace port in your application containers. The example above uses host `datadog-agent` and port `8126` (the default value so you don't have to set it).

Alternately, see the examples below to set the Agent host manually in each supported language:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

Either update the Java Agent configuration with environment variables:

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

or through system properties:

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=datadog-agent \
     -Ddd.agent.port=8126 \
     -jar /your/app.jar
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from ddtrace import tracer

tracer.configure(
    hostname='datadog-agent',
    port=8126,
)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
Datadog.configure do |c|
  c.agent.host = 'datadog-agent'
  c.agent.port = 8126
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithAgentAddr("datadog-agent:8126"))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

```javascript
const tracer = require('dd-trace').init({
    hostname: 'datadog-agent',
    port: 8126
});
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Set the environment variables before running your instrumented app:

```bash
# Environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=<SYSTEM_DEPENDENT_PATH>
export DD_DOTNET_TRACER_HOME=/opt/datadog

# For containers
export DD_AGENT_HOST=datadog-agent
export DD_TRACE_AGENT_PORT=8126

# Start your application
dotnet example.dll
```

The value for the `CORECLR_PROFILER_PATH` environment variable varies based on the system where the application is running:

   Operating System and Process Architecture | CORECLR_PROFILER_PATH Value
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

In the table above, `<APP_DIRECTORY>` refers to the directory containing the application's `.dll` files.

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

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

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /tracing/guide/security/#replace-rules
