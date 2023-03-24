---
title: Track Browser and Mobile Errors
kind: documentation
description: Learn how to track browser and mobile errors from your logs.
is_beta: true
further_reading:
  - link: 'https://www.datadoghq.com/blog/error-tracking/'
    tag: 'Blog'
    text: 'Make sense of application issues with Datadog Error Tracking'
  - link: '/logs/error_tracking/explorer/'
    tag: 'Documentation'
    text: 'Learn about the Error Tracking Explorer'
---

## Overview

Error Tracking processes errors collected from browser and mobile Datadog SDKs. Whenever an error containing a stack trace is collected, Error Tracking processes and groups it under an _issue_, which is a grouping of similar errors.

An essential attribute for log errors is the stack trace in a log's `error.stack`. If you are sending stack traces to Datadog but they are not in `error.stack`, you can set up a [generic log remapper][6] to remap the stack trace to the correct attribute in Datadog.

Your crash reports appear in [**Error Tracking**][2].

## Setup

{{< tabs >}}
{{% tab "Browser" %}}

If you have not setup the Datadog Browser SDK yet, follow the [in-app setup instructions][1] or see the [Browser Logs setup documentation][2].

1. Download the latest version of the [Logs Browser SDK][3] (Error Tracking requires at least `v4.36.0`).
2. Configure your application's `version`, `env`, and `service` when [initializing the SDK][4].
3. Initialize your SDK, for example, with NPM:

   ```javascript
   import { datadogLogs } from '@datadog/browser-logs'

   datadogLogs.init({
     clientToken: '<DATADOG_CLIENT_TOKEN>',
     site: '<DATADOG_SITE>',
     service: '<MY_SERVICE>',
     env: '<MY_ENV>',
     forwardErrorsToLogs: true,
     sessionSampleRate: 100,
   })
   ```

4. To log a caught exception yourself, you may optionally use:

   ```javascript
   const err = new Error('an exception occurred');
   datadogLogs.logger.error("an error occured", {usr: {id: 123}}, err);
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /logs/log_collection/javascript/#setup
[3]: https://github.com/DataDog/browser-sdk/tree/main/packages/logs
[4]: /logs/log_collection/javascript/#choose-the-right-installation-method

{{% /tab %}}
{{% tab "Android" %}}

If you have not setup the Datadog Android SDK yet, follow the [in-app setup instructions][1] or see the [Android Logs setup documentation][2].

1. Download the latest version of the [Datadog Android SDK for Logs][3].
2. Configure your application's `version`, `env`, and `service` when [initializing the SDK][4].
3. To log a caught exception yourself, you may optionally use:

   ```java
   try {
     doSomething();
   } catch (IOException e) {
     logger.e("an exception occurred", e);
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]:/logs/log_collection/android/#setup
[3]: https://github.com/Datadog/dd-sdk-android
[4]: /logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

If you have not setup the Datadog iOS SDK yet, follow the [in-app setup instructions][1] or see the [iOS Logs setup documentation][2].

1. Download the latest version of the [Datadog iOS SDK for Logs][3].
2. Configure your application's `version`, `env`, and `service` when [initializing the SDK][4].
3. To log a caught exception yourself, you may optionally use:

   ```java
   do {
     // ...
   } catch {
     logger.error("an exception occurred", error)
   }
   ```

[1]: https://app.datadoghq.com/logs/onboarding/client
[2]: /logs/log_collection/ios/#setup
[3]: https://github.com/Datadog/dd-sdk-ios
[4]: /logs/log_collection/ios/?tab=cocoapods#setup

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/logs/error-tracking
[3]: https://app.datadoghq.com/logs/onboarding/client
[4]: /logs/log_collection/javascript/#setup
[5]: /logs/log_collection/javascript/#choose-the-right-installation-method
[6]: /logs/log_configuration/processors/?tab=ui#remapper
