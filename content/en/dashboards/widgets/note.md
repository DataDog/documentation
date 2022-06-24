---
title: Notes and Links Widget
kind: documentation
description: "Display text in your Screenboards."
aliases:
    - /graphing/widgets/note/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The notes and links widget is similar to [free text widget][1], but allows for more formatting options.

## Setup

{{< img src="dashboards/widgets/note/using_link_note_widget.mp4" alt="Notes and links widget setup" video="true" style="width:80%;" >}}

1. Enter the text you want to display. **Note**: Markdown is supported.
2. Choose the text size and the note background color.
3. Select the pointer position.

This widget supports template variables. Use `$<VARIABLE_NAME>.value` syntax to dynamically update the widget content. For example, `$env.value` updates the value of a link to the selected environment.

{{< img src="dashboards/widgets/note/template_var.jpeg" alt="Notes and links widget template variables" style="width:100%;" >}}


## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][2] for additional reference.

The dedicated [widget JSON schema definition][3] for the note widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/free_text/
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
