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
description: 'Surveillez la taille des tables, la capacité de lecture/écriture, la latence des requêtes, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_dynamodb/'
draft: false
git_integration_title: amazon_dynamodb
has_logo: true
integration_title: Amazon DynamoDB
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_dynamodb
public_title: "Intégration Datadog/Amazon\_DynamoDB"
short_description: 'Surveillez la taille des tables, la capacité de lecture/écriture, la latence des requêtes, et plus encore.'
version: '1.0'
---
{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="Dashboard par défaut DynamoDB" popup="true">}}

## Présentation

Amazon DynamoDB est un service de gestion de base de données NoSQL dans le cloud entièrement géré et intégré au portefeuille de services d'AWS. Rapide et hautement évolutif, il contribue à la réussite d'applications exigeant une très faible latence, même lors du traitement d'une grande quantité de données. Il prend en charge des modèles de stockage basés sur des combinaisons clé/valeur et des documents, et dispose des caractéristiques d'une base de données et d'une table de hachage distribuée.

Pour savoir comment surveiller les métriques de performance DynamoDB, consultez [notre série d'articles à ce sujet][1]. Vous y trouverez des informations supplémentaires sur les principales métriques de performance, ainsi que des conseils pour les recueillir, et découvrirez comment [Medium][2] surveille DynamoDB à l'aide de Datadog.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][3].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][4], assurez-vous que l'option `DynamoDB` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][5] afin de recueillir des métriques d'Amazon DynamoDB :

    - `dynamodb:ListTables` : utilisé pour répertorier les tables DynamoDB disponibles.
    - `dynamodb:DescribeTable` : utilisé pour ajouter des métriques sur une taille de table et un nombre d'éléments.
    - `dynamodb:ListTagsOfResource` : utilisé pour recueillir tous les tags d'une ressource DynamoDB.

    Pour en savoir plus sur les stratégies DynamoDB, consultez [la documentation disponible sur le site d'AWS][6].

3. Installez l'[intégration Datadog/AWS DynamoDB][7].

### Collecte de logs

#### Activer la journalisation DynamoDB

Lorsque vous définissez vos pistes, sélectionnez un compartiment s3 dans lequel rédiger les logs :

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="Journalisation Cloudtrail" popup="true" style="width:70%;">}}

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][8].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs DynamoDB dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs DynamoDB et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][9] pour commencer à explorer vos logs !

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_dynamodb" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS DynamoDB n'inclut aucun événement.

### Checks de service

L'intégration AWS DynamoDB n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://www.datadoghq.com/blog/top-dynamodb-performance-metrics
[2]: https://medium.com
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_dynamodb.html
[7]: https://app.datadoghq.com/account/settings#integrations/amazon_dynamodb
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://app.datadoghq.com/logs
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dynamodb/amazon_dynamodb_metadata.csv
[11]: https://docs.datadoghq.com/fr/help/