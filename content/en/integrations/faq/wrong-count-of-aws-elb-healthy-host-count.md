---
title: Wrong count of aws.elb.healthy_host_count?
kind: faq
---

When the Cross-Zone Load Balancing option is enabled on an ELB, all the instances attached to this ELB are considered part of all A-Zs (on cloudwatch's side), so if you have 2 instances in 1a and 3 in 1b, the metric will display 5 instances per A-Z.

As this can be counter-intuitive, we've added new metrics, aws.elb.healthy_host_count_deduped and aws.elb.un_healthy_host_count_deduped, that displays the count of healthy and unhealthy instances per AZ, regardless of if this Cross-Zone Load Balancing option is enabled or not. These metrics should have the value you would expect.

