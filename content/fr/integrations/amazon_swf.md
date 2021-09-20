---
aliases:
  - /fr/integrations/awsswf/
categories:
  - cloud
  - configuration & deployment
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Simple Workflow Service.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_swf/'
draft: false
git_integration_title: amazon_swf
has_logo: true
integration_title: "Amazon\_Simple\_Workflow\_Service"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_swf
public_title: "Intégration Datadog/Amazon\_Simple\_Workflow\_Service"
short_description: Surveillez des métriques clés d'Amazon Simple Workflow Service.
version: '1.0'
---
## Présentation

Amazon SWF aide les développeurs à concevoir, exécuter et mettre à l'échelle les tâches en arrière-plan qui présentent des étapes parallèles ou séquentielles.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de SWF.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `SWF` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/AWS SWF][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon SWF de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_swf` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon SWF dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_swf" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS SWF n'inclut aucun événement.

### Checks de service

L'intégration AWS SWF n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_swf
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_swf/amazon_swf_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/