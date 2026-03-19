---
title: AWS Integration and CloudWatch FAQ

aliases:
  - "/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog"
  - /integrations/faq/aws-integration-and-cloudwatch-faq
---

### Can I collect AWS custom metrics through the integration?

Yes. Enable **Collect Custom Metrics** under the **Metric Collection** tab on the [AWS integration page][1].

### How do I collect metrics from a service for which Datadog doesn't have an official integration?

AWS metrics coming from an `AWS/<namespace>` for which there is no official integration are also brought in under the custom namespace when the `Collect custom metrics` option is enabled. You can filter these metrics out and only keep the metrics you want by using the filter string under custom namespace with the [Set an AWS tag filter][2] API.

### How does the Datadog AWS integration use CloudWatch?

Datadog uses the CloudWatch monitoring APIs to monitor your AWS resources. Our main use of these APIs is to gather raw metrics data through the `GetMetricData` endpoint.

Other APIs are used to enrich metrics data. Some examples include:

 * Gathering custom tags to add to metrics

 * Gathering information about the status or health of resources, such as automuting

 * Gathering log streams

### How many API requests are made and how can I monitor my CloudWatch usage?

Datadog gathers the available metrics every 10 minutes for each AWS sub-integration you have installed. If you have a large number of AWS resources for a particular sub-integration (SQS, ELB, DynamoDB, AWS Custom metrics), this can impact your AWS CloudWatch bill.

You can monitor your CloudWatch API usage using the [AWS Billing integration][3].

### How can I reduce the delay of receiving my CloudWatch metrics to Datadog?

By default, Datadog collects AWS metrics every 10 minutes. See [Cloud Metric Delay][4] for more information. If you need to reduce the latency, contact [Datadog support][5] for assistance. To get CloudWatch metrics into Datadog faster with a 2-3 minute latency we recommend using the [Amazon CloudWatch Metric Streams and Amazon Data Firehose][6]. 


### Why am I only seeing the average values of my custom AWS/Cloudwatch metrics?

By default, Datadog only collects the average values of your custom AWS/Cloudwatch metrics. However, additional values are available by contacting [Datadog support][5]. These include (where available) the min, max, sum, and sample count.

### Is there a discrepancy between my data in CloudWatch and Datadog?

Some important distinctions to be aware of:

- Datadog collects a single CloudWatch statistic for the equivalent CloudWatch metric in Datadog. Comparing the `Sum` in CloudWatch to the `Average` in Datadog results in discrepancies. For some CloudWatch metrics, multiple statistics can be useful and Datadog creates different metric names for the same CloudWatch metric with different statistics. For example, `aws.elb.latency` and `aws.elb.latency.maximum`.
- In AWS for counters, a graph set to `sum` `1 minute` shows the total number of occurrences in one minute leading up to that point (the rate per one minute). Datadog is displaying the raw data from AWS normalized to per second values, regardless of the timeframe selected in AWS. Therefore, you might see a lower value in Datadog.
- Overall, `min`, `max`, and `avg` have different meanings within AWS. AWS distinctly collects average latency, minimum latency, and maximum latency. When pulling metrics from AWS CloudWatch, Datadog only receives the average latency as a single timeseries per ELB. Within Datadog, when you select `min`, `max`, or `avg`, you are controlling how multiple timeseries are combined. For example, requesting `system.cpu.idle` without any filter returns one series for each host reporting that metric. Datadog combines these timeseries using [space aggregation][7]. Otherwise, if you requested `system.cpu.idle` from a single host, no aggregation is necessary and switching between `avg` and `max` yields the same result.

### How do I adjust my data on Datadog to match the data displayed in CloudWatch?

AWS CloudWatch reports metrics at one-minute granularity normalized to per-minute data. Datadog reports metrics at one-minute granularity normalized to per-second data. To adjust the data in Datadog, multiply by 60.  Also make sure the statistic of the metric is the same. For example, the metric `IntegrationLatency` fetches a number of different statistics": Average, Maximum, Minimum, as well as percentiles. In Datadog, these statistics are each represented as their own metrics:
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### Will a rollup() adjust my data?

Rollups don't display similar results. For a rollup call of `rollup(sum, 60)`, the server groups all data points in minute bins and returns the sum of each bin as a datapoint. However, the granularity of AWS metrics is one minute, so there is only one datapoint per bin leading to no change.

### Why don't I see metrics for a new AWS service I enabled?

If you recently enabled a new AWS service integration but are not seeing metrics in Datadog, verify the following:

1. **IAM permissions**: Confirm that the IAM role or IAM user associated with the Datadog integration includes the permissions required by the service. See the individual [AWS integration pages][8] for service-specific permission requirements.
2. **Region**: Confirm that the AWS region where your resources are deployed is enabled in the [AWS integration page][1].
3. **CloudWatch availability**: Open the CloudWatch console in AWS and confirm the expected metrics exist. Some services do not emit CloudWatch metrics until specific conditions are met (for example, an ELB with no attached instances does not emit metrics).
4. **Polling delay**: API polling collects metrics approximately every 10 minutes. If you use [CloudWatch Metric Streams][6], expect a 2-3 minute delay. Allow at least one polling cycle before investigating further.

### What is the difference between API polling and CloudWatch Metric Streams?

| | API polling (default) | CloudWatch Metric Streams |
|---|---|---|
| **Typical latency** | ~10 minutes | 2-3 minutes |
| **Setup** | Included with the AWS integration | Requires separate setup with [Amazon Data Firehose][6] |
| **AWS cost** | CloudWatch `GetMetricData` API calls | CloudWatch Metric Streams and Firehose delivery charges |
| **Coverage** | All standard CloudWatch namespaces; custom namespaces require **Collect Custom Metrics** to be enabled | Most CloudWatch namespaces (some exclusions apply) |
| **Custom namespaces** | Supported with **Collect Custom Metrics** enabled | Supported by including the namespace in the stream configuration |

For more detail, see [Cloud Metric Delay][4] and the [CloudWatch Metric Streams guide][6].

### Why do my metric values look doubled after enabling Metric Streams?

When transitioning from API polling to CloudWatch Metric Streams, there is an overlap period where both collection methods send data for the same metrics. This can cause metric values to appear doubled in Datadog.

Datadog automatically detects streamed namespaces and stops polling them, so you do not need to manually disable API polling. Leave your configuration settings in the [AWS integration page][1] unchanged, as Datadog continues to use API polling to collect custom tags, metadata, and metrics that cannot be sent through Metric Streams (such as `aws.s3.bucket_size_bytes` and `aws.billing.estimated_charges`).

Detection typically takes up to five minutes, but the overlap period may last longer depending on the timing of active polling crawlers. If values still appear doubled after several minutes, see the [CloudWatch Metric Streams guide][6] for troubleshooting.

### Which AWS services require additional setup beyond the core integration?

Some AWS services do not emit metrics to CloudWatch by default and require extra configuration:

| Service | Additional setup required |
|---|---|
| Amazon RDS (OS-level metrics) | Enable [Enhanced Monitoring][9] in the RDS console |
| Amazon S3 (Storage Lens metrics) | Configure [Storage Lens][10] in the S3 console |
| AWS billing metrics | Enable `Billing` in the [Metric Collection tab][1], add the `budgets:ViewBudget` permission, and [enable billing metrics][11] in the AWS console. See [Monitor your AWS billing details][13] for full instructions. |
| Custom CloudWatch namespaces | Enable **Collect Custom Metrics** in the [Metric Collection tab][1] |
| EC2 detailed monitoring | Enable [detailed monitoring][12] per-instance in the EC2 console |

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /integrations/amazon_billing/
[4]: /integrations/guide/cloud-metric-delay/
[5]: /help/
[6]: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /metrics/introduction/#space-aggregation
[8]: /integrations/#cat-aws
[9]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[10]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html
[11]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[12]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-new.html
[13]: /integrations/guide/monitor-your-aws-billing-details/
