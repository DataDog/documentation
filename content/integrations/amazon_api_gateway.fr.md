---
aliases:
  - /fr/integrations/awsapigateway/
categories:
  - cloud
  - api
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: >-
  Suivre les erreurs de AWS gateway, les hits et misses de cache et la latence
  de requêtes.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_api_gateway/'
git_integration_title: amazon_api_gateway
has_logo: true
integration_title: AWS API Gateway
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_api_gateway
public_title: Intégration Datadog-AWS API Gateway
short_description: Suivre les erreurs Amazon API gateway.
version: '1.0'
---
## Présentation

Amazon API Gateway est un service entièrement géré qui facilite la création, la publication, la maintenance, la surveillance et la sécurisation des API à n'importe quelle échelle.

Activez cette intégration pour voir dans Datadog toutes vos métriques de API Gateway.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration d'Amazon Web Services][1].

### Collecte de métrique

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `API Gateway` est cochée dans la section concernant la collecte des métriques.

2. Configurez l'[intégration Datadog - AWS API Gateway][3].

### Collecte de logs

Activer le logging de API Gateway:

1. Allez dans API gateway dans votre console AWS
2. Sélectionnez l'API souhaité et allez dans la section *Stages*
3. Dans l'onglet Logs, activez le logging cloudwatch et le *Access logging* 
4. Sélectionnez le niveau INFO afin d'être sur d'avoir toutes les requêtes.
5. Assurez vous que "apigateway" est inclue dans le nom de votre groupe de log Cloudwatch.
    {{< img src="integrations/amazon_api_gateway/aws_api_gateway_log_collection_1.png" alt="AWS api gateway log collection" responsive="true" responsive="true" popup="true" style="width:70%;">}}
6. Sélectionnez le format JSON (CLF et CSV sont aussi supportés) et nous recommandons d'ajouter dans le champ *format*:

    ```
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

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda pour collecte de logs AWS][4].
2. Une fois la fonction lambda installée, ajoutez manuellement un déclencheur dans la console AWS sur le groupe de log Cloudwatch qui contient vos logs API Gateway:
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="cloudwatch log group" responsive="true" popup="true" style="width:70%;">}}
   Sélectionnez le groupe de log CloudWatch correspondant, ajoutez un nom de filtre (mais n'hésitez pas à laisser le filtre vide) et ajoutez le déclencheur:
{{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="cloudwatch trigger" responsive="true" popup="true" style="width:70%;">}}

Allez désormais dans la section [Log de Datadog][5] pour commencer à explorer vos logs!

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_api_gateway" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'hôte, les groupes de sécurité et plus encore.

### Événements
L'intégration AWS API Gateway n'inclut aucun événements pour le moment.

### Checks de service
L'intégration AWS API Gateway n'inclut aucun check de service pour le moment.

## Dépannage
Besoin d'aide ? Contactez le [support Datadog][7].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_api_gateway
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/#create-a-new-lambda-function
[5]: https://app.datadoghq.com/logs
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_api_gateway/amazon_api_gateway_metadata.csv
[7]: http://docs.datadoghq.com/help/


{{< get-dependencies >}}