---
title: List Widget
kind: documentation
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Notebooks"
---

The list widget enables you to display a list of events and issues coming from different sources.

_List widget displaying error tracking issues_

{{< img src="dashboards/widgets/list/list_overview.png" alt="List widget displaying a list of errors, their error count and volume." style="width:50%;">}}

## Setup

{{< img src="dashboards/widgets/list/list_setup.png" alt="List widget configuration modal" style="width:100%;">}}

### Configuration

1. Choose the type of data to graph. You can create a list widget from Issues, Logs, Audit Trail, or Events depending on which products are available for your organization.

2. Set display preferences. On screenboards and notebooks, choose whether your widget has a custom timeframe or uses the global timeframe.

3. Optional: Give your graph a title (or leave blank for suggested title).

### Options

Each type of list widget has its own configuration.

### Issues

#### Sorting by

For issues, you can sort by:

* Number of errors (default)
* First seen
* Impacted sessions

**Note:** Changing the "Sorting by" selection does not change the columns displayed. If you change your list to sort by impacted sessions, and want to see this on your widget, you must also select or add "Impacted Sessions" to the graph editor.

### Logs

#### Grouping by

For logs, you can group by:

* Patterns
* Transactions

<!-- Pending GA
### RUM event list options

#### Sorting by

For RUM, you can sort by:

* Session type
* Time spent
* View count
* Error count
* Action count
* Session frustration count
* Initial view name
* Last view name

Ascending or descending -->

### Events

#### Report format size:

For Events, you can choose how they're displayed in the widget:

* Small (title only)
* Large (full event)

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
