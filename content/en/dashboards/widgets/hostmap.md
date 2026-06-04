---
title: Host Map Widget
widget_type: hostmap
description: "Get an at-a-glance view of the health and status of your infrastructure in your dashboards."
aliases:
- /graphing/widgets/hostmap/
further_reading:
- link: "/infrastructure/hostmap/"
  tag: "Documentation"
  text: "Host Map"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The host map widget displays your infrastructure as a color-coded grid of hosts, containers, pods, or clusters. Use it to spot anomalies, understand resource distribution, and monitor infrastructure health at a glance. For the full-screen version, see the [Host Map][1] page.

{{< img src="dashboards/widgets/hostmap/hostmap-2.png" alt="Host map widget showing hosts grouped by availability zone and colored by CPU utilization, with darker hexagons indicating higher CPU usage." >}}

## Setup

{{< img src="dashboards/widgets/hostmap/hostmap_setup-2.png" alt="Host map widget configuration panel with node type set to Host, filter set to env:prod, grouped by availability-zone, and fill by a CPU utilization metric query" >}}

### Configuration

<!-- "Node type" is a UI label referring to an infrastructure node, not Node.js -->
<!-- vale Datadog.words_case_sensitive = NO -->
1. {{< ui >}}Node type{{< /ui >}}: Choose which entity type to display: **Host**, **Container**, **Pod**, or **Cluster**.
<!-- vale Datadog.words_case_sensitive = YES -->
2. {{< ui >}}Filter by{{< /ui >}}: Narrow the set of nodes using a tag filter expression (for example, `env:prod`). Filter expressions support wildcards and logical operators. Leave blank to include all nodes of the selected type.
3. {{< ui >}}Group by{{< /ui >}}: Aggregate nodes into hexagonal groups by one or more tags. Nodes that share a tag value appear together in the same group.
4. {{< ui >}}Fill by{{< /ui >}}: Configure a metric query whose value determines the color of each node. The query is evaluated per node and mapped to the selected color palette.
5. {{< ui >}}Size by{{< /ui >}} (optional): Configure a second metric query to scale the relative size of each node. Not available when a hierarchical child layer is configured.
6. {{< ui >}}Style{{< /ui >}}:
   - {{< ui >}}Palette{{< /ui >}}: Choose a color palette.
   - {{< ui >}}Reverse palette{{< /ui >}}: Flip the direction of the palette.
   - {{< ui >}}Min{{< /ui >}} / {{< ui >}}Max{{< /ui >}}: Pin the color scale to specific metric values. Nodes below the minimum display in the first palette color; nodes above the maximum display in the last.
7. {{< ui >}}Conditional formats{{< /ui >}} (optional): Apply color overrides to nodes whose fill value crosses a defined threshold.
8. {{< ui >}}Hierarchical view{{< /ui >}} (optional): Configure a child node type that appears when zooming into a group, for example **Container** within **Host**. The child layer has its own independent {{< ui >}}Fill by{{< /ui >}} query and {{< ui >}}Style{{< /ui >}} settings.

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
