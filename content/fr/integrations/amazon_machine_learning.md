---
aliases:
  - /fr/integrations/awsml/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez le nombre de prédictions et les échecs d'AWS Machine\_Learning."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_machine_learning/'
git_integration_title: amazon_machine_learning
has_logo: true
integration_title: "Amazon\_Machine\_Learning"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_machine_learning
public_title: "Intégration Datadog/Amazon\_Machine\_Learning"
short_description: "Surveillez le nombre de prédictions et les échecs d'AWS Machine\_Learning."
version: '1.0'
---
## Présentation

Amazon Machine Learning est un service qui facilite l'utilisation de la technologie d'apprentissage automatique pour les développeurs de tous les niveaux.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Machine Learning.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MachineLearning` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS Machine Learning][3].


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_machine_learning" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Machine Learning n'inclut aucun événement.

### Checks de service
L'intégration AWS Machine Learning n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_machine_learning
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_machine_learning/amazon_machine_learning_metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}