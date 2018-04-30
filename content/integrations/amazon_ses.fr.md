---
aliases:
  - /fr/integrations/awsses/
categories:
  - cloud
  - Collaboration
  - aws
  - log collection
ddtype: crawler
description: >-
  Suivre les courriels, les tentatives de livraison, les messages rejetés et
  plus encore...
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ses/'
git_integration_title: amazon_ses
has_logo: true
integration_title: AWS SES
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ses
public_title: Intégration Datadog-AWS SES
short_description: >-
  Suivre les courriels, les tentatives de livraison, les messages rejetés et
  more.
version: '1.0'
---
## Aperçu

Amazon Simple Email Service (SES) est un service rentable d'envoi de courriel en sortant uniquement.

Activez cette intégration pour voir dans Datadog toutes vos métriques de SES.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `SES` est coché dans la partie "metric collection".

2. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon SES:

    * `ses:GetSendQuota`: Ajoute des métriques sur les quotas d'envoi
    * `ses:GetSendStatistics`: Ajoute des métriques sur l'envoi de statistiques

    Pour plus d'information sur les polices SES, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ses.html).

3. Installez l'intégration [Datadog - AWS SES] (https://app.datadoghq.com/account/settings#integrations/amazon_ses).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ses" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS SES n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS SES n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)