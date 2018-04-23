---
aliases:
  - /fr/integrations/awsml/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
description: Suivre le nombre de prédictions et les échecs d'AWS Machine Learning.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_machine_learning/'
git_integration_title: amazon_machine_learning
has_logo: true
integration_title: AWS Machine Learning
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_machine_learning
public_title: Intégration Datadog-AWS Machine Learning
short_description: Suivre le nombre de prédictions et les échecs d'AWS Machine Learning.
version: '1.0'
---
## Aperçu

Amazon Machine Learning est un service qui facilite l'utilisation de la technologie de machine learning pour les développeurs de tous les niveaux.

Activez cette intégration pour voir dans Datadog toutes vos métriques de Machine Learning.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `MachineLearning` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS Machine Learning](https://app.datadoghq.com/account/settings#integrations/amazon_machine_learning).


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_machine_learning" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Machine Learning n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration AWS Machine Learning n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)