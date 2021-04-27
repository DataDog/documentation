---
title: Datadog Lambda Extension (Preview)
kind: documentation
further_reading:
    - link: 'serverless/custom_metrics'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from AWS Lambda'
---

## Overview

<div class="alert alert-warning"> The Datadog AWS Lambda Extension is in public preview. If you have any feedback, contact <a href="/help">Datadog support</a>.</div>

AWS Lambda Extensions are companion processes that augment your Lambda functions. They run within the Lambda execution environment, alongside your Lambda function code. The Datadog Extension is a lightweight version of the Datadog Agent built to run alongside your code with minimal performance overhead.

The Datadog Extension supports submitting custom metrics and logs [synchronously][1] while your AWS Lambda function executes. This means that you can submit some of your telemetry data without the [Datadog Forwarder][2]. **Note**: The Datadog Forwarder is still required to submit traces to Datadog.

## Setup

The Datadog Extension currently supports Node.js and Python runtimes.

### As a Lambda Layer

The Datadog Lambda Extension is distributed as its own Lambda Layer (separate from the [Datadog Lambda Library][3]).

1. Instrument your [Python][4] or [Node.js][5] application by installing the Datadog Lambda Library.

2. Add the Lambda Layer for the Datadog Extension to your AWS Lambda function with the following ARN:

    ```
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<VERSION_NUMBER>
    ```

    Replace the placeholder values in the ARN as follows:
    - Replace `<AWS_REGION>` with the same AWS region as your Lambda Function, for example, `us-east-1`.
    - Replace `<VERSION_NUMBER>` with the version of the Datadog Lambda Extension you would like to use, for example `7`. You can identify the current version by viewing the newest image tags in the [Amazon ECR repository][11].

    **Note**: This Layer is separate from the Datadog Lambda Library. If you installed the Datadog Lambda Library as a Lambda Layer,
    your function should now have two Lambda Layers attached.

3. Reference the [sample code][10] to submit a custom metric.

### As a container image

If your function is deployed as a container image, you cannot add Lambda Layers to your function. Instead, you must directly install the Datadog Lambda Library and the Datadog Lambda Extension in your function's image.

First, install the Datadog Lambda Library by following the installation instructions for [Node.js][5] or [Python][4]. Use the installation instructions specifically for functions deployed as container images.

Then, add the Datadog Lambda Extension to your container image by adding the following to your Dockerfile:

```
COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
```

Replace `<TAG>` with either a specific version number (for example, `7`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][11].

## Log collection

To submit your AWS Lambda logs to Datadog using the extension, set the env variable `DD_LOGS_ENABLED` to `true` in your function.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[2]: /serverless/forwarder
[3]: /serverless/datadog_lambda_library
[4]: /serverless/installation/python
[5]: /serverless/installation/nodejs
[6]: /serverless/installation/go
[7]: https://docs.datadoghq.com/serverless/datadog_lambda_library
[8]: https://github.com/DataDog/datadog-lambda-js/releases
[9]: https://github.com/DataDog/datadog-lambda-python/releases
[10]: /serverless/custom_metrics#custom-metrics-sample-code
[11]: https://gallery.ecr.aws/datadog/lambda-extension
