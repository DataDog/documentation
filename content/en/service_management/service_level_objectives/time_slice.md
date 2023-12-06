---
title: Time Slice SLOs
kind: documentation
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Time Slice SLOs allow you to measure reliability using a custom definition of uptime. You define uptime as a condition over a metric timeseries. For example, you can create a latency SLO by defining uptime as whenever p95 latency is less than 1 second.

Time-slice SLOs are a convenient alternative to Monitor based SLOs. Time slice SLOs provide a way to create an uptime SLO without going through a monitor so you dont have to create and maintain both a monitor and an SLO. This documentation gives guidance on how to:
- Create and configure a Time slice slo
- Export an existing monitor SLO 

## Create a Time Slice SLO

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

### Create an SLO from the create page

To create a new Time Slice SLO:
1. Navigate to Service Management > SLOs
1. Click **+ New SLO** to open up the Create SLO page.
1. Select **By Time Slices** to define your SLo measurement. 
1. Define your uptime condition by choosing a metric query, comparator and threshold. For example, to define uptime as whenever p95 latency is less than 1s. Alternatively, you can [import the uptime from a monitor](#import-from-a-monitor).
1. Choose your timeframe and target
1. Name and tag your SLO.
1. Click **Create**.

### Export an existing monitor SLO

<div class="alert alert-info">Only metric monitor SLOs can be exported. Non-metric monitors or multi-monitor SLOs cannot be exported</div>

Create a Time Slice SLO by exporting an existing monitor SLO. From a monitor SLO click **Export to Time Slice SLO**.

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

### Import from a monitor

<div class="alert alert-info">Only metric monitor SLOs appear in the monitor selection for import. </div>

From the Create or Edit SLO page, under *Define your SLI*, click **Import from Monitor** and select from the dropdown or search in the monitor selector.

**Note**: Not every aspect of the monitor makes sense (or is supported) in an uptime condition for a Time Slice SLO. The rolling time period used in a monitor query is not respected because Time Slice SLOs do not allow rolling periods.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}