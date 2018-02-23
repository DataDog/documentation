---
title: Kubernetes
kind: documentation
further_reading:
- link: "/agent/kubernetes/autodiscovery"
  tag: "Documentation"
  text: Docker Agent Autodiscovery
- link: "/agent/kubernetes/event_collection"
  tag: "Documentation"
  text: Event collection
- link: "/agent/kubernetes/process_collection"
  tag: "Documentation"
  text: Process collection for Kubernetes
---

There are two installation processes available to gather metrics, traces and logs from your Kubernetes Clusters:

* [Container installation](/agent/kubernetes/container_installation) - recommended
* [Host installation](/agent/kubernetes/host_installation) - optional

Installing the agent on the host as opposed to in a pod as part of a Deployment or a Daemonset would not benefit the observability of the lifecycle of your Kubernetes cluster.

It could however help give visibility over the start of the Kubernetes ecosystem and health thereof.
Similarly, one would not be restricted to monitoring applications belonging to the Kubernetes eco system.  

To discover all data collected automatically from the Kubernetes integration, refer to the dedicated [Kubernetes Integration Documentation](/integrations/kubernetes).


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
