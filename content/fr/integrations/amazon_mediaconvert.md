---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaConvert."
doc_link: https://docs.datadoghq.com/integrations/amazon_mediaconvert/
draft: false
git_integration_title: amazon_mediaconvert
has_logo: true
integration_id: amazon-mediaconvert
integration_title: "Amazon\_Elemental\_MediaConvert"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_mediaconvert
public_title: "Intégration Datadog/Amazon\_Elemental_MediaConvert"
short_description: "Surveillez des métriques clés d'Amazon\_Elemental\_MediaConvert."
version: '1.0'
---
## Présentation

Amazon Elemental MediaConvert est un service de transcodage et de compression de contenu vidéo hors ligne en vue de leur diffusion sur une télévision ou un appareil connecté.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Elemental MediaConvert.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MediaConvert` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/Amazon Elemental MediaConvert][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon Elemental MediaConvert de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_mediaconvert` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon Elemental MediaConvert dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_mediaconvert" >}}


### Événements

L'intégration Amazon Elemental MediaConvert n'inclut aucun événement.

### Checks de service

L'intégration Amazon Elemental MediaConvert n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-mediaconvert
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mediaconvert/amazon_mediaconvert_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/