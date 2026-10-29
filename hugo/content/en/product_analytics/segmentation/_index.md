---
title: Segments
description: Analyze and understand segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Learning Center
  text: Getting Started with Product Analytics
- link: "https://www.datadoghq.com/blog/product-analytics-account-segments/"
  tag: "Blog"
  text: "Investigate account-level churn risk with Product Analytics account segments"
---

## Overview

Segmenting helps you focus on specific groups of users or accounts based on characteristics or behaviors. This allows you to uncover insights, identify trends, and make data-driven decisions about your product.

For example, you can segment users by purchase amount, by activity within a specific country, or by trial status. You can also segment accounts by attributes like annual recurring revenue (ARR) or start date.

After creating a segment, you can reuse it across charts and dashboards to compare how different groups behave.

## Build a segment

To create a segment:

1. Navigate to [{{< ui >}}Digital Experience Monitoring{{</ ui >}} > {{< ui >}}Product Analytics{{</ ui >}} > {{< ui >}}Users{{</ ui >}} > {{< ui >}}Segments{{</ ui >}}][1] and click {{< ui >}}Create Segment{{< /ui >}}.
1. Under {{< ui >}}Define your audience{{< /ui >}}, select the type of profiles to include in the segment:
   - {{< ui >}}Users{{< /ui >}}: Create a segment of individual users.
   - {{< ui >}}Accounts{{< /ui >}}: Create a segment of accounts (organizations).

   <!-- TODO (DOCS-16074): Replace with new screenshot segments_define_audience_1.png: the new segment editor showing Define your audience (Users, Accounts) and Define your segment (Filter Builder, Importing with CSV). -->
   {{< img src="product_analytics/segmentation/segments_define_audience.png" alt="The Create A New Segment page showing the Define your audience section with Users and Accounts options, and the Define your segment section with Filter Builder and Importing with CSV tabs." style="width:55%;">}}

   <div class="alert alert-info">A segment returns either user or account profiles, not both.</div>

1. Under {{< ui >}}Define your segment{{< /ui >}}, select how to build the segment:
   - {{< ui >}}Filter Builder{{< /ui >}}: Add conditions based on events and attributes. See [Using the Filter Builder](#segment-pana).
   - {{< ui >}}Importing with CSV{{< /ui >}}: Upload a list of users or accounts. See [Importing CSV files](#segment-csv).

{{% collapse-content title="Using the Filter Builder" level="h3" expanded=false id="segment-pana" %}}

To create a segment from Product Analytics data:

1. Under {{< ui >}}Define your segment{{< /ui >}}, select {{< ui >}}Filter Builder{{< /ui >}}.
1. Add one or both conditions:
   - {{< ui >}}Performed events{{< /ui >}}: Include users who performed specific events, such as viewing a page or clicking a button.
   - {{< ui >}}Have attributes{{< /ui >}}: Include users with specific attributes, including any custom attributes you've imported. To import custom attributes, see [User and Account Profiles][3].
1. Add filters to focus on specific users, like those in a particular country or who signed up in the last 30 days.

For example, you can segment users from Brazil who viewed the `/cart` page and clicked the checkout button in the same session last week.

<!-- TODO (DOCS-16074): Replace with new screenshot pana_example_users_brazil_4.png: Filter Builder with a country = Brazil filter, a Performed events condition for viewing /cart then clicking checkout in the same session, and a past-week time range. -->
{{< img src="product_analytics/segmentation/pana_example_users_brazil_3.png" alt="Segment page filtered to all users from Brazil who were on the `/cart` page and clicked on the checkout button." style="width:100%;">}}

#### Example: Find users who left before buying

To find users who almost bought an item but didn't check out, use the {{< ui >}}Performed events{{< /ui >}} condition to include users who:

1. Viewed the `/cart` page.
1. Then did not perform the action `click on CHECKOUT`.

<!-- TODO (DOCS-16074): Replace with new screenshot user_profile_example_2.png: Performed events condition for users who viewed /cart, then did not click CHECKOUT. -->
{{< img src="product_analytics/segmentation/user_profile_example_1.png" alt="Definition of a segment grouping people who almost bought an item." style="width:80%">}}

To narrow the segment further, add an attribute condition, such as device type.

You can also start from the [{{< ui >}}User Profiles{{< /ui >}}][2] page. Filter your users, then click {{< ui >}}Create Segment{{< /ui >}} to add event conditions to that group.

{{% /collapse-content %}}

{{% collapse-content title="Importing CSV files" level="h3" expanded=false id="segment-csv" %}}

If you have a list of users from a survey, experiment, or CRM, upload it as a CSV file to turn it into a segment.

To create a segment from your own file:

1. Under {{< ui >}}Define your segment{{< /ui >}}, select {{< ui >}}Importing with CSV{{< /ui >}}.
1. Click {{< ui >}}Browse files{{< /ui >}} and upload your CSV file.
1. Map a column in the file to a Product Analytics attribute.

The file needs a column with user IDs or user emails. Map that column to the `usr.id` or `usr.email` attribute in Product Analytics. For example, map `@usr.id` to a column named `id`.

<!-- TODO (DOCS-16074): Replace with new screenshot segment_link_csv_1.png: Importing with CSV, mapping the @usr.id attribute to a CSV column named id. -->
{{< img src="product_analytics/segmentation/segment_link_csv.png" alt="A view of the CSV import page showing the options for mapping your file to Product Analytics attributes." style="width:80%">}}

{{% /collapse-content %}}

{{% collapse-content title="Account segments" level="h3" expanded=false id="segment-accounts" %}}

Account segments group accounts, such as organizations or companies, based on their attributes or the events their users performed. Use them to analyze groups like accounts with ARR over a specific amount or accounts that adopted a specific feature.

To create an account segment:

1. Under {{< ui >}}Define your audience{{< /ui >}}, select {{< ui >}}Accounts{{< /ui >}}.
1. Under {{< ui >}}Define your segment{{< /ui >}}, select a method:
   - {{< ui >}}Filter Builder{{< /ui >}}: Add one or both conditions:
     - {{< ui >}}Performed events{{< /ui >}}: Include accounts where at least one user performed the specified event.
     - {{< ui >}}Have attributes{{< /ui >}}: Filter by account properties such as ARR, start date, account IDs, or any imported account attributes. To import custom attributes, see [User and Account Profiles][3].
   - {{< ui >}}Importing with CSV{{< /ui >}}: Upload a CSV file with a column of account IDs. The IDs map to the account ID attribute in Product Analytics.

{{% /collapse-content %}}

## Use segments across Product Analytics

### In Pathways
Filter the Pathways visualization by a segment to see how those users move through your product.

{{< img src="product_analytics/segmentation/segmentation-pathways-1.png" alt="Filter down the Pathways visualization to reflect the journey taken by the Premium Shopist Customers segment.">}}

### In Analytics Explorer

Filter the Analytics Explorer visualization by a segment to see how that group uses your product.

{{< img src="product_analytics/segmentation/segment-analytics-explorer-3.png" alt="Show a list of users in the Premium Shopist Customers segment who were active in the last month, organized by the total number of events">}}

### In Funnels

Filter a funnel to a specific segment, or compare multiple segments side by side to see how conversion rates differ between groups.

- To filter a funnel by segment, select **Filter by** and choose your segment.
- To compare segments, select **Compare**, then choose **By property or segment** and select the segments you want to compare.

{{< img src="product_analytics/segmentation/filter_by_segment.png" alt="A funnel analysis filtered by a user segment." style="width:100%;">}}

### In Retention

Apply a segment to a retention analysis to measure how well a specific group of users returns to your product over time. When building a retention graph, select a segment under **Define users** to scope the analysis to that group. You can also use the `group by` function to break down retention across event attributes, such as device type or country.

{{< img src="product_analytics/segmentation/retention_analysis_segments.png" alt="A retention analysis scoped to a user segment." style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: https://app.datadoghq.com/product-analytics/profiles
[3]: /product_analytics/profiles
