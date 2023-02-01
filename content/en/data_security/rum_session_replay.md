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

### Browser RUM use of cookies

Browser RUM requires **first party cookies** to be enabled on an end user’s browser to begin collecting data. This means the end user must accept cookies before any data can be collected. In addition, you can enable RUM for an end user, but if they turn on a browser setting that prevents any cookies from being written, RUM cannot be run for that user.

### Mobile RUM consent management
Mobile RUM tracking is only run upon user consent. If the end user accepts the RUM tracking, we track their activity and session experience. If the user declines the RUM tracking, we don’t track their activity and session experience.

## Privacy options
You have several options when it comes to collecting and redacting data captured by RUM.

### Event tracking
You have the option to redact the data that is captured by RUM before it is sent and stored in Datadog through advanced configuration options for the following methods:
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




### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[2]: /real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[3]: /real_user_monitoring/android/advanced_configuration/?tab=kotlin#modify-or-drop-rum-events
[4]: /real_user_monitoring/flutter/advanced_configuration/#modify-or-drop-rum-events
[5]: /real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[6]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#user-session
[7]: /help/