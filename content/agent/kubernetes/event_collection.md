---
title: Kubernetes Event Collection
kind: documentation
aliases:
    - /integraitons/faq/gathering-kubernetes-events
---

Similarly to Agent 5, Agent 6 can collect events from the Kubernetes API server.
Set the `collect_kubernetes_events` variable to `true` in the datadog.yaml. This can be achieved via the environment variable `DD_COLLECT_KUBERNETES_EVENTS` that is resolved at start time.
You will need to give the Agent some rights to activate this feature: see the [RBAC][1]section.

A [ConfigMap][2] can be used to store the `event.tokenKey` and the `event.tokenTimestamp`. The ConfigMap must be deployed in the same namespace as the resources, including the Agent. The namespace for resources can be configured with `DD_KUBE_RESOURCES_NAMESPACE`.
You can run `kubectl create configmap datadogtoken --from-literal="event.tokenKey"="0"` . You can also use the example in `manifests/datadog_configmap.yaml`.

When the ConfigMap is used, if the Agent in charge (via the [Leader election][3]) of collecting the events dies, the next leader elected will use the ConfigMap to identify the last events pulled.
This is in order to avoid duplicating the events collected, as well as to diminish stress on the API Server.

## Leader Election

Agent 6 supports a built-in leader election option for the Kubernetes event collector and the Kubernetes cluster-related checks (i.e. the Control Plane service check).

This feature relies on `Endpoints`. You can enable it by setting the `DD_LEADER_ELECTION` environment variable to `true`. The Agent must have a set of actions allowed prior to its deployment; see the [RBAC][1] section for more details, and keep in mind that these RBAC entities **must** be created before the option is set.

Agents coordinate by performing a leader election among members of the Datadog DaemonSet through Kubernetes to ensure only one leader Agent instance is gathering events at a given time.

This functionality is disabled by default. Enabling the event collection will activate it to avoid duplicating collecting events and stressing the API server.

The `leaderLeaseDuration` is the duration for which a leader stays elected. It is 60 seconds by default, and should be greater than 30 seconds. The longer it is, the less frequently your Agents hit the API server with requests, but this also means that if the leader dies, events can be missed until the lease expires and a new leader takes over.
The `leaderLeaseDuration` can be configured with the environment variable `DD_LEADER_LEASE_DURATION`.

[1]: /agent/kubernetes#rbac
[2]: /agent/kubernetes/integrations#configmap
[3]: /agent/kubernetes/event_collection#leader-election
