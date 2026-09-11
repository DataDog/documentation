---
title: Live Containers Legacy Configuration

aliases:
  - /infrastructure/livecontainers/legacy
further_reading:
- link: "/infrastructure/containers"
  tag: "Documentation"
  text: "Containers View"
---

## Overview

This page provides instructions for setting up Live Containers for older Agent versions. These instructions apply to Datadog Agent versions 7.21.1 through 7.27.0 and Cluster Agent 1.9.0 through 1.11.0.

{{< tabs >}}
{{% tab "Helm" %}}

If you are using the official [Datadog Helm Chart][1]:

- Use chart version above 2.4.5 and before 2.10.0. Starting from chart version 2.10.0 onwards, see the [latest configuration instructions][2] instead.
  **Note**: Ensure the Agent and Cluster Agent versions are hardcoded with the minimum versions required or above in your Helm chart [values.yaml][3] file.
- Set `datadog.orchestratorExplorer.enabled` to `true` in [values.yaml][3].
- Deploy a new release.

In some setups, the Process Agent and Cluster Agent cannot automatically detect a Kubernetes cluster name. If this happens, the feature does not start, and the following warning displays in the Cluster Agent log: `Orchestrator explorer enabled but no cluster name set: disabling`. In this case, set `datadog.clusterName` to your cluster name in [values.yaml][3].

[1]: https://github.com/DataDog/helm-charts
[2]: /infrastructure/livecontainers/#configuration
[3]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

The Cluster Agent must be running, and the Agent must be able to communicate with it. See the [Cluster Agent Setup][1] for configuration.

1. Set the Cluster Agent container with the following environment variable:

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. Set the Cluster Agent ClusterRole with the following RBAC permissions.

    **Note**: For the `apps` apiGroups, Live Containers need permissions
    to collect common Kubernetes resources (for example, `pods`, `services`, and `nodes`),
    which are already in the RBAC if you followed [Cluster Agent Setup][1]. If they are missing, ensure they are added (after `deployments`, `replicasets`):

    ```yaml
      ClusterRole:
      - apiGroups:  # To create the datadog-cluster-id ConfigMap
        - ""
        resources:
        - configmaps
        verbs:
        - create
        - get
        - update
      ...
      - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
        - ""
        resources:
        - namespaces
        verbs:
        - get
      ...
      - apiGroups:  # To collect new resource types
        - "apps"
        resources:
        - deployments
        - replicasets
        - daemonsets
        - statefulsets
        verbs:
        - list
        - get
        - watch
     - apiGroups:
       - networking.k8s.io
       resources:
       - ingresses
       verbs:
       - list
       - watch
    ```

    These permissions are needed to create a `datadog-cluster-id` ConfigMap in the same Namespace as the Agent DaemonSet and the Cluster Agent Deployment, as well as to collect Deployments and ReplicaSets.

    If the `cluster-id` ConfigMap doesn't get created by the Cluster Agent, the Agent pod does not start, and falls into `CreateContainerConfigError` status. If the Agent pod is stuck because the ConfigMap doesn't exist, update the Cluster Agent permissions and restart its pods. This creates the ConfigMap and the Agent pod recovers automatically.

3. The Process Agent, which runs in the Agent DaemonSet, must be enabled and running (it doesn't need to run the process collection), and configured with the following options:

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    - name: DD_ORCHESTRATOR_CLUSTER_ID
      valueFrom:
        configMapKeyRef:
          name: datadog-cluster-id
          key: id
    ```

In some setups, the Process Agent and Cluster Agent are unable to automatically detect a Kubernetes cluster name. If this happens the feature does not start, and the following warning displays in the Cluster Agent log: `Orchestrator explorer enabled but no cluster name set: disabling`. In this case you must add the following options in the `env` section of both the Cluster Agent and the Process Agent:

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

[1]: /agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}

