---
title: AWS Cloud Metric Discrepancy

description: "Troubleshooting steps for AWS metric discrepancy"
further_reading:
- link: "https://docs.datadoghq.com/integrations/amazon-web-services/"
  tag: "Integration"
  text: "AWS Cloud Integration"
---

## Overview

Use this guide to troubleshoot metric discrepancies between AWS and Datadog.

## Metric discrepancies

Datadog always tries to ingest the most granular raw values from AWS normalized to per-second values. All aggregation seen in Datadog happens on the Datadog side. The following steps reconcile a discrepancy between AWS and Datadog for the following metric `aws.ec2.cpuutilization`. 

1. Find the corresponding metric in AWS.

   For AWS metrics, Datadog converts AWS metrics into the format `aws.AWS_NAMESPACE.METRIC_NAME`. For the [example metric][1], the AWS namespace is **EC2**, and the metric name is **CPUUtilization**. 

2. Find the most granular dimensions.

   For the example metric, this would be `InstanceID`. Refer to the [AWS documentation][2] for other metrics. Although additional dimensions are seen here, CloudWatch only populates the example metric with `InstanceID`. 
   
   {{< img src="integrations/guide/aws-metric-discrepancy/aws_dimensions.png" alt="dimensions definition in AWS documentation" >}}

3. Find the statistic.

    In regards to what statistics Datadog decides to collect for any given metric, Datadog decides based on recommendations in AWS documentation and customer demand. Datadog does not collect all statistics for two key reasons:
    - Typically, only one or a few statistics offer meaningful insight.
    - By collection only relevant statistics Datadog can significantly reduce data volume and minimize traffic between Datadog and AWS.
    Generally, Datadog collects Average by default. When multiple statistics are collected, it is noted as `aws.AWS_NAMESPACE.METRIC_NAME.STATISTIC` e.g, `aws.ec2.cpuutilization.max`. If you are unsure what statistic is being collected for a specific metric it may be useful to compare AWS to Datadog with each statistic provided by AWS. In our example, the statistic will be Average. 

3. Graph the metric in AWS CloudWatch Metric Explorer.

   Search for `EC2 CPUUtilization`
   - Namespace: EC2
   - Metric name: CPUUtilization 
   - Dimension: (most granular) InstanceId
   - Statistic: Average 
   - Period: 1m

   {{< img src="integrations/guide/aws-metric-discrepancy/aws_metric_explorer.png" alt="aws metric explorer" >}}

4. Graph the metric in the Datadog Metrics Explorer. 

   {{< img src="integrations/guide/aws-metric-discrepancy/datadog_metric_explorer.png" alt="datadog metric explorer" >}}

   In most cases, after completing steps 1 through 4, you see the exact same values in both AWS and Datadog. However, in our example, a discrepancy appears as soon as the metric begins reporting.

   - **Datadog**: 32.6
   - **Google Cloud**: 39.8210191868

   {{< img src="integrations/guide/gcp-metric-discrepancy/aws_value.png" alt="aws value" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_value_wrong.png" alt="wrong datadog value" >}}

5. Understand Datadog time/space aggregation.

   This discrepancy occurs because by default, Datadog applies time aggregation when view metrics over a longer period of time . For details, see [Time and Space aggregation][3] documentation.

6. Adjust the timeframe in Datadog.

   Zoom in on the timeframe in Datadog. Assuming you are using the most granular dimensions, the value in AWS should match the value in Datadog.

   {{< img src="integrations/guide/aws-metric-discrepancy/datadog_value_correct.png" alt="correct datadog value" >}}
   
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html#:~:text=Meaningful%20statistics-,CPUUtilization,-The%20percentage%20of
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html
[3]: https://docs.datadoghq.com/metrics/#time-and-space-aggregation