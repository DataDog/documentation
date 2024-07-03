---
aliases:
- /ja/integrations/awsroute53/
categories:
- aws
- cloud
- log collection
- network
- notifications
custom_kind: インテグレーション
dependencies: []
description: Route 53 メトリクスを追跡し、健全性チェックを監視。
doc_link: https://docs.datadoghq.com/integrations/amazon_route53/
draft: false
git_integration_title: amazon_route53
has_logo: true
integration_id: ''
integration_title: Amazon Route 53
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_route53
public_title: Datadog-Amazon Route 53 Integration
short_description: Track Route53 metrics, and monitor health checks.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_route53/route53_graph.png" alt="route53 graph" popup="true">}}

## Overview

Amazon Route 53 provides DNS and traffic management along with availability and performance monitoring through health checks. You can view the health check information in Datadog to provide context around other metrics and events in your environments. Here's an example dashboard of Route 53's health check status graph:

For information about the rest of the AWS services, see the [AWS tile][1]

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `Route53` is enabled under the `Metric Collection` tab.
2. Add those permissions to your [Datadog IAM policy][3] in order to collect Amazon Route 53 metrics:

    - `route53:listHealthChecks`: List available health checks.
    - `route53:listTagsForResources`: Add custom tags on Route53 CloudWatch metrics.

    For more information, see the [Route53 policies][4] on the AWS website.

3. Install the [Datadog - Amazon Route53 integration][5].

**Note**: To get Amazon Route 53 metrics using CloudWatch, you must choose US East (N. Virginia) as the region. Amazon Route 53 metrics are not available if you select any other region. See [Monitoring health check status and getting notifications][6] for more information.

### Log collection

Configure Amazon Route 53 to log information about the queries that Route 53 receives, such as the following:

- The domain or subdomain that was requested
- The date and time of the request
- The DNS record type (such as A or AAAA)
- The Route 53 edge location that responded to the DNS query
- The DNS response code, such as NoError or ServFail
- Resolver Query logs for you VPC

#### Enable Route53 DNS query logging

1. Go to your Route 53 AWS console and click **Hosted zones**. 
2. Click the radio button for the hosted zone you want to configure logs for.
3. Click **View Details**.
4. Click **Configure query logging**.
5. Select the CloudWatch log group or create a new one to send the logs to. Make sure “route53” is included in the log group name.

#### Enable Route53 resolver query logging

1. In the Route 53 settings pane on the left, select **Query Logging** under Resolver.
2. Click **Configure Query Logging**. 
3. Enter a name for your Resolver query. 
4. Select the CloudWatch Logs group you want the Resolver to send the query logs to. Make sure “route53” is included in the log group name.
5. Add the VPCs that you want to log Resolver queries for. 
6. Optionally, add tags. 
7. Click **Configure query logging**.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][7] in your AWS account.
2. Once set up, go to the Datadog Forwarder Lambda function. In the Function Overview section, click **Add Trigger**. 
3. Select the **CloudWatch Logs** trigger for the Trigger Configuration. 
4. Select the CloudWatch log group that contains your Route53 logs.
5. Enter a name for the filter.
6. Click **Add** to add the trigger to your Lambda.

Go to the [Log Explorer][8] to start exploring your logs.

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][9].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_route53" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The Amazon Route 53 integration does not include any events.

### Service Checks

The Amazon Route 53 integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][11].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/auth-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-route53
[6]: http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-monitor-view-status.html#monitoring-health-checks
[7]: https://docs.datadoghq.com/ja/logs/guide/forwarder/
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_route53/amazon_route53_metadata.csv
[11]: https://docs.datadoghq.com/ja/help/