---
title: Disable RUM
description: Learn how to disable Real User Monitoring for an application in Datadog, remove the SDK from your application, and delete the application.
further_reading:
- link: '/real_user_monitoring/rum_without_limits/'
  tag: 'Documentation'
  text: 'RUM without Limits'
- link: '/real_user_monitoring/guide/monitor-your-rum-usage'
  tag: 'Guide'
  text: 'Monitor your RUM usage'
---

## Overview

You can disable RUM for an application from its settings in Datadog. Disabling RUM stops billing for the application's RUM data and does not require a code change.

RUM has two parts that you manage separately: the SDK in your application, which sends data, and the RUM application in Datadog, which receives it. Changing one part does not change the other.

| Action | Data from the SDK | Billing | Application, dashboards, and monitors |
|---|---|---|---|
| [Disable RUM](#disable-rum-for-an-application) | Ingested, but not indexed | Stops (for organizations using [RUM without Limits][2]) | Kept |
| [Remove the SDK](#remove-the-sdk-from-your-application) | No new data is sent | Stops, because no new data is sent | Kept, and the application shows no data |
| [Delete the application](#delete-the-application) | Rejected at intake | Stops | Permanently removed |

To remove RUM completely, [remove the SDK](#remove-the-sdk-from-your-application) from your application and then [delete the application](#delete-the-application) in Datadog.

## Disable RUM for an application

1. Go to [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}RUM Applications{{< /ui >}}][1] and select your application.
2. Under {{< ui >}}Product Settings{{< /ui >}}, click {{< ui >}}Real User Monitoring{{< /ui >}}.
3. Click {{< ui >}}Disable{{< /ui >}}.

{{< img src="real_user_monitoring/guide/disable-rum/disable-rum.png" alt="The Real User Monitoring settings page for a RUM application, showing the status 'Real User Monitoring is enabled' with the Disable button highlighted" style="width:100%;" >}}

To re-enable RUM, return to the same page and click {{< ui >}}Enable{{< /ui >}}.

### What happens after you disable RUM

For organizations using [RUM without Limits][2], after you disable RUM for an application:

- Datadog continues to ingest RUM data from the SDK, but does not bill for it.
- No data is indexed, and retention filters do not apply.
- If [Product Analytics][3] is enabled, the ingested events may be used for Product Analytics.

## Remove the SDK from your application

Disabling RUM in Datadog does not stop the SDK in your application, which continues to collect data and send it to Datadog. To stop sending data, remove the SDK initialization code and package from your application, then deploy the change. For details about where the SDK is installed, see the setup instructions for your platform:

- [Browser][4]
- [Android][5]
- [iOS][6]
- [Flutter][7]
- [React Native][8]
- [Kotlin Multiplatform][9]
- [Roku][10]
- [Unity][11]
- [C++][12]
- [.NET MAUI][13]

## Delete the application

To remove the application's configuration, dashboards, and monitors from Datadog, delete the application. After you delete an application, Datadog rejects any data the SDK sends at intake, so events are not ingested or billed.

1. Go to [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}RUM Applications{{< /ui >}}][1].
2. Find your application and click the settings icon.
3. Select {{< ui >}}Delete application{{< /ui >}} and confirm the deletion.

<div class="alert alert-warning">Deleting an application is permanent. All associated data, monitors, and dashboards for that application are removed from Datadog.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /real_user_monitoring/rum_without_limits/
[3]: /product_analytics/
[4]: /real_user_monitoring/application_monitoring/browser/setup/
[5]: /real_user_monitoring/application_monitoring/android/setup/
[6]: /real_user_monitoring/application_monitoring/ios/setup/
[7]: /real_user_monitoring/application_monitoring/flutter/setup/
[8]: /real_user_monitoring/application_monitoring/react_native/setup/
[9]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/
[10]: /real_user_monitoring/application_monitoring/roku/setup/
[11]: /real_user_monitoring/application_monitoring/unity/setup/
[12]: /real_user_monitoring/application_monitoring/cpp/setup/
[13]: /real_user_monitoring/application_monitoring/maui/setup/
