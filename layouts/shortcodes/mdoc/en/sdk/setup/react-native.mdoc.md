<!--
This partial contains setup instructions for the React Native SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your applications for [Real User Monitoring (RUM)][1] with the React Native SDK. RUM includes Error Tracking by default, but if you have purchased Error Tracking as a standalone product, see the [Error Tracking setup guide][2] for specific steps.

The minimum supported version for the React Native SDK is React Native v0.65+. Compatibility with older versions is not guaranteed out-of-the-box.

## Setup

### Choose your setup method

{% tabs %}
{% tab label="React Native" %}

### Step 1 - Install the SDK

To install with NPM, run:

```shell
npm install @datadog/mobile-react-native
```

To install with Yarn, run:

```shell
yarn add @datadog/mobile-react-native
```

### iOS

Install the added pod:

```shell
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

### Step 2 - Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][7].
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings.

{% alert level="info" %}
If you've purchased Error Tracking as a standalone product (without RUM), navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][8] instead.
{% /alert %}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][9] to configure the `@datadog/mobile-react-native` library, they would be exposed client-side in the React Native application's code.

For more information about setting up a client token, see the [Client Token documentation][10].

### Step 3 - Initialize the library with application context

{% region-code-block title="US1" region="us" %}

```javascript
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

{% /region-code-block %}

{% region-code-block title="US3" region="us3" %}

```javascript
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

{% /region-code-block %}

{% region-code-block title="EU" region="eu" %}

```javascript
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

{% /region-code-block %}

{% region-code-block title="GOV" region="gov" %}

```javascript
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

{% /region-code-block %}

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM React Native SDK][11] as a percentage between 0 and 100. You can specify the rate with the `config.sessionSamplingRate` parameter.

#### Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the React Native SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `.PENDING`: The React Native SDK starts collecting and batching the data but does not send it to Datadog. The React Native SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `.GRANTED`: The React Native SDK starts collecting the data and sends it to Datadog.
3. `.NOTGRANTED`: The React Native SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the React Native SDK is initialized, use the `Datadog.set(trackingConsent:)` API call. The React Native SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.PENDING`:

- If you change the value to `.GRANTED`, the React Native SDK sends all current and future data to Datadog;
- If you change the value to `.NOTGRANTED`, the React Native SDK wipes all current data and does not collect future data.

### User interactions tracking

The preferred way to set up interaction tracking is by using the Datadog React Native Babel Plugin (`@datadog/mobile-react-native-babel-plugin`). This plugin automatically enriches React components with contextual metadata, improving interaction tracking accuracy and enabling a range of configuration options.

#### Installation

To install with NPM, run:

```shell
npm install @datadog/mobile-react-native-babel-plugin
```

To install with Yarn, run:

```shell
yarn add @datadog/mobile-react-native-babel-plugin
```

#### Configure Babel

Add the plugin to your Babel configuration file (`babel.config.js`, `.babelrc`, or similar):

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['@datadog/mobile-react-native-babel-plugin']
};
```

Once the plugin is installed and configured, it automatically tracks interactions on standard React Native components. No additional code changes are required for basic usage.

## Sending data when device is offline

The React Native SDK ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the React Native SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old to ensure the React Native SDK does not use too much disk space.

## Track background events

{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support][12].
{% /alert %}

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

{% /tab %}
{% tab label="Expo" %}

### Step 1 - Install the SDK

The RUM React Native SDK supports Expo and Expo Go. To use it, install `expo-datadog` and `@datadog/mobile-react-native`.

`expo-datadog` supports Expo starting from SDK 45 and the plugin's versions follow Expo versions. For example, if you use Expo SDK 45, use `expo-datadog` version `45.x.x`. Datadog recommends using **Expo SDK 45** as a minimum version; previous versions may require manual steps.

To install with NPM, run:

```shell
npm install expo-datadog @datadog/mobile-react-native
```

To install with Yarn, run:

```shell
yarn add expo-datadog @datadog/mobile-react-native
```

### Step 2 - Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][7].
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings.

{% alert level="info" %}
If you've purchased Error Tracking as a standalone product (without RUM), navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][8] instead.
{% /alert %}

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][10].

### Step 3 - Initialize the library with application context

Add the following code snippet to your initialization file:

```javascript
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType
} from 'expo-datadog';

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

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions. To set this rate, use the `config.sessionSamplingRate` parameter and specify a percentage between 0 and 100.

### Upload source maps on EAS builds

To enable crash reporting and error symbolication, add `expo-datadog` to your plugins in the `app.json` file:

```json
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

This plugin takes care of uploading the dSYMs, source maps and Proguard mapping files on every EAS build.

Add `@datadog/datadog-ci` as a development dependency. This package contains scripts to upload the source maps. You can install it with NPM:

```shell
npm install @datadog/datadog-ci --save-dev
```

or with Yarn:

```shell
yarn add -D @datadog/datadog-ci
```

Run `eas secret:create` to set `DATADOG_API_KEY` to your Datadog API key, and `DATADOG_SITE` to the host of your Datadog site (for example, `datadoghq.com`).

### User interactions tracking

Datadog recommends set up interaction tracking by using the Datadog React Native Babel Plugin (`@datadog/mobile-react-native-babel-plugin`). This plugin automatically enriches React components with contextual metadata, improving interaction tracking accuracy and enabling a range of configuration options.

To install with NPM, run:

```shell
npm install @datadog/mobile-react-native-babel-plugin
```

To install with Yarn, run:

```shell
yarn add @datadog/mobile-react-native-babel-plugin
```

Add the plugin to your Babel configuration file (`babel.config.js`, `.babelrc`, or similar):

```javascript
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: ['@datadog/mobile-react-native-babel-plugin']
};
```

Once the plugin is installed and configured, it automatically tracks interactions on standard React Native components. No additional code changes are required for basic usage.

{% /tab %}
{% tab label="CodePush" %}

If you're using [CodePush][13] to deploy updates to your React Native application, you need to use the CodePush-specific Datadog package to ensure proper version tracking and error symbolication.

### Step 1 - Install the SDK

See the [React Native Monitoring installation steps](#react-native) to install `@datadog/mobile-react-native`.

Then, install `@datadog/mobile-react-native-code-push`.

To install with NPM, run:

```shell
npm install @datadog/mobile-react-native-code-push
```

To install with Yarn, run:

```shell
yarn add @datadog/mobile-react-native-code-push
```

### Step 2 - Initialize with CodePush

#### Initializing with DdSdkReactNative.initialize

Replace `DdSdkReactNative.initialize` by `DatadogCodepush.initialize` in your code:

```javascript
import { DatadogCodepush } from '@datadog/mobile-react-native-code-push';
import { DatadogProviderConfiguration } from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
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

await DatadogCodepush.initialize(config);
```

#### Initializing with DatadogProvider

Replace `DatadogProvider` by `DatadogCodepushProvider` in your App component:

```javascript
import { DatadogCodepushProvider } from '@datadog/mobile-react-native-code-push';

export default function App() {
    return (
        <DatadogCodepushProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogCodepushProvider>
    );
}
```

As getting the CodePush version is an asynchronous step that needs to be performed before initializing the Datadog React Native SDK for RUM, there is no difference between `InitializationMode.SYNC` and `InitializationMode.ASYNC` when using `DatadogCodepushProvider`.

### Step 3 - Upload CodePush source maps

Each time you release a new CodePush version for your React Native application, you need to upload the source maps to Datadog to unminify errors. Using `@datadog/mobile-react-native-code-push` with the `datadog-ci react-native codepush` command ensures that the `version` is consistent in both reported crashes and uploaded source maps.

Install [`@datadog/datadog-ci`][14] as a development dependency to your project.

To install it with NPM:

```shell
npm install @datadog/datadog-ci --save-dev
```

To install it with Yarn:

```shell
yarn add -D @datadog/datadog-ci
```

Create a gitignored `datadog-ci.json` file at the root of your project containing your API key and the Datadog site (if not `datadoghq.com`):

```json
{
    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "site": "datadoghq.eu"
}
```

You can also export them as `DATADOG_API_KEY` and `DATADOG_SITE` environment variables.

When releasing a new CodePush bundle, specify a directory to output the source maps and bundle:

```shell
appcenter codepush release-react -a MyOrganization/MyApplication -d MyDeployment --sourcemap-output --output-dir ./build
```

Run the `datadog-ci react-native codepush` command by passing the adequate CodePush `app` and `deployment` arguments.

To run it with NPM:

```shell
npm run datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

To run it with Yarn:

```shell
yarn datadog-ci react-native codepush --platform ios --service com.company.app --bundle ./build/CodePush/main.jsbundle --sourcemap ./build/CodePush/main.jsbundle.map --app MyOrganization/MyApplication --deployment MyDeployment
```

{% /tab %}
{% /tabs %}

## Sending data when device is offline

The React Native SDK ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the React Native SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old to ensure the React Native SDK does not use too much disk space.

## Track background events

{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support][12].
{% /alert %}

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

[1]: /real_user_monitoring/
[2]: /error_tracking/
[3]: https://microsoft.github.io/code-push/
[4]: /real_user_monitoring/application_monitoring/react_native/setup/codepush
[5]: https://docs.expo.dev/
[6]: /real_user_monitoring/application_monitoring/react_native/setup/expo
[7]: https://app.datadoghq.com/rum/application/create
[8]: https://app.datadoghq.com/error-tracking/settings/setup/client/
[9]: /account_management/api-app-keys/#api-keys
[10]: /account_management/api-app-keys/#client-tokens
[11]: /real_user_monitoring/application_monitoring/react_native/setup/reactnative/#initialize-the-library-with-application-context
[12]: https://docs.datadoghq.com/help/
[13]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[14]: https://github.com/DataDog/datadog-ci

