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
- link: "/ddsql_editor/"
  tag: "Documentation"
  text: "DDSQL Editor"
---

The host map widget displays your infrastructure as a color-coded grid of hosts, containers, pods, or clusters. Use it to spot anomalies, understand resource distribution, and monitor infrastructure health at a glance. For the full-screen version, see the [Host Map][1] page.

{{< img src="dashboards/widgets/hostmap/hostmap-2.png" alt="Host map widget showing hosts grouped by availability zone and colored by CPU utilization, with darker hexagons indicating higher CPU usage." >}}

## Setup

Use {{< ui >}}Query Type{{< /ui >}} to choose how the widget sources its data. **Infrastructure** (the default) queries infrastructure entities directly. **DDSQL** queries a published dataset instead.

### Infrastructure mode

{{< img src="dashboards/widgets/hostmap/hostmap_setup-3.png" alt="Host map widget configuration panel with the Query Type toggle set to Infrastructure, node type set to Host, fill by a CPU usage metric query, filter set to agent_version:<7.69.0, and grouped by agent_version." >}}

<!-- "Node type" is a UI label referring to an infrastructure node, not Node.js -->
<!-- vale Datadog.words_case_sensitive = NO -->
1. {{< ui >}}Node type{{< /ui >}}: Choose which entity type to display: **Host**, **Container**, **Pod**, or **Cluster**.
<!-- vale Datadog.words_case_sensitive = YES -->
2. {{< ui >}}Fill by{{< /ui >}}: Configure a metric query whose value determines the color of each node. The query is evaluated per node and mapped to the selected color palette.
3. {{< ui >}}Filter by{{< /ui >}}: Narrow the set of nodes using a tag filter expression (for example, `env:prod`). Filter expressions support wildcards and logical operators. Leave blank to include all nodes of the selected type.
4. {{< ui >}}Group by{{< /ui >}}: Aggregate nodes into hexagonal groups by one or more tags. Nodes that share a tag value appear together in the same group.
5. {{< ui >}}Size by{{< /ui >}} (optional): Configure a second metric query to scale the relative size of each node. Not available when a hierarchical child layer is configured.
6. {{< ui >}}Style{{< /ui >}}:
   - {{< ui >}}Palette{{< /ui >}}: Choose a color palette.
   - {{< ui >}}Reverse palette{{< /ui >}}: Flip the direction of the palette.
   - {{< ui >}}Min{{< /ui >}} / {{< ui >}}Max{{< /ui >}}: Pin the color scale to specific metric values. Nodes below the minimum display in the first palette color; nodes above the maximum display in the last.
7. {{< ui >}}Visual Formatting Rules{{< /ui >}} (optional): Apply color overrides to nodes whose fill value crosses a defined threshold.
8. {{< ui >}}Hierarchical view{{< /ui >}} (optional): Configure a child node type that appears when zooming into a group, such as **Container** within **Host**. The child layer has its own independent {{< ui >}}Fill by{{< /ui >}} query and {{< ui >}}Style{{< /ui >}} settings.

<!-- vale Datadog.headings = NO -->
### DDSQL mode
<!-- vale Datadog.headings = YES -->

DDSQL mode maps the columns of a published dataset to the host map's visualization, instead of querying infrastructure entities directly. Use it to visualize data that isn't natively modeled as an infrastructure entity. Examples include a cost allocation breakdown or a custom topology defined by joining multiple sources.

{{< img src="dashboards/widgets/hostmap/hostmap_ddsql.png" alt="Host map widget titled Deploy Error Spikes, showing 50 records as color-coded tiles ranging from light green (147 errors) to red (947 errors), based on a DDSQL query's error_count column." >}}

{{< img src="dashboards/widgets/hostmap/hostmap_ddsql_setup.png" alt="Host map widget configuration panel with the Query Type toggle set to DDSQL, a published dataset selected, Display first set to 500, and Configure Points showing Label node by set to error_service and Fill by set to error_count." >}}

1. {{< ui >}}Query Type{{< /ui >}}: Select **DDSQL**.
2. Select a dataset published from the [DDSQL Editor][5]. Add a search query to filter its rows, and use {{< ui >}}Display first{{< /ui >}} to choose the maximum number of rows to fetch from a list of presets, or enter a custom value. Click {{< ui >}}Preview Data{{< /ui >}} to inspect the dataset's columns and rows before mapping them.
3. Under {{< ui >}}Configure Points{{< /ui >}}, map dataset columns to visualization dimensions:
   - {{< ui >}}Label node by{{< /ui >}}: A column whose values uniquely identify and label each point.
   - {{< ui >}}Fill by{{< /ui >}}: A numeric column whose value determines the color of each point.
   - {{< ui >}}Size by{{< /ui >}} (optional): A numeric column whose value scales the relative size of each point.
   - {{< ui >}}Group by{{< /ui >}} (optional): Up to three columns whose values cluster points into nested groups. The order of the selected columns sets the nesting hierarchy: the first column forms the outermost group.
4. {{< ui >}}Style{{< /ui >}} and {{< ui >}}Visual Formatting Rules{{< /ui >}} work the same way as in Infrastructure mode.

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
[5]: /ddsql_editor/
