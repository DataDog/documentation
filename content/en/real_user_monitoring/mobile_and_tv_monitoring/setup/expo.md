---
title: RUM Expo Setup
kind: documentation
description: Monitor your React Native projects using Expo and Expo Go with Datadog.
aliases:
    - /real_user_monitoring/reactnative/expo/
    - /real_user_monitoring/reactnative-expo/
code_lang: expo
type: multi-code-lang
code_lang_weight: 50
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/reactnative
  tag: Documentation
  text: RUM React Native Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Source code for dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor React Native applications
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---

## Overview

The RUM React Native SDK supports Expo and Expo Go. To use it, install `expo-datadog` and `@datadog/mobile-react-native`.

`expo-datadog` supports Expo starting from SDK 45 and the plugin's versions follow Expo versions. For example, if you use Expo SDK 45, use `expo-datadog` version `45.x.x`. Datadog recommends using **Expo SDK 45** as a minimum version; previous versions may require manual steps.

If you experience any issues setting up the Datadog SDK with an Expo application, you can see our [example application][8] as a reference.

## Setup

To install with NPM, run:

```sh
npm install expo-datadog @datadog/mobile-react-native
```

To install with Yarn, run:

```sh
yarn add expo-datadog @datadog/mobile-react-native
```

## Usage

### Initialize the library with application context

Add the following code snippet to your initialization file:

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions such as tapping on a button. You can use the 'accessibilityLabel' element property to give the tap action a name, otherwise the element type is reported.
    true, // track XHR resources.
    true // track errors.
);
// Optional: Select your Datadog website ("US1", "US3", "US5", EU1", or "US1_FED"). Default is "US1".
config.site = 'US1';
// Optional: Enable or disable native crash reports.
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
config.sessionSamplingRate = 80;
// Optional: Sample tracing integrations for network calls between your app and your backend, for example: 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default is 20%.
// You need to specify the hosts of your backends to enable tracing with these backends.
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // Matches 'example.com' and subdomains like 'api.example.com'.
// Optional: Let the Datadog SDK print internal logs above or equal to the provided level. Default is undefined, which means no logs.
config.verbosity = SdkVerbosity.WARN;

await DdSdkReactNative.initialize(config);

// Once the Datadog SDK is initialized, you need to setup view tracking in order to see data in the RUM dashboard.
```

### Upload source maps on EAS builds

<div class="alert alert-info"><p>If you have not enabled Crash Reporting, you can skip this step.<p></div>

Add `expo-datadog` to your plugins in the `app.json` file:

```json
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

This plugin takes care of uploading the dSYMs, source maps and Proguard mapping files on every EAS build.

Add `@datadog/datadog-ci` as a development dependency. This package contains scripts to upload the source maps. You can install it with NPM:

```sh
npm install @datadog/datadog-ci --save-dev
```

or with Yarn:

```sh
yarn add -D @datadog/datadog-ci
```

Run `eas secret:create` to set `DATADOG_API_KEY` to your Datadog API key, and `DATADOG_SITE` to the host of your Datadog site (for example, `datadoghq.com`).

For information about tracking Expo crashes, see [Expo Crash Reporting and Error Tracking][6].

## Tracking Expo Router screens

If you are using [Expo Router][7], track your screens in your `app/_layout.js` file:

```javascript
import { useEffect } from 'react';
import { usePathname, useSearchParams, useSegments, Slot } from 'expo-router';

export default function Layout() {
    const pathname = usePathname();
    const segments = useSegments();
    const viewKey = segments.join('/');

    useEffect(() => {
        DdRum.startView(viewKey, pathname);
    }, [viewKey, pathname]);

    // Export all the children routes in the most basic way.
    return <Slot />;
}
```

## Expo Go

If you are using Expo Go, switch to development builds (recommended), or keep using Expo Go without Datadog while having it run on your standalone application (not recommended).

### Switch from Expo Go to development builds

Your application's [development builds][3] are debug builds that contain the `expo-dev-client` package.

1. Enable the [custom native code to run][4] with `expo run:android` and `expo run:ios`.
2. To start using your development application, run `expo install expo-dev-client` and `expo start --dev-client`. This installs and starts the [`expo-dev-client` package][5] to execute the added native code in dev mode.

### Develop with Expo Go

When your application runs inside of Expo Go, you are unable to add any custom native code that is not part of the Expo Go application. Because the RUM React Native SDK relies on some custom native code to run, you can develop your application inside Expo Go without Datadog, and use Datadog in your standalone builds.

Your application crashes in Expo Go when some native code (that is not included) is called. To use Datadog with your standalone application and continue using Expo Go in development, add the following TypeScript file to your project:

```typescript
// mockDatadog.ts
// Datadog does not recommend this approach, consider moving to Expo development builds instead.
// This file is not officially maintained and might not be up-to-date with new releases.

import { DdLogs, DdTrace, DdRum, DdSdkReactNative } from 'expo-datadog';

if (__DEV__) {
    const emptyAsyncFunction = () => new Promise<void>(resolve => resolve());

    DdLogs.debug = emptyAsyncFunction;
    DdLogs.info = emptyAsyncFunction;
    DdLogs.warn = emptyAsyncFunction;
    DdLogs.error = emptyAsyncFunction;

    DdTrace.startSpan = () =>
        new Promise<string>(resolve => resolve('fakeSpanId'));
    DdTrace.finishSpan = emptyAsyncFunction;
    DdRum.startView = emptyAsyncFunction;
    DdRum.stopView = emptyAsyncFunction;
    DdRum.startAction = emptyAsyncFunction;
    DdRum.stopAction = emptyAsyncFunction;
    DdRum.addAction = emptyAsyncFunction;
    DdRum.startResource = emptyAsyncFunction;
    DdRum.stopResource = emptyAsyncFunction;
    DdRum.addError = emptyAsyncFunction;
    DdRum.addTiming = emptyAsyncFunction;

    DdSdkReactNative.initialize = emptyAsyncFunction;
    DdSdkReactNative.setUser = emptyAsyncFunction;
    DdSdkReactNative.setAttributes = emptyAsyncFunction;
    DdSdkReactNative.setTrackingConsent = emptyAsyncFunction;
}
```

Then, import it before initializing the Datadog React Native SDK:

```typescript
import './mockDatadog';
import { DdSdkReactNative } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(/* your config */);
DdSdkReactNative.initialize(config);
```

## Troubleshooting

### App produces a lot of /logs RUM Resources

When Resource tracking is enabled and SDK verbosity is set to `DEBUG`, each RUM Resource will trigger a `/logs` call to the Expo dev server to print the log, which will itself create a new RUM resource, creating an infinite loop.
The most common patterns of Expo dev server host URL are filtered by the SDK, therefore, you may not encounter this error in most situations.
If this error occurs, add the following RUM Resource mapper to filter out the calls:

```js
import { DdSdkReactNativeConfiguration } from 'expo-datadog';
import Constants from 'expo-constants';

const config = new DdSdkReactNativeConfiguration(/* your config */);
config.resourceEventMapper = event => {
  if (
    event.resourceContext?.responseURL ===
    `http://${Constants.expoConfig.hostUri}/logs`
  ) {
    return null;
  }
  return event;
};
```



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://docs.expo.dev/development/introduction/
[4]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[5]: https://docs.expo.dev/development/getting-started/
[6]: /real_user_monitoring/error_tracking/expo/
[7]: https://expo.github.io/router/docs/
[8]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-expo-react-navigation
