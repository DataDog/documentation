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


{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
All features in Product Analytics are in limited availability. To request access, complete the form.
{{< /callout >}}

## Overview 
<!-- Add language from
   https://docs.datadoghq.com/product_analytics/guide/rum_and_product_analytics/ 
  and from https://datadoghq.atlassian.net/wiki/spaces/GTMSEH/pages/5007933651/Product+Analytics#Who-are-our-Target-Personas%3F 
to emphasize the benefits of the user profiles to the persona  -->

The User Profiles page allows you to list, search, and configure end-user profiles. While Product Analytics provides insight into user behavior overall, User Profiles helps to track key user behavior patterns at the individual user level. The User Profiles page also allows you to create a segment of users who have used your product in order to analyze and understand specific groups of users.

In the User Profile page, you can filter users based on all the available attributes. To easiliy find the available attributes, this document separates them into four sections:

<!-- the table might be easier to read -->

<!-- |Attribute|type|description|
|----------|----|----------|
| **First Seen**  | string  | Unique user identifier.  | 
---
| **First Seen**  | string  | Unique user identifier.  | -->



<!-- Or separate the `:` version into two or three sections (location, browser, personal identifiers) -->


#### Personal identifying attributes 
User ID
: `type:string` <br> Unique user identifier.

User Email
: <add context>

User Name
: `type:string` <br> User friendly name, displayed by default in the RUM UI.

#### Time based attributes 
First Seen
: `type:string` <br> 

#### Location based attributes 
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


#### Device and Browser related attributes 
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
First Seen Application
: <add context>


<!-- **(emphasize ``user.id` here?)**
The attributes in this table are recommended for populating users in the User Profile page. -->

The User profiles page also shows when the profile was last updated, for example, the last user session based on the RUM event. The goal is to allow Datadog users to use these attributes when [querying usage data][1] for understanding how your product is being used, or when [creating segments][2] to analyze and understand specific groups of your user base. 


## How profiles are sourced

User profiles are sourced from:
- RUM events 
- Reference tables created using data from third parties

### RUM events
RUM SDKs allow you to identify users by setting attributes such as user id, name and email (usr.id, usr.name, or usr.email). These attributes are then used to populate the User Profile page. 

### Navigating the User Profile Page 
Datadog users are able to use full-text search, filter, and sort user profiles. 
<!-- insert the gif/video -->

From the User Profile page, you can create a segment and view a list of current segments. When a user profile is selected, you can see more details of their usage, including their most visited pages, frequent actions, and a history of their sessions. 

From the session history, you can identify where frustrations are detected and see the analytics details of these frustrations. 

<!-- insert the gif/video -->

<!-- To do -->
<!-- modify the language and flow to fit the PM persona -->


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/product_analytics/analytics_explorer/#build-a-query
[2]: https://docs.datadoghq.com/product_analytics/segmentation/#overview