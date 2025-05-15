---
title: HTTP Server Source
disable_toc: false
---

Use Observability Pipelines' HTTP/S Server source to collect HTTP client logs. Select and set up this source when you [set up a pipeline][1].

You can also [send AWS vended logs with Datadog Lambda Forwarder to Observability Pipelines](#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines).

## Prerequisites

{{% observability_pipelines/prerequisites/http_server %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/http_server %}}

## Send AWS vended logs with the Datadog Lambda Forwarder to Observability Pipelines

To send AWS vended logs to Observability Pipelines with the HTTP/S Server source:

- [Set up a pipeline with the HTTP/S Server source](#set-up-a-pipeline).
- [Deploy the Datadog Forwarder](#deploy-the-datadog-lambda-forwarder).

**Note**: This is available for Worker versions 2.51 or later.

### Set up a pipeline

1. Navigate to [Observability Pipelines][1].
1. Select the HTTP Server source:
    1. Select **None** in the dropdown menu for **Authorization strategy**.
    1. Select **JSON** in the dropdown menu for **Decoding**.
1. After you set up your [destinations][2] and [processors][3], click **Next: Install**.
1. On the **Install** page, enter the HTTP/S Server listener address, such as `0.0.0.0:9997`.
1. Follow the rest of the instructions on the page to install the Worker based on your platform.

### Deploy the Datadog Lambda Forwarder

Follow the [Datadog Forwarder CloudFormation installation instructions][4] to deploy the Datadog Forwarder. After you have filled in `DdApiKey` and selected the appropriate `DdSite`, go to the **Log Forwarding (Optional)** section. Enter the following information in that section to set up the Forwarder to send logs to Observability Pipelines:

1. In the **DdUrl** field, enter your load balancer address, which for this example is `9997`. **Note**: Datadog recommends fronting your Worker with a load balancer.
1. In the **DdPort** field, enter `80`.
1. If you want to encrypt traffic from the Datadog Forwarder to your Observability Pipelines Worker load balancer, you need to create an HTTPS listener and manage a certificate on your load balancer. Consult your cloud provider's documentation. For example in AWS, see [Create an HTTPS listener for your Application Load Balancer][5] for more information.
1. If you do not need to maintain encryption between the Datadog Forwarder and load balancer, select **true** in the **DdNoSsl** dropdown menu.
1. Click **Create stack**, and wait for the creation to complete.
1. You can find the installed forwarder Lambda function under the stack's **Resources** tab with the logical ID `Forwarder`.
1. [Set up triggers][6] for the installed Datadog Forwarder.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/
[3]: /observability_pipelines/processors/
[4]: /logs/guide/forwarder/?tab=cloudformation#installation
[5]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html
[6]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
