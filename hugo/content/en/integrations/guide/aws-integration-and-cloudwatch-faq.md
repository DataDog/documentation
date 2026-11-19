---
title: AWS Integration and CloudWatch FAQ
description: "Frequently asked questions about the Datadog AWS integration and CloudWatch metric collection."

aliases:
  - "/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog"
  - /integrations/faq/aws-integration-and-cloudwatch-faq
---

### Can I collect AWS custom metrics through the integration?

Yes. Enable **Collect Custom Metrics** under the **Metric Collection** tab on the [AWS integration page][1].

### Can I filter AWS metrics by metric name?

Yes. On the [AWS integration page][1], open the **Metric Collection** tab, expand a CloudWatch namespace, and add metric name filters. Use **Include** to collect only matching Datadog metric names for that namespace, or **Exclude** to collect everything except matching metric names.

For more information on syntax and required metrics, see [Getting Started with AWS][14]. To manage metric name filters programmatically, see [Configure AWS metric name filters with the API][15].

### How do I collect metrics from a service for which Datadog doesn't have an official integration?

AWS metrics coming from an `AWS/<namespace>` for which there is no official integration are also brought in under the custom namespace when the `Collect custom metrics` option is enabled. You can filter these metrics out and only keep the metrics you want by using the filter string under custom namespace with the [Set an AWS tag filter][2] API.

### How does the Datadog AWS integration use CloudWatch?

Datadog uses the CloudWatch monitoring APIs to monitor your AWS resources. Our main use of these APIs is to gather raw metrics data through the `GetMetricData` endpoint.

Other APIs are used to enrich metrics data. Some examples include:

 * Gathering custom tags to add to metrics

 * Gathering information about the status or health of resources, such as automuting

 * Gathering log streams

### How many API requests are made and how can I monitor my CloudWatch usage?

Datadog collects metrics with batched `GetMetricData` requests, on a schedule set for each CloudWatch namespace. Most namespaces are collected every 10 minutes. See [Cloud Metric Delay][4] for the schedules. The number of requests grows with the number of metrics and resources in each namespace. If you have a large number of AWS resources for a particular service (such as SQS, ELB, DynamoDB, or custom metrics), this can increase your AWS CloudWatch bill.

[Adaptive polling][16] reduces requests for metrics that have not been queried in Datadog for at least 30 days.

You can monitor your CloudWatch API usage using the [AWS Billing integration][3].

### How can I reduce the delay of receiving my CloudWatch metrics to Datadog?

By default, Datadog collects most AWS namespaces every 10 minutes, and some namespaces on a different schedule. Metrics that have not been queried for at least 30 days are collected about once an hour because of [adaptive polling][16]. See [Cloud Metric Delay][4] for schedules and the factors that contribute to latency.

To reduce latency:

- Use [Amazon CloudWatch Metric Streams and Amazon Data Firehose][6] to send metrics to Datadog as AWS publishes them, with a 2-3 minute latency.
- For EC2 instances, enable [detailed monitoring][12] to get one-minute datapoints instead of five-minute datapoints.
- Contact [Datadog support][5] to discuss adjusting the collection schedule for a namespace.


### Why am I only seeing the average values of my custom AWS/Cloudwatch metrics?

By default, Datadog only collects the average values of your custom AWS/Cloudwatch metrics. However, additional values are available by contacting [Datadog support][5]. These include (where available) the min, max, sum, and sample count.

### Is there a discrepancy between my data in CloudWatch and Datadog?

Some important distinctions to be aware of:

- **Statistic**: Each Datadog metric holds a single CloudWatch statistic. Comparing the `Sum` in CloudWatch to the `Average` in Datadog results in discrepancies. When several statistics are useful, Datadog creates a separate metric for each one. For example, `aws.elb.latency` holds the average and `aws.elb.latency.maximum` holds the maximum.
- **Period**: Datadog collects most metrics as one-minute datapoints and stores the value CloudWatch returns for that minute. A CloudWatch graph with a longer **Period**, such as five minutes, aggregates more data into each point and can show a higher `Sum` or a different `Average`.
- **Time aggregation**: When you view a long time range, Datadog rolls multiple datapoints up into each displayed point. By default, the rollup is an average. See [Will a rollup() adjust my data?](#will-a-rollup-adjust-my-data).
- **Space aggregation**: `min`, `max`, and `avg` have different meanings in AWS and Datadog. In AWS, average, minimum, and maximum are separate statistics. In Datadog, when you select `min`, `max`, or `avg` in a query, you are controlling how multiple timeseries are combined, such as one timeseries per load balancer. See [space aggregation][7]. If you query a single timeseries, switching between `avg` and `max` yields the same result.
- **Dimensions**: Some CloudWatch metrics are reported once per dimension combination, such as per availability zone. Summing them across all dimensions in Datadog can produce a higher value than the CloudWatch graph. Scope your Datadog query with tags that match the CloudWatch dimensions.
- **Per-second metrics**: A small number of metrics are converted to per-second values. See [How do I adjust my data on Datadog to match the data displayed in CloudWatch?](#how-do-i-adjust-my-data-on-datadog-to-match-the-data-displayed-in-cloudwatch).

### How do I adjust my data on Datadog to match the data displayed in CloudWatch?

For most metrics, Datadog stores the value CloudWatch returns for a statistic over a one-minute period, without converting it. To compare values, align the following between CloudWatch and Datadog:

1. **Statistic**: Use the Datadog metric that holds the same statistic as your CloudWatch graph. Metric names without a statistic suffix usually hold the average. Suffixes such as `.sum`, `.maximum`, `.minimum`, `.samplecount`, and `.p90` hold other statistics. Check the metric description on the integration page to confirm. For example, the CloudWatch metric `IntegrationLatency` is available with several statistics, each represented as its own Datadog metric:
   ```
   aws.apigateway.integration_latency (average)
   aws.apigateway.integration_latency.maximum
   aws.apigateway.integration_latency.minimum
   aws.apigateway.integration_latency.p50
   ```
2. **Period**: Set the **Period** of the CloudWatch graph to one minute, or use a [rollup](#will-a-rollup-adjust-my-data) in Datadog that matches the CloudWatch period.
3. **Dimensions and region**: Scope the Datadog query with tags that match the CloudWatch dimensions and region.
4. **Unit**: Check the unit in the metric description. The following metrics are converted from the CloudWatch per-minute `Sum` to a per-second rate. To compare them with CloudWatch, multiply the Datadog value by 60, or apply the [`.as_count()`][17] modifier:
   - `aws.elb.request_count`
   - `aws.elb.httpcode_backend_2xx`, `aws.elb.httpcode_backend_3xx`, `aws.elb.httpcode_backend_4xx`, `aws.elb.httpcode_backend_5xx`
   - `aws.elb.httpcode_elb_4xx`, `aws.elb.httpcode_elb_5xx`
   - `aws.elb.backend_connection_errors`
   - `aws.elb.spillover_count`, `aws.elb.spillover_count.maximum`
   - `aws.dynamodb.consumed_read_capacity_units`, `aws.dynamodb.consumed_write_capacity_units`

   Values for all other AWS metrics are not converted. Do not multiply them by 60.

The metric type in Datadog (gauge, count, or rate) affects how the `.as_count()` and `.as_rate()` modifiers behave. For comparisons with CloudWatch, rely on the statistic and unit in the metric description.

#### Will a rollup() adjust my data?

A rollup does not convert units. It changes how many datapoints are combined into each displayed point. With `rollup(sum, 60)`, each one-minute bucket contains a single AWS datapoint, so the values do not change.

Use a rollup to match a CloudWatch graph with a longer **Period**. For example, to compare with a CloudWatch `Sum` over five minutes, query the `.sum` metric with `.rollup(sum, 300)`. To compare with a CloudWatch `Maximum` over five minutes, query the `.maximum` metric with `.rollup(max, 300)`. Rolling up averages with `.rollup(avg, 300)` gives an approximation of the CloudWatch average, because CloudWatch weights the average by the number of samples.

### Why don't I see metrics for a new AWS service I enabled?

If you recently enabled a new AWS service integration but are not seeing metrics in Datadog, verify the following:

1. **IAM permissions**: Confirm that the IAM role or IAM user associated with the Datadog integration includes the permissions required by the service. See the individual [AWS integration pages][8] for service-specific permission requirements.
2. **Region**: Confirm that the AWS region where your resources are deployed is enabled in the [AWS integration page][1].
3. **CloudWatch availability**: Open the CloudWatch console in AWS and confirm the expected metrics exist. Some services do not emit CloudWatch metrics until specific conditions are met (for example, an ELB with no attached instances does not emit metrics).
4. **Collection delay**: API polling collects each namespace on its own schedule, every 10 minutes for most namespaces. Allow the AWS publication delay plus at least one collection run for the namespace before investigating further. If you use [CloudWatch Metric Streams][6], expect a 2-3 minute delay. See [Cloud Metric Delay][4] for schedules.

### What is the difference between API polling and CloudWatch Metric Streams?

| &nbsp; | API polling (default) | CloudWatch Metric Streams |
|---|---|---|
| **Typical latency** | AWS publication delay plus the namespace collection schedule (every 10 minutes for most namespaces). See [Cloud Metric Delay][4]. | 2-3 minutes |
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
| EC2 one-minute metrics | Enable [detailed monitoring][12] for each instance in the EC2 console. Without it, AWS publishes most EC2 instance metrics in five-minute periods. |

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
[12]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/manage-detailed-monitoring.html
[13]: /integrations/guide/monitor-your-aws-billing-details/
[14]: /getting_started/integrations/aws/#filter-metrics-by-metric-name
[15]: /integrations/guide/aws-metric-name-filters/
[16]: /integrations/guide/adaptive-cloudwatch-polling/
[17]: /metrics/custom_metrics/type_modifiers/
