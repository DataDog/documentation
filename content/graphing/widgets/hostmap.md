---
title: Hostmap Widget
kind: documentation
description: Display the Datadog hostmap in your dashboards.
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

The host map graphs any metric for any subset of hosts on the same host map visualization available from the main [Infrastructure Host Map][1] menu:

{{< img src="graphing/widgets/hostmap/hostmap.png" alt="Host Map" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/hostmap/hostmap_setup.png" alt="Host Map Setup" responsive="true" >}}

### Configuration

Configuration of the Hostmap widget works as the main [Hostmap page][1]:

1. Choose to display `host` or `containers`
2. `Filter by` : Choose which hosts/containers to display
3. `Group by`: Aggregate your hosts/containers depending of one or several Tag.
4. Choose a metric to fill your hostmap elements.
5. Optional - Choose a metric to size your hostmap elements.
6. Optional - Define a color palette with a `min` and `max` color palette value.

### Options
#### Title

Display a custom title for you widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /graphing/infrastructure/hostmap
