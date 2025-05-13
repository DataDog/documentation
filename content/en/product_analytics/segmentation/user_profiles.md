---
title: User Profiles
description: User Profiles allows you to list, search, and configure end-user profiles
further_reading:
- link: '/product_analytics/session_replay/browser/'
  tag: 'Documentation'
  text: 'Session Replay'
- link: 'https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/'
  tag: 'Blog'
  text: 'Visualize user interactions with your pages by using Scrollmaps in Datadog Heatmaps'
---

## Overview 
While Product Analytics provides insight into users behavior overall, the user profiles feature allows you to track and analyse the behavioral patterns of key users.

The User Profiles page allows you to LIST, SEARCH, SORT, and FILTER on your available product users to create a list of these key users. You can use the list of [available attributes](#available-attributes) to focus on this subset of your users, or [create a segment][2], so that you can better analyze and understand their usage of your product. 

The goal of this feature is to allow you to scope down to specific users' behavioral data that would help inform your decisions on product optimization and feature adoption. For example, with the filtering capability, you can answer the question of _how many active users there are in a given country_, by using the `First City` and `Last City` attributes. 

{{< img src="product_analytics/segmentation/user_profiles/userProfilePage-2.png" alt="A view of the User profile page.">}}

## Available attributes

The User Profile page includes a list of attributes to help you better segment your users. You can conduct a FULL-TEXT SEARCH on `username` or `email`, SORT, and FILTER based on these attributes:

<!-- #### Personal identifying attributes  -->
User ID `**REQUIRED`
: `type:string`  <br> Unique user identifier,  displayed by default in the User Profile page.<br> 
_This is a required attribute needed for user tracking and populating on the User Profiles page_.<br>

User Email
: <add context>

User Name
: `type:string` <br> User friendly name, displayed by default in the User Profile page.

<!-- #### Time based attributes  -->
First Seen
: `type:string` <br> 

First Seen Application
: `type:string`  <br> 

<!-- #### Location based attributes  -->

First City
: `type:string` <br> 

Last City
: `type:string` <br> 

First Region
: `type:string` <br> 

Last Region
: `type:string` <br> 

First Seen Country 
: `type:string` <br> 

Last Seen Country
: `type:string` <br> 

<!-- #### Device and Browser related attributes  -->
First Device Type
: <add context>
Last Device Type
: <add context>
First OS Version
: <add context>
Last OS Version
: <add context>
First OS Name
: <add context>
Last OS Name
: <add context>
First Browser Name
: <add context>
Last Browser Name
: <add context>
First Browser Version
: <add context>
Last Browser Version
: <add context>

<!-- **(emphasize ``user.id` here?)**
The attributes in this table are recommended for populating users in the User Profile page. -->


## How profiles are sourced

User profiles are sourced from RUM events using `usr.id` as the aggregating attribute. 

The RUM SDK allows you to identify users by setting attributes such as User ID, Name, and Email (`usr.id`, `usr.name`, and `usr.email`). These attributes are then used to populate users onto the User Profiles page. 

### Navigating the User Profile Page 
The User Profile page allows you to see information on individual users and correlate this to the group. You can use full-text search, filter, and sort through your user profiles. You can select an individual user's profile to see more detail on their usage, including their most visited pages, frequent actions, and a history of their sessions. 

{{< img src="product_analytics/segmentation/user_profiles/session_history-userProfile-2.mp4" alt="Explore the user profile page and its session history." video=true >}}


From the session history, you can identify where frustrations are detected and see the analytics details of these frustrations. 

{{< img src="product_analytics/segmentation/user_profiles/UserProfile_frustration.png" alt="Explore the user profile page and its session history." style="width:70%;">}}



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/product_analytics/analytics_explorer/#build-a-query
[2]: https://docs.datadoghq.com/product_analytics/segmentation/#overview
[3]: https://app.datadoghq.com/product-analytics/profiles