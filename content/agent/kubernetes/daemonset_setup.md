---
title: Kubernetes DaemonSet Setup
kind: documentation
further_reading:
- link: "agent/autodiscovery"
  tag: "documentation"
  text: "Docker Agent Autodiscovery"
- link: "agent/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "agent/kubernetes/integrations"
  tag: "documentation"
  text: "Custom Integrations"
---

Take advantage of DaemonSets to deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors][1]).

*If DaemonSets are not an option for your Kubernetes cluster, [install the Datadog Agent][2] as a deployment on each Kubernetes node.*

## Configure RBAC permissions
If your Kubernetes has role-based access control (RBAC) enabled, configure RBAC permissions for your Datadog Agent service account. Create the file `datadog-serviceaccount.yaml`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-agent
rules:
- apiGroups:
  - ""
  resources:
  - services
  - events
  - endpoints
  - pods
  - nodes
  - componentstatuses
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - configmaps
  resourceNames:
  - datadogtoken             # Kubernetes event collection state
  - datadog-leader-election  # Leader election token
  verbs:
  - get
  - update
- apiGroups:  # To create the leader election token
  - ""
  resources:
  - configmaps
  verbs:
  - create
- nonResourceURLs:
  - "/version"
  - "/healthz"
  verbs:
  - get
- apiGroups:  # Kubelet connectivity
  - ""
  resources:
  - nodes/metrics
  - nodes/spec
  - nodes/proxy
  verbs:
  - get
---
# You need to use that account for your dd-agent DaemonSet
kind: ServiceAccount
apiVersion: v1
metadata:
  name: datadog-agent
  namespace: default
---
# Your admin user needs the same permissions to be able to grant them
# Easiest way is to bind your user to the cluster-admin role
# See https://cloud.google.com/container-engine/docs/role-based-access-control#setting_up_role-based_access_control
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-agent
subjects:
- kind: ServiceAccount
  name: datadog-agent
  namespace: default
```
Create the appropriate ClusterRole, ServiceAccount, and ClusterRoleBinding:

```
kubectl create -f datadog-serviceaccount.yaml
```

## Create manifest
Create the following `datadog-agent.yaml` manifest:

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      serviceAccountName: datadog-agent
      containers:
      - image: datadog/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_API_KEY
            value: "<YOUR_API_KEY>"
          - name: DD_COLLECT_KUBERNETES_EVENTS
            value: "true"
          - name: DD_LEADER_ELECTION
            value: "true"
          - name: KUBERNETES
            value: "true"
          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
        livenessProbe:
          exec:
            command:
            - ./probe.sh
          initialDelaySeconds: 15
          periodSeconds: 5
      volumes:
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
        - hostPath:
            path: /proc
          name: procdir
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```

Replace `<YOUR_API_KEY>` with [your Datadog API key][3] or use [Kubernetes secrets][4] to set your API key as an [environment variable][5]. Consult the [Docker integration][6] to discover all of the configuration options.

Deploy the DaemonSet with the command:
```
kubectl create -f datadog-agent.yaml
```

**Note**:  This manifest enables Autodiscovery's auto configuration feature. To learn how to configure Autodiscovery, see the [dedicated Autodiscovery documentation][7].

### Verification

To verify the Datadog Agent is running in your environment as a DaemonSet, execute:

```
kubectl get daemonset
```

If the Agent is deployed, you will see output similar to the text below, where `DESIRED` and `CURRENT` are equal to the number of nodes running in your cluster.

```
NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2         2            2           <none>          16h
```

## Enable capabilities

### Log Collection

To enable [Log collection][8] with your DaemonSet:

1. Set the `DD_LOGS_ENABLED` and `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` variable to true in your *env* section:

    ```
    (...)
      env:
        (...)
        - name: DD_LOGS_ENABLED
            value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
            value: "true"
    (...)
    ```

2. Mount the `pointdir` volume in *volumeMounts*:

    ```
      (...)
        volumeMounts:
          (...)
          - name: pointerdir
              mountPath: /opt/datadog-agent/run
      (...)
      volumes:
        (...)
        - hostPath:
            path: /opt/datadog-agent/run
            name: pointerdir
      (...)
    ```

Learn more about this in [the Docker log collection documentation][9].

### Trace Collection

To enable [Trace collection][10] with your DaemonSet:

1. Set the `DD_APM_ENABLED` variable to true in your *env* section:

    ```
    (...)
      env:
        (...)
        - name: DD_APM_ENABLED
            value: "true"
    (...)
    ```

2. Uncomment the `# hostPort: 8126` line.
  This exposes the Datadog Agent tracing port on each of your Kubernetes nodes.

  **Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources.
  Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work. If you use EKS to host your Agent and applications, the `hostPorts` parameter could not work.
  The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

### Process Collection

See [Process collection for Kubernetes][11].

### DogStatsD

To send custom metrics via DogStatsD, set the `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` variable to true in your *env* section:

```
(...)
      env:
        (...)
        - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

Learn more about this in the [Docker DogStatsD documentation][12]

To send custom metrics via DogStatsD from your application pods, uncomment the `# hostPort: 8125` line in your `datadog-agent.yaml` manifest. This exposes the DogStatsD port on each of your Kubernetes nodes.

**Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources.
Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work. If you use EKS to host your Agent and applications, the `hostPorts` parameter could not work.
The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://kubernetes.io/docs/concepts/configuration/secret
[5]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[6]: /agent/basic_agent_usage/docker/#environment-variables
[7]: /agent/autodiscovery
[8]: /logs
[9]: /logs/docker/#configuration-file-example
[10]: /tracing/setup/kubernetes
[11]: /graphing/infrastructure/process/?tab=kubernetes#installation
[12]: /agent/basic_agent_usage/docker/#dogstatsd-custom-metrics
