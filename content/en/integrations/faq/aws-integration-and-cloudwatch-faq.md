---
title: AWS Integration and CloudWatch FAQ
kind: faq
---

### Can I collect AWS Custom metrics through the Integration?

Yes. You need to check the **custom metrics** checkbox on the [AWS integration tile][1].

### How does the Datadog AWS integration use CloudWatch?

Datadog uses the CloudWatch monitoring APIs to monitor your AWS resources. Our main use of these APIs is to gather raw metrics data through the `GetMetricData` endpoint.

Other APIs are used to enrich metrics data. Some examples include:

 * Gathering custom tags to add to metrics

 * Gathering information about the status / health of resources, e.g. for automuting

 * Gathering log streams for processing into metrics

### How many API requests will be made? How can I monitor my CloudWatch usage?

Datadog gathers the available metrics every 10 minutes for each sub-integration you have installed from a tile or the checklist on the main tile. If you have a large number of AWS resources for a particular sub-integration (e.g. SQS, ELB, DynamoDB, AWS Custom metrics), this can impact your AWS CloudWatch bill.

You can monitor your CloudWatch API usage using the [AWS Billing integration][2]. For more information, see [Using Datadog's AWS Billing Integration to monitor your CloudWatch usage][3].

### How can I reduce the lag on my CloudWatch metrics to appear in Datadog/Why are my CloudWatch metrics delayed?

By default, Datadog collects AWS metrics every 10 minutes. See [Cloud Metric Delay][4] for more information. If you need to reduce the latency, contact [Datadog support][5] for assistance.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: /integrations/amazon_billing
[3]: /integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage
[4]: /integrations/faq/cloud-metric-delay
[5]: /help
