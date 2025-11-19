---
title: Monitoring AWS Lambda Managed Instances
description: Install and configure the Datadog Agent for AWS Lambda Managed Instances.
---

Datadog Serverless Monitoring enables visibility into AWS Lambda Managed Instances.

## Setup

To start monitoring your AWS Lambda Managed Instances, use Datadog's standard setup for instrumenting AWS Lambda functions. Choose your runtime:

{{< partial name="serverless/getting-started-languages.html" >}}

## Data collected

Datadog collects the same metrics for AWS Lambda Managed Instances as it does for standard AWS Lambda applications, **excluding** `aws.lambda.enhanced.estimated_cost` and `aws.lambda.enhanced.billed_duration`. These two metrics are not available for AWS Lambda Managed Instances.

See the [list of all metrics collected from AWS Lambda applications][1].

## Correlating logs and traces

## Known limitations

[1]:  /integrations/amazon-lambda/#data-collected