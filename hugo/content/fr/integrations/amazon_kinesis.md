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
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis/
draft: false
git_integration_title: amazon_kinesis
has_logo: true
integration_id: amazon-kinesis
integration_title: Amazon Kinesis
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_kinesis
public_title: Intégration Datadog/Amazon Kinesis
short_description: Surveillez des métriques clés d'Amazon Kinesis.
version: '1.0'
---

## Présentation

Amazon Kinesis est un service entièrement géré dans le cloud assurant en temps réel le traitement de grands flux de données distribués.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques et vos tags personnalisés de Kinesis.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Kinesis` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon Kinesis :

    - `kinesis:ListStreams` : répertorie les flux disponibles.
    - `kinesis:DescribeStream` : ajoute des tags et de nouvelles métriques pour les flux de Kinesis.
    - `kinesis:ListTagsForStream` : ajoute des tags personnalisés.

    Pour en savoir plus, consultez la section relative aux [stratégies Kinesis][4] de la documentation AWS.

3. Installez l'[intégration Datadog/AWS Kinesis][5].

### Collecte de logs

#### Activer le logging

Datadog est l'une des destinations par défaut pour les streams Amazon Kinesis Delivery. Amazon Kinesis Data Firehose est entièrement géré par AWS : vous n'avez donc pas besoin de maintenir une infrastructure supplémentaire ou une configuration de redirection pour le streaming de logs.

Vous pouvez configurer un stream Kinesis Firehose Delivery dans la console AWS Firehose, ou configurer automatiquement la destination à l'aide d'un modèle CloudFormation :

- [Console AWS Firehose][6]
- [Modèle CloudFormation][7]

Toutefois, si vous envoyez vos logs vers un compartiment S3, utilisez la fonction AWS Lambda. Assurez-vous que `amazon_kinesis` est défini en tant que _Target prefix_.

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][8].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon Kinesis dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][9]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][10]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_kinesis" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Kinesis n'inclut aucun événement.

### Checks de service

L'intégration AWS Kinesis n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/streams/latest/dev/controlling-access.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_kinesis
[6]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=kinesisfirehosedeliverystream
[7]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=cloudformationtemplate
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[10]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis/amazon_kinesis_metadata.csv
[12]: https://docs.datadoghq.com/fr/help/