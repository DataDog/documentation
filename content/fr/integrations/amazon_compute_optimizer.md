---
aliases:
- /fr/integrations/aws-compute-optimizer
- /fr/integrations/aco
categories:
- cloud
- aws
dependencies: []
description: Cette intégration fournit des recommandations de configuration de ressource
  afin d'optimiser les dimensions des charges de travail des utilisateurs.
doc_link: https://docs.datadoghq.com/integrations/amazon_compute_optimizer/
draft: false
git_integration_title: amazon_compute_optimizer
has_logo: true
integration_id: amazon-compute-optimizer
integration_title: AWS Compute Optimizer
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_compute_optimizer
public_title: Datadog/AWS Compute Optimizer
short_description: Cette intégration fournit des recommandations de configuration
  de ressource afin d'optimiser les dimensions des charges de travail des utilisateurs.
version: '1.0'
---

## Présentation

AWS Compute Optimizer est un service Web qui fournit des recommandations de configuration de ressource afin d'optimiser les dimensions des charges de travail des utilisateurs.

Cette intégration vous permet d'exploiter les données d'utilisation de la mémoire de l'Agent Datadog afin d'améliorer les recommandations de type d'instance EC2 dans AWS Compute Optimizer. Pour en savoir plus sur Compute Optimizer, consultez la section [Qu'est-ce que AWS Compute Optimizer ?][1] de la documentation AWS.

## Configuration

### Installation

#### AWS
1. Dans la console AWS Compute Optimizer, accédez à la page **Accounts** et définissez le paramètre relatif à l'ingestion de métriques externes sur `Datadog` pour votre compte.
2. Répétez l'étape précédente pour chaque compte AWS pour lequel vous souhaitez obtenir des recommandations optimisées.

#### Datadog
3. Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][2] pour chaque AWS de votre choix.
4. Installez l'[Agent Datadog][3] sur les instances EC2 à inclure dans les recommandations optimisées de Compute Optimizer.
5. Configurez l'[intégration Datadog/AWS Compute Optimizer][4].

Une fois ces étapes terminées, vous devrez attendre **jusqu'à 30 heures** avant que les recommandations AWS Compute Optimizer ne se basent les données d'utilisation de la mémoire fournies par Datadog.

#### Validation
Vérifiez que Datadog est indiqué comme `External metrics source` dans le tableau de recommandations liées aux instances EC2 :

{{< img src="integrations/amazon_compute_optimizer/compute_optimizer.png" alt="Le dashboard AWS comportant les recommandations Compute Optimizer. Trois instances sont répertoriées. Pour chacune d'entre elles, un lien Datadog figure sous la colonne des sources de métriques externes." popup="true">}}

## Fonctionnement

Pour toutes les instances EC2 surveillées à la fois par l'[intégration Datadog/AWS][2] et l'[Agent Datadog][3], Datadog transmet des données d'utilisation de la mémoire depuis l'Agent vers AWS Compute Optimizer. Cette opération a pour but d'optimiser les recommandations liées aux instances, et ainsi de réduire potentiellement vos coûts.

**Remarque** : les métriques d'utilisation de la mémoire Datadog sont directement intégrées au service AWS Compute Optimizer, et non à votre compte AWS. Il n'est pas nécessaire d'accorder des autorisations IAM supplémentaires à l'intégration, car Datadog n'interagit par directement avec votre compte AWS.


## Données collectées

### Métriques

L'intégration Amazon Compute Optimizer n'inclut aucune métrique.

### Événements

L'intégration Amazon Compute Optimizer n'inclut aucun événement.

### Checks de service

L'intégration Amazon Compute Optimizer n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://app.datadoghq.com/integrations/amazon-compute-optimizer/
[5]: https://docs.datadoghq.com/fr/help/