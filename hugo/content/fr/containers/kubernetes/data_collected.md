---
aliases:
- /fr/agent/kubernetes/metrics
- /fr/agent/kubernetes/data_collected
description: Guide de référence pour les métriques et événements collectés par l'Agent
  Datadog à partir des clusters Kubernetes
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
title: Données Kubernetes recueillies
---
Cette page répertorie les données recueillies par l'Agent Datadog lorsqu'il est déployé sur un cluster Kubernetes. Les métriques recueillies peuvent varier en fonction de la version de Kubernetes utilisée.

**Remarque** : Pour les conteneurs Windows, voir [Métriques limitées pour les déploiements Windows][7].

## Métriques {#metrics}

### Kubernetes {#kubernetes}

{{< get-metrics-from-git "kubernetes" >}}

**Remarque** : Pour plus d'informations sur les métriques `kubernetes.cpu.*`, voir [les divergences entre les métriques `kubernetes.cpu.*` et `container.cpu.*`][8].

### Kubelet {#kubelet}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubelet][1].

{{< get-metrics-from-git "kubelet" >}}

### Métriques d'état de Kubernetes core {#kubernetes-state-metrics-core}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes State Metrics Core][6]. Cette vérification nécessite Datadog Cluster Agent v1.12 ou une version ultérieure.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### État de Kubernetes {#kubernetes-state}

**Remarque** : Les métriques `kubernetes_state.*` sont collectées à partir de l'API `kube-state-metrics`. La vérification `kubernetes_state` est une vérification héritée. Pour une alternative, voir [Métriques d'état de Kubernetes core][6]. Datadog recommande de ne pas activer les deux vérifications simultanément.

{{< get-metrics-from-git "kubernetes_state" >}}

### Kubernetes DNS {#kubernetes-dns}

{{< get-metrics-from-git "kube-dns" >}}

### Kubernetes proxy {#kubernetes-proxy}

{{< get-metrics-from-git "kube-proxy" >}}

### Kubernetes API server {#kubernetes-api-server}

Pour en savoir plus, consultez la documentation relative à l'intégration du [serveur d'API Kubernetes][3].

{{< get-metrics-from-git "kube-apiserver-metrics" >}}

### Kubernetes controller manager {#kubernetes-controller-manager}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Controller Manager][2].

{{< get-metrics-from-git "kube-controller-manager" >}}

### Kubernetes metrics server {#kubernetes-metrics-server}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Metrics Server][4].

{{< get-metrics-from-git "kube-metrics-server" >}}

### Kubernetes scheduler {#kubernetes-scheduler}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Scheduler][5].

{{< get-metrics-from-git "kube-scheduler" >}}


## Événements {#events}

- Backoff
- Conflit
- Supprimer
- DeletingAllPods
- Ressources insuffisantes
- Erreur
- Échoué
- ÉchecDeLaCréation
- ÉchecDeLaSuppression
- ÉchecDuMontage
- ÉchecDeLaSynchronisation
- ÉchecDeLaValidation
- ÉchecDeL'EspaceDisqueLibre
- ConflitDePortHôte
- CPULibreInsuffisant
- MémoireLibreInsuffisante
- CapacitéDeDisqueInvalide
- Tuer
- ÉchecDeConfigurationDuKubelet
- NœudPasPrêt
- Nœud hors de disque
- Hors de disque
- Redémarré
- TousLesPodsTerminés
- Impossible
- Non sain

## Vérifications de service {#service-checks}

### Kubelet {#kubelet-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubelet][1].

{{< get-service-checks-from-git "kubelet" >}}

### Gestionnaire de contrôleur Kubernetes {#kubernetes-controller-manager-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Controller Manager][2].

{{< get-service-checks-from-git "kube-controller-manager" >}}

### Serveur de métriques Kubernetes {#kubernetes-metrics-server-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Metrics Server][4].

{{< get-service-checks-from-git "kube-metrics-server" >}}

### Planificateur Kubernetes {#kubernetes-scheduler-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Scheduler][5].

{{< get-service-checks-from-git "kube-scheduler" >}}

### Métriques d'état de Kubernetes core {#kubernetes-state-metrics-core-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes State Metrics Core][6].

`kubernetes_state.cronjob.complete`
: Indique si le dernier travail du cronjob a échoué ou non. Étiquettes : `kube_cronjob` `kube_namespace` (`env` `service` `version` des étiquettes standard).

`kubernetes_state.cronjob.on_schedule_check`
: Alerte si le prochain horaire du cronjob est dans le passé. Étiquettes : `kube_cronjob` `kube_namespace` (`env` `service` `version` des étiquettes standard).

`kubernetes_state.job.complete`
: Indique si le travail a échoué ou non. Étiquettes : `kube_job` ou `kube_cronjob` `kube_namespace` (`env` `service` `version` des étiquettes standard).

`kubernetes_state.node.ready`
: Indique si le nœud est prêt. Étiquettes : `node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: Indique si le nœud n’a plus d’espace disque. Étiquettes : `node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: Indique si le nœud subit une pression sur le disque. Étiquettes : `node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: Indique si le réseau du nœud est indisponible. Étiquettes : `node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: Indique si le réseau du nœud subit une pression sur la mémoire. Étiquettes : `node` `condition` `status`.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/kubelet/
[2]: /fr/integrations/kube_controller_manager/
[3]: /fr/integrations/kube_apiserver_metrics/
[4]: /fr/integrations/kube_metrics_server
[5]: /fr/integrations/kube_scheduler
[6]: /fr/integrations/kubernetes_state_core/
[7]: /fr/agent/troubleshooting/windows_containers/#limited-metrics-for-windows-deployments
[8]: /fr/containers/faq/cpu-usage-metrics