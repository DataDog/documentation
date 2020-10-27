---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Step\_Functions."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_step_functions/'
draft: false
git_integration_title: amazon_step_functions
has_logo: true
integration_title: "Amazon\_Step\_Functions"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_step_functions
public_title: "Intégration Datadog/Amazon\_Step\_Functions"
short_description: "Surveillez des métriques clés d'Amazon\_Step\_Functions."
version: '1.0'
---
## Présentation

Amazon Step Functions (états) vous permet de coordonner les composants d'applications distribuées et de microservices à l'aide de workflows visuels.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Step Functions.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Amazon Web Services][1]. Ensuite, ajoutez les autorisations suivantes au document de stratégie pour votre rôle AWS/Datadog :

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Step Functions (States)` est cochée dans la section concernant la collecte des métriques. Si vos machines d'état utilisent AWS Lambda, assurez-vous que l'option `Lambda` est cochée.
2. Installez l'[intégration Datadog/Amazon Step Functions][3].

#### Enrichir les métriques AWS Lambda

Si vos états Step Functions sont des fonctions Lambda, l'installation de cette intégration ajoutera des [tags][4] supplémentaires à vos métriques Lambda. Cela vous permet de voir les machines d'état auxquelles appartiennent vos fonctions Lambda. Vous pouvez visualiser ces informations sur la [page Serverless][5].

### Collecte de logs

#### Activer le logging

Configurez Amazon Step Functions de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_step_functions` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon Step Functions dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][7]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][8]

### Collecte de traces

#### Activer le tracing AWS X-Ray

Pour activer le tracing distribué sur vos AWS Step Functions :

1. Activez l'[intégration AWS X-Ray de Datadog][9).
1. Connectez-vous à la console AWS.
2. Accédez à **Step Functions**.
3. Sélectionnez une de vos Step Functions et cliquez sur **Edit**.
4. Faites défiler la page jusqu'à la section **Tracing** et cochez la case **Enable X-Ray tracing**.
5. Conseil : [installez la bibliothèque de tracing AWS X-Ray][10] dans vos fonctions pour obtenir des traces plus détaillées.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_step_functions" >}}


### Événements

L'intégration Amazon Step Functions n'inclut aucun événement.

### Checks de service

L'intégration Amazon Step Functions n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: /fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-step-functions
[4]: /fr/tagging/
[5]: /fr/graphing/infrastructure/serverless/
[6]: /fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: /fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: /fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: /fr/tracing/serverless_functions/enable_aws_xray
[10]: /fr/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[12]: /fr/help/