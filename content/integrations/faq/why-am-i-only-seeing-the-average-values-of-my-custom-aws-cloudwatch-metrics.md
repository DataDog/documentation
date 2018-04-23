---
title: Why am I only seeing the average values of my custom AWS/Cloudwatch metrics?
kind: faq
---

By default Datadog will only collect the average values of your custom AWS/Cloudwatch metrics. However, additional values can be collected by request. These include (where available) the min, max, sum, and sample count.

Regarding naming conventions, the average value is represented by the custom metric name alone, where the additional values are denoted by an appendix added to the metric name.

For example, your custom AWS/Cloudwatch metric names will look something like this in Datadog.

```
custom.aws.metric (average)
custom.aws.metric.minimum
custom.aws.metric.maximum
custom.aws.metric.sum
custom.aws.metric.samplecount
```

A request to Datadog support is required in order to enable the collection of custom AWS/Cloudwatch metric values other than averages. Contact [us][1] for assistance.

[1]: /help
