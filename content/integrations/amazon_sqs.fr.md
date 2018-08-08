---
aliases:
  - /fr/integrations/awssqs/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: crawler
description: >-
  Suivre la taille de la file d'attente, la taille moyenne des messages, le
  nombre de messages, et plus encore...
doc_link: 'https://docs.datadoghq.com/integrations/amazon_sqs/'
git_integration_title: amazon_sqs
has_logo: true
integration_title: AWS SQS
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_sqs
public_title: Intégration Datadog-AWS SQS
short_description: >-
  Suivre la taille de la file d'attente, la taille moyenne des messages, le
  nombre de messages, et more.
version: '1.0'
---
{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="SQS Dashboard" responsive="true" >}}

## Aperçu

Amazon Simple Queue Service (SQS) est un service de queuing des message qui est efficace, fiable, extensible, et entièrement géré.

Activez cette intégration pour visualisez dans Datadog toutes vos métriques de SQS.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `SQS` est coché dans la partie "metric collection".

2. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon SQS:

    * `sqs:ListQueues`: Utilisé pour répertorier les files d'attente actives.

    Pour plus d'information sur les polices SQS, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sqs.html).

3. Installez l'intégration [Datadog - AWS SQS] (https://app.datadoghq.com/account/settings#integrations/amazon_sqs).


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_sqs" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS SQS n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS SQS n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)