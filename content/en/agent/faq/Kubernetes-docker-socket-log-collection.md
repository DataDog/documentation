## Docker socket

{{< tabs >}}
{{% tab "Daemonset" %}}

Mount the docker socket into the Datadog Agent:

```yaml
  # (...)
    env:
      - {name: DD_CRI_SOCKET_PATH, value: /host/var/run/docker.sock}
      - {name: DOCKER_HOST, value: unix:///host/var/run/docker.sock}
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
{{% tab "Helm" %}}


{{% /tab %}}
{{< /tabs >}}

### Short lived containers {#short-lived-container-socket}

For a Docker environment, the Agent receives container updates in real time through Docker events. The Agent extracts and updates the configuration from the container labels (Autodiscovery) every 1 seconds.
Since Agent v6.14+, the Agent collects logs for all containers (running or stopped) which means that short lived containers logs that have started and stopped in the past second are still collected as long as they are not removed.
