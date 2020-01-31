---
aliases:
  - /fr/integrations/awskinesis/
categories:
  - cloud
  - processing
  - messaging
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Kinesis.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_kinesis/'
git_integration_title: amazon_kinesis
has_logo: true
integration_title: Amazon Kinesis
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_kinesis
public_title: "Intégration Datadog/Amazon\_Kinesis"
short_description: Surveillez des métriques clés d'Amazon Kinesis.
version: '1.0'
---
## Présentation

Amazon Kinesis est un service entièrement géré dans le cloud assurant en temps réel le traitement de grands flux de données distribués.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques et vos tags personnalisés de Kinesis.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Kinesis` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon Kinesis :

    * `kinesis:ListStreams` : répertorie les flux disponibles.
    * `kinesis:DescribeStream` : ajoute des tags et de nouvelles métriques pour les flux de Kinesis.
    * `kinesis:ListTagsForStream` : ajoute des tags personnalisés.

    Pour en savoir plus sur les stratégies Kinesis, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS Kinesis][5].

### Collecte de logs
#### Activer le logging

Configurez Amazon Kinesis de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_kinesis` est défini en tant que *Target prefix*.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon Kinesis dans la console AWS :

    * [Ajouter un déclencheur manuel sur le compartiment S3][7]
    * [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][8]

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_kinesis" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Kinesis n'inclut aucun événement.

### Checks de service
L'intégration AWS Kinesis n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_kinesis.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_kinesis
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#create-a-new-lambda-function
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis/amazon_kinesis_metadata.csv
[10]: https://docs.datadoghq.com/fr/help