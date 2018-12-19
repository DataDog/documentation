---
title: Are my AWS CloudWatch metrics delayed?
kind: faq
---

When using the AWS integration, metrics are pulled in via the CloudWatch API. You may see a slight delay in metrics from AWS due to some constraints that exist for their API.

If you receive 5-minute metrics from CloudWatch, there can be up to a ~15-20 min delay in receiving your metrics. This is because CloudWatch makes your data available with a 5-10 minute latency, and Datadog runs the crawler every 10 minutes.

Queueing and CloudWatch API limitations can add up to another 5 minutes. If you receive 1-minute metrics with CloudWatch, then their availability delay is about 2 minutes—so total latency to view your metrics may be ~10-12 minutes.

Further, the CloudWatch API only offers a metric-by-metric crawl to pull data. The CloudWatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for "detailed metrics" within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

On the Datadog side, there is the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Contact [Datadog][1] for more information.

To obtain metrics with virtually zero delay, Datadog recommends installing the Datadog Agent on those hosts. Refer to the documentation on [if you should install the Datadog Agent on your AWS instances][2], especially in relation to CloudWatch.

[1]: /help
[2]: /agent/faq/why-should-i-install-the-agent-on-my-aws-instances
