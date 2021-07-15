---
title: Données Kubernetes collectées
kind: documentation
aliases:
  - /fr/agent/kubernetes/metrics
further_reading:
  - link: /agent/kubernetes/log/
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/kubernetes/apm/
    tag: Documentation
    text: Recueillir les traces de votre application
  - link: /agent/kubernetes/prometheus/
    tag: Documentation
    text: Recueillir vos métriques Prometheus
  - link: /agent/kubernetes/integrations/
    tag: Documentation
    text: Recueillir automatiquement les métriques et les logs de vos applications
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Limitez la collecte de données à un sous-ensemble de conteneurs
  - link: /agent/kubernetes/tag/
    tag: Documentation
    text: Attribuez des tags à toutes les données envoyées par un conteneur
---
## Métriques

Métriques recueillies par l'Agent lorsqu'il est déployé sur votre cluster Kubernetes :

**Remarque** : les métriques recueillies par l'intégration Datadog/Kubernetes peuvent varier en fonction de la version de Kubernetes utilisée.

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes state

Notez que les métriques `kubernetes_state.*` sont rassemblées depuis l'API `kube-state-metrics`.

{{< get-metrics-from-git "kubernetes_state" >}}

### DNS Kubernetes

{{< get-metrics-from-git "kube_dns" >}}

### Proxy Kubernetes

{{< get-metrics-from-git "kube_proxy" >}}

## Événements

Depuis la version 5.17.0, l'Agent Datadog prend en charge [l'option d'élection de leader][9] intégrée pour la collecte d'événement Kubernetes. Une fois cette option activée, vous n'avez plus besoin de déployer un conteneur de collecte d'événement supplémentaire sur votre cluster. Les Agents s'organisent pour s'assurer qu'une seule instance de l'Agent à la fois recueille les événements. Les événements ci-dessous sont disponibles :

- Backoff
- Conflict
- Delete
- DeletingAllPods
- Didn't have enough resource
- Error
- Failed
- FailedCreate
- FailedDelete
- FailedMount
- FailedSync
- Failedvalidation
- FreeDiskSpaceFailed
- HostPortConflict
- InsufficientFreeCPU
- InsufficientFreeMemory
- InvalidDiskCapacity
- Killing
- KubeletsetupFailed
- NodeNotReady
- NodeoutofDisk
- OutofDisk
- Rebooted
- TerminatedAllPods
- Unable
- Unhealthy

## Checks de service

### Kubelet

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes state

{{< get-service-checks-from-git "kubernetes_state" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}