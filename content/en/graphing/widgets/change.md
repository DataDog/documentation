---
title: Change Widget
kind: documentation
description: Graph the change in a value over a chosen time period .
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---
The Change graph shows you the change in a value over the time period chosen:

{{< img src="graphing/widgets/change/change.png" alt="Change graph" responsive="true">}}

## Setup

{{< img src="graphing/widgets/change/change_setup.png" alt="Change graph Setup" responsive="true" style="width:80%;">}}

### Configuration

1. Choose a metric to graph. 
2. Choose an aggregation function.
3. Optional: choose a specific context for your widget.
4. Break down your aggregation on a tag key i.e `host`, `service`..
5. Choose the "Compared" period from:
    * an hour before
    * a day before
    * a week before
    * a month before
6. Select to show the `relative` or `absolute` change between the two periods.
7. Select your ranking by sorting your result by:
    * `change`
    * `name`
    * `present value`
    * `past value`
8. Indicate whether `increases` or `decreases` changes are better. The better one is highlighted in green; the other one in red.
9. Optional: display current value.

### Options
#### Display preference 

{{< img src="graphing/widgets/options/display_preferences.png" alt="Display preferences" responsive="true" style="width:80%;">}}

##### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

###### Legend

Use *Show legend on graph* to toggle the legend display on your widget. Optionally, select the number of entries to display.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
