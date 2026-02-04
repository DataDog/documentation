---
title: Segments
description: Analyze and understand segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Segmenting helps you focus on specific user groups based on characteristics or behaviors. This allows you to uncover insights, identify trends, and make data-driven decisions about your product.

For example, you can segment users by purchase amount, by activity within a specific country, by trial status, or by users who started a trial and later converted to paying customers.

After creating a segment, you can reuse it across charts and dashboards to compare how different groups of users behave.

## Build a segment
To create a segment:
1. Navigate to **[Digital Experience Monitoring > Product Analytics > Segments][1]** and click **Create Segment**.
   
1. Then, select a data source:
   - [Product Analytics data](#segment-pana): Define users based on their activity in your product.
   - [CSV file](#segment-csv): Upload a predefined list of users.

{{< img src="product_analytics/segmentation/segments_data_source.png" alt="A view of the Users and Segments page with the option to select Product Analytics or a CSV file as a data source." style="width:55%;">}}

{{% collapse-content title="Using Product Analytics data" level="h4" expanded=false id="segment-pana" %}}

To create a segment using Product Analytics data:

1. Select **Product Analytics** on the **[Create a new segment](https://app.datadoghq.com/product-analytics/segments/create)** page.

2. Select a **condition** for the users in the segment:
      - **performed event(s)**
      - **have attribute(s)**

<div class="alert alert-info"> You can also define a segment that includes both conditions.</div>

3. Add **filters** to focus on specific users, like those in a particular country or who signed up in the last 30 days.

   In the following image, the segment is filtered to all users who were on the `/cart` page and then clicked the checkout button (and did so from Brazil) within the same session in the past week:

   {{< img src="product_analytics/segmentation/pana_example_users_brazil_3.png" alt="Segment page filtered to all users from Brazil who were on the `/cart` page and clicked on the checkout button." style="width:100%;">}}

<div class="alert" style="background: #f2ecfc">
<h3 class="text-black">Example: See users who dropped before buying</h3>
<p class="text-black">With the filtering and segmentation capabilities on the <strong>Users & Segments</strong> page, you can determine, for example, which users almost bought an item, but dropped before checking out. <br><br> To begin, you can first filter your users on the <a href="https://app.datadoghq.com/product-analytics/profiles">User Profiles </a> page, then add additional event properties using the <strong> Create Segment</strong> button:
{{< img src="product_analytics/segmentation/segment_create_button_0.png" alt="Definition of a segment grouping people who almost bought an item." style="width:100%">}}

Or, directly click <strong>Create Segment</strong> to select your data source:

{{< img src="product_analytics/segmentation/segments_data_source.png" alt="A view of the Users and Segments page with the option to select Product Analytics or a CSV file as a data source." style="width:55%;">}}

On the <a href="https://app.datadoghq.com/product-analytics/segments/create">Create a new segment</a> page, add the properties specifying the users: <br>
– who **viewed** the <code>/cart</code> page <br>
– **then** <code> did not</code> ...  <br>
– perform the **action** of <code> click on CHECKOUT</code> <br>

{{< img src="product_analytics/segmentation/user_profile_example_1.png" alt="Definition of a segment grouping people who almost bought an item." style="width:80%">}}

You can define additional attributes, such as the Device Type, to further specify your users.
</div>

{{% /collapse-content %}}

{{% collapse-content title="Importing CSV files" level="h4" expanded=false id="segment-csv" %}}

If you already have a list of users, for example, from a survey, experiment, or CRM, you can upload it as a CSV file and turn it into a segment.

To create a segment using an uploaded list of users from your own file:

1. Select **CSV File** on the **[Create a new segment](https://app.datadoghq.com/product-analytics/segments/create)** page.

2. Click **Browse files** to upload your CSV file.

The file needs a column containing either user IDs or user emails so the data can be mapped with the `usr.id` or `usr.email` attributes in the Product Analytics platform.

The following example maps the Product Analytics attribute `@usr.id` to the column named `id` in the CSV file.

{{< img src="product_analytics/segmentation/segment_link_csv.png" alt="A view of the CSV import page showing the options for mapping your file to Product Analytics attributes." style="width:80%">}}

{{% /collapse-content %}}

## Use segments across Product Analytics

### In Pathways
Filter the Pathways visualization to focus on a specific segment and see how those users navigate your product. The following example shows the path taken by the "Premium Shopist Customers" segment.

{{< img src="product_analytics/segmentation/segmentation-pathways-1.png" alt="Filter down the Pathways visualization to reflect the journey taken by the Premium Shopist Customers segment.">}}

### In Analytics Explorer

Filter the Analytics Explorer visualization to see how a segment uses your product. The following example shows a list of users in the "Premium Shopist Customers" segment who were active in the last month, organized by the total number of events.

{{< img src="product_analytics/segmentation/segment-analytics-explorer-3.png" alt="Show a list of users in the Premium Shopist Customers segment who were active in the last month, organized by the total number of events">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: /integrations/guide/reference-tables/?tab=manualupload#validation-rules
[3]: https://app.datadoghq.com/product-analytics/profiles
