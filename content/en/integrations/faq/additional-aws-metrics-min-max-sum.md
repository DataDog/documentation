---
title: Additional AWS Metrics - Min/Max/Sum
kind: faq
---

Overall, min/max/avg have a different meaning within AWS than in Datadog.

In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS Cloudwatch, we only get the average latency as a single timeseries per ELB.

Within Datadog, when you are selecting 'min', 'max', or 'avg', you are controlling how multiple timeseries are combined. For example, requesting system.cpu.idle without any filter would return one series for each host that reports that metric and those series need to be combined to be graphed. On the other hand, if you requested system.cpu.idle from a single host, no aggregation would be necessary and switching between average and max would yield the same result.

If you would like to collect the Min/Max/Sum/Avg from AWS (Component Specific - Ec2, ELB, Kinesis, etc.) reach out to support@datadoghq.com. Enabling this feature would provide additional metrics under the following namespace format:

aws.elb.healthy_host_count.sum

aws.elb.healthy_host_count.min

aws.elb.healthy_host_count.max

Note, enabling this feature increases the number of API requests and information pulled from CloudWatch and may potentially impact your AWS billing.

More information on this behavior and AWS billing can be found here:

* [Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?][1]

* [How do I monitor my AWS billing details?][2]

[1]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[2]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
