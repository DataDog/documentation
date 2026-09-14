---
title: Pattern-based Correlation
aliases:
- /service_management/events/correlation/patterns/
further_reading:
- link: "events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifying on work items"
---

## Overview

Pattern-based correlation allows you to control how the events are correlated. Datadog also uses machine learning to automatically enrich your pattern with related Datadog Monitor events, using underlying telemetry gathered within Datadog and other heuristics.

To get you started, Datadog automatically suggests [pattern-based correlations][1] according to your environment. Click any of the recommendations to open the configuration for the recommended pattern. Configuration fields are pre-populated.

## Create a pattern

To create a pattern:
1. Navigate to [Correlation][1].
1. Click {{< ui >}}+ Add a Pattern{{< /ui >}}, at the top of the Pattern table. This opens a pattern configuration page that displays out-of-the-box suggested patterns on the left side, and a pattern output preview on the right side. 
1. You can adjust a suggested pattern by clicking {{< ui >}}+ Continue With Pattern{{< /ui >}}. This takes you to the pre-populated configuration page for additional tuning. Or, you can choose to create your own pattern by clicking {{< ui >}}+ Personalize From Scratch{{< /ui >}}

First, events are deduplicated to alert based on event aggregation key. Then, alerts are correlated to a work item based on configuration. 
{{< img src="events/correlation/correlation_helper.mp4" alt="When events matches defined sources, filter, they get deduplicated to alerts. Alerts are correlated based on grouping attributes, and its events are de-duplicated withint the defined time window before the process repeats in a new work item. You can modify these configuration in settings" video=true >}}
For more information on how to sends events with aggregation key, see [send events to datadog][5]. Events without an aggregation key are deduped to one single alert within the timeframe.

### Suggested patterns
Suggested patterns are recommended based on your commonly used service and environment tags to help you get started with event correlation quickly. 

### Configuration
From the [correlation configuration page][2]
1. Select the event source you want to group on from the dropdown.
1. To exclude any events from the source defined above, add an event query in {{< ui >}}Filter by these events or tags{{< /ui >}} to filter them out.
1. Add related events to associate changes or other supplementary events to support work item investigation. Related events will be appended to a work item but will not create new work items.
1. Define the grouping tags. Grouping tags are event facets. See the [advanced settings section](#advanced-settings-optional) below if you don't see the tag from the dropdown. 
**Note**: you can create facets on both event attribute and tag. To learn more, see the [facets][4] documentation. 

### Advanced settings (optional)
1. Click {{< ui >}}Show Advanced Settings{{< /ui >}}.
1. You can add grouping tags to correlate events and customize work item title.
   
   Add grouping tags
   : to add new grouping tags, this is same as adding [new event facet][3].

   Customize work item title
   : to create a template to replace the automatically generated work item title. You can reference tag template variables using handlebars syntax, for     example "{{tag.service}}", to include a comma-separated list of tag values.
   
1. Under {{< ui >}}Advanced correlation logic{{< /ui >}}, you can specify the minimum number of correlated events it takes to create a work item and update the timeframe.

    {{< ui >}}Timeframes{{< /ui >}}

    Correlate alerts to a work item for
    : The max duration that net new alerts will be added to a work item 

    Deduplicate events for those alerts for
    : The max duration to reflect status transitions for current alerts which have been correlated, but continue to flap or have not resolved. Events are deduped to the corresponding alert in the existing work item before opening a new work item


## Preview pattern output

Preview the possible patterns and work items your configuration would potentially create. The preview panel displays 
- the total number of ingested events (limited to the first 1000 events).
- the number of alerts that would be deduped from events.
- the number of work items that would be created based on the configuration. 

Use this data to preview the impact of your correlations and understand the expected output of a pattern.

**Notes**: the default title in the preview work item is the first alert in correlation. After you save a pattern, the event management work item title is intelligently generated. 

## Select a Work Management destination

1. From the {{< ui >}}Project{{< /ui >}} dropdown menu, select from an existing work item to send your grouped events to.
1. (Optional) Add a tag to resulting work items.
1. Click {{< ui >}}Save and Activate{{< /ui >}} to activate this pattern and group events into work items.

## Update existing pattern
After you update an existing pattern, all live work items will stop processing. New events that match the pattern will create a new work item. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new 
[3]: /events/explorer/facets/#create-a-facet
[4]: /events/explorer/facets
[5]: /events/ingest/
