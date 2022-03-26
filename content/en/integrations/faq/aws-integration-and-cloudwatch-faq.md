---
title: AWS Integration and CloudWatch FAQ
kind: faq
aliases:
  - "/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog"
---

### Can I collect AWS custom metrics through the integration?

Yes. Check the **custom metrics** checkbox on the [AWS integration tile][1].

### How to collect metrics from a service for which Datadog doesn’t have an official integration?

AWS metrics coming from a “AWS/<namespace>” that we don’t yet have an official integration for are also brought in under the custom namespace when the “Collect custom metrics'' option is enabled. You can filter these metrics out and only keep the metrics you’d like to receive by using the filter string under custom namespace via the [Set an AWS tag filter][6] API.

### How does the Datadog AWS integration use CloudWatch?

Datadog uses the CloudWatch monitoring APIs to monitor your AWS resources. Our main use of these APIs is to gather raw metrics data through the `GetMetricData` endpoint.

Other APIs are used to enrich metrics data. Some examples include:

 * Gathering custom tags to add to metrics

 * Gathering information about the status or health of resources, such as automuting

 * Gathering log streams

### How many API requests are made and how can I monitor my CloudWatch usage?

Datadog gathers the available metrics every 10 minutes for each AWS sub-integration you have installed. If you have a large number of AWS resources for a particular sub-integration (SQS, ELB, DynamoDB, AWS Custom metrics), this can impact your AWS CloudWatch bill.

You can monitor your CloudWatch API usage using the [AWS Billing integration][2].

### How can I reduce the delay of receiving my CloudWatch metrics to Datadog?

By default, Datadog collects AWS metrics every 10 minutes. See [Cloud Metric Delay][3] for more information. If you need to reduce the latency, contact [Datadog support][4] for assistance. To get CloudWatch metrics into Datadog faster with a 2-3 minute latency we recommend using the [Amazon CloudWatch Metric Streams and Amazon Kinesis Data Firehose][7]. 


### Why am I only seeing the average values of my custom AWS/Cloudwatch metrics?

By default, Datadog only collects the average values of your custom AWS/Cloudwatch metrics. However, additional values are available by contacting [Datadog support][4]. These include (where available) the min, max, sum, and sample count.

### Is there a discrepancy between my data in CloudWatch and Datadog?

Some important distinctions to be aware of:

- Datadog collects the _average_ for all CloudWatch metrics.
- In AWS for counters, a graph set to `sum` `1 minute` shows the total number of occurrences in one minute leading up to that point (the rate per one minute). Datadog is displaying the raw data from AWS normalized to per second values, regardless of the timeframe selected in AWS. Therefore, you might see a lower value in Datadog.
- Overall, `min`, `max`, and `avg` have different meanings within AWS. AWS distinctly collects average latency, minimum latency, and maximum latency. When pulling metrics from AWS CloudWatch, Datadog only receives the average latency as a single timeseries per ELB. Within Datadog, when you select `min`, `max`, or `avg`, you are controlling how multiple timeseries are combined. For example, requesting `system.cpu.idle` without any filter returns one series for each host reporting that metric. Datadog combines these time series using [space aggregation][5]. Otherwise, if you requested `system.cpu.idle` from a single host, no aggregation is necessary and switching between `avg` and `max` yields the same result.

### How do I adjust my data on Datadog to match the data displayed in CloudWatch?

AWS CloudWatch reports metrics at one-minute granularity normalized to per minute data. Datadog reports metrics at one-minute granularity normalized to per second data. To adjust the data in Datadog, multiply by 60.  Also make sure the statistic of the metric is the same. For example, metric `IntegrationLatency` fetches a number of different statistics - Average, Maximum, Minimum as well as percentiles. In Datadog, we will represent these statistics as their own metric:
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### Will a rollup() adjust my data?

Rollups don't display similar results. For a rollup call of `rollup(sum, 60)`, the server groups all data points in minute bins and returns the sum of each bin as a datapoint. However, the granularity of AWS metrics is one minute, so there is only one datapoint per bin leading to no change.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: /integrations/amazon_billing/
[3]: /integrations/faq/cloud-metric-delay/
[4]: /help/
[5]: /metrics/introduction/#space-aggregation
[6]: https://docs.datadoghq.com/api/latest/aws-integration/#set-an-aws-tag-filter
[7]: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation#pagetitle 
