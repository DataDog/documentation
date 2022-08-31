---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/README.md
description: Collect RUM data from your React Native projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative Source code
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor React Native applications
kind: documentation
title: React Native Monitoring
---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application’s individual users.

The minimum supported version for the RUM React Native SDK is React Native v0.63.4+. Compatibility with older versions is not guaranteed out-of-the-box.

The RUM React Native SDK supports [Expo][12]. For more information, see the [Expo documentation][13].

## Setup

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native
```

Versions `1.0.0-rc5` and higher require you to have `compileSdkVersion = 31` in the Android application setup, which implies that you should use Build Tools version 31, Android Gradle Plugin version 7, and Gradle version 7 or higher. To modify the versions, change the values in the `buildscript.ext` block of your application's top-level `build.gradle` file. Datadog recommends using React Native version 0.67 or higher.

### Specify application details in the UI

1. In the [Datadog app][1], navigate to **UX Monitoring** > **RUM Applications** > **New Application**.
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.

{{< img src="real_user_monitoring/react_native/image_reactnative.png" alt="Create a RUM application in Datadog workflow" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][3] to configure the `@datadog/mobile-react-native` library, they would be exposed client-side in the React Native application's code.

For more information about setting up a client token, see the [Client Token documentation][4].

### Initialize the library with application context

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
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'US1';
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'
// Optional: set the reported service name (by default, it'll use the package name / bundleIdentifier of your Android / iOS app respectively)
config.serviceName = 'com.example.reactnative';
// Optional: let the SDK print internal logs (above or equal to the provided level. Default = undefined (meaning no logs))
config.verbosity = SdkVerbosity.WARN;

await DdSdkReactNative.initialize(config);

// Once SDK is initialized you need to setup view tracking to be able to see data in the RUM Dashboard.
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
    true, // track User interactions (e.g.: Tap on buttons).
    true, // track XHR Resources
    true // track Errors
);
config.site = 'US3';
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

await DdSdkReactNative.initialize(config);

// Once SDK is initialized you need to setup view tracking to be able to see data in the RUM Dashboard.
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
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

await DdSdkReactNative.initialize(config);

// Once SDK is initialized you need to setup view tracking to be able to see data in the RUM Dashboard.
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
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

await DdSdkReactNative.initialize(config);

// Once SDK is initialized you need to setup view tracking to be able to see data in the RUM Dashboard.
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
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend will be linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

await DdSdkReactNative.initialize(config);

// Once SDK is initialized you need to setup view tracking to be able to see data in the RUM Dashboard.
```

{{< /site-region >}}

### User interactions tracking

If user interactions tracking is enabled as in the code example above, the SDK traverses up the hierarchy of components starting from the component that received a tap, looking for `dd-action-name` property. Once found, it is used as a name for the action reported.

Alternatively, you can use the `accessibilityLabel` element property to give the tap action a name; otherwise, the element type is reported. You can check the sample app for usage examples.

### Track view navigation

Because React Native offers a wide range of libraries to create screen navigation, only manual view tracking is supported by default. To see RUM sessions populate in Datadog, you need to implement view tracking.

You can manually start and stop a view using the following `startView()` and `stopView` methods.

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    DdRum
} from '@datadog/mobile-react-native';

// Start a view with a unique view identifier, a custom view url, and an object to attach additional attributes to the view
DdRum.startView(
    '<view-key>',
    '/view/url',
    { 'custom.foo': 'something' },
    Date.now()
);
// Stops a previously started view with the same unique view identifier, and an object to attach additional attributes to the view
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

Use one of Datadog's integrations to automatically track views for the following libraries:

-   If you use the [`react-native-navigation`][5] library, then add the `@datadog/mobile-react-native-navigation` package and follow the [setup instructions][6].
-   If you use the [`react-navigation`][7] library, then add the `@datadog/mobile-react-navigation` package and follow the [setup instructions][8].

## Track custom attributes

You can attach user information to all RUM events to get more detailed information from your RUM sessions.

### User information

For user-specific information, use the following code wherever you want in your app (after the SDK has been initialized). The `id`, `name`, and `email` attributes are built into Datadog, and you can add other attributes that makes sense for your app.

```js
DdSdkReactNative.setUser({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'premium'
});
```

If you want to clear the user information (for example, when the user signs out), you can do so by passing an empty object, as follows:

```js
DdSdkReactNative.setUser({});
```

### Global attributes

You can also keep global attributes to track information about a specific session, such as A/B testing configuration, ad campaign origin, or cart status.

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## Manual instrumentation

If automatic instrumentation doesn't suit your needs, you can manually create RUM Events and Logs:

```js
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    DdRum
} from '@datadog/mobile-react-native';

// Initialize the SDK
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track User interactions (e.g.: Tap on buttons)
    true, // track XHR Resources
    true // track Errors
);
DdSdkReactNative.initialize(config);

// Send logs (use the debug, info, warn or error methods)
DdLogs.debug('Lorem ipsum dolor sit amet…', {});
DdLogs.info('Lorem ipsum dolor sit amet…', {});
DdLogs.warn('Lorem ipsum dolor sit amet…', {});
DdLogs.error('Lorem ipsum dolor sit amet…', {});

// Track RUM Views manually
DdRum.startView('<view-key>', 'View Url', {}, Date.now());
//…
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());

// Track RUM Actions manually
DdRum.addAction('TAP', 'button name', {}, Date.now());
// or in case of continuous action
DdRum.startAction('TAP', 'button name', {}, Date.now());
// to stop action above
DdRum.stopAction({}, Date.now());

// Add custom timings
DdRum.addTiming('<timing-name>');

// Track RUM Errors manually
DdRum.addError('<message>', 'source', '<stacktrace>', {}, Date.now());

// Track RUM Resource manually
DdRum.startResource(
    '<res-key>',
    'GET',
    'http://www.example.com/api/v1/test',
    {},
    Date.now()
);
//…
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());

// Send spans manually
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## Resource timings

Resource tracking is able to provide the following timings:

-   `First Byte`: The time between the scheduled request and the first byte of the response. This includes time for the request preparation on the native level, network latency, and the time it took the server to prepare the response.
-   `Download`: The time it took to receive a response.

## Data Storage

### Android

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. This cache folder is protected by [Android's Application Sandbox][10], meaning that on most devices this data can't be read by other applications. However, if the mobile device is rooted, or someone tempers with the Linux kernel, the stored data might become readable.

### iOS

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][11], which can't be read by any other app installed on the device.

## Development mode

While in development mode, your application can submit extra events related to the React Native tooling, such as code transformation errors and requests to a local development server.

To prevent these events from showing in the dashboard, you can disable errors and resources tracking in dev mode using the `__DEV__` flag:

```
const config = new DdSdkReactNativeConfiguration(
	CLIENT_TOKEN,
	ENVIRONMENT,
	APPLICATION_ID,
	true,
	!__DEV__  /* trackResources will be false in DEV mode, true otherwise */,
	!__DEV__  /* trackErrors will be false in DEV mode, true otherwise */,
	trackingConsent
)
```

## Troubleshooting

### Usage with `use_frameworks!`

If you have `use_frameworks!` enabled in your `Podfile`, running `pod install` after adding the SDK is likely to trigger an error like this one:

```shell
The 'Pods-MyApp' target has transitive dependencies that include statically linked binaries: (DatadogSDKBridge, DatadogSDKCrashReporting)
```

To prevent that error, you can overwrite `use_frameworks!` and install all pods as static except for the ones that needs to be a framework:

```ruby
dynamic_frameworks = ['DatadogSDKBridge','DatadogSDKCrashReporting']

# Make all the other frameworks into static frameworks by overriding the static_framework? function to return true
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if !dynamic_frameworks.include?(pod.name)
      def pod.static_framework?;
        true
      end
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
```

**Note:** This solution comes from this [StackOverflow][14] post.

## License

For more information, see [Apache License, v2.0][9]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[5]: https://github.com/wix/react-native-navigation
[6]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation
[7]: https://github.com/react-navigation/react-navigation
[8]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[9]: https://github.com/DataDog/dd-sdk-reactnative/blob/main/LICENSE
[10]: https://source.android.com/security/app-sandbox
[11]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[12]: https://docs.expo.dev/
[13]: https://docs.datadoghq.com/real_user_monitoring/reactnative/expo/
[14]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505
