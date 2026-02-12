---
title: Remote instrumentation for AWS Lambda
further_reading:
- link: "https://www.datadoghq.com/blog/faster-visibility-into-aws-lambda-functions"
  tag: "Blog"
  text: "Bring faster visibility into AWS Lambda functions with remote instrumentation"
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">This feature is not supported for your selected Datadog site. ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< img src="serverless/lambda/svl_lambda_remote.png" alt="AWS Remote Instrumentation page in Datadog, showing a 'Scope functions to instrument using tags' box and functions available for remote instrumentation." style="width:100%;" >}}

You can use remote instrumentation to quickly add instrumentation to your AWS Lambda functions and keep them instrumented securely.

The _instrumenter_ is a Lambda function that ensures your target functions have the Datadog Lambda extension and Datadog Lambda library added. The instrumenter also ensures that your functions remain instrumented and can send telemetry to Datadog.

The instrumenter must be deployed to every region and account where you want to instrument functions.

### Prerequisites

- The [Datadog-AWS integration][1] is set up, and [resource collection][2] is enabled.
- Your user account has the following permissions:
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

1. After the instrumenter function is deployed, select functions to instrument. You can select functions by function name, tags, or combinations of tags. See the [Selecting functions](#selecting-functions) section for more details.

   After you finish your selections, click **Next**.

1. Confirm your function selections.

   You can also set layer versions and toggle logging and tracing. These settings are used for all future instrumentation and remain fixed until you manually update them. Updates can take a few minutes to be applied.

After you set your configuration, the instrumenter automatically instruments any functions that newly satisfy your configured targeting rules. The instrumenter also keeps your functions instrumented. If Datadog layers or environment variables on a matching function are modified outside of remote instrumentation, the instrumenter automatically re-instruments your function.

### Selecting functions
You can select functions by:
- Function name
- AWS resource tags
- Tags configured in `DD_TAGS`

Tag matching is case-insensitive.

To enable instrumentation for multiple functions at once, you could apply a custom tag (for example, `dd_serverless_instrument:true`) to all the functions you want to instrument, and use this tag to select all of your desired functions.

#### Logical operators

You can use logical operators on your tags:
- `OR`: Use a union operator to select multiple tags with the same key
  - **Example**: `name:(app-staging OR app-prod)`
- `AND`: Use an intersection operator to select multiple tags with different keys
  - **Example**: `name:app-staging AND team:engineering`
- `!`: Use a negation operator to exclude tags or function names
  - **Example**: `team:engineering AND !function_name:lambda-name`

## Skipped functions
Functions that have pre-existing Datadog layers or environment variables are considered manually instrumented. Manually instrumented functions are marked `manual` and skipped by the remote instrumenter to ensure there are no layer conflicts.

Datadog recommends that you only instrument Lambda functions with a memory size greater than 256 MB. To skip instrumenting smaller Lambdas, make sure they are not selected.

## Verification

After the remote instrumenter Lambda has applied instrumentation to your functions, the status column displays an **Instrumented** status. You can also confirm your functions are instrumented by opening your AWS Console and ensuring that two layers (Datadog Lambda extension and a Datadog tracing layer) have been added to each selected function.

## Upgrading to a new version

1. Find [datadog-remote-instrument][5] (if you didn't rename it) CloudFormation stack.
2. Find the current version of the stack template in the **Template** tab.
   ```yaml
   Mappings:
     Constants:
      DdRemoteInstrumentApp:
        Version: <TEMPLATE_VERSION>
   ```
   Note down the value of the template version, such as `1.10.0`, in case you run into issues with the new version and need to roll back.
3. Update the stack using template URL `https://datadog-cloudformation-template.s3.amazonaws.com/aws/remote-instrument/latest.yaml`. You can also replace `latest` with a specific version, such as `1.10.0`, if needed. Check the [releases page][6] for new features and fixes. Make sure to review the changesets before applying the update.


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
[5]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=datadog-remote-instrument
[6]: https://github.com/DataDog/serverless-remote-instrumentation/releases

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
