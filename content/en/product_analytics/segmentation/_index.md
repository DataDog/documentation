---
title: Segments
description: Analyze and understand segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Segmenting helps you focus on specific user groups based on characteristics or behaviors. This makes it easier to uncover insights, identify trends, and make data-driven decisions about your product.

For example, you can segment users by purchase amount, by activity within a specific country, by trial status, or by users who started a trial and later converted to paying customers.

After a segment is created, it can be reused across charts and dashboards to compare how different groups of users behave.

## Build a segment
To create a new segment, navigate to **[Digital Experience Monitoring > Product Analytics > Segments][1]** and select one of the two sources of data:

- [Product Analytics data](#segment-pana)
- [CSV file](#segment-csv)

{{< img src="product_analytics/segmentation/segments_data_source.png" alt="A view of the Users and Segment page with the option to select Product Analytics or a CSV file as a data source." style="width:55%;">}}

{{% collapse-content title="Using Product Analytics data" level="h4" expanded=false id="segment-pana" %}}

To create a new segment using Product Analytics data:

1. Navigate to the **[Segments](https://app.datadoghq.com/product-analytics/segments)** tab on the Users & Segments page

2. Click **Create Segment**, then select **Product Analytics**.
3. Select a condition for the users: whether they **performed an action**, share similar **attributes**, or **both**.
4. **Filter** by user characteristics to focus on specific users, like those in a particular country or who signed up in the last 30 days.

   In the following image, the segment is filtered to all users who were on the `/cart` page and then clicked the checkout button (and did so from Brazil) within the same session in the past week:

   {{< img src="product_analytics/segmentation/pana_example_users_brazil_3.png" alt="Segment page filtered to all users from Brazil who were on the `/cart` page and clicked on the checkout button." style="width:100%;">}}

<div class="alert" style="background: #f2ecfc">
<h3 class="text-black">Example: See users who dropped before buying</h3>
<p class="text-black">With the filtering and segmentation capabilities on the <strong>Users & Segments</strong> page, you can determine, for example, which users almost bought an item, but dropped before checking out. <br><br> To begin, you can first filter your users on the <a href="https://app.datadoghq.com/product-analytics/profiles">User Profiles </a> page, then add additional event properties using the <strong> Create Segment</strong> button...
{{< img src="product_analytics/segmentation/segment_create_button_0.png" alt="Definition of a segment grouping people who almost bought an item." style="width:100%">}}

Or, directly click the <strong>Create Segment</strong> button to select your data source:

{{< img src="product_analytics/segmentation/segments_data_source.png" alt="A view of the Users and Segment page with the option to select Product Analytics or a CSV file as a data source." style="width:55%;">}}

On the <a href="https://app.datadoghq.com/product-analytics/segments/create">Create a new Segment</a> page, add the properties specifying the users: <br>
– who **viewed** the <code>/cart</code> page <br>
– **then** <code> did not</code> ...  <br>
– perform the **action** of <code> click on CHECKOUT</code> <br>

{{< img src="product_analytics/segmentation/user_profile_example_1.png" alt="Definition of a segment grouping people who almost bought an item." style="width:80%">}}

You can define additional attributes, such as the <code> device type</code>, to further specify your users.
</div>

{{% /collapse-content %}}

{{% collapse-content title="Importing CSV files" level="h4" expanded=false id="segment-csv" %}}

If you already have a list of users, for example, from a survey, experiment, or CRM, you can upload it as a CSV and turn it into a segment. Click **CSV File** to upload a list of users from your own file. The file needs a column with either `usr.id` or `usr.email` so it can be mapped with Product Analytics data. The following example maps the `@user.id` attribute to the column named `id` in the CSV file.

{{< img src="product_analytics/segmentation/segment_link_csv.png" alt="A view of the CSV import page showing the options for mapping your file to Product Analytics attribute." style="width:80%">}}

{{% /collapse-content %}}

## Use segments across Product Analytics

### In pathways
Filter the Pathways visualization to focus on a specific segment and see how those users navigate your product. The following example shows the path taken by the "Premium Shopist Customers" segment navigating your product.

{{< img src="product_analytics/segmentation/segmentation-pathways-1.png" alt="Filter down the Pathways visualization to reflect the journey taken by the "Premium Shopist Customers" segment.">}}

### In analytics explorer

Filter the Analytics Explorer visualization to see how a segment of users use your product. The following example shows a list of users in the "Premium Shopist Customers" segment who were active in the last month, organized by the total number of events.

{{< img src="product_analytics/segmentation/segment-analytics-explorer-3.png" alt="Show a list of users in the Premium Shopist Customers segment who were active in the last month, organized by the total number of events">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: /integrations/guide/reference-tables/?tab=manualupload#validation-rules
[3]: https://app.datadoghq.com/product-analytics/profiles
