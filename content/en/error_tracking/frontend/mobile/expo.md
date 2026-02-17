---
title: Expo Crash Reporting and Error Tracking
description: Set up error tracking and crash reporting for Expo mobile apps in Datadog"
type: multi-code-lang
code_lang: expo
code_lang_weight: 30
further_reading:
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: Blog
  text: Debug Android crashes faster with Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: Blog
  text: Debug iOS crashes efficiently with Datadog
- link: /error_tracking/
  tag: Documentation
  text: Learn about Error Tracking
- link: /error_tracking/explorer
  tag: Documentation
  text: Visualize Error Tracking data in the Explorer
---

## Overview

Enable Expo Crash Reporting and Error Tracking to get comprehensive crash reports and error trends for your Expo mobile applications.

With this feature, you can access:

-   Aggregated Expo crash dashboards and attributes
-   Symbolicated iOS and deobfuscated Android crash reports
-   Trend analysis with Expo error tracking

In order to symbolicate your stack traces and deobfuscate Android crashes, upload your `.dSYM` files, Proguard mapping files and source maps to Datadog using the `expo-datadog` config plugin.

Debug symbols are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding debug symbols. This ensures that regardless of when the debug symbols were uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

**Note:** Error Tracking can be used as a standalone product or alongside [Real User Monitoring (RUM)][12]. If you're using RUM, Error Tracking is already included. See the [RUM Expo setup documentation][3] for RUM-specific configuration.

Your crash reports appear in [**Error Tracking**][1].

## Setup

### Step 1 - Install packages

Install the required packages for Expo Error Tracking:

{{< tabs >}}
{{% tab "NPM" %}}
```sh
npm install expo-datadog @datadog/mobile-react-native
npm install @datadog/datadog-ci --save-dev
```
{{% /tab %}}

{{% tab "Yarn" %}}
```sh
yarn add expo-datadog @datadog/mobile-react-native
yarn add -D @datadog/datadog-ci
```
{{% /tab %}}
{{< /tabs >}}

### Step 2 - Track view navigation

To see Error Tracking sessions populate in Datadog, you need to implement view tracking, which can be initialized manually or automatically.

#### Manual tracking

You can manually start and stop a view using the following `startView()` and `stopView()` methods:

```js
import { DdRum } from 'expo-datadog';

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

Automatic view tracking is supported for the following modules:

- React Navigation: [@Datadog/mobile-react-navigation][7]
- React Native Navigation: [@Datadog/mobile-react-native-navigation][8]

Example with React Navigation:

```tsx
<NavigationContainer
  ref={navigationRef}
  onReady={() => {
    DdRumReactNavigationTracking.startTrackingViews(
      navigationRef.current,
    );
  }}>
```

### Step 3 - Initialize the SDK

Add the following code to your initialization file to set up Error Tracking:

```js
import { CoreConfiguration } from 'expo-datadog';

const config = new CoreConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    trackingConsent,
    {
        site: 'US1', // Optional: Select your Datadog website ("US1", "US3", "US5", "EU1", or "US1_FED"). Default is "US1".
        rumConfiguration: {
            applicationId: '<APPLICATION_ID>', // RUM Application ID
            trackInteractions: true, // Track user interactions (set to false if using Error Tracking only)
            trackResources: true, // Track XHR resources (set to false if using Error Tracking only)
            trackErrors: true, // Track errors
            sessionSampleRate: 80, // Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
            nativeCrashReportEnabled: true // Optional: Enable or disable native crash reports.
        },
        logsConfiguration: {}, // Enable Logs
        traceConfiguration: {} // Enable Traces
    }
)

await DdSdkReactNative.initialize(config);
```

**Note:** If you're using Error Tracking as a standalone product without RUM, you can set the user interaction and XHR resource tracking parameters to `false`. However, view tracking (Step 2) is still required for Error Tracking sessions to be created.

### Step 4 - Configure the Expo plugin

Add `expo-datadog` to your plugins in the `app.json` file:

```json
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

This plugin automatically uploads dSYMs, source maps, and Proguard mapping files on every EAS build.

#### Plugin configuration options

You can customize the plugin behavior with these options:

| Parameter                     | Default | Description                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | Enables the uploading of dSYMS files for the symbolication of native iOS crashes.                                                  |
| `iosSourcemaps`               | `true`  | Enables the uploading of JavaScript source maps on iOS builds.                                                                     |
| `androidSourcemaps`           | `true`  | Enables the uploading of JavaScript source maps on Android builds.                                                                 |
| `androidProguardMappingFiles` | `true`  | Enables the uploading of Proguard mapping files to deobfuscate native Android crashes (is only applied if obfuscation is enabled). |
| `datadogGradlePluginVersion`  | `"1.+"` | Version of `dd-sdk-android-gradle-plugin` used for uploading Proguard mapping files.     |

Example with custom configuration:

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": true,
                        "iosSourcemaps": true,
                        "androidSourcemaps": true,
                        "androidProguardMappingFiles": true
                    }
                }
            ]
        ]
    }
}
```

### Step 5 - Configure EAS secrets

Expo Application Services (EAS) secrets are secure environment variables that store sensitive information like API keys for your Expo builds. Run `eas secret:create` to set up your Datadog credentials:

```sh
# Set your Datadog API key
eas secret:create --scope project --name DATADOG_API_KEY --value <YOUR_API_KEY>

# Set your Datadog site (optional, defaults to datadoghq.com)
eas secret:create --scope project --name DATADOG_SITE --value datadoghq.eu
```

### Step 6 - Configure source maps for accurate symbolication

#### Option A: Use Datadog Metro plugin (recommended)

Starting from `@datadog/mobile-react-native@2.10.0` and `@datadog/datadog-ci@v3.13.0`, add the Datadog Metro Plugin to your `metro.config.js`:

```js
const { getDatadogExpoConfig } = require("@datadog/mobile-react-native/metro");
const config = getDatadogExpoConfig(__dirname);
module.exports = config;
```

#### Option B: Manual Debug ID injection

Alternatively, use the `datadog-ci react-native inject-debug-id` command to manually attach a unique Debug ID to your application bundle and sourcemap. See the [command documentation][5] for usage instructions.

### Step 7 - Add git repository data (EAS only)

If you're using EAS to build your Expo application, set `cli.requireCommit` to `true` in your `eas.json` file to add git repository data to your mapping files:

```json
{
    "cli": {
        "requireCommit": true
    }
}
```

## Test your implementation

To verify your Expo Error Tracking configuration, you need to issue an error in your application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on a simulator, emulator, or a real device. If you are running on iOS, ensure that the debugger is not attached. Otherwise, Xcode captures the crash before the Datadog SDK does.
2. Execute some code containing an error or crash. For example:

   ```javascript
   const throwError = () => {
    throw new Error("My Error")
   }
   ```

3. For obfuscated error reports that do not result in a crash, you can verify symbolication and deobfuscation in [**Error Tracking**][1].
4. For crashes, after the crash happens, restart your application and wait for the React Native SDK to upload the crash report in [**Error Tracking**][1].

To make sure your source maps are correctly sent and linked to your application, you can also generate crashes with the [`react-native-performance-limiter`][6] package.

Install it with yarn or npm then re-install your pods:

```shell
yarn add react-native-performance-limiter # or npm install react-native-performance-limiter
(cd ios && pod install)
```

Crash the JavaScript thread from your app:

```javascript
import { crashJavascriptThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashJavascriptThread('custom error message');
};
```

Re-build your application for release to send the new source maps, trigger the crash and wait on the [Error Tracking][1] page for the error to appear.

To test your dSYMs and Proguard mapping files upload, crash the native main thread instead:

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```

## Expo Go

If you are using Expo Go, switch to development builds (recommended), or keep using Expo Go without Datadog while having it run on your standalone application (not recommended).

### Switch from Expo Go to development builds

Your application's [development builds][9] are debug builds that contain the `expo-dev-client` package.

1. Enable the [custom native code to run][10] with `expo run:android` and `expo run:ios`.
2. To start using your development application, run `expo install expo-dev-client` and `expo start --dev-client`. This installs and starts the [`expo-dev-client` package][11] to execute the added native code in dev mode.

### Develop with Expo Go

When your application runs inside of Expo Go, you are unable to add any custom native code that is not part of the Expo Go application. Because the React Native SDK relies on some custom native code to run, you can develop your application inside Expo Go without Datadog, and use Datadog in your standalone builds.

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
    DdSdkReactNative.setUserInfo = emptyAsyncFunction;
    DdSdkReactNative.clearUserInfo = emptyAsyncFunction;
    DdSdkReactNative.addUserExtraInfo = emptyAsyncFunction;
    DdSdkReactNative.clearAllData = emptyAsyncFunction;
    DdSdkReactNative.addAttributes = emptyAsyncFunction;
    DdSdkReactNative.removeAttributes = emptyAsyncFunction;
    DdSdkReactNative.setTrackingConsent = emptyAsyncFunction;
    DdSdkReactNative.setAccountInfo = emptyAsyncFunction;
    DdSdkReactNative.addAccountExtraInfo = emptyAsyncFunction;
    DdSdkReactNative.clearAccountInfo = emptyAsyncFunction;
}
```

Then, import it before initializing the Datadog React Native SDK:

```typescript
import './mockDatadog';
import { CoreConfiguration, DdSdkReactNative } from 'expo-datadog';

const config = new CoreConfiguration(/* your config */);
DdSdkReactNative.initialize(config);
```

## Additional configuration options

{{% collapse-content title="Disable file uploads" level="h4" expanded=false id="disable-file-uploads" %}}

You can disable some files from uploading by setting the `iosDsyms`, `iosSourcemaps`, `androidProguardMappingFiles`, or `androidSourcemaps` parameters to `false`.

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": false
                    }
                }
            ]
        ]
    }
}
```

If you want to disable **all file uploads**, remove `expo-datadog` from the list of plugins.

{{% /collapse-content %}}

{{% collapse-content title="List uploaded source maps" level="h4" expanded=false id="list-uploaded-source-maps" %}}

To verify that your source maps, dSYMs, and Proguard mapping files have been successfully uploaded and are available for symbolication, you can list all uploaded debug symbols.

See the [RUM Debug Symbols][13] page to view all uploaded symbols.

{{% /collapse-content %}}

{{% collapse-content title="Specify a custom release version" level="h4" expanded=false id="specify-custom-release-version" %}}

Use the `DATADOG_RELEASE_VERSION` environment variable to specify a different release version for your source maps, starting from `@datadog/mobile-react-native@2.3.5` and `@datadog/datadog-ci@v2.37.0`.

When the SDK is initialized with a version suffix, you must manually override the release version in order for the source map and build versions to match.

{{% /collapse-content %}}

{{% collapse-content title="Use Expo with Datadog and Sentry" level="h4" expanded=false id="use-expo-with-datadog-sentry" %}}

Both Datadog and Sentry config plugins use regular expressions to modify the "Bundle React Native code and images" iOS build phase to send the source map. This can make your EAS builds fail with a `error: Found argument 'datadog-ci' which wasn't expected, or isn't valid in this context` error.

To use both plugins, make sure to add the `expo-datadog` plugin first in order in your `app.json` file:

```
"plugins": [
    "expo-datadog",
    "sentry-expo"
]
```

If you are using the `expo-dev-client` and already have the `expo-datadog` plugin, revert its changes to the `project.pbxproj` file before adding `sentry-expo` and running `npx expo prebuild` with both plugins.

{{% /collapse-content %}}

{{% collapse-content title="Check source map file size limits" level="h4" expanded=false id="check-source-map-size" %}}

Source maps and mapping files are limited in size to **500 MB** each, while dSYM files can go up to **2 GB** each.

To compute the size of your source maps and bundle, run the following command:

```shell
npx react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.js \
  --bundle-output build/main.jsbundle \
  --sourcemap-output build/main.jsbundle.map

sourcemapsize=$(wc -c build/main.jsbundle.map | awk '{print $1}')
bundlesize=$(wc -c build/main.jsbundle | awk '{print $1}')
payloadsize=$(($sourcemapsize + $bundlesize))

echo "Size of source maps and bundle is $(($payloadsize / 1000000))MB"
```

If a `build` directory does not already exist, create it first by running `mkdir build`, then run the command above.

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://github.com/DataDog/expo-datadog
[3]: /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo/
[4]: https://app.datadoghq.com/source-code/setup/rum
[5]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/react-native/README.md#inject-debug-id
[6]: https://www.npmjs.com/package/react-native-performance-limiter
[7]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[8]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation
[9]: https://docs.expo.dev/development/introduction/
[10]: https://docs.expo.dev/workflow/customizing/#releasing-apps-with-custom-native-code-to
[11]: https://docs.expo.dev/development/getting-started/
[12]: /real_user_monitoring/
[13]: https://app.datadoghq.com/source-code/setup/rum
