---
aliases:
  - /fr/integrations/awsredshift/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques clés Amazon Redshift.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_redshift/'
git_integration_title: amazon_redshift
has_logo: true
integration_title: AWS Redshift
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_redshift
public_title: "Intégration Datadog-AWS Redshift\_"
short_description: Suivre les métriques clés Amazon Redshift.
version: '1.0'
---
## Aperçu

Amazon Redshift est un service de data warehouse entièrement géré et à l'échelle du pétaoctet, qui simplifie et rentabilise l'analyse de toutes vos données.

Activez cette intégration pour voir dans Datadog toutes vos métriques de Redshift.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Collecte de métrique

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `Redshift` est coché dans la partie "metric collection".

2. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon Kinesis:

    * `redshift:DescribeClusters`: Lister tous les clusters Redshift dans votre compte.
    * `redshift:DescribeLoggingStatus`: Récupérer le bucket S3 où sont stockés les logs Redshift.
    * `tag:getResources`: Récupérer les tags personnalisés de votre cluster Redshift.

    Pour plus d'information sur les polices Refshift, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_redshift.html).

3. Installez l'intégration [Datadog - AWS Redshift] (https://app.datadoghq.com/account/settings#integrations/amazon_redshift).

### Collecte de log
#### Activer le logging AWS Redshift

Activez d'abord le logging sur votre cluster Redshift pour collecter vos logs. Les logs Redshift peuvent être écrits dans un bucket AWS S3 et [consommés par une fonction Lambda](/integrations/amazon_web_services/#create-a-new-lambda-function). [Pour plus d'informations, reportez-vous à la documentation AWS](https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html)

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda pour collecte de log AWS](/integrations/amazon_web_services/#create-a-new-lambda-function).
2. Une fois la fonction lambda installée, vous pouvez collecter vos logs Redshift de deux manières:

    * Automatique: nous gérons les logs Redshift pour vous si vous nous accordez un ensemble d'autorisations. [Reportez-vous au service AWS principal pour configurer la collecte automatique des journaux](/integrations/amazon_web_services/#automatic-log-collection)
    * Manuel: Ajouter manuellement un déclencheur sur le bucket s3 contenant vos logs Redshift dans la console AWS

#### Installation manuelle

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda pour collecte de log AWS](/integrations/amazon_web_services/#create-a-new-lambda-function).
2. Une fois la fonction lambda installée, ajoutez manuellement un déclencheur sur le bucket S3 contenant vos logs Redshift dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs:
{{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 trigger configuration" responsive="true" style="width:70%;">}}
    Configurez votre déclencheur en choisissant le bucket S3 qui contient vos logs Redshift et changez le type d'événement en `Object Created (All)`, puis cliquez sur le bouton *add*.
{{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda trigger configuration" responsive="true" style="width:70%;">}}

Allez désormais dans la section [Log de Datadog](https://app.datadoghq.com/logs) pour commencer à explorer vos logs!

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_redshift" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Redshift n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Redshift n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)