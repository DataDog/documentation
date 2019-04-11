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
---

Take advantage of DaemonSets to deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors][1]).

*If DaemonSets are not an option for your Kubernetes cluster, [install the Datadog Agent][2] as a deployment on each Kubernetes node.*

## Configure RBAC permissions
If your Kubernetes has role-based access control (RBAC) enabled, configure RBAC permissions for your Datadog Agent service account.

Create the appropriate ClusterRole, ServiceAccount, and ClusterRoleBinding:

```
kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

kubectl create -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
```

## Create manifest
Create the following `datadog-agent.yaml` manifest:

```yaml
# datadog-agent.yaml

apiVersion: v1
kind: Secret
metadata:
  name: datadog-secret
  labels:
    app: "datadog"
type: Opaque
data:
  api-key: "<YOUR_BASE64_ENCODED_DATADOG_API_KEY>"
---
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
            # Custom metrics via DogStatsD - uncomment this section to enable custom metrics collection
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            # Trace Collection (APM) - uncomment this section to enable APM
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_API_KEY
            valueFrom:
              secretKeyRef:
                name: datadog-secret
                key: api-key
          - name: DD_SITE
            # Set DD_SITE to datadoghq.eu to send your Agent data to the Datadog EU site 
            value: "datadoghq.com"
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
          - name: DD_APM_ENABLED
            value: "true"
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

### Kubernetes cluster name auto detection

Since version 6.5.0 of the Datadog Agent, the Agent configuration contains a cluster name attribute to be used in Kubernetes clusters, so that host aliases are unique. This attribute can be set using the `DD_CLUSTER_NAME` environment variable.

Starting with version 6.11.0, the Datadog Agent can auto-detect the Kubernetes cluster name on Google GKE, Azure AKS, and AWS EKS. This feature facilitates the identification of nodes across Kubernetes clusters by adding an alias which contains the cluster name as a suffix on the node name.

On Google GKE and Azure AKS, the cluster name is retrieved from the cloud provider API. For AWS EKS, the cluster name is retrieved from EC2 instance tags.

**Note**: On AWS, it is required to add the `ec2:DescribeInstances` [permission][12] to your Datadog IAM policy so that the Agent can query the EC2 instance tags.


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

To enable trace collection with your DaemonSet:

1. Set the Node IP and port as environment variables for your application containers:

    ```
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

2. Uncomment the `# hostPort: 8126` line in your `datadog-agent.yaml` manifest:
  This exposes the Datadog Agent tracing port on each of your Kubernetes nodes.

    **Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. 
    Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work. 
    The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

### Process Collection

See [Process collection for Kubernetes][10].

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

Learn more about this in the [Kubernetes DogStatsD documentation][11]

To send custom metrics via DogStatsD from your application pods, uncomment the `# hostPort: 8125` line in your `datadog-agent.yaml` manifest. This exposes the DogStatsD port on each of your Kubernetes nodes.

**Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. 
Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work.
The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://kubernetes.io/docs/concepts/configuration/secret
[5]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[6]: /agent/docker/#environment-variables
[7]: https://docs.datadoghq.com/agent/autodiscovery
[8]: /logs
[9]: /logs/docker/#configuration-file-example
[10]: /graphing/infrastructure/process/?tab=kubernetes#installation
[11]: /agent/kubernetes/dogstatsd
[12]: https://docs.datadoghq.com/integrations/amazon_ec2/#configuration
