---
title: Suggested Journeys
private: true
description: Quickly create journeys based on Datadog's automatically generated suggestions.
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about journey monitoring'
- link: '/journey_monitoring/map/'
  tag: 'Documentation'
  text: 'Learn about the journey map'
- link: '/journey_monitoring/details_report/'
  tag: 'Documentation'
  text: 'Learn about journey reports'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about journey variants'
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="Join the Preview!">}}
Journey Monitoring is in Preview.
{{< /callout >}}

## Overview

Every 24 hours, Datadog analyzes the past 30 days of data and automatically generates suggested journeys. Suggestions are based on overlap detected across your existing Product Analytics funnels, RUM operations, and Synthetic tests. For example, a checkout funnel in Product Analytics that aligns with a RUM operation and an existing Synthetic test is grouped into a single suggested journey. Each suggested journey includes:
- A start event
- An end event
- A journey description

[INSERT IMAGE HERE]

Suggested journeys are starting points to create new journeys. Clicking on a suggested journey from the [map][1] or catalog will take you to the journey creation page. The start event, end event, and description will be automatically populated from the suggestion.

<div class="alert alert-warning"><p>Suggested journeys will not appear if your organization has opted out of applied AI experiences.</p></div>

## Dismissing suggested journeys

Click the three-dot menu in the catalog to dismiss a suggested journey. A dismissed journey suggestion will not be re-generated in the future.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /journey_monitoring/map/
