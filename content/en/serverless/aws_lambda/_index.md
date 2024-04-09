---
title: Serverless Monitoring for AWS Lambda
kind: documentation
further_reading:
- link: '/serverless/configuration/'
  tag: 'Documentation'
  text: 'Configure Serverless monitoring'
- link: "/integrations/amazon_lambda/"
  tag: "Documentation"
  text: "AWS Lambda integration"
- link: "https://www.datadoghq.com/blog/monitoring-lambda-containers/"
  tag: "Blog"
  text: "Monitor AWS Lambda functions deployed using container images"
- link: "https://www.datadoghq.com/blog/manage-serverless-logs-datadog/"
  tag: "Blog"
  text: "Best practices for collecting and managing serverless logs"
- link: "https://www.datadoghq.com/blog/aws-serverless-application-design/"
  tag: "Blog"
  text: "Designing production-ready AWS serverless applications"
- link: "https://www.datadoghq.com/blog/well-architected-serverless-applications-best-practices/"
  tag: "Blog"
  text: "Best practices for building serverless applications that follow AWS's Well-Architected Framework"
- link: "https://www.datadoghq.com/blog/aws-lambda-functions-ephemeral-storage-monitoring/"
  tag: "Blog"
  text: "Monitor your AWS Lambda functions' ephemeral storage usage"
- link: "https://www.datadoghq.com/blog/serverless-cold-start-traces/"
  tag: "Blog"
  text: "Understand serverless function performance with Cold Start Tracing"
---

Datadog Serverless Monitoring for AWS Lambda gives you visibility into your Lambda functions.

To get started, follow the [installation instructions][1] to collect metrics, traces, and logs from your serverless applications.

## How it works

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecting Enhanced Metrics from AWS Lambda" >}}

Datadog Serverless Monitoring makes use of a runtime-specific Datadog Lambda Library, in conjunction with the Datadog Lambda extension, to send telemetry from your Lambda functions.

The Datadog Lambda extension collects logs through CloudWatch, in addition to traces, enhanced metrics, and custom metrics from the Datadog Lambda Library.

## Usage

The following pages describe how to install and configure Serverless Monitoring for AWS Lambda—including how to use metrics, traces, and logs for full visibility.

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/installation" >}}<u>Installation</u>: Install Serverless Monitoring for AWS Lambda.{{< /nextlink >}}
    {{< nextlink href="/serverless/enhanced_lambda_metrics" >}}<u>Lambda Metrics</u>: Read more about enhanced metrics and learn how to submit custom metrics.{{< /nextlink >}}
    {{< nextlink href="/serverless/distributed_tracing" >}}<u>Distributed Tracing</u>: Use APM and Distributed Tracing for a context-rich picture of your application's performance.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/logs" >}}
    <u>Log Collection</u>: Read more about log collection, how to filter logs, and how to connect logs and traces.{{< /nextlink >}}
{{< /whatsnext >}}

### Monitor your entire serverless stack in the Serverless view

The Serverless view enables you to correlate high-level metrics from AWS resources with those of Lambda functions, so you can quickly spot issues and start your investigation.

By default, the Serverless view groups your serverless resources by service to help you visualize how each part of your application is performing. For each service, you can see the functions that belong to it, along with the resources (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis) that invoked them.

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Resolve AWS Lambda function failures faster by monitoring invocation payloads

Datadog automatically collects function requests and responses for all of your function invocations, providing key information that can help troubleshoot issues. For example, if you're notified that one of your Lambda functions is experiencing failures, you can analyze relevant request payloads to check for missing parameters, mistyped resource addresses, or other misconfigurations that may be behind the failures.

By identifying misconfigurations in failing requests, you can more easily reproduce issues in your development environment—and then run tests to verify your bug fixes.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Real-time metrics for alerting on issues across your Lambda function environment

Datadog's enhanced Lambda metrics, which appear in Datadog with the prefix `aws.lambda.enhanced`, are available at second granularity and in near real time. You can use enhanced Lambda metrics for alerts or SLOs on cold starts, estimated AWS costs, timeouts, out-of-memory errors, and memory usage across all of your Lambda functions. This enables you to view performance issues in your serverless environments as they occur and troubleshoot without delay.

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

### Monitor serverless configuration changes with deployment tracking

Easily correlate serverless code, configuration, and deployment changes with metrics, traces, and logs from your functions for real-time insight into how these changes may affect the health and performance of your applications.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog Serverless Monitoring" style="width:100%;" >}}

## Additional capabilities

{{< whatsnext desc=" ">}}
    {{< nextlink href="/serverless/aws_lambda/profiling" >}}<u>Continuous Profiler</u>: Enable Datadog's Continuous Profiler to find the exact line of code in your Lambda function that is causing bottlenecks.{{< /nextlink >}}
    {{< nextlink href="/serverless/aws_lambda/securing_functions" >}}<u>Secure Functions</u>: Use Application Security Management (ASM) to manage threats to your functions.{{< /nextlink >}}
    {{< nextlink href="/serverless/deployment_tracking" >}}<u>Deployment Tracking</u>: Track deployments to see when a new version of code or a configuration change causes a regression.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/installation
