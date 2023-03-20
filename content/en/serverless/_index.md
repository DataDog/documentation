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
- link: "https://www.datadoghq.com/blog/azure-container-apps/"
  tag: "Blog"
  text: "Monitor Azure Container Apps with Datadog"
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/543362476/rendition/1080p/file.mp4?loc=external&signature=4927d13b131aea1e3b4f77efca5af49bb509f5e7f1d6ca06a5267ba02a8c194a" poster="/images/poster/serverless.png" >}}

<br/>
 
<div class="alert alert-info">Make sure to check out discussions going on in the <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> channel in the <a href="https://chat.datadoghq.com/">Datadog Slack community</a>.</div>

[Datadog Serverless Monitoring][1] provides full visibility into all of the managed services that power your serverless applications by bringing together real-time metrics, logs and traces from your serverless compute as well as related fully-managed APIs, queues, streams and data stores.

Datadog provides solutions for monitoring [AWS Lambda](#aws-lambda), [Azure App Service](#azure-app-service), [Azure Container Apps](#azure-container-apps), and [Google Cloud Run](#google-cloud-run).

### AWS Lambda

[Serverless Monitoring for AWS Lambda][2] enables you to correlate high-level metrics from AWS resources with those of Lambda functions, so you can quickly spot issues and start your investigation.

[Enhanced Lambda metrics][3], which appear in Datadog with the prefix `aws.lambda.enhanced`, are available at second granularity and in near real time. You can use enhanced Lambda metrics for alerts or SLOs on cold starts, estimated AWS costs, timeouts, out-of-memory errors, and memory usage across all of your Lambda functions.

With [Distributed Tracing][4], you can connect your serverless traces to metrics for a context-rich picture of your application's performance. The Datadog Python, Node.js, Ruby, Go, Java, and .NET tracing libraries support distributed tracing for AWS Lambda.

[Deployment Tracking][5] helps you to correlate serverless code, configuration, and deployment changes with metrics, traces, and logs from your functions for real-time insight into how these changes may affect the health and performance of your applications.

### Azure App Service

The [Datadog extension for Azure App Service][6] provides tracing capabilities for Azure Web Apps. 

Use the [Azure App Service view][7] to:

- Quickly identify apps with high latency or errors

- Track the utilization of your Web Apps, Function Apps, and App Service Plans

- Get insights into the costs of your App Service Plans by visualizing the number of active instances and seeing which are running apps that are submitting traces or logs to Datadog

- Map the apps running on your App Service Plans to identify apps that may be impacting costs or performance

The Datadog extension for Azure App Service provides tracing capabilities for Azure Web Apps. For more information about setting up tracing in Azure, see [Azure App Service][6].

### Azure Container Apps

Azure Container Apps is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Container Apps through the [Azure integration][8]. 

Datadog also provides a solution, now in beta, for [instrumenting your Container Apps applications][9] with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

### Google Cloud Run

Google Cloud Run is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions. To monitor serverless functions running on Google Cloud Platform, enable the [Google Cloud Platform integration][10].

Datadog also provides a solution, now in public beta, for [instrumenting your Cloud Run applications][11] with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /serverless/aws_lambda
[3]: /serverless/enhanced_lambda_metrics
[4]: /serverless/distributed_tracing
[5]: /serverless/deployment_tracking
[6]: /infrastructure/serverless/azure_app_services/#overview
[7]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[8]: /integrations/azure/#log-collection
[9]: /serverless/azure_container_apps
[10]: /integrations/google_cloud_platform/
[11]: /serverless/google_cloud_run
