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

## Overview

This page provides an overview on submitting metrics. For additional information on metrics, see the following pages:

* [Metrics Introduction][1]
* [Custom Metrics][2]
* [DogStatsD][3]

### Submitting metrics

There are multiple ways to send metrics to Datadog:

1. Via the Datadog Agent directly. Learn how to [write an integration][4], or examine the [Aggregator source code][5] directly.
2. Via the DogStatsD server (bundled with the Datadog Agent) and a [client library][6].
3. Directly via Datadog's [HTTP API][7].
4. Via the [Dropwizard Java metrics library][8] with the [metrics-datadog][9] backend. Thanks to the people at [Vistar Media][10], [Coursera][11], and [Bazaarvoice][12] for their contributions.

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


[1]: /graphing/metrics/introduction
[2]: /developers/metrics/custom_metrics
[3]: /developers/dogstatsd
[4]: /developers/integrations
[5]: https://github.com/DataDog/dd-agent/blob/master/aggregator.py
[6]: /developers/libraries
[7]: /api
[8]: https://github.com/dropwizard/metrics
[9]: https://github.com/coursera/metrics-datadog
[10]: http://www.vistarmedia.com
[11]: https://www.coursera.org
[12]: http://www.bazaarvoice.com
