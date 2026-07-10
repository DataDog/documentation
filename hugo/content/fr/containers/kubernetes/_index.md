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
description: Installez et configurez l'Agent Datadog sur Kubernetes
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: Centre d'apprentissage
  text: Introduction à l'observabilité de Kubernetes
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions des conteneurs Datadog (connexion à l'application
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
  text: Un guide pour mettre à l'échelle vos pods Kubernetes avec le Watermark Pod
    Autoscaler
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Surveillez vos opérateurs Kubernetes pour garantir le bon fonctionnement des
    applications
title: Kubernetes
---
{{< learning-center-callout header="Participez à une session de webinaire de formation." hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  Cette session de formation de base se concentrera sur la manière dont Datadog peut surveiller Kubernetes. Apprenez à configurer Datadog pour Kubernetes et comment commencer. Explorez les différentes vues et outils que Datadog propose pour visualiser et analyser les métriques, les traces et les journaux de votre cluster et de vos applications.
{{< /learning-center-callout >}}

## Installation de l'Agent {#agent-installation}

Vous pouvez installer l'Agent en utilisant soit le [Datadog Operator][4] soit le Helm chart en suivant le [guide d'installation dans l'application de Fleet Automation][5]. Cette interface guidée vous permet de :
- Sélectionnez votre distribution Kubernetes (par exemple EKS, AKS ou GKE)
- Générez des commandes Helm et kubectl avec votre clé API préremplie
- Activez des fonctionnalités telles que APM, la gestion des journaux, l’étiquetage et d’autres fonctionnalités de télémétrie via une configuration basée sur l’interface utilisateur


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="Étapes d'installation dans l'application pour l'Agent Datadog sur Kubernetes." style="width:90%;">}}


Le flux Datadog Operator installe le Datadog Operator et utilise des ressources personnalisées pour configurer votre couverture d'observabilité.

Le flux Helm Chart installe les composants Datadog de manière plus directe et offre des options similaires pour les fonctionnalités d'observabilité.

Les deux options vous permettent de gérer une configuration : le Datadog Operator ou le Helm chart crée le DaemonSet de l'Agent Datadog, le déploiement du Cluster Agent et toutes leurs dépendances pour votre surveillance basée sur Kubernetes

Voir [Versions prises en charge][6] pour la liste complète des versions de Kubernetes prises en charge par l'Agent Datadog.


### Installation manuelle {#manual-installation}

L'[outil d'installation dans l'application de Fleet Automation][5] fournit un moyen guidé de construire vos configurations. Vous pouvez également consulter la [documentation d'installation de Kubernetes][7] pour les étapes sur la façon de déployer et de configurer manuellement le Datadog Operator ou le Helm chart Datadog dans votre environnement

Datadog recommande d'utiliser le Datadog Operator ou le Helm chart Datadog pour déployer toutes les ressources Kubernetes pour vous Si vous devez déployer tous les manifests directement, consultez la [documentation complète d'installation manuelle de Kubernetes][8].

Pour les commandes de l'Agent, consultez les [guides des commandes de l'Agent][9]. Pour des informations sur le Datadog Cluster Agent et son rôle, consultez [Cluster Agent for Kubernetes][3].

{{< whatsnext desc="Cette section comprend les sujets suivants :">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Installation</u> : Installez l'Agent Datadog dans un environnement Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuration supplémentaire</u> : Collectez des événements, remplacez les paramètres du proxy, envoyez des métriques personnalisées avec DogStatsD, configurez des listes blanches et des listes noires de conteneurs, et consultez la liste complète des variables d'environnement disponibles.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distributions</u> : Examinez les configurations de base pour les principales distributions Kubernetes, y compris AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher et Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u> : Configurez la collecte de traces : configurez l'Agent pour accepter les traces, configurez vos Pods pour communiquer avec l'Agent, et configurez vos SDK d'application pour émettre des traces.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/appsec">}}<u>Protection des applications et des API</u> : Activez automatiquement la protection des applications et des API pour vos proxys d'entrée et passerelles Kubernetes afin de détecter les menaces et de protéger les API à la périphérie.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>Pilote CSI</u> : Installez et configurez le pilote CSI Datadog, et montez le socket UDS de DogStatsD et de l'Agent de traces en utilisant les volumes CSI Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Collecte de journaux</u> : Configurez la collecte de journaux dans un environnement Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Extraction de balises</u> : Configurez l'Agent pour créer et attribuer des balises à toutes les métriques, traces et journaux émis par un conteneur, un Pod ou un nœud, en fonction des étiquettes ou des annotations Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Intégrations et autodécouverte</u> : Pour configurer des intégrations dans un environnement Kubernetes, utilisez la fonctionnalité d'autodécouverte de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus et OpenMetrics</u> : Collectez vos métriques Prometheus et OpenMetrics exposées depuis votre application s'exécutant à l'intérieur de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Surveillance du plan de contrôle</u> : Surveillez le serveur API Kubernetes, le gestionnaire de contrôleur, le planificateur et etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Données collectées</u> : Consultez la liste des métriques collectées par l'Agent lorsqu'il est déployé sur votre cluster Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

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