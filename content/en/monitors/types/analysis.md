---
title: Analysis Monitor
description: "Alert on advanced log analysis with Analysis monitors that support querying multiple data sources, chaining data transformations, and running complex SQL queries."
further_reading:
- link: "/notebooks/advanced_analysis/"
  tag: "Documentation"
  text: "Notebooks Advanced Analysis"
- link: "/monitors/configuration/"
  tag: "Documentation"
  text: "Learn how to configure monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
---

{{< callout btn_hidden="true" header="Join the Preview!">}}
The Analysis monitor is in Preview.
{{< /callout >}}

## Overview

<div class="alert alert-danger">Datasets that include Flex Logs are not supported.</div>

Analysis monitors offer full access to Notebook analysis features, allowing you to alert on complex data patterns that standard monitors may miss. With Analysis monitors, you can:

- Query multiple data sources
- Chain data transformations
- Run complex SQL queries
- Create sophisticated analysis workflows

## Monitor creation

You can create an Analysis monitor in two ways:

### From the Monitors page

To create an [Analysis monitor][1] in Datadog, use the main navigation: **Monitors > New Monitor > Analysis**.

### From a Notebook

To create an Analysis monitor directly from a Notebook:

1. Open a Notebook with an Analysis cell containing your desired query.
2. In the Analysis cell, click the dropdown arrow next to **Save to Dashboard**.
3. Select **Create monitor**.

This allows you to convert your exploratory analysis into an alerting monitor.

## Define the query

Analysis monitors use the same query interface as Notebook Analysis cells.

1. **Select your dataset**: [To confirm] Select from available Notebook Analysis cells.
2. **Filter your dataset**: [To confirm] Filter your results by column.
3. **Preview results**: View the output of your query before setting alert conditions.

{{< img src="/monitors/monitor_types/dataset/dataset_monitor_config.png" alt="Analysis monitor configuration example" style="width:100%;" >}}

## Set alert conditions

Configure monitors to trigger when the query value crosses a threshold, and customize advanced alert options such as recovery thresholds and evaluation delays. For more information, see [Configure Monitors][2].

## Notifications

For detailed instructions on alert messaging, see [Notifications][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/dataset
[2]: /monitors/configuration/
[3]: /monitors/notify/

