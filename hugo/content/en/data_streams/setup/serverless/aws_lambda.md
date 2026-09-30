---
title: Data Streams Monitoring for AWS Lambda
further_reading:
    - link: '/serverless/aws_lambda/instrumentation/'
      tag: 'Documentation'
      text: 'Instrument AWS Lambda applications'
    - link: '/serverless/aws_lambda/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring for AWS Lambda'
---

Data Streams Monitoring (DSM) supports AWS Lambda functions that produce messages to or consume messages from Amazon SQS, Amazon SNS, Amazon EventBridge, and Amazon Kinesis. DSM automatically injects context into outgoing messages and extracts context from incoming events. You can track end-to-end latency and throughput across your Lambda functions and messaging services without manual instrumentation.

### Supported runtimes and technologies

| Runtime  | Amazon SQS  | Amazon SNS  | Amazon EventBridge | Amazon Kinesis |
|----------|-------------|-------------|--------------------|----------------|
| Java     | {{< X >}}   | {{< X >}}   | {{< X >}}          | {{< X >}}      |
| .NET     | {{< X >}}   | {{< X >}}   | {{< X >}}          | {{< X >}}      |
| Go       | {{< X >}}   | {{< X >}}   | {{< X >}}          | {{< X >}}      |
| Python   | {{< X >}}   | {{< X >}}   | {{< X >}}          | {{< X >}}      |
| Node.js  | {{< X >}}   | {{< X >}}   | {{< X >}}          | {{< X >}}      |

Context injection and extraction are automatic for both producers and consumers.

### Prerequisites

* [Datadog Lambda Extension v100 or later][1]
* A Lambda function instrumented with Datadog. See [Instrument AWS Lambda applications][2].
* The following minimum version for your runtime:

| Runtime | Component                    | Minimum version |
|---------|------------------------------|-----------------|
| Java    | Datadog Java Lambda layer    | 28              |
| .NET    | Datadog .NET Lambda layer    | 26              |
| Go      | Go tracer (`dd-trace-go`)    | 2.10.0          |
| Python  | Datadog Python Lambda layer  | 8.129.0         |
| Node.js | Datadog Node.js Lambda layer | 12.143.0        |

### Setup

1. Instrument your Lambda function with Datadog. See [Instrument AWS Lambda applications][2].
1. Set the `DD_DATA_STREAMS_ENABLED` environment variable to `true` on each Lambda function that produces or consumes messages.
1. On each Lambda function that consumes from Amazon EventBridge, set the `DD_DSM_EXCHANGE_NAME` environment variable to the event bus name. DSM uses this value to identify the event bus in your pipeline.

The following examples configure an EventBridge consumer function. For functions that do not consume from EventBridge, omit `DD_DSM_EXCHANGE_NAME`.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

```yaml
functions:
  my-consumer:
    handler: handler.main
    environment:
      DD_DATA_STREAMS_ENABLED: "true"
      DD_DSM_EXCHANGE_NAME: "my-event-bus"
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Resources:
  MyConsumerFunction:
    Type: AWS::Serverless::Function
    Properties:
      Environment:
        Variables:
          DD_DATA_STREAMS_ENABLED: "true"
          DD_DSM_EXCHANGE_NAME: "my-event-bus"
```

{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-sqs-pipelines %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-lambda-extension/releases
[2]: /serverless/aws_lambda/instrumentation/
