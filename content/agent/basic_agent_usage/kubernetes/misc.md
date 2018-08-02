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