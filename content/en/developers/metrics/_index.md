---
title: Metrics
kind: documentation
aliases:
  - /metrics/
  - /guides/metrics/
  - /metrictypes/
  - /units/
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Learn more about DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
---

## Introduction

This section explains what metrics are and what they do. Whether you want to send [custom metrics][1], or have a better understanding about how Datadog works, read on. If you're looking for information about the DogStatsD (which implements these metrics), see the [DogStatsD documentation][2].

### Submitting metrics

There are multiple ways to send metrics to Datadog:

1. Via the Datadog Agent directly. Learn how to [write an integration][3], or examine the [Aggregator source code][4] directly.
2. Via the DogStatsD server (bundled with the Datadog Agent) and a [client library][5].
3. Directly via Datadog's [HTTP API][6].
4. Via the [Dropwizard Java metrics library][7] with the [metrics-datadog][8] backend. Thanks to the people at [Vistar Media][9], [Coursera][10], and [Bazaarvoice][11] for their contributions.

<div class="alert alert-warning">
Metric timestamps cannot be more than 10 minutes in the future or more than 1 hour in the past.
</div>

### Naming metrics

There are a few rules regarding metric names:

* Must start with a letter.
* Must only contain ASCII alphanumerics, underscores, and periods.
  * Other characters, including spaces, are converted to underscores.
  * Unicode is _not_ supported.
* Must not exceed 200 characters. Fewer than 100 is preferred from a UI perspective.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). The hierarchy is neither enforced nor interpreted, but it can be used to infer things about servers. For example, if `hostA` and `hostB` are both reporting `http.nginx.*` those must be web frontends.

**Note**: Metric names are case sensitive in Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/custom_metrics
[2]: /developers/metrics/dogstastd_metrics_submission
[3]: /developers/integrations
[4]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[5]: /developers/libraries
[6]: /api
[7]: https://github.com/dropwizard/metrics
[8]: https://github.com/coursera/metrics-datadog
[9]: http://www.vistarmedia.com
[10]: https://www.coursera.org
[11]: http://www.bazaarvoice.com
[12]: https://app.datadoghq.com/metric/summary
