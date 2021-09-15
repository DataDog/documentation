---
aliases:
  - /fr/integrations/awskms/
categories:
  - cloud
  - security
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez l'expiration de vos clés Amazon\_KMS."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_kms/'
draft: false
git_integration_title: amazon_kms
has_logo: true
integration_title: "Amazon\_Key\_Management\_Service"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_kms
public_title: "Intégration Datadog/Amazon\_Key\_Management\_Service"
short_description: "Surveillez l'expiration de vos clés Amazon\_KMS."
version: '1.0'
---
## Présentation

AWS Key Management Service (KMS) est un service géré qui vous permet de créer et de contrôler facilement les clés de chiffrement utilisées pour chiffrer vos données.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de KMS.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `KMS` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS KMS][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon KMS de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_kms` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon KMS dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_kms" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS KMS n'inclut aucun événement.

### Checks de service

L'intégration AWS KMS n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_kms
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kms/amazon_kms_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/