---
title: Map
private: true
description: Visualize and monitor the performance of your features in the Feature Monitoring map.
further_reading:
- link: "/journey_monitoring"
  tag: "Documentation"
  text: "Learn about Feature Monitoring"
- link: '/journey_monitoring/map/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested features'
- link: '/journey_monitoring/details_report/'
  tag: 'Documentation'
  text: 'Learn about feature details reports'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about feature variants'
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="true" header="false">}}
Feature Monitoring is in Preview.
{{< /callout >}}

## Overview

The **Feature Monitoring map** displays all created and suggested features in a frontend application. Each tile in the map displays metrics on a feature's volume and conversion rate. If the feature has at least one Synthetic test defined, the tile also displays the feature's [Synthetic test suite][1] uptime metric.

<div class="alert alert-warning"><p>Only frontend applications that are instrumented with RUM without Limits, Synthetic Monitoring & Testing, and Product Analytics are eligible for Feature Monitoring.</p></div>

## Explore and manage features

Use the map to explore and manage your features:
- Change the zoom level in the map
- Hover over a feature to see its description, start, and end definition
- Click on a feature in the catalog to navigate to the feature's [details report][2]
- Use the filters and search bar to narrow down the displayed features in the catalog and map
- Click on a feature's three-dot menu to edit or delete the feature

## Feature states

Features in the map and catalog may be color-coded based on their configuration and performance:
- Suggested features are **purple** and tagged with a "Suggestion" pill
- Features with a dropping conversion rate are **orange** and contain a red chevron
- Features with failing tests are **red**
- Features with no tests in their Synthetic test suite contain a **warning** in their tooltip

## User flows in the map

The leftmost node in the map represents the starting point for all user sessions in your application. All other nodes in the map are either pages or features. A page node can represent a parent path that expands to show its nested pages.

{{< img src="journey_monitoring/journey-monitoring-map-zoom.png" alt="The Feature Monitoring map showing a catalog of features on the left with traffic and conversion metrics, and a visual flow map on the right displaying user paths between application views and actions." style="width:100%;" >}}

The thicker the connection line, the more traffic flows between two nodes.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/test_suites/
[2]: /journey_monitoring/details_report/
