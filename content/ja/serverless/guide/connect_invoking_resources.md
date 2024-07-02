---
title: Deeper Visibility into Resources Invoking Lambda Functions
kind: guide
aliases:
    - /serverless/troubleshooting/connect_invoking_resources/
---

By default, the [Serverless View][4] groups your serverless resources by service to help you visualize how each part of your application is performing. For each service, you see the functions that belong to it, along with the resources (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis) that invoked them. 

While grouping by service is the default, you can also group your resources by AWS CloudFormation stack name, as well as any other tags you've configured (such as team, project, or environment).

## Setup

To instrument your Lambda functions for the first time, follow the [serverless installation instructions][1].

Managed resources are automatically connected to your AWS Lambda functions if all of the following are true:
- Your functions are written in Node.js or Python Lambda runtimes.
- [APM with Datadog's X-Ray integration][2] is configured on your functions and [configured Datadog's Lambda Library is configured to enrich AWS X-Ray segments][3], **OR** [APM with Datadog's tracing libraries][2] (`dd-trace`) is configured on your functions.
- The managed resource invoking your function is one of the following: API Gateway, SQS, SNS, EventBridge, Kinesis, DynamoDB, S3.
- Your functions are instrumented with a recent version of Datadog's Lambda Library (>= `v3.46.0` for Node, >= `v28` for Python).

[1]: /serverless/installation
[2]: /serverless/distributed_tracing#choose-your-tracing-library
[3]: /integrations/amazon_xray/#enriching-xray-segments-with-datadog-libraries
[4]: https://app.datadoghq.com/functions