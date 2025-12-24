---
title: Pattern-based Correlation
aliases:
- /service_management/events/correlation/patterns/
further_reading:
- link: "service_management/events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifiying on cases"
---

## Overview

Pattern-based correlation allows you to control how the events are correlated. Datadog also uses machine learning to automatically enrich your pattern with related Datadog Monitor events, using underlying telemetry gathered within Datadog and other heuristics.

To get you started, Datadog automatically suggests [pattern-based correlations][1] according to your environment. Click any of the recommendations to open the configuration for the recommended pattern. Configuration fields are pre-populated.

{{< img src="service_management/events/correlation/pattern/recommended_patterns_preview.png" alt="Correlation recommended patterns with the preview panel showing potential cases the pattern would create" style="width:100%;" >}}


## Create a pattern

To create a pattern:
1. Navigate to [Correlation][1].
1. Click **+ Add a Pattern**, at the top of the Pattern table. This opens a pattern configuration page that displays out-of-the-box suggested patterns on the left side, and a pattern output preview on the right side. 
1. You can adjust a suggested pattern by clicking **+ Continue With Pattern**. This takes you to the pre-populated configuration page for additional tuning. Or, you can choose to create your own pattern by clicking **+ Personalize From Scratch**

First, events are deduplicated to alert based on event aggregation key. Then, alerts are correlated to a case based on configuration. 
{{< img src="service_management/events/correlation/correlation_helper.mp4" alt="When events matches defined sources, filter, they get deduplicated to alerts. Alerts are correlated based on grouping attributes, and its events are de-duplicated withint the defined time window before the process repeats in a new case. You can modify these configuration in settings" video=true >}}
For more information on how to sends events with aggregation key, see [send events to datadog][5]. Events without an aggregation key are deduped to one single alert within the timeframe.

### Suggested patterns
Suggested patterns are recommended based on your commonly used service and environment tags to help you get started with event correlation quickly. 

### Configuration
From the [correlation configuration page][2]
1. Select the event source you want to group on from the dropdown.
1. To exclude any events from the source defined above, add an event query in **Filter by these events or tags** to filter them out.
1. Add related events to associate changes or other supplementary events to support case investigation. Related events will be appended to a case but will not create new cases.
1. Define the grouping tags. Grouping tags are event facets. See the [advanced settings section](#advanced-settings-optional) below if you don't see the tag from the dropdown. 
**Note**: you can create facets on both event attribute and tag. To learn more, see the [facets][4] documentation. 

### Advanced settings (optional)
1. Click **Show Advanced Settings**.
1. You can add grouping tags to correlate events and customize case title.
   
   Add grouping tags
   : to add new grouping tags, this is same as adding [new event facet][3].

   Customize case title
   : to create a template to replace the automatically generated case title. You can reference tag template variables using handlebars syntax, for     example "{{tag.service}}", to include a comma-separated list of tag values.
   
1. Under **Advanced correlation logic**, you can specify the minimum number of correlated events it takes to create a case and update the timeframe.

    **Timeframes**

    Correlate alerts to a case for
    : The max duration that net new alerts will be added to a case 

    Deduplicate events for those alerts for
    : The max duration to reflect status transitions for current alerts which have been correlated, but continue to flap or have not resolved. Events are deduped to the corresponding alert in the existing case before opening a new case


## Preview pattern output

Preview the possible patterns and cases your configuration would potentially create. The preview panel displays 
- the total number of ingested events (limited to the first 1000 events).
- the number of alerts that would be deduped from events.
- the number of cases that would be created based on the configuration. 

Use this data to preview the impact of your correlations and understand the expected output of a pattern.

{{< img src="service_management/events/correlation/pattern/preview_pattern_output.png" alt="Configuration for pattern-based correlation highlighting the preview panel; panel shows the number of ingested events that match your configuration, how many of those events alert, how much deduplication would occur, and the number of cases that would result." style="width:100%;" >}}

**Notes**: the default title in the preview case is the first alert in correlation. After you save a pattern, the event management case title is intelligently generated. 

## Select a Case Management destination

1. From the *Project* dropdown menu, select from an existing Case to send your grouped events to.
1. (Optional) Add a tag to resulting cases.
1. Click **Save and Activate** to activate this pattern and group events into cases.

## Update existing pattern
After you update an existing pattern, all live cases will stop processing. New events that match the pattern will create a new case. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/event/correlation/rule/new 
[3]: /service_management/events/explorer/facets/#create-a-facet
[4]: /service_management/events/explorer/facets
[5]: /service_management/events/ingest/
