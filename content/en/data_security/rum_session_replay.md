---
title: RUM & Session Replay Data Security
kind: documentation
aliases:
    - /real_user_monitoring/security/
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

## Overview
RUM and Session Replay provide controls for implementing privacy requirements and ensuring organizations of any scale do not expose sensitive or personal information. Data is stored on Datadog-managed cloud instances and encrypted at rest. The default behaviors and configurable options described on this page are designed to protect end user privacy and prevent sensitive organizational information from being collected.
## Compliance frameworks
RUM and Session Replay are compliant with many compliance frameworks, including, but not limited to:

- GDPR
- HIPAA 
- ISO
- CCPA/CPRA

## Privacy restrictions
By default, there are some privacy restrictions in place to protect user data while meeting compliance framework standards.

### Browser RUM use of cookies
Browser RUM requires **first party cookies** to be enabled on an end user’s browser to begin collecting data. This means the end user must accept cookies before any data can be collected. In addition, you can enable RUM for an end user, but if they turn on a browser setting that prevents any cookies from being written, RUM cannot be run for that user.

### Mobile RUM consent management
Mobile RUM tracking is only run upon user consent. If the end user accepts the RUM tracking, we track their activity and session experience. If the user declines the RUM tracking, we do not track their activity and session experience.

## Privacy options
You have several options when it comes to collecting and redacting data captured by RUM.

### Event tracking
You can opt to to redact the data that is captured by RUM before it is sent and stored in Datadog through advanced configuration options for the following methods:

- [beforeSend API][1]
- [iOS][2]
- [Android][3]
- [Flutter][4]

Additionally, you can turn off automatic tracking of user interactions and page views to only capture the interaction of your choice. By default, we use target content to generate action names from actions automatically collected by the SDK. You can [explicitly override][5] this behavior with any given name.

### User identity tracking
By default, there is **no tracking of users’ identity**. You have the option of writing code to capture user identities, then using them to [enrich and modify][6] RUM sessions.

### Data retention
You can decide how long your captured data stays in Datadog.

By default, data retention for production environments is:

- 30 days for sessions, views, actions, errors, and session recordings
- 15 days for resources

Any of this retained data can be extended to a maximum of 90 days at no additional cost by [opening a support ticket][7].

### Data deletion
If, for example, sensitive data has been leaked, you can hard-delete data from within a given timeframe. With a timeframe, all data is deleted; it cannot be specific to an application. Furthermore, we cannot look up and delete personal information from an individual, but we can delete specific personal information if the timeframe is known. If you need any data deleted, reach out to the [Datadog support team][8].

### Personal and sensitive data removal
You have some options available for removing Personally Identifiable Information (PII) and sensitive data, including IP addresses and geolocation.

#### IP address
You can request that client IP addresses be scrubbed by submitting a support ticket. Once the change is made, IP addresses are scrubbed from newly collected data only - it is not possible to remove IPs from data prior to initiating scrubbing. IP scrubbing occurs at the organization level; this data cannot be removed for specific applications, services, and so on. It is done at the backend level, which means the Browser SDK will still be sending data, but IP addresses will be scrubbed out by our backend pipelines and dropped at processing time.

#### Geolocation
In addition to removing client IPs, you can choose to remove geolocation (country, city, county), or GeoIP, as well. It is not possible to remove only GeoIP data without removing client IPs. Geolocation scrubbing occurs at the organization level; this data cannot be removed for specific applications, services, and so on. It is done at the backend level, which means the Browser SDK will still be sending data, but geolocation IP will be scrubbed out by our backend pipelines and dropped at processing time.

#### Unstructured personally identifiable information
Unstructured PII data, such as an individual’s name, can only be removed through a data deletion requisition for a specified timeframe.

**Note**: [User data][9], such as name and email address, require users to opt-in to track.

When it comes to URLs, you have the option to track page views manually in order to remove any PII or use beforeSend to change the URL shape.

You can also transmit all RUM events through your own (proxy) server so that end user devices never communicate with Datadog directly.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[2]: /real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[3]: /real_user_monitoring/android/advanced_configuration/?tab=kotlin#modify-or-drop-rum-events
[4]: /real_user_monitoring/flutter/advanced_configuration/#modify-or-drop-rum-events
[5]: /real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[6]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#user-session
[7]: /help/
[8]: /help/
[9]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#user-session