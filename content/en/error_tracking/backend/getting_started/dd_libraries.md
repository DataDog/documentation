---
title: Install Backend Error Tracking Using Datadog Tracing Libraries
aliases:
- /error_tracking/standalone_backend/getting_started/dd_libraries
further_reading:
- link: "/error_tracking/issue_states/"
  tag: "Documentation"
  text: "Error Tracking Issue States and Workflows"
- link: "/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
- link: "/error_tracking/guides/enable_infra"
  tag: "Guide"
  text: "Enable infrastructure monitoring"
- link: "/error_tracking/guides/enable_apm"
  tag: "Guide"
  text: "Enable APM"
---

To instrument your application with Datadog libraries:

1. [Install and configure the Agent](#install-and-configure-the-agent).
2. [Add the Datadog tracing library to your code](#instrument-your-application).

## Install and configure the Agent

Install the Datadog Agent by following the [relevant documentation][1].

To configure the agent for Error Tracking Backend only, you must be running Agent v7.61+.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Open the [datadog.yaml configuration file][2].
2. Add `core_agent` and `apm_config` as top-level attributes anywhere in the configuration file with the following settings:

   ```yaml
   core_agent:
     enabled: false
   apm_config:
     error_tracking_standalone:
       enabled: true
   ```

3. [Restart the Agent][3].

[2]: /agent/configuration/agent-configuration-files/
[3]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Docker" %}}

If you're using the Docker containerized Agent, set the following environment variables:
- `DD_CORE_AGENT_ENABLED=false`
- `DD_APM_ERROR_TRACKING_STANDALONE_ENABLED=true`

Here's an example of how you can include these settings in your Docker run command:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_CORE_AGENT_ENABLED=false \
           -e DD_APM_ERROR_TRACKING_STANDALONE_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you're deploying the Agent in Kubernetes, make the following changes in your Helm chart in addition to your Agent configuration:

```yaml
agents:
  containers:
    agent:
      env:
        - name: DD_CORE_AGENT_ENABLED
          value: "false"
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  apm:
    errorTrackingStandalone:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

## Instrument your application

Follow the relevant [documentation][4] to set up your application to send traces using one of the official Datadog tracing libraries.
Follow the [OpenTelemetry API guide][5] for your application language to manually send errors through span events.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[4]: /tracing/trace_collection/automatic_instrumentation/dd_libraries
[5]: /tracing/trace_collection/custom_instrumentation/?tab=opentelemetryapi#getting-started
