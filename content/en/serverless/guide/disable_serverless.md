---
title: Disable Serverless Monitoring
description: How to disable Serverless Monitoring for any supported cloud platform.
---

This page explains how to disable Datadog Serverless Monitoring.

## AWS

To disable Serverless Monitoring for AWS Lambda or AWS Step Functions:

1. In Datadog, navigate to the [AWS integration tile][1].
2. Select your AWS account on the left.
3. Navigate to the **Metric Collection** tab and toggle off metric collection from the AWS services you want to stop monitoring.

   {{< img src="serverless/guide/disable/aws-metric-off.png" alt="Datadog-AWS integration tile, Metric Collection tab." style="width:100%;" >}}

## Azure

To disable Serverless Monitoring for Azure App Service, Azure Container Apps, or Azure Functions:

1. In Datadog, navigate to the [Azure integration tile][2].
2. Select your app registration on the left.
3. Navigate to the **Metric Collection** tab and toggle off metric collection for the Azure services you wish to stop monitoring.

## Google Cloud

To disable Serverless Monitoring for Google Cloud Run containers or functions:

1. In Datadog, navigate to the [Google Cloud integration tile][3].
2. Select your GCP account on the left.
3. Navigate to the **Metric Collection** tab and toggle off metric collection for the Google Cloud services you wish to stop monitoring.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/integrations/azure
[3]: https://app.datadoghq.com/integrations/google-cloud-platform