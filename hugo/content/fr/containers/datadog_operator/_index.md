---
aliases:
- /fr/agent/kubernetes/operator_configuration
- /fr/containers/kubernetes/operator_configuration
description: Déployez et gérez le Datadog Agent sur Kubernetes à l'aide du Datadog
  Operator
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: guide
  text: Débuter avec le Datadog Operator
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: Code source
  text: 'Datadog Operator : installation avancée'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: Code source
  text: 'Datadog Operator : configuration'
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Architecture Center
  text: Instrumentez votre application à l'aide du Datadog Operator et du contrôleur
    d'admission
title: Datadog Operator
---
Le [Datadog Operator][1] est un [Operator Kubernetes][2] open source qui vous permet de déployer et de configurer le Datadog Agent dans un environnement Kubernetes.

En utilisant l'Opérateur, vous pouvez utiliser une seule définition de ressource personnalisée (CRD) pour déployer l'Agent basé sur les nœuds, le [Cluster Agent][3] et le [cluster checks runner][4]. L'Opérateur signale l'état du déploiement, la santé et les erreurs dans le statut de la CRD de l'Opérateur. Comme l'Opérateur utilise des options de configuration de plus haut niveau, il limite le risque de mauvaise configuration.

Une fois l'Agent déployé, le Datadog Operator apporte les fonctionnalités suivantes :

- Validation de vos configurations d'Agent
- Maintien de tous les Agents à jour avec votre configuration
- Orchestration pour la création et la mise à jour des ressources d'Agent
- Suivi de l'état de configuration de l'Agent dans le statut de la CRD de l'Opérateur
- Configuration de l'Agent par groupe de nœuds à partir d'une seule ressource avec [DatadogAgentProfiles][10]
- Détection automatique du [fournisseur][11] de cluster, qui applique la configuration correspondante, telle que la surveillance du plan de contrôle sur Amazon EKS et Red Hat OpenShift
- Gestion à distance avec Fleet Automation (aperçu privé)

### Pourquoi utiliser le Datadog Operator plutôt qu'un Helm chart ou un DaemonSet? {#why-use-the-datadog-operator-instead-of-a-helm-chart-or-daemonset}

Vous pouvez également installer le Datadog Agent avec le [`datadog` Helm chart][9] ou un DaemonSet. Datadog recommande l'Opérateur pour les nouveaux déploiements.

Helm et l'Opérateur diffèrent dans leur manière de gérer l'Agent. Helm génère les objets Kubernetes de l'Agent à partir d'un fichier `values.yaml` au moment de l'installation et de la mise à niveau. L'Opérateur exécute un contrôleur qui réconcilie en continu une unique ressource personnalisée `DatadogAgent` vers son état souhaité, et pas seulement au moment de l'installation.

L'Opérateur offre également des fonctionnalités que le Helm chart ne propose pas. Par exemple, [DatadogAgentProfiles][10] applique différentes configurations à différents groupes de nœuds à partir d'une seule ressource, alors que Helm nécessite une release distincte du Helm chart par groupe de nœuds avec des règles d'affinité rédigées manuellement.

Dans Datadog Operator v1.29.0 et versions ultérieures, l'Opérateur atteint la parité fonctionnelle avec le Helm chart sur les principaux fournisseurs cloud, vous ne perdez donc aucune fonctionnalité en le choisissant. Il peut également être installé et mis à niveau via des catalogues de plateformes natives dans lesquels le Helm chart n'est pas publié : Red Hat OperatorHub, le [module complémentaire Amazon EKS][12] et [Google Cloud Marketplace][13].

Utilisez le `datadog` Helm chart lorsque l'Opérateur ne convient pas à votre environnement : sur des plateformes que l'Opérateur ne prend pas encore en charge (telles que Talos ou Flatcar), sur GKE sur Google Distributed Cloud (GDC), ou lorsque vous avez besoin d'une fonctionnalité Helm que l'Opérateur n'expose pas. Pour les plateformes et les fournisseurs pris en charge par l'Opérateur, consultez la [documentation des fournisseurs][11].

Datadog prend entièrement en charge l'utilisation d'un DaemonSet pour déployer l'Agent, mais la configuration manuelle d'un DaemonSet laisse une marge d'erreur importante et n'est pas recommandée.

## Utilisation {#usage}

Consultez le guide [Débuter avec le Datadog Operator][6] pour savoir comment utiliser l'Operator pour déployer le Datadog Agent.

Pour toutes les options d'installation et de configuration, consultez les pages détaillées [installation][7] et [configuration][8] dans le dépôt [`datadog-operator`][1].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /fr/containers/cluster_agent
[4]: /fr/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /fr/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[9]: /fr/containers/kubernetes/installation?tab=helm
[10]: /fr/containers/datadog_operator/datadog_agent_profiles
[11]: /fr/containers/datadog_operator/providers
[12]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[13]: https://console.cloud.google.com/marketplace/product/datadog-saas/datadog