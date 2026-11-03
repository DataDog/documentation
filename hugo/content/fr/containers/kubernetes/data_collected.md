---
aliases:
- /fr/agent/kubernetes/metrics
- /fr/agent/kubernetes/data_collected
description: Guide de référence pour les métriques et les événements collectés par
  le Datadog Agent à partir des clusters Kubernetes
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
Cette page répertorie les données recueillies par le Datadog Agent lorsqu'il est déployé sur un cluster Kubernetes. Les métriques recueillies peuvent varier en fonction de la version de Kubernetes utilisée.

**Remarque** : pour les conteneurs Windows, consultez [Métriques limitées pour les déploiements Windows][7].

## Métriques {#metrics}

### Kubernetes {#kubernetes}

{{< get-metrics-from-git "kubernetes" >}}

**Remarque** : pour plus d'informations sur les métriques `kubernetes.cpu.*`, consultez [Discrepancies in `kubernetes.cpu.*` and `container.cpu.*` metrics][8].

### Kubelet {#kubelet}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubelet][1].

**Remarque** : sur Kubernetes v1.37 et versions ultérieures, l'Agent ne collecte pas la métrique `kubernetes.cpu.load.10s.avg`. Le cAdvisor intégré au kubelet sur ces versions n'exporte pas la métrique `container_cpu_load_average_10s` sous-jacente.

{{< get-metrics-from-git "kubelet" >}}

### Kubernetes state metrics core {#kubernetes-state-metrics-core}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes State Metrics Core][6]. Ce check nécessite Datadog Cluster Agent v1.12 ou version ultérieure.

{{< get-metrics-from-git "kubernetes_state_core" >}}

### Kubernetes state {#kubernetes-state}

**Remarque** : les métriques `kubernetes_state.*` sont collectées à partir de l'API `kube-state-metrics`. Le check `kubernetes_state` est un check hérité. Pour une alternative, consultez [Kubernetes state metrics core][6]. Datadog recommande de ne pas activer les deux checks simultanément.

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


## Événements{#events}

- Temporisation
- Conflit
- Supprimer
- Suppression de tous les pods en cours
- Ressources insuffisantes
- Erreur
- Échec
- Échec de création
- Échec de suppression
- Échec de montage
- Échec de synchronisation
- Échec de validation
- Échec de libération d'espace disque
- Conflit de port de host
- CPU libre insuffisante
- Mémoire libre insuffisante
- Capacité de disque invalide
- Suppression en cours
- Échec de configuration du Kubelet
- Nœud non prêt
- Nœud hors disque
- Hors disque
- Redémarré
- Tous les pods terminés
- Incapable
- Non sain

## Checks de service {#service-checks}

### Kubelet {#kubelet-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubelet][1].

{{< get-service-checks-from-git "kubelet" >}}

### Kubernetes controller manager {#kubernetes-controller-manager-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Controller Manager][2].

{{< get-service-checks-from-git "kube-controller-manager" >}}

### Kubernetes metrics server {#kubernetes-metrics-server-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Metrics Server][4].

{{< get-service-checks-from-git "kube-metrics-server" >}}

### Kubernetes scheduler {#kubernetes-scheduler-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes Scheduler][5].

{{< get-service-checks-from-git "kube-scheduler" >}}

### Kubernetes state metrics core {#kubernetes-state-metrics-core-1}

Pour en savoir plus, consultez la documentation relative à l'intégration [Kubernetes State Metrics Core][6].

`kubernetes_state.cronjob.complete`
: Indique si le dernier job du cronjob a échoué ou non. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` issus des labels standards).

`kubernetes_state.cronjob.on_schedule_check`
: Alerte si le prochain planning du cronjob est dans le passé. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` issus des labels standards).

`kubernetes_state.job.complete`
: Indique si le job a échoué ou non. Tags:`kube_job` ou `kube_cronjob` `kube_namespace` (`env` `service` `version` issus des labels standards).

`kubernetes_state.node.ready`
: Indique si le nœud est prêt. Tags:`node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: Si le nœud est à court d'espace disque. Tags:`node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: Indique si le nœud est soumis à une pression sur le disque. Tags:`node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: Indique si le réseau du nœud est indisponible. Tags:`node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: Indique si le réseau du nœud est soumis à une pression sur la mémoire. Tags:`node` `condition` `status`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/kubelet/
[2]: /fr/integrations/kube_controller_manager/
[3]: /fr/integrations/kube_apiserver_metrics/
[4]: /fr/integrations/kube_metrics_server
[5]: /fr/integrations/kube_scheduler
[6]: /fr/integrations/kubernetes_state_core/
[7]: /fr/agent/troubleshooting/windows_containers/#limited-metrics-for-windows-deployments
[8]: /fr/containers/faq/cpu-usage-metrics