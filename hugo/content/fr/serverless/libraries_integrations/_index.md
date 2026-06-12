---
aliases:
- /fr/serverless/serverless_integrations
- /fr/serverless/datadog_lambda_library/
- /fr/serverless/libraries_integrations/library/
title: Bibliothèques et intégrations sans serveur
---

## Intégrations des outils de développement sans serveur

{{< whatsnext desc="Datadog s'intègre aux principaux outils de développement sans serveur pour permettre l'installation automatique de l'extension et de la bibliothèque Lambda Datadog dans vos applications." >}}
    {{< nextlink href="/serverless/libraries_integrations/plugin/" >}}Plug-in Datadog pour Serverless Framework{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cli/" >}}CLI Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cdk/" >}}Construct Datadog pour AWS CDK{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/macro/" >}}Macro Serverless Datadog pour AWS SAM{{< /nextlink >}}
{{< /whatsnext >}}

## Extension Lambda Datadog et Forwarder

{{< whatsnext desc="Vous aurez besoin de l'extension Lambda ou du Forwarder pour envoyer des données de télémétrie depuis vos fonctions Lambda. Vous aurez également peut-être besoin de faire en sorte que le Forwarder recueille les logs des ressources sans serveur non Lambda, telles qu'Amazon API Gateway." >}}
    {{< nextlink href="/serverless/libraries_integrations/extension/" >}}Extension Lambda Datadog{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring" >}}Fonction Lambda du Forwarder Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Bibliothèques Lambda Datadog

{{< whatsnext desc="Certains runtimes nécessitent la bibliothèque Lambda Datadog en plus de l'extension Lambda Datadog pour recueillir les données de télémétrie." >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-python" >}}Bibliothèque Lambda Datadog pour Python{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-js" >}}Bibliothèque Lambda Datadog pour Node.js{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-go" >}}Bibliothèque Lambda Datadog pour Go{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-rb" >}}Bibliothèque Lambda Datadog pour Ruby{{< /nextlink >}}
{{< /whatsnext >}}

## Intégration Datadog/AWS

{{< whatsnext desc="En plus de recueillir les données de télémétrie directement depuis vos fonctions Lambda, Datadog peut également les recueillir via l'intégration Datadog/AWS pour les ressources utilisées par votre application sans serveur." >}}
    {{< nextlink href="/integrations/amazon_lambda/" >}}Intégration AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_step_functions/" >}}Intégration AWS Step Functions{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_appsync/" >}}Intégration AWS AppSync{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_api_gateway/" >}}Intégration Amazon API Gateway{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_sqs/" >}}Intégration Amazon SQS{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_sns/" >}}Intégration Amazon SNS{{< /nextlink >}}
{{< /whatsnext >}}