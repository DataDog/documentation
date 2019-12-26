---
integration_title: Kubernetes
name: kubernetes
kind: integration
git_integration_title: kubernetes
newhlevel: true
updated_for_agent: 6
description: 'Surveillez la santé de votre cluster Kubernetes et des applications qui y sont exécutées. Enregistrez des événements de planification de Pod, suivez le statut de vos Kubelets, et plus encore.'
is_public: true
aliases:
  - /fr/tracing/api/
  - /fr/integrations/kubernetes_state/
  - /fr/integrations/kube_proxy/
  - /fr/integrations/Kubernetes
public_title: Intégration Datadog/Kubernetes
short_description: 'Enregistrez des événements de planification de Pod, suivez le statut de vos Kubelets, et plus encore.'
categories:
  - cloud
  - configuration & deployment
  - containers
  - orchestration
  - log collection
doc_link: /integrations/kubernetes/
ddtype: check
---
{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Dashboard Kubernetes" responsive="true" >}}

## Présentation

Recueillez des métriques et des logs du service kubernetes en temps réel pour :

* Visualiser et surveiller les états de Kubernetes
* Être informé des failovers et des événements de kubernetes

Pour Kubernetes, il est recommandé d'exécuter l'Agent dans un DaemonSet. Nous avons créé une [image Docker][1] comprenant les intégrations Docker et Kubernetes activées.

Vous pouvez également vous contenter d'exécuter l'Agent Datadog sur votre host et de le configurer de façon à rassembler vos métriques Kubernetes.

## Configurer Kubernetes

[Consultez la documentation dédiée pour choisir la configuration idéale pour votre intégration Kubernetes][2]

## Configurer Kubernetes State
### Installation

Pour recueillir vos métriques kube-state :

1. Téléchargez le [dossier des manifestes Kube-State][3].

2. Appliquez-les à votre cluster Kubernetes :
  ```
  kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
  ```

Une fois l'opération terminée, l’intégration Kubernetes State collecte automatiquement les métriques kube-state.

## Configurer Kubernetes DNS
### Configuration

Depuis [l'Agent v6][4], l'intégration Kubernetes DNS fonctionne automatiquement avec l'[Autodiscovery][5].

Remarque : ces métriques ne sont actuellement pas disponibles pour Azure Kubernetes Service (AKS).

## Recueillir des logs de conteneur

**Disponible à partir des versions > 6.0 de l'Agent**

Deux installations différentes sont possibles :

- Sur le nœud où l'Agent est en dehors de l'environnement Docker
- Déploiement avec une version conteneurisée dans l'environnement Docker

Tirez profit des DaemonSets pour [déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds][6]. Vous pouvez également suivre les [étapes de collecte de logs de conteneur][7] pour commencer à recueillir des logs depuis tous vos conteneurs.

## Données collectées
### Métriques
#### Kubernetes
{{< get-metrics-from-git "kubernetes" >}}

#### Kubelet
{{< get-metrics-from-git "kubelet" >}}

#### Kubernetes State

Notez que les métriques `kubernetes_state.*` sont rassemblées depuis l'API `kube-state-metrics`.

{{< get-metrics-from-git "kubernetes_state" >}}

#### Kubernetes DNS
{{< get-metrics-from-git "kube_dns" >}}

#### Proxy Kubernetes
{{< get-metrics-from-git "kube_proxy" >}}

### Événements

Depuis la version 5.17.0, l'Agent Datadog prend en charge [l'option d'élection de leader][8] intégrée pour la collecte d'événement Kubernetes. Une fois cette option activée, vous n'avez plus besoin de déployer un conteneur de collecte d'événement supplémentaire sur votre cluster. Les Agents s'organisent pour s'assurer qu'une seule instance d'Agent à la fois rassemble des événements. Les événements ci-dessous sont disponibles :

* Backoff
* Conflict
* Delete
* DeletingAllPods
* Didn't have enough resource
* Error
* Failed
* FailedCreate
* FailedDelete
* FailedMount
* FailedSync
* Failedvalidation
* FreeDiskSpaceFailed
* HostPortConflict
* InsufficientFreeCPU
* InsufficientFreeMemory
* InvalidDiskCapacity
* Killing
* KubeletsetupFailed
* NodeNotReady
* NodeoutofDisk
* OutofDisk
* Rebooted
* TerminatedAllPods
* Unable
* Unhealthy

### Checks de service

Le check Kubernetes contient les checks de service suivants :

* `kubernetes.kubelet.check`: <br>
  s'il renvoie `CRITICAL`, `kubernetes.kubelet.check.ping` ou `kubernetes.kubelet.check.syncloop` est dans un état `CRITICAL` ou `NO DATA`.

* `kubernetes.kubelet.check.ping`:<br>
  s'il renvoie `CRITICAL` ou `NO DATA`, l'API Kubelet n'est pas disponible.

* `kubernetes.kubelet.check.syncloop`:<br>
  s'il renvoie `CRITICAL` ou `NO DATA`, la boucle de synchronisation de Kubelet qui met à jour les conteneurs ne fonctionne pas.

* `kubernetes_state.node.ready`:<br>
  renvoie `CRITICAL` si le nœud du cluster n'est pas prêt. Si ce n'est pas le cas, renvoie `OK`.

* `kubernetes_state.node.out_of_disk`:<br>
  renvoie `CRITICAL` si un nœud de cluster manque d'espace disque. Si ce n'est pas le cas, renvoie `OK`.

* `kubernetes_state.node.disk_pressure`:<br>
  renvoie `CRITICAL` si un nœud de cluster enregistre un état de pression de disque. Si ce n'est pas le cas, renvoie `OK`.

* `kubernetes_state.node.memory_pressure`:<br>
  renvoie `CRITICAL` si un nœud de cluster enregistre un état de pression de la mémoire. Si ce n'est pas le cas, renvoie `OK`.

* `kubernetes_state.node.network_unavailable`:<br>
  renvoie `CRITICAL` si un nœud de cluster enregistre un état d'indisponibilité du réseau. Si ce n'est pas le cas, renvoie `OK`.

* `kubernetes_state.cronjob.on_schedule_check`:<br>
  Renvoie `CRITICAL` si la date de planification d'une tâche cron est située dans le passé. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

* [Est-il possible d'installer l'Agent sur mon ou mes nœuds Kubernetes maîtres ?][9]
* [Pourquoi mon check Kubernetes échoue-t-il et affiche-t-il une erreur ConnectTimeout sur le port 10250 ?][10]
* [Comment transmettre les métriques sur le disque host lorsque dd-agent s'exécute sur un conteneur docker ?][11]
* [Authentification client auprès de l'apiserver et de kubelet][12]
* [Utilisation de l'autorisation RBAC avec votre intégration Kubernetes][13]

## Pour aller plus loin

Pour mieux comprendre comment (et pourquoi) intégrer votre service Kubernetes, consultez la [série d'articles de blog][14] de Datadog à ce sujet.

[1]: https://hub.docker.com/r/datadog/agent
[2]: /fr/agent/basic_agent_usage/kubernetes
[3]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[4]: /fr/agent
[5]: /fr/agent/autodiscovery
[6]: https://app.datadoghq.com/account/settings#agent/kubernetes
[7]: /fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[8]: /fr/agent/basic_agent_usage/kubernetes/#event_collection
[9]: /fr/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[10]: /fr/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[11]: /fr/agent/faq/getting-further-with-docker
[12]: /fr/integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[13]: /fr/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[14]: https://www.datadoghq.com/blog/monitoring-kubernetes-era