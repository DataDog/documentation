---
title: Correlation
kind: Documentation
disable_toc: false
further_reading:
- link: "service_management/events/"
  tag: "Documentation"
  text: "Event Management"
- link: "service_management/case_management/"
  tag: "Documentation"
  text: "Case Management"
algolia:
  tags: ["event correlation", "event grouping", "correlation pattern"]
---

## Overview

Event Correlation groups events based on their relationships or on user defined configurations to reduce the number of notifications and issues identified from the environment. Use correlation patterns and cases to: 
* Reduce alert fatigue 
* Reduce the number of tickets and notifications you receive 
* Have all affected teams to be aware of a single issue instead of working in silos

## Configure correlations

You can group events to reduce the number of notifications, and get to the root cause of an issue faster. Get started with correlation patterns either through Datadog's recommended patterns, or through custom configurations.

### Configure patterns

{{< whatsnext desc="Customize your own event groupings and configure your own correlation patterns:" >}}
   {{< nextlink href="service_management/events/correlation/pattern" >}}Pattern based correlation{{< /nextlink >}}
{{< /whatsnext >}}

### Recommended patterns

Datadog automatically suggests correlation patterns based on your environment. Click any of the recommendations to open the configuration for the recommended pattern. Configuration fields are pre-populated.

{{< img src="service_management/events/correlation/recommended_patterns_preview.png" alt="Correlation recommended patterns with the preview panel showing potential cases the pattern would create" style="width:100%;" >}}

## View patterns

View all your configured patterns in the [Correlation page][1]. Get a high level overview of each pattern's time window, how it's grouped, the ratio of events to cases, compression percentage, and the date the pattern was last updated. From the table you can: 
- Sort by last updated to see patterns that were updated most recently
- View related cases
- Toggle to activate or disable a pattern
- Clone or delete a pattern

## Analyze alerts and events in Case Management

{{< img src="service_management/events/correlation/analyze_alerts_and_events.png" alt="Case detail page with an event side panel. Investigate correlated events from a case and analyze related metrics" style="width:100%;" >}}

Event Management correlates related events and automatically consolidates them into a single case. Bring in all the context of related logs, related metrics, and alerting monitors to triage and troubleshoot issues in one place.

From the [Correlation][1], find the pattern you want to analyze and click **Triage Cases** at the end of the same row. You can also click **View All Cases** at the top of the page to view all cases with correlated events in [Case Management][2]. To investigate a case:
1. Open the case you are investigating.
1. From the case Overview, click **Investigation** or **Investigate Correlations and Related Metrics**.
1. Under the *Correlations* section, you can see a list of alerts and events. 
1. (Optional) Select any alerts or events you want to remove that are not related to the case. Click the event to open a side panel detailing related logs and metrics. Troubleshoot issues with all the related data pulled into one page.
1. Under the *Related Metrics* section, compare all related metrics or group by tags.

## Create a notification or ticket

With correlated events, you can configure one notification for a group. So, instead of having 20 notifications and 20 potential issues to investigate, you have one single case and one notification. Combine all your alerts in the Case Management Projects page. There are a few ways to group notifications in Case Management:
- On the Project Settings page, configure the Integrations you want your projects to send notifications to. For setup instructions, see the [Case Management Settings][3] documentation.
- Views in case management group cases based on a configured query. You can set up a notification when a case matching this query is created. To learn how to create a view, see the [Case Management Views][4] documentation.

**Note**: You need to reconfigure underlying monitors to remove multiple notifications. Grouping monitor events does not mute individual notifications.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/cases?query=status%3AOPEN%20creation_source%3AEVENT_MANAGEMENT&page=1&page-size=25&sort=created_at
[3]: /service_management/case_management/settings#set-up-integrations
[4]: /service_management/case_management/view_and_manage#create-a-view