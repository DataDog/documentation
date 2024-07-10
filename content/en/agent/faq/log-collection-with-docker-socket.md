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

The Datadog Agent has two ways to collect logs: from Kubernetes log files, or from the Docker socket. Datadog recommends using Kubernetes log files when:

* Docker is not the runtime, **or**
* More than 10 containers are used on each node

The Docker API is optimized to get logs from one container at a time. When there are many containers in the same node, collecting logs through the Docker socket may consume more resources than collecting logs through Kubernetes log files. 

This page discusses log collection with the Docker socket. To use Kubernetes log files, see [Kubernetes log collection][1].

## Configuration

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

### Kubernetes

To use the Docker Socket for log collection in a Kubernetes environment, ensure Docker is the runtime and `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` has been set to `false`.

### Short lived containers {#short-lived-container-socket}

For a Docker environment, the Agent receives container updates in real time through Docker events. The Agent extracts and updates the configuration from the container labels (Autodiscovery) once every second.
Since Agent v6.14+, the Agent collects logs for all containers (running or stopped) which means that short lived containers logs that have started and stopped in the past second are still collected as long as they are not removed.

## Autodiscovery
{{< tabs >}}
{{% tab "Local files" %}}
The Agent looks for Autodiscovery templates in the mounted `/conf.d` directory.

The advantage of storing templates as local files (and mounting them inside the containerized Agent) is that this does not require an external service or a specific orchestration platform.

The disadvantage is that you must restart your Agent containers each time you change, add, or remove templates.

##### Custom auto-configuration files

If you need a custom Datadog integration configuration to enable extra options, use different container identifiers—or use template variable indexing and write your own auto-configuration file:

1. Create a `conf.d/<INTEGRATION_NAME>.d/conf.yaml` file on your host and add your custom auto-configuration.
   ```text
   ad_identifiers:
     <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

   logs:
     <LOGS_CONFIG>
   ```
   See the [Autodiscovery Container Identifiers][1] documentation for information about `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.
2. Mount your host `conf.d/` folder to the containerized Agent's `conf.d` folder.

[1]: /agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMaps" %}}
On Kubernetes, you can use [ConfigMaps][1]. Reference the template below and the [Kubernetes Custom Integrations][2] documentation.

```text
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
    logs:
      <LOGS_CONFIG>
```

See the [Autodiscovery Container Identifiers][3] documentation for information on the `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.

[1]: /agent/kubernetes/integrations/#configmap
[2]: /agent/kubernetes/integrations/
[3]: /agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Helm" %}}

You can customize logs collection per integration within `confd`. This method mounts the desired configuration onto the Agent container.

  ```yaml
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
      init_config:
      instances:
        (...)
      logs:
        <LOGS_CONFIG>
  ```

{{% /tab %}}
{{< /tabs >}}

[1]: /containers/kubernetes/log