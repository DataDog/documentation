---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Cognito."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_cognito/'
git_integration_title: amazon_cognito
has_logo: true
integration_title: "Amazon\_Cognito"
is_public: true
kind: integration
manifest_version: 1
name: amazon_cognito
public_title: "Intégration Datadog/Amazon\_Cognito"
short_description: "Surveillez des métriques clés d'Amazon\_Cognito."
version: 1
---
## Présentation
Amazon Cognito est un service qui vous permet  de créer des identités uniques pour vos utilisateurs, d'authentifier ces identités auprès de fournisseurs d'identité et d'enregistrer les données utilisateur dans le cloud AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Cognito.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Cognito` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Cognito][3].

### Collecte de logs
#### Activer le logging

Configurez Amazon Cognito de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_cognito` est défini en tant que *Target prefix*.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon Cognito dans la console AWS :

    * [Ajouter un déclencheur manuel sur le compartiment S3][5]
    * [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][6]

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_cognito" >}}


### Événements
L'intégration Amazon Cognito n'inclut aucun événement.

### Checks de service
L'intégration Amazon Cognito n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-cognito
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#create-a-new-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cognito/amazon_cognito_metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}