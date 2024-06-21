---
title: User Retention
kind: documentation
aliases:
- /real_user_monitoring/retention_analysis
- /real_user_monitoring/product_analytics/retention_analysis
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in limited availability. To request access, complete the form.
{{< /callout >}}

## Overview
Retention Analysis allows you to measure how often users are successfully returning to a page or action. By tracking user retention over time, you can gain insights into overall user satisfaction.

User retention is measured within a given cohort of users that you define. A cohort is a group of users who participate in an initial event, such as clicking a link. A user in the cohort is considered retained if they subsequently complete a return event, such as clicking the same link again or clicking a **Proceed to Payment** button. Only views and actions can act as events.

The retention graph displays the percentage of users who completed the return event each week.

{{< img src="real_user_monitoring/retention_analysis/example-retention-analysis-graph.png" alt="Example Retention Analysis graph" style="width:100%;" >}}

## Prerequisites

The unique user attributes field must be populated. See the [instructions for sending unique user attributes][4].

## Build a graph

To build a retention graph, navigate to **[Digital Experience > Product Analytics > Retention Analysis][1]**, which takes you to the **User Retention** page, then follow the steps below.

### 1. Define the initial event
1. Select the view or action to act as the initial event for defining a group of users.
2. Optionally, add filters such as the device used or the country of origin.
    - If your initial event is a view, you can add any [view facets][2] or context facets.
    - If your initial event is an action, you can add any [action facets][3] or context facets.

### 2. Optionally, define the return event
The return event defaults to a repeat of the original event. To use a different return event: 

1. Change **Repeated the original event** to **Experienced a different event**.
2. Select the view or action to act as the return event.
3. Optionally, add any desired filter criteria, such as the user's operating system.

## Analyze the graph
For insights on user retention week over week, read each row of the graph horizontally from left to right. 

You can click on an individual diagram cell to view a list of users, and export the list as a CSV:

{{< img src="real_user_monitoring/retention_analysis/retention-analysis-graph-details-panel.png" alt="Details panel for a diagram cell" style="width:90%;" >}}

The graph displays slightly different information depending on whether the initial and return events match.

### Matching events
If the events match:
- **Week 0** is always 100%, since it represents all of the users who completed the initial event.
- The other cells compare the viewers in a given week to **Week 0**, displaying the percentage of the cohort who completed the event in that week.

{{< img src="real_user_monitoring/retention_analysis/matching-events-retention-graph.png" alt="Retention graph for matching events" style="width:90%;" >}}

Reading the **Dec 04 2023** row of the above graph from left to right:
- 94% of the people who completed the event in **Week 0** came back and completed it again in **Week 1**.
- 92% of the people who completed the event in **Week 0** came back and completed it again in **Week 2**.

### Differing events
If the events differ:
- **Week 0** represents users who completed both the initial and return events.
- After **Week 0**, each cell displays the percentage of the **Users** column who completed the return event in that week.

{{< img src="real_user_monitoring/retention_analysis/differing-events-retention-graph.png" alt="Retention graph for differing events" style="width:90%;" >}}

Reading the **Dec 04 2023** row of the above graph from left to right:
- 144 users completed the initial event.
- In **Week 0**, 94% of those 144 users completed the return event.
- In **Week 1**, 92% of the 144 users completed the return event.

## Data retention

Data retention for this feature is limited to 30 days unless your organization is configured to retain data for 90 days. You can file a [support ticket][5] to increase retention to 90 days at no additional cost.

[1]: https://app.datadoghq.com/rum/retention-analysis
[2]: /real_user_monitoring/browser/data_collected/#view-attributes
[3]: /real_user_monitoring/browser/data_collected/#action-timing-metrics
[4]: /real_user_monitoring/browser/advanced_configuration#user-session
[5]: /help
