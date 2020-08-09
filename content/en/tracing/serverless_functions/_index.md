---
title: Trace Serverless Functions
kind: documentation
description: 'Send traces from your serverless functions to Datadog'
further_reading:
    - link: 'serverless'
      text: 'Serverless Monitoring with Datadog'
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions"  style="width:100%;">}}

In hybrid architectures, serverless functions are a key part of your application. Including these functions in your distributed traces can be critical for detecting performance bottlenecks and service outages in your distributed systems.

## Choose your Tracing Library

Depending on your language and configuration, choose between setting up the Datadog Lambda Library or AWS X-Ray for your traces:

{{< partial name="apm/apm-serverless.html" >}}

## Organizing your Serverless infrastructure with tags

Any [tag][1] applied to your AWS Lambda function automatically becomes a new dimension on which your can slice and dice your traces.

Tags are especially powerful for consistency across the Datadog platform, which has [first-class support][2] for the `env` and `service` tags.

**Note**: If you are tracing with Datadog APM, set the parameter `DdFetchLambdaTags` to `true` on the forwarder CloudFormation stack to ensure your traces are tagged with the resource tags on the originating Lambda function. Lambda function resource tags are automatically surfaced to X-Ray traces in Datadog without any additional configuration.

### The env tag

Use `env` to separate out your staging, development, and production environments. This works for any kind of infrastructure, not just for your serverless functions. As an example, you could tag your production EU Lambda functions with `env:prod-eu`.

By default, AWS Lambda functions are tagged with `env:none` in Datadog. Add your own tag to override this.

### The service tag

Add the `service` [tag][3] in order to group related Lambda functions into a [service][4]. The [Service Map][3] and [Services List][5] use this tag to show relationships between services and the health of their monitors. Services are represented as individual nodes on the Service Map.

By default, each Lambda function is treated as its own `service`. Add your own tag to override this.

**Note**: The default behavior for new Datadog customers is for all Lambda functions to be grouped under the `aws.lambda` service, and represented as a single node on the Service map. Tag your functions by `service` to override this.

{{< img src="integrations/amazon_lambda/animated_service_map.gif" alt="animated service map of Lambda functions" >}}

## Augment AWS X-Ray Tracing with Datadog APM

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="Architecture diagram for tracing AWS Lambda with Datadog" >}}

You might also configure _both_ AWS X-Ray Tracing and Datadog APM, which can be useful, but will result in higher usage bills. If you are unsure whether to use Datadog APM or AWS X-Ray, contact [our support team][6] to discuss.

You can find setup instructions for this case when you want to do both below:

- [Tracing in a serverless-first environment](#tracing-in-a-serverless-first-environment)
- [Tracing across AWS Lambda and hosts](#tracing-across-aws-lambda-and-hosts)

#### Tracing in a serverless-first environment

AWS X-Ray is both a backend AWS service and a set of client libraries. The service gives you an Invocation span for your AWS Lambda functions and traces across Amazon API Gateways and message queues.

The client libraries trace your integrations in your code. If both of these are important to trace and visualize in your flame graphs, follow the below two steps.

1. Enable the [AWS X-Ray integration][7] for tracing your Lambda functions.
2. [Set up Datadog APM][8] on your Lambda functions.

#### Tracing across AWS Lambda and hosts

When applicable, Datadog merges AWS X-Ray traces with native Datadog APM traces. This means that your traces will show the complete picture of requests that cross infrastructure boundaries, whether it be AWS Lambda, containers, on-prem hosts, or managed services.

1. Enable the [AWS X-Ray integration][7] for tracing your Lambda functions.
2. [Set up Datadog APM][9] on your hosts and container-based infrastructure.

**Note**: For X-Ray and Datadog APM traces to appear in the same flame graph, all services must have the [same `env` tag](#the-env-tag).

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="trace of a request from a host to a Lambda function" >}}


[1]: /getting_stared/tagging/
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/visualization/services_map/#the-service-tag
[4]: /tracing/visualization/#services
[5]: /tracing/visualization/services_list/
[6]: /help
[7]: /tracing/serverless-functions/enable_aws_xray/
[8]: /serverless/
[9]: /tracing/send_traces/
