---
aliases:
  - /fr/integrations/awsdynamo/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez la taille des tables, la capacité de lecture/écriture, la latence des requêtes, et plus encore.
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb/
draft: false
git_integration_title: amazon_dynamodb
has_logo: true
integration_id: amazon-dynamodb
integration_title: Amazon DynamoDB
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_dynamodb
public_title: "Intégration Datadog/Amazon\_DynamoDB"
short_description: Surveillez la taille des tables, la capacité de lecture/écriture, la latence des requêtes, et plus encore.
version: '1.0'
---
{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="Dashboard par défaut DynamoDB" popup="true">}}

## Présentation

Amazon DynamoDB est un service de gestion de base de données NoSQL dans le cloud entièrement géré et intégré au portefeuille de services d'AWS. Rapide et hautement évolutif, il contribue à la réussite d'applications exigeant une très faible latence, même lors du traitement d'une grande quantité de données. Il prend en charge des modèles de stockage basés sur des combinaisons clé/valeur et des documents, et dispose des caractéristiques d'une base de données et d'une table de hachage distribuée.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `DynamoDB` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon DynamoDB :

    - `dynamodb:ListTables` : utilisé pour répertorier les tables DynamoDB disponibles.
    - `dynamodb:DescribeTable` : utilisé pour ajouter des métriques sur une taille de table et un nombre d'éléments.
    - `dynamodb:ListTagsOfResource` : utilisé pour recueillir tous les tags d'une ressource DynamoDB.

    Pour en savoir plus, consultez la section relative aux [stratégies DynamoDB][4] de la documentation AWS.

3. Installez l'[intégration Datadog/AWS DynamoDB][5].

### Collecte de logs

#### Activer le logging

Lorsque vous définissez vos journaux de suivi, sélectionnez un compartiment S3 dans lequel écrire les logs :

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="Journalisation CloudTrail" popup="true" style="width:70%;">}}

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs DynamoDB dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs DynamoDB et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Logs de Datadog][7] pour commencer à explorer vos logs !

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_dynamodb" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS DynamoDB n'inclut aucun événement.

### Checks de service

L'intégration AWS DynamoDB n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_dynamodb
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dynamodb/amazon_dynamodb_metadata.csv
[9]: https://docs.datadoghq.com/fr/help/