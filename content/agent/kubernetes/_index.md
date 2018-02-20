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