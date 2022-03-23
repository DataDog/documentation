---
title: Serverless
kind: documentation
aliases:
  - /graphing/infrastructure/cloudfunctions
  - /graphing/infrastructure/serverless_functions
  - /graphing/infrastructure/serverless/
  - /infrastructure/serverless/
  - /tracing/serverless_functions/datadog_apm
  - /integrations/amazon_lambda/docs.datadoghq.com/serverless/
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Serverless"
  tag: "Release Notes"
  text: "Check out the latest Serverless releases! (App login required)."
- link: "https://www.datadoghq.com/state-of-serverless"
  tag: "Blog"
  text: "The State of Serverless"
- link: "/integrations/amazon_xray/"
  tag: "Documentation"
  text: "AWS X-Ray Integration"
- link: "/integrations/amazon_lambda/"
  tag: "Documentation"
  text: "AWS Lambda Integration"
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
---

{{< vimeo 543362476 >}}

<br/>
 
<div class="alert alert-info">Make sure to check out discussions going on in the <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> channel in the <a href="https://chat.datadoghq.com/">Datadog Slack community</a>.</div>

[Datadog Serverless Monitoring][1] provides full visibility into all of the managed services that power your serverless applications by bringing together real-time metrics, logs and traces from your serverless compute as well as related fully-managed APIs, queues, streams and data stores.

The following section outlines Datadog's solution for monitoring AWS serverless applications and Lambda functions. You can also learn more about support for monitoring [Azure serverless][2] and [Google serverless][3] applications.

## Quick start

If you are new to Datadog, you can get started by [signing up for a Datadog account][4], then following the instructions for [installing Datadog's Lambda Extension][5]. These steps configure your Lambda functions to send real-time metrics, logs, and traces to Datadog:

{{< img src="serverless/aws-fully-managed-services-serverless-monitoring-hero.png" alt="Datadog Serverless Monitoring"  style="width:100%;" >}}

## Installation instructions

For more detailed installation instructions, select the Lambda runtime below for instructions to instrument your serverless application:

{{< partial name="serverless/getting-started-languages.html" >}}

## Explore Datadog Serverless Monitoring

### Monitor your entire serverless stack in the Serverless view

The Serverless view enables you to correlate high-level metrics from AWS resources with those of Lambda functions, so you can quickly spot issues and start your investigation. 

By default, the Serverless view groups your serverless resources by service to help you visualize how each part of your application is performing. For each service, you can see the functions that belong to it, along with the resources (Amazon API Gateway, SNS, SQS, DynamoDB, S3, EventBridge, Kinesis) that invoked them.

{{< img src="serverless/serverless-view-hero.jpeg" alt="Datadog Serverless Monitoring"  style="width:100%;" >}}

### Resolve AWS Lambda function failures faster by monitoring invocation payloads

Datadog automatically collects function requests and responses for all of your function invocations, providing key information that can help troubleshoot issues. For example, if you’re notified that one of your Lambda functions is experiencing failures, you can analyze relevant request payloads to check for missing parameters, mistyped resource addresses, or other misconfigurations that may be behind the failures.

By identifying misconfigurations in failing requests, you can more easily reproduce issues in your development environment—and then run tests to verify your bug fixes.

{{< img src="serverless/lambda_payload_hero.jpeg" alt="Datadog Serverless Monitoring"  style="width:100%;" >}}

### Real-time metrics for alerting on issues across your Lambda function environment

Datadog's enhanced Lambda metrics, which appear in Datadog with the prefix `aws.lambda.enhanced`, are available at second granularity and in near real time. You can use enhanced Lambda metrics for alerts or SLOs on cold starts, estimated AWS costs, timeouts, out-of-memory errors, and memory usage across all of your Lambda functions. This enables you to view performance issues in your serverless environments as they occur and troubleshoot without delay. 

{{< img src="serverless/serverless_enhanced_metrics.jpeg" alt="Datadog Serverless Monitoring"  style="width:100%;" >}}

### Monitor serverless configuration changes with deployment tracking

Easily correlate serverless code, configuration, and deployment changes with metrics, traces, and logs from your functions for real-time insight into how these changes may affect the health and performance of your applications.

{{< img src="serverless/serverless_deployment_tracking.jpeg" alt="Datadog Serverless Monitoring"  style="width:100%;" >}}

## Other serverless clouds

### Azure App Service

The Datadog extension for Azure App Service provides tracing capabilities for Azure Web Apps. 

Use the [Azure App Service view][6] to:

- Quickly identify apps with high latency or errors

- Track the utilization of your Web Apps, Function Apps, and App Service Plans

- Get insights into the costs of your App Service Plans by visualizing the number of active instances and seeing which are running apps that are submitting traces or logs to Datadog

- Map the apps running on your App Service Plans to identify apps that may be impacting costs or performance

The Datadog extension for Azure App Service provides tracing capabilities for Azure Web Apps. For more information about setting up tracing in Azure, see the [Azure App Service Extension documentation][7].

### Google Cloud Functions

Google Cloud Functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions. To monitor serverless functions running on Google Cloud Platform, enable the [Google Cloud Platform integration][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /serverless/#azure-app-service
[3]: /serverless/#google-cloud-functions
[4]: https://app.datadoghq.com/signup/
[5]: https://app.datadoghq.com/signup/agent#lambda
[6]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[7]: /infrastructure/serverless/azure_app_services/#overview
[8]: /integrations/google_cloud_platform/
