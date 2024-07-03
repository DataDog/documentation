---
title: React Native Log Collection
description: Collect logs from your React Native Mobile applications.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: dd-sdk-reactnative Source code
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
---

Send logs to Datadog from your React Native Mobile applications with [Datadog's `dd-sdk-reactnative` client-side logging library][1] and leverage the following features:

* Log to Datadog in JSON format natively.
* Add `context` and extra custom attributes to each log sent.
* Forward JavaScript caught exceptions.
* Record real client IP addresses and User-Agents.
* Optimized network usage with automatic bulk posts.

## Setup

1. Install the `@datadog/mobile-react-native` package

To install with NPM, run:

```sh
   npm install @datadog/mobile-react-native
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native
```

Then install the added pod:

```sh
(cd ios && pod install)
```

   Versions `1.0.0-rc5` and higher require you to have `compileSdkVersion = 31` in the Android application setup, which implies that you should use Build Tools version 31, Android Gradle Plugin version 7, and Gradle version 7 or higher. To modify the versions, change the values in the `buildscript.ext` block of your application's top-level `build.gradle` file. Datadog recommends using React Native version 0.67 or higher.

2. Initialize the library with your application context, tracking consent, and the [Datadog client token][2] and Application ID generated when you create a RUM application in the Datadog UI (see [Getting Started with React Native RUM Collection][6] for more information). For security reasons, you must use a client token; you cannot use [Datadog API keys][3] to configure the `dd-sdk-reactnative` library, as they would be exposed client-side in the mobile application. For more information about setting up a client token, see the [client token documentation][2]. 
{{< site-region region="us" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true // track errors
);
config.site = 'US1';
```
{{< /site-region >}}
{{< site-region region="us3" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons).
    true, // track XHR resources
    true // track errors
);
config.site = 'US3';
```
{{< /site-region >}}
{{< site-region region="us5" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'US5';

await DdSdkReactNative.initialize(config);
```
{{< /site-region >}}
{{< site-region region="eu" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'EU1';
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'US1_FED';
```
{{< /site-region >}}
{{< site-region region="ap1" >}}
```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration
} from '@datadog/mobile-react-native';

const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'AP1';
```
{{< /site-region >}}

   
3. Import the React Native logger:

   ```javascript
   import { DdLogs } from '@datadog/mobile-react-native';
   ```

4. Send a custom log entry directly to Datadog with one of the following functions:

    ```javascript
        DdLogs.debug('A debug message.', { customAttribute: 'something' })
        DdLogs.info('Some relevant information ?', { customCount: 42 })
        DdLogs.warn('An important warning…', {})
        DdLogs.error('An error was met!', {})
    ```

    **Note**: All logging methods can have a context object with custom attributes.
   
## Batch collection

All the logs are first stored on the local device in batches. Each batch follows the intake specification. They are sent as soon as network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while being offline, no data will be lost.

The data on disk will automatically be discarded if it gets too old to ensure the SDK doesn't use too much disk space.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-reactnative
[2]: /account_management/api-app-keys/#client-tokens
[3]: /account_management/api-app-keys/#api-keys
[4]: /logs/processing/attributes_naming_convention/
[5]: /tagging/
[6]: /real_user_monitoring/reactnative/?tab=us
