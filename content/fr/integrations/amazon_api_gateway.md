---
app_id: amazon-api-gateway
app_uuid: 431bfc66-cc6e-40c5-b7f0-dbb2990322c8
assets:
  dashboards:
    Amazon API Gateway: assets/dashboards/aws_api_gateway_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.apigateway.latency
      metadata_path: metadata.csv
      prefix: aws.apigateway
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 166
    source_type_name: Amazon Api Gateway
  monitors:
    '[AWS] API Gateway Elevated 4XX Error Rate for REST API {{apiname.name}}': assets/monitors/rec_mon_4xx_errors.json
    '[AWS] API Gateway Elevated 5XX Error Rate for REST API {{apiname.name}}': assets/monitors/rec_mon_5xx_errors.json
    '[AWS] API Gateway High Response Time (latency) on {{apiname.name}}': assets/monitors/rec_mon_high_latency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- metrics
- cloud
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_api_gateway
integration_id: amazon-api-gateway
integration_title: Amazon Api Gateway
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_api_gateway
public_title: Intégration dʼAmazon Api Gateway
short_description: Amazon API Gateway est un service géré pour les API.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  configuration: README.md#Setup
  description: Amazon API Gateway est un service géré pour les API.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Intégration dʼAmazon Api Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Présentation

Amazon API Gateway est un service entièrement géré qui permet aux développeurs de créer, publier, gérer, surveiller et sécuriser facilement des API quelque soit l'échelle.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques dʼAPI Gateway.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Sur la [page de l'intégration AWS][2], vérifiez que `API Gateway` est activé dans l'onglet `Metric Collection`.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de récupérer les tags personnalisés appliqués aux étapes API Gateway :

    - `apigateway:GET`
    - `tag:GetResources`

3. Installez l'[intégration Datadog/Amazon API Gateway][4].


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

**Remarque** : si vous avez activé les métriques CloudWatch détaillées, vous devez les activer pour toutes les ressources ou toutes les routes d'une étape. Sinon, les valeurs agrégées dans Datadog seront incorrectes.

### APM

Pour activer la journalisation API Gateway :

1. Accédez à API Gateway dans votre console AWS.
2. Sélectionnez l'API souhaitée et accédez à la section Stages.
3. Dans l'onglet **Logs**, activez **Enable CloudWatch Logs** et **Enable Access Logging**.
4. Sélectionnez le niveau `INFO` afin de récupérer l'ensemble des requêtes.
5. Assurez-vous que le nom de votre **groupe CloudWatch** commence par `api-gateway`.
6. Sélectionnez le format JSON (les formats CLF et CSV sont également pris en charge), et ajoutez ce qui suit dans le champ **Log format** :

    ```text
    {
        "apiId": "$context.apiId",
        "stage": "$context.stage",
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

#### Envoi de logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction AWS Lambda de collecte de logs avec Datadog][5].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le groupe de logs CloudWatch qui contient vos logs API Gateway depuis la console AWS.
   Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (vous pouvez toutefois laisser le filtre vide) et ajoutez le déclencheur.

Accédez ensuite à la [page Logs][6] pour commencer à explorer vos logs.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_api_gateway" >}}



### Événements

L'intégration Amazon APIP Gateway n'inclut aucun événement.

### Checks de service

L'intégration Amazon API Gateway n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-api-gateway
[5]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_api_gateway/amazon_api_gateway_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/