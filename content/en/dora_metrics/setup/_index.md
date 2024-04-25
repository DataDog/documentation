---
title: Set up DORA Metrics
kind: documentation
aliases:
- /continuous_integration/dora_metrics/setup/
---

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
The DORA Metrics private beta is closed. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Data source configuration

The four DORA Metrics are calculated based on two types of events: deployments and failures. Each event type supports different data sources.

**Deployment events**: Indicate that a new deployment has occurred for a service in a specific environment.
  Deployment events are used to compute Deployment Frequency, Change Lead Time, and Change Failure Rate.
  {{< whatsnext desc="Deployment data sources:" >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/apm" >}}APM Deployment Tracking{{< /nextlink >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/deployments" >}}Deployment API or CLI{{< /nextlink >}}
{{< /whatsnext >}}

**Failure events**: Indicate that a new issue has occurred for a service in a specific environment.
  Failure events are used to compute Change Failure Rate and Mean Time to Restore.
  {{< whatsnext desc="Failure data sources:">}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/pagerduty" >}}PagerDuty{{< /nextlink >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/incidents" >}}Incident API{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance
