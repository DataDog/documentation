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
The Datadog Mobile App is fully compatible with [https://www.appconfig.org/][1] and thus with Mobile Device Management (MDM) providers compatible with it.

## Supported capabilities

In addition to capabilities supported by default for [iOS][2] and [Android][3], the Datadog mobile app provides the following dedicated features:

| Key | Description |Type|Default Value| 
|---------|---------|-----|-----|
|`datadogDefaultLoginOrganizationUUID`|Define the organization UUID `dd_oid` passed as a parameter during login.|String|null|
|`datadogDefaultLoginOrganizationPublicID`|Define the organization `public_id` (available [here][4]) passed as a parameter during login. If `datadogDefaultLoginOrganizationUUID` has been set, it takes precedence over the `public_id`.|String|null|
|`disableSharing`|Disable content sharing from the app.|Boolean|false|
|`disableHomeScreenWidgets`|Disable access to homescreen widgets (and instead display "disabled by your organization").|Boolean|false|

To learn more about default capabilities, see your Mobile Device Management provider’s documentation.

## Use cases
### Organization specific login options
Your organization may have a dedicated subdomain or some dedicated options for your users to authenticate. You can set the organization information to allow the mobile app to display a dedicated login page. For example, you can disable Google SSO and email/password authentication or add a dedicated SAML Login button. 

Setting `datadogDefaultLoginOrganizationPublicID` or `datadogDefaultLoginOrganizationUUID` fundamentally leads to the same result, though information is fetched from different places:  

`datadogDefaultLoginOrganizationPublicID` is available via the API.  

`datadogDefaultLoginOrganizationUUID` is available by clicking **“Log in to Mobile App”** from **Personal Settings > My Organizations**.

### Preventing data leaks from your users
If you are concerned about the risk of data leaks from users, you can disable copy/paste and screenshots through standard configurations (for [iOS][2] and [Android][3]). The Datadog Mobile App offers the following features that you can enable at your discretion to further mitigate the risk of data leaks:  

**Disabling sharing from the app**, which will remove every share button from Datadog mobile app product pages. Please note that share buttons create a link to the relevant product page which require authentication to view, and disabling sharing from the mobile app may inhibit your teams’ collaboration using the mobile app.  

**Disabling home-screen widgets**, which, depending on the platform, will display a “Disabled by your organization” message on the home screen widget in place of actual data from your monitors, incidents, SLOs, and dashboards.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.appconfig.org/
[2]: https://www.appconfig.org/ios.html
[3]: https://www.appconfig.org/android.html
[4]: https://docs.datadoghq.com/api/latest/organizations/#list-your-managed-organizations
