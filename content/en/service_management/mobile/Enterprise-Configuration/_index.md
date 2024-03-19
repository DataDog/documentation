---
title: Enterprise Configuration
kind: documentation
aliases:
- /mobile/enterprise-configuration
further_reading:
- link: "/monitors/"
  tag: "Documentation"
  text: "Alerting"
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards"
- link: "https://www.datadoghq.com/blog/datadog-mobile-widgets/"
  tag: "Blog"
  text: "Improve your on-call experience with Datadog mobile dashboard widgets"
---
The Datadog Mobile App is fully compatible with [https://www.appconfig.org/][1] and Mobile Device Management (MDM) providers compatible with it.

## Supported capabilities

The mobile app supports all default MDM capabilities for [iOS][2] and [Android][3] as well as the following dedicated features:

| Key | Description |Type|Default Value| 
|---------|---------|-----|-----|
|`datadogDefaultLoginOrganizationUUID`|Define the organization UUID `dd_oid` passed as a parameter during login.|String|null|
|`datadogDefaultLoginOrganizationPublicID`|Define the organization `public_id` (available [here][4]) passed as a parameter during login. If `datadogDefaultLoginOrganizationUUID` has been set, it takes precedence over the `public_id`.|String|null|
|`disableSharing`|Disable content sharing from the app.|Boolean|false|
|`disableHomeScreenWidgets`|Disable access to homescreen widgets (and instead display "disabled by your organization").|Boolean|false|

To learn more about default capabilities, see your Mobile Device Management provider’s documentation.

## Use cases
### Organization specific login options
The mobile app lets you set organization information to display a dedicated mobile app login page if your organization has a dedicated subdomain or dedicated options for your users to authenticate. For example, the mobile app lets you disable Google SSO and email/password authentication or add a dedicated SAML Login button. 

You can set `datadogDefaultLoginOrganizationPublicID` or `datadogDefaultLoginOrganizationUUID` to identify the default organization passed as a parameter during login; if both are set, `datadogDefaultLoginOrganizationUUID takes precedence`.   

`datadogDefaultLoginOrganizationPublicID` is available via the API.  

`datadogDefaultLoginOrganizationUUID` is available by clicking **“Log in to Mobile App”** from **Personal Settings > My Organizations**.

### Preventing data leaks from your users
If you are concerned about the risk of data leaks from users, you can disable copy/paste and screenshots through standard configurations (for [iOS][2] and [Android][3]). The Datadog Mobile App offers the following features that you can enable at your discretion to further mitigate the risk of data leaks:  

**Disabling sharing from the app**, which will remove every share button from Datadog mobile app product pages.  
*Note*: Mobile app share buttons create a link to the relevant product page which require authentication to view. Consider whether this default control is sufficient; disabling sharing from the mobile app may inhibit your teams’ collaboration using the mobile app.  

**Disabling home-screen widgets**, which will display “Disabled by your organization” on the home screen widget in place of actual data from your monitors, incidents, SLOs, or dashboards.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.appconfig.org/
[2]: https://www.appconfig.org/ios.html
[3]: https://www.appconfig.org/android.html
[4]: https://docs.datadoghq.com/api/latest/organizations/#list-your-managed-organizations
