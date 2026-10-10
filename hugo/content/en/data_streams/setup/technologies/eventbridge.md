---
title: Data Streams Monitoring for Amazon EventBridge
---

Data Streams Monitoring supports Amazon EventBridge for AWS Lambda functions that use the Java, .NET, Go, Python, or Node.js runtimes. DSM automatically injects context into events that your functions publish and extracts context from events that your functions consume.

### Prerequisites

* [Datadog Lambda Extension v100 or later][1]
* The minimum Lambda layer or tracer version for your runtime. See [AWS Lambda prerequisites][3].

### Setting up Data Streams Monitoring

1. Set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on your producer and consumer Lambda functions.
1. On each consumer Lambda function, set the `DD_DSM_EXCHANGE_NAME` environment variable to the name of the event bus name.

For more information, see [Data Streams Monitoring for AWS Lambda][2].

[1]: https://github.com/DataDog/datadog-lambda-extension/releases
[2]: /data_streams/setup/serverless/aws_lambda
[3]: /data_streams/setup/serverless/aws_lambda#prerequisites
