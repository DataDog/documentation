---
aliases:
  - /fr/integrations/awsapigateway/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez les erreurs d'AWS\_API\_Gateway, les hits et miss de cache et la latence des requêtes."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_api_gateway/'
draft: false
git_integration_title: amazon_api_gateway
has_logo: true
integration_title: Amazon API Gateway
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_api_gateway
public_title: "Intégration Datadog/Amazon\_API\_Gateway"
short_description: "Surveillez les erreurs Amazon\_API\_Gateway."
version: '1.0'
---
## Présentation

Amazon API Gateway est un service entièrement géré qui permet aux développeurs de créer, publier, gérer, surveiller et sécuriser facilement des API quelque soit l'échelle.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'API Gateway.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `API Gateway` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de récupérer les tags personnalisés appliqués aux étapes API Gateway :

    - `apigateway:GET`
    - `tag:GetResources`

3. Configurez l'[intégration Datadog/AWS API Gateway][4].

### Collecte de logs

Pour activer la journalisation API Gateway :

1. Accédez à API Gateway dans votre console AWS.
2. Sélectionnez l'API souhaitée et accédez à la section Stages.
3. Dans l'onglet **Logs**, activez **Enable CloudWatch Logs** et **Enable Access Logging**.
4. Sélectionnez le niveau `INFO` afin de récupérer l'ensemble des requêtes.
5. Assurez-vous d'inclure `apigateway` dans le nom de votre **groupe Cloudwatch**.
6. Sélectionnez le format JSON (les formats CLF et CSV sont également pris en charge), et ajoutez ce qui suit dans le champ **Log format** :

    ```text
    {
        "requestId":"$context.requestId",
        "ip":"$context.identity.sourceIp",
        "caller":"$context.identity.caller",
        "user":"$context.identity.user",
        "requestTime":$context.requestTimeEpoch,
        "httpMethod":"$context.httpMethod",
        "resourcePath":"$context.resourcePath",
        "status":$context.status,
        "protocol":"$context.protocol",
        "responseLength":$context.responseLength
    }
    ```

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction AWS Lambda de collecte de logs avec Datadog][5].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le groupe de logs Cloudwatch qui contient vos logs API Gateway :
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="groupes de logs cloudwatch" popup="true" style="width:70%;">}}
   Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (vous pouvez toutefois laisser le filtre vide) et ajoutez le déclencheur :
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Déclencheur cloudwatch" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][6] pour commencer à explorer vos logs !

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_api_gateway" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS API Gateway n'inclut aucun événement.

### Checks de service

L'intégration AWS API Gateway n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_api_gateway
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_api_gateway/amazon_api_gateway_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/