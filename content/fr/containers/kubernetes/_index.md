---
aliases:
- /fr/guides/basic_agent_usage/kubernetes
- /fr/agent/basic_agent_usage/kubernetes
- /fr/tracing/kubernetes/
- /fr/tracing/setup/kubernetes
- /fr/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
- /fr/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
- /fr/integrations/faq/docker-ecs-kubernetes-events/
- /fr/integrations/faq/container-integration-event/
- /fr/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250/
- /fr/agent/kubernetes/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions des conteneurs Datadog (connexion à l'application
    requise).
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/guide/docker-deprecation
  tag: Documentation
  text: Dépréciation du runtime Docker dans Kubernetes
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour obtenir des informations grâce sur
    la surveillance Kubernetes
title: Kubernetes
---

## Présentation

Exécutez l'Agent Datadog dans votre cluster Kubernetes pour commencer à recueillir les métriques, traces et logs issus de votre cluster et de vos applications.

**Remarque** : l'Agent v6.0+ prend uniquement en charge Kubernetes v1.7.6+. Pour les versions antérieures de Kubernetes, consultez la section [Versions antérieures de Kubernetes][1].

Pour les commandes de l'Agent, consultez les [guides sur les commandes de l'Agent][2].

Pour en savoir plus sur lʼAgent de cluster Datadog, qui propose une approche simplifiée de la collecte des données de surveillance au niveau du cluster, consultez la section [Agent de cluster pour Kubernetes][3].

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Installation</u> : Installer l'Agent Datadog dans un environnement Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuration supplémentaire</u> : Recueillir des événements, remplacer les paramètres de proxy, envoyer des métriques custom avec DogStatsD, configurer des listes d'inclusion et d'exclusion de conteneurs, et consulter la liste complète des variables d'environnement disponibles.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distributions</u> : Passer en revue les configurations de base pour les principales distributions Kubernetes, y compris AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher et Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u> : Configurer la collecte de traces : configurer l'Agent pour qu'il accepte les traces, configurer vos pods pour qu'ils communiquent avec l'Agent, et configurer vos traceurs d'application pour qu'ils génèrent des traces.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Collecte de logs</u> : Configurer la collecte de logs dans un environnement Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Extraction de tags</u> : Configurer l'Agent afin de créer et d'attribuer des tags à l'ensemble des métriques, traces et logs générés par un conteneur, pod ou nœud, en fonction d'étiquettes ou d'annotations Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Intégrations et Autodiscovery</u> : Configurer des intégrations dans un environnement Kubernetes avec la fonctionnalité Autodiscovery de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus et OpenMetrics</u> : Recueillir vos métriques Prometheus et OpenMetrics exposées à partir d'une application exécutée dans Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Surveillance du plan de contrôle</u> : Surveiller le serveur d'API Kubernetes, le controller manager, le scheduler et etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Données collectées</u> : Consulter la liste des métriques collectées par l'Agent lorsqu'il est déployé sur votre cluster Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/kubernetes-legacy/
[2]: /fr/agent/configuration/agent-commands/
[3]: /fr/containers/cluster_agent/