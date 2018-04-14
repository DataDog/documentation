---
title: Où sont mes métriques de latence ELB?
kind: faq
---

Vous connaissez peut-être déjà les métriques suivantes pour surveiller la latence dans les réponses ELB:
```
aws.elb.latency
aws.elb.latency.average
aws.elb.latency.maximum
```

Ces métriques sont spécifiques aux ELB V1.

For ELB V2s, a similar pair of metrics is made available, but with a different namespace, specifically:
```
aws.elb.target_response_time.average
aws.elb.target_response_time.maximum
```

Further documentation on these metrics can be found in our [AWS ELB metrics list][1].

[1]: /integrations/amazon_elb/#metrics
