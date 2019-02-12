---
title: Check Status Widget
kind: documentation
description: Graph the current status or number of results for any check performed.
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

Check status shows the current status or number of results for any check performed:

{{< img src="graphing/widgets/check_status/check_status.png" alt="Check status widget" responsive="true">}}

## Setup

{{< img src="graphing/widgets/check_status/check_status_setup.png" alt="Check status widget setup" responsive="true" style="width:80%;">}}

### Configuration

1. Select a previously created Service check.
2. Choose the reporting timeframe:
  * Global Time
  * The past 10 Minutes
  * The past 30 Minutes
  * The past hour
  * The past 4 hours
  * The past day
3. Choose your scope:
    * **A single Check**: Select this option if your Check Status widget is for a specific element only i.e. one `host:<HOSTNAME>`, one `service:<SERVICE_NAME>`...
    * **A Cluster of Checks**: Select this option if your Check Status widget is for a scope of elements i.e all `host`, all `service`..
    
4. After selecting your scope, define your Check Status widget context with the **Reported by** field.
5. Optional - Group your checks result according to a custom Tag Key.

### Options
#### Title

Display a custom title for you widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
