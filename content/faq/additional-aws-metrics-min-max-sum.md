---
title: Additional AWS Metrics - Min/Max/Sum
kind: faq
customnav: main_references
---

Overall, min/max/avg have a different meaning within AWS than in Datadog.

In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS Cloudwatch, we only get the average latency as a single time series per ELB.

Within Datadog, when you are selecting ‘min’, ‘max’, or ‘avg’, you are controlling how multiple time series will be combined. For example, requesting system.cpu.idle without any filter would return one series for each host that reports that metric and those series need to be combined to be graphed. On the other hand, if you requested system.cpu.idle from a single host, no aggregation would be necessary and switching between average and max would yield the same result.

If you would like to collect the Min/Max/Sum/Avg from AWS (Component Specific - Ec2, ELB, Kinesis, etc.) please reach out to support@datadoghq.com. Enabling this feature would provide additional metrics under the following namespace format:

aws.elb.healthy_host_count.sum

aws.elb.healthy_host_count.min

aws.elb.healthy_host_count.max

Please note, enabling this feature will increase the number of API requests and information pulled from CloudWatch and will potentially impact your AWS billing.

More information on this behavior and AWS billing can be found here:

https://help.datadoghq.com/hc/en-us/articles/203826195-Do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-CloudWatch-and-Datadog-

https://help.datadoghq.com/hc/en-us/articles/207121426-How-do-I-monitor-my-AWS-estimated-billing-balance-

https://help.datadoghq.com/hc/en-us/articles/203764805-How-will-an-AWS-Integration-impact-my-monthly-billing-Can-I-setup-exclusions-using-tags-