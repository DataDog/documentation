---
aliases:
- /serverless/datadog_lambda_library/extension
dependencies:
- "https://github.com/DataDog/datadog-lambda-extension/blob/main/README.md"
kind: documentation
title: Datadog Lambda Extension
---
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-agent/blob/master/LICENSE)

**Note:** This repository contains release notes, issues, instructions, and scripts related to the Datadog Lambda Extension. The extension is a special build of the Datadog Agent. The source code can be found [here](https://github.com/DataDog/datadog-agent/tree/main/cmd/serverless). 

The Datadog Lambda Extension is an AWS Lambda Extension that supports submitting custom metrics, traces, and logs asynchronously while your AWS Lambda function executes.

## Installation

Follow the [installation instructions](https://docs.datadoghq.com/serverless/installation), and view your function's enhanced metrics, traces and logs in Datadog.

## Upgrading
To upgrade, update the Datadog Extension version in your Lambda layer configurations or Dockerfile (for Lambda functions deployed as container images). View the latest [releases](https://github.com/DataDog/datadog-lambda-extension/releases) and corresponding changelogs before upgrading.

## Configurations

Follow the [configuration instructions](https://docs.datadoghq.com/serverless/configuration) to tag your telemetry, capture request/response payloads, filter or scrub sensitive information from logs or traces, and more.

## Overhead

The Datadog Lambda Extension introduces a small amount of overhead to your Lambda function's cold starts (that is, the higher init duration), as the Extension needs to initialize. Datadog is continuously optimizing the Lambda extension performance and recommend always using the latest release.

You may notice an increase of your Lambda function's reported duration (`aws.lambda.duration` or `aws.lambda.enhanced.duration`). This is because the Datadog Lambda Extension needs to flush data back to the Datadog API. Although the time spent by the extension flushing data is reported as part of the duration, it's done *after* AWS returns your function's response back to the client. In other words, the added duration *does not slow down* your Lambda function. See this [AWS blog post](https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/) for more technical information. To monitor your function's actual performance and exclude the duration added by the Datadog extension, use the metric `aws.lambda.enhanced.runtime_duration`.

By default, the Extension flushes data back to Datadog at the end of each invocation (for example, cold starts always trigger flushing). This avoids delays of data arrival for sporadic invocations from low-traffic applications, cron jobs, and manual tests. Once the Extension detects a steady and frequent invocation pattern (more than once per minute), it batches data from multiple invocations and flushes periodically at the beginning of the invocation when it's due. This means that *the busier your function is, the lower the average duration overhead per invocation*. In other words, for low-traffic applications, the duration overhead would be noticeable while the associated cost overhead is typically negligible; for high-traffic applications, the duration overhead would be barely noticeable. To understand the duration overhead that is used by the Datadog extension to flush data, use the metric `aws.lambda.post_runtime_extensions_duration` or `aws.lambda.enhanced.post_runtime_duration`. 

For Lambda functions deployed in a region that is far from the Datadog site, for example, a Lambda function deployed in eu-west-1 reporting data to the US1 Datadog site, can observe a higher duration (and therefore, cost) overhead due to the network latency. To reduce the overhead, configure the extension to flush data less often, such as every minute `DD_SERVERLESS_FLUSH_STRATEGY=periodically,60000`.

In some rare cases where a very short timeout is configured (the definition of what is _short_ depends on the runtime), it is possible to notice that the Lambda handler code may not get run on subsequent invocations. This is a possibility when the first invocation times out, requiring the `INIT` [phase](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html#runtimes-extensions-api-lifecycle) to be started again in the next invocation. In the subsequent invocation, should the function time out before the `INIT` phase is completed, the function is terminated by Lambda and the handler code is not run. You can identify these failures using `INIT_REPORT` [logs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html#runtimes-lifecycle-init-errors). Datadog recommends increasing the timeout for a Lambda function where this has been identified.

## Opening Issues

If you encounter a bug with this package, we want to hear about it. Before opening a new issue, search the existing issues to avoid duplicates.

When opening an issue, include the Extension version, and stack trace if available. In addition, include the steps to reproduce when appropriate.

You can also open an issue for a feature request.

## Contributing

If you find an issue with this package and have a fix, please feel free to open a pull request following the [procedures](https://github.com/DataDog/datadog-agent/blob/master/docs/dev/contributing.md).

## Testing

To test a change to the Datadog Serverless-Init in Google Cloud Run:

1. Clone this repo and [the Datadog Agent repo](https://github.com/DataDog/datadog-agent) into the same parent directory.
2. Run `VERSION=0 SERVERLESS_INIT=true ./scripts/build_binary_and_layer_dockerized.sh` in this repo to build the serverless-init binary.
3. Create a "Hello World" serverless application [as described here](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/go).
4. Follow [the public instructions](https://docs.datadoghq.com/serverless/google_cloud_run) to add the Serverless-Init to your serverless application.
5. Copy the binary file that you built to the same location as your Dockerfile:
```
cp datadog-lambda-extension/.layers/datadog_extension-amd64/extensions/datadog-agent ~/hello-world-app/datadog-init
```
6. In your Dockerfile, replace
```
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
```
with
```
COPY datadog-init /app/datadog-init
```

Deploy your serverless application, and it will run with a version of the Serverless-Init that includes your changes to the code.

## Community

For product feedback and questions, join the `#serverless` channel in the [Datadog community on Slack](https://chat.datadoghq.com/).

## License

Unless explicitly stated otherwise all files in this repository are licensed under the Apache License Version 2.0.

This product includes software developed at Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.
