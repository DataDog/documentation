---
title: Deeper Visibility into Resources Invoking Lambda Functions
kind: documentation
---

{{< img src="serverless/serverless-view.png" alt="Serverless View" >}}

By default, the Serverless view groups your serverless resources by service to help you easily visualize how each part of your application is performing. For each service, you see the functions that belong to it, along with the resources (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis) that invoked them. 

While grouping by service is the default, you can also group your resources by AWS CloudFormation stack name, as well as any other tags you've configured (such as team, project, or environment).

## Setup

To instrument your Lambda functions for the first time, follow the [serverless installation instructions][3].

Managed resources are automatically connected to your AWS Lambda functions if:
- your functions are written in Node.js or Python Lambda runtimes
- [APM with Datadog's tracing libraries][2] (`dd-trace`) is configured on your functions
- [APM with Datadog's X-Ray integration][2] is configured on your functions, and you've [configured Datadog's Lambda Library to enrich AWS X-Ray segments][4]
- the managed resource invoking your function is one of the following: API Gateway, SQS, SNS, EventBridge, Kinesis, DynamoDB, S3.
- your functions are instrumented with a recent version of Datadog's Lambda Library (>= `v3.46.0` for Node, >= `v28` for Python)

[1]: /logs/explorer/saved_views
[2]: /serverless/distributed_tracing#choose-your-tracing-library
[3]: /serverless/installation
[4]: /integrations/amazon_xray/#enriching-xray-segments-with-datadog-libraries
