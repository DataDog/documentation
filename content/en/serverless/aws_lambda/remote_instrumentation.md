---
title: Remote instrumentation for AWS Lambda
---

_Supported runtimes_: Node.js, Python

You can use remote instrumentation to quickly add instrumentation to your AWS Lambda functions and keep them instrumented securely.

The _instrumenter_ is a Lambda function that ensures your target functions have the Datadog Lambda extension and Datadog Lambda library added. The instrumenter also ensures that your functions remain instrumented and can send telemetry to Datadog.

The instrumenter must be deployed to every region and account where you want to instrument functions.

### Prerequisites

- The [Datadog-AWS integration][1] is set up, and [resource collection][2] is enabled.
- Your user account has the following roles:
   - Serverless AWS Instrumentation Read
   - Serverless AWS Instrumentation Write
- Your API key must have [Remote Configuration access][4]

  {{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}



## Setup

1. On the [Serverless > AWS Lambda][3] page, select **Instrument Functions**.

1. On the **Select AWS Region and Launch CloudFormation** modal:
   - Click **Select API Key** to select the Datadog API key to use to send data to your AWS account.
   - Use the **Select a region** drop-down to choose the region where you want to enable instrumentation.

1. Click **Launch CloudFormation Template**. You are prompted to deploy the template into your environment. Launching the template can take a few minutes.

   <div class="alert alert-info">Datadog recommends that you always test remote instrumentation on development functions before moving to staging and production.</div>

   The CloudFormation stack deploys the instrumenter function, **datadog-remote-instrumenter**, into your account and region. The stack also creates a CloudTrail and some adjacent resources.

1. After the instrumenter function is deployed, select functions to instrument. 
   You can select functions by tag or by function name. To enable instrumentation for multiple functions at once, you could apply a custom tag (for example, `dd_serverless_instrument:true`) to all the functions you want to instrument, and use this tag to select all of your desired functions.
   
   After you finish your selections, click **Enable Remote Instrumentation**.

1. Confirm your function selections. You can also set the layer version, which is used for all future instrumentation. This version remains fixed until you manually update it. Updates can take a few minutes to be applied.

## Skipped functions
Datadog recommends that you only instrument Lambda functions with a memory size greater than 256 MB. If you are comfortable with adding layers to smaller Lambdas, you can change the setting in the CloudFormation template. 

The remote instrumenter also marks functions that have at least one layer with the tag `manual` and skips instrumentation to ensure there are no layer conflicts. 

## Verification

To confirm that your functions are instrumented with Datadog, open your AWS Console and ensure that two layers (Datadog Lambda extension and `datadog-lambda-python` or `datadog-lambda-js`) have been added to each selected function.

## Removing instrumentation

Deleting the CloudFormation stack in a region automatically removes instrumentation from all functions in that region.

## Troubleshooting

If you see issues related to IAM roles, ensure that you have permission to create resources for the following services:

- EventBridge
- S3
- CloudTrail
- Lambda

[1]: /integrations/amazon_web_services
[2]: https://app.datadoghq.com/integrations/amazon-web-services?panel=resource-collection
[3]: https://app.datadoghq.com/functions?cloud=aws
[4]: /agent/remote_config/?tab=configurationyamlfile#setup
