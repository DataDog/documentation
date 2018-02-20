---
title: Kubernetes
kind: documentation
---

To deploy the Agent in your Kubernetes cluster, you can use the manifest in `manifests`.
Firstly, make sure you have the correct [RBAC](#rbac) in place. You can use the files in manifests/rbac that contain the minimal requirements to run the Kubernetes Cluster level checks and perform the leader election.
`kubectl create -f manifests/rbac`

Then, you can then create the agents with:
`kubectl create -f manifests/agent.yaml`

The manifest for the agent has the `KUBERNETES` environment variable enabled, which will enable the event collection and the API server check described here.
If you want the event collection to be resilient, you can create a ConfigMap `datadogtoken` that agents will use to save and share a state reflecting which events where pulled last.

To create such a ConfigMap, you can use the following command:
`kubectl create -f manifests/datadog_configmap.yaml`
See details in [Event Collection](#event-collection).

## Event Collection

<a name="event-collection"></a>
Similarly to the Agent 5, the Agent 6 can collect events from the Kubernetes API server.
First and foremost, you need to set the `collect_kubernetes_events` variable to `true` in the datadog.yaml, this can be achieved via the environment variable `DD_COLLECT_KUBERNETES_EVENTS` that is resolved at start time.
You will need to give the agent some rights to activate this feature. See the [RBAC](#rbac) section.

A ConfigMap can be used to store the `event.tokenKey` and the `event.tokenTimestamp`. It has to be deployed in the `default` namespace and be named `datadogtoken`.
One can simply run `kubectl create configmap datadogtoken --from-literal="event.tokenKey"="0"` . You can also use the example in manifests/datadog_configmap.yaml.

When the ConfigMap is used, if the agent in charge (via the [Leader election](#leader-election)) of collecting the events dies, the next leader elected will use the ConfigMap to identify the last events pulled.
This is in order to avoid duplicate the events collected, as well as putting less stress on the API Server.

### Leader Election

<a name="leader-election"></a>
The Datadog Agent6 supports built in leader election option for the Kubernetes event collector and the Kubernetes cluster related checks (i.e. Controle Plane service check).

This feature relies on Endpoints, you can enable it by setting the `DD_LEADER_ELECTION` environment variable to `true` the Datadog Agents will need to have a set of actions allowed prior to its deployment nevertheless.
See the [RBAC](#rbac) section for more details and keep in mind that these RBAC entities will need to be created before the option is set.

Agents coordinate by performing a leader election among members of the Datadog DaemonSet through kubernetes to ensure only one leader agent instance is gathering events at a given time.

This functionality is disabled by default, enabling the event collection will activate it (see [Event collection](#event-collection)) to avoid duplicating collecting events and stress on the API server.
<a name="leader-election-lease"></a>
The leaderLeaseDuration is the duration for which a leader stays elected. It should be > 30 seconds and is 60 seconds by default. The longer it is, the less frequently your agents hit the apiserver with requests, but it also means that if the leader dies (and under certain conditions), events can be missed until the lease expires and a new leader takes over.
It can be configured with the environment variable `DD_LEADER_LEASE_DURATION`.

### RBAC

<a name="rbac"></a>
In the context of using the Kubernetes integration, and when deploying agents in a Kubernetes cluster, a set of rights are required for the agent to integrate seamlessly.

You will need to allow the agent to be allowed to perform a few actions:

- `get` and `update` of the `Configmaps` named `datadogtoken` to update and query the most up to date version token corresponding to the latest event stored in ETCD.
- `list` and `watch` of the `Events` to pull the events from the API Server, format and submit them.
- `get`, `update` and `create` for the `Endpoint`. The Endpoint used by the agent for the [Leader election](#leader-election) feature is named `datadog-leader-election`.
- `list` the `componentstatuses` resource, in order to submit service checks for the Controle Plane's components status.

You can find the templates in manifests/rbac [here](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/rbac).
This will create the Service Account in the default namespace, a Cluster Role with the above rights and the Cluster Role Binding.