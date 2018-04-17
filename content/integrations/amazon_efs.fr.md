---
aliases:
  - /fr/integrations/awsefs/
categories:
  - cloud
  - os & system
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques clés de Amazon Elastic Filesystem.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_efs/'
git_integration_title: amazon_efs
has_logo: true
integration_title: AWS Elastic File System
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_efs
public_title: Intégration Datadog-AWS Elastic File System
short_description: Suivre les métriques clés de Amazon Elastic Filesystem.
version: '1.0'
---
## Aperçu

Amazon EFS fournit un stockage de fichiers simple et évolutif à utiliser avec les instances Amazon EC2 dans le cloud AWS.

Activez cette intégration pour voir dans Datadog toutes vos métriques de EFS.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `EFS` est coché dans la partie "metric collection".

2. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon EFS:

    * `elasticfilesystem:DescribeTags`: Obtient les tags personnalisées appliqués aux systèmes de fichiers
    * `elasticfilesystem:DescribeFileSystems`: Fournit une liste des systèmes de fichiers actifs

    Pour plus d'information sur les polices EFS, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticfilesystem.html).

3. Installez l'intégration [Datadog - AWS EFS] (https://app.datadoghq.com/account/settings#integrations/amazon_efs).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_efs" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Elastic File System n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration AWS Elastic File System n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)