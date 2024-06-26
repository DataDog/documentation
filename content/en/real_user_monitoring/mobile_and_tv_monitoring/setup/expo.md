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
  tag: "Source Code"
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

If you experience any issues setting up the Datadog SDK with an Expo application, you can see our [example application][1] as a reference.

## Setup

To install with NPM, run:

```sh
npm install expo-datadog @datadog/mobile-react-native
```

To install with Yarn, run:

```sh
yarn add expo-datadog @datadog/mobile-react-native
```

### Track view navigation

To see RUM sessions populate in Datadog, you need to implement view tracking, which can be initialized manually or automatically.

#### Manual tracking

You can manually start and stop a view using the following `startView()` and `stopview()` methods.

```js
import {
    DdRum
} from 'expo-datadog';

// Start a view with a unique view identifier, a custom view name, and an object to attach additional attributes to the view
DdRum.startView(
    '<view-key>', // <view-key> has to be unique, for example it can be ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// Stops a previously started view with the same unique view identifier, and an object to attach additional attributes to the view
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

#### Automatic tracking

Automatic view tracking is supported for the the following modules:

- React Navigation: [@Datadog/mobile-react-navigation][2]
- React Native Navigation: [@Datadog/mobile-react-native-navigation][3]

In this Datadog example project, View Tracking is achieved through `@datadog/mobile-react-navigation` and is configured using the `NavigationContainer`:

```tsx
<NavigationContainer
          ref={navigationRef}
          onReady={() => {
            DdRumReactNavigationTracking.startTrackingViews(
              navigationRef.current,
            );
          }}>
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

#### Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM Expo SDK][4] as a percentage between 0 and 100. To set this rate, use the `config.sessionSamplingRate` parameter. 

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

For information about tracking Expo crashes, see [Expo Crash Reporting and Error Tracking][5].

## Tracking Expo Router screens

If you are using [Expo Router][6], track your screens in your `app/_layout.js` file:

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

Your application's [development builds][7] are debug builds that contain the `expo-dev-client` package.

1. Enable the [custom native code to run][8] with `expo run:android` and `expo run:ios`.
2. To start using your development application, run `expo install expo-dev-client` and `expo start --dev-client`. This installs and starts the [`expo-dev-client` package][9] to execute the added native code in dev mode.

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

When Resource tracking is enabled and SDK verbosity is set to `DEBUG`, each RUM Resource triggers a `/logs` call to the Expo dev server to print the log, which itself creates a new RUM resource, creating an infinite loop.
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

[1]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-expo-react-navigation
[2]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[3]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation
[4]: /real_user_monitoring/mobile_and_tv_monitoring/setup/expo#initialize-the-library-with-application-context
[5]: /real_user_monitoring/error_tracking/mobile/expo/
[6]: https://expo.github.io/router/docs/
[7]: https://docs.expo.dev/development/introduction/
[8]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[9]: https://docs.expo.dev/development/getting-started/
