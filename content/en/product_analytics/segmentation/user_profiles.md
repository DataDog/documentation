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



<!-- var usersCoreDataModel = map[string]Field{
    // Timestamps
    "first_seen": {
       FieldID:     "first_seen",
       DisplayName: "First Seen",
       Type:        Timestamp,
       Description: "The date of the user's first session.",
       Groups:      []string{},
    },
    "last_seen": {
       FieldID:     "last_seen",
       DisplayName: "Last Seen",
       Type:        Timestamp,
       Description: "The date of the user's most recent session.",
       Groups:      []string{},
    },
    // User Attributes
    "user_id": {
       FieldID:     "user_id",
       DisplayName: "User ID",
       Type:        String,
       Description: "A unique identifier for the user.",
       Groups:      []string{"User"},
    },
    "user_email": {
       FieldID:     "user_email",
       DisplayName: "User Email",
       Type:        String,
       Description: "The user's email address.",
       Groups:      []string{"User"},
    },
    "user_name": {
       FieldID:     "user_name",
       DisplayName: "User Name",
       Type:        String,
       Description: "The user's full name.",
       Groups:      []string{"User"},
    },
    // Application Attributes
    "first_application_id": {
       FieldID:     "first_application_id",
       DisplayName: "First Application ID",
       Type:        String,
       Description: "The ID of the first application the user accessed.",
       Groups:      []string{"Application"},
    },
    "last_application_id": {
       FieldID:     "last_application_id",
       DisplayName: "Last Application ID",
       Type:        String,
       Description: "The ID of the last application the user accessed.",
       Groups:      []string{"Application"},
    },
    // Geo Attributes
    "first_country_code": {
       FieldID:     "first_country_code",
       DisplayName: "First Country Code",
       Type:        String,
       Description: "The ISO code of the country for the user's first session.",
       Groups:      []string{"Geo"},
    },
    "last_country_code": {
       FieldID:     "last_country_code",
       DisplayName: "Last Country Code",
       Type:        String,
       Description: "The ISO code of the country for the user's last session.",
       Groups:      []string{"Geo"},
    },
    "first_city": {
       FieldID:     "first_city",
       DisplayName: "First City",
       Type:        String,
       Description: "The city of the user's first session.",
       Groups:      []string{"Geo"},
    },
    "last_city": {
       FieldID:     "last_city",
       DisplayName: "Last City",
       Type:        String,
       Description: "The city of the user's last session.",
       Groups:      []string{"Geo"},
    },
    "first_region": {
       FieldID:     "first_region",
       DisplayName: "First Region",
       Type:        String,
       Description: "The region of the user's first session.",
       Groups:      []string{"Geo"},
    },
    "last_region": {
       FieldID:     "last_region",
       DisplayName: "Last Region",
       Type:        String,
       Description: "The region of the user's last session.",
       Groups:      []string{"Geo"},
    },
    // Device Attributes
    "first_device_type": {
       FieldID:     "first_device_type",
       DisplayName: "First Device Type",
       Type:        String,
       Description: "The device used in the user's first session (e.g., desktop, tablet).",
       Groups:      []string{"Device"},
    },
    "last_device_type": {
       FieldID:     "last_device_type",
       DisplayName: "Last Device Type",
       Type:        String,
       Description: "The device used in the user's last session (e.g., desktop, tablet).",
       Groups:      []string{"Device"},
    },
    // OS Attributes
    "first_os_name": {
       FieldID:     "first_os_name",
       DisplayName: "First OS Name",
       Type:        String,
       Description: "The operating system of the user's first session (e.g., Windows, iOS).",
       Groups:      []string{"OS"},
    },
    "last_os_name": {
       FieldID:     "last_os_name",
       DisplayName: "Last OS Name",
       Type:        String,
       Description: "The operating system of the user's last session (e.g., Windows, iOS).",
       Groups:      []string{"OS"},
    },
    "first_os_version": {
       FieldID:     "first_os_version",
       DisplayName: "First OS Version",
       Type:        String,
       Description: "The OS version of the user's first session.",
       Groups:      []string{"OS"},
    },
    "last_os_version": {
       FieldID:     "last_os_version",
       DisplayName: "Last OS Version",
       Type:        String,
       Description: "The OS version of the user's last session.",
       Groups:      []string{"OS"},
    },
    // Browser Attributes
    "first_browser_name": {
       FieldID:     "first_browser_name",
       DisplayName: "First Browser Name",
       Type:        String,
       Description: "The browser used in the user's first session (e.g., Chrome, Safari).",
       Groups:      []string{"Browser"},
    },
    "last_browser_name": {
       FieldID:     "last_browser_name",
       DisplayName: "Last Browser Name",
       Type:        String,
       Description: "The browser used in the user's last session (e.g., Chrome, Safari).",
       Groups:      []string{"Browser"},
    },
    "first_browser_version": {
       FieldID:     "first_browser_version",
       DisplayName: "First Browser Version",
       Type:        String,
       Description: "The browser version from the user's first session.",
       Groups:      []string{"Browser"},
    },
    "last_browser_version": {
       FieldID:     "last_browser_version",
       DisplayName: "Last Browser Version",
       Type:        String,
       Description: "The browser version from the user's last session.",
       Groups:      []string{"Browser"},
    },
} -->