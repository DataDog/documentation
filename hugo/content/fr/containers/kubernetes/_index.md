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
description: Surveillez Kubernetes avec le Datadog Agent ou OpenTelemetry.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: Centre d'apprentissage
  text: Premiers pas avec l'observabilité Kubernetes
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions de Datadog Containers (connexion à l'application
    requise).
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/guide/docker-deprecation
  tag: Documentation
  text: Dépréciation du runtime Docker dans Kubernetes
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour obtenir des informations grâce sur
    la surveillance Kubernetes
- link: https://www.datadoghq.com/blog/watermark-pod-autoscaler/
  tag: Blog
  text: Un guide sur le déploiement horizontal de vos pods Kubernetes avec le Watermark
    Pod Autoscaler.
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Surveillez vos opérateurs Kubernetes pour assurer le bon fonctionnement de
    vos applications.
title: Kubernetes
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  Cette session de validation des bases se concentrera sur la manière dont Datadog peut surveiller Kubernetes. Apprenez à configurer Datadog pour Kubernetes et à démarrer. Explorez les différentes vues et outils que Datadog propose pour visualiser et analyser les métriques, traces et logs de votre cluster et de vos applications.
{{< /learning-center-callout >}}

Pour envoyer des ressources Kubernetes et des métriques d'infrastructure à Datadog avec OpenTelemetry au lieu du Datadog Agent, consultez [Surveiller Kubernetes avec OpenTelemetry][10].

## Installation de l'Agent {#agent-installation}

Vous pouvez installer l'Agent en utilisant soit le [Datadog Operator][4], soit le chart Helm en suivant le [guide d'installation intégré à l'application dans Fleet Automation][5]. Cette interface guidée vous permet de :
- Sélectionner votre distribution Kubernetes (par exemple EKS, AKS ou GKE)
- Générer des commandes helm et kubectl avec votre clé d'API préremplie
- Activer des fonctionnalités telles qu'APM, Log Management, le tagging et d'autres options de télémétrie via une configuration basée sur l'interface utilisateur.


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="Étapes d'installation intégrées à l'application pour le Datadog Agent sur Kubernetes." style="width:90%;">}}


Le flux du Datadog Operator installe le Datadog Operator et utilise des ressources personnalisées pour configurer votre couverture d'observabilité.

Le flux du chart Helm installe les composants Datadog plus directement et propose des options similaires pour les fonctionnalités d'observabilité.

Les deux options vous permettent de gérer une configuration : le Datadog Operator ou le chart Helm crée le DaemonSet du Datadog Agent, le déploiement de l'Agent de cluster et toutes leurs dépendances pour votre surveillance basée sur Kubernetes.

Consultez [Versions prises en charge][6] pour obtenir la liste complète des versions de Kubernetes prises en charge par le Datadog Agent.


### Installation manuelle {#manual-installation}

L'[outil d'installation intégré à l'application dans Fleet Automation][5] fournit un moyen guidé de créer vos configurations. Vous pouvez également consulter la [documentation d'installation de Kubernetes][7] pour connaître les étapes de déploiement et de configuration manuelle du Datadog Operator ou du chart Helm Datadog dans votre environnement.

Datadog recommande d'utiliser le Datadog Operator ou le chart Helm Datadog pour déployer toutes les ressources Kubernetes pour vous. Si vous devez déployer tous les manifestes directement, consultez la [documentation complète d'installation manuelle de Kubernetes][8].

Pour les commandes de l'Agent, consultez les [guides des commandes de l'Agent][9]. Pour plus d'informations sur le Datadog Cluster Agent et son rôle, consultez [Cluster Agent pour Kubernetes][3].

{{< whatsnext desc="Cette section comprend les sujets suivants :">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Installation</u> : Installez le Datadog Agent dans un environnement Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuration supplémentaire</u> : Collectez des événements, remplacez les paramètres de proxy, envoyez des métriques personnalisées avec DogStatsD, configurez les listes d'autorisation et de blocage de conteneurs, et consultez la liste complète des variables d'environnement disponibles.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distributions</u> : Examinez les configurations de base pour les principales distributions Kubernetes, notamment AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher et Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u> : Configurez la collecte de traces : configurez l'Agent pour accepter les traces, configurez vos Pods pour communiquer avec l'Agent et configurez vos SDK d'application pour émettre des traces.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/appsec">}}<u>Protection des applications et des API</u> : Activez automatiquement la protection des applications et des API pour vos proxys d'entrée et passerelles Kubernetes afin de détecter les menaces et de protéger les API en périphérie.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>Pilote CSI</u> : Installez et configurez le pilote CSI Datadog, et montez le socket UDS de DogStatsD et de l'Agent de trace en utilisant les volumes CSI Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Collecte de logs</u> : Configurez la collecte de logs dans un environnement Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Extraction de tags</u> : Configurez l'Agent pour créer et attribuer des tags à toutes les métriques, traces et logs émis par un conteneur, un Pod ou un Nœud, en fonction des labels ou annotations Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Intégrations et Autodiscovery</u> : Pour configurer des intégrations dans un environnement Kubernetes, utilisez la fonctionnalité Autodiscovery de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus et OpenMetrics</u> : Collectez vos métriques Prometheus et OpenMetrics exposées depuis votre application exécutée dans Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Surveillance du plan de contrôle</u> : Surveillez le serveur API Kubernetes, le gestionnaire de contrôleur, le planificateur et etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Données collectées</u> : Consultez la liste des métriques collectées par l'Agent lorsqu'il est déployé sur votre cluster Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/kubernetes-legacy/
[2]: /fr/agent/configuration/agent-commands/
[3]: /fr/containers/cluster_agent/
[4]: https://docs.datadoghq.com/fr/containers/datadog_operator/
[5]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[6]: /fr/containers/kubernetes/installation?tab=datadogoperator#minimum-kubernetes-and-datadog-agent-versions
[7]: /fr/containers/kubernetes/installation
[8]: https://docs.datadoghq.com/fr/containers/guide/kubernetes_daemonset/
[9]: /fr/agent/configuration/agent-commands/
[10]: /fr/containers/kubernetes/opentelemetry/