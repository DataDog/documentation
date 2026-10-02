<!--
React Native setup instructions.
-->

{% stepper %}

{% step title="Add the dependencies" %}

To install with npm, run:

```shell
npm install @datadog/mobile-react-native
```

To install with Yarn, run:

```shell
yarn add @datadog/mobile-react-native
```

#### Install dependencies for iOS

Install the added pod:

```shell
(cd ios && pod install)
```

#### Install dependencies for Android

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

{% /step %}

{% step title="Initialize the SDK" %}

{% site-region region="us" %}

```javascript
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType,
    TrackingConsent
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    TrackingConsent.GRANTED,
    {
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
            // Optional: Session sample rate. Default is 100 (all sessions).
            sessionSampleRate: 100,
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
    }
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
    PropagatorType,
    TrackingConsent
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    TrackingConsent.GRANTED,
    {
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
            // Optional: Session sample rate. Default is 100 (all sessions).
            sessionSampleRate: 100,
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
    }
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
    PropagatorType,
    TrackingConsent
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    TrackingConsent.GRANTED,
    {
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
            // Optional: Session sample rate. Default is 100 (all sessions).
            sessionSampleRate: 100,
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
    }
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
    PropagatorType,
    TrackingConsent
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    TrackingConsent.GRANTED,
    {
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
            // Optional: Session sample rate. Default is 100 (all sessions).
            sessionSampleRate: 100,
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
    }
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

{% site-region region="gov2" %}

```javascript
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType,
    TrackingConsent
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    TrackingConsent.GRANTED,
    {
        // Optional: Configure the Datadog Site to target. Default is 'US1'.
        site: 'US2_FED',
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
            // Optional: Session sample rate. Default is 100 (all sessions).
            sessionSampleRate: 100,
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
    }
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

{% site-region region="uk1" %}

```javascript
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType,
    TrackingConsent
} from '@datadog/mobile-react-native';

// Configure Datadog SDK
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    TrackingConsent.GRANTED,
    {
        // Optional: Configure the Datadog Site to target. Default is 'US1'.
        site: 'UK1',
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
            // Optional: Session sample rate. Default is 100 (all sessions).
            sessionSampleRate: 100,
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
    }
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

You can adjust the session sample rate with the `sessionSampleRate` parameter, but Datadog recommends using [retention filters](/real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/) to control retained volume. For details, see [Manage Sessions](/real_user_monitoring/setup/enable_rum/manage_sessions/?platform=react_native).

{% /step %}

{% step title="Configure tracking consent (GDPR compliance)" %}

To be compliant with the GDPR regulation, the React Native SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `.PENDING`: The React Native SDK starts collecting and batching the data but does not send it to Datadog. The React Native SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `.GRANTED`: The React Native SDK starts collecting the data and sends it to Datadog.
3. `.NOTGRANTED`: The React Native SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the React Native SDK is initialized, use the `Datadog.set(trackingConsent:)` API call. The React Native SDK changes its behavior according to the new value.

For example, if the current tracking consent is `.PENDING`:

- If you change the value to `.GRANTED`, the React Native SDK sends all current and future data to Datadog;
- If you change the value to `.NOTGRANTED`, the React Native SDK wipes all current data and does not collect future data.

{% /step %}

{% step title="Enable RUM to start sending data" %}

RUM is enabled when you pass a `rumConfiguration` to the SDK configuration. To configure what RUM collects, such as views, user interactions, and network requests, continue to [Enable the Datadog RUM Module](/real_user_monitoring/setup/enable_rum/?platform=react_native).

{% /step %}
{% /stepper %}

## CodePush integration (optional)

If you're deploying updates with [CodePush][1], see the [CodePush setup documentation][2] for additional configuration steps.

## Sending data when device is offline

The React Native SDK helps make data available when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough so the React Native SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old so the React Native SDK does not use too much disk space.

[1]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[2]: /real_user_monitoring/application_monitoring/react_native/setup/codepush
