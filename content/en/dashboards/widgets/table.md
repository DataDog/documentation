---
title: Table Widget
kind: documentation
widget_type: "query_table"
aliases:
    - /graphing/widgets/table/
further_reading:
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

## Overview

The table visualization is available on timeboards and screenboards. It displays columns of metrics grouped by tag key. For example, see `system.cpu.system` and `system.cpu.user` grouped by `service`:

{{< img src="dashboards/widgets/table/table_widget.png" alt="Table widget"  style="width:80%;">}}

## Setup

### Configuration

* Choose the data to graph (add additional columns as needed):
  * Metric: See the [main graphing documentation][1] to configure a metric query.
  * Log Events: See the [log search documentation][2] to configure a log event query.
  * APM Statistics: See the [APM stats documentation][3] to configure an APM stats query.
* You can rename column headers by setting metric aliases.
* For the **Rows**, choose the tag key to **Group by**. The example below displays `service` rows.
* Choose a limit for the number results (defaults to 10).
* Choose a metric for sorting the table (defaults to the first column).
* Optional: Configure conditional formatting depending on the cell values for each column.

{{< img src="dashboards/widgets/table/table_setup.png" alt="Table setup"  style="width:80%;">}}

## API

The dedicated [widget JSON schema definition][4] for the table widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/#configuring-a-graph
[2]: /logs/search_syntax/
[3]: /dashboards/querying/#configuring-an-apm-stats-graph
[4]: /dashboards/graphing_json/widget_json/
