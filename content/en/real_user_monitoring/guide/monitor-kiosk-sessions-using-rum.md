---
title: Monitor Kiosk Sessions Using RUM

description: Guide for monitoring kiosk sessions with RUM.
further_reading:
- link: '/real_user_monitoring/platform/dashboards/'
  tag: 'Documentation'
  text: 'RUM Dashboards'

---

## Overview
Kiosk applications, such as fast food order machines and airline check-in terminals, often serve multiple users in quick succession. For that reason, triggering the end of a session based on a user action instead of waiting for an automatic session expiration (such as 15 minutes of inactivity or 4 hours total duration) is vital for collecting accurate session data and metrics for each user. With Datadog RUM SDKs, you can use this capability for an improved session tracking experience.

## Use `stopSession()` when users end their interaction

Use the SDK `stopSession()` method to stop the session when the user finishes their interaction with the application, like when returning to the home screen or logging out. A new session is created as soon as a user interacts with the application again or when a new View is started (mobile only).

If a user is identified within the session, you may want to clear user information after calling `stopSession()` to start afresh. See documentation based on your application's framework: [Browser][1], [iOS][2], [Android][3], [Flutter][4], [React Native][5].

### Browser

This feature requires RUM Browser SDK version >= v4.37.0. See installation instructions [here][6]. 

The `stopSession()` method differs depending on your installation method.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
datadogRum.stopSession()
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
DD_RUM.onReady(function() {
    DD_RUM.stopSession()
})
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
  window.DD_RUM.stopSession()
```

{{% /tab %}}
{{< /tabs >}}

If the application is open in **multiple browser tabs**, stopping the RUM session ends the session in all tabs.

If the application is using the **Logs SDK**, stopping the RUM session ends the Logs session as well.

### Mobile

The `stopSession()` method differs depending on your mobile SDK framework.

{{< tabs >}}
{{% tab "iOS" %}}

This feature requires RUM iOS SDK version >= 1.18.0. See installation instructions [here][1]. 

```swift
// SDK v1
Global.rum.stopSession()

// SDK v2
RUMMonitor.shared().stopSession()
```

[1]: https://docs.datadoghq.com/real_user_monitoring/ios/

{{% /tab %}}
{{% tab "Android" %}}

This feature requires RUM Android SDK version >= 1.19.0. See installation instructions [here][1]. 

```kotlin
GlobalRum.get().stopSession()
```

[1]: https://docs.datadoghq.com/real_user_monitoring/android/

{{% /tab %}}
{{% tab "Flutter" %}}

This feature requires RUM Flutter SDK version >= 1.4.0. See installation instructions [here][1].

```dart
DatadogSdk.instance.rum?.stopSession();
```

[1]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/

{{% /tab %}}
{{% tab "React Native" %}}

This feature requires RUM React Native SDK version >= 1.6.0. See installation instructions [here][1].

```javascript
DdRum.stopSession()
```

[1]: https://docs.datadoghq.com/real_user_monitoring/reactnative/

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/advanced_configuration/?tab=cdnsync#clear-user-session-property
[2]: /real_user_monitoring/ios/advanced_configuration/?tab=swift
[3]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#track-user-sessions
[4]: /real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/advanced_configuration/#track-user-sessions
[5]: /real_user_monitoring/reactnative/#user-information
[6]: /real_user_monitoring/browser/