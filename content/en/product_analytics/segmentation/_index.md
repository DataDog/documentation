---
title: Segments
description: Analyze and understand individual users and segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Segmenting helps you focus on specific user groups based on characteristics or behaviors, enabling you to uncover insights, identify trends, and make data-driven decisions to optimize your product and user experience.

For example, you can segment users by purchase amount, by activity within a specific country, by trial status, or by users who started a trial and later converted to paying customers.

## Build a segment

To create a new segment, navigate to **[Digital Experience Monitoring > Product Analytics > Segments][1]** from the navigation. You have two sources you can choose from when building a new segment:

- Product Analytics data
- External data (upload a Reference Table)

{{< img src="product_analytics/segmentation/user_profile_example_2.png" alt="Create a user segment based on Product Analytics or external data." style="width:55%;">}}


### Using Product Analytics data

To create a new segment using Product Analytics data:

1. Navigate to the **[Segments](https://app.datadoghq.com/product-analytics/segments)** tab on the Users & Segments page

2. Under the **Select a data source** section, choose **Product Analytics** to explore how users interact with your product, such as completing key flows or taking specific actions. You can then narrow the audience using attributes to target specific segments or uncover trends.

   In the below image, the segment is filtered to all users who were on the `/cart` page and then clicked on the checkout button (and did so from Brazil) within the same session in the past week:

   {{< img src="product_analytics/segmentation/pana_example_users_brazil-2.png" alt="Filter to all users from Brazil who were on the `/cart` page and clicked on the checkout button." style="width:100%;">}}

<div class="alert" style="background: #f2ecfc">
<h3 class="text-black">Example: See users who dropped before buying</h3>
<p class="text-black">With the filtering and segmentation capabilities on the <strong>Users & Segments</strong> page, you can determine, for example, which users almost bought an item, but dropped before checking out. <br><br> To begin, you can first filter your users on the <a href="https://app.datadoghq.com/product-analytics/profiles">User Profiles </a> page, then add additional event properties using the <strong> Create Segment</strong> button...
{{< img src="product_analytics/segmentation/user_profile_example_0.png" alt="Definition of a segment grouping people who almost bought an item." style="width:100%">}}


Or you directly click on the <strong> Create Segment</strong> button to select your data source:

{{< img src="product_analytics/segmentation/pana_segment_data_source.png" alt="Definition of a segment grouping people who almost bought an item." style="width:100%">}}

On the <a href="https://app.datadoghq.com/product-analytics/segments/create">Create a new Segments</a> page, add the properties specifying the users: <br>
– who **viewed** the <code>/cart</code> page <br>
– **then** <code> did not</code> ...  <br>
– perform the **action** of <code> click on CHECKOUT</code> <br>

{{< img src="product_analytics/segmentation/user_profile_example_1.png" alt="Definition of a segment grouping people who almost bought an item." style="width:80%">}}

You can define additional attributes, such as the <code> device type</code>, to further specify your users. 
</div>
<br>

### Using external or third-party data

To create a segment using external or third-party data:

1. See the [Reference Tables][2] documentation for how to upload and create a Reference Table.
2. Make sure to properly connect the data type (for example, `usr.id`, `usr.name`, or `usr.email`) to the column name.
3. For accuracy, ensure there is data in Product Analytics for users in the segment.

## Leverage segments across Product Analytics

### In pathways

In the Pathway page, you can filter the data in the visualization to reflect a selected segment of users. This allows you to look at the experience and traffic patterns of a particular set of users in a given segment. The below example shows a Pathway diagram only for users in the "Premium Shopist Customers" segment.

{{< img src="product_analytics/segmentation/segmentation-pathways.png" alt="Filter down the Pathway visualization to reflect a selected segment of users.">}}

### In analytics explorer

You can filter the data in the Analytics Explorer to reflect a selected set of users that are in a given segment. The example below shows a list of users in the "Premium Shopist Customers" segment who were active in the last month, organized by the total number of events.

{{< img src="product_analytics/segmentation/analytics-explorer.png" alt="Show a list of users in the Premium Shopist Customers segment who were active in the last month, organized by the total number of events">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: /integrations/guide/reference-tables/?tab=manualupload#validation-rules
[3]: https://app.datadoghq.com/product-analytics/profiles
