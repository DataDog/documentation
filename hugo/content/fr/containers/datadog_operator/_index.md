---
aliases:
- /fr/agent/kubernetes/operator_configuration
- /fr/containers/kubernetes/operator_configuration
description: Déployez et gérez l'Agent Datadog sur Kubernetes en utilisant l'Opérateur
  Datadog
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: guide
  text: Débuter avec l'Operator Datadog
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: Code source
  text: 'Operator Datadog : installation avancée'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: Code source
  text: 'Operator Datadog : configuration'
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centre d'Architecture
  text: Instrumentez votre application en utilisant l'Opérateur Datadog et le Contrôleur
    d'Admission
title: Operator Datadog
---
L'[Operator Datadog][1] est un [Operator Kubernetes][2] open source qui vous permet de déployer et de configurer l'Agent Datadog dans un environnement Kubernetes. 

En utilisant l'Opérateur, vous pouvez utiliser un seul Custom Resource Definition (CRD) pour déployer le node-based Agent, [Cluster Agent][3] et [cluster checks runner][4]. L'Opérateur rapporte l'état de déploiement, la santé et les erreurs dans l'état de la CRD de l'Opérateur. Parce que l'Opérateur utilise des options de configuration de niveau supérieur, il limite le risque de mauvaise configuration.

Une fois l'Agent déployé, l'Operator Datadog apporte les fonctionnalités suivantes :

- Validation de vos configurations d'Agent
- Maintenir tous les Agents à jour avec votre configuration
- Orchestration pour créer et mettre à jour les ressources d'Agent
- Rapport de l'état de configuration de l'Agent dans l'état de la CRD de l'Opérateur
- Optionnellement, utilisation d'un déploiement avancé de DaemonSet en utilisant [ExtendedDaemonSet][5] de Datadog

### Pourquoi utiliser l'Opérateur Datadog au lieu d'un Helm chart ou d'un DaemonSet ? {#why-use-the-datadog-operator-instead-of-a-helm-chart-or-daemonset}

Vous pouvez également utiliser un Helm chart ou un DaemonSet pour installer l'Agent Datadog sur Kubernetes. Cependant, l'utilisation de l'Opérateur Datadog offre les avantages suivants :

- L'Opérateur a des valeurs par défaut intégrées basées sur les meilleures pratiques de Datadog.
- La configuration de l'Opérateur est plus flexible pour les améliorations futures.
- En tant que [Kubernetes Operator][2], l'Opérateur Datadog est traité comme une ressource de première classe par l'API Kubernetes.
- Contrairement au Helm chart, l'Opérateur est inclus dans la boucle de réconciliation de Kubernetes.

Datadog prend entièrement en charge l'utilisation d'un DaemonSet pour déployer l'Agent, mais la configuration manuelle du DaemonSet laisse une marge d'erreur significative. Par conséquent, l'utilisation d'un DaemonSet n'est pas fortement recommandée.

## Utilisation {#usage}

Consultez le guide [Débuter avec l'Operator Datadog][6] pour savoir comment utiliser l'Operator pour déployer l'Agent Datadog. 

Pour toutes les options d'installation et de configuration, consultez les pages détaillées [installation][7] et [configuration][8] dans le dépôt [`datadog-operator`][1]. 

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /fr/containers/cluster_agent
[4]: /fr/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /fr/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md