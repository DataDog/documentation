---
title: Map
description: Visualize and monitor the performance of your journeys in the Journey Monitoring map.
further_reading:
- link: "/journey_monitoring"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: '/journey_monitoring/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested journeys'
- link: '/journey_monitoring/details_report/'
  tag: 'Documentation'
  text: 'Learn about journey details reports'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about journey variants'
---

## Overview

The Journey Monitoring map displays created and [suggested journeys][5] for a frontend application. Each created journey tile displays the metrics available for that journey. [Event-based journeys][8] display [starts volume and conversion rate][9]. If the journey has [Synthetic coverage][6], the tile also displays [uptime][7] from its [Synthetic test suite][1].

{{< img src="journey_monitoring/journey-monitoring-map-zoom-1.png" alt="The Journey Monitoring map showing a catalog of journeys on the left with traffic and conversion metrics, and a visual flow map on the right displaying user paths between application views and actions." style="width:100%;" >}}

## Explore and manage journeys

Use the map to explore and manage your journeys:

- Change the zoom level in the map
- Hover over a journey to see its description, start, and end definition
- Click a journey tile to open its [Journey Overview][2]

Use the [journey catalog][3] to search, filter, sort, edit, or delete journeys.

## Journey states

The map color-codes created journeys by [journey status][4]:

- **Healthy**: Green
- **Degraded**: Red
- **Missing coverage**: Gray

Suggested journeys are purple and labeled **Suggested**. They do not have a journey status until you create them.

## User flows in the map

The map visualizes how users move between pages and journeys without using a fixed starting node. Each node represents a page or journey. A page node can represent a parent path that expands to show its nested pages.

Connection lines represent traffic between nodes. Thicker lines indicate more traffic.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/test_suites/
[2]: /journey_monitoring/overview/
[3]: /journey_monitoring/overview/#journey-catalog
[4]: /journey_monitoring/status/
[5]: /journey_monitoring/suggested_journeys/
[6]: /journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[7]: /journey_monitoring/details_report/#test-suite-and-journey-coverage
[8]: /journey_monitoring/#rum-and-product-analytics
[9]: /journey_monitoring/details_report/#traffic-and-conversion-trends
