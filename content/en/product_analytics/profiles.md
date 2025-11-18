---
title: Managing Profiles and Integrating Custom Attributes
description: Analyze and understand individual users and segments of your user base.
further_reading:
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
---

## Overview

The [User Profiles][7] and [Account Profiles][8] pages contain enriched data on the users and accounts interacting with your product. 

These profile pages integrate attributes extracted from collected events with information from third-party sources. Examples of these attributes include a user’s `first_seen` timestamp or the ISO code of the user's `last_seen_country`. Together, they help create comprehensive, centralized profiles.

These enriched profiles enable more precise segmentation and deeper analysis of user behavior, helping you identify patterns over time, track key cohorts (for example, users active after six months), and guide product decisions and engagement strategies. 

## Profiles

User and account profiles are generated from RUM events collected through the RUM SDK. Use `datadogRum.setUser` to [set user attributes][2] and `datadogRum.setAccount` to set [account attributes][3].

User profiles are grouped by the `user_id` attribute, while account profiles are grouped by `account_id`.

You can also customize these pages by adding attributes that matter most to your team. See the [Custom Attributes section](#use-custom-attributes-to-enrich-profiles) to learn how to tailor profile data to your needs. 


### User profiles 

The [User Profiles][7] page lists the users who are interacting with your application. You can select a user to view detailed insights into their activity, including their most visited pages, frequent actions, and session history.

{{< img src="product_analytics/user_profile2ui.png" alt="A view of the User profiles page." style="width:80%;" >}}

Each profile has attributes to help you better segment your users. You can conduct a full-text search or sort and filter based on any of these attributes. You can also customize this page with attributes relevant to your analytic needs. See the [Custom Attributes section](#use-custom-attributes-to-enrich-profiles) to learn how.  


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


### Account profiles 
The Account Profiles page surfaces a list of the organizations interacting with your application.

{{< img src="product_analytics/account_profileui.png" alt="A view of the User profiles page." style="width:80%;" >}}

Each profile includes four default attributes to help you identify and track account activity over time. These default attributes are:
- `account_id`
- `account_name`
- `first_seen`
- `last_seen` 

You can customize the Account Profiles page to include additional attributes, giving you the flexibility to tailor the view to your observability and product analysis needs.



## Use custom attributes to enrich profiles

### How to configure custom attributes using integrations 

Use integrations or reference tables to automatically import custom attribute data into profiles. This data is synced on a regular schedule, reflecting the latest values from the source system to ensure that profiles remain up-to-date and accurate.

On the [Integrations page][4], you can explore the integrations that are compatible with custom attributes.

On this same page, you can select the [Custom Attributes][5] tab to view imported attributes for user and account profiles.

{{< img src="product_analytics/integration_page3.png" alt="See the integrations that are compatible with Product Analytics." style="width:80%;" >}}

To import attibutes from a reference table or from an integration such as Salesforce or Snowflake, select the **Add Attributes** button and choose whether the attributes are for user or account profiles. Then, follow the prompts to: 


{{< img src="product_analytics/add_attribute2_button.png" alt="Add new attributes using to enrich your profiles." style="width:80%;" >}}


1. Choose a **source of the data** to be imported.

{{< img src="product_analytics/choose_integration.png" alt="Choose a source of the data to be imported." style="width:80%;" >}}


2. Select the **table** containing the desired user data, then select the **join keys** to merge the table with your profiles.

{{< img src="product_analytics/add_table_and_key.png" alt="select the data to be merged with your profiles." style="width:80%;" >}}


3. Choose which **attributes from the reference table or integration** to add to your profiles.

{{< img src="product_analytics/select_integration_attributes.png" alt="Add new attributes using to enrich your profiles." style="width:80%;" >}}


<br>

## How to query your custom attributes

You can filter these custom attributes throughout the product analytics platform without needing to first add them to a [segment][6]. For example, you can create an analytics chart to view the volume of sessions for users that spent more than $100. 

{{< img src="product_analytics/query_custom_attribute_analytics3.png" alt="Query your custom attributes in an analytics chart." style="width:80%;" >}}


## Further reading
{{< partial name="whats-next/whats-next.html" >}}


[2]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-user-session
[3]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-account
[4]: https://app.datadoghq.com/product-analytics/integrations
[5]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes
[6]: https://app.datadoghq.com/product-analytics/segments
[7]: https://app.datadoghq.com/product-analytics/profiles
[8]: https://app.datadoghq.com/product-analytics/profiles/accounts
