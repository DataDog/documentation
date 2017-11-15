---
title: How to remove the host tag when submitting metrics via dogstatsD
kind: faq
customnav: developersnav
---

In some cases you may want to take advantage of the features available with dogstatsD but do not necessarily need to view the metrics broken down by a host tag or may be looking to reduce the number of tags on a given metric.

To remove the host tag from being applied when submitting metrics via dogstatsD you can set the host tag to nothing as seen here:

```python

from datadog import statsd
from random import randint

statsd.gauge('metric.test', randint(0,100), tags=['host:', 'box:vagrant'])
```

This will result in metric.test being reported without a host tag and only box:vagrant as the only tag.

The following articles have more information about custom metrics:

* [Getting Started on custom metrics](/getting_started/custom_metrics)

* [How do I submit custom metrics, what's their overhead ?](/developers/faq/how-do-i-submit-custom-metrics-what-s-their-overhead)

And as always, please feel free to reach out to [us](/help) if you are looking for help with your custom metrics.

**DISCLAIMER**: When removing the host tag you are removing a unique identifier for the submission of custom metrics. When two datapoints are submitted with the same timestamp/metric/tag combination and do not have unique identifiers the last received/processed value will overwrite the value stored. To avoid this edge case, please ensure that no host is submitting the same exact metric/tag combination at any given timestamp