---
title: Mapping between submission and in-app type
kind: faq
further_reading:
- link: "/developers/metrics/types"
  tag: "Documentation"
  text: "Datadog metric types"
---

Find below the global summary of how a metric type, when sumbmitted from a given source, is mapped to the Datadog in-app type.

| Submission Source | Submission Method (python)           | Submission Type | Datadog In-App Type |
|-------------------|--------------------------------------|-----------------|---------------------|
| [API][1]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [API][1]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [API][1]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                |
| [DogStatsD][2]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE, COUNT        |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |
| [DogStatsD][5]    | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][6]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent check][7]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [Agent check][8]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [Agent check][9]  | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE         |
| [Agent check][10] | `self.rate(...)`                     | RATE            | GAUGE               |

[1]: /api/?lang=python#post-timeseries-points
[2]: /developers/metrics/dogstatsd_metrics_submission/#gauge
[3]: /developers/metrics/dogstatsd_metrics_submission/#distribution
[4]: /developers/metrics/dogstatsd_metrics_submission/#count
[5]: /developers/metrics/dogstatsd_metrics_submission/#histogram
[6]: /developers/metrics/agent_metrics_submission/?tab=count#count
[7]: /developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
[8]: /developers/metrics/agent_metrics_submission/?tab=gauge
[9]: /developers/metrics/agent_metrics_submission/?tab=histogram
[10]: /developers/metrics/agent_metrics_submission/?tab=rate
