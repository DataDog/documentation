---
title: Auto-Processing
description: "Automatically parse custom application logs, review transformations, and manage processing by source and service."
further_reading:
- link: "/logs/log_configuration/pipelines/"
  tag: "Documentation"
  text: "Learn more about log pipelines"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Explore your logs"
---

{{< callout url="https://www.datadoghq.com/product-preview/auto-processing/" header="Auto-Processing is in Preview" >}}
Complete the form to request access.
{{< /callout >}}

## Overview

Auto-Processing parses your custom application logs and extracts core attributes, including timestamp, status, service, trace ID, and span ID. It helps you search, filter, and correlate logs without manually configuring parsing.

Auto-Processing only handles logs that do not match the filter of any existing integration or custom pipeline. If a log matches an existing pipeline's filter, Auto-Processing does not process it, even if that pipeline does not modify the log. Your existing pipeline configurations remain unchanged.

## How it works

Datadog groups supported logs by source and service and creates Auto-Processing entries for them. Datadog manages and updates these entries as new log patterns appear.

Review transformations and control which entries process your logs. Switch an entry to a manual pipeline to customize its configuration.

## Configuration

Go to the [{{< ui >}}Processing{{< /ui >}} page][1] and select the {{< ui >}}Auto-Processing{{< /ui >}} tab.

### Enable or disable the feature

Use the feature toggle to opt your organization in to or out of Auto-Processing.

### Choose how new entries are enabled

When Auto-Processing is on, you can choose how newly created entries are enabled:

- **Automatically enable new entries:** New entries are created enabled and begin processing matching incoming logs.
- **Review new entries before enabling:** New entries are created disabled. Review their transformations, then enable the entries you want to use.

Configure this behavior in the {{< ui >}}Auto-Processing{{< /ui >}} tab. You can also enable or disable individual entries for each source and service.

## Review transformations

1. In the {{< ui >}}Auto-Processing{{< /ui >}} tab, find the source and service you want to review.
2. Select {{< ui >}}View Transformations{{< /ui >}}.
3. Select a log pattern and inspect example logs to compare their original and processed attributes.

Use the entry's toggle in the {{< ui >}}Auto-Processing{{< /ui >}} tab to enable or disable processing for that source and service. Disabling an entry affects future logs only; it does not change logs already processed.

## Switch to a manual pipeline

To customize parsing or attribute names, click {{< ui >}}Switch to manual pipeline{{< /ui >}} on the transformations page.

After conversion, you manage the pipeline's configuration and updates.

## Limitations

- Each organization can have up to **100 Auto-Processing pipelines**.
- Some new log patterns may remain unparsed, even for a source and service that Auto-Processing already covers.
- You cannot directly customize parsing or rename attributes within an Auto-Processing entry. Switch to a manual pipeline when you need these changes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
