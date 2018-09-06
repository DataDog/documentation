---
title: Logstream
kind: documentation
description: "Consult logs matching a selected context"
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: Discover how to process your logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "logs/explorer"
  tag: "Documentation"
  text: See how to explore your logs
disable_toc: true
---

The Logstream is the list of logs that match the selected context. A context is defined by a [search bar](#search-bar) filter and a [time range](#time-range).
You can sort the list by clicking the **date** column header.

{{< img src="logs/explorer/logstream/log_list.png" alt="Logstream" responsive="true" style="width:80%;">}}

### Filtering the Logstream

If you enter a valid query into the [search bar](#search-bar), words that match your query are highlighted, and the logs displayed match your facet criteria:

{{< img src="logs/explorer/logstream/log_list_highlighted.png" alt="Logstream highlighted" responsive="true" style="width:80%;">}}

### Displaying a full log
You can click on any log line to see more details about it:

{{< img src="logs/explorer/logstream/log_in_log_list.png" alt="Log in Logstream" responsive="true" style="width:80%;">}}

### View in context

Click on `View in context` to see log lines dated just before and after a selected log - even if they don't match your filter.

{{< img src="logs/explorer/logstream/view-in-context.gif" alt="View in context" responsive="true" >}}

The context is different according to the situation as we use the `Hostname`, `Service`, `filename` or `container_id` attributes, along with tags to make sure we find the perfect context for your logs.

### Columns

To add more log details to the list, click the **Columns** button and select any facets you want to see:

{{< img src="logs/explorer/logstream/log_list_with_columns.png" alt="Logstream with columns" responsive="true" style="width:80%;">}}

### Multi-line display

{{< img src="logs/explorer/logstream/multi_line_display.png" alt="Multi-line display" responsive="true" style="width:30%;">}}

Choose to display one, three, or ten lines from your logs `message` attributes in your logstream.

* With one line displayed:
{{< img src="logs/explorer/logstream/1_multi_line.png" alt="1 line Multi-line display" responsive="true" style="width:80%;">}}

* With three lines displayed:
{{< img src="logs/explorer/logstream/3_multi_line.png" alt="2 lines with Multi-line display" responsive="true" style="width:80%;">}}

* With ten lines displayed:
{{< img src="logs/explorer/logstream/10_multi_line.png" alt="10 lines with Multi-line display" responsive="true" style="width:80%;">}}

**Note**:  If present, `error.stack` attribute is displayed in priority as it should be used for stack traces.
Remap any stack-trace attribute to this specific attribute with [the attribute remapper Processor][1].