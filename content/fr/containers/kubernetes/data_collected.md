---
aliases:
- /fr/agent/kubernetes/metrics
- /fr/agent/kubernetes/data_collected
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Recueillir vos métriques Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Recueillir automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
title: Données Kubernetes recueillies
---

Cette page répertorie les données recueillies par l'Agent Datadog lorsqu'il est déployé sur un cluster Kubernetes.

Les métriques recueillies peuvent varier en fonction de la version de Kubernetes utilisée.

## Métriques

### Kubernetes

{{< get-metrics-from-git "kubernetes" >}}

### Kubelet

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubelet][1].

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes State Metrics Core

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes State Metrics Core][6]. Ce check nécessite la version 1.12 ou une version ultérieure de l'Agent de cluster Datadog.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Kubernetes state

**Remarque** : les métriques `kubernetes_state.*` sont recueillies à partir de l'API `kube-state-metrics`. Le check `kubernetes_state` est obsolète. Consultez la section [Kubernetes State Metrics Core][6] pour utiliser le check recommandé. Datadog vous conseille de ne pas activer simultanément ces deux checks.

{{< get-metrics-from-git "kubernetes_state" >}}

### DNS Kubernetes

{{< get-metrics-from-git "kube_dns" >}}

### Proxy Kubernetes

{{< get-metrics-from-git "kube_proxy" >}}

### Serveur d'API kubernetes

Pour en savoir plus, consultez la documentation relative à l'intégration du [serveur d'API Kubernetes][3].

{{< get-metrics-from-git "kube_apiserver_metrics" >}}

### Kubernetes Controller Manager

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Controller Manager][2].

{{< get-metrics-from-git "kube_controller_manager" >}}

### Kubernetes Metrics Server

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Metrics Server][4].

{{< get-metrics-from-git "kube_metrics_server" >}}

### Kubernetes Scheduler

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Scheduler][5].

{{< get-metrics-from-git "kube_scheduler" >}}


## Événements

- Backoff
- Conflict
- Supprimer
- DeletingAllPods
- Didn't have enough resource
- Erreur
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

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubelet][1].

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes Controller Manager

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Controller Manager][2].

{{< get-service-checks-from-git "kube_controller_manager" >}}

### Kubernetes Metrics Server

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Metrics Server][4].

{{< get-service-checks-from-git "kube_metrics_server" >}}

### Kubernetes Scheduler

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Scheduler][5].

{{< get-service-checks-from-git "kube_scheduler" >}}

### Kubernetes State Metrics Core

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes State Metrics Core][6].

`kubernetes_state.cronjob.complete`
: Indique si le dernier job du cronjob a échoué ou non. Tags :`kube_cronjob` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.cronjob.on_schedule_check`
: Envoie une alerte si la date de la prochaine planification du cronjob est située dans le passé. Tags : `kube_cronjob` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.job.complete`
: Indique si le job a échoué ou non. Tags : `kube_job` ou `kube_cronjob` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.node.ready`
: Indique si le nœud est prêt. Tags : `node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: Indique si le nœud n'a plus d'espace disque. Tags : `node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: Indique s'il existe une pression sur le disque du nœud. Tags : `node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: Indique si le réseau du nœud est indisponible. Tags : `node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: Indique s'il existe une pression de mémoire sur le réseau du nœud. Tags : `node` `condition` `status`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/kubelet/
[2]: /fr/integrations/kube_controller_manager/
[3]: /fr/integrations/kube_apiserver_metrics/
[4]: /fr/integrations/kube_metrics_server
[5]: /fr/integrations/kube_scheduler
[6]: /fr/integrations/kubernetes_state_core/