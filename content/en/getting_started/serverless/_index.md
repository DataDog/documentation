---
title: Getting Started with Serverless Monitoring
kind: Documentation
further_reading:
  - link: "/serverless"
    tag: "Documentation"
    text: "Serverless"
  - link: "https://www.datadoghq.com/state-of-serverless"
    tag: "Blog"
    text: "The State of Serverless"
---

## Overview 

In serverless architectures, developers build applications composed of discrete functions, while cloud providers are responsible for provisioning, maintaining, and scaling infrastructure. Monitoring serverless applications is very different from monitoring traditional applications. With serverless, you cannot inspect system metrics like disk usage or RAM consumption. However, you can collect other types of performance data for visibility into your serverless applications.

This guide walks you through instrumenting an AWS Lambda function, written in Python, to send metrics to Datadog.

## Setup

### Prerequisites

1. An AWS Lambda function you wish to monitor.
2. A Datadog account and [API key][1]. If you need a Datadog account, [sign up for a free trial][2].

### Configure your AWS role

Use CloudFormation to integrate your AWS account with Datadog.

1. Open the [Datadog AWS integration tile][3]. Click the **Install** button to install this integration.
2. Under the _Configuration_ tab, choose **Automatically Using CloudFormation**. If you already have an attached AWS account, click **Add another account** first. If you add another account, give it a different name than the IAM Role you have already registered, because specifying the same name results in access denial. 
3. Login to the AWS console.
4. On the CloudFormation page:
   1. Provide your [Datadog API key][1].
   2. Check the two acknowledgement boxes at the bottom.
   3. Create a new stack.
5. Update the [Datadog AWS integration tile][3] with the [IAM role name and account ID][4] used to create the CloudFormation stack.

### Instrument your function

In your AWS console, add the ARN for the Datadog Lambda Layer:

```bash
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

The available `RUNTIME` options are `Python27`, `Python36`, `Python37`, and `Python38`. The latest `VERSION` is `44`. For example:

Then import the necessary Layer methods in your function code, add a wrapper around the function handler, and call the `lambda_metric()` function:

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

[...]

@datadog_lambda_wrapper
def lambda_handler(event, context):
    lambda_metric(<METRIC_NAME>, <METRIC_VALUE>, tags=['<TAGS>'])
```

After you have configured your function, you can view metrics, logs and traces on the [Serverless Homepage][5].


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/signup
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html
[5]: https://app.datadoghq.com/functions
