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
: `type:string` <br> The ISO code of the country for the user's first session. <br> _(The country's code is saved in the back end and the country's name is displayed in the UI)_

Last Seen Country
: `type:string` <br> The ISO code of the country for the user's last session. <br> _(The country's code is saved in the back end and the country's name is displayed in the UI)_

First Region
: `type:string` <br> The region of the user's first session.

Last Region
: `type:string` <br> The region of the user's last session.



<!-- #### Device related attributes  -->
First Device Type
: `type:string` <br> The device used in the user's first session (_for example: desktop, tablet_).

Last Device Type
: `type:string` <br> The device used in the user's last session (_for example: desktop, tablet_).



<!-- #### OS related attributes  -->
First OS Name
: `type:string` <br> The operating system of the user's first session (_for example: Windows, iOS_).

Last OS Name
: `type:string` <br> The operating system of the user's last session (_for example: Windows, iOS_).

First OS Version
: `type:string` <br> The OS version of the user's first session.

Last OS Version
: `type:string` <br> The OS version of the user's last session.


<!-- #### Browser related attributes  -->
First Browser Name
: `type:string` <br> The browser used in the user's first session (_for example: Chrome, Safari_).

Last Browser Name
: `type:string` <br> The browser used in the user's last session (_for example: Chrome, Safari_).

First Browser Version
: `type:string` <br> The browser version from the user's first session.

Last Browser Version
: `type:string` <br> The browser version from the user's last session.

<br>

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


