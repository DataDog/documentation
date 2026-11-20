---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Neptune."
doc_link: https://docs.datadoghq.com/integrations/amazon_neptune/
draft: false
git_integration_title: amazon_neptune
has_logo: true
integration_id: amazon-neptune
integration_title: "Amazon\_Neptune"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_neptune
public_title: "Intégration Datadog/Amazon\_Neptune"
short_description: "Surveillez des métriques clés d'Amazon\_Neptune."
version: '1.0'
---
## Présentation

Amazon Neptune est un service de base de données orienté graphe fiable, rapide et entièrement géré qui facilite la création et l'exécution d'applications utilisant des ensembles de données hautement connectés.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Neptune.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Neptune` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/Amazon Neptune][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon Neptune de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_neptune` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon Neptune dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_neptune" >}}


### Événements

L'intégration Amazon Neptune n'inclut aucun événement.

### Checks de service

L'intégration Amazon Neptune n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-neptune
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_neptune/amazon_neptune_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/