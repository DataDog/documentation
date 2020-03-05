---
title: Kubernetes Log collection
kind: documentation
further_reading:
- link: "agent/kubernetes/metrics"
  tag: "documentation"
  text: "Kubernetes Metrics"
---

The Agent has two ways to collect logs: from the [Docker socket][1], and from the [Kubernetes log files](#log-collection) (automatically handled by Kubernetes). Datadog recommends using the Kuberentes log file logic as the Docker API is optimized to get logs from one container at a time. When there are many containers in the same pod, collecting logs through the Docker socket might be consuming much more resources than going through the files.

## Log collection

{{< tabs >}}
{{% tab "Daemonset " %}}

To enable Log collection with your DaemonSet:

1. Set the `DD_LOGS_ENABLED` and `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` variable to true in your *env* section:

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_AC_EXCLUDE
          value: "name:datadog-agent"
     # (...)
    ```

    **Note**: Setting `DD_AC_EXCLUDE` prevents the Datadog Agent from collecting and sending its own logs. Remove this parameter if you want to collect the Datadog Agent logs.

2. Mount the `pointdir` volume to prevent loss of container logs during restarts or network issues and  `/var/lib/docker/containers` to collect logs through kubernetes log file as well, since `/var/log/pods` is symlink to this directory:

    ```yaml
      # (...)
        volumeMounts:
        #  (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
         - name: logpodpath
           mountPath: /var/log/pods
         # Docker runtime directory, replace this path with your container runtime logs directory,
         # or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
         - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
       # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

    The `pointdir` is used to store a file with a pointer to all the containers that the Agent is collecting logs from. This is to make sure none are lost when the Agent is restarted, or in the case of a network issue.

{{% /tab %}}
{{% tab "Helm" %}}

To enable log collection with helm, update your [datadog-values.yaml][1] file with the following log collection configuration, then upgrade your Datadog Helm chart:

```yaml
datadog:
 # (...)
 logs:
  enabled: true
  containerCollectAll: true
```

[1]: https://github.com/helm/charts/blob/master/stable/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

**Note**: If you do want to collect logs from `/var/log/pods` even if the Docker socket is mounted, set the environment variable `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` (or `logs_config.k8s_container_use_file` in `datadog.yaml`) to `true` in order to force the Agent to go for the file collection mode.

## Autodiscovery

Use [Autodiscovery with Pod Annotations][2] to enhance log collection for your containers.

## Short lived containers

By default the Agent looks every 5 seconds for new containers.

For Agent v6.12+, short lived container logs (stopped or crashed) are automatically collected when using the K8s file log collection method (through `/var/log/pods`). This also includes the collection init container logs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/Kubernetes-docker-socket-log-collection
[2]: /agent/autodiscovery/?tab=agent#how-to-set-it-up
