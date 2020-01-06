---
title: How to set up only Logs
kind: faq
disable_toc: true
beta: true
---

<div class="alert alert-danger">
To setup Log collection without metrics, you have to disable some payloads. This results in the potential loss of metadata and tags on the logs you are collecting. Datadog does not recommend this. For more information about the impact of this configuration, contact <a href="/help/">Datadog Support</a>.
</div>

To disable payloads, you must be running Agent v6.4+. This disables metric data submission, so that hosts stop showing up in Datadog. Follow these steps:

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


[1]: /agent/guide/agent-configuration-files/
[2]: /logs/log_collection
[3]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

If you are using the container Agent, set the environment variable `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES` `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`, and `DD_ENABLE_PAYLOADS_SKETCHES` to `false` in addition to your Agent configuration:

```shell
docker run -d --name datadog-agent \
           -e DD_API_KEY="<YOUR_API_KEY>" \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_AC_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false
           -e DD_ENABLE_PAYLOADS_SERIES=false
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false
           -e DD_ENABLE_PAYLOADS_SKETCHES=false
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you are deploying the Agent in Kubernetes, set the environment variable `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES` `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`, and `DD_ENABLE_PAYLOADS_SKETCHES` to `false` in addition to your Agent configuration:

```yaml
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
  namespace: default
spec:
  selector:
    matchLabels:
      app: datadog-agent
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      serviceAccountName: datadog-agent
      containers:
      - image: datadog/agent:latest
        ## (...)
        env:
          ## Set the Datadog API Key related to your Organization
          ## If you use the Kubernetes Secret use the following env variable:
          ## {name: DD_API_KEY, valueFrom:{ secretKeyRef:{ name: datadog-secret, key: api-key }}
          - {name: DD_API_KEY, value: "<YOUR_API_KEY>"}

          ## Set DD_SITE to "datadoghq.eu" to send your Agent data to the Datadog EU site
          - {name: DD_SITE, value: "datadoghq.com"}

          ## Send logs only
          - {name: DD_ENABLE_PAYLOADS_EVENTS, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SERIES, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SKETCHES, value: "false"}

          ## (...)

```

{{% /tab %}}
{{< /tabs >}}
