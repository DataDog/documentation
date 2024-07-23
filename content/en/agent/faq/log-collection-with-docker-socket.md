---
title: Log collection with Docker socket
aliases:
 - /agent/faq/kubernetes-docker-socket-log-collection
further_reading:
- link: "/agent/autodiscovery/"
  tag: "documentation"
  text: Docker Agent Autodiscovery
- link: "/agent/kubernetes/host_setup/"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "/agent/kubernetes/integrations/"
  tag: "documentation"
  text: "Custom Integrations"
---

The Datadog Agent has a few ways to collect logs in containerized environments:

- Accessing Kubernetes log files stored in `/var/log/pods`
- Accessing Docker log files stored in `/var/lib/docker/containers`
- Requesting Docker logs from the Docker API and Docker socket

Datadog recommends to use the log file approach for log collection as it is more resource efficient for the collection. Additionally in Kubernetes most orchestrators use containerd as the container runtime instead of Docker, forcing the use of the log file method. The standard log collection methods documented use the log file method by default. See [Docker log collection][1] and [Kubernetes log collection][2] for those steps.

This page discusses log collection with the Docker socket explicitly.

## Configuration

Mount the Docker socket into the Datadog Agent:

{{< tabs >}}
{{% tab "Docker" %}}
Ensure that the Docker socket (`/var/run/docker.sock`) is mounted into the Agent container. You can see the [Docker log collection docs][1] for samples. However, leave out the mount point for `/var/lib/docker/containers`.

For the following configuration, replace `<DD_SITE>` with {{< region-param key="dd_site" >}}:

```shell
docker run -d --name datadog-agent \
    --cgroupns host \
    --pid host \
    -e DD_API_KEY=<DATADOG_API_KEY> \
    -e DD_LOGS_ENABLED=true \
    -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
    -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
    -e DD_SITE=<DD_SITE>
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    gcr.io/datadoghq/agent:latest
```

[1]: /containers/docker/log
{{% /tab %}}
{{% tab "Kubernetes" %}}
In Kubernetes our Datadog Operator and Helm Chart will mount in the `/var/run` directory into the Datadog Agent by default, to give access to `/var/run/docker.sock`. You will need to disable `containerCollectUsingFiles` in the Operator and Helm Chart to opt-in to this method.

**Note:** If your container runtime is not Docker (ex: cri or containerd) this method will not work for log collection.

#### Datadog Operator

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
      containerCollectUsingFiles: false
```

#### Helm
```yaml
datadog:
  #(...)
  logs:
    enabled: true
    containerCollectAll: true
    containerCollectUsingFiles: false
```
{{% /tab %}}
{{< /tabs >}}

## Autodiscovery
Once this has been enabled the same rules apply for the Agent for log discovery, tagging, and any custom Autodiscovery based log integrations. The Agent just accesses the underlying logs through the Docker socket instead.

See the original docs for more information on setting up different Autodiscovery configurations for [Docker][1] and [Kubernetes][2].

### Short lived containers {#short-lived-container-socket}

For a Docker environment, the Agent receives container updates in real time through Docker events. The Agent extracts and updates the configuration from the container labels (Autodiscovery) once every second.
Since Agent v6.14+, the Agent collects logs for all containers (running or stopped) which means that short lived containers logs that have started and stopped in the past second are still collected as long as they are not removed.

[1]: /containers/docker/log
[2]: /containers/kubernetes/log