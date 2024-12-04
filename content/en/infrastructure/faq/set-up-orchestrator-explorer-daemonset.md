---
title: Set up Orchestrator Explorer with DaemonSet

further_reading:
- link: "/infrastructure/containers"
  tag: "Documentation"
  text: "Containers View"
---

This page contains instructions for setting up the Orchestrator Explorer using a DaemonSet.

[Cluster Agent][1] version >= 1.11.0 is required before configuring the DaemonSet. The Cluster Agent must be running, and the Agent must be able to communicate with it. See the [Cluster Agent Setup][2] for configuration.

1. Set the Cluster Agent container with the following environment variable:

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. Set the Cluster Agent ClusterRole with the following RBAC permissions.

    Note in particular that for the `apps` and `batch` apiGroups, Live Containers need
    permissions to collect common Kubernetes resources (`pods`, `services`,
    `nodes`, and others), which should be already in the RBAC if you followed [Cluster
    Agent Setup][2]. But if they are missing, ensure they are
    added (after `deployments`, `replicasets`):

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
        - "batch"
        resources:
        - cronjobs
        - jobs
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - ""
        resources:
        - serviceaccounts
        verbs:
        - list
        - get
        - watch
      - apiGroups:
        - rbac.authorization.k8s.io
        resources:
        - roles
        - rolebindings
        - clusterroles
        - clusterrolebindings
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
      ...
    ```

    These permissions are needed to create a `datadog-cluster-id` ConfigMap in the same Namespace as the Agent DaemonSet and the Cluster Agent Deployment, as well as to collect supported Kubernetes resources.

    If the `cluster-id` ConfigMap isn't created by the Cluster Agent, the Agent pod cannot collect resources. In such a case, update the Cluster Agent permissions and restart its pods to let it create the ConfigMap, and then restart the Agent pod.

3. The Process Agent, which runs in the Agent DaemonSet, must be enabled and running (it doesn't need to run the process collection), and configured with the following options:

    ```yaml
    containers:
        - name: process-agent
          env:
          - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
            value: "true"
    ```
    For Agent versions 7.51.0+, the orchestrator check runs on the Agent container instead of the Process Agent container. To configure the Agent container:
    ```yaml
    containers:
        - name: agent
          env:
          - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
            value: "true"
    ```

4. (Optional) Set collectors under instances section to specify the resources to be collected. Create `orchestrator.yaml` in ConfigMap. Sample configuration:

     ```yaml
      apiVersion: v1
      kind: ConfigMap
      metadata:
        name: orchestrator-config
      data:
        orchestrator.yaml: |-
          ad_identifiers:
            - _kube_orchestrator
          init_config:
          instances:
            - collectors:
              - batch/v1/cronjobs
     ```

     Acceptable values for `collectors` are `<collector_name>` (e.g "cronjobs") or `<apigroup_and_version>/<collector_name>` (e.g. "batch/v1/cronjobs"). For CRDs, only `<apigroup_and_version>/<collector_name>` is accepted.

     Mount it to Cluster agent container.
   
     ```yaml
     containers:
       - name: cluster-agent
         ...
         volumeMounts:
           - name: orchestrator-config
             mountPath: /conf.d
             readOnly: true
     ...
     volumes:
       - name: orchestrator-config
         configMap:
           name: orchestrator-config
           items:
           - key: orchestrator.yaml
             path: orchestrator.yaml    
     ```

In some setups, the Process Agent and Cluster Agent cannot automatically detect a Kubernetes cluster name. If this happens, the feature does not start, and the following warning displays in the Cluster Agent log: `Orchestrator explorer enabled but no cluster name set: disabling`. In this case, add the following options in the `env` section of both the Cluster Agent and the Process Agent:

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

  [1]: /containers/cluster_agent/
  [2]: /containers/cluster_agent/setup/?tab=daemonset
