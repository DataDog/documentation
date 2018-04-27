---
aliases:
  - /fr/integrations/awsemr/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques clés de Amazon Elastic Map Reduce.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_emr/'
git_integration_title: amazon_emr
has_logo: true
integration_title: AWS Elastic Map Reduce
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_emr
public_title: Intégration Datadog-AWS Elastic Map Reduce
short_description: Suivre les métriques clés de Amazon Elastic Map Reduce.
version: '1.0'
---
## Aperçu

Amazon Elastic MapReduce (Amazon EMR) est un service Web qui facilite le traitement rapide et rentable de grandes quantités de données.

Activez cette intégration pour voir dans Datadog toutes vos métriques de EMR.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `EMR` est coché dans la partie "metric collection".

2. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de récupérer vos métriques Amazon EMR :

    * `elasticmapreduce:ListClusters`: Liste des clusters disponibles.
    * `elasticmapreduce:DescribeCluster`: Ajoute des tags aux métriques CloudWatch EMR.

    Pour plus d'information au sujet des polices EMR, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticmapreduce.html).

3. Installez l'intégration [Datadog - AWS EMR] (https://app.datadoghq.com/account/settings#integrations/amazon_emr).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_emr" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Elastic MapReduce n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration AWS Elastic MapReduce n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)