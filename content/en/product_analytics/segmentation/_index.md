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
---

## Overview

Segmenting helps you focus on specific groups of users or accounts based on characteristics or behaviors. This allows you to uncover insights, identify trends, and make data-driven decisions about your product.

For example, you can segment users by purchase amount, by activity within a specific country, or by trial status. You can also segment accounts by attributes like annual recurring revenue (ARR) or start date.

After creating a segment, you can reuse it across charts and dashboards to compare how different groups behave.

## Build a segment
To create a segment:
1. Navigate to [{{< ui >}}Digital Experience Monitoring{{</ ui >}} > {{< ui >}}Product Analytics{{</ ui >}} > {{< ui >}}Users{{</ ui >}} > {{< ui >}}Segments{{</ ui >}}][1] and click **Create Segment**.
   
1. Under **Define your audience**, select the type of profiles to include in the segment:
   - **Users**: Create a segment of individual users.
   - **Accounts**: Create a segment of accounts (organizations).

   {{< img src="product_analytics/segmentation/segments_define_audience.png" alt="The Create A New Segment page showing the Define your audience section with Users and Accounts options, and the Define your segment section with Filter Builder and Importing with CSV tabs." style="width:55%;">}}

   <div class="alert alert-info">A segment returns either user or account profiles, not both.</div>

{{% collapse-content title="Using Product Analytics data" level="h4" expanded=false id="segment-pana" %}}

To create a segment using Product Analytics data:

1. Select {{< ui >}}Product Analytics{{</ ui >}} on the **[segment creation page](https://app.datadoghq.com/product-analytics/segments/create)**.

2. Select a **condition** for the users in the segment:
      - **performed event(s)**
      - **have attribute(s)**: includes any custom attributes you've imported. To import custom attributes, see [User and Account Profiles][4].

<div class="alert alert-info"> You can also define a segment that includes both conditions.</div>

3. Add {{< ui >}}filters{{< /ui >}} to focus on specific users, like those in a particular country or who signed up in the last 30 days.

   The following image shows a segment filtered to users from Brazil. The segment captures users who were on the `/cart` page and clicked the checkout button within the same session in the past week:

   {{< img src="product_analytics/segmentation/pana_example_users_brazil_3.png" alt="Segment page filtered to all users from Brazil who were on the `/cart` page and clicked on the checkout button." style="width:100%;">}}

<div class="alert" style="background: #f2ecfc">
<h3 class="text-black">Example: See users who dropped before buying</h3>
<p class="text-black">The {{< ui >}}Users & Segments{{</ ui >}} page lets you determine which users almost bought an item but dropped before checking out. <br><br> To begin, filter your users on the <a href="https://app.datadoghq.com/product-analytics/profiles">{{< ui >}}User Profiles{{</ ui >}}</a> page, then add additional event properties using the {{< ui >}}Create Segment{{< /ui >}} button:
{{< img src="product_analytics/segmentation/segment_create_button_0.png" alt="Definition of a segment grouping people who almost bought an item." style="width:100%">}}

Or, directly click {{< ui >}}Create Segment{{< /ui >}} to select your data source:

{{< img src="product_analytics/segmentation/segments_data_source.png" alt="A view of the Users and Segments page with the option to select Product Analytics or a CSV file as a data source." style="width:55%;">}}

On the <a href="https://app.datadoghq.com/product-analytics/segments/create">segment creation page</a>, add the properties specifying the users: <br>
- who **viewed** the <code>/cart</code> page <br>
- **then** <code> did not</code> <br>
- perform the **action** of <code> click on CHECKOUT</code> <br>

{{< img src="product_analytics/segmentation/user_profile_example_1.png" alt="Definition of a segment grouping people who almost bought an item." style="width:80%">}}

You can define additional attributes, such as the Device Type, to further specify your users.
</div>

{{% /collapse-content %}}

{{% collapse-content title="Importing CSV files" level="h4" expanded=false id="segment-csv" %}}

If you have a list of users from a survey, experiment, or CRM, upload it as a CSV file to turn it into a segment.

To create a segment using an uploaded list of users from your own file:

1. Select {{< ui >}}CSV File{{</ ui >}} on the [segment creation page](https://app.datadoghq.com/product-analytics/segments/create).

2. Click {{< ui >}}Browse files{{< /ui >}} to upload your CSV file.

The file needs a column with user IDs or user emails to map with the `usr.id` or `usr.email` attributes in Product Analytics.

The following example maps the Product Analytics attribute `@usr.id` to the column named `id` in the CSV file.

{{< img src="product_analytics/segmentation/segment_link_csv.png" alt="A view of the CSV import page showing the options for mapping your file to Product Analytics attributes." style="width:80%">}}

{{% /collapse-content %}}

{{% collapse-content title="Account segments" level="h4" expanded=false id="segment-accounts" %}}

Account segments group accounts—such as organizations or companies—based on their attributes or the events their users performed. Use them to analyze groups like accounts with ARR over a specific amount or accounts that adopted a specific feature.

To create an account segment:

1. Select **Accounts** under **Define your audience**.

2. Under **Define your segment**, select a method:
   - **Filter Builder**: Add conditions to filter accounts by attributes or events.
   - **Importing with CSV**: Upload a predefined list of account IDs.

**Filter Builder**

Add one or both conditions:
- **Performed events**: Matches accounts where at least one user performed the specified event.
- **Have attributes**: Filter by account properties such as ARR, start date, account IDs, or any imported account attributes. To import custom attributes, see [User and Account Profiles][4].

**Importing with CSV**

Upload a CSV file with a column containing account IDs. The account IDs map to the account ID attribute in Product Analytics.

{{% /collapse-content %}}

## Use segments across Product Analytics

### In Pathways
Filter the Pathways visualization to focus on a specific segment and see how those users navigate your product. The following example shows paths taken by the "Premium Shopist Customers" segment.

{{< img src="product_analytics/segmentation/segmentation-pathways-1.png" alt="Filter down the Pathways visualization to reflect the journey taken by the Premium Shopist Customers segment.">}}

### In Analytics Explorer

Filter the Analytics Explorer visualization to see how a segment uses your product. The following example shows users in the "Premium Shopist Customers" segment who were active in the last month, organized by total events.

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
[2]: /integrations/guide/reference-tables/?tab=manualupload#validation-rules
[3]: https://app.datadoghq.com/product-analytics/profiles
[4]: /product_analytics/profiles
