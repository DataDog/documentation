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

If user interactions tracking is enabled, the Datadog React Native SDK traverses up the hierarchy of components starting from the component that received a tap, looking for `dd-action-name` property. Once found, it is used as a name for the action reported.

Alternatively, you can use the `accessibilityLabel` element property to give the tap action a name; otherwise, the element type is reported. You can check the sample app for usage examples.


## Track background events

<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration to track background events:

```javascript
configuration.trackBackgroundEvents = true;
```


## Sending data when device is offline

The React Native SDK ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the React Native SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old to ensure the React Native SDK does not use too much disk space.



## Get deobfuscated stack traces
In order to symbolicate your stack traces, manually upload your source maps and native debug symbols into Datadog.


{{% collapse-content title="Use debug symbols to deobfuscate your stack traces " level="h5" %}}

Debug symbols are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding debug symbols. This ensures that regardless of when the debug symbols were uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

For React Native applications, the matching of stack traces and source maps relies on a combination of the `service`, `version`, `bundle_name`, and `platform` fields. Out of all source maps that match with these fields, Datadog uses the one with the highest `build_number` value.

In order to make your application's size smaller, its code is minified when it is built for release. To link errors to your actual code, you need to upload the following symbolication files:

-   JavaScript source maps for your iOS JavaScript bundle
-   JavaScript source maps for your Android JavaScript bundle
-   dSYMs for your iOS native code
-   Proguard mapping files if you have enabled code obfuscation for your Android native code

To set your project up to send the symbolication files automatically, run `npx datadog-react-native-wizard`.

See the wizard [official documentation][18] for options.

{{% /collapse-content %}}


{{% collapse-content title="Use Datadog Metro Configuration" level="h5" %}}

Starting from `@datadog/mobile-react-native@2.9.0` and `@datadog/datadog-ci@v3.10.0`, the SDK exports a Datadog Metro Plugin, which attaches a unique Debug ID to your application bundle and sourcemap.

Add it to your `metro.config.js` to allow for accurate symbolication of stacktraces on Datadog:

```js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withDatadogMetroConfig} = require('@datadog/mobile-react-native/metro');

// Your configuration
const config = mergeConfig(getDefaultConfig(__dirname), {});

module.exports = withDatadogMetroConfig(config);
```
{{% /collapse-content %}}



{{% collapse-content title="Use the 'datadog-ci react-native inject-debug-id' command" level="h5" %}}

As an alternative to the Metro Configuration, starting from `@datadog/mobile-react-native@2.9.0` and `@datadog/datadog-ci@v3.10.0`, you can use the `datadog-ci react-native inject-debug-id` command to manually attach a unique Debug ID to your application bundle and sourcemap.

Usage instructions are available on the [command documentation page][19].

### Passing options for your uploads

#### Using the `datadog-sourcemaps.gradle` script

To specify a different service name, add the following code to your `android/app/build.gradle` file, before the `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"` line:

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```
{{% /collapse-content %}}


{{% collapse-content title="Passing options for your uploads" level="h5" %}}

#### Using the `datadog-sourcemaps.gradle` script

To specify a different service name, add the following code to your `android/app/build.gradle` file, before the `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"` line:

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```

#### Using the `datadog-ci react-native xcode` command

Options for the `datadog-ci react-native xcode` command are available on the [command documentation page][20].

#### Specifying a custom release version

Use the `DATADOG_RELEASE_VERSION` environment variable to specify a different release version for your source maps, starting from `@datadog/mobile-react-native@2.3.5` and `@datadog/datadog-ci@v2.37.0`.

When the SDK is initialized with a version suffix, you must manually override the release version in order for the source map and build versions to match.

{{% /collapse-content %}}


{{% collapse-content title="List uploaded source maps" level="h5" %}}

See the [RUM Debug Symbols][16] page to view all uploaded symbols.

{{% /collapse-content %}}

<br>

## Data storage

{{% collapse-content title="Android" level="h5" %}}

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. This cache folder is protected by [Android's Application Sandbox][21], meaning that on most devices this data can't be read by other applications. However, if the mobile device is rooted, or someone tampers with the Linux kernel, the stored data might become readable.
{{% /collapse-content %}}


{{% collapse-content title="iOS" level="h5" %}}
Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][22], which can't be read by any other app installed on the device.
{{% /collapse-content %}}












































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
[18]: https://github.com/DataDog/datadog-react-native-wizard
[19]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/react-native/README.md#inject-debug-id
[20]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#xcode
[21]: https://source.android.com/security/app-sandbox
[22]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web



