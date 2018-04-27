---
aliases:
  - /fr/integrations/awskinesis/
categories:
  - cloud
  - processing
  - messaging
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques clés Amazon Kinesis.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_kinesis/'
git_integration_title: amazon_kinesis
has_logo: true
integration_title: AWS Kinesis
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_kinesis
public_title: Intégration Datadog-AWS Kinesis
short_description: Suivre les métriques clés Amazon Kinesis.
version: '1.0'
---
## Aperçu

Amazon Kinesis is un service managé dans le cloud pour le traitement en temps réel de grands flux de données distribués

Activez cette intégration pour voir dans Datadog toutes vos métriques et vos tags custom de Kinesis.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/). Aucune autre étape d'installation ne doit être effectuée.

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `Kinesis` est coché dans la partie "metric collection".

2. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon Kinesis:

    * `kinesis:ListStreams`: Liste des flux disponibles.
    * `kinesis:DescribeStream`: Ajoute des tags et de nouvelles métriques pour les flux de kinesis.
    * `kinesis:ListTagsForStream`: Ajoute des tags personnalisés

    Pour plus d'information sur les polices Kinesis, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_kinesis.html).

3. Installez l'intégration [Datadog - AWS Kinesis] (https://app.datadoghq.com/account/settings#integrations/amazon_kinesis).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_kinesis" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Kinesis n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Kinesis n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)