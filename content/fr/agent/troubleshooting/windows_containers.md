---
title: Problèmes relatifs aux conteneurs Windows
kind: documentation
further_reading:
- link: /agent/docker/?tab=windows
  tag: Documentation
  text: Agent Docker
- link: /agent/kubernetes/
  tag: Documentation
  text: Agent Kubernetes
- link: /agent/troubleshooting/
  tag: Dépannage de l'Agent
  text: Dépannage de l'Agent
---

Cette page décrit les problèmes connus et non résolus pouvant affecter la surveillance d'applications Windows conteneurisées.

## Problèmes courants

La surveillance d'applications Windows conteneurisées nécessite l'Agent Datadog 7.19+.

Les versions du système d'exploitation prises en charge sont Windows Server 2019 (LTSC) et Windows Server version 1909 (SAC).

Le mode d'isolation Hyper-V n'est pas pris en charge.

Les métriques de host relatives au disque, aux E/S et au réseau sont désactivées. Elles ne sont pas prises en charge par Windows Server, et les checks de l'Agent sont désactivés par défaut.

## Problèmes avec Docker

Les Live Processes ne s'affichent pas dans les conteneurs (à l'exception de l'Agent Datadog).

## Problèmes avec Kubernetes

Les Live Processes ne s'affichent pas dans les conteneurs (à l'exception de l'Agent Datadog).

Le paramètre HostPort n'est pas pris en charge sur Kubernetes. Par conséquent, l'APM fonctionne uniquement lorsqu'une mise en réseau pod à pod est configurée entre le traceur et l'Agent. DogStatsD fonctionne uniquement lorsqu'une mise en réseau pod à pod est configurée entre la bibliothèque client DogStatsD et l'Agent. Consultez la [documentation de Microsoft sur la fonctionnalité HostPort dans Kubernetes][1] pour en savoir plus.

Certaines métriques de Kubelet ne sont pas disponibles sur GKE. Elles sont disponibles sur EKS/AKS à partir de l'Agent Datadog v7.19.2. **Remarque** : les checks Kubelet prennent entre 8 et 10 secondes pour s'exécuter.

* `kubernetes.cpu.usage.total`
* `kubernetes.containers.restarts`
* `kubernetes.containers.running`
* `kubernetes.cpu.capacity`
* `kubernetes.ephemeral_storage.usage`
* `kubernetes.kubelet.container.log_filesystem.used_bytes`
* `kubernetes.kubelet.network_plugin.latency.count`
* `kubernetes.kubelet.network_plugin.latency.quantile`
* `kubernetes.kubelet.network_plugin.latency.sum`
* `kubernetes.kubelet.runtime.errors`
* `kubernetes.kubelet.runtime.operations`
* `kubernetes.memory.capacity`
* `kubernetes.pods.running`
* `kubernetes.rest.client.latency.count`
* `kubernetes.rest.client.latency.sum`
* `kubernetes.rest.client.requests`
* `kubernetes.network.tx_bytes`
* `kubernetes.network.rx_bytes`
* `kubernetes.cpu.usage.total`
* `kubernetes.memory.working_set`
* `kubernetes.filesystem.usage`
* `kubernetes.filesystem.usage_pct`


[1]: https://docs.microsoft.com/en-us/virtualization/windowscontainers/kubernetes/common-problems#hostport-publishing-is-not-working
