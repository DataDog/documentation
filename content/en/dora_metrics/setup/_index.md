---
title: Set up DORA Metrics
kind: documentation
aliases:
- /continuous_integration/dora_metrics/setup/
---

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
DORA Metrics private beta is closed. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview

DevOps Research and Assessment (DORA) metrics are [four key metrics][1] used to indicate the velocity and stability of software development.

Deployment Frequency
: How often an organization successfully releases to production.

Lead Time for Changes
: The amount of time it takes a commit to get into production.

Change Failure Rate
: The percentage of deployments causing a failure in production.

Time to Restore Service
: How long it takes an organization to recover from a failure in production.

Defining and tracking DORA metrics can help you identify areas of improvement for your team or organization's speed and quality of software delivery.

{{< whatsnext desc="Set up DORA Metrics in Datadog:" >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/deployments" >}}Send Deployment Events{{< /nextlink >}}
    {{< nextlink href="continuous_integration/dora_metrics/setup/incidents" >}}Send Incident Events{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance
