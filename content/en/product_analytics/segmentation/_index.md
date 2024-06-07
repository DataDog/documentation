---
title: Segmentation
kind: documentation
description: Analyze and understand specific groups or segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Segmentation is a feature in Product Analytics that allows you to analyze and understand specific groups or segments of your user base. By segmenting your users based on various characteristics and behaviors, you can uncover valuable insights, identify trends, and make data-driven decisions to optimize your product and user experience. For example, you can create segment users by purchase amount, active users in a given country, users in a trial, or users in a trial who then converted to a paying organization.

## Build a segment

To create a new segment, navigate to **[Digital Experience Monitoring > Product Analytics > User Segments][1]** from the navigation. You have two sources you can choose from when building a new segment:

- RUM data
- External data (upload a Reference Table)

{{< img src="product_analytics/segmentation/segmentation-1.png" alt="Create a user segment based on RUM or external data.">}}

### Using RUM data

To create a new segment using RUM data:

1. Choose the user attribute you want to connect your data with. In the below example, it is `usr.id`, but you can use any user attribute available, such as (`usr.email` or `usr.name`).

2. Under the **Filter your segment** section, you can filter on any attribute collected by the SDK, or custom ones you added to create a granular user segment.

   In the below example, we filtered to all users who were on the `/cart` page, then clicked on the checkout button, and did so from Brazil:

   {{< img src="product_analytics/segmentation/segmentation-2.png" alt="Filter to all users from Brazil who were on the `/cart` page and clicked on the checkout button.">}}

### Using external or third-party data

To create a segment using external or third-party data:

1. See the [Reference Tables][2] documentation for how to upload and create a reference table.
2. Make sure to properly connect the data type (for example, `usr.id`, `usr.name`, or `usr.email`) to the column name.
3. Check to ensure there is data in Product Analytics for users in the segment for accuracy.

## Use segments in the Analytics Explorer

## Sankey

In the Sankey page, you can filter down the visualization to reflect a selected segment of users. This allows you to look at the experience and traffic patterns of a particular set of users in a given segment. The below example shows a Sankey only for users in the "Premium users" segment.

{{< img src="product_analytics/segmentation/segmentation-3.png" alt="Filter down the Sankey visualization to reflect a selected segment of users.">}}

## Analytics Explorer

You can filter down the visualization in the Analytics Explorer to reflect a selected set of users that are in a given segment. The example below shows a list of users in the "Premium users" segment who were active in the last month, organized by the number of sessions they had.

{{< img src="product_analytics/segmentation/segmentation-4.png" alt="Show a list of users in the Premium users segment who were active in the last month, organized by the number of sessions they had.">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: /integrations/guide/reference-tables/?tab=manualupload#validation-rules