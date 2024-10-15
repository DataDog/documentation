---
aliases:
- /fr/agent/kubernetes/operator_configuration
- /fr/containers/kubernetes/operator_configuration
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: guide
  text: Débuter avec l'Operator Datadog
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: GitHub
  text: 'Operator Datadog : installation avancée'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: GitHub
  text: 'Operator Datadog : configuration'
title: Operator Datadog
---

L'[Operator Datadog][1] est un [Operator Kubernetes][2] open source qui vous permet de déployer et de configurer l'Agent Datadog dans un environnement Kubernetes. 

Grâce à cet Operator, une seule définition de ressource personnalisée (ou CRD) est nécessaire pour déployer l'Agent de nœud, l'[Agent de cluster][3] et l'[exécuteur de checks de cluster][4]. L'Operator transmet les données relatives au statut, à la santé et aux erreurs du déploiement dans le statut de sa CRD. Dans la mesure où l'Operator utilise des options de configuration de niveau supérieur, il réduit les éventuels problèmes de configuration.

Une fois l'Agent déployé, l'Operator Datadog apporte les fonctionnalités suivantes :

- Validation des configurations de votre Agent
- Application de votre configuration à tous les Agents
- Orchestration pour la création et la mise à jour des ressources de l'Agent
- Transmission du statut de la configuration de l'Agent dans le statut CRD de l'Operator
- (Facultatif) Déploiement d'un DaemonSet avancé à l'aide du contrôleur [ExtendedDaemonSet][5] de Datadog

### Pourquoi utiliser l'Operator Datadog au lieu d'un chart Helm ou d'un DaemonSet ?

Vous pouvez également utiliser un chart Helm ou un DaemonSet pour installer l'Agent Datadog sur Kubernetes. Toutefois, l'utilisation de l'Operator Datadog offre les avantages suivants :

- L'Operator intègre des paramètres par défaut basés sur les bonnes pratiques de Datadog.
- La configuration de l'Operator est plus flexible pour les futures améliorations.
- En tant qu'[Operaror Kubernetes][2], l'Operator Datadog est traité comme une ressource de première classe par l'API Kubernetes.
- Contrairement au chart Helm, l'Operator est inclus dans la boucle de rapprochement de Kubernetes.

Datadog prend totalement en charge l'utilisation d'un DaemonSet pour le déploiement de l'Agent, mais la configuration manuelle du DaemonSet présente une marge d'erreur trop importante. L'utilisation d'un DaemonSet n'est donc pas très recommandée.

## Utilisation

Consultez le guide [Débuter avec l'Operator Datadog][6] pour savoir comment utiliser l'Operator pour déployer l'Agent Datadog. 

Pour connaître toutes les options d'installation et de configuration, consultez les pages d'[installation][7] et de [configuration][8] détaillées dans le référentiel [`datadog-operator`][1]. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /fr/containers/cluster_agent
[4]: /fr/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /fr/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md