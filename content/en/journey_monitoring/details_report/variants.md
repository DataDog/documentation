---
title: Journey Variants
description: Journey variants are versions of a journey that contain a unique sequence of intermediate steps between the journey's start and end.
further_reading:
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: "/journey_monitoring/map/"
  tag: "Documentation"
  text: "Learn about the map"
- link: "/journey_monitoring/details_report/"
  tag: "Documentation"
  text: "Learn about the journey details report"
- link: '/journey_monitoring/uptime/'
  tag: 'Documentation'
  text: 'Learn about journey uptime'
---

{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="false">}}
Journey Monitoring is in Preview.
{{< /callout >}}

## Overview

Each journey can contain one or more **variants**. A variant is a version of a journey containing a unique sequence of intermediate steps between the journey's start and end.

## Creating variants

Creating a variant requires:
- A unique name
- At least one action or view event between the journey's start and end

You can include attribute filters for the variant. The funnel chart automatically updates based on the selected intermediate steps. The funnel contains data on the volume, conversion rate, and average time to completion for each step.

You can add one or more variants while creating or editing a journey.

{{< img src="journey_monitoring/journey-monitoring-details-report-variants.png" alt="The Journey Monitoring details report showing the variants panel on the left and a funnel visualization with conversion metrics for each variant step." style="width:100%;" >}}

## Analyzing variants

Each variant is a filter on the journey's metrics and telemetry. When a variant is selected, all data displayed in the report is filtered down to the variant's sequence of starting, intermediate, and ending events. Use the report data to analyze each variant's performance.

## Deleting variants

To delete a variant, navigate to a journey's details report and hover over the variant in the left-hand menu. Click the trash icon to delete the variant.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}
