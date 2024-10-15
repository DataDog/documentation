---
categories:
- aws
- cloud
- data stores
- log collection
dependencies: []
description: Surveillez des métriques clés AWS Database Migration Service (DMS).
doc_link: https://docs.datadoghq.com/integrations/amazon_dms/
draft: false
git_integration_title: amazon_dms
has_logo: true
integration_id: ''
integration_title: AWS Database Migration Service (DMS)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_dms
public_title: Intégration Datadog/AWS Database Migration Service (DMS)
short_description: Surveillez des métriques clés AWS Database Migration Service (DMS).
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

AWS Database Migration Service (DMS) est un service cloud qui simplifie la migration de bases de données relationnelles, d'entrepôts de données, de bases de données NoSQL et d'autres types de data stores.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de DMS.

## Formule et utilisation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Sur la [page de l'intégration AWS][2], vérifiez que `Database Migration Service` est activé dans l'onglet `Metric Collection`.
2. Installez l'[intégration Datadog/AWS Database Migration Service (DMS)][3].

### APM

#### Activer le logging

Configurez AWS Database Migration Service de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_dms` est défini en tant que _Target prefix_.

#### Envoi de logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs AWS DMS dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "amazon_dms" >}}


### Aide

L'intégration AWS Database Migration Service (DMS) n'inclut aucun événement.

### Aide

L'intégration AWS Database Migration Service (DMS) n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-dms
[4]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dms/amazon_dms_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/