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
Create the following `datadog-agent.yaml` manifest.

Remember to encode your API key using `base64`:

```
echo -n <DD_API_KEY> | base64
```

**Note**: If you are using KMS or have high DogStatsD usage, you may need a higher memory limit.

```yaml
# datadog-agent.yaml

# Uncomment this section to use Kubernetes secrets to configure your Datadog API key

# apiVersion: v1
# kind: Secret
# metadata:
#   name: datadog-secret
#   labels:
#     app: "datadog"
# type: Opaque
# data:
#   api-key: "<YOUR_BASE64_ENCODED_DATADOG_API_KEY>"
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
            ## Custom metrics via DogStatsD - uncomment this section to enable custom metrics collection
            ## Set DD_DOGSTATSD_NON_LOCAL_TRAFFIC to true to collect StatsD metrics from other containers.
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            ## Trace Collection (APM) - uncomment this section to enable APM
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_API_KEY
            ## Kubernetes Secrets - uncomment this section to supply API Key with secrets
            # valueFrom:
            #   secretKeyRef:
            #     name: datadog-secret
            #     key: api-key

          ## Set DD_SITE to datadoghq.eu to send your Agent data to the Datadog EU site
          - name: DD_SITE
            value: "datadoghq.com"

          ## Set DD_DOGSTATSD_NON_LOCAL_TRAFFIC to true to allow StatsD collection.
          - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
            value: "false"
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
        ## Note these are the minimum suggested values for requests and limits. The amount of resources required by the Agent varies depending on the number of checks, integrations, and features enabled.
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
          - name: logpodpath
            mountPath: /var/log/pods
          ## Docker runtime directory, replace this path with your container runtime logs directory, or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
          - name: logcontainerpath
            mountPath: /var/lib/docker/containers
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
            path: /var/log/pods
          name: logpodpath
        ## Docker runtime directory, replace this path with your container runtime logs directory, or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```

Replace `<YOUR_API_KEY>` with [your Datadog API key][3] or use [Kubernetes secrets][4] to set your API key as an [environment variable][5]. If you opt to use Kubernetes secrets, refer to Datadog's [instructions for setting an API key with Kubernetes secrets][6]. Consult the [Docker integration][7] to discover all of the configuration options.

Deploy the DaemonSet with the command:
```
kubectl create -f datadog-agent.yaml
```

**Note**:  This manifest enables Autodiscovery's auto configuration feature. To learn how to configure Autodiscovery, see the [dedicated Autodiscovery documentation][8].

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

**Note**: On AWS, it is required to add the `ec2:DescribeInstances` [permission][9] to your Datadog IAM policy so that the Agent can query the EC2 instance tags.


## Enable capabilities

### Log Collection

To enable [Log collection][10] with your DaemonSet:

1. Set the `DD_LOGS_ENABLED` and `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` variable to true in your *env* section:

    ```
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
    
Setting `DD_AC_EXCLUDE` prevents the Datadog Agent from collecting and sending its own logs. Remove this parameter if you want to collect the Datadog Agent logs.

2. Mount the Docker socket or logs directories (`/var/log/pods` and `/var/lib/docker/containers` if docker runtime)

The Agent has two ways to collect logs: from the Docker socket, and from the Kubernetes log files (automatically handled by Kubernetes).

Use log file collection when:

* Docker is not the runtime
* More than 10 containers are used within each pod

The Docker API is optimized to get logs from one container at a time. When there are many containers in the same pod, collecting logs through the Docker socket might be consuming much more resources than going through the files.

Mount `/var/lib/docker/containers` as well, since `/var/log/pods` is symlink to this directory.

{{< tabs >}}
{{% tab "K8s File" %}}

    ```
      (...)
        volumeMounts:
          (...)
          - name: logpodpath
              mountPath: /var/log/pods
          # Docker runtime directory, replace this path with your container runtime logs directory, or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
          - name: logcontainerpath
            mountPath: /var/lib/docker/containers
      (...)
      volumes:
        (...)
        - hostPath:
            path: /var/log/pods
            name: logpodpath
        # Docker runtime directory, replace this path with your container runtime logs directory, or remove this configuration if `/var/log/pods` is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
      (...)
    ```

{{% /tab %}}
{{% tab "Docker Socket" %}}

    ```
      (...)
        volumeMounts:
          (...)
          - name: dockersocket
            mountPath: /var/run/docker.sock
      (...)
      volumes:
        (...)
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
      (...)
    ```

{{% /tab %}}
{{< /tabs >}}

The Datadog Agent follows the below logic to know where logs should be picked up from:

1. The Agent looks for the Docker socket, if available it collects logs from there.
2. If Docker socket is not available, the Agent looks for `/var/log/pods` and if available collects logs from there.

If you do want to collect logs from `/var/log/pods` even if the Docker socket is mounted, the environment variable `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` can be used (or `logs_config.k8s_container_use_file` in `datadog.yaml`) to force the Agent to go for the file collection mode.


3. Mount the `pointdir` volume in *volumeMounts*:

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

Use [Autodiscovery with Pod Annotations][11] to configure log collection to add multiline processing rules, or to customize the `source` and `service` attributes.

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

```
(...)
      env:
        (...)
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

Then, forward the port of the Agent to the host.

```
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

Finally, point your application-level tracers to where the Datadog Agent host is using the environment variable `DD_AGENT_HOST`. For example, in Python:

```
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

Refer to the [language-specific APM instrumentation docs][12] for more examples.

### Process Collection

See [Process collection for Kubernetes][13].

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

Learn more about this in the [Kubernetes DogStatsD documentation][14]

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
[6]: /agent/faq/kubernetes-secrets
[7]: /agent/docker/#environment-variables
[8]: /agent/autodiscovery/?tab=agent#how-to-set-it-up
[9]: /integrations/amazon_ec2/#configuration
[10]: /logs
[11]: /agent/autodiscovery/integrations/?tab=kubernetes
[12]: /tracing/setup
[13]: /graphing/infrastructure/process/?tab=kubernetes#installation
[14]: /agent/kubernetes/dogstatsd
