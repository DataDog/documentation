<!--
React Native CLI setup instructions.
-->

### Step 1 - Install the SDK

To install with npm, run:

```shell
npm install @datadog/mobile-react-native
```

To install with Yarn, run:

```shell
yarn add @datadog/mobile-react-native
```

### Install dependencies for iOS

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

For data security, you must use a client token. If you used only [Datadog API keys][9] to configure the `@datadog/mobile-react-native` library, they would be exposed client-side in the React Native application's code.

For more information about setting up a client token, see the [Client Token documentation][10].

### Step 3 - Initialize the library with application context

{% site-region region="us" %}

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

{% /site-region %}

{% site-region region="us3" %}

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

{% /site-region %}

{% site-region region="eu" %}

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

{% /site-region %}

{% site-region region="gov" %}

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

{% /site-region %}

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM React Native SDK](#step-3--initialize-the-library-with-application-context) as a percentage between 0 and 100. You can specify the rate with the `config.sessionSamplingRate` parameter.

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

To install with npm, run:

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

After the plugin is installed and configured, it automatically tracks interactions on standard React Native components. No additional code changes are required for basic usage.

### CodePush integration (optional)

If you're deploying updates with [CodePush][11], see the [CodePush setup documentation][12] for additional configuration steps.

[7]: https://app.datadoghq.com/rum/application/create
[8]: https://app.datadoghq.com/error-tracking/settings/setup/client/
[9]: /account_management/api-app-keys/#api-keys
[10]: /account_management/api-app-keys/#client-tokens
[11]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[12]: /real_user_monitoring/application_monitoring/react_native/setup/codepush

