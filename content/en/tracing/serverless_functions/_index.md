---
title: Trace Serverless Functions
kind: documentation
description: 'Send traces from your Serverless Functions to Datadog'
further_reading:
    - link: 'serverless'
      text: 'Serverless Monitoring with Datadog'
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions"  style="width:100%;">}}

In hybrid architectures, Serverless functions can form an important core of requests your application processes. Including these functions in your Distributed Traces can be critical for detecting performance bottlenecks and service outages in your distributed systems.

## Choose your Tracing Library

Depending on your language and configuration, choose between using the Datadog Lambda Library or AWS X-Ray for your traces.

{{< img src="tracing/serverless_functions/LambdaLibraryXRay.png" alt="Lambda Library or AWS X-Ray"  style="width:100%;">}}

**Note:** If you are tracing across lambda functions and hosts, you will need to use **both** Datadog APM and AWS X-Ray.

## Enable Datadog APM

Instructions for enabling Datadog APM on your lambda functions are contained within the [Serverless][1] section of our documentation.  You will also need to [install the AWS integration][2].

## Enable AWS X-Ray

Instructions for enabling AWS X-Ray on your lambda functions are contained within the [AWS X-Ray Tracing][3] section of our documentation.  You will also need to [install the AWS integration][2].

## Augment AWS X-Ray Tracing with Datadog APM

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="architecture diagram for tracing AWS Lambda with Datadog" >}}

There are some scenarios in which AWS X-Ray Tracing will be used side-by-side with Datadog APM.  Note that this will have an impact on your bill, and if you are unsure whether to use Datadog APM or AWS X-Ray, please reach out to [our support team][4] to discuss, or read about the [differences](#choose-your-Tracing-Library)

### Tracing in a serverless-first environment

AWS X-ray is both a backend AWS service and a set of client libraries. The service gives you an Invocation span for your lambda functions and traces across api gateways and message queues.

The client libraries trace your integrations in your code. If both of these are important to trace and visualize in your flame graphs, follow the below two steps.

1. Enable the [AWS X-Ray integration][3] for tracing your Lambda functions.
2. [Set up Datadog APM][5] on your Lambda functions.

### Tracing across AWS Lambda and hosts

When applicable, Datadog merges AWS X-Ray traces with native Datadog APM traces. This means that your traces will show the complete picture of requests that cross infrastructure boundaries, whether it be AWS Lambda, containers, on-prem hosts, or managed services.

1. Enable the [AWS X-Ray integration][3] for tracing your Lambda functions.
2. [Set up Datadog APM][6] on your hosts and container-based infrastructure.

**Note**: For X-Ray and Datadog APM traces to appear in the same flame graph, all services must have the [same `env` tag](#the-env-tag).

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="trace of a request from a host to a Lambda function" >}}

### Organizing your Serverless infrastructure with tags

Any [tag][7] applied to your Lambda function automatically becomes a new dimension on which your can slice and dice your traces.

Tags are especially powerful for consistency across the Datadog platform, which has [first-class support][8] for the `env` and `service` tags.

**Note**: If you are tracing with Datadog APM, set the parameter `DdFetchLambdaTags` to `true` on the forwarder CloudFormation stack to ensure your traces are tagged with the resource tags on the originating Lambda function. Lambda function resource tags are automatically surfaced to X-Ray traces in Datadog without any additional configuration.

#### The env tag

Use `env` to separate out your staging, development, and production environments. This works for any kind of infrastructure, not just for your serverless functions. As an example, you could tag your production EU Lambda functions with `env:prod-eu`.

By default, Lambda functions are tagged with `env:none` in Datadog. Add your own tag to override this.

#### The service tag

Add the `service` [tag][9] in order to group related Lambda functions into a [service][10]. The [Service Map][9] and [Services List][11] use this tag to show relationships between services and the health of their monitors. Services are represented as individual nodes on the Service Map.

By default, each Lambda function is treated as its own `service`. Add your own tag to override this.

**Note**: The default behavior for new Datadog customers is for all Lambda functions to be grouped under the `aws.lambda` service, and represented as a single node on the Service map. Tag your functions by `service` to override this.

{{< img src="integrations/amazon_lambda/animated_service_map.gif" alt="animated service map of Lambda functions" >}}


[1]: /serverless/installation
[2]: integrations/amazon_web_services/#setup
[3]: /tracing/serverless-functions/enable_aws_xray/
[4]: /help
[5]: /serverless/
[6]: /tracing/send_traces/
[7]: /getting_stared/tagging/
[8]: /getting_started/tagging/unified_service_tagging
[9]: /tracing/visualization/services_map/#the-service-tag
[10]: /tracing/visualization/#services
[11]: /tracing/visualization/services_list/
