---
title: Datadog Lambda Extension
kind: documentation
further_reading:
    - link: 'serverless/custom_metrics'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from AWS Lambda'
---

## Overview

AWS Lambda Extensions are companion processes that augment your Lambda functions. They run within the Lambda execution environment, alongside your Lambda function code. The Datadog Extension is a lightweight version of the Datadog Agent built to run alongside your code with minimal performance overhead.

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrument AWS Serverless Applications"  style="width:100%;">}}

The Datadog Lambda Extension is responsible for:
- Pushing real-time [enhanced Lambda metrics][1], [custom metrics][2], and [traces][3] from the Datadog Lambda Library to Datadog.
- Forwarding logs from your Lambda function to Datadog.

The Datadog Extension supports submitting custom metrics, enhanced metrics, traces and logs [synchronously][4] while your AWS Lambda function executes. 
The Datadog Extension currently supports submitting logs in all Lambda runtimes, and custom metrics, enahnced metrics and traces in Node.js and Python runtimes.

## Datadog Lambda Extension Setup

To instrument your AWS serverless applications, refer to the [serverless installation instructions][5].

### As a Lambda Layer

The Datadog Lambda Extension is distributed as its own Lambda Layer (separate from the [Datadog Lambda Library][6]).

1. Instrument your [Python][7] or [Node.js][8] application by installing the Datadog Lambda Library.

2. Add the Lambda Layer for the Datadog Extension to your AWS Lambda function with the following ARN:

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
    ```

    Replace the placeholder values in the ARN as follows:
    - Replace `<AWS_REGION>` with the same AWS region as your Lambda Function, for example, `us-east-1`.
    - Replace `<EXTENSION_VERSION>` with the version of the Datadog Lambda Extension you would like to use, for example `7`. You can identify the current version by viewing the newest image tags in the [Amazon ECR repository][9].

    **Note**: This Layer is separate from the Datadog Lambda Library. If you installed the Datadog Lambda Library as a Lambda Layer,
    your function should now have two Lambda Layers attached.

3. Add the environment variable `DD_API_KEY` and set the value to your Datadog API key on the [API Management page][10]. 

4. Reference the [sample code][11] to submit a custom metric.

### As a container image

If your function is deployed as a container image, you cannot add Lambda Layers to your function. Instead, you must directly install the Datadog Lambda Library and the Datadog Lambda Extension in your function's image.

1. Install the Datadog Lambda Library by following the installation instructions for [Node.js][8] or [Python][7]. Use the installation instructions specifically for functions deployed as container images.

2. Add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Replace `<TAG>` with either a specific version number (for example, `7`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][9].

3. Add the environment variable `DD_API_KEY` and set the value to your Datadog API key on the [API Management page][10]. 

4. Reference the [sample code][11] to submit a custom metric.

## Log collection

To disable submission of your AWS Lambda logs to Datadog using the Extension, set the environment variable `DD_SERVERLESS_LOGS_ENABLED` to `false` in your Lambda function.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/enhanced_lambda_metrics
[2]: /serverless/custom_metrics
[3]: /serverless/distributed_tracing
[4]: /serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[5]: /serverless/installation
[6]: /serverless/datadog_lambda_library
[7]: /serverless/installation/python
[8]: /serverless/installation/nodejs
[9]: https://gallery.ecr.aws/datadog/lambda-extension
[10]: https://app.datadoghq.com/account/settings#api
[11]: /serverless/custom_metrics#custom-metrics-sample-code
