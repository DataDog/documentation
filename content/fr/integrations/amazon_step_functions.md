---
categories:
- cloud
- aws
- log collection
dependencies: []
description: Surveillez des métriques clés d'Amazon Step Functions.
doc_link: https://docs.datadoghq.com/integrations/amazon_step_functions/
draft: false
git_integration_title: amazon_step_functions
has_logo: true
integration_id: amazon-step-functions
integration_title: Amazon Step Functions
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_step_functions
public_title: Intégration Datadog/Amazon Step Functions
short_description: Surveillez des métriques clés d'Amazon Step Functions.
version: '1.0'
---

## Présentation

Amazon Step Functions (états) vous permet de coordonner les composants d'applications distribuées et de microservices à l'aide de workflows visuels.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Step Functions.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Amazon Web Services][1]. Ensuite, ajoutez les autorisations suivantes au document de stratégie pour votre rôle AWS/Datadog :

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### Collecte de métriques

1. Dans la [page d'intégration AWS][2], assurez-vous que l'option `States` est activée dans l'onglet `Metric Collection`. Si vos machines d'état utilisent AWS Lambda, vérifiez également que l'option `Lambda` est cochée.
2. Installez l'[intégration Datadog/Amazon Step Functions][3].

#### Enrichir les métriques AWS Lambda

Si vos états Step Functions sont des fonctions Lambda, l'installation de cette intégration ajoute les [tags][4] supplémentaires `statemachinename`, `statemachinearn` et `stepname` à vos métriques Lambda. Cela vous permet de visualiser les machines d'état auxquelles appartiennent vos fonctions Lambda depuis la [page Serverless][5].

### Collecte de logs

1. Configurez Amazon Step Functions de façon à [envoyer des logs à CloudWatch][6]. **Remarque** : utilisez le préfixe du groupe de logs CloudWatch par défaut (`/aws/vendedlogs/states`) pour que Datadog puisse identifier la source des logs et les parser automatiquement.
2. [Envoyez les logs à Datadog][7].

### Collecte de traces

#### Activer le tracing AWS X-Ray

Pour activer le tracing distribué sur vos AWS Step Functions :

1. Activez l'[intégration AWS X-Ray de Datadog][8].
1. Connectez-vous à la console AWS.
2. Accédez à **Step Functions**.
3. Sélectionnez une de vos Step Functions et cliquez sur **Edit**.
4. Faites défiler la page jusqu'à la section **Tracing** et cochez la case **Enable X-Ray tracing**.
5. Conseil : [installez la bibliothèque de tracing AWS X-Ray][9] dans vos fonctions pour obtenir des traces plus détaillées.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_step_functions" >}}


### Événements

L'intégration Amazon Step Functions n'inclut aucun événement.

### Checks de service

L'intégration Amazon Step Functions n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: /fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-step-functions
[4]: /fr/tagging/
[5]: /fr/serverless/
[6]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[7]: /fr/integrations/amazon_web_services/?tab=roledelegation#log-collection
[8]: /fr/tracing/serverless_functions/enable_aws_xray
[9]: /fr/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[11]: /fr/help/