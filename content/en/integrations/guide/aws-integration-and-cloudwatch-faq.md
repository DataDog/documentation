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

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /integrations/amazon_billing/
[4]: /integrations/guide/cloud-metric-delay/
[5]: /help/
[6]: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /metrics/introduction/#space-aggregation
