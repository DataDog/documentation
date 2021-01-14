---
title: Serverless Trace Merging
kind: documentation
description: 'Augment AWS X-Ray Tracing with Datadog APM'
further_reading:
    - link: 'serverless'
      text: 'Serverless Monitoring with Datadog'
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions"  style="width:100%;" >}}

## Use cases

Serverless trace merging is required to see a single, connected trace when you configure both Datadog's tracing libraries (`dd-trace`) and AWS X-Ray tracing libraries in your application. If you aren't sure which tracing library to use, [read this page on choosing your tracing library][1].

There are two primary reasons for instrumenting both `dd-trace` and AWS X-Ray tracing libraries:
- In an AWS serverless environment, you are already tracing your Lambda functions with `dd-trace`, you require AWS X-Ray active tracing for AWS managed services such as API Gateway or Step Functions, and you want to visualize the `dd-trace` and AWS X-Ray spans in one single trace.
- In a hybrid environment with both Lambda functions and hosts, `dd-trace` instruments your hosts, AWS X-Ray instruments your Lambda functions, and you want to visualize connected traces for transactions across Lambda functions and hosts.

Note that this may result in higher usage bills. X-Ray spans will continue to be available in your merged traces after 2-5 minutes. In many cases, we recommend only using a single tracing library. Learn more about choosing your tracing library [here][1].

You can find setup instructions for each of the above use cases below:

- [Trace merging in a serverless-first environment](#trace-merging-in-a-serverless-first-environment)
- [Trace merging across AWS Lambda and hosts](#trace-merging-across-aws-lambda-and-hosts)

### Trace merging in an AWS serverless environment

AWS X-Ray provides both a backend AWS service (AWS X-Ray active tracing) and a set of client libraries. [Enabling the backend AWS service alone in the Lambda console][2] gives you `Initialization` and `Invocation` spans for your AWS Lambda functions. You can also enable AWS X-Ray active tracing from the API Gateway and Step Function consoles.

Both the AWS X-Ray SDK and Datadog APM client libraries (`dd-trace`) add medatada and spans for downstream calls by accessing the function directly. Assuming you are using `dd-trace` to trace at the handler level, your setup should be similar to the following:

1. You have enabled [AWS X-Ray active tracing][2] on your Lambda functions from the AWS Lambda console and our [AWS X-Ray integration within Datadog][3].
2. You have instrumented your Lambda functions with Datadog APM (`dd-trace`) by following the [installation instructions for your Lambda runtime][4].
3. Third-party libraries are automatically patched by `dd-trace`, so the AWS X-Ray client libraries do not need to be installed.
4. Set the `DD_MERGE_XRAY_TRACES` environment variable to `true` on your Lambda functions to merge the X-Ray and `dd-trace` traces (`DD_MERGE_DATADOG_XRAY_TRACES` in Ruby).

### Tracing across AWS Lambda and hosts

If you have installed Datadog's tracing libraries (`dd-trace`) on both your Lambda functions and hosts, your traces will automatically show you the complete picture of requests that cross infrastructure boundaries, whether it be AWS Lambda, containers, on-prem hosts, or managed services. 

If `dd-trace` is installed on your hosts with the Datadog Agent, and your serverless functions are traced with AWS X-Ray, your setup should be similar to the following:

1. You have installed the [AWS X-Ray integration][2] for tracing your Lambda functions, enabling both AWS X-Ray active tracing and installing the X-Ray client libraries.
2. You have installed the [Datadog Lambda Library for your Lambda runtime][4], and the `DD_TRACE_ENABLED` environment variable is set to `false`.
3. [Datadog APM][5] is configured on your hosts and container-based infrastructure.

Then, for X-Ray and Datadog APM traces to appear in the same flame graph, all services must have the same `env` tag.

**Note**: Distributed Tracing is supported for any runtime for your host or container-based applications. Your hosts and Lambda functions do not need to be in the same runtime. 

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="trace of a request from a host to a Lambda function" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/distributed_tracing/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[4]: /serverless/installation/
[5]: /tracing/send_traces/
