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

{{< img src="dashboards/widgets/hostmap/hostmap_setup-2.png" alt="Host map widget configuration panel with node type set to Host, filter set to env:prod, grouped by availability-zone, and fill by a CPU utilization metric query." >}}

### Configuration

Use {{< ui >}}Query Type{{< /ui >}} to choose how the widget sources its data: **Infrastructure** (the default) queries infrastructure entities directly, while **DDSQL** queries a published dataset. See [DDSQL mode](#ddsql-mode) for the DDSQL configuration steps.

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
8. {{< ui >}}Hierarchical view{{< /ui >}} (optional): Configure a child node type that appears when zooming into a group, such as **Container** within **Host**. The child layer has its own independent {{< ui >}}Fill by{{< /ui >}} query and {{< ui >}}Style{{< /ui >}} settings.

### Options

#### Context links

[Context links][2] are enabled by default; you can toggle them on or off. Context links connect dashboard widgets with other pages (in Datadog or third-party).

## DDSQL mode

DDSQL mode maps the columns of a published dataset to the host map's visualization instead of querying infrastructure entities. Use DDSQL mode to visualize data that isn't natively modeled as an infrastructure entity, such as a cost allocation breakdown or a custom topology defined by a join across multiple sources.

### Configuration

1. {{< ui >}}Query Type{{< /ui >}}: Select **DDSQL**.
2. Select a dataset published from the [DDSQL Editor][5] or a [notebook][6]. Add a search query to filter its rows, and use {{< ui >}}Display first{{< /ui >}} to set the maximum number of rows to fetch (10, 25, 50, 100, 500, 1000, 5000, or a custom value). Click {{< ui >}}Preview Data{{< /ui >}} to inspect the dataset's columns and rows before mapping them.
3. Under {{< ui >}}Configure Points{{< /ui >}}, map dataset columns to visualization dimensions:
   - {{< ui >}}Label node by{{< /ui >}}: A column whose values uniquely identify and label each point.
   - {{< ui >}}Fill by{{< /ui >}}: A numeric column whose value determines the color of each point.
   - {{< ui >}}Size by{{< /ui >}} (optional): A numeric column whose value scales the relative size of each point.
   - {{< ui >}}Group by{{< /ui >}} (optional): Up to three columns whose values cluster points into nested groups. The order of the selected columns sets the nesting hierarchy: the first column forms the outermost group.
4. {{< ui >}}Style{{< /ui >}} and {{< ui >}}Conditional formats{{< /ui >}} work the same way as in Infrastructure mode.

### Result schema

The dataset that backs a DDSQL host map query must return columns that can be mapped to the following dimensions:

| Dimension | Column type | Description |
|-----------|-------------|--------------|
| Node | String | Uniquely identifies and labels each point. Rows with the same value are merged into a single point. |
| Fill | Numeric | Sets the color of each point using the selected color palette. |
| Size | Numeric | Sets the relative size of each point. |
| Group | String | Clusters points into a nested group. Map up to three columns to `Group`; their selection order defines the nesting hierarchy. |

### Example queries

The following query projects AWS cost by service and account, using cost as the fill value and instance count as the size value:

{{< code-block lang="sql" disable_copy="false" >}}
SELECT
    account_id,
    service_name,
    SUM(cost) AS total_cost,
    COUNT(*) AS instance_count
FROM aws_cost_and_usage
WHERE date_range = 'last_30_days'
GROUP BY account_id, service_name
{{< /code-block >}}

Map `service_name` to {{< ui >}}Label node by{{< /ui >}}, `total_cost` to {{< ui >}}Fill by{{< /ui >}}, `instance_count` to {{< ui >}}Size by{{< /ui >}}, and `account_id` to {{< ui >}}Group by{{< /ui >}} to cluster services by account.

The following query defines a custom topology of services grouped by team and domain, independent of any infrastructure entity:

{{< code-block lang="sql" disable_copy="false" >}}
SELECT
    c.service_name,
    c.team,
    c.domain,
    lib.newer_versions_number AS outdated_dependencies
FROM service_definition c
JOIN library lib ON lib.asset_name = c.service_name
WHERE lib.env = 'production'
GROUP BY c.service_name, c.team, c.domain, lib.newer_versions_number
{{< /code-block >}}

Map `service_name` to {{< ui >}}Label node by{{< /ui >}}, `outdated_dependencies` to {{< ui >}}Fill by{{< /ui >}}, and `domain` and `team` (in that order) to {{< ui >}}Group by{{< /ui >}} to nest services under their domain and team.

### Limits

The widget fetches at most the number of rows configured in {{< ui >}}Display first{{< /ui >}}. If the query's result set exceeds this limit, rows are sorted by the `Fill` column in descending order and only the top rows are visualized. Refine the query's `WHERE` and `GROUP BY` clauses, or lower {{< ui >}}Display first{{< /ui >}}, to keep large result sets responsive.

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
[6]: /notebooks/
