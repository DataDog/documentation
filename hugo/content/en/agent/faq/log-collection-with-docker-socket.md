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

Datadog recommends that you use the log file approach for log collection because it is more resource-efficient. Additionally: in Kubernetes, most orchestrators use containerd as the container runtime instead of Docker, forcing the use of the log file method. Datadog's documentation uses the log file method by default. See [Docker log collection][1] and [Kubernetes log collection][2] for how to collect logs from log files.

This page discusses log collection with the Docker socket.

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
    registry.datadoghq.com/agent:latest
```

[1]: /containers/docker/log
{{% /tab %}}
{{% tab "Kubernetes" %}}
In Kubernetes, the Datadog Operator and Helm chart mount the `/var/run` directory into the Datadog Agent (by default) to give access to `/var/run/docker.sock`. You must disable `containerCollectUsingFiles` in the Operator and Helm Chart to opt-in to this method.

**Note**: If your container runtime is not Docker (for example, CRI-O or containerd) this method does not work for log collection.

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
After the socket is mounted, the same rules apply for the Agent for log discovery, tagging, and any custom Autodiscovery-based log integrations. The Agent accesses the underlying logs through the Docker socket instead.

See the original docs for more information on setting up different Autodiscovery configurations for [Docker][1] and [Kubernetes][2].

### Short lived containers {#short-lived-container-socket}

For a Docker environment, the Agent receives container updates in real time through Docker events. The Agent extracts and updates the configuration from the container labels (Autodiscovery) once every second.
Since Agent v6.14+, the Agent collects logs for all containers (running or stopped). This means that short-lived container logs that have started and stopped in the past second are still collected, as long as they are not removed.

[1]: /containers/docker/log
[2]: /containers/kubernetes/log