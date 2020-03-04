---
title: Kubernetes Log collection
kind: documentation
aliases:
    - /guides/basic_agent_usage/kubernetes
    - /agent/basic_agent_usage/kubernetes
    - /tracing/kubernetes/
    - /tracing/setup/kubernetes
    - /agent/kubernetes/apm
    - /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
    - /integrations/faq/gathering-kubernetes-events
    - /agent/kubernetes/event_collection
    - /agent/kubernetes/daemonset_setup
    - /agent/kubernetes/helm
further_reading:
- link: "agent/kubernetes/metrics"
  tag: "documentation"
  text: "Kubernetes Metrics"
---

The Agent has two ways to collect logs: from the Docker socket, and from the Kubernetes log files (automatically handled by Kubernetes). Use log file collection when:

- Docker is not the runtime
- More than 10 containers are used within each pod

The Docker API is optimized to get logs from one container at a time. When there are many containers in the same pod, collecting logs through the Docker socket might be consuming much more resources than going through the files:

{{< tabs >}}
{{% tab "K8s File" %}}


Mount `/var/lib/docker/containers` as well, since `/var/log/pods` is symlink to this directory:

```
  (...)
    volumeMounts:
      (...)
      - name: logpodpath
        mountPath: /var/log/pods
      # Docker runtime directory, replace this path with your container runtime logs directory,
      # or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
      - name: logcontainerpath
        mountPath: /var/lib/docker/containers
  (...)
  volumes:
   (...)
    - hostPath:
        path: /var/log/pods
      name: logpodpath
    # Docker runtime directory, replace this path with your container runtime logs directory,
    # or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
    - hostPath:
        path: /var/lib/docker/containers
      name: logcontainerpath
  (...)
```

{{% /tab %}}
{{% tab "Docker Socket" %}}

Mount the docker socket into the Datadog Agent:

```
  (...)
    env:
      - {name: DD_CRI_SOCKET_PATH, value: /host/var/run/docker.sock}
      - {name: DOCKER_HOST, value: unix:///host/var/run/docker.sock}
  (...)
    volumeMounts:
      (...)
      - name: dockersocketdir
        mountPath: /host/var/run
  (...)
  volumes:
    (...)
    - hostPath:
        path: /var/run
      name: dockersocketdir
  (...)
```

**Note**: Mounting only the `docker.sock` socket instead of the whole directory containing it prevents the Agent from recovering after a Docker daemon restart.

{{% /tab %}}
{{< /tabs >}}


To enable [Log collection][1] with your DaemonSet:

1.

Set the `DD_LOGS_ENABLED` and `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` variable to true in your *env* section:

    ```yaml
    (...)
      env:
        (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_AC_EXCLUDE
          value: "name:datadog-agent"
    (...)
    ```

    **Note**: Setting `DD_AC_EXCLUDE` prevents the Datadog Agent from collecting and sending its own logs. Remove this parameter if you want to collect the Datadog Agent logs.

2. Mount the `pointdir` volume in *volumeMounts*:

    ```
      (...)
        volumeMounts:
          (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
      (...)
      volumes:
        (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
      (...)
    ```

    The `pointdir` is used to store a file with a pointer to all the containers that the Agent is collecting logs from. This is to make sure none are lost when the Agent is restarted, or in the case of a network issue.



The Datadog Agent follows the below logic to know where logs should be picked up from:

1. The Agent looks for the Docker socket, if available it collects logs from there.
2. If Docker socket is not available, the Agent looks for `/var/log/pods` and if available collects logs from there.

**Note**: If you do want to collect logs from `/var/log/pods` even if the Docker socket is mounted, set the environment variable `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` (or `logs_config.k8s_container_use_file` in `datadog.yaml`) to `true` in order to force the Agent to go for the file collection mode.

Finally, use [Autodiscovery with Pod Annotations][2] to enhance log collection for your containers.

#### Short lived containers

{{< tabs >}}
{{% tab "K8s File" %}}

By default the Agent looks every 5 seconds for new containers.

For Agent v6.12+, short lived container logs (stopped or crashed) are automatically collected when using the K8s file log collection method (through `/var/log/pods`). This also includes the collection init container logs.

{{% /tab %}}
{{% tab "Docker Socket" %}}

For a Docker environment, the Agent receives container updates in real time through Docker events. The Agent extracts and updates the configuration from the container labels (Autodiscovery) every 1 seconds.
Since Agent v6.14+, the Agent collects logs for all containers (running or stopped) which means that short lived containers logs that have started and stopped in the past second are still collected as long as they are not removed.

{{% /tab %}}
{{< /tabs >}}


### Enable Log Collection

Update your [datadog-values.yaml][3] file with the following log collection configuration, then upgrade your Datadog Helm chart:

```text
datadog:
  (...)
 logs:
  enabled: true
  containerCollectAll: true
```

[1]: /agent/docker/#environment-variables
[2]: /agent/autodiscovery/?tab=agent#how-to-set-it-up
[3]: https://github.com/helm/charts/blob/master/stable/datadog/values.yaml
