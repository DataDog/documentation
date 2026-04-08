---
title: Map
description: Visualize and monitor the performance of your journeys in the Journey Map.
further_reading:
- link: "/journey_monitoring"
  tag: "Documentation"
  text: "Learn about journey monitoring"
- link: '/journey_monitoring/map/suggested_journeys/'
  tag: 'Documentation'
  text: 'Learn about suggested journeys'
- link: '/journey_monitoring/details_report/'
  tag: 'Documentation'
  text: 'Learn about journey details reports'
- link: '/journey_monitoring/details_report/variants/'
  tag: 'Documentation'
  text: 'Learn about journey variants'
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="Join the Preview!">}}
Journey Monitoring is in Preview.
{{< /callout >}}

## Overview

The <strong>journey map</strong> displays all created and suggested journeys in a frontend application. Each  tile in the map displays metrics on a journey's volume and conversion rate. If the journey has at least one test Synthetic test defined, the tile will also display the journey's [Synthetic test suite][1] uptime metric.

[INSERT IMAGE HERE]

><div class="alert alert-warning"><p>Only frontend applications that are instrumented with RUM without Limits, Synthetic Testing, and Product Analytics are eligible for Journey Monitoring.</p></div>

## What you can do in the journey map

Use the map to explore and manage your journeys:
- Change zoom state in the map
- Hover over a journey to see its description, start, and end definition
- Click on a journey in the catalog to navigate to the journey's [details report][2]
- Use the filters and search bar to narrow down the displayed journeys in the catalog and map
- Click on a journey's three-dot menu to edit or delete the journey

## Journey states

Journeys in the map and catalog may be color-coded based on their configuration and performance:
- Suggested journeys are <strong>purple</strong> and tagged with a "Suggestion" pill
- Journeys with a dropping conversion rate are <strong>orange</strong> and contain a red chevron
- Journeys with no tests in their Synthetic test suite will contain a <strong>warning</strong> in their tooltip

[INSERT IMAGE HERE]


## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/test_suites/
[2]: /journey_monitoring/details_report/