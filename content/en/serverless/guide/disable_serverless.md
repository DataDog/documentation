---
title: Disable Serverless Monitoring
description: How to disable Serverless Monitoring for any supported cloud platform.
---

This page explains how to disable Datadog Serverless Monitoring.

## AWS

<div class="alert alert-info">To enable Serverless Monitoring, see Datadog's documentation for <a href="/serverless/aws_lambda">AWS Lambda</a> or <a href="/serverless/step_functions">AWS Step Functions</a>.</div>

To disable Serverless Monitoring for AWS Lambda or AWS Step Functions:

### Disable metric collection

1. In Datadog, navigate to the [AWS integration tile][1].
2. Select your AWS account on the left.
3. Navigate to the **Metric Collection** tab and toggle off metric collection from the AWS services you want to stop monitoring.

   {{< img src="serverless/guide/disable/aws-lambda-off.png" alt="Datadog-AWS integration tile, Metric Collection tab. With 'lambda' in the search bar, the AWS Lambda service appears. The toggle is in a disabled position." style="width:100%;" >}}
4. **Save** your changes.

### Disable tracing

Remove any Datadog Lambda Libraries from your AWS Lambda functions.

## Azure

<div class="alert alert-info">To enable Serverless Monitoring, see Datadog's documentation for <a href="/serverless/azure_app_service">Azure App Service</a>, <a href="/serverless/azure_container_apps">Azure Container Apps</a>, or <a href="/serverless/azure_functions">Azure Functions</a>.</div>

To disable Serverless Monitoring for Azure App Service, Azure Container Apps, or Azure Functions:

### Disable metric collection

1. In Datadog, navigate to the [Azure integration tile][2].
2. Select your app registration on the left.
3. Navigate to the **Metric Collection** tab and toggle off metric collection for the Azure services you wish to stop monitoring.

   {{< img src="serverless/guide/disable/azure-container-off.png" alt="Datadog-Azure integration tile, Metric Collection tab. With 'container apps' in the search bar, the Azure Container Apps service appears. The toggle is in a disabled position." style="width:100%;" >}}
4. **Save** your changes.

### Disable tracing
If you deployed the Datadog Agent in a sidecar container, remove it. If you are using `datadog/serverless-init`, remove it from your Dockerfile.

## Google Cloud

<div class="alert alert-info">To enable Serverless Monitoring, see Datadog's documentation for <a href="/serverless/google_cloud_run">Google Cloud Run</a>.</div>

To disable Serverless Monitoring for Google Cloud Run containers or functions:

### Disable metrics
1. In Datadog, navigate to the [Google Cloud integration tile][3].
2. Select your GCP account on the left.
3. Navigate to the **Metric Collection** tab and toggle off metric collection for the Google Cloud services you wish to stop monitoring.

   {{< img src="serverless/guide/disable/gcr-off.png" alt="Datadog-Google Cloud integration tile, Metric Collection tab. With 'cloud run' in the search bar, the Cloud Run and Cloud Run functions services appear. Both toggles are in a disabled position." style="width:100%;" >}}
4. **Save** your changes.

### Disable tracing
If you deployed the Datadog Agent in a sidecar container, remove it with the [Datadog CLI][4]'s [`uninstrument` command][5]. If you are using `datadog/serverless-init`, remove it from your Dockerfile.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/integrations/azure
[3]: https://app.datadoghq.com/integrations/google-cloud-platform
[4]: https://github.com/DataDog/datadog-ci/
[5]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-cloud-run#uninstrument
