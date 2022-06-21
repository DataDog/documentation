---
title: Bibliothèques et intégrations sans serveur
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
aliases:
  - /fr/serverless/serverless_integrations
---
{{< whatsnext desc="Intégrations et bibliothèques sans serveur :" >}}
    {{< nextlink href="/serverless/libraries_integrations/extension/" >}}Extension Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/library/" >}}Bibliothèque Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/forwarder/" >}}Forwarder Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/plugin/" >}}Plug-in Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/macro/" >}}Macro Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cli/" >}}CLI Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/lambda_code_signing/" >}}Signature de code Lambda{{< /nextlink >}}
{{< /whatsnext >}}

## AWS Step Functions

Activez l'[intégration AWS Step Functions][1] afin de récupérer automatiquement des tags supplémentaires pour vos métriques Lambda et de déterminer à quelles machines d'état une fonction donnée appartient. Ces tags vous permettent d'obtenir une vue agrégée de vos métriques et logs Lambda par fonction dans la [vue Serverless][2].

1. Installez l'[intégration AWS Step Functions][1].
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin d'ajouter des tags supplémentaires à vos métriques Lambda.

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `states:ListStateMachines`     | Énumère les instances Step Functions actives.   |
    | `states:DescribeStateMachine` | Récupère les métadonnées et les tags Step Functions.  |
3. Configurez le [tracing distribué et la journalisation][1] pour AWS Step Functions :
4. Une fois la configuration terminée, accédez à la [page d'accueil Serverless][4] et filtrez vos fonctions Lambda par `statemachinename`, `statemachinearn` ou `stepname`.

{{< img src="serverless/step-function-trace.jpeg" alt="Tracing AWS Step Function" >}}

## Amazon EFS pour Lambda

Activez [Amazon EFS pour Lambda][5] afin de récupérer automatiquement des tags supplémentaires pour vos métriques Lambda et de déterminer à quel EFS une fonction donnée appartient. Ces tags vous permettent d'obtenir une vue agrégée de vos métriques et logs Lambda par EFS dans la [vue Serverless][6].

1. Installez l'[intégration Amazon EFS][7].
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques EFS de Lambda.

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `elasticfilesystem:DescribeAccessPoints`     | Énumère les instances EFS actives connectées aux fonctions Lambda. |

3. Accédez ensuite à la [vue Serverless][2] pour utiliser le nouveau tag `filesystemid` sur vos fonctions Lambda.

{{< img src="integrations/amazon_lambda/efs_for_lambda.mp4" alt="Amazon EFS pour Lambda" video=true >}}

## Lambda@Edge

Utilisez les tags `at_edge`, `edge_master_name` et `edge_master_arn` afin d'obtenir une vue agrégée de vos métriques et logs de fonctions Lambda lorsqu'elles sont exécutées dans des emplacements Edge.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/integrations/amazon_step_functions/
[2]: https://app.datadoghq.com/functions
[3]: /fr/integrations/amazon_web_services/#installation
[4]: /fr/serverless/serverless_integrations/macro/
[5]: /fr/integrations/amazon_efs/#amazon-efs-for-lambda
[6]: /fr/serverless/serverless_integrations/plugin/
[7]: /fr/integrations/amazon_efs/