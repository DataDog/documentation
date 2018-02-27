---
title: Kubernetes
kind: documentation
further_reading:
- link: "/agent/autodiscovery"
  tag: "Documentation"
  text: Docker Agent Autodiscovery
- link: "/graphing/infrastructure/process"
  tag: "Documentation"
  text: Process collection for Kubernetes
aliases:
    - /integrations/faq/gathering-kubernetes-events
---

There are two installation processes available to gather metrics, traces and logs from your Kubernetes Clusters:

* [Container installation](#container-installation) - recommended
* [Host installation](#host-installation) - optional

Installing the agent on the host as opposed to in a pod as part of a Deployment or a Daemonset would not benefit the observability of the lifecycle of your Kubernetes cluster.

It could however help give visibility over the start of the Kubernetes ecosystem and health thereof.
Similarly, one would not be restricted to monitoring applications belonging to the Kubernetes eco system.

To discover all data collected automatically from the Kubernetes integration, refer to the dedicated [Kubernetes Integration Documentation](/integrations/kubernetes).

## Container installation
### Setup

Take advantage of DaemonSets to automatically deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector )).

*If DaemonSets are not an option for your Kubernetes cluster, [install the Datadog agent](https://hub.docker.com/r/datadog/agent/) as a sidecar container on each Kubernetes node.*

If your Kubernetes has RBAC enabled, see the [documentation on how to configure RBAC permissions with your Datadog-Kubernetes integration](/integrations/faq/using-rbac-permission-with-your-kubernetes-integration).

* Create the following `datadog-agent.yaml` manifest:

```yaml
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      containers:
      - image: datadog/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            name: traceport
            protocol: TCP
        env:
          - name: DD_API_KEY
            value: "YOUR_API_KEY"
          - name: KUBERNETES
            value: "yes"
          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "250m"
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
          initialDelaySeconds: 60
          periodSeconds: 30
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

Replace `YOUR_API_KEY` with [your api key](https://app.datadoghq.com/account/settings#api) or use [Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/) to set your API key [as an environement variable](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables).

* Deploy the DaemonSet with the command:
  ```
  kubectl create -f datadog-agent.yaml
  ```

**Note**:  This manifest enables autodiscovery's auto configuration feature. To learn how to configure autodiscovery, please refer to [its documentation](https://docs.datadoghq.com/agent/autodiscovery).

### RBAC

In the context of using the Kubernetes integration, and when deploying agents in a Kubernetes cluster, a set of rights are required for the agent to integrate seamlessly.

You will need to allow the agent to be allowed to perform a few actions:

- `get` and `update` of the `Configmaps` named `datadogtoken` to update and query the most up to date version token corresponding to the latest event stored in ETCD.
- `list` and `watch` of the `Events` to pull the events from the API Server, format and submit them.
- `get`, `update` and `create` for the `Endpoint`. The Endpoint used by the agent for the [Leader election](#leader-election) feature is named `datadog-leader-election`.
- `list` the `componentstatuses` resource, in order to submit service checks for the Controle Plane's components status.

You can find the templates in manifests/rbac [here](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/rbac).
This will create the Service Account in the default namespace, a Cluster Role with the above rights and the Cluster Role Binding.

#### Custom integrations

##### ConfigMap
It is possible to leverage the ConfigMaps to configure or enable integrations.
To do so, you only need to create a ConfigMap with the integration(s)'s configuration.
Then, reference this ConfigMap among the volumes of your agent's manifest.

For example, in the following case we customize the name, url and tags fields of the http check.
To enable other integrations, just specify the correct yaml name and make sure it is properly formated.

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: dd-agent-config
  namespace: default
data:
  http-config: |-
    init_config:
    instances:
    - name: My service
      url: my.service:port/healthz
      tags:
        - service:critical
---
```
And in the manifest of your agent (Daemonset/Deployment) add the following:
```
[...]
        volumeMounts:
        [...]
          - name: dd-agent-config
            mountPath: /conf.d
      volumes:
      [...]
        - name: dd-agent-config
          configMap:
            name: dd-agent-config
            items:
            - key: http-config
              path: http_check.yaml
[...]
```

##### Annotations

It is also possible to enable integrations via the annotations in the manifest of your application.
This can be done with the autodiscovery, for more details, see the [Autodiscovery](/agent/autodiscovery) section.


## Host installation

### Installation

Install the latest version of the Datadog Agent from [the Datadog agent integration page](https://app.datadoghq.com/account/settings#agent)

#### Configuration

Enable the kubelet check & optionnaly the docker check if your kubernetes is using the docker runtime:

```shell
mv /etc/datadog-agent/conf.d/kubelet.d/conf.yaml.example /etc/datadog-agent/conf.d/kubelet.d/conf.yaml.default
```

Edit the `datadog.yaml` file to point to activate autodiscovery features for the kubelet (discovery through annotations):

```yaml
config_providers:
  - name: kubelet
    polling: true
listeners:
  - name: kubelet
```

You may now start/restart the agent to enable the new configuration settings.

##### Docker check

Optionally if you're using the docker runtime on your cluster you might want to activate the docker check as well:

```shell
mv /etc/datadog-agent/conf.d/docker.d/conf.yaml.example /etc/datadog-agent/conf.d/docker.d/conf.yaml.default
```

For the docker check to run properly you'll need to add the `dd-agent` user to the docker group using `adduser dd-agent docker`

## Validation
### Container Running

To verify the Datadog Agent is running in your environment as a daemonset, execute:

    kubectl get daemonset

If the Agent is deployed you will see output similar to the text below, where desired and current are equal to the number of nodes running in your cluster.

    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          16h

### Agent check running

[Run the Agent's `status` subcommand](/agent/#agent-status-and-information) and look for `kubelet` under the Checks section:

    Checks
    ======

        kubelet
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks


## Event collection

Similarly to the Agent 5, the Agent 6 can collect events from the Kubernetes API server.
First and foremost, you need to set the `collect_kubernetes_events` variable to `true` in the datadog.yaml, this can be achieved via the environment variable `DD_COLLECT_KUBERNETES_EVENTS` that is resolved at start time.
You will need to give the agent some rights to activate this feature. See the [RBAC](#rbac) section.

A ConfigMap can be used to store the `event.tokenKey` and the `event.tokenTimestamp`. It has to be deployed in the `default` namespace and be named `datadogtoken`.
One can simply run `kubectl create configmap datadogtoken --from-literal="event.tokenKey"="0"` . You can also use the example in manifests/datadog_configmap.yaml.

When the ConfigMap is used, if the agent in charge (via the [Leader election](#leader-election)) of collecting the events dies, the next leader elected will use the ConfigMap to identify the last events pulled.
This is in order to avoid duplicate the events collected, as well as putting less stress on the API Server.

### Leader Election

The Datadog Agent6 supports built in leader election option for the Kubernetes event collector and the Kubernetes cluster related checks (i.e. Controle Plane service check).

This feature relies on Endpoints, you can enable it by setting the `DD_LEADER_ELECTION` environment variable to `true` the Datadog Agents will need to have a set of actions allowed prior to its deployment nevertheless.
See the [RBAC](#rbac) section for more details and keep in mind that these RBAC entities will need to be created before the option is set.

Agents coordinate by performing a leader election among members of the Datadog DaemonSet through kubernetes to ensure only one leader agent instance is gathering events at a given time.

This functionality is disabled by default, enabling the event collection will activate it to avoid duplicating collecting events and stress on the API server.

The leaderLeaseDuration is the duration for which a leader stays elected. It should be > 30 seconds and is 60 seconds by default. The longer it is, the less frequently your agents hit the apiserver with requests, but it also means that if the leader dies (and under certain conditions), events can be missed until the lease expires and a new leader takes over.
It can be configured with the environment variable `DD_LEADER_LEASE_DURATION`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
