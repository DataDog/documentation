---
title: Analysis Monitor
description: "Alert on advanced log analysis with Analysis monitors that support querying multiple data sources, chaining data transformations, and running complex SQL queries."
site_support_id: advanced_analysis
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

## Overview

Analysis monitors offer full access to Notebook analysis and DDSQL features, allowing you to alert on complex data patterns that standard monitors may miss. With Analysis monitors, you can:

- Query multiple data sources
- Chain data transformations
- Run complex SQL queries
- Create sophisticated analysis workflows

## Supported data sources

Analysis monitors support a subset of the data sources available in Notebook Analysis cells and DDSQL queries. Because monitors evaluate their queries frequently, each data source is enabled only after it's validated to handle monitor-level query load.

The following data sources are supported. Any data source not on this list is not supported for monitoring:

- Agent Observability
- Audit
- CI Pipelines
- CI Tests
- Events
- Logs
- Metrics
- NetFlow
- Network
- Reference Tables
- RUM
- Service Checks
- Spans

Published analyses are supported only when every data source they depend on is also supported.

Logs stored in Flex Logs are not supported for monitoring, even though Logs is a supported data source.

Unsupported data sources include Cloud Cost, Database Queries, Dora Metrics, Infrastructure Resources, Monitor Groups, Monitors, Product Analytics, Security Findings, Security Signals, Snowflake Query, and Synthetics.

If you select a published analysis built on an unsupported data source, Datadog displays an error that names the source. For example:

`Dataset is based on an unsupported datasource for monitoring: Infrastructure Resources`

If the analysis is built on logs in Flex storage, Datadog displays this error instead:

`Dataset is based on Flex logs which are not supported for monitoring`

## Monitor creation

You can create an Analysis monitor in three ways:

### From the Monitors page

To create an [Analysis monitor][1] in Datadog, use the main navigation: {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Analysis{{< /ui >}}.

### From a Notebook

To create an Analysis monitor directly from a Notebook:

1. Open a Notebook with an Analysis cell containing your desired query.
2. In the Analysis cell, click {{< ui >}}Send To{{< /ui >}}.
3. Select {{< ui >}}Monitors{{< /ui >}}.

This allows you to convert your exploratory analysis into an alerting monitor.

### From the DDSQL Editor

To create an Analysis monitor directly from the DDSQL Editor:

1. Open the [DDSQL Editor][4] and select your desired query.
2. Click the dropdown arrow next to {{< ui >}}Save to dashboard{{< /ui >}}.
3. Select {{< ui >}}Create monitor{{< /ui >}}.

## Define the query

1. **Select your published analysis**: Select from available Notebook or DDSQL published analyses.
2. **Filter your published analysis**: Filter your results by column.
3. **Preview results**: View the output of your query before setting alert conditions.

{{< img src="/monitors/monitor_types/analysis/analysis_monitor_config.png" alt="Analysis monitor configuration example" style="width:100%;" >}}

## Set alert conditions

Configure monitors to trigger when the query value crosses a threshold, and customize advanced alert options such as recovery thresholds and evaluation delays. For more information, see [Configure Monitors][2].

## Notifications

For detailed instructions on alert messaging, see [Notifications][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/analysis
[2]: /monitors/configuration/
[3]: /monitors/notify/
[4]: https://app.datadoghq.com/ddsql/editor
