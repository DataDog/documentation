---
title: Analyzing users and segments
description: Analyze and understand individual users and segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

Analyze and understand individual users or segments (groups based on common characteristics) of your user base using the [User Profiles][3] and the [Segments][1] features. 

The User Profiles page lists data about your product's users. You can **search**, **sort**, and **filter** this list to find key users. You can use the [user profile attributes](#user-profile-attributes) to filter on the users you want, or [create a segment](#build-a-segment), to better analyze and understand usage of your product across a group. 

The segments page includes a list of all of the segments you have created. You can also create a segment from this page. Segmenting helps you to focus on some of your users based on various characteristics and behaviors to uncover valuable insights, identify trends, and make data-driven decisions that optimize your product and user experience. For example, you can segment users by purchase amount, active users in a given country, users in a trial, or users in a trial who then converted to a paying organization. 


## User profiles 

The [User Profiles][3] page allows you to track and analyze the behavioral patterns of key users. You can scope down to specific users' behavioral data to help inform your decisions on product optimization and feature adoption. 

{{< img src="product_analytics/segmentation/user_profiles_pana.png" alt="A view of the User profiles page." >}}

<div class="alert" style="background: #f2ecfc">
<h3 class="text-black">Example: See users who dropped before buying</h3>
<p class="text-black">With the filtering capability on the User Profiles page, you can determine which users almost bought an item, but dropped before checking out. <br><br> Use the <code>Last Seen</code> and <code>Last Seen Application</code> attributes and specify the sessions that reached <code>Cart</code> but dropped before reaching the <code>click on CHECKOUT</code> step. Optionally, select the <code>Device Type</code> to further narrow this down.</p>

{{< img src="product_analytics/segmentation/almost-bought_pana-2.png" alt="A view of the User profiles page.">}}

</div>
<br>

### User profile attributes

Each user profile on the page has attributes to help you better segment your users. You can conduct a full-text search on `username` or `email`, plus sort and filter based on any of these attributes:

{{% collapse-content title="List of user profile attributes" level="h5" expanded=true id="id-for-anchoring" %}}

<!-- #### User attributes  -->
User ID `REQUIRED`
: `type:string` <br> A unique user identifier.<br> 

User Email
: `type:string` <br> The user's email address.

User Name
: `type:string` <br> The user's full name.

<!-- #### Time based attributes  -->
First Seen
: `type:timestamp` <br> The date of the user's first session.

Last Seen
: `type:timestamp`  <br> The date of the user's most recent session.


<!-- #### application based attributes  -->
First Seen Application
: `type:string`  <br> The ID of the first application the user accessed.

Last Seen Application
: `type:string`  <br> The ID of the last application the user accessed.


<!-- #### Geo based attributes  -->
First City
: `type:string` <br> The city of the user's first session.

Last City
: `type:string` <br> The city of the user's last session.

First Seen Country 
: `type:string` <br> The ISO code of the country for the user's first session. The country's code is saved in the backend and the country's name is displayed in the UI.

Last Seen Country
: `type:string` <br> The ISO code of the country for the user's last session. The country's code is saved in the backend and the country's name is displayed in the UI.

First Region
: `type:string` <br> The region of the user's first session.

Last Region
: `type:string` <br> The region of the user's last session.


<!-- #### Device related attributes  -->
First Device Type
: `type:string` <br> The device used in the user's first session (for example: desktop, tablet).

Last Device Type
: `type:string` <br> The device used in the user's last session (for example: desktop, tablet).


<!-- #### OS related attributes  -->
First OS Name
: `type:string` <br> The operating system of the user's first session (for example: Windows, iOS).

Last OS Name
: `type:string` <br> The operating system of the user's last session (for example: Windows, iOS).

First OS Version
: `type:string` <br> The OS version of the user's first session.

Last OS Version
: `type:string` <br> The OS version of the user's last session.


<!-- #### Browser related attributes  -->
First Browser Name
: `type:string` <br> The browser used in the user's first session (for example: Chrome, Safari).

Last Browser Name
: `type:string` <br> The browser used in the user's last session (for example: Chrome, Safari).

First Browser Version
: `type:string` <br> The browser version from the user's first session.

Last Browser Version
: `type:string` <br> The browser version from the user's last session.

{{% /collapse-content %}} 
<br>

### How profiles are sourced

User profiles are sourced from RUM events using `usr.id` as the aggregating attribute. 

The RUM SDK allows you to identify users by setting attributes such as User ID, Name, and Email (`usr.id`, `usr.name`, and `usr.email`). These attributes are then used to populate users onto the User Profiles page. 

### Navigating the user profiles page 
The User Profiles page allows you to see information on an individual user and correlate this to the group. Select an individual user from the list to see details on their usage, including their most visited pages, frequent actions, and a history of their sessions. 

{{< img src="product_analytics/segmentation/user_profiles/session_history-userProfile-2.mp4" alt="Explore the user profile page and its session history." video=true >}}


From the session history, you can identify where frustrations are detected and follow the link to the analytics details of these frustrations. 

{{< img src="product_analytics/segmentation/user_profiles/UserProfile_frustration.png" alt="Explore the user profiles page and its session history." style="width:70%;">}}
<br>

## Build a segment

To create a new segment, navigate to **[Digital Experience Monitoring > Product Analytics > User Segments][1]** from the navigation. You have two sources you can choose from when building a new segment:

- Product Analytics data
- External data (upload a Reference Table)

{{< img src="product_analytics/segmentation/segmentation-1.png" alt="Create a user segment based on Product Analytics or external data.">}}

### Using Product Analytics data

To create a new segment using Product Analytics data:

1. Choose the user attribute you want to connect your data with. In the below example, it is `usr.id`, but you can use any user attribute available, such as `usr.email` or `usr.name`.

2. Under the **Filter your segment** section, you can filter on any attribute collected by the SDK, or custom attributes you added to create a granular user segment.

   In the below example, the segment is filtered to all users who were on the `/cart` page and then clicked on the checkout button (and did so from Brazil):

   {{< img src="product_analytics/segmentation/segmentation-2.png" alt="Filter to all users from Brazil who were on the `/cart` page and clicked on the checkout button.">}}

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