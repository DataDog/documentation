---
title: Map
description: Visualize and monitor the performance of your journeys in the Journey Monitoring map.
further_reading:
- link: "/journey_monitoring"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: '/journey_monitoring/map/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested journeys'
- link: '/journey_monitoring/details_report/'
  tag: 'Documentation'
  text: 'Learn about journey details reports'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about journey variants'
- link: '/journey_monitoring/uptime/'
  tag: 'Documentation'
  text: 'Learn about journey uptime'
---

{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="Join the Preview!">}}
Journey Monitoring is in Preview.
{{< /callout >}}

## Overview

The **Journey Monitoring map** displays all created and suggested journeys in a frontend application. Each tile in the map displays metrics on a journey's volume and conversion rate. If the journey has at least one Synthetic test defined, the tile also displays the journey's [Synthetic test suite][1] uptime metric.

<div class="alert alert-warning"><p>Only frontend applications that are instrumented with RUM without Limits, Synthetic Monitoring & Testing, and Product Analytics are eligible for Journey Monitoring.</p></div>

## Explore and manage journeys

Use the map to explore and manage your journeys:
- Change the zoom level in the map
- Hover over a journey to see its description, start, and end definition
- Click on a journey in the catalog to navigate to the journey's [details report][2]
- Use the filters and search bar to narrow down the displayed journeys in the catalog and map
- Click on a journey's three-dot menu to edit or delete the journey

## Journey states

Journeys in the map and catalog may be color-coded based on their configuration and performance:
- Suggested journeys are **purple** and tagged with a "Suggestion" pill
- Journeys with a dropping conversion rate are **orange** and contain a red chevron
- Journeys with failing tests are **red**
- Journeys with no tests in their Synthetic test suite contain a **warning** in their tooltip

## User flows in the map

The leftmost node in the map represents the starting point for all user sessions in your application. All other nodes in the map are either pages or journeys. A page node can represent a parent path that expands to show its nested pages.

{{< img src="journey_monitoring/journey-monitoring-map-zoom-1.png" alt="The Journey Monitoring map showing a catalog of journeys on the left with traffic and conversion metrics, and a visual flow map on the right displaying user paths between application views and actions." style="width:100%;" >}}

The thicker the connection line, the more traffic flows between two nodes. Journeys that are not connected to the Session start node are journeys that users navigate to only after a session has already begun, rather than as an entry point into the application.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/test_suites/
[2]: /journey_monitoring/details_report/
