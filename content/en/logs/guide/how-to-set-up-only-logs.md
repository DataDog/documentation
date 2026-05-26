---
title: Use the Datadog Agent for Log Collection Only
aliases:
  - /logs/faq/how-to-set-up-only-logs
further_reading:
- link: "/containers/docker/log/?tab=containerinstallation"
  tag: "Documentation"
  text: "Docker Log Collection"
- link: "/containers/kubernetes/log/"
  tag: "Documentation"
  text: "Kubernetes Log Collection"
---

<div class="alert alert-warning">Infrastructure Monitoring is a prerequisite to using APM. If you are an APM customer, do not turn off metric collection or you might lose critical telemetry and metric collection information.</div>

To disable payloads, you must be running Agent v6.4+. This disables metric data submission (including Custom Metrics) so that hosts stop showing up in Datadog. Follow these steps:

{{< tabs >}}
{{% tab "Host " %}}

1. Open the [datadog.yaml configuration file][1].
2. Add the `enable_payloads` as a top-level attribute anywhere in the configuration file with the following settings:

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [Configure the Agent to collect Logs][2].
4. [Restart the Agent][3].

[1]: /agent/configuration/agent-configuration-files/
[2]: /logs/log_collection/
[3]: /agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

If you're using the Docker containerized Agent, set the following environment variables to `false`:
- `DD_ENABLE_PAYLOADS_EVENTS`
- `DD_ENABLE_PAYLOADS_SERIES`
- `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`
- `DD_ENABLE_PAYLOADS_SKETCHES`

Here's an example of how you can include these settings in your Docker run command:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false \
           -e DD_ENABLE_PAYLOADS_SERIES=false \
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false \
           -e DD_ENABLE_PAYLOADS_SKETCHES=false \
           -e DD_PROCESS_AGENT_ENABLED=false \
           -e DD_PROCESS_CONFIG_CONTAINER_COLLECTION_ENABLED=false \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you're deploying the Agent in Kubernetes, make the following changes in your Helm chart in addition to your Agent configuration:

```yaml
 ## Send logs only
clusterAgent:
  enabled: false
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  env:
    - name: DD_ENABLE_PAYLOADS_EVENTS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERIES
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SKETCHES
      value: "false"
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
