---
title: AWS Integration and CloudWatch FAQ
kind: faq
---

## Can I collect AWS Custom metrics through the Integration?

Yes. You need to check the **custom metrics** checkbox on the AWS tile.

## How does the Datadog AWS integration use CloudWatch?

We use the CloudWatch monitoring APIs to monitor your AWS resources. Our main use of these APIs is to gather raw metrics data through the GetMetricStatistics endpoint.

We also use other APIs to enrich our metrics data and make our product more useful to you. Some examples include:

 - Gathering custom tags to add to metrics

 - Gathering information about the status / health of resources, e.g. for automuting

 - Gathering log streams for processing into metrics

## How many API requests will be made? How can I monitor my CloudWatch usage?

Datadog will gather the available metrics every 10 minutes for each sub-integration you have installed from a tile or the checklist on the main tile. If you have a large number of AWS resources for a particular sub-integration (e.g. SQS, ELB, DynamoDB, AWS Custom metrics), this can impact your AWS CloudWatch bill.

The easiest way for customers to monitor their CloudWatch API usage is to use our AWS Billing integration. See [this FAQ][1] for how to turn on the Billing integration and create alerts on your CloudWatch API spend.

## How can I reduce the lag on my CloudWatch metrics to appear in Datadog/Why are my CloudWatch metrics delayed?

By default, we collect AWS metrics every 10 minutes. See [this article][2] for more information. If you need to reduce the latency, [reach out to our support team][3] for assistance.

[1]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[2]: /integrations/faq/are-my-aws-cloudwatch-metrics-delayed
[3]: /help
