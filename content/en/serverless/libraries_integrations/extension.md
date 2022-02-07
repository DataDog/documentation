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
---

## Overview

AWS Lambda extensions are companion processes that augment your Lambda functions. They run within the Lambda execution environment, alongside your Lambda function code. The Datadog extension is a lightweight version of the Datadog Agent built to run alongside your code with minimal performance overhead.

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrument AWS Serverless Applications"  style="width:100%;">}}

The Datadog Lambda Extension is responsible for:
- Pushing real-time [enhanced Lambda metrics][1], [custom metrics][2], and [traces][3] from the Datadog Lambda Library to Datadog.
- Forwarding logs from your Lambda function to Datadog.

The Datadog extension submits custom metrics, enhanced metrics, traces, and logs [asynchronously][4]. Submitting Lambda logs with the extension is supported in all Lambda runtimes. Submitting custom metrics, enhanced metrics and traces is supported in Node.js, Python, and Go Lambda runtimes.

## Installation

To install the Datadog Lambda Extension, instrument your AWS serverless applications, and review supported runtimes, see the [serverless installation instructions][5].

## Log collection

To disable submission of your AWS Lambda logs to Datadog using the extension, set the environment variable `DD_SERVERLESS_LOGS_ENABLED` to `false` in your Lambda function.

To exclude the `START` and `END` logs, set the environment variable `DD_LOGS_CONFIG_PROCESSING_RULES` to `[{"type": "exclude_at_match", "name": "exclude_start_and_end_logs", "pattern": "(START|END) RequestId\\s"}]`. Alternatively, you can add a `datadog.yaml` file in your project root directory with the following content:

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_start_and_end_logs
      pattern: (START|END) RequestId\s
```

Datadog recommends keeping the `REPORT` logs, as they are used to populate the invocations list in the serverless function views.

To scrub or filter other logs before sending them to Datadog, see [Advanced Log Collection][6].


## Trace collection

To disable submission of your AWS Lambda traces to Datadog using the extension, set the environment variable `DD_TRACE_ENABLED` to `false` in your Lambda function.

To filter traces before sending them to Datadog, see [Ignoring Unwanted Resources in APM][7].

To scrub trace attributes for data security, see [Configure the Datadog Agent or Tracer for Data Security][8].

## Tagging

When using the Extension, Datadog recommends you apply tags by adding the following environment variables to your Lambda functions:

- `DD_ENV`: This sets the `env` tag in Datadog. Use it to separate out your staging, development, and production environments.
- `DD_SERVICE`: This sets the `service` tag in Datadog. Use it to group related Lambda functions into a service.
- `DD_VERSION`: This sets the `version` tag in Datadog. Use it to enable [Deployment Tracking][9].
- `DD_TAGS`: This sets custom tags in Datadog. Must be a list of `<key>:<value>` separated by commas such as: `layer:api,team:intake`.

If you have the Datadog AWS integration enabled, any AWS resource tag applied to your AWS Lambda function also gets applied in Datadog automatically.

## VPC

The Datadog Lambda Extension needs access to public internet to send data to Datadog. If your Lambda functions are deployed in a VPC private subnet without access to public internet, see the options below.

### Using AWS PrivateLink

If you are sending data to a Datadog site that is hosted on AWS, such as US1, then you can [send data over AWS PrivateLink][10]. See [Datadog Sites][11] or file a ticket at [help.datadoghq.com][12] if you are unsure about your Datadog site.

### Using a proxy

If you are sending data to a Datadog site that is _NOT_ hosted on AWS, such as EU1, then you need to [send data over a proxy][13].

## Overhead

The Datadog Lambda Extension introduces a small amount of overhead to your Lambda function's cold starts (that is, the higher init duration), as the Extension needs to initialize. Datadog is continuously optimizing the Lambda extension performance and recommend always using the latest release.

You may notice an increase of your Lambda function's reported duration. This is because the Datadog Lambda Extension needs to flush data back to the Datadog API. Although the time spent by the extension flushing data is reported as part of the duration, it's done *after* AWS returns your function's response back to the client. In other words, the added duration does not slow down your Lambda function. See this [AWS blog post][14] for more technical information. To monitor your function's actual performance and exclude the duration added by the Datadog extension, use the metric `aws.lambda.enhanced.runtime_duration`.

By default, the Extension sends data back to Datadog at the end of each invocation. This avoids delays of data arrival for sporadic invocations from low-traffic applications, cron jobs, and manual tests. Once the Extension detects a steady and frequent invocation pattern (more than once per minute), it batches data from multiple invocations and flushes periodically at the beginning of the invocation when it's due. This means that *the busier your function is, the lower the average duration overhead per invocation*. 

For Lambda functions deployed in a region that is far from the Datadog site, for example, a Lambda function deployed in eu-west-1 reporting data to the US1 Datadog site, can observe a higher duration overhead due to the network latency.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/enhanced_lambda_metrics
[2]: /serverless/custom_metrics
[3]: /serverless/distributed_tracing
[4]: /serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[5]: /serverless/installation
[6]: /agent/logs/advanced_log_collection/
[7]: /tracing/guide/ignoring_apm_resources/
[8]: /tracing/setup_overview/configure_data_security/
[9]: /tracing/deployment_tracking/
[10]: /serverless/guide/extension_private_link/
[11]: /getting_started/site/
[12]: https://help.datadoghq.com/
[13]: /agent/proxy/
[14]: https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/
