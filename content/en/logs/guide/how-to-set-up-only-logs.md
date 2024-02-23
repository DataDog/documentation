---
title: Use the Datadog Agent for Log Collection Only
aliases:
  - /logs/faq/how-to-set-up-only-logs
kind: documentation
---

To disable payloads, you must be running Agent v6.4+. This disables metric data submission so that hosts stop showing up in Datadog. Follow these steps:

{{< tabs >}}
{{% tab "Host " %}}

1. Open the [datadog.yaml configuration file][1].
2. Add the `enable_payloads` attribute with the following settings:

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

If you are using the Docker containerized Agent, set the `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`, and `DD_ENABLE_PAYLOADS_SKETCHES` environment variables to `false` in addition to your Agent configuration:

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
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you are deploying the Agent in Kubernetes, set the `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`, and `DD_ENABLE_PAYLOADS_SKETCHES` environment variables to `false` in addition to your Agent configuration.

```yaml
 ## Send logs only
 datadog:
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
