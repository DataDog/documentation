---
title: Check Status Widget
kind: documentation
widget_type: check_status
description: "Graph the current status or number of results for any check performed."
aliases:
- /graphing/widgets/check_status/
further_reading:
- link: "/developers/service_checks"
  tag: "Documentation"
  text: "Learn more about service checks"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

Check status shows the current status or number of results for any check performed:

{{< img src="dashboards/widgets/check_status/check_status.png" alt="Check status widget" >}}

## Setup

### Configuration

1. Select a previously created [service check][1].
2. Choose a reporting time frame. This time frame always includes up to the present, so you can choose an option such as `The past 10 minutes` or `The past 1 day` and it reports a status that includes that time frame up to the present moment. If you choose `Global Time`, the person using the dashboard can select a range using the time frame selector in the upper right, but _they must choose one that includes the present moment_, that is any `past X` time frame. Otherwise the widget is blank.
3. Choose your scope:
    * **A single check**: Select this option if your Check Status widget is for a specific element only, for example: one `host:<HOSTNAME>`, one `service:<SERVICE_NAME>`.
    * **A cluster of checks**: Select this option if your Check Status widget is for a scope of elements as in all `host`s, or all `service`s.

4. After selecting your scope, define your Check Status widget context with the **Reported by** field.

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/service_checks
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
