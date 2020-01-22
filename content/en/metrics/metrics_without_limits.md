---
title: Metrics without Limits™
kind: documentation
description: Customize tagging without having to redeploy or change code.
further_reading:
  - link: "account_management/billing/custom_metrics"
    tag: "Documentation"
    text: "Learn about tagging customization and how custom metrics are counted"
---

## Overview

Metrics without Limits™ provides you with the ability to customize tagging on all metric types in-app without having to redeploy or change any code. 

With Metrics without Limits™, you’ll be able to customize tagging to drop in-app host-level tags attached to application-level or business metrics. This functionality is on the [Distribution Metrics page][1] but will be moved as the beta progresses:

{{< img src="metrics/metrics_without_limits/distribution_metrics_page.png" alt="Distribution Metrics Page" >}}

## Configuration of Tags

**Distribution Metrics**: Tag customizations can be made in-line with the edit button that appears upon hovering. These configurations are mutable.

{{< img src="metrics/metrics_without_limits/distribution_metrics.gif" alt="Distribution Metrics" >}}

**All other metric types**: Tag customizations can be made with the **Configure metrics** button. These configurations are immutable and must be created/deleted, rather than edited.

{{< img src="metrics/metrics_without_limits/configure_metrics.gif" alt="Configure Metrics" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/distribution_metrics
