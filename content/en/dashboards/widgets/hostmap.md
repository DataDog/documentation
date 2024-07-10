---
title: Host Map Widget
widget_type: hostmap
description: "Display the Datadog host map in your dashboards."
aliases:
- /graphing/widgets/hostmap/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The host map widget graphs any metric across your hosts using the same visualization available from the main [Host Map][1] page:

{{< img src="dashboards/widgets/hostmap/hostmap.png" alt="Host Map" >}}

## Setup

{{< img src="dashboards/widgets/hostmap/hostmap_setup.png" alt="Host Map Setup" >}}

### Configuration

Configuration of the host map widget is similar to the main [host map][1] page:

1. **Type**: Choose to display `hosts` or `containers`.
2. **Filter by**: Choose the hosts or containers to display.
3. **Group by**: Aggregate your hosts or containers by one or several tags.
4. **Fill by**: Choose a metric to fill your host or container map elements.
5. **Size by** (optional): Choose a metric to size your host or container map elements.
6. **Palette** (optional): Choose a color palette.
7. **Values** (optional): Define the min and max color palette fill values.

**Note**: Free text search is not available for the host map widget.

### Options

#### Context links

[Context links][2] are enabled by default; you can toggle them on or off. Context links connect dashboard widgets with other pages (in Datadog or third-party).

## API

This widget can be used with the **[Dashboards API][3]**. See the following table for the [widget JSON schema definition][4]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /infrastructure/hostmap/
[2]: /dashboards/guide/context-links/
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
