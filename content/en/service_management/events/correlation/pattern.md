---
title: Pattern-based
kind: Documentation
further_reading:
- link: "service_management/events/correlation/"
  tag: "Documentation"
  text: "Learn about Event Correlation"
---

## Overview

Configure pattern-based correlations to apply custom logic and group events to your specific use case.

## Create a pattern

To create a pattern-based correlation:
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
1. Under *Advanced correlation logic*:
    - Specify the minimum number of correlated events it takes to create a case.
    - Set the time frame you want to correlate and deduplicate events based on your correlation pattern. 


## Preview pattern output

Preview the possible patterns and cases your configuration would potentially create. The preview panel displays the total number of ingested events, how many events would alert, and how many cases would be created based on the configuration. 

Use this data to preview the impact of your correlations and understand the expected output of a pattern.

{{< img src="service_management/events/correlation/pattern/preview_pattern_output.png" alt="Configuration for pattern-based correlation highlighting the preview panel; panel shows the number of ingested events that match your configuration, how many of those events alert, how much deduplication would occur, and the number of cases that would result." style="width:100%;" >}}

## Select a Case Management destination

1. From the *Project* dropdown menu, select from an existing Case to send your grouped events to.
1. (Optional) Add a tag to resulting cases.
1. Click **Save and Activate** to activate this pattern and group events into cases.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation