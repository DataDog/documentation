---
title: Log collection with Docker socket
kind: faq
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

The Agent has then two ways to collect logs: from the Docker socket, and from the Kubernetes log files (automatically handled by Kubernetes). Use log file collection when:

* Docker is not the runtime, **or**
* More than 10 containers are used on each node

The Docker API is optimized to get logs from one container at a time. When there are many containers on the same node, collecting logs through the Docker socket might be consuming much more resources than going through the files:

{{< tabs >}}
{{% tab "DaemonSet" %}}

Mount the Docker socket into the Datadog Agent:

```yaml
  # (...)
    env:
      - {name: "DD_CRI_SOCKET_PATH", value: "/host/var/run/docker.sock"}
      - {name: "DOCKER_HOST", value: "unix:///host/var/run/docker.sock"}
  # (...)
    volumeMounts:
    #  (...)
      - name: dockersocketdir
        mountPath: /host/var/run
  # (...)
  volumes:
    # (...)
    - hostPath:
        path: /var/run
      name: dockersocketdir
  # (...)
```

**Note**: Mounting only the `docker.sock` socket instead of the whole directory containing it prevents the Agent from recovering after a Docker daemon restart.

{{% /tab %}}
{{< /tabs >}}

### Short lived containers {#short-lived-container-socket}

For a Docker environment, the Agent receives container updates in real time through Docker events. The Agent extracts and updates the configuration from the container labels (Autodiscovery) once every second.
Since Agent v6.14+, the Agent collects logs for all containers (running or stopped) which means that short lived containers logs that have started and stopped in the past second are still collected as long as they are not removed.
