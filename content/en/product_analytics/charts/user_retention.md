---
title: User Retention
aliases:
- /product_analytics/user_retention/
description: Measure user retention to understand overall user satisfaction with your application.
further_reading:
    - link: '/product_analytics/'
      tag: Documentation
      text: Product Analytics
---

## Overview
Retention Analysis allows you to measure how often users are successfully returning to a page or action. By tracking user retention over time, you can gain insights into overall user satisfaction.

User retention is measured within a given cohort of users that you define. A cohort is a group of users who participate in an initial event, such as clicking a link. A user in the cohort is considered retained if they subsequently complete a return event, such as clicking the same link again or clicking a **Proceed to Payment** button. 

Only views and actions can act as events.

The retention graph displays the percentage of users who completed the return event each day during the past week.

{{< img src="product_analytics/retention/pana_retention_overview-2.png" alt="Example Retention Analysis graph" style="width:100%;" >}}

<div class="alert alert-info">
<strong>Note:</strong> The retention chart displays grey when partial data is available for a given time period or cohort. This is because the time period is not finished and Datadog cannot yet accurately compute the retention rate. 
</div>


You can further scope the retention measure based on when the return event occurs to identify the users who have completely churned from a product or feature. 

- `Return on or after`: the user has to complete the "Return event" on or after the period to be counted as retained. 

- `Return on`: the user has to do the "Return event" on the period to be counted as retained.
It's useful to understand the likelihood of a user to come back after a given period.


## Prerequisites

In order for User Retention data to populate, you must set the `usr.id` attribute in your SDK. See the [instructions for sending unique user attributes][4].

## Build a graph

To build a retention graph, navigate to **[Product Analytics > Charts][1]**, click the **Retention** tab, then follow the steps below.

### 1. Define the starting and return events
1. Select the view or action to act as the starting event for defining a group of users.<br>
2. Select the view or action to act as the return event.

### 2. Define the the measures
1. Select `Retention rate` to see the data in percentages, or `Unique users` to see the absolute number of users. 
2. Scope the retention measure `Return on or after` or `Return on` based on when the return event occurs.
3. Choose the timeframe (day, week or month) which define the rows in your diagram, then scope to the appropriate duration for your columns. For example, in the `Measure by` section, you can select `Each day` and have the duration of this measure be for the past week. 

{{< img src="product_analytics/retention/pana_retention_timeframes.png" alt="Example Retention Analysis graph" style="width:100%;" >}}



### 3. Define the users
Optionally, select a specific [segment][6] to measure the retention of its users. This defaults to All users.

### 4. Add filters
Optionally, add any desired filter criteria, such as the user's country, device type, or operating system.


## Analyze the graph
For insights on user retention week over week, read each row of the graph horizontally from left to right. 

You can click on an individual diagram cell to view a list of users, and export the list as a CSV:

{{< img src="product_analytics/retention/pana_retention_export.png" alt="Details panel for a diagram cell" style="width:90%;" >}}

The graph displays slightly different information depending on whether the initial and return events match.

### Matching events 
If the starting and returning events match:
- **Week 0** is always 100%, since it represents all of the users who completed the initial event.
- The other cells compare the viewers in a given week to **Week 0**, displaying the percentage of the cohort who completed the event in that week.

{{< img src="real_user_monitoring/retention_analysis/matching-events-retention-graph.png" alt="Retention graph for matching events" style="width:90%;" >}}

Reading the **Dec 04 2023** row of the above graph from left to right:
- 94% of the people who completed the event in **Week 0** came back and completed it again in **Week 1**.
- 92% of the people who completed the event in **Week 0** came back and completed it again in **Week 2**.

### Differing events
If the starting and returning events differ:
- **Week 0** represents users who completed both the initial and return events.
- After **Week 0**, each cell displays the percentage of the **Users** column who completed the return event in that week.

{{< img src="real_user_monitoring/retention_analysis/differing-events-retention-graph.png" alt="Retention graph for differing events" style="width:90%;" >}}

Reading the **Dec 04 2023** row of the above graph from left to right:
- 144 users completed the initial event.
- In **Week 0**, 94% of those 144 users completed the return event.
- In **Week 1**, 92% of the 144 users completed the return event.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/retention-analysis
[2]: /real_user_monitoring/browser/data_collected/#view-attributes
[3]: /real_user_monitoring/browser/data_collected/#action-timing-metrics
[4]: /real_user_monitoring/browser/advanced_configuration#user-session
[5]: /help
[6]: https://app.datadoghq.com/product-analytics/segments
