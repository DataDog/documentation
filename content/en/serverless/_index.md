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
- link: "/serverless/installation/"
  tag: "Documentation"
  text: "Installing Serverless monitoring"
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
- link: "https://www.datadoghq.com/blog/azure-container-apps/"
  tag: "Blog"
  text: "Monitor Azure Container Apps with Datadog"
---

{{< vimeo 543362476 >}}

<br/>
 
<div class="alert alert-info">Make sure to check out discussions going on in the <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> channel in the <a href="https://chat.datadoghq.com/">Datadog Slack community</a>.</div>

[Datadog Serverless Monitoring][1] provides full visibility into all of the managed services that power your serverless applications by bringing together real-time metrics, logs and traces from your serverless compute as well as related fully-managed APIs, queues, streams and data stores.

The following section outlines Datadog's solution for monitoring AWS serverless applications and Lambda functions. You can also learn more about support for monitoring [Azure serverless][2] and [Google serverless][3] applications.

Datadog provides solutions for monitoring AWS Lambda, Azure App Service, Azure Container Apps, and Google Cloud Run.

### AWS Lambda

Serverless Monitoring enables you to correlate high-level metrics from AWS resources with those of Lambda functions, so you can quickly spot issues and start your investigation.

Enhanced Lambda metrics, which appear in Datadog with the prefix `aws.lambda.enhanced`, are available at second granularity and in near real time. You can use enhanced Lambda metrics for alerts or SLOs on cold starts, estimated AWS costs, timeouts, out-of-memory errors, and memory usage across all of your Lambda functions.

Deployment tracking helps you to correlate serverless code, configuration, and deployment changes with metrics, traces, and logs from your functions for real-time insight into how these changes may affect the health and performance of your applications.

### Azure App Service

The Datadog extension for Azure App Service provides tracing capabilities for Azure Web Apps. 

Use the [Azure App Service view][4] to:

- Quickly identify apps with high latency or errors

- Track the utilization of your Web Apps, Function Apps, and App Service Plans

- Get insights into the costs of your App Service Plans by visualizing the number of active instances and seeing which are running apps that are submitting traces or logs to Datadog

- Map the apps running on your App Service Plans to identify apps that may be impacting costs or performance

The Datadog extension for Azure App Service provides tracing capabilities for Azure Web Apps. For more information about setting up tracing in Azure, see the [Azure App Service Extension documentation][5].

### Azure Container Apps

tk

### Google Cloud Functions

Google Cloud Functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions. To monitor serverless functions running on Google Cloud Platform, enable the [Google Cloud Platform integration][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /serverless/#azure-app-service
[3]: /serverless/#google-cloud-functions
[4]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[5]: /infrastructure/serverless/azure_app_services/#overview
[6]: /integrations/google_cloud_platform/
