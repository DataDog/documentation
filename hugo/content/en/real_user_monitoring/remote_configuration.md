---
title: Remote Configuration
description: Configure RUM SDK settings remotely for Browser, iOS, and Android applications.
further_reading:
- link: '/real_user_monitoring/'
  tag: Documentation
  text: Real User Monitoring
---

## Overview

As your application evolves, you may need to adjust the data that the RUM SDK collects and its collection frequency. RUM remote configuration lets you update supported Browser, iOS, and Android SDK settings from Datadog without deploying a new version of your application.

<!-- SCREENSHOT TO BE UPDATED-->

{{< img src="/real_user_monitoring/remote_configuration/remote-configuration-example.png" alt="View of remote configuration for a web application." >}}


## Prerequisites

Remote configuration requires the following RUM SDK versions:

<!-- EXACT SDK VERSION TO BE UPDATED -->
- Browser SDK version 7.6.0+
- iOS SDK version 3.14.0+
- Android SDK version 3.12.0+

## How it works

Each RUM application has a remote configuration ID that the SDK uses to retrieve its remote settings.

When the SDK initializes, it applies cached remote settings. If no cached settings are available, it uses the settings defined in your application. The SDK checks for updates in the background and stores changes for the next initialization. If the check fails, the SDK retains its existing cache or continues to use its local settings. The check does **not** delay SDK initialization or interrupt RUM event collection.

<div class="alert alert-warning">Published remote settings override the corresponding settings in your application. Settings that you do not enable remotely continue to use their local values. Enable only the settings that you want to manage from Datadog.</div>

A remote configuration applies to all users and sessions initialized with its ID. You cannot target individual users or sessions. If you change the ID, the SDK treats it as a new configuration and does not use settings cached under the previous ID.

<div class="alert alert-warning">The SDK retrieves remote configuration settings from a public CDN endpoint. Do not include secrets or personal information in configuration values.</div>

## Permissions

Remote configuration uses the same permissions as RUM applications. To enable, edit, or publish a configuration, you need the `RUM Apps Write` permission. For more information, see [Real User Monitoring permissions][1].

## Setup

To configure remote settings for an application:

1. Install a supported RUM SDK in a new application, or update the SDK in an existing application.
2. Navigate to {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}, select an application, and click {{< ui >}}SDK Configuration{{< /ui >}}.
3. Enable remote configuration to generate a remote configuration ID. Datadog saves the configuration as a draft, so its values do not override your existing SDK settings before you publish it.
4. Add the remote configuration ID to your SDK initialization.
5. Update the settings as described in [Change SDK settings with remote configuration](#change-sdk-settings-with-remote-configuration).
6. Publish the configuration to apply its enabled settings.

<div class="alert alert-warning">If your network, proxy, or Content Security Policy uses an allowlist, add <code>*.browser-intake-&lt;DC_REGION&gt;-datadoghq.com</code> for your application. This entry covers both RUM data intake and the SDK's remote configuration requests, which use the <code>sdk-configuration.</code> subdomain.</div>

## Change SDK settings with remote configuration

Remote configuration does not override any SDK settings by default. To manage a setting remotely, explicitly enable its override in Datadog, then configure its value. Settings without an enabled override continue to use the values configured in the SDK.

1. Enable the override for a setting that you want to manage remotely.

   <div class="alert alert-warning">Certain settings require corresponding module imports in the iOS and Android SDKs. If your application does not import these modules, remote configuration does not work for Session Replay, distributed tracing, or profiling.</div>

2. Configure the setting by selecting a state, changing its sampling rate, or adding data.
3. Save your changes.

## Configurable settings

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

[1]: /account_management/rbac/permissions/#real-user-monitoring
