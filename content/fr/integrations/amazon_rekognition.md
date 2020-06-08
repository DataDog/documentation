---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Rekognition."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_rekognition/'
git_integration_title: amazon_rekognition
has_logo: true
integration_title: "Amazon\_Rekognition"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_rekognition
public_title: "Intégration Datadog/Amazon\_Rekognition"
short_description: "Surveillez des métriques clés d'Amazon\_Rekognition."
version: '1.0'
---
## Présentation

Amazon Rekognition facilite l'ajout d'une analyse des images et des vidéos à vos applications. Vous fournissez simplement une image ou une vidéo à l'API Rekognition, et le service peut identifier les objets, les personnes, le texte, les scènes et les activités, ainsi que détecter tout contenu inapproprié.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Rekognition.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Rekognition` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/Amazon Rekognition][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon Rekognition de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_rekognition` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon Rekognition dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_rekognition" >}}


### Événements

L'intégration Amazon Rekognition n'inclut aucun événement.

### Checks de service

L'intégration Amazon Rekognition n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-rekognition
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rekognition/amazon_rekognition_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/