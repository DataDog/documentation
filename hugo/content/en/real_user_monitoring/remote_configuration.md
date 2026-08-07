---
title: Remote Configuration
description: Configure RUM SDK settings remotely for Browser, iOS, and Android applications.
further_reading:
- link: '/real_user_monitoring/'
  tag: Documentation
  text: Real User Monitoring
---

## Overview

As your application evolves, you may need to adjust what data the RUM SDK collects and how often it is collected. RUM remote configuration lets you update supported Browser, iOS, and Android SDK settings directly from Datadog without deploying a new version of your application.

## How it works

Each RUM application has a remote configuration ID that connects the SDK to settings managed in Datadog.

When the SDK initializes, it applies cached remote settings when available. Otherwise, it uses the settings defined in your application. The SDK checks for updates in the background and stores any changes for the next initialization. If this check fails, the SDK retains its existing cache or continues using its local settings. This background process does not delay SDK initialization or interrupt RUM event collection.

<div class="alert alert-warning">Published remote settings override the corresponding settings in your application. Settings that you do not enable remotely continue to use their locally configured values, so you can choose which settings to manage from Datadog.</div>

The configuration applies to all users and sessions that initialize with its ID rather than targeting individual users or sessions. If you change the ID, the SDK treats it as a new configuration and does not use settings cached under the previous ID.

<div class="alert alert-warning">The SDK retrieves remote configuration settings from a public CDN endpoint. Do not include secrets or personal information in configuration values.</div>

## Permissions

Remote configuration uses the same permissions as RUM applications. To enable, edit, or publish a configuration, you need the `RUM Apps Write` permission. For more information, see [Real User Monitoring permissions][1].

## Setup

1. Install RUM in a new application or update an existing supported RUM SDK, depending on your setup.
2. Navigate to {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}, select an application, and click {{< ui >}}Remote Configuration{{< /ui >}}.
3. Enable remote configuration to generate a remote configuration ID. Datadog keeps the configuration in a draft state so its values do not override your existing SDK settings before you publish it.
4. Add the remote configuration ID to your SDK initialization.
5. Follow the instructions in [Change SDK settings with remote configuration](#change-sdk-settings-with-remote-configuration) to update the settings.
6. Publish the configuration to apply its enabled settings.

## Change SDK settings with remote configuration

All settings are **disabled** when you create a remote configuration. Enable only the settings you want to control from Datadog; disabled settings continue to use the values configured in the SDK.

1. Enable a setting for remote configuration.

   <div class="alert alert-warning">Certain settings require corresponding module imports in the iOS and Android SDKs. If your application does not import these modules, remote configuration does not work for Session Replay, distributed tracing, or profiling.</div>

2. Configure the setting by enabling or disabling it, changing its sampling rate, or adding data, as applicable.
3. Save your changes.

## Supported platforms

{{< tabs >}}
{{% tab "Browser" %}}

**Sampling rates**

- `rum.sessionReplaySampleRate`
- `rum.traceSampleRate`
- `rum.traceContextInjection`
- `profiling.sampleRate`

**Privacy**

- `rum.defaultPrivacyLevel`
- `rum.enablePrivacyForActionName`

**Event tracking**

- `rum.trackAnonymousUser`
- `rum.trackUserInteractions`
- `rum.trackResources`
- `rum.trackLongTasks`
- `rum.trackSessionAcrossSubdomains`
- `logs.forwardErrorsToLogs`
- `logs.forwardConsoleLogs`
- `logs.forwardReports`

**App attributes**

- `rum.actionNameAttribute`

{{% /tab %}}
{{% tab "iOS" %}}

**Sampling rates**

- `sessionReplay.sampleRate`
- `profiling.continuousSampleRate`
- `profiling.applicationLaunchSampleRate`
- `trace.sampleRate`

**Privacy**

- `sessionReplay.textAndInputPrivacy`
- `sessionReplay.imagePrivacy`
- `sessionReplay.touchPrivacy`

**Event tracking**

- `rum.trackAnonymousUser`
- `rum.trackUserInteractions`
- `rum.trackResources`
- `rum.trackBackgroundEvents`
- `rum.trackFrustrations`
- `rum.longTask.enabled`
- `rum.longTask.threshold`
- `rum.vitalsUpdateFrequency`
- `rum.trackSlowFrames`
- `rum.appHang.enabled`
- `rum.appHang.threshold`
- `rum.trackWatchdogTerminations`
- `rum.trackMemoryWarnings`

**App attributes**

- `trace.traceContextInjection`
- `trace.tracedHosts`

{{% /tab %}}
{{% tab "Android" %}}

**Sampling rates**

- `rum.profilingSampleRate`
- `sessionReplay.sampleRate`
- `profiling.continuousSampleRate`
- `profiling.applicationLaunchSampleRate`
- `trace.sampleRate`

**Privacy**

- `sessionReplay.textAndInputPrivacy`
- `sessionReplay.imagePrivacy`
- `sessionReplay.touchPrivacy`

**Event tracking**

- `rum.trackAnonymousUser`
- `rum.trackUserInteractions`
- `rum.trackBackgroundEvents`
- `rum.trackFrustrations`
- `rum.longTask.enabled`
- `rum.longTask.threshold`
- `rum.vitalsUpdateFrequency`
- `rum.trackSlowFrames`
- `rum.crashReportsEnabled`
- `rum.trackNonFatalAnrs`

**App attributes**

- `trace.traceContextInjection`
- `trace.tracedHosts`

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<!-- TODO: Confirm the minimum supported SDK version for each platform. -->

[1]: /account_management/rbac/permissions/#real-user-monitoring
