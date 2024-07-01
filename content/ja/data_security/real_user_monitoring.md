---
title: Real User Monitoring Data Security
aliases:
    - /real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: Documentation
  text: Review the main categories of data submitted to Datadog
- link: /data_security/synthetics/
  tag: Documentation
  text: Synthetic Monitoring Data Security
- link: /real_user_monitoring/session_replay/browser/privacy_options/
  tag: Documentation
  text: Session Replay Privacy Options
- link: "https://www.datadoghq.com/blog/default-privacy-session-replay/"
  tag: Blog
  text: Obfuscate user data with Session Replay default privacy settings
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

## Overview
Real User Monitoring (RUM) provides controls for implementing privacy requirements and ensuring organizations of any scale do not expose sensitive or personal information. Data is stored on Datadog-managed cloud instances and encrypted at rest. The default behaviors and configurable options described on this page are designed to protect end user privacy and prevent sensitive organizational information from being collected. Learn more about [Privacy at Datadog][13].

## Shared responsibility

The responsibility of keeping user data secure is shared between Datadog and developers who leverage the RUM SDKs.

Datadog is responsible for:

- Providing a reliable product that handles data securely when it is transmitted to and stored on the Datadog platform.
- Ensuring that security issues are identified in accordance with internal policies.

Developers are responsible for:
- Leveraging configuration values and data privacy options as provided by Datadog.
- Ensuring the integrity of code within their environments.

## Compliance frameworks
RUM can be configured for compliance with many standards and regulatory frameworks, including, but not limited to:

- GDPR
- HIPAA 
- ISO
- CCPA/CPRA

## Privacy restrictions
By default, there are some privacy restrictions in place that protect user data to help comply with regulatory and standards frameworks.

### Browser RUM use of cookies
Browser RUM requires first party cookies to be enabled on an end user's browser to collect data. If required by the jurisdictions in which you operate, you are responsible for configuring your pages to comply with the laws of those jurisdictions, including receiving consent to collect cookies before RUM is initialized.

### Mobile RUM consent management
Mobile RUM tracking is only run upon user consent. If the end user accepts the RUM tracking, we track their activity and session experience. If the user declines the RUM tracking, we do not track their activity and session experience.

## Privacy options
You have several options and tools when it comes to collecting and redacting data captured by RUM.

### Client token
The browser RUM [client token][17] is used to match data from the end user's browser to a specific RUM application in Datadog. It is unencrypted and visible from the client side of an application.

Because the client token is only used to send data to Datadog, there is no risk of data loss due to this token; however, Datadog recommends good client token management to avoid other kinds of misuse, including:

- Regularly [rotating the client token][18] to ensure that it is only used by your application
- Automatically [filtering out bots][19] when capturing RUM data

#### Authenticated proxy
One method of using the client token to filter out bots is an authenticated proxy. In this method, a placeholder string is substituted for the `clientToken` when initializing the Datadog RUM Browser SDK. The proxy knows the real client token, but the end user does not. 

The proxy is configured to check for valid user information before passing the session data to Datadog, thereby confirming that a real user is signed in and transmitting traffic to be monitored. When receiving traffic, the proxy verifies that the data includes the placeholder string and replaces it with the real `clientToken` before forwarding the data to Datadog.

### Event tracking
An [event][14] is a user interaction with specific elements of your site or app. Events can be automatically captured via the SDK or sent via custom actions. You can turn off automatic tracking of user interactions and page views to only capture the interaction of your choice. By default, RUM uses target content to generate action names from actions automatically collected by the SDK. You can [explicitly override][5] this behavior with any given name.

The data we track automatically contains primarily technical information, much of which doesn't include personal identifying information. Data that is captured by RUM can be further redacted before it is sent and stored in Datadog through advanced configuration options for the following methods:

- [beforeSend API][1]
- [iOS][2]
- [Android][3]
- [Flutter][4]
- [React Native][16]

### Transmit RUM events through a proxy server
You can transmit all RUM events through your own [proxy server][15] so that end user devices never directly communicate with Datadog.

### User identity tracking
By default, there is **no tracking of users' identity**. Each session has a unique `session.id` tied to it, which anonymizes the data, but allows you to understand trends. You have the option of writing code to capture [user data][6] such as name and email address, then using that data to [enrich and modify][7] RUM sessions, but this is not required.

### Data retention
After you have configured the event capture, events are stored in Datadog. You can decide how long your captured events and properties stay in Datadog.

By default, data retention for production environments is:

- 30 days for sessions, views, actions, errors, and session recordings.
- 15 days for resources and long tasks.

Retention can be extended to a maximum of 90 days at no additional cost by [opening a support ticket][8]. Note that this retention extension does not apply to Session Replays, Resources, or Long Tasks.

#### Role-based access control
Datadog provides role-based access control (RBAC) for managing who sees captured RUM data. Default settings for data access depend on the role a user gets added to. There are three types of Datadog roles available: Administrator, Standard, and Read Only roles. More granular RUM-specific permissions are defined in [Datadog role permissions][10]. For example, you can grant or revoke access to view Session Replays.

### Data deletion
If you need to delete data stored by Datadog, for example, if potentially sensitive data has been leaked into RUM events, you can hard-delete data from within a given timeframe. With a hard delete, **all** data is deleted; it cannot be targeted to a specific application. If you need any data deleted, reach out to the [Datadog support team][9].

### Personal and sensitive data removal
You have some options available for removing Personally Identifiable Information (PII), and sensitive data, including IP addresses and geolocation. Some scenarios where PII could appear in RUM:

- Action names on buttons (for example, "View full credit card number")
- Names shown in URLs
- Custom tracked events instrumented by the developers of the app

#### Unstructured data
PII inadvertently included in unstructured data, such as an individual's name in a text box, can only be removed through a data deletion requisition for a specified timeframe.

With respect to URLs, you have the option to track page views manually in order to remove any PII or use beforeSend to change the URL text.

You can also transmit all RUM events through your own (proxy) server so that end user devices never directly communicate with Datadog.

#### IP address
When setting up a RUM application, you can choose whether or not you want to include IP or geolocation data:

{{< img src="data_security/data-security-rum-privacy-compliance-edit-rum-application.png" alt="You can include or exclude geolocation and client IP data from the RUM application setup page" style="width:100%;" >}}

Once you disable collection of IP data, the change will be applied immediately. Any events collected prior to disabling will not have their IP data removed. It is performed on the backend, which means the Browser SDK will still be sending data, but IP addresses will be omitted by Datadog backend pipelines and dropped at processing time.

#### Geolocation
In addition to removing client IPs, you can also choose to disable the collection of geolocation (country, city, county), or GeoIP, from all future collected data. If you uncheck the **Collect geolocation data** box, the change will be applied immediately. Any events collected prior to disabling will not have their geolocation data removed. Data omission is done at the backend level, which means the Browser SDK will still be sending data, but geolocation data will be omitted by our backend pipelines and dropped at processing time.

### Proactively search for sensitive data with Sensitive Data Scanner
[Sensitive Data Scanner][11] allows you to proactively search and scrub sensitive data upon ingestion by Datadog. RUM events are scanned on the stream before any data is stored within Datadog. The tool has the power to scrub, hash, or partially redact PII data before it is stored. It works by applying out-of-the-box or customer-developed pattern matching rules. If you've enabled this feature, you can find it on the [**Manage Sensitive Data** page][20].

## Session Replay-specific privacy options
See [privacy options specific to Session Replay][12].

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[2]: /real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[3]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#modify-or-drop-rum-events
[4]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter/#modify-or-drop-rum-events
[5]: /real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[6]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[7]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[8]: /help/
[9]: /help/
[10]: /account_management/rbac/permissions/#real-user-monitoring
[11]: /sensitive_data_scanner/
[12]: /real_user_monitoring/session_replay/browser/privacy_options
[13]: https://www.datadoghq.com/privacy/
[14]: /real_user_monitoring/explorer/search/
[15]: /real_user_monitoring/guide/proxy-rum-data/?tab=npm
[16]: /real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events
[17]: /real_user_monitoring/browser/setup/#configuration
[18]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[19]: /real_user_monitoring/guide/identify-bots-in-the-ui/#filter-out-bot-sessions-on-intake
[20]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
