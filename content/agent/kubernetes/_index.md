---
title: Kubernetes
kind: documentation
---

There is two installation processes available to gather metrics, traces and logs from your Kubernetes Clusters:

* [Container installation](/agent/kubernetes/container_installation) - recommended
* [Host installation](/agent/kubernetes/host_installation) - optional

The only advantage from the Host installation is to allow gathering metrics from your Kubernetes cluster while starting.  

On the contrary, the Container installation allows you to benefit from all Datadog Docker Agent functionalities such as:

* [Autodiscovery](/agent/kubernetes/autodiscovery) 
* [Event Collection](/agent/kubernetes/event_collection)
* [Process Collection](/agent/kubernetes/process_collection)

To discover all data collected automatically from the Kubernetes integration, refer to the dedicated [Kubernetes Integration Documentation](/integrations/kubernetes).