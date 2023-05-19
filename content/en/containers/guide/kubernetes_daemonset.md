---
title: Manually install and configure the Datadog Agent on Kubernetes with DaemonSet
kind: documentation
further_reading:
- link: "/containers/kubernetes/installation"
  tag: "Documentation"
  text: "Install the Datadog Agent on Kubernetes"
---

## Installation
You can use DaemonSets to deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors][1]).

To install the Datadog Agent on your Kubernetes cluster:

1. **Configure Agent permissions**: If your Kubernetes has role-based access control (RBAC) enabled, configure RBAC permissions for your Datadog Agent service account. From Kubernetes 1.6 onwards, RBAC is enabled by default. Create the appropriate ClusterRole, ServiceAccount, and ClusterRoleBinding with the following command:

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **Note**: Those RBAC configurations are set for the `default` namespace. If you are in a custom namespace, update the `namespace` parameter before applying them.


2. **Create the Datadog Agent manifest**. Create the `datadog-agent.yaml` manifest out of one of the following templates:

    | Metrics                   | Logs                      | APM                       | Process                   | NPM                       | Security                       | Linux                   | Windows                 |
    |---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|-------------------------|-------------------------|-------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i>                         | <i class="icon-check-bold"></i> | [Manifest template][2]  | [Manifest template][3] (no security)  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           | [Manifest template][4]  | [Manifest template][5]  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           |                           | [Manifest template][6]  | [Manifest template][7]  |
    | <i class="icon-check-bold"></i> |                           | <i class="icon-check-bold"></i> |                           |                           |                           | [Manifest template][8]  | [Manifest template][9] |
    |                           |                           |                           |                           | <i class="icon-check-bold"></i> |                           | [Manifest template][10] | no template             |
    | <i class="icon-check-bold"></i> |                           |                           |                           |                           |                           | [Manifest template][11] | [Manifest template][12] |

     To enable trace collection completely, [extra steps are required on your application Pod configuration][13]. Refer also to the [logs][14], [APM][15], [processes][16], and [Network Performance Monitoring][17], and [Security][18] documentation pages to learn how to enable each feature individually.

     **Note**: Those manifests are set for the `default` namespace. If you are in a custom namespace, update the `metadata.namespace` parameter before applying them.

3. In the `secret-api-key.yaml` manifest, replace `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` with [your Datadog API key][19] encoded in base64. To get the base64 version of your API key, you can run:

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. In the `secret-cluster-agent-token.yaml` manifest, replace `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE` with a random string encoded in base64. To get the base64 version of it, you can run:

    ```shell
    echo -n 'Random string' | base64
    ```

    **Note**: The random string must contain at least 32 alphanumeric characters to secure Cluster Agent to Agent communication.

5. **Set your Datadog site** to {{< region-param key="dd_site" code="true" >}} using the `DD_SITE` environment variable in the `datadog-agent.yaml` manifest.

    **Note**: If the `DD_SITE` environment variable is not explicitly set, it defaults to the `US` site `datadoghq.com`. If you are using one of the other sites (`EU`, `US3`, or `US1-FED`) this will result in an invalid API key message. Use the [documentation site selector][20] to see documentation appropriate for the site you're using.

6. **Deploy the DaemonSet** with the command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **Verification**: To verify the Datadog Agent is running in your environment as a DaemonSet, execute:

    ```shell
    kubectl get daemonset
    ```

     If the Agent is deployed, output similar to the text below appears, where `DESIRED` and `CURRENT` are equal to the number of nodes running in your cluster.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

8. Optional - **Setup Kubernetes State metrics**: Download the [Kube-State manifests folder][21] and apply them to your Kubernetes cluster to automatically collects [kube-state metrics][22]:

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### Unprivileged

(Optional) To run an unprivileged installation, add the following to your [pod template][19]:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: placeholder
  namespace: placeholder
spec:
  override:
    nodeAgent:
      securityContext:
        runAsUser: 1 # <USER_ID>
        supplementalGroups:
          - 123 # "<DOCKER_GROUP_ID>"
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the Docker or containerd socket.

## Configuration

### Log collection

**Note**: This option is not supported on Windows. Use the [Helm][24] option instead.

To enable log collection with your DaemonSet:

1. Set the `DD_LOGS_ENABLED` and `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` variable to true in the *env* section of the `datadog.yaml` Agent manifest:

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_CONTAINER_EXCLUDE_LOGS
          value: "name:datadog-agent"
     # (...)
    ```

    **Note**: Setting `DD_CONTAINER_EXCLUDE_LOGS` prevents the Datadog Agent from collecting and sending its own logs. Remove this parameter if you want to collect the Datadog Agent logs. See the [environment variable for ignoring containers][23] to learn more. When using ImageStreams inside OpenShift environments, set `DD_CONTAINER_INCLUDE_LOGS` with the container `name` to collect logs. Both of these Exclude/Include parameter value supports regular expressions.

2. Mount the `pointerdir` volume to prevent loss of container logs during restarts or network issues and  `/var/lib/docker/containers` to collect logs through kubernetes log file as well, since `/var/log/pods` is symlink to this directory:

    ```yaml
      # (...)
        volumeMounts:
          # (...)
          - name: pointerdir
            mountPath: /opt/datadog-agent/run
          - name: logpodpath
           mountPath: /var/log/pods
          # Docker runtime directory, replace this path
          # with your container runtime logs directory,
          # or remove this configuration if `/var/log/pods`
          # is not a symlink to any other directory.
          - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointerdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path
        # with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods`
        # is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

    The `pointerdir` is used to store a file with a pointer to all the containers that the Agent is collecting logs from. This is to make sure none are lost when the Agent is restarted, or in the case of a network issue.

### Unprivileged

(Optional) To run an unprivileged installation, add the following to your [pod template][2]:

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

where `<USER_ID>` is the UID to run the agent and `<DOCKER_GROUP_ID>` is the group ID owning the docker or containerd socket.

When the agent is running with a non-root user, it cannot directly read the log files contained in `/var/lib/docker/containers`. In this case, it is necessary to mount the docker socket in the agent container so that it can fetch the container logs from the docker daemon.



### Cluster Agent event collection

If you want Kubernetes events to be collected by the Datadog Cluster Agent, use the following steps:

1. Disable leader election in your Node Agent by setting the `leader_election` variable or `DD_LEADER_ELECTION` environment variable to `false`.

2. In your Cluster Agent deployment file, set the `DD_COLLECT_KUBERNETES_EVENTS` and `DD_LEADER_ELECTION` environment variable to `true`:

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

Configuring leader election, as described in the above steps, ensures that only one Cluster Agent collects the events.

Alternatively, to collect the Kubernetes events from a Node Agent, set the environment variables `DD_COLLECT_KUBERNETES_EVENTS` and `DD_LEADER_ELECTION` to `true` in your Agent manifest.

```yaml
- name: DD_COLLECT_KUBERNETES_EVENTS
  value: "true"
- name: DD_LEADER_ELECTION
  value: "true"
```

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /agent/kubernetes/apm/#setup
[14]: /agent/kubernetes/log/
[15]: /agent/kubernetes/apm/
[16]: /infrastructure/process/?tab=kubernetes#installation
[17]: /network_monitoring/performance/setup/
[18]: /data_security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /getting_started/site/
[21]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[22]: /agent/kubernetes/data_collected/#kube-state-metrics
[23]: /agent/docker/?tab=standard#ignore-containers
[24]: /containers/kubernetes/log