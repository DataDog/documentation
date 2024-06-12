---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaTailor."
doc_link: https://docs.datadoghq.com/integrations/amazon_mediatailor/
draft: false
git_integration_title: amazon_mediatailor
has_logo: true
integration_id: amazon-mediatailor
integration_title: "Amazon\_Elemental\_MediaTailor"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_mediatailor
public_title: "Intégration Datadog/Amazon\_Elemental_MediaTailor"
short_description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaTailor."
version: '1.0'
---
## Présentation

AWS Elemental MediaTailor est un service de personnalisation et de monétisation de contenu permettant aux distributeurs de vidéos de mettre en place du contenu publicitaire évolutif côté serveur.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Elemental MediaTailor.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MediaTailor` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/Amazon Elemental MediaTailor][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon MediaTailor de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_mediatailor` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon MediaTailor dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_mediatailor" >}}


### Événements

L'intégration Amazon Elemental MediaTailor n'inclut aucun événement.

### Checks de service

L'intégration Amazon Elemental MediaTailor n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediatailor
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediatailor/amazon_mediatailor_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/