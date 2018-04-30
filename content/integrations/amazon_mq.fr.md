---
aliases:
  - /fr/integrations/awsmq/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques AWS Amazon MQ.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mq/'
git_integration_title: amazon_mq
has_logo: true
integration_title: AWS MQ
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_mq
public_title: Intégration Datadog-AWS MQ
short_description: Suivre les métriques AWS Amazon MQ.
version: '1.0'
---
## Aperçu

Amazon MQ est un service de broker de messages pour Apache ActiveMQ qui facilite la configuration et l'exploitation des brokers de messages dans le cloud.

Activez cette intégration pour voir dans Datadog toutes vos métriques de Amazon MQ.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `MQ` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS MQ] (https://app.datadoghq.com/account/settings#integrations/amazon_mq).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_mq" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Évènements
L'intégration AWS Amazon MQ n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Amazon MQ n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)