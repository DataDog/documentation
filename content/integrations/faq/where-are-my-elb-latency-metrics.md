---
title: Where are my ELB latency metrics?
kind: faq
---

You may already be familiar with the following metrics for monitoring latency in ELB responses:
```
aws.elb.latency
aws.elb.latency.average
aws.elb.latency.maximum
```

These metrics are specific to ELB V1s.

For ELB V2s, a similar pair of metrics is made available, but with a different namespace, specifically:
```
aws.elb.target_response_time.average
aws.elb.target_response_time.maximum
```

Further documentation on these metrics can be found in our [AWS ELB metrics list][1].

[1]: /integrations/amazon_elb/#metrics
