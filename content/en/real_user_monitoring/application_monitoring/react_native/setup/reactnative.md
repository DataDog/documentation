---
title: React Native Monitoring Setup
description: Collect RUM and Error Tracking data from your React Native projects.
type: multi-code-lang
code_lang: reactnative
code_lang_weight: 1
aliases:
    - /real_user_monitoring/react-native/
    - /real_user_monitoring/reactnative/
    - /real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative
    - /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
    - /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/
further_reading:
- link: /real_user_monitoring/application_monitoring/react_native/advanced_configuration
  tag: Documentation
  text: RUM React Native Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: Source code for dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor React Native applications
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: Documentation
  text: Monitor hybrid React Native applications
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

This page describes how to instrument your applications for both [Real User Monitoring (RUM)][1] or [Error Tracking][2] with the React Native SDK. You can follow the steps below to instrument your applications for RUM (includes Error Tracking), or Error Tracking if you have purchased it as a standalone product.

The minimum supported version for the React Native SDK is React Native v0.65+. Compatibility with older versions is not guaranteed out-of-the-box.

The React Native SDK supports the following services:

- [CodePush][3]. For more information, see the [CodePush documentation][4].
- [Expo][5]. For more information, see the [Expo documentation][6].

## Setup

Follow these instructions to manually add and configure the RUM SDK in your React Native application.

### Manual setup

To send RUM data from your React Native application to Datadog, complete the following steps.

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native
```

### iOS

Install the added pod:

```sh
(cd ios && pod install)
```

### Android

If you use a React Native version strictly over 0.67, make sure to use Java version 17. If you use React Native version equal or below 0.67, make sure to use Java version 11.

In your `android/build.gradle` file, specify the `kotlinVersion` to avoid clashes among kotlin dependencies:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

The minimum supported Android SDK version is API level 23. Make sure to set `minSdkVersion` to 23 (or higher) in your Android configuration.

The Datadog React Native SDK requires you to have `compileSdkVersion = 31` or higher in the Android application setup, which implies that you should use Build Tools version 31 or higher, Android Gradle Plugin version 7, and Gradle version 7 or higher. To modify the versions, change the values in the `buildscript.ext` block of your application's top-level `build.gradle` file. Datadog recommends using a React Native version that's actively supported.

### Specify application details in the UI

{{< tabs >}}
{{% tab "RUM" %}}

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1].
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings.

   {{< img src="real_user_monitoring/react_native/reactnative_setup.png" alt="Create a RUM application for React Native in Datadog" style="width:90%;">}}


[1]: https://app.datadoghq.com/rum/application/create
{{% /tab %}}
{{% tab "Error Tracking" %}}

1. In Datadog, navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][1].
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings.

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Create an application for React Native in Datadog" style="width:90%;">}}


[1]: https://app.datadoghq.com/error-tracking/settings/setup/client/
{{% /tab %}}
{{< /tabs >}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][7] to configure the `@datadog/mobile-react-native` library, they would be exposed client-side in the React Native application's code.

For more information about setting up a client token, see the [Client Token documentation][8].

### Initialize the library with application context

{{< site-region region="us" >}}

```js
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>', 
    '<ENVIRONMENT_NAME>',
    // Optional: Configure the Datadog Site to target. Default is 'US1'.
    site: 'US1',
    // Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
    service: 'com.example.reactnative',
    // Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
    verbosity: SdkVerbosity.WARN,
    // Enable RUM
    rumConfiguration: {
        // Required: RUM Application ID
        applicationId: '<APPLICATION_ID>',
        // Track user interactions (set to false if using Error Tracking only)
        trackInteractions: true,
        // Track XHR resources (set to false if using Error Tracking only)
        trackResources: true,
        // Track errors
        trackErrors: true,
        // Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
        sessionSampleRate: 80,
        // Optional: Enable or disable native crash reports.
        nativeCrashReportEnabled: true,
        // Optional: Sample tracing integrations for network calls between your app and your backend 
        // (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
        // the APM view. Default is 20%).
        // You need to specify the hosts of your backends to enable tracing with these backends
        resourceTraceSampleRate: 80,
        firstPartyHosts: [
            { 
                match: 'example.com', 
                propagatorTypes: [
                    PropagatorType.DATADOG,
                    PropagatorType.TRACECONTEXT
                ]
            }
        ]
    },
    // Enable Logs with default configuration
    logsConfiguration: {},
    // Enable Trace with default configuration
    traceConfiguration: {}
);

// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```js
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>', 
    '<ENVIRONMENT_NAME>',
    // Optional: Configure the Datadog Site to target. Default is 'US1'.
    site: 'US3',
    // Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
    service: 'com.example.reactnative',
    // Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
    verbosity: SdkVerbosity.WARN,
    // Enable RUM
    rumConfiguration: {
        // Required: RUM Application ID
        applicationId: '<APPLICATION_ID>',
        // Track user interactions (set to false if using Error Tracking only)
        trackInteractions: true,
        // Track XHR resources (set to false if using Error Tracking only)
        trackResources: true,
        // Track errors
        trackErrors: true,
        // Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
        sessionSampleRate: 80,
        // Optional: Enable or disable native crash reports.
        nativeCrashReportEnabled: true,
        // Optional: Sample tracing integrations for network calls between your app and your backend 
        // (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
        // the APM view. Default is 20%).
        // You need to specify the hosts of your backends to enable tracing with these backends
        resourceTraceSampleRate: 80,
        firstPartyHosts: [
            { 
                match: 'example.com', 
                propagatorTypes: [
                    PropagatorType.DATADOG,
                    PropagatorType.TRACECONTEXT
                ]
            }
        ]
    },
    // Enable Logs with default configuration
    logsConfiguration: {},
    // Enable Trace with default configuration
    traceConfiguration: {}
);

// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```js
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>', 
    '<ENVIRONMENT_NAME>',
    // Optional: Configure the Datadog Site to target. Default is 'US1'.
    site: 'EU1',
    // Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
    service: 'com.example.reactnative',
    // Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
    verbosity: SdkVerbosity.WARN,
    // Enable RUM
    rumConfiguration: {
        // Required: RUM Application ID
        applicationId: '<APPLICATION_ID>',
        // Track user interactions (set to false if using Error Tracking only)
        trackInteractions: true,
        // Track XHR resources (set to false if using Error Tracking only)
        trackResources: true,
        // Track errors
        trackErrors: true,
        // Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
        sessionSampleRate: 80,
        // Optional: Enable or disable native crash reports.
        nativeCrashReportEnabled: true,
        // Optional: Sample tracing integrations for network calls between your app and your backend 
        // (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
        // the APM view. Default is 20%).
        // You need to specify the hosts of your backends to enable tracing with these backends
        resourceTraceSampleRate: 80,
        firstPartyHosts: [
            { 
                match: 'example.com', 
                propagatorTypes: [
                    PropagatorType.DATADOG,
                    PropagatorType.TRACECONTEXT
                ]
            }
        ]
    },
    // Enable Logs with default configuration
    logsConfiguration: {},
    // Enable Trace with default configuration
    traceConfiguration: {}
);

// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```js
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>', 
    '<ENVIRONMENT_NAME>',
    // Optional: Configure the Datadog Site to target. Default is 'US1'.
    site: 'US1_FED',
    // Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
    service: 'com.example.reactnative',
    // Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
    verbosity: SdkVerbosity.WARN,
    // Enable RUM
    rumConfiguration: {
        // Required: RUM Application ID
        applicationId: '<APPLICATION_ID>',
        // Track user interactions (set to false if using Error Tracking only)
        trackInteractions: true,
        // Track XHR resources (set to false if using Error Tracking only)
        trackResources: true,
        // Track errors
        trackErrors: true,
        // Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
        sessionSampleRate: 80,
        // Optional: Enable or disable native crash reports.
        nativeCrashReportEnabled: true,
        // Optional: Sample tracing integrations for network calls between your app and your backend 
        // (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
        // the APM view. Default is 20%).
        // You need to specify the hosts of your backends to enable tracing with these backends
        resourceTraceSampleRate: 80,
        firstPartyHosts: [
            { 
                match: 'example.com', 
                propagatorTypes: [
                    PropagatorType.DATADOG,
                    PropagatorType.TRACECONTEXT
                ]
            }
        ]
    },
    // Enable Logs with default configuration
    logsConfiguration: {},
    // Enable Trace with default configuration
    traceConfiguration: {}
);

// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
```

{{< /site-region >}}

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM React Native SDK][9] as a percentage between 0 and 100. You can specify the rate with the `config.sessionSamplingRate` parameter.

#### Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the React Native SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `.PENDING`: The React Native SDK starts collecting and batching the data but does not send it to Datadog. The RUM iOReact NativeS SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `.GRANTED`: The React Native SDK starts collecting the data and sends it to Datadog.
3. `.NOTGRANTED`: The RUM iReact NativeOS SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the React Native SDK is initialized, use the `Datadog.set(trackingConsent:)` API call. The React Native SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.PENDING`:

- If you change the value to `.GRANTED`, the React Native SDK sends all current and future data to Datadog;
- If you change the value to `.NOTGRANTED`, the React Native SDK wipes all current data and does not collect future data.

### Override the reported version

By default, the Datadog React Native SDK reports the `version` as the commercial version of your app (for example, "1.2.44").

If you use an Over The Air (OTA) updates provider like Microsoft's CodePush, you can override this version to indicate which version of your JavaScript code is running.

Datadog recommends using a `versionSuffix` to the `DatadogProviderConfiguration` object:

```js
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    {
       versionSuffix: 'codepush.3'
    }
);
```

If the commercial version of your app is "1.2.44", it is reported as "1.2.44-codepush.3" in Datadog. A dash (`-`) is automatically added between the version and the suffix.

You can also completely override the version by specifying the `version` field.

For more information about limitations on the version field, see the [Tags documentation][10].

### User interactions tracking

The preferred way to set up interaction tracking is by using the Datadog React Native Babel Plugin (`@datadog/mobile-react-native-babel-plugin`). This plugin automatically enriches React components with contextual metadata, improving interaction tracking accuracy and enabling a range of configuration options.

#### Installation

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native-babel-plugin
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native-babel-plugin
```

#### Configure Babel

Add the plugin to your Babel configuration file (`babel.config.js`, `.babelrc`, or similar):

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['@datadog/mobile-react-native-babel-plugin']
};
```

#### Basic usage

Once the plugin is installed and configured, it automatically tracks interactions on standard React Native components. No additional code changes are required for basic usage.

#### Configuration options

You can customize the plugin's behavior to match your application's needs:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      '@datadog/mobile-react-native-babel-plugin',
      {
        sessionReplay: {
          // Enable SVG tracking for Session Replay (default: false)
          svgTracking: true
        },
        components: {
          // Use component content as action name (default: true)
          useContent: true,
          // Prefix actions with component name (default: true)
          useNamePrefix: true,
        },
      },
    ],
  ],
};
```
#### Tracking custom components

For custom components, you can configure specific tracking behavior:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      '@datadog/mobile-react-native-babel-plugin',
      {
        components: {
          tracked: [
            {
              name: 'CustomButton',
              // Prop your component uses as content (if available)
              // When not set, the plugin tries to find the most likely match
              contentProp: 'label',
              handlers: [{event: 'onPress', action: 'TAP'}],
            },
            {
              name: 'CustomInput',
              handlers: [{event: 'onFocus', action: 'TAP'}],
            },
          ],
        },
      },
    ],
  ],
};
```

#### Custom action names

You can specify custom action names for components using the `actionNameAttribute` configuration:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      '@datadog/mobile-react-native-babel-plugin',
      {
        actionNameAttribute: 'data-dd-action-name',
      },
    ],
  ],
};
```

Then use it in your components:

```jsx
<Button data-dd-action-name="checkout-button" onPress={handleCheckout}>
  Complete Purchase
</Button>
```

## Sending data when device is offline

The React Native SDK ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the React Native SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old to ensure the React Native SDK does not use too much disk space.

## Track background events

<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

## Data storage

### Android

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. This cache folder is protected by [Android's Application Sandbox][11], meaning that on most devices this data can't be read by other applications. However, if the mobile device is rooted, or someone tampers with the Linux kernel, the stored data might become readable.

### iOS

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][12], which can't be read by any other app installed on the device.

## Development mode

While in development mode, your application can submit extra events related to the React Native tooling, such as code transformation errors and requests to a local development server.

To prevent these events from showing in the dashboard, you can disable errors and resources tracking in dev mode using the `__DEV__` flag:

```js
const rumConfig = new RumConfiguration(
    '<APPLICATION_ID>',
    true, // Track user interactions (such as a tap on buttons).
    !__DEV__, // Track XHR resources
    !__DEV__  // Track errors
);
```

## New architecture support

The [React Native new architecture][14] is supported by the React Native SDK in version `>=1.8.0`.

The minimum supported React Native version for the new architecture is `0.71`.

## Troubleshooting

### Usage with `use_frameworks!`

If you have `use_frameworks!` enabled in your `Podfile`, running `pod install` after adding the SDK is likely to trigger an error like this one:

```shell
The 'Pods-MyApp' target has transitive dependencies that include statically linked binaries: (DatadogSDKBridge, DatadogSDKCrashReporting)
```

To prevent that error, edit your `Podfile` to install the React Native SDK pod as a static library:

```ruby
static_libraries = ['DatadogSDKReactNative']

# Turn pods with static dependencies into static libraries by overriding the static_framework? function to return true
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if static_libraries.include?(pod.name)
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

**Note**: This solution comes from this [StackOverflow][13] post.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /error_tracking/
[3]: https://microsoft.github.io/code-push/
[4]: /real_user_monitoring/application_monitoring/react_native/setup/codepush
[5]: https://docs.expo.dev/
[6]: /real_user_monitoring/application_monitoring/react_native/setup/expo
[7]: /account_management/api-app-keys/#api-keys
[8]: /account_management/api-app-keys/#client-tokens
[9]: /real_user_monitoring/application_monitoring/react_native/setup/reactnative/#initialize-the-library-with-application-context
[10]: /getting_started/tagging/#define-tags
[11]: https://source.android.com/security/app-sandbox
[12]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[13]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505
[14]: https://reactnative.dev/architecture/landing-page
