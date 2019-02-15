---
title: How to remove the host tag when submitting metrics via DogStatsD
kind: faq
---

In some cases you may want to take advantage of the features available with DogStatsD but do not necessarily need to view the metrics broken down by a host tag or may be looking to reduce the number of tags on a given metric.

To remove the host tag from being applied when submitting metrics via DogStatsD you can set the host tag to nothing as seen here:

```python

from datadog import statsd
from random import randint

statsd.gauge('metric.test', randint(0,100), tags=['host:', 'box:vagrant'])
```

This results in `metric.test` being reported without a host tag and only `box:vagrant` as the only tag.

Refer to Datadog's [custom metrics][1] documentation for more information.

**Note**: When removing the host tag, you are removing a unique identifier for the submission of [custom metrics][1]. When two datapoints are submitted with the same timestamp/metric/tag combination and do not have unique identifiers, the last received/processed value overwrites the value stored. To avoid this edge case, ensure that no host is submitting the same exact metric/tag combination at any given timestamp.

[1]: /developers/metrics/custom_metrics

