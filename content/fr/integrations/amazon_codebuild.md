---
aliases:
  - /fr/integrations/awscodebuild/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez vos déploiements en temps réel et mesurez leur durée.
doc_link: https://docs.datadoghq.com/integrations/amazon_codebuild/
draft: false
git_integration_title: amazon_codebuild
has_logo: true
integration_id: amazon-codebuild
integration_title: "AWS\_CodeBuild"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_codebuild
public_title: "Intégration Datadog/AWS\_CodeBuild"
short_description: Surveillez vos déploiements en temps réel et mesurez leur durée.
version: '1.0'
---
## Présentation

AWS CodeBuild est un service d’intégration entièrement géré qui compile votre code source, exécute des tests et produit des packages logiciels prêts à être déployés.

Installez l'intégration Datadog/AWS CodeBuild pour :

- Suivre vos builds par projet
- Recueillir les métriques associées à vos builds
- Corréler les builds avec le reste de vos métriques Datadog

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `CloudBuild` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS Codebuild][3].

### Collecte de logs

#### Activer le logging

Configurez AWS CodeBuild de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_codebuild` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon CodeBuild dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_codebuild" >}}


### Événements

L'intégration AWS CodeBuild n'inclut aucun événement.

### Checks de service

L'intégration AWS_CodeBuild n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-codebuild
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codebuild/amazon_codebuild_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/