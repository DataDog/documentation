---
title: Datadog Lambda Extension
kind: documentation
further_reading:
    - link: 'serverless/custom_metrics'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from AWS Lambda'
    - link: 'https://www.datadoghq.com/blog/aws-graviton2-lambda-monitoring/'
      tag: 'Blog'
      text: 'AWS Lambda Functions running on AWS Graviton2 processors'
aliases:
    - /serverless/datadog_lambda_library/extension/
    - /serverless/guide/extension_private_link/
---

## Overview

AWS Lambda extensions are companion processes that augment your Lambda functions. They run within the Lambda execution environment, alongside your Lambda function code. The Datadog extension is a lightweight version of the Datadog Agent built to run alongside your code with minimal performance overhead.

The Datadog extension submits [enhanced Lambda metrics][1], [custom metrics][2], [traces][3], and logs asynchronously. Submitting Lambda logs with the extension is supported in all Lambda runtimes. Submitting custom metrics, enhanced metrics and traces is supported in Node.js, Python, Go, and .NET Lambda runtimes.

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrument AWS Serverless Applications"  style="width:100%;">}}

## Installation

To install the Datadog Lambda Extension, see the [serverless installation instructions][4].

## Overhead

The Datadog Lambda Extension introduces a small amount of overhead to your Lambda function's cold starts (that is, the higher init duration), as the Extension needs to initialize. Datadog is continuously optimizing the Lambda extension performance and recommend always using the latest release.

You may notice an increase of your Lambda function's reported duration. This is because the Datadog Lambda Extension needs to flush data back to the Datadog API. Although the time spent by the extension flushing data is reported as part of the duration, it's done *after* AWS returns your function's response back to the client. In other words, the added duration does not slow down your Lambda function. See this [AWS blog post][5] for more technical information. To monitor your function's actual performance and exclude the duration added by the Datadog extension, use the metric `aws.lambda.enhanced.runtime_duration`.

By default, the Extension sends data back to Datadog at the end of each invocation. This avoids delays of data arrival for sporadic invocations from low-traffic applications, cron jobs, and manual tests. Once the Extension detects a steady and frequent invocation pattern (more than once per minute), it batches data from multiple invocations and flushes periodically at the beginning of the invocation when it's due. This means that *the busier your function is, the lower the average duration overhead per invocation*. 

For Lambda functions deployed in a region that is far from the Datadog site, for example, a Lambda function deployed in eu-west-1 reporting data to the US1 Datadog site, can observe a higher duration overhead due to the network latency.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/enhanced_lambda_metrics
[2]: /serverless/custom_metrics
[3]: /serverless/distributed_tracing
[4]: /serverless/installation
[5]: https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/
