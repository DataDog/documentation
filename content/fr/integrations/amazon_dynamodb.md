---
aliases:
- /fr/integrations/awsdynamo/
categories:
- cloud
- data store
- aws
- log collection
dependencies: []
description: Surveillez la taille des tables, la capacité de lecture/écriture, la
  latence des requêtes, et plus encore.
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb/
draft: false
git_integration_title: amazon_dynamodb
has_logo: true
integration_id: amazon-dynamodb
integration_title: Amazon DynamoDB
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_dynamodb
public_title: Intégration Datadog/Amazon DynamoDB
short_description: Surveillez la taille des tables, la capacité de lecture/écriture,
  la latence des requêtes, et plus encore.
version: '1.0'
---

{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="Dashboard par défaut DynamoDB" popup="true">}}

## Présentation

Amazon DynamoDB est un service de gestion de base de données NoSQL dans le cloud entièrement géré et intégré au portefeuille de services d'AWS. Rapide et hautement évolutif, il contribue à la réussite d'applications exigeant une très faible latence, même lors du traitement d'une grande quantité de données. Il prend en charge des modèles de stockage basés sur des combinaisons clé/valeur et des documents, et dispose des caractéristiques d'une base de données et d'une table de hachage distribuée.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans la [page de l'intégration AWS][2], vérifiez que `DynamoDB` est activé dans l'onglet `Metric Collection`.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon DynamoDB :

    - `dynamodb:ListTables` : utilisé pour répertorier les tables DynamoDB disponibles.
    - `dynamodb:DescribeTable` : utilisé pour ajouter des métriques sur une taille de table et un nombre d'éléments.
    - `dynamodb:ListTagsOfResource` : utilisé pour recueillir tous les tags d'une ressource DynamoDB.

    Pour en savoir plus, consultez la section relative aux [stratégies DynamoDB][4] de la documentation AWS.

3. Installez l'[intégration Datadog/AWS DynamoDB][5].

### Collecte de logs

#### Activer le logging

Dans AWS CloudTrail, [créez un journal de suivi][6] et sélectionnez un compartiment S3 dans lequel écrire les logs.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][7] dans votre compte AWS.
2. Une fois configuré, accédez à la fonction Lambda du Forwarder Datadog. Dans la section Présentation de Functions, cliquez sur **Add Trigger**.
3. Sélectionnez le déclencheur **S3** pour la Trigger Configuration.
4. Sélectionnez le compartiment S3 où se trouvent vos logs Amazon DynamoDB.
5. Ne changez pas le type d'événements `All object create events`.
6. Cliquez sur **Add** pour ajouter le déclencheur à votre fonction Lambda.

Accédez au [Log Explorer][8] pour commencer à explorer vos logs.

Pour en savoir plus sur la collecte de logs de services AWS, consultez la section [Envoyer des logs de services AWS avec la fonction Lambda Datadog][9].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_dynamodb" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS DynamoDB n'inclut aucun événement.

### Checks de service

L'intégration AWS DynamoDB n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-dynamodb
[6]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[7]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dynamodb/amazon_dynamodb_metadata.csv
[11]: https://docs.datadoghq.com/fr/help/