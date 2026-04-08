---
title: Journey Variants
description: Journey variants are versions of a journey that contain a unique sequence of intermediate steps between the journey's start and end.
further_reading:
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about Journey Monitoring"
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about the Journey Map"
- link: "/journey_monitoring/"
  tag: "Documentation"
  text: "Learn about the Journey Details Report"
---

## Overview

Each journey can contain one or more <strong>variants</strong>. A variant is a version of a journey containing a unique sequence of intermediate steps between the journey's start and end.

[INSERT DIAGRAM HERE]


## Creating variants

Creating a variant requires:
- A unique name
- At least one action or view events between the journey's start and view events

You can optionally include attribute filters for the variant. The funnel chart will automatically update based on the selected intermediate steps. The funnel contains data on the volume, conversion rate, and average to completeion for each step.

You can add one or more variants while creating or editing a new journey.

[INSERT IMAGE HERE]


## Analyzing variants

Each variant is a filter on the journey's metrics and telemetry. When a variant is selected, all data displayed in the report is filtered down to the variant's sequence of starting, intermediate, and ending events. Use the report data to drill into each variant performance.

## Deleting variants

To delete a variant, navigate to a journey's details report and hover over the variant in the left-hand menu. Click the trash icon to delete the variant.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}
