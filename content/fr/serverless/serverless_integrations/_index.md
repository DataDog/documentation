---
title: Intégrations sans serveur
kind: documentation
further_reading:
  - link: /serverless/serverless_integrations/plugin/
    tag: Plug-in Serverless Datadog
    text: Documentation
  - link: /serverless/serverless_integrations/macro/
    tag: Documentation
    text: Macro Serverless Datadog
  - link: /serverless/serverless_integrations/cli/
    tag: Documentation
    text: CLI Serverless Datadog
---
## Plug-in Serverless Datadog

Le plug-in Serverless Framework Datadog installe automatiquement la bibliothèque Lambda Datadog sur vos applications sans serveur Python et Node.js, et permet de recueillir des métriques Lambda optimisées, des métriques custom, des traces et des logs à partir de vos fonctions Lambda. Pour en savoir plus, consultez la [page dédiée au plug-in][1].

## Macro Serverless Datadog

La macro Serverless Datadog pour AWS CloudFormation installe automatiquement la bibliothèque Lambda Datadog sur vos applications sans serveur Python et Node.js déployées à l'aide d'AWS CloudFormation, SAM ou CDK. Elle permet de recueillir des métriques Lambda optimisées, des métriques custom, des traces et des logs à partir de vos fonctions Lambda. Pour en savoir plus, consultez la [page dédiée à la macro][2].

## CLI Serverless Datadog

L'interface de ligne de commande Serverless Datadog vous permet de configurer l'instrumentation de vos applications sans serveur par ligne de commande ou à partir d'un pipeline CI/CD. Elle installe automatiquement la bibliothèque Lambda Datadog sur vos applications sans serveur Python et Node.js, et permet de recueillir des métriques Lambda optimisées, des métriques custom, des traces et des logs à partir de vos fonctions Lambda. Pour en savoir plus, consultez la [page dédiée à la CLI][3].

## AWS Step Functions

Activez l'[intégration AWS Step Functions][4] afin de récupérer automatiquement des tags supplémentaires pour vos métriques Lambda et de déterminer à quelles machines d'état une fonction donnée appartient. Ces tags vous permettent d'obtenir une vue agrégée de vos métriques et logs Lambda par fonction dans la [vue Serverless][5].

1. Installez l'[intégration AWS Step Functions][4].
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][6] afin d'ajouter des tags supplémentaires à vos métriques Lambda.

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | Énumère les instances Step Functions actives.   |
    | `states:DescribeStateMachine` | Récupère les métadonnées et les tags Step Functions.  |
3. Configurez le [tracing distribué et le logging][4] pour AWS Step Functions :
4. Une fois la configuration terminée, accédez à la [page d'accueil Serverless][2] et filtrez vos fonctions Lambda par `statemachinename`, `statemachinearn` ou `stepname`.

{{< img src="serverless/step-function-trace.jpeg" alt="Tracing AWS Step Function" >}}

## Amazon EFS pour Lambda

Activez [Amazon EFS pour Lambda][7] afin de récupérer automatiquement des tags supplémentaires pour vos métriques Lambda et de déterminer à quel EFS une fonction donnée appartient. Ces tags vous permettent d'obtenir une vue agrégée de vos métriques et logs Lambda par EFS dans la [vue Serverless][1].

1. Installez l'[intégration Amazon EFS][8].
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][6] afin de recueillir des métriques EFS de Lambda.

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Énumère les instances EFS actives connectées aux fonctions Lambda. |

3. Accédez ensuite à la [vue Serverless][5] pour utiliser le nouveau tag `filesystemid` sur vos fonctions Lambda.

{{< img src="integrations/amazon_lambda/efs_for_lambda.gif" alt="Amazon EFS pour Lambda" >}}

## Lambda@Edge

Utilisez les tags `at_edge`, `edge_master_name` et `edge_master_arn` afin d'obtenir une vue agrégée de vos métriques et logs de fonctions Lambda lorsqu'elles sont exécutées dans des emplacements Edge.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/serverless/serverless_integrations/plugin/
[2]: /fr/serverless/serverless_integrations/macro/
[3]: /fr/serverless/serverless_integrations/cli/
[4]: /fr/integrations/amazon_step_functions/
[5]: https://app.datadoghq.com/functions
[6]: /fr/integrations/amazon_web_services/#installation
[7]: /fr/integrations/amazon_efs/#amazon-efs-for-lambda
[8]: /fr/integrations/amazon_efs/