---
title: Kubernetes
kind: documentation
further_reading:
- link: "agent/autodiscovery"
  tag: "Documentation"
  text: Docker Agent Autodiscovery
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Process collection for Kubernetes
aliases:
    - /integrations/faq/gathering-kubernetes-events
---

**Note**: Agent version 6.0 and above only support versions of Kubernetes higher than 1.7.6. For prior versions of Kubernetes, consult the [Legacy Kubernetes versions section](#legacy-kubernetes-versions).

To gather metrics, traces, and logs from your Kubernetes clusters, there are two options:

* [Container installation](#container-installation) (**recommended**) -  The Agent runs inside a Pod. This implementation is sufficient for the majority of use cases, but note that it does not grant visibility into components of the system that exist outside Kubernetes. This method also does not monitor the starting phase of your Kubernetes cluster.
* [Host installation](#host-installation) (optional) - Installing the Agent on the host provides additional visibility into your ecosystem, independent of Kubernetes. For host installation, consult the [Kubernetes Host Integration documentation][1].


This documentation is for Agent v6 only. If you are still using Agent v5, [follow this installation process][2]

## Container installation
### Setup

Take advantage of DaemonSets to deploy the Datadog Agent on all your nodes (or on specific nodes by [using nodeSelectors](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector )).

*If DaemonSets are not an option for your Kubernetes cluster, [install the Datadog Agent][3] as a deployment on each Kubernetes node.*

* Create the following `datadog-agent.yaml` manifest:

```
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
            value: "yes"
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

* Replace `YOUR_API_KEY` with [your API key][5] or use [Kubernetes secrets][6] to set your API key [as an environment variable][7].

* Consult RBAC ...

* [Consult our docker integration to discover all configuration options.][8]

* Deploy the DaemonSet with the command:
  ```
  kubectl create -f datadog-agent.yaml
  ```

**Note**:  This manifest enables autodiscovery's auto configuration feature. To learn how to configure autodiscovery, please refer to [its documentation][9].


To verify the Datadog Agent is running in your environment as a DaemonSet, execute:

    kubectl get daemonset

If the Agent is deployed, you will see output similar to the text below, where desired and current are equal to the number of nodes running in your cluster.

    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          16h


#### Enable Log Collection

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

Learn more about this in [the Docker log collection documentation][11].

#### Enable Trace Collection

To enable [Trace collection][20] with your DaemonSet:

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

    **Warning**: This opens a port on your host. Make sure your firewall covers that correctly. 
    Another word of caution: some network plugging don't support `hostPorts` yet, so this won't work. The workaround in this case is to add `hostNetwork: true` in your agent pod specifications. This shares the network namespace of your host with the Datadog agent. Again, make sure this logic is okay with your security policies.

#### Enable Process Collection

#### Enable DogStatsD

To send custom metrics via DogStatsD, set the `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`variable to true in your *env* section:

```
(...)
      env:
        (...)
        - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
          value: "true"
(...)
```

Learn more about this in the [Docker DogStatsD documentation][19]

To send custom metrics via dogstatsd from your application pods, uncomment the `# hostPort: 8125` line in your `datadog-agent.yaml` manifest. This exposes the DogStatsD port on each of your Kubernetes nodes. 

**Warning**: This opens a port on your host. Make sure your firewall covers that correctly. 
Another word of caution: some network plugging don't support `hostPorts` yet, so this won't work. The workaround in this case is to add `hostNetwork: true` in your agent pod specifications. This shares the network namespace of your host with the Datadog agent. Again, make sure this logic is okay with your security policies.

### RBAC

In the context of using the Kubernetes integration, and when deploying Agents in a Kubernetes cluster, a set of rights are required for the Agent to integrate seamlessly.

You will need to allow the Agent to be allowed to perform a few actions:

- `get` and `update` of the `Configmaps` named `datadogtoken` to update and query the most up to date version token corresponding to the latest event stored in ETCD.
- `list` and `watch` of the `Events` to pull the events from the API Server, format and submit them.
- `get`, `update` and `create` for the `Endpoint`. The Endpoint used by the Agent for the [Leader election](#leader-election) feature is named `datadog-leader-election`.
- `list` the `componentstatuses` resource, in order to submit service checks for the Controle Plane's components status.

You can find the templates in manifests/rbac [here][12].
This will create the Service Account in the default namespace, a Cluster Role with the above rights and the Cluster Role Binding.

#### Custom integrations

##### ConfigMap
It is possible to leverage the ConfigMaps to configure or enable integrations.
To do so, you only need to create a ConfigMap with the integration(s)'s configuration.
Then, reference this ConfigMap among the volumes of your Agent's manifest.

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
And in the manifest of your Agent (Daemonset/Deployment) add the following:
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

To enable [Log collection][10] add the following lines in your `http-config`:

```
(...)
data:
  http-config: |-
  (...)
    logs:
      - type: docker
        service: docker
        source: kubernetes
```

Learn more about this in [the Docker log collection documentation][11].

##### Annotations

It is also possible to enable integrations via the annotations in the manifest of your application.
This can be done with the autodiscovery, for more details, see the [Autodiscovery][13] section.

## Host installation

Refer to [] for further details.

## Validation
### Container Running

To verify the Datadog Agent is running in your environment as a DaemonSet, execute:

    kubectl get daemonset

Or, if the Agent is running as a deployment and not as a DaemonSet, run:

    kubectl get deploy

If the Agent is deployed, you will see output similar to the text below, where desired and current are equal to the number of nodes running in your cluster.

    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          16h

### Agent check running

[Run the Agent's `status` subcommand][15] and look for `kubelet` under the Checks section:

    Checks
    ======

        kubelet
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Event collection

Similarly to the Agent 5, the Agent 6 can collect events from the Kubernetes API server.
First and foremost, you need to set the `collect_kubernetes_events` variable to `true` in the datadog.yaml, this can be achieved via the environment variable `DD_COLLECT_KUBERNETES_EVENTS` that is resolved at start time.
You will need to give the Agent some rights to activate this feature. See the [RBAC](#rbac) section.

A ConfigMap can be used to store the `event.tokenKey` and the `event.tokenTimestamp`. It has to be deployed in the `default` namespace and be named `datadogtoken`.
One can simply run `kubectl create configmap datadogtoken --from-literal="event.tokenKey"="0"` . You can also use the example in manifests/datadog_configmap.yaml.

When the ConfigMap is used, if the Agent in charge (via the [Leader election](#leader-election)) of collecting the events dies, the next leader elected will use the ConfigMap to identify the last events pulled.
This is in order to avoid duplicate the events collected, as well as putting less stress on the API Server.

### Leader Election

The Datadog Agent6 supports built in leader election option for the Kubernetes event collector and the Kubernetes cluster related checks (i.e. Controle Plane service check).

This feature relies on Endpoints, you can enable it by setting the `DD_LEADER_ELECTION` environment variable to `true` the Datadog Agents will need to have a set of actions allowed prior to its deployment nevertheless.
See the [RBAC](#rbac) section for more details and keep in mind that these RBAC entities will need to be created before the option is set.

Agents coordinate by performing a leader election among members of the Datadog DaemonSet through kubernetes to ensure only one leader Agent instance is gathering events at a given time.

This functionality is disabled by default, enabling the event collection will activate it to avoid duplicating collecting events and stress on the API server.

The leaderLeaseDuration is the duration for which a leader stays elected. It should be > 30 seconds and is 60 seconds by default. The longer it is, the less frequently your Agents hit the apiserver with requests, but it also means that if the leader dies (and under certain conditions), events can be missed until the lease expires and a new leader takes over.
It can be configured with the environment variable `DD_LEADER_LEASE_DURATION`.

### Legacy Kubernetes versions

Our default configuration targets Kubernetes 1.7.6 and later, as the Datadog Agent relies on features and endpoints introduced in this version. More installation steps are required for older versions:

- [RBAC objects][16] (`ClusterRoles` and `ClusterRoleBindings`) are available since Kubernetes 1.6 and OpenShift 1.3, but are available under different `apiVersion` prefixes:

  * `rbac.authorization.k8s.io/v1` in Kubernetes 1.8+ (and OpenShift 3.9+), the default apiVersion we target
  * `rbac.authorization.k8s.io/v1beta1` in Kubernetes 1.5 to 1.7 (and OpenShift 3.7)
  * `v1` in Openshift 1.3 to 3.6

    Apply our yaml manifests with the following `sed` invocations:

    ```
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrole.yaml | kubectl apply -f -
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrolebinding.yaml | kubectl apply -f -
    ```

    or for Openshift 1.3 to 3.6:

    ```
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrole.yaml | oc apply -f -
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrolebinding.yaml | oc apply -f -
    ```

- The `kubelet` check retrieves metrics from the Kubernetes 1.7.6+ (OpenShift 3.7.0+) prometheus endpoint. [Enable cAdvisor port mode][17] for older versions.

- Our default daemonset makes use of the [downward API][7] to pass the kubelet's IP to the agent. This only works on versions 1.7 and up. For older versions, here are other ways to enable kubelet connectivity:

  * On version 1.6, use `fieldPath: spec.nodeName` and verify your node name is resolvable and reachable from the pod.
  * If `DD_KUBERNETES_KUBELET_HOST` is unset, the agent retrieves the node hostname from docker and tries to connect there. See `docker info | grep "Name:"` and verify the name is resolvable and reachable.
  * If the IP of the docker default gateway is constant across your cluster, pass that IP in the `DD_KUBERNETES_KUBELET_HOST` envvar. You can retrieve the IP with the `ip addr show | grep docker0` command.

- Our default configuration relies on [bearer token authentication][18] to the APIserver and kubelet. On 1.3, the kubelet does not support bearer token auth, setup client certificates for the `datadog-agent` serviceaccount and pass them to the agent.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/kubernetes
[2]: /agent/faq/agent-5-kubernetes-basic-agent-usage
[3]: https://hub.docker.com/r/datadog/agent/
[4]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://kubernetes.io/docs/concepts/configuration/secret/
[7]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/
[8]: /agent/basic_agent_usage/docker/#environment-variables
[9]: https://docs.datadoghq.com/agent/autodiscovery
[10]: /logs
[11]: /logs/docker/#configuration-file-example
[12]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/rbac
[13]: /agent/autodiscovery
[14]: https://app.datadoghq.com/account/settings#agent
[15]: /agent/faq/agent-commands/#agent-status-and-information
[16]: https://kubernetes.io/docs/admin/authorization/rbac/
[17]: https://github.com/DataDog/integrations-core/tree/master/kubelet#compatibility
[18]: https://kubernetes.io/docs/admin/authentication/#service-account-tokens
[19]: /agent/basic_agent_usage/docker/#dogstatsd-custom-metrics
[20]: /tracing/setup/kubernetes
