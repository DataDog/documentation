---
title: Kubernetes DaemonSet Setup
kind: documentation
further_reading:
- link: "agent/autodiscovery"
  tag: "documentation"
  text: Docker Agent Autodiscovery
- link: "agent/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "agent/kubernetes/integrations"
  tag: "documentation"
  text: "Custom Integrations"
aliases:
  - /agent/kubernetes/apm
  - /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
---

Take advantage of DaemonSets to deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors][1]).

*If DaemonSets are not an option for your Kubernetes cluster, [install the Datadog Agent][2] as a deployment on each Kubernetes node.*

## Installation

1. **Configure Agent permissions**: If your Kubernetes has role-based access control (RBAC) enabled, configure RBAC permissions for your Datadog Agent service account. From Kubernetes 1.6 onwards, RBAC is enabled by default. Create the appropriate ClusterRole, ServiceAccount, and ClusterRoleBinding with the following command:

    ```shell
    kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

2. **Create a secret that contains your Datadog API Key**. Replace the `<DATADOG_API_KEY>` below with [the API key for your organization](https://app.datadoghq.com/account/settings#api). This secret is used in the manifest to deploy the Datadog Agent.

    ```shell
    kubectl create secret generic datadog-secret --from-literal api-key="<DATADOG_API_KEY>"
    ```

3. **Create the Datadog Agent manifest**. Create the `datadog-agent.yaml` manifest out of the following templates:

    - [Template with all Datadog features enabled](/resources/yaml/datadog-agent-all-features.yaml).
    - [Template with the minimum required configuration](/resources/yaml/datadog-agent-vanilla.yaml) with just [Metric collection](/agent/kubernetes/metrics) and [Autodiscovery](/agent/autodiscovery) enabled. See the [Enable capabilities section](#enable-capabilities) below to discover how to collect your logs, traces, processes information individually.

4. Optional - **Set your Datadog site**. If you are on Datadog EU site set the `DD_SITE` environment variable to `datadoghq.eu`

5. **Deploy the DaemonSet** with the command:

    ```shell
    kubectl create -f datadog-agent.yaml
    ```

6. **Verification**: To verify the Datadog Agent is running in your environment as a DaemonSet, execute:

    ```shell
    kubectl get daemonset
    ```

     If the Agent is deployed, you will see output similar to the text below, where `DESIRED` and `CURRENT` are equal to the number of nodes running in your cluster.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          16h
    ```

## Log Collection

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


To enable [Log collection][12] with your DaemonSet:

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

Finally, use [Autodiscovery with Pod Annotations][13] to enhance log collection for your containers.

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

### APM and Distributed Tracing

To enable APM by allowing incoming data from port 8126, set the `DD_APM_NON_LOCAL_TRAFFIC` variable to true in your *env* section:

```text
(...)
      env:
        (...)
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

Then, forward the port of the Agent to the host.

```text
(...)
      ports:
        (...)
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
(...)
```

Use the downward API to pull the host IP; the application container needs an environment variable that points to `status.hostIP`. The Datadog container Agent expects this to be named `DD_AGENT_HOST`:

```text
apiVersion: apps/v1
kind: Deployment
...
    spec:
      containers:
      - name: <CONTAINER_NAME>
        image: <CONTAINER_IMAGE>/<TAG>
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```

Finally, point your application-level tracers to where the Datadog Agent host is using the environment variable `DD_AGENT_HOST`. For example, in Python:

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

Refer to the [language-specific APM instrumentation docs][14] for more examples.

**Note**: On minikube, you may receive an `Unable to detect the kubelet URL automatically` error. In this case, set `DD_KUBELET_TLS_VERIFY=false`.

### Process Collection

See [Process collection for Kubernetes][15].

### DogStatsD

To send custom metrics via DogStatsD, set the `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` variable to true in your *env* section:

```text
(...)
      env:
        (...)
        - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

Learn more about this in the [Kubernetes DogStatsD documentation][16]

To send custom metrics via DogStatsD from your application pods, uncomment the `# hostPort: 8125` line in your `datadog-agent.yaml` manifest. This exposes the DogStatsD port on each of your Kubernetes nodes.

**Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources.
Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work.
The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://hub.docker.com/r/datadog/agent
[3]: /integrations/containerd/#installation-on-containers
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://kubernetes.io/docs/concepts/configuration/secret
[6]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[7]: /agent/faq/kubernetes-secrets
[8]: /agent/docker/#environment-variables
[9]: /agent/autodiscovery/?tab=agent#how-to-set-it-up
[10]: /integrations/amazon_ec2/#configuration
[11]: https://github.com/helm/charts/blob/a744ff8c90730d6d36698412150875fa96882b9d/stable/datadog/values.yaml#L58
[12]: /logs
[13]: /agent/autodiscovery/integrations/?tab=kubernetes
[14]: /tracing/setup
[15]: /infrastructure/process/?tab=kubernetes#installation
[16]: /developers/dogstatsd
