---
title: Check Status Widget
kind: documentation
description: "Graph the current status or number of results for any check performed."
aliases:
    - /graphing/widgets/check_status/
further_reading:
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

Check status shows the current status or number of results for any check performed:

{{< img src="dashboards/widgets/check_status/check_status.png" alt="Check status widget" >}}

## Setup

{{< img src="dashboards/widgets/check_status/check_status_setup.png" alt="Check status widget setup" style="width:80%;">}}

### Configuration

1. Select a previously created service check.
2. Choose a reporting timeframe:
  * Global Time
  * The past 10 minutes
  * The past 30 minutes
  * The past hour
  * The past 4 hours
  * The past day
3. Choose your scope:
    * **A single check**: Select this option if your Check Status widget is for a specific element only, for example: one `host:<HOSTNAME>`, one `service:<SERVICE_NAME>`, etc.
    * **A cluster of checks**: Select this option if your Check Status widget is for a scope of elements i.e all `host`s, all `service`s, etc.

4. After selecting your scope, define your Check Status widget context with the **Reported by** field.
5. Optional: group your checks result according to a custom tag key.

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title" style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

The dedicated [widget JSON schema definition][2] for the check status widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
