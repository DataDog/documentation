---
title: Suggested Features
private: true
description: Create features (journeys) based on Datadog's automatically generated suggestions.
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Feature Monitoring'
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

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="false">}}
Feature Monitoring is in Preview.
{{< /callout >}}

## Overview

Every Wednesday midnight UTC, Datadog analyzes the previous 30 days of page views and clicks in your frontend applications and automatically generates suggested journeys. Each suggested feature includes:
- A feature name
- A feature description
- A start event
- An end event

Suggested features are starting points to create new features. Clicking on a suggested feature from the [map][1] or catalog will take you to the journey creation page. The start event, end event, and description will be automatically populated from the suggestion.

<div class="alert alert-warning"><p>Suggested journeys do not appear if your organization has opted out of applied AI experiences.</p></div>

## Dismissing suggested features

Click the three-dot menu in the catalog to dismiss a suggested feature (or journey). A dismissed journey suggestion is not re-generated in the future.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /journey_monitoring/map/
