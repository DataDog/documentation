---
title: Journey Variants
description: Define and compare the paths users take between a journey's start and end events.
further_reading:
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: "/journey_monitoring/configuring_journeys/"
  tag: "Documentation"
  text: "Configure journeys"
- link: "/journey_monitoring/details_report/"
  tag: "Documentation"
  text: "Learn about the journey details report"
---

<div class="alert alert-info">Journey variants are available only with an active <a href="/product_analytics/">Product Analytics</a> trial or paid subscription.</div>

## Overview

A **variant** represents a specific path between a journey's [start and end events][8]. Use variants to compare [key performance indicators (KPIs)][3] and telemetry data for common paths through the same journey.

## Create a variant

Add variants when you create a journey or edit an existing journey:

1. Enter a unique name.
2. Add at least one intermediate [action or view event][9] between the journey's start and end events.
3. Optionally, add [attribute filters][10] to limit the variant to a specific cohort.
4. Save the journey.

The [funnel][4] updates as you add intermediate events. It shows the volume, conversion rate, and average time to convert for each step.

### Suggested variants

Datadog analyzes common sequences of intermediate action and view events and suggests variants based on those paths. Suggested variants appear when you create a journey manually, create one from a [suggested journey][1], or edit an existing journey.

{{< img src="journey_monitoring/journey-monitoring-details-report-variants.png" alt="The Journey Monitoring details report showing the variants panel on the left and a funnel visualization with conversion metrics for each variant step." style="width:100%;" >}}

## Analyze variants

Select a variant in the [journey details report][2] to filter its metrics and telemetry data to that path. Use the filtered data to compare volume, conversion rate, average time to convert, [frontend errors][5], [RUM operations][6], and [Synthetic test coverage][7] across paths.

## Delete a variant

In the journey details report, hover over the variant and click the delete icon.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /journey_monitoring/suggested_journeys/
[2]: /journey_monitoring/details_report/
[3]: /journey_monitoring/details_report/#traffic-and-conversion-trends
[4]: /product_analytics/charts/funnel_analysis/
[5]: /error_tracking/
[6]: /real_user_monitoring/operations_monitoring/
[7]: /journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[8]: /journey_monitoring/configuring_journeys/#define-start-and-end-conditions
[9]: /product_analytics/data_collected/
[10]: /journey_monitoring/configuring_journeys/#attribute-filters
