---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'AWS\_AppSync."
doc_link: https://docs.datadoghq.com/integrations/amazon_appsync/
draft: false
git_integration_title: amazon_appsync
has_logo: true
integration_id: amazon-appsync
integration_title: "AWS\_AppSync"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_appsync
public_title: "Intégration Datadog/AWS\_AppSync"
short_description: "Surveillez des métriques clés d'AWS\_AppSync."
version: '1.0'
---
## Présentation

Amazon AppSync simplifie le développement applicatif en vous permettant de créer une API flexible pour accéder à des données, mais également les manipuler et les combiner depuis une ou plusieurs sources de données, et ce en toute sécurité.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'AppSync.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `AppSync` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/Amazon AppSync][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon AppSync de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_appsync` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon AppSync dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_appsync" >}}


### Événements

L'intégration Amazon AppSync n'inclut aucun événement.

### Checks de service

L'intégration Amazon AppSync n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-appsync
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_appsync/amazon_appsync_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/