---
title: Use the Datadog Agent for Log or Trace Collection Only
aliases:
  - /logs/faq/how-to-set-up-only-logs
kind: documentation
---

<div class="alert alert-danger">
To setup log or trace collection (or both) without metrics, you have to disable certain payloads. This results in the potential loss of metadata and tags on the logs and traces you are collecting. Datadog does not recommend this. For more information about the impact of this configuration, contact <a href="/help/">Datadog Support</a>.
</div>

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

[1]: /agent/guide/agent-configuration-files/
[2]: /logs/log_collection/
[3]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

If you are using the container Agent, set the environment variable `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`, and `DD_ENABLE_PAYLOADS_SKETCHES` to `false` in addition to your Agent configuration:

```shell
DOCKER_CONTENT_TRUST=1 docker run -d \
           --name datadog-agent \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false
           -e DD_ENABLE_PAYLOADS_SERIES=false
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false
           -e DD_ENABLE_PAYLOADS_SKETCHES=false
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you are deploying the Agent in Kubernetes, set the environment variable `DD_ENABLE_PAYLOADS_EVENTS`, `DD_ENABLE_PAYLOADS_SERIES`, `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`, and `DD_ENABLE_PAYLOADS_SKETCHES` to `false` in addition to your Agent configuration.

Set `DD_SITE` to your Datadog site: {{< region-param key="dd_site" code="true">}}

```yaml
# datadog-agent.yaml

# Uncomment this section to use Kubernetes secrets to configure your Datadog API key

# apiVersion: v1
# kind: Secret
# metadata:
#   name: datadog-secret
#   labels:
#     app: "datadog"
# type: Opaque
# data:
#   api-key: "<YOUR_BASE64_ENCODED_API_KEY>"
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
      - image: gcr.io/datadoghq/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            ## Custom metrics via DogStatsD - uncomment this section to enable
            ## custom metrics collection.
            ## Set DD_DOGSTATSD_NON_LOCAL_TRAFFIC to "true" to collect StatsD metrics
            ## from other containers.
            #
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            ## Trace Collection (APM) - uncomment this section to enable APM
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          ## Set the Datadog API Key related to your Organization
          ## If you use the Kubernetes Secret use the following env variable:
          ## {name: DD_API_KEY, valueFrom:{ secretKeyRef:{ name: datadog-secret, key: api-key }}
          - {name: DD_API_KEY, value: "<DATADOG_API_KEY>"}

          ## Set DD_SITE to your Datadog site
          - {name: DD_SITE, value: "<YOUR_DD_SITE>"}

          ## Path to docker socket
          - {name: DD_CRI_SOCKET_PATH, value: /host/var/run/docker.sock}
          - {name: DOCKER_HOST, value: unix:///host/var/run/docker.sock}

          ## Set DD_DOGSTATSD_NON_LOCAL_TRAFFIC to true to allow StatsD collection.
          - {name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC, value: "false" }
          - {name: KUBERNETES, value: "true"}
          - {name: DD_HEALTH_PORT, value: "5555"}
          - {name: DD_COLLECT_KUBERNETES_EVENTS, value: "true" }
          - {name: DD_LEADER_ELECTION, value: "true" }
          - {name: DD_APM_ENABLED, value: "true" }

          ## Enable Log collection
          - {name: DD_LOGS_ENABLED, value: "true"}
          - {name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL, value: "true"}
          - {name: DD_CONTAINER_EXCLUDE, value: "name:datadog-agent"}

          ## Send logs only
          - {name: DD_ENABLE_PAYLOADS_EVENTS, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SERIES, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SKETCHES, value: "false"}

          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP

        ## Note these are the minimum suggested values for requests and limits.
        ## The amount of resources required by the Agent varies depending on:
        ## * The number of checks
        ## * The number of integrations enabled
        ## * The number of features enabled
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - {name: dockersocketdir, mountPath: /host/var/run}
          - {name: procdir, mountPath: /host/proc, readOnly: true}
          - {name: cgroups, mountPath: /host/sys/fs/cgroup, readOnly: true}
          - {name: s6-run, mountPath: /var/run/s6}
          - {name: logpodpath, mountPath: /var/log/pods}
          - {name: pointdir, mountPath: /opt/datadog-agent/run}
          ## Docker runtime directory, replace this path with your container runtime
          ## logs directory, or remove this configuration if `/var/log/pods`
          ## is not a symlink to any other directory.
          - {name: logcontainerpath, mountPath: /var/lib/docker/containers}
        livenessProbe:
          httpGet:
            path: /health
            port: 5555
          initialDelaySeconds: 15
          periodSeconds: 15
          timeoutSeconds: 5
          successThreshold: 1
          failureThreshold: 3
      volumes:
        - {name: dockersocketdir, hostPath: {path: /var/run}}
        - {name: procdir, hostPath: {path: /proc}}
        - {name: cgroups, hostPath: {path: /sys/fs/cgroup}}
        - {name: s6-run, emptyDir: {}}
        - {name: logpodpath, hostPath: {path: /var/log/pods}}
        - {name: pointdir, hostPath: {path: /opt/datadog-agent/run}}
        ## Docker runtime directory, replace this path with your container runtime
        ## logs directory, or remove this configuration if `/var/log/pods`
        ## is not a symlink to any other directory.
        - {name: logcontainerpath, hostPath: {path: /var/lib/docker/containers}}
```

{{% /tab %}}
{{< /tabs >}}
