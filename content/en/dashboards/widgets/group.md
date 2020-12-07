---
title: Group Widget
kind: documentation
description: "Group your widgets together in a Timeboard."
aliases:
    - /graphing/widgets/group/
further_reading:
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The groups widget allows you to keep similar graphs together on your [timeboard][1]. Each group has a custom header, can hold one to many graphs, and is collapsible:

{{< img src="dashboards/widgets/group/group.mp4" alt="Group Widget" video="true"  >}}

## Setup

Choose a name for your group by using the cog icon in the upper right corner of your group.

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][2] documentation for additional reference.

The dedicated [widget JSON schema definition][3] for the change widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/timeboard/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
