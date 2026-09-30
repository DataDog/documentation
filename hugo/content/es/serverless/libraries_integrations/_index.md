---
aliases:
- /es/serverless/serverless_integrations
- /es/serverless/datadog_lambda_library/
- /es/serverless/libraries_integrations/library/
title: Bibliotecas e integraciones serverless
---

## Integraciones de herramientas de desarrollo serverless

{{< whatsnext desc="Datadog se integra con herramientas de desarrollo sin servidor para instalar la extensión  y la biblioteca de Datadog Lambda para tus aplicaciones automáticamente" >}}
    {{< nextlink href="/serverless/libraries_integrations/plugin/" >}}Complemento de Datadog para un framework sin servidor{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cli/" >}}CLI de Datadog para AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cli-cloud-run/" >}}CLI de Datadog para Google Cloud Run{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/cdk/" >}}Constructo de Datadog para AWS CDK{{< /nextlink >}}
    {{< nextlink href="/serverless/libraries_integrations/macro/" >}}Datadog Serverless Macro para AWS SAM{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog Lambda Extension y Forwarder

{{< whatsnext desc="You need either the Lambda extension or the Forwarder to send telemetry from your Lambda functions. You may also need the Forwarder to collect logs for non-Lambda serverless resources, such as Amazon API Gateway." >}}
    {{< nextlink href="/serverless/libraries_integrations/extension/" >}}Datadog Lambda Extension{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring" >}}Función de Lambda del Datadog Forwarder{{< /nextlink >}}
{{< /whatsnext >}}

## Bibliotecas Lambda de Datadog

{{< whatsnext desc="Certain runtime requires the Datadog Lambda library in addition to the Datadog Lambda extension to collect the telemetry." >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-python" >}}Biblioteca Lambda de Datadog para Python{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-js" >}}Biblioteca Lambda de Datadog para Node.js{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-go" >}}Biblioteca Lambda de Datadog para Go{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/datadog-lambda-rb" >}}Biblioteca Lambda de Datadog para Ruby{{< /nextlink >}}
{{< /whatsnext >}}

## Integración de AWS y Datadog

{{< whatsnext desc="In addition to collecting telemetry directly from your Lambda functions, Datadog can also collect telemetry through the Datadog AWS integration for resources utilized by your serverless application." >}}
    {{< nextlink href="/integrations/amazon_lambda/" >}}Integración de AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_step_functions/" >}}Integración de AWS Step Functions{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_appsync/" >}}Integración de AWS AppSync{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_api_gateway/" >}}Integración de Amazon API Gateway{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_sqs/" >}}Integración de Amazon SQS{{< /nextlink >}}
    {{< nextlink href="/integrations/amazon_sns/" >}}Integración de Amazon SNS{{< /nextlink >}}
{{< /whatsnext >}}