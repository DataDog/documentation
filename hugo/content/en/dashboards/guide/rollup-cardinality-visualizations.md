---
title: Understanding rollup function and cardinality in visualizations
description: Learn how the rollup function affects cardinality in visualizations and how to interpret the results correctly.
further_reading:
- link: "/dashboards/functions/rollup/"
  tag: "Documentation"
  text: "Learn more about the Rollup function"
---

{{< jqmath-vanilla >}}

## Overview

Visualizations in data analysis often rely on aggregation functions to summarize data over time. One common challenge arises when the rollup function and distinct or unique cardinality measures interact with each other, leading to unexpected results when visualizing data.

By aligning expectations with the nature of rollup results and employing clear queries, you can gain valuable insights from your data. This document explains how the rollup function operates, particularly in the context of cardinality, and provides best practices on how to interpret visualization results accurately.

## Understanding cardinality in timeseries

Consider a scenario where you track users visiting a website. Each day for seven days, you observe 100 users, leading you to assume a total of 700 users. However, the actual number of **unique** users over the week might be 400, as many users visit the site on multiple days. This discrepancy arises because each time frame (such as each day) independently counts unique users, inflating the total when compared to a single, longer rollup timeframe.

This counterintuitive result is due to cardinality, which refers to how unique elements in a dataset are counted. The cardinality for each time bucket can be complex. When analyzing users, consider the question: "How many *unique* users visited the site each day this week?" If a user visits on two separate days, they count as unique for each day.

### How rollup affects averages

The [rollup function][1] also significantly impacts how averages are calculated and displayed in visualizations:

- **Smoothing effect**:
   - Shorter time periods (5-minute rollups) show more detailed spikes and variations.
   - Longer time periods (30-minute rollups) create smoother graphs.

- **Average calculations**:
   - In shorter time periods, averages might be lower because Datadog only catches users in that exact moment.
   - In longer time periods, averages might be higher because Datadog catches more instances of users using different devices.

## Example: How rollup affects unique user counts

Visualizations display the sum of values over different intervals, which can create confusion when comparing totals across time periods. For example, a graph might show different totals for the same metric when viewed at different time scales (like 5-minute versus 30-minute intervals). This difference occurs because users can be counted multiple times in shorter time windows, but only once in longer time windows.

This section walks through an example that demonstrates how rollup functions and cardinality interact in practice. Consider a website that tracks user sessions on mobile and desktop.

When you take an average of sessions on mobile and roll it up every 30 minutes, you get a smoothed version of the graph. This smoothing effect is a natural result of the rollup function, making the visualization easier to interpret for longer-term trends.

{{< img src="/dashboards/guide/rollup-cardinality-visualizations/pct_total_mobile_sessions.png" alt="Line chart displaying percentage of total sessions on mobile rolled up every 5 minutes (purple line) compared to 30 minutes (pink line). The purple line is spiky. The pink line is smooth and overlaps with the blue line." style="width:100%;" >}}

{{% collapse-content title="Configuration" level="h4" expanded=false %}}
{{< img src="/dashboards/guide/rollup-cardinality-visualizations/pct_total_mobile_sessions_config.png" alt="Configuration showing the query settings for percentage of total mobile sessions with rollup function applied" style="width:100%;" >}}
{{% /collapse-content %}}

However, when you group by users, the two graphs don't overlap: the 30-minute graph is significantly higher than the 5-minute graph. This might look like a bug at first glance, but it's actually showing how users interact with the service over different time periods.

{{< img src="/dashboards/guide/rollup-cardinality-visualizations/pct_unique_users_mobile.png" alt="Line graph displaying percentage of unique users on mobile rolled up every 5 minutes (purple line) compared to 30 minutes (pink line). The smooth pink line is higher than the spiky purple line." style="width:100%;" >}}

{{% collapse-content title="Configuration" level="h4" expanded=false %}}
{{< img src="/dashboards/guide/rollup-cardinality-visualizations/pct_unique_users_mobile_config.png" alt="Configuration showing the query settings for percentage of unique users on mobile with 5min and 30 min rollup function applied" style="width:100%;" >}}
{{% /collapse-content %}}

The following graph looks at 5-minute versus 30-minute rollups for mobile distinct users and total distinct users. Because the 30-minute rollups are naturally larger than the 5-minute rollups, this graph displays the 30-minute rollups scaled down by a factor of 0.75. For total distinct users, the 5-minute and 30-minute rollups roughly align. However, for mobile distinct users, the 30-minute rollup is significantly higher than the 5-minute rollup. Why?

{{< img src="/dashboards/guide/rollup-cardinality-visualizations/count_total_mobile_users.png" alt="Line graph showing four lines: total distinct users (5-minute rollup), total distinct users (30-minute rollup), mobile distinct users (5-minute rollup), mobile distinct users (30-minute rollup)." style="width:100%;" >}}

{{% collapse-content title="Configuration" level="h4" expanded=false %}}
{{< img src="/dashboards/guide/rollup-cardinality-visualizations/count_total_mobile_users_config.png" alt="Configuration for scaled rollup comparison" style="width:100%;" >}}
{{% /collapse-content %}}

This occurs because when a user appears multiple times during a rollup window, they appear once in the denominator but multiple times in the numerator.

$$\text"cardinality:@usr.name[@type:session @device.type:Mobile]" / \text"cardinality:@usr.name[@type:session]" * 100\$$

Another way to understand this is that when a user appears multiple times in a window, each appearance represents an opportunity to appear in the numerator. In a longer time frame, each user will appear more times, creating more opportunities to (in this case) view the page on mobile.

To illustrate this concretely, imagine users who check the website on computers during the day, and only check on mobile during the morning or evening commute. If half check on the morning commute, half check on the evening commute, and half check on both (which leaves a quarter not checking at all on mobile):

* A 12-hour rollup would show you 50% of users checking on mobile from midnight to noon (morning commute) and 50% checking from noon to midnight (evening commute).

* A 24-hour rollup would show you 75% of users checking on mobile (either commute).

Similarly, a 1-hour rollup might show you 10-20% of users checking on mobile during the commute hours, and <1% during non-commute hours. This is much smaller than the larger timeframes, but still correct.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/rollup/
