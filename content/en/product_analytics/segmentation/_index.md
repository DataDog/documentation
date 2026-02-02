---
title: Segments
description: Analyze and understand individual users and segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Segmenting helps you focus on specific user groups based on characteristics or behaviors. This makes it easier to uncover insights, identify trends, and make data-driven decisions about your product.

For example, you can segment users by purchase amount, by activity within a specific country, by trial status, or by users who started a trial and later converted to paying customers.

## Build a segment
To create a new segment, navigate to **[Digital Experience Monitoring > Product Analytics > Segments][1]**. You have two sources you can choose from when building a new segment:

- [Product Analytics data](#segment-pana)
- [CSV file](#segment-csv)

{{< img src="product_analytics/segmentation/segments_data_source.png" alt="A view of the Users and Segment page with the option to select Product Analytics or a CSV file as a data source." style="width:55%;">}}

{{% collapse-content title="Using Product Analytics data" level="h4" expanded=false id="segment-pana" %}}

To create a new segment using Product Analytics data:

1. Navigate to the **[Segments](https://app.datadoghq.com/product-analytics/segments)** tab on the Users & Segments page

2. Click the **Create Segment** button. to start building your segment
3. Under the **Select a data source** section, choose **Product Analytics** to see how users engage with your product, like completing key actions or following specific paths. You can then filter the audience by user characteristics to forcus on particualr groups and identify trends.

   In the below image, the segment is filtered to all users who were on the `/cart` page and then clicked on the checkout button (and did so from Brazil) within the same session in the past week:

   {{< img src="product_analytics/segmentation/pana_example_users_brazil_3.png" alt="Segment page filtered to all users from Brazil who were on the `/cart` page and clicked on the checkout button." style="width:100%;">}}

<div class="alert" style="background: #f2ecfc">
<h3 class="text-black">Example: See users who dropped before buying</h3>
<p class="text-black">With the filtering and segmentation capabilities on the <strong>Users & Segments</strong> page, you can determine, for example, which users almost bought an item, but dropped before checking out. <br><br> To begin, you can first filter your users on the <a href="https://app.datadoghq.com/product-analytics/profiles">User Profiles </a> page, then add additional event properties using the <strong> Create Segment</strong> button...
{{< img src="product_analytics/segmentation/segment_create_button_0.png" alt="Definition of a segment grouping people who almost bought an item." style="width:100%">}}

Or, directly click the <strong>Create Segment</strong> button to select your data source:

{{< img src="product_analytics/segmentation/segments_data_source.png" alt="A view of the Users and Segment page with the option to select Product Analytics or a CSV file as a data source." style="width:55%;">}}

On the <a href="https://app.datadoghq.com/product-analytics/segments/create">Create a new Segments</a> page, add the properties specifying the users: <br>
– who **viewed** the <code>/cart</code> page <br>
– **then** <code> did not</code> ...  <br>
– perform the **action** of <code> click on CHECKOUT</code> <br>

{{< img src="product_analytics/segmentation/user_profile_example_1.png" alt="Definition of a segment grouping people who almost bought an item." style="width:80%">}}

You can define additional attributes, such as the <code> device type</code>, to further specify your users.
</div>
{{% /collapse-content %}}

{{% collapse-content title="Importing CSV files" level="h4" expanded=false id="segment-csv" %}}

Click **CSV File** to upload a list of users from your own file. The file needs a column with either `usr.id` or `usr.email`.


{{% /collapse-content %}}

## Use segments across Product Analytics

### In pathways

On the Pathway page, filter the visualization to show a specific segment of users. This allows you to look at the experience and traffic patterns of a particular set of users in a given segment. The following example shows a Pathway diagram only for users in the "Premium Shopist Customers" segment.

{{< img src="product_analytics/segmentation/segmentation-pathways-1.png" alt="Filter down the Pathway visualization to reflect a selected segment of users.">}}

### In analytics explorer

You can filter the data in the Analytics Explorer to reflect a selected set of users in a given segment. The following example shows a list of users in the "Premium Shopist Customers" segment who were active in the last month, organized by the total number of events.

{{< img src="product_analytics/segmentation/segment-analytics-explorer-3.png" alt="Show a list of users in the Premium Shopist Customers segment who were active in the last month, organized by the total number of events">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: /integrations/guide/reference-tables/?tab=manualupload#validation-rules
[3]: https://app.datadoghq.com/product-analytics/profiles
