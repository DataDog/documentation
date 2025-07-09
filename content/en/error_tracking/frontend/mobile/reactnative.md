---
title: React Native Crash Reporting and Error Tracking
type: multi-code-lang
code_lang: reactnative
code_lang_weight: 60
disable_toc: false
---

## Overview

This page describes how to instrument your applications for Crash Reporting and Error Tracking with the React Native SDK. With these features, you can access:

-   Aggregated React Native crash dashboards and attributes
-   Symbolicated React Native (JavaScript and native iOS or Android) crash reports
-   Trend analysis with React Native Error Tracking

The minimum supported version for the React Native SDK is React Native v0.63.4+. Compatibility with older versions is not guaranteed out-of-the-box.

Your crash reports appear in [**Error Tracking**][14].


## Setup

### Installation steps

To install with NPM, run:

```sh
npm install @datadog/mobile-react-native
```

To install with Yarn, run:

```sh
yarn add @datadog/mobile-react-native
```

For OS-specific installation: 

{{< tabs >}}
{{% tab "Android" %}}

If you use a React Native version strictly over 0.67, make sure to use Java version 17. If you use React Native version equal or below ot 0.67, make sure to use Java version 11.

In your `android/build.gradle` file, specify the `kotlinVersion` to avoid clashes among kotlin dependencies:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

The Datadog React Native SDK requires you to have `compileSdkVersion = 31` or higher in the Android application setup, which implies that you should use Build Tools version 31 or higher, Android Gradle Plugin version 7, and Gradle version 7 or higher. To modify the versions, change the values in the `buildscript.ext` block of your application's top-level `build.gradle` file. Datadog recommends using a React Native version that's actively supported.

{{% /tab %}}

{{% tab "iOS" %}}
Install the added pod:

```sh
(cd ios && pod install)
```
{{% /tab %}}
{{< /tabs >}}



### Specify application details in the UI


1. In Datadog, navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][15].
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings.

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Create an application for React Native in Datadog" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][7] to configure the `@datadog/mobile-react-native` library, they would be exposed client-side in the React Native application's code.

For more information about setting up a client token, see the [Client Token documentation][16].


### Initialize the library with application context

{{< site-region region="us" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // Track user interactions (such as a tap on buttons).
    true, // Track XHR resources
    true // Track errors
);
config.site = 'US1';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions (in this example, 80% of session are sent to Datadog. Default is 100%).
config.sessionSamplingRate = 80;
// Optional: Sample tracing integrations for network calls between your app and your backend (in this example, 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default is 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'
// Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
config.serviceName = 'com.example.reactnative';
// Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
config.verbosity = SdkVerbosity.WARN;

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // Track user interactions (such as a tap on buttons).
    true, // Track XHR resources
    true // Track errors
);
config.site = 'US3';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions (here, 80% of sessions are sent to Datadog. Default = 100%).
config.sessionSamplingRate = 80;
// Optional: Sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // Track User interactions (e.g.: Tap on buttons).
    true, // Track XHR Resources
    true // Track Errors
);
config.site = 'US5';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions (here, 80% of sessions are sent to Datadog. Default = 100%).
config.sessionSamplingRate = 80;
// Optional: Sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // Matches 'example.com' and subdomains like 'api.example.com'

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}
// Once the Datadog React Native SDK is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // Track User interactions (e.g.: Tap on buttons).
    true, // Track XHR Resources
    true // Track Errors
);
config.site = 'EU1';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions (here, 80% of sessions are sent to Datadog. Default = 100%).
config.sessionSamplingRate = 80;
// Optional: Sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default = 20%)
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

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
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // Track User interactions (e.g.: Tap on buttons).
    true, // Track XHR Resources
    true // Track Errors
);
config.site = 'US1_FED';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions (here, 80% of sessions are sent to Datadog. Default = 100%)
config.sessionSamplingRate = 80;
// Optional: Sample tracing integrations for network calls between your app and your backend (here, 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default = 20%).
// You need to specify the hosts of your backends to enable tracing with these backends
config.resourceTracingSamplingRate = 80;
config.firstPartyHosts = ['example.com']; // matches 'example.com' and subdomains like 'api.example.com'

//Wrap the content of your App component in a DatadogProvider component, passing it your configuration:

export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}
// Once the Datadog React Native SDK is initialized, you need to setup view tracking to be able to see data in the RUM dashboard
```

{{< /site-region >}}


### Add Crash Reporting

Update your initialization snippet to enable native JavaScript crash reporting:

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<APPLICATION_ID>',
    true,
    true,
    true // enable JavaScript crash reporting
);
config.nativeCrashReportEnabled = true; // enable native crash reporting
```

<div class="alert alert-info">

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM React Native SDK][17] as a percentage between 0 and 100. You can specify the rate with the `config.sessionSamplingRate` parameter.



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

</div>

### User interactions tracking

If user interactions tracking is enabled as in the code example above, the Datadog React Native SDK traverses up the hierarchy of components starting from the component that received a tap, looking for `dd-action-name` property. Once found, it is used as a name for the action reported.

Alternatively, you can use the `accessibilityLabel` element property to give the tap action a name; otherwise, the element type is reported. You can check the sample app for usage examples.


## Track background events

<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```javascript
configuration.trackBackgroundEvents = true;
```











































































## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /error_tracking/
[3]: https://microsoft.github.io/code-push/
[4]: /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/codepush
[5]: https://docs.expo.dev/
[6]: /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo
[7]: /account_management/api-app-keys/#api-keys
[8]: /account_management/api-app-keys/#client-tokens
[9]: /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/#initialize-the-library-with-application-context
[10]: /getting_started/tagging/#define-tags
[11]: https://source.android.com/security/app-sandbox
[12]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[13]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505
[14]: https://app.datadoghq.com/rum/error-tracking
[15]: https://app.datadoghq.com/error-tracking/settings/setup/client/
[16]: /account_management/api-app-keys/#client-tokens
[17]: /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/#initialize-the-library-with-application-context

