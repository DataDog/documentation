---
title: Free Text Widget
kind: documentation
description: "Display text in your Screenboards."
aliases:
    - /graphing/widgets/free_text/
further_reading:
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

Free text is a widget that allows you to add headings to your [screenboard][1].

This is commonly used to state the overall purpose of the dashboard.

{{< img src="dashboards/widgets/free_text/free_text.png" alt="Free Text" >}}

## Setup

{{< img src="dashboards/widgets/free_text/free_text_setup.png" alt="Free Text Setup"  style="width:80%;">}}

### Configuration

1. Enter text to display.
2. Choose your text formating.

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][2] documentation for additional reference.

The dedicated [widget JSON schema definition][3] for the free text widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/screenboard/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
