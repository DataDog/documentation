---
categories:
- cloud
- configuration & deployment
- containers
- orchestration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes_state_core.md
description: Surveillez la santé de la charge de travail exécutée sur votre cluster
  Kubernetes. Suivez le statut de vos objets Kubernetes, corrélez vos métriques de
  microservice, et plus encore.
doc_link: /integrations/kubernetes_state_core/
further_reading:
- link: https://www.datadoghq.com/blog/engineering/our-journey-taking-kubernetes-state-metrics-to-the-next-level/
  tag: Blog
  text: Comment nous avons contribué à élargir les possibilités de Kubernetes State Metrics
has_logo: true
integration_id: kube-state-metrics
integration_title: Kubernetes State Metrics Core
is_public: true
kind: integration
name: kubernetes_state_core
public_title: Intégration Datadog/Kubernetes State Metrics Core
short_description: Suivez le statut de vos objets Kubernetes, corrélez vos métriques
  de microservice, et plus encore.
title: Kubernetes State Metrics Core
---

## Présentation

Recueillez des métriques du service Kubernetes en temps réel pour :

- Visualiser et surveiller les états de Kubernetes
- Être informé des failovers et des événements Kubernetes

Le check Kubernetes State Metrics Core utilise [kube-state-metrics version 2+][1] et inclut des améliorations importantes du système de tagging et des performances par rapport au check `kubernetes_state` legacy.

Contrairement à l'ancien check, avec le check Kubernetes State Metrics Core, vous n'avez plus besoin de déployer `kube-state-metrics` dans votre cluster.

Kubernetes State Metrics Core est une meilleure alternative à l'ancien check `kubernetes_state`, car il offre des métriques et des tags plus granulaires. Pour plus de détails, consultez les [changements majeurs][2] et les [données collectées][3].

## Configuration

### Installation

Le check Kubernetes State Metrics Core est inclus dans l'image de l'[Agent de cluster Datadog][4] : vous n'avez donc rien d'autre à installer sur vos serveurs Kubernetes.

### Prérequis

- Agent de cluster Datadog v1.12+

### Configuration

{{< tabs >}}
{{% tab "Helm" %}}

Ajoutez ce qui suit dans votre fichier `values.yaml` Helm :

```yaml
datadog:
  # (...)
  kubeStateMetricsCore:
    enabled: true
```

{{% /tab %}}
{{% tab "Operator" %}}

Pour activer le check `kubernetes_state_core`, le paramètre `spec.features.kubeStateMetricsCore.enabled` doit être défini sur `true` dans la ressource DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    kubeStateMetricsCore:
      enabled: true
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
```

Remarque : l'Operator Datadog 0.7.0 ou ultérieur est requis.

{{% /tab %}}
{{< /tabs >}}

## Migration de kubernetes_state à kubernetes_state_core

### Suppression de tags

Plusieurs tags du check `kubernetes_state` d'origine ont été signalés comme obsolètes et ont donc été remplacés par de nouveaux tags. Pour déterminer votre chemin de migration, vérifiez quels tags vos métriques envoient.

Le check `kubernetes_state_core` envoie uniquement les tags non obsolètes. Avant de passer du check `kubernetes_state` au check `kubernetes_state_core`, vérifiez que vous utilisez uniquement les tags officiels dans vos monitors et dashboards.

Le tableau ci-dessous indique les tags officiels qui ont remplacé les tags obsolètes :

| tag obsolète        | tag officiel                |
|-----------------------|-----------------------------|
| cluster_name          | kube_cluster_name           |
| container             | kube_container_name         |
| cronjob               | kube_cronjob                |
| daemonset             | kube_daemon_set             |
| deployment            | kube_deployment             |
| image                 | image_name                  |
| job                   | kube_job                    |
| job_name              | kube_job                    |
| namespace             | kube_namespace              |
| phase                 | pod_phase                   |
| pod                   | pod_name                    |
| replicaset            | kube_replica_set            |
| replicationcontroller | kube_replication_controller |
| statefulset           | kube_stateful_set           |

### Changements non rétrocompatibles

Le check Kubernetes State Metrics Core n'est pas rétrocompatible. Veillez à lire attentivement les changements avant d'effectuer la migration à partir de l'ancien check `kubernetes_state`.

`kubernetes_state.node.by_condition`
: Nouvelle métrique offrant une granularité au niveau des noms de nœud. Elle remplace `kubernetes_state.nodes.by_condition`.

`kubernetes_state.persistentvolume.by_phase`
: Nouvelle métrique offrant une granularité au niveau des noms de volume persistant. Elle remplace `kubernetes_state.persistentvolumes.by_phase`.

`kubernetes_state.pod.status_phase`
: La métrique reçoit les tags au niveau du pod, comme `pod_name`.

`kubernetes_state.node.count`
: La métrique ne reçoit plus le tag `host`. Elle agrège le nombre de nœuds en fonction de `kernel_version`, `os_image`, `container_runtime_version` et `kubelet_version`.

`kubernetes_state.container.waiting` et `kubernetes_state.container.status_report.count.waiting`
: Ces métriques ne génèrent plus la valeur 0 lorsqu'aucun pod n'est en attente. Elles transmettent uniquement des valeurs non nulles.

`kube_job`
: Dans `kubernetes_state`, la valeur du tag `kube_job` correspond au nom de `CronJob` si le `Job` appartenait à `CronJob`. Si ce n'est pas le cas, la valeur du tag correspond au nom de `Job`. Dans `kubernetes_state_core`, la valeur du tag `kube_job` correspond toujours au nom de `Job`, et une nouvelle clé de tag `kube_cronjob` est ajoutée au nom de `CronJob` en tant que valeur de tag. En cas de migration vers `kubernetes_state_core`, il est recommandé d'utiliser le nouveau tag ou `kube_job:foo*`, en remplaçant `foo` par le nom de `CronJob`, pour les filtres de requête.

{{< tabs >}}
{{% tab "Helm" %}}

Activez `kubeStateMetricsCore` dans votre fichier Helm `values.yaml` pour faire en sorte que l'Agent ignore le fichier de configuration automatique de l'ancien check `kubernetes_state`. L'objectif est d'éviter que les deux checks soient exécutés simultanément.

Si vous voulez tout de même activer les deux checks simultanément pendant la phase de migration, désactivez le champ `ignoreLegacyKSMCheck` dans votre fichier `values.yaml`.

**Remarque** : `ignoreLegacyKSMCheck` permet uniquement à l'Agent d'ignorer la configuration automatique de l'ancien check `kubernetes_state`. Les configurations `kubernetes_state` personnalisées doivent être supprimées manuellement.

Avec le check Kubernetes State Metrics Core, vous n'avez plus besoin de déployer `kube-state-metrics` dans votre cluster. Vous pouvez désactiver le déploiement de `kube-state-metrics` dans le chart Helm Datadog. Pour ce faire, ajoutez ce qui suit dans votre fichier Helm `values.yaml` :

```yaml
datadog:
  # (...)
  kubeStateMetricsEnabled: false
```

{{% /tab %}}
{{< /tabs >}}

**Remarque importante :** le check Kubernetes State Metrics Core est une alternative à l'ancien check `kubernetes_state`. Datadog vous conseille de ne pas activer les deux checks simultanément pour garantir la cohérence des métriques.

## Données collectées

### Métriques

`kubernetes_state.daemonset.count`
: Nombre de DaemonSets. Tags : `kube_namespace`.

`kubernetes_state.daemonset.scheduled`
: Nombre de nœuds qui exécutent au moins un pod daemon et qui sont censés le faire. Tags : `kube_daemon_set` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.daemonset.desired`
: Nombre de nœuds qui doivent exécuter le pod daemon. Tags : `kube_daemon_set` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.daemonset.misscheduled`
: Nombre de nœuds qui exécutent un pod daemon, mais ne sont pas censés le faire. Tags : `kube_daemon_set` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.daemonset.ready`
: Nombre de nœuds qui doivent exécuter le pod daemon et ont déjà au moins un pod daemon en cours d'exécution et disponible. Tags : `kube_daemon_set` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.daemonset.updated`
: Nombre total de nœuds qui exécutent le pod daemon mis à jour. Tags : `kube_daemon_set` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.daemonset.daemons_unavailable`
: Nombre de nœuds qui doivent exécuter le pod daemon et n'ont aucun pod daemon en cours d'exécution ou disponible. Tags : `kube_daemon_set` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.daemonset.daemons_available`
: Nombre de nœuds qui doivent exécuter le pod daemon et ont déjà au moins un pod daemon en cours d'exécution et disponible. Tags : `kube_daemon_set` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.count`
: Nombre de déploiements. Tags : `kube_namespace`.

`kubernetes_state.deployment.paused`
: Indique que le déploiement est interrompu et ne sera pas traité par le contrôleur de déploiement. Tags : `kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.replicas_desired`
: Nombre de pods souhaité pour un déploiement. Tags : `kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.rollingupdate.max_unavailable`
: Nombre maximal de réplicas indisponibles pendant la mise à jour en continu d'un déploiement. Tags : `kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.rollingupdate.max_surge`
: Nombre maximal de réplicas pouvant être planifiés au-delà du nombre souhaité de réplicas pendant la mise à jour en continu d'un déploiement. Tags : `kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.replicas`
: Nombre de réplicas par déploiement. Tags :`kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.replicas_available`
: Nombre de réplicas disponibles par déploiement. Tags : `kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.replicas_unavailable`
: Nombre de réplicas indisponibles par déploiement. Tags : `kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.replicas_updated`
: Nombre de réplicas mis à jour par déploiement. Tags : `kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.deployment.condition`
: Conditions du statut actuel d'un déploiement. Tags : `kube_deployment` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.endpoint.count`
: Nombre d'endpoints. Tags : `kube_namespace`.

`kubernetes_state.endpoint.address_available`
: Nombre d'adresses disponibles dans un endpoint. Tags : `endpoint` `kube_namespace`.

`kubernetes_state.endpoint.address_not_ready`
: Nombre d'adresses qui ne sont pas prêtes dans un endpoint. Tags : `endpoint` `kube_namespace`.

`kubernetes_state.namespace.count`
: Nombre d'espaces de nommage. Tags : `phase`.

`kubernetes_state.node.count`
: Nombre de nœuds. Tags : `kernel_version` `os_image` `container_runtime_version` `kubelet_version`.

`kubernetes_state.node.cpu_allocatable`
: Quantité de processeur allouable d'un nœud qui est disponible pour la planification. Tags : `node` `resource` `unit`.

`kubernetes_state.node.memory_allocatable`
: Quantité de mémoire allouable d'un nœud qui est disponible pour la planification. Tags : `node` `resource` `unit`.

`kubernetes_state.node.pods_allocatable`
: Quantité de mémoire allouable d'un nœud qui est disponible pour la planification. Tags : `node` `resource` `unit`.

`kubernetes_state.node.ephemeral_storage_allocatable`
: Quantité de stockage éphémère allouable d'un nœud qui est disponible pour la planification. Tags : `node` `resource` `unit`.

`kubernetes_state.node.cpu_capacity`
: Capacité de processeur d'un nœud. Tags : `node` `resource` `unit`.

`kubernetes_state.node.memory_capacity`
: Capacité de mémoire d'un nœud. Tags : `node` `resource` `unit`.

`kubernetes_state.node.pods_capacity`
: Capacité des pods d'un nœud. Tags : `node` `resource` `unit`.

`kubernetes_state.node.ephemeral_storage_capacity`
: Capacité de stockage éphémère d'un nœud. Tags : `node` `resource` `unit`.

`kubernetes_state.node.by_condition`
: Condition d'un nœud de cluster. Tags : `condition` `node` `status`.

`kubernetes_state.node.status`
: Indique si le nœud peut planifier de nouveaux pods. Tags : `node` `status`.

`kubernetes_state.node.age`
: Temps en secondes depuis la création du nœud. Tags : `node`.

`kubernetes_state.container.terminated`
: Indique si le conteneur possède l'état terminated. Tags : `kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.cpu_limit`
: Valeur de la limite de processeur par conteneur. Tags : `kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.memory_limit`
: Valeur de la limite de mémoire par conteneur. Tags : `kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.cpu_requested`
: Valeur de la quantité de processeur demandée par un conteneur. Tags : `kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.memory_requested`
: Valeur de la quantité de mémoire demandée par un conteneur. Tags : `kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.ready`
: Indique si la vérification de préparation des conteneurs a réussi. Tags : `kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.restarts`
: Nombre de redémarrages de conteneur par conteneur. Tags : `kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.running`
: Indique si le conteneur possède l'état running. Tags : `kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.waiting`
: Indique si le conteneur possède l'état waiting. Tags : `kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.status_report.count.waiting`
: Décrit la raison pour laquelle le conteneur possède l'état waiting. Tags : `kube_namespace` `pod_name` `kube_container_name` `reason` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.container.status_report.count.terminated`
: Décrit la raison pour laquelle le conteneur possède l'état terminated. Tags : `kube_namespace` `pod_name` `kube_container_name` `reason` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.pod.ready`
: Indique si le pod est prêt à servir les requêtes. Tags : `kube_namespace` `pod_name` `condition` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.pod.scheduled`
: Décrit le statut du processus de planification pour le pod. Tags : `kube_namespace` `pod_name` `condition` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.pod.volumes.persistentvolumeclaims_readonly`
: Indique si un persistentvolumeclaim est monté en lecture seule. Tags : `kube_namespace` `pod_name` `volume` `persistentvolumeclaim` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.pod.unschedulable`
: Décrit le statut unschedulable pour le pod. Tags : `kube_namespace` `pod_name` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.pod.status_phase`
: Phase actuelle du pod. Tags : `kube_namespace` `pod_name` `pod_phase` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.pod.age`
: Temps en secondes depuis la création du pod. Tags : `kube_namespace` `pod_name` `pod_phase` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.pod.uptime`
: Temps en secondes depuis que le pod a été planifié et reconnu par le Kubelet. Tags : `kube_namespace` `pod_name` `pod_phase` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.pod.count`
: Nombre de pods. Tags : `kube_namespace` `kube_<type propriétaire>`.

`kubernetes_state.persistentvolumeclaim.status`
: Phase dans laquelle se trouve le persistentvolumeclaim. Tags : `kube_namespace` `persistentvolumeclaim` `phase` `storageclass`.

`kubernetes_state.persistentvolumeclaim.access_mode`
: Le ou les modes d'accès spécifiés par le persistentvolumeclaim. Tags : `kube_namespace` `persistentvolumeclaim` `access_mode` `storageclass`.

`kubernetes_state.persistentvolumeclaim.request_storage`
: Capacité de stockage demandée par le persistentvolumeclaim. Tags : `kube_namespace` `persistentvolumeclaim` `storageclass`.

`kubernetes_state.persistentvolume.capacity`
: Capacité du volume persistant en octets. Tags : `persistentvolume` `storageclass`.

`kubernetes_state.persistentvolume.by_phase`
: La phase indique si un volume est disponible, lié à une demande ou libéré par une demande. Tags : `persistentvolume` `storageclass` `phase`.

`kubernetes_state.pdb.pods_healthy`
: Nombre actuel de pods sains. Tags : `kube_namespace` `poddisruptionbudget`.

`kubernetes_state.pdb.pods_desired`
: Nombre minimal souhaité de pods sains. Tags : `kube_namespace` `poddisruptionbudget`.

`kubernetes_state.pdb.disruptions_allowed`
: Nombre d'interruptions de pod autorisées. Tags : `kube_namespace` `poddisruptionbudget`.

`kubernetes_state.pdb.pods_total`
: Nombre total de pods inclus dans ce budget d'interruption. Tags : `kube_namespace` `poddisruptionbudget`.

`kubernetes_state.secret.type`
: Type de secret. Tags : `kube_namespace` `secret` `type`.

`kubernetes_state.replicaset.count`
: Nombre de ReplicaSets. Tags : `kube_namespace` `kube_deployment`.

`kubernetes_state.replicaset.replicas_desired`
: Nombre de pods souhaité pour un ReplicaSet. Tags : `kube_namespace` `kube_replica_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.replicaset.fully_labeled_replicas`
: Nombre de réplicas entièrement étiquetés par ReplicaSet. Tags : `kube_namespace` `kube_replica_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.replicaset.replicas_ready`
: Nombre de réplicas prêts par ReplicaSet. Tags : `kube_namespace` `kube_replica_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.replicaset.replicas`
: Nombre de réplicas par ReplicaSet. Tags : `kube_namespace` `kube_replica_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.replicationcontroller.replicas_desired`
: Nombre de pods souhaité pour un ReplicationController. Tags : `kube_namespace` `kube_replication_controller`.

`kubernetes_state.replicationcontroller.replicas_available`
: Nombre de réplicas disponibles par ReplicationController. Tags : `kube_namespace` `kube_replication_controller`.

`kubernetes_state.replicationcontroller.fully_labeled_replicas`
: Nombre de réplicas entièrement étiquetés par ReplicationController. Tags : `kube_namespace` `kube_replication_controller`.

`kubernetes_state.replicationcontroller.replicas_ready`
: Nombre de réplicas prêts par ReplicationController. Tags : `kube_namespace` `kube_replication_controller`.

`kubernetes_state.replicationcontroller.replicas`
: Nombre de réplicas par ReplicationController. Tags : `kube_namespace` `kube_replication_controller`.

`kubernetes_state.statefulset.count`
: Nombre de StatefulSets. Tags : `kube_namespace`.

`kubernetes_state.statefulset.replicas_desired`
: Nombre de pods souhaité pour un StatefulSet. Tags : `kube_namespace` `kube_stateful_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.statefulset.replicas`
: Nombre de réplicas par StatefulSet. Tags : `kube_namespace` `kube_stateful_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.statefulset.replicas_current`
: Nombre de réplicas actuel par StatefulSet. Tags : `kube_namespace` `kube_stateful_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.statefulset.replicas_ready`
: Nombre de réplicas prêts par StatefulSet. Tags : `kube_namespace` `kube_stateful_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.statefulset.replicas_updated`
: Nombre de réplicas mis à jour par StatefulSet. Tags : `kube_namespace` `kube_stateful_set` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.hpa.count`
: Nombre d'autoscalers de pods horizontaux. Tags : `kube_namespace`.

`kubernetes_state.hpa.min_replicas`
: Limite inférieure du nombre de pods pouvant être définis par l'autoscaler. Valeur par défaut : 1. Tags : `kube_namespace` `horizontalpodautoscaler`.

`kubernetes_state.hpa.max_replicas`
: Limite supérieure du nombre de pods pouvant être définis par l'autoscaler ; cette valeur ne peut pas être inférieure à MinReplicas. Tags : `kube_namespace` `horizontalpodautoscaler`.

`kubernetes_state.hpa.condition`
: Condition de cet autoscaler. Tags : `kube_namespace` `horizontalpodautoscaler` `condition` `status`.

`kubernetes_state.hpa.desired_replicas`
: Nombre souhaité de réplicas de pods gérés par cet autoscaler. Tags : `kube_namespace` `horizontalpodautoscaler`.

`kubernetes_state.hpa.current_replicas`
: Nombre actuel de réplicas de pods gérés par cet autoscaler. Tags : `kube_namespace` `horizontalpodautoscaler`.

`kubernetes_state.hpa.spec_target_metric`
: Spécifications de métriques utilisées par cet autoscaler lors du calcul du nombre de réplicas souhaité. Tags : `kube_namespace` `horizontalpodautoscaler` `metric_name` `metric_target_type`.

`kubernetes_state.vpa.count`
: Nombre d'autoscalers de pods verticaux. Tags : `kube_namespace`.

`kubernetes_state.vpa.lower_bound`
: Ressources minimales que le conteneur peut utiliser avant que le service de mise à jour du VerticalPodAutoscaler ne l'exclue. Tags : `kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.target`
: Ressources cibles recommandées par le VerticalPodAutoscaler pour le conteneur. Tags : `kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.uncapped_target`
: Ressources cibles recommandées par le VerticalPodAutoscaler pour le conteneur en ignorant les limites. Tags : `kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.upperbound`
: Ressources maximales que le conteneur peut utiliser avant que le service de mise à jour du VerticalPodAutoscaler ne l'exclue. Tags : `kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.update_mode`
: Mode de mise à jour du VerticalPodAutoscaler. Tags : `kube_namespace` `verticalpodautoscaler` `target_api_version` `target_kind` `target_name` `update_mode`.

`kubernetes_state.vpa.spec_container_minallowed`
: Ressources minimales que le VerticalPodAutoscaler peut définir pour les conteneurs dont le nom correspond. Tags : `kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.spec_container_maxallowed`
: Ressources maximales que le VerticalPodAutoscaler peut définir pour les conteneurs dont le nom correspond. Tags : `kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.cronjob.count`
: Nombre de cronjobs. Tags :`kube_namespace`.

`kubernetes_state.cronjob.spec_suspend`
: Le flag suspend indique au contrôleur de suspendre les exécutions ultérieures. Tags : `kube_namespace` `kube_cronjob` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.cronjob.duration_since_last_schedule`
: Temps écoulé depuis la dernière fois que le cronjob a été planifié. Tags : `kube_cronjob` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.job.count`
: Nombre de jobs. Tags : `kube_namespace` `kube_cronjob`.

`kubernetes_state.job.failed`
: Nombre de pods qui ont atteint la phase Failed. Tags : `kube_job` ou `kube_cronjob` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.job.succeeded`
: Nombre de pods qui ont atteint la phase Succeeded. Tags : `kube_job` ou `kube_cronjob` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.job.completion.succeeded`
: Job dont l'exécution est terminée. Tags : `kube_job` ou `kube_cronjob` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.job.completion.failed`
: Job dont l'exécution a échoué. Tags : `kube_job` ou `kube_cronjob` `kube_namespace` (`env` `service` `version` à partir des étiquettes standard).

`kubernetes_state.resourcequota.<resource>.limit`
: Informations sur les limites de quota de ressource par ressource. Tags : `kube_namespace` `resourcequota`.

`kubernetes_state.resourcequota.<resource>.used`
: Informations sur l'utilisation du quota de ressource par ressource. Tags : `kube_namespace` `resourcequota`.

`kubernetes_state.limitrange.cpu.min`
: Informations sur l'utilisation de la plage de limite de processeur par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.cpu.max`
: Informations sur l'utilisation de la plage de limite de processeur par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.cpu.default`
: Informations sur l'utilisation de la plage de limite de processeur par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.cpu.default_request`
: Informations sur l'utilisation de la plage de limite de processeur par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.cpu.max_limit_request_ratio`
: Informations sur l'utilisation de la plage de limite de processeur par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.min`
: Informations sur l'utilisation de la plage de limite de mémoire par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.max`
: Informations sur l'utilisation de la plage de limite de mémoire par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.default`
: Informations sur l'utilisation de la plage de limite de mémoire par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.default_request`
: Informations sur l'utilisation de la plage de limite de mémoire par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.max_limit_request_ratio`
: Informations sur l'utilisation de la plage de limite de mémoire par contrainte. Tags : `kube_namespace` `limitrange` `type`.

`kubernetes_state.service.count`
: Nombre de services. Tags : `kube_namespace` `type`.

`kubernetes_state.service.type`
: Types de service. Tags : `kube_namespace` `kube_service` `type`.

**Remarque :** vous pouvez configurer des [étiquettes standard Datadog][5] sur vos objets Kubernetes pour récupérer les tags `env` `service` `version`.

### Événements

Le check Kubernetes State Metrics Core n'inclut aucun événement.

### Checks de service

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

### Validation

[Lancez la sous-commande `status` de l'Agent de cluster][6] dans le conteneur de votre Agent de cluster et recherchez `kubernetes_state_core` dans la section Checks.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://kubernetes.io/blog/2021/04/13/kube-state-metrics-v-2-0/
[2]: /fr/integrations/kubernetes_state_core/#migration-from-kubernetes_state-to-kubernetes_state_core
[3]: /fr/integrations/kubernetes_state_core/#data-collected
[4]: /fr/agent/cluster_agent/
[5]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[6]: /fr/agent/guide/agent-commands/?tab=clusteragent#agent-status-and-information
[7]: /fr/help/