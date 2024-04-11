---
title: Pattern-based Correlation
kind: Documentation
further_reading:
- link: "service_management/events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifiying on cases"
---

To get you started Datadog automatically suggests [pattern-based correlations][1] based on your environment. Click any of the recommendations to open the configuration for the recommended pattern. Configuration fields are pre-populated.

{{< img src="service_management/events/correlation/pattern/recommended_patterns_preview.png" alt="Correlation recommended patterns with the preview panel showing potential cases the pattern would create" style="width:100%;" >}}


## Adjusting a pattern

To create or adjust a pattern-based correlation:
1. Navigate to [Correlation][1].
1. Click **+ Add a Pattern**, at the top of the Pattern table. This opens a pattern configuration page.
1. From the dropdown menu, select the alerting sources you want to correlate events for. 

### Advanced settings (optional)
1. Click **Show Advanced Settings**.
1. You can add non-alerting sources and add grouping tags to correlate events.
   
   Non-alerting source
   : is any event that is available in your Event Explorer as an event, but does not have an associated monitor or alert.
   
   Add grouping tags
   : in addition to grouping by out-of-the-box tags like `Service` or `Env`, you can also group by a custom tag.
1. Under **Advanced correlation logic**, you can specify the minimum number of correlated events it takes to create a case and update the timeframe.

    **Timeframe explanation**

    Correlate alerts to a case for
    : The max duration that net new alerts will be added to a case 

    Deduplicate events for those alerts for
    : The max duration current alerts which have been correlated, and continue to flap or have not resolved will be reviewed for, before opening new case....

    {{< img src="service_management/events/correlation/pattern/timeframe.png" alt="timeframe explanation" style="width:90%;" >}}


## Preview pattern output

Preview the possible patterns and cases your configuration would potentially create. The preview panel displays the total number of ingested events, how many events would alert, and how many cases would be created based on the configuration. 

Use this data to preview the impact of your correlations and understand the expected output of a pattern.

{{< img src="service_management/events/correlation/pattern/preview_pattern_output.png" alt="Configuration for pattern-based correlation highlighting the preview panel; panel shows the number of ingested events that match your configuration, how many of those events alert, how much deduplication would occur, and the number of cases that would result." style="width:100%;" >}}

## Select a Case Management destination

1. From the *Project* dropdown menu, select from an existing Case to send your grouped events to.
1. (Optional) Add a tag to resulting cases.
1. Click **Save and Activate** to activate this pattern and group events into cases.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}