---
title: Disable RUM
description: Learn how to fully disable Real User Monitoring, including removing the SDK from your application and deleting the application from Datadog.
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
- link: '/real_user_monitoring/guide/monitor-your-rum-usage'
  tag: 'Guide'
  text: 'Monitor your RUM usage'
- link: '/real_user_monitoring/guide/sampling-browser-plans'
  tag: 'Guide'
  text: 'Configure RUM sampling'
---

## Overview

Disabling RUM involves two independent components:

- **The SDK in your application**: collects user session data and sends it to Datadog. Removing or disabling the SDK stops data from being sent from user browsers.
- **The RUM application in Datadog**: stores the application configuration, dashboards, and monitors. Deleting the application removes it from the Datadog UI.

These two components are independent. Disabling one does not automatically disable the other. To fully stop data collection and remove the application from Datadog, you must address both.

## Understand what happens if you only disable one component

| Action | Result |
|---|---|
| Delete application from Datadog UI, but SDK still in your code | The application is marked as disabled. The SDK continues running in your code, but Datadog rejects the data at intake—events are not ingested or billed. |
| Remove SDK from your code, but application still in Datadog | No new data is sent. The application remains visible in Datadog with a "no data" state, and its dashboards and monitors remain intact. |

## Disable the SDK in your application

Choose one of the following approaches depending on your goal.

### Pause data collection without removing the SDK

To stop sending data temporarily without removing the SDK from your codebase, set `sessionSampleRate` to `0` in your `DD_RUM.init()` call:

```javascript
DD_RUM.onReady(function() {
  DD_RUM.init({
    // ... other options
    sessionSampleRate: 0,
    sessionReplaySampleRate: 0,
  });
});
```

With `sessionSampleRate: 0`, no sessions are collected. This lets you re-enable RUM later by updating the value without changing your deployment pipeline.

### Remove the SDK from your application

To fully remove the SDK from your codebase:

**CDN async installation**: Remove the `<script>` block from the `<head>` of your HTML pages.

**npm installation**: Remove the SDK initialization code and the package:

```shell
npm uninstall @datadog/browser-rum
```

After deploying these changes, no RUM data is sent from your application.

## Delete the RUM application from Datadog

After disabling the SDK, delete the RUM application from Datadog to remove its configuration, dashboards, and monitors.

1. In Datadog, go to [**Digital Experience** > **RUM Applications**][1].
1. Find your application and click the settings icon.
1. Select **Delete application**.
1. Confirm the deletion.

Deleting an application is permanent. All associated data, monitors, and dashboards for that application are removed from Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
