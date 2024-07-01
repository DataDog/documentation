---
"categories":
- aws
- cloud
- configuration & deployment
- log collection
- provisioning
"custom_kind": "integration"
"dependencies": []
"description": "Track key AWS App Runner metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_app_runner/"
"draft": false
"git_integration_title": "amazon_app_runner"
"has_logo": true
"integration_id": ""
"integration_title": "AWS App Runner"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_app_runner"
"public_title": "Datadog-AWS App Runner Integration"
"short_description": "Track key AWS App Runner metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS App Runner enables you to deploy an application from source code or a container image to AWS.

Enable this integration to see all your App Runner metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `AppRunner`is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS App Runner integration][3].

### Log collection
There are two types of logs you can integrate with Datadog from your applications managed by AWS App Runner. These logs are sent to CloudWatch under two different log groups. The first is the service log group that captures all lifecycle activity logs for your App Runner service such as application builds and deployments. The second is the application log group that contains log output from the code of your running application.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the App Runner service or application CloudWatch log group in the AWS console:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="cloudwatch log group" popup="true" style="width:70%;">}}
   Select the corresponding CloudWatch Log group, add a filter name (but feel free to leave the filter empty) and add the trigger:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="cloudwatch trigger" popup="true" style="width:70%;">}}
3. Repeat step 2 to add the additional log group.
4. Once done, go in your [Datadog Log section][5] to start exploring your logs!

### Event collection
AWS App Runner sends both service and operation status change events to EventBridge, which you can forward to Datadog for viewing in the [Event Stream][6]. To send these events to Datadog, do the following:

1. Create an [EventBridge API Destination for Datadog Events][7].
2. Create an EventBridge rule to act on AWS App Runner events (see [Handling App Runner events in EventBridge][8]). Choose the API Destination as the target.
3. Start viewing new status change events in the Datadog Event Stream.

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_app_runner" >}}


### Events

The AWS App Runner integration supports both service and operation status change events from EventBridge.

### Service Checks

The AWS App Runner integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][10].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-app-runner
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/event/stream
[7]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-partners.html#eb-api-destination-datadog
[8]: https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ev.html
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_app_runner/amazon_app_runner_metadata.csv
[10]: https://docs.datadoghq.com/help/

