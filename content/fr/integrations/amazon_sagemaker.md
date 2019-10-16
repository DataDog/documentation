---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_SageMaker."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_sagemaker/'
git_integration_title: amazon_sagemaker
has_logo: true
integration_title: "Amazon\_SageMaker"
is_public: true
kind: integration
manifest_version: 1
name: amazon_sagemaker
public_title: "Intégration Datadog/Amazon\_SageMaker"
short_description: "Surveillez des métriques clés d'Amazon\_SageMaker."
version: 1
---
## Présentation
Amazon SageMaker est un service entièrement géré permettant aux développeurs et aux spécialistes des données de créer et former des modèles de machine learning, puis de les déployer directement dans un environnement hébergé prêt pour la production.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de SageMaker.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `SageMaker` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon SageMaker][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_sagemaker" >}}


### Événements
L'intégration Amazon SageMaker n'inclut aucun événement.

### Checks de service
L'intégration Amazon SageMaker n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-sagemaker
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sagemaker/amazon_sagemaker_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}