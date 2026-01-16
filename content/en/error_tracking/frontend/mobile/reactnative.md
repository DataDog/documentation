---
title: React Native Crash Reporting and Error Tracking
type: multi-code-lang
code_lang: reactnative
code_lang_weight: 60
---

## Overview 

Enable React Native Crash Reporting and Error Tracking to get comprehensive crash reports and error trends. With this feature, you can access:

-   Aggregated React Native crash dashboards and attributes
-   Symbolicated React Native (JavaScript and native iOS or Android) crash reports
-   Trend analysis with React Native Error Tracking

**Note**: In order to symbolicate your stack traces, you must manually upload your source maps and native debug symbols into Datadog.

## Setup

If you have not set up the React Native SDK yet, follow the [in-app setup instructions][16] or see the [React Native setup documentation][17]. Then, follow the steps on this page to enable React Native Crash Reporting and Error Tracking.

 

### Step 1 - Specify application details in the UI

1. In Datadog, navigate to [**Error Tracking** > **Settings** > **Browser and Mobile**][1] and click **+ New Application**.
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings.

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Create an application for React Native in Datadog" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][6] to configure the `@datadog/mobile-react-native` library, they would be exposed client-side in the React Native application's code.

For more information about setting up a client token, see the [Client Token documentation][7].

### Step 2- Initialize the library with application context

{{< site-region region="us" >}}

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<APPLICATION_ID>',
    true, // Track user interactions (such as a tap on buttons).
    true, // Track XHR resources
    true // Track errors
);
config.site = 'US1';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample sessions (in this example, 80% of session are sent to Datadog. Default is 100%).
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
    '<APPLICATION_ID>',
    true, // Track user interactions (such as a tap on buttons).
    true, // Track XHR resources
    true // Track errors
);
config.site = 'US3';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample sessions (here, 80% of sessions are sent to Datadog. Default = 100%).
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
    '<APPLICATION_ID>',
    true, // Track User interactions (e.g.: Tap on buttons).
    true, // Track XHR Resources
    true // Track Errors
);
config.site = 'US5';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample sessions (here, 80% of sessions are sent to Datadog. Default = 100%).
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
    '<APPLICATION_ID>',
    true, // Track User interactions (e.g.: Tap on buttons).
    true, // Track XHR Resources
    true // Track Errors
);
config.site = 'EU1';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample sessions (here, 80% of sessions are sent to Datadog. Default = 100%).
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
    '<APPLICATION_ID>',
    true, // Track User interactions (e.g.: Tap on buttons).
    true, // Track XHR Resources
    true // Track Errors
);
config.site = 'US1_FED';
// Optional: Enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: Sample sessions (here, 80% of sessions are sent to Datadog. Default = 100%)
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
```
{{< /site-region >}}


<br>

### Step 3 - Add Crash Reporting

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

Your crash reports appear in [**Error Tracking**][18].

### Step 4 - Get deobfuscated stack traces
To symbolicate your stack traces, manually upload your native debug symbols and source maps into Datadog.

#### How deobfuscation works
Debug symbols are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding debug symbols. This ensures that regardless of when the debug symbols were uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

For React Native applications, the matching of stack traces and source maps relies on a combination of the `service`, `version`, `bundle_name`, and `platform` fields. Out of all source maps that match with these fields, Datadog uses the one with the highest `build_number` value.

#### How to unminify stack traces
To make your application's size smaller, its code is minified when it is built for release. To unminify, or link errors to your actual code, you need to upload the following symbolication files:

-   JavaScript source maps for your iOS JavaScript bundle
-   JavaScript source maps for your Android JavaScript bundle
-   dSYMs for your iOS native code
-   Proguard mapping files if you have enabled code obfuscation for your Android native code

To set your project up to send the symbolication files automatically, run `npx datadog-react-native-wizard`.

See the wizard [official documentation][8] for options.

#### How to configure deobfuscation

{{% collapse-content title="Using Datadog Metro Configuration" level="h5" %}}

Starting from `@datadog/mobile-react-native@2.10.0` and `@datadog/datadog-ci@v3.13.0`, the SDK exports a Datadog Metro Plugin, which attaches a unique Debug ID to your application bundle and sourcemap.

Add it to your `metro.config.js` to allow for accurate symbolication of stacktraces on Datadog:

```js
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withDatadogMetroConfig} = require('@datadog/mobile-react-native/metro');

// Your configuration
const config = mergeConfig(getDefaultConfig(__dirname), {});

module.exports = withDatadogMetroConfig(config);
```
{{% /collapse-content %}}


{{% collapse-content title="Using the `datadog-ci react-native inject-debug-id` command" level="h5" %}}

As an alternative to the Metro Configuration, starting from `@datadog/mobile-react-native@2.10.0` and `@datadog/datadog-ci@v3.13.0`, you can use the `datadog-ci react-native inject-debug-id` command to manually attach a unique Debug ID to your application bundle and sourcemap.

Usage instructions are available on the [command documentation page][201].

[201]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/react-native/README.md#inject-debug-id

{{% /collapse-content %}}


{{% collapse-content title="Passing options for your uploads" level="h5" %}}
##### Using the `datadog-sourcemaps.gradle` script

To specify a different service name, add the following code to your `android/app/build.gradle` file, before the `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"` line:

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```

##### Using the `datadog-ci react-native xcode` command

Options for the `datadog-ci react-native xcode` command are available on the [command documentation page][301].

##### Specifying a custom release version

Use the `DATADOG_RELEASE_VERSION` environment variable to specify a different release version for your source maps, starting from `@datadog/mobile-react-native@2.3.5` and `@datadog/datadog-ci@v2.37.0`.

When the SDK is initialized with a version suffix, you must manually override the release version in order for the source map and build versions to match.

[301]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/react-native#xcode
{{% /collapse-content %}}
<br>

#### List uploaded source maps

See the [RUM Debug Symbols][9] page to view all uploaded symbols.



## Advanced Error Tracking Features

{{% collapse-content title="Set tracking consent (GDPR compliance)" level="h4" %}}

To be compliant with the GDPR regulation, the React Native SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

`.PENDING`
: The React Native SDK starts collecting and batching the data but does not send it to Datadog. The React Native SDK waits for the new tracking consent value to decide what to do with the batched data.

`.GRANTED`
: The React Native SDK starts collecting the data and sends it to Datadog.

`.NOTGRANTED`
: The React Native SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.


To change the tracking consent value and behavior after the React Native SDK is initialized, use the `Datadog.set(trackingConsent:)` API call.

For example, assuming the current tracking consent is `.PENDING`:

- If you change the `trackingConsent` value to `.GRANTED`, the React Native SDK sends all current and future data to Datadog;
- If you change the `trackingConsent` value to `.NOTGRANTED`, the React Native SDK wipes all current data and does not collect future data.

{{% /collapse-content %}}

{{% collapse-content title="Set sample session rates" level="h4" %}}

To control the data your application sends to Datadog, you can specify a sampling rate for sessions while [initializing the React Native SDK][101] as a percentage between 0 and 100. You can specify the rate with the `config.sessionSamplingRate` parameter.

[101]: /real_user_monitoring/application_monitoring/react_native/setup/reactnative?tab=rum#initialize-the-library-with-application-context

{{% /collapse-content %}}


{{% collapse-content title="Override the reported version" level="h4" %}}

By default, the Datadog React Native SDK reports the `version` as the commercial version of your app (for example, "1.2.44").

If you use an Over The Air (OTA) updates provider like Microsoft's CodePush, you can override this version to indicate which version of your JavaScript code is running.

Datadog recommends using a `versionSuffix` to the `DatadogProviderConfiguration` object:

```js
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<APPLICATION_ID>',
    true,
    true,
    true
);

config.versionSuffix = 'codepush.3';
```

If the commercial version of your app is `1.2.44`, it is reported as `1.2.44-codepush.3` in Datadog. A dash (`-`) is automatically added between the version and the suffix.

You can also completely override the version by specifying the `version` field. However, make sure you set it correctly, as it has to match the one specified during the upload of your source maps and other mapping files.

For more information about limitations on the version field, see the [Tags documentation][501].

[501]: /getting_started/tagging/#define-tags

{{% /collapse-content %}}



{{% collapse-content title="Track user interactions" level="h4" %}}
If user interactions tracking is enabled as in the code example above, the Datadog React Native SDK traverses up the hierarchy of components starting from the component that received a tap, looking for `dd-action-name` property. Once found, it is used as a name for the action reported.

Alternatively, you can use the `accessibilityLabel` element property to give the tap action a name; otherwise, the element type is reported. You can check the sample app for usage examples.

{{% /collapse-content %}}



{{% collapse-content title="Track background events" level="h4" %}}

<div class="alert alert-info"><p>Track background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```javascript
configuration.trackBackgroundEvents = true;
```
{{% /collapse-content %}}


{{% collapse-content title="Send data when device is offline" level="h4" %}}

The React Native SDK ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the React Native SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old to ensure the React Native SDK does not use too much disk space.

{{% /collapse-content %}}


{{% collapse-content title="Data storage" level="h4" %}}
##### Android

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. This cache folder is protected by [Android's Application Sandbox][19], meaning that on most devices this data can't be read by other applications. However, if the mobile device is rooted, or someone tampers with the Linux kernel, the stored data might become readable.

##### iOS

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][20], which can't be read by any other app installed on the device.

{{% /collapse-content %}}


{{% collapse-content title="Development mode" level="h4" %}}
While in development mode, your application can submit extra events related to the React Native tooling, such as code transformation errors and requests to a local development server.

To prevent these events from showing in the dashboard, you can disable errors and resources tracking in dev mode using the `__DEV__` flag:

```js
const config = new DatadogProviderConfiguration(
	CLIENT_TOKEN,
	ENVIRONMENT,
	APPLICATION_ID,
	true,
	!__DEV__  /* trackResources will be false in DEV mode, true otherwise */,
	!__DEV__  /* trackErrors will be false in DEV mode, true otherwise */,
	trackingConsent
)
```
{{% /collapse-content %}}


{{% collapse-content title="New architecture support" level="h4" %}}
The [React Native new architecture][601] is supported by the React Native SDK in version `>=1.8.0`.

The minimum supported React Native version for the new architecture is `0.71`.

[601]: https://reactnative.dev/architecture/landing-page

{{% /collapse-content %}}


## Limitations

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

## Test your implementation

To verify your React Native Crash Reporting and Error Tracking configuration, you need to issue an error in your application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on a simulator, emulator, or a real device. If you are running on iOS, ensure that the debugger is not attached. Otherwise, Xcode captures the crash before the Datadog SDK does.
2. Execute some code containing an error or crash. For example:

   ```javascript
   const throwError = () => {
    throw new Error("My Error")
   }
   ```

3. For obfuscated error reports that do not result in a crash, you can verify symbolication and deobfuscation in [**Error Tracking**][18].
4. For crashes, after the crash happens, restart your application and wait for the React Native SDK to upload the crash report in [**Error Tracking**][18].

To make sure your source maps are correctly sent and linked to your application, you can also generate crashes with the [`react-native-performance-limiter`][10] package.

Install it with yarn or npm then reinstall your pods:

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

Rebuild your application for release to send the new source maps, trigger the crash and wait on the [Error Tracking][1] page for the error to appear.

To test your dSYMs and Proguard mapping files upload, crash the native main thread instead:

```javascript
import { crashNativeMainThread } from 'react-native-performance-limiter';

const crashApp = () => {
    crashNativeMainThread('custom error message');
};
```


## Additional configuration options

### Alternatives to `datadog-react-native-wizard` for symbolication

If using `datadog-react-native-wizard` did not succeed or if you don't want to upload your symbolication files automatically on each release, follow the next steps to symbolicate crash reports.

#### Upload JavaScript source maps on iOS builds

First, you need to install `@datadog/datadog-ci` as a dev dependency to your project:

```bash
yarn add -D @datadog/datadog-ci
# or
npm install --save-dev @datadog/datadog-ci
```

{{% collapse-content title="Automatically on each release build (React Native >= 0.69)" level="h5" %}}

Manually uploading your source maps on every release build takes time and is prone to errors. Datadog recommends automatically sending your source maps every time you run a release build.

Create a script file named `datadog-sourcemaps.sh` at the root of your project containing the following:

```shell
#!/bin/sh
set -e

DATADOG_XCODE="../node_modules/.bin/datadog-ci react-native xcode"

/bin/sh -c "$DATADOG_XCODE"
```

This script runs a command that takes care of uploading the source maps with all the correct parameters. For more information, see the [datadog-ci documentation][11].

Open your `.xcworkspace` with Xcode, then select your project > Build Phases > Bundle React Native code and images. Edit the script to look like the following:

```shell
set -e
WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
# Add these two lines
REACT_NATIVE_XCODE="./datadog-sourcemaps.sh"
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map

# Edit the next line
/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

For the upload to work, you need to provide your Datadog API key. If you use a command-line tool or an external service, you can specify it as a `DATADOG_API_KEY` environment variable. If you run the build from Xcode, create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.

{{% /collapse-content %}}

{{% collapse-content title="Automatically on each release build (React Native < 0.69)" level="h5" %}}

Open your `.xcworkspace` with Xcode, then select your project > Build Phases > Bundle React Native code and images. Edit the script to look like the following:

```shell
set -e

export NODE_BINARY=node
export SOURCEMAP_FILE=$DERIVED_FILE_DIR/main.jsbundle.map
../node_modules/.bin/datadog-ci react-native xcode
```

This script runs a command that takes care of uploading the source maps with all the correct parameters. For more information, see the [datadog-ci documentation][11].

For the upload to work, you need to provide your Datadog API key. If you use a command-line tool or an external service, you can specify it as a `DATADOG_API_KEY` environment variable. If you run the build from Xcode, create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.

{{% /collapse-content %}}

{{% collapse-content title="Manually on each build" level="h5" %}}

To output a source map, you need to edit the Xcode build phase "Bundle React Native Code and Images".

1. Open the `ios/YourAppName.xcworkspace` file in Xcode.
2. In the left panel, select the "File" icon and click on your project.
3. In the central panel, select "Build Phases" from the top bar.

Change the script by adding this after the `set -e` line:

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- add this line to output source maps
# leave the rest of the script unchanged
```

Moving forward, you can find the source maps for your bundle on every iOS build.

To find the path to your bundle file from Xcode, display the Report Navigator on Xcode and filter by `BUNDLE_FILE` for its location.

The usual location is `~/Library/Developer/Xcode/DerivedData/YourAppName-verylonghash/Build/Intermediates.noindex/ArchiveIntermediates/YourAppName/BuildProductsPath/Release-iphoneos/main.jsbundle`, where `YourAppName` is the name of your app, and `verylonghash` is a 28 letter hash.

To upload the source maps, run this from your React Native project:

```bash
export DATADOG_API_KEY= # fill with your API key
export SERVICE=com.myapp # replace by your service name
export VERSION=1.0.0 # replace by the version of your app in Xcode
export BUILD=100 # replace by the build of your app in Xcode
export BUNDLE_PATH= # fill with your bundle path

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

{{% /collapse-content %}}

{{% collapse-content title="Manually on each build (with Hermes for React Native < 0.71)" level="h5" %}}

There is a bug in React Native versions up to 0.71 that generates an incorrect source map when using Hermes.

To resolve this, you need to add more lines **at the very end** of the build phase to generate a correct source map file.

Edit your build phase like so:

```bash
set -e
export SOURCEMAP_FILE=./build/main.jsbundle.map # <- add this line to output source maps
# For React Native 0.70, you need to set USE_HERMES to true for source maps to be generated
export USE_HERMES=true

# keep the rest of the script unchanged

# add these lines to compose the packager and compiler source maps into one file
REACT_NATIVE_DIR=../node_modules/react-native

if [ -f "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh" ]; then
    source "$REACT_NATIVE_DIR/scripts/find-node-for-xcode.sh"
else
    # Before RN 0.70, the script was named find-node.sh
    source "$REACT_NATIVE_DIR/scripts/find-node.sh"
fi
source "$REACT_NATIVE_DIR/scripts/node-binary.sh"
"$NODE_BINARY" "$REACT_NATIVE_DIR/scripts/compose-source-maps.js" "$CONFIGURATION_BUILD_DIR/main.jsbundle.map" "$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/main.jsbundle.map" -o "../$SOURCEMAP_FILE"
```

To upload the source map, run this from your React Native project root:

```bash
export DATADOG_API_KEY= # fill with your API key
export SERVICE=com.myapp # replace by your service name
export VERSION=1.0.0 # replace by the version of your app in Xcode
export BUILD=100 # replace by the build of your app in Xcode
export BUNDLE_PATH= # fill with your bundle path

yarn datadog-ci react-native upload --platform ios --service $SERVICE --bundle $BUNDLE_PATH --sourcemap ./build/main.jsbundle.map --release-version $VERSION --build-version $BUILD
```

{{% /collapse-content %}}

#### Upload JavaScript source maps on Android builds

{{% collapse-content title="Automatically on each release build (React Native >= 0.71)" level="h5" %}}

In your `android/app/build.gradle` file, add the following after the `apply plugin: "com.facebook.react"` line:

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

For the upload to work, you need to provide your Datadog API key. You can specify it as a `DATADOG_API_KEY` environment variable, or create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.

{{% /collapse-content %}}

{{% collapse-content title="Automatically on each release build (React Native < 0.71)" level="h5" %}}

In your `android/app/build.gradle` file, add the following after the `apply from: "../../node_modules/react-native/react.gradle"` line:

```groovy
apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"
```

For the upload to work, you need to provide your Datadog API key. You can specify it as a `DATADOG_API_KEY` environment variable, or create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.

{{% /collapse-content %}}

{{% collapse-content title="Manually on each build" level="h5" %}}

On Android, the source map file is located at `android/app/build/generated/sourcemaps/react/release/index.android.bundle.map`.
The bundle file location depends on your React Native (RN) and Android Gradle Plugin (AGP) versions:

-   RN >= 0.71 and AGP >= 7.4.0: `android/app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN >= 0.71 and AGP < 7.4.0: `android/app/build/ASSETS/createBundleReleaseJsAndAssets/index.android.bundle`
-   RN < 0.71: `android/app/build/generated/assets/react/release/index.android.bundle`

The Android Gradle Plugin version is specified in the `android/build.gradle` file under `com.android.tools.build:gradle`, for instance: `classpath("com.android.tools.build:gradle:7.3.1")`.

If your application has more comprehensive variants, replace `release` by your variant's name in the paths.
If you specified a `bundleAssetName` in your React config in `android/app/build.gradle`, replace `index.android.bundle` by its value.

After running your build, upload your source map by running this from your React Native project root:

```bash
export DATADOG_API_KEY= # fill with your API key
export SERVICE=com.myapp # replace by your service name
export VERSION=1.0.0 # replace by the versionName from android/app/build.gradle
export BUILD=100 # replace by the versionCode from android/app/build.gradle
export BUNDLE_PATH=android/app/build/generated/assets/react/release/index.android.bundle
export SOURCEMAP_PATH=android/app/build/generated/sourcemaps/react/release/index.android.bundle.map

yarn datadog-ci react-native upload --platform android --service $SERVICE --bundle $BUNDLE_PATH --sourcemap $SOURCEMAP_PATH --release-version $VERSION --build-version $BUILD
```

{{% /collapse-content %}}

#### Upload iOS dSYM files

{{% collapse-content title="Manually on each build" level="h5" %}}

For more information, see the [iOS Crash Reporting and Error Tracking documentation][12].

{{% /collapse-content %}}

#### Upload Android Proguard mapping files

First, ensure that Proguard minification is enabled on your project. By default, this is not enabled on React Native projects.

For more information, see [the React Native Proguard documentation][13].

If you are still unsure, you can see if running `(cd android && ./gradlew tasks --all) | grep minifyReleaseWithR8` returns anything. If so, minification is enabled.

{{% collapse-content title="Manually on each build" level="h5" %}}

In your `android/app/build.gradle` file, add the [latest version of the plugin][14] and configure it **at the top of the file**:

```groovy
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}

datadog {
    checkProjectDependencies = "none" // this is needed in any case for React Native projects
}
```

For the upload to work, you need to provide your Datadog API key. You can specify it as a `DATADOG_API_KEY` environment variable, or create a `datadog-ci.json` file at the root of your project containing the API key:

```json
{
    "apiKey": "<YOUR_DATADOG_API_KEY>"
}
```

You can also specify the Datadog site (such as `datadoghq.eu`) as a `DATADOG_SITE` environment variable, or as a `datadogSite` key in your `datadog-ci.json` file.
For more information, see the [Datadog Android SDK Gradle Plugin][15].

To run the plugin after a build run `(cd android && ./gradlew app:uploadMappingRelease)`.

{{% /collapse-content %}}

{{% collapse-content title="Automate the upload on each build" level="h5" %}}

Install the plugin like in the previous step.

Find the loop on `applicationVariants` in the `android/app/build.gradle` file. It should look like `applicationVariants.all { variant ->`.

Inside the loop, add the following snippet:

```groovy
        if (project.tasks.findByName("minify${variant.name.capitalize()}WithR8")) {
            tasks["minify${variant.name.capitalize()}WithR8"].finalizedBy { tasks["uploadMapping${variant.name.capitalize()}"] }
        }
```

**Note**: Reuploading a source map does not override the existing one if the version has not changed.

{{% /collapse-content %}}


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

**Note**: This solution comes from this [StackOverflow][21] post.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: https://microsoft.github.io/code-push/
[3]: /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/codepush
[4]: https://docs.expo.dev/
[5]: /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo
[6]: /account_management/api-app-keys/#api-keys
[7]: /account_management/api-app-keys/#client-tokens
[8]: https://github.com/DataDog/datadog-react-native-wizard
[9]: https://app.datadoghq.com/source-code/setup/rum
[10]: https://github.com/DataDog/react-native-performance-limiter
[11]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/react-native/README.md#xcode
[12]: /real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tabs=cocoapods#symbolicate-crash-reports
[13]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[14]: https://plugins.gradle.org/plugin/com.datadoghq.dd-sdk-android-gradle-plugin
[15]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[16]: https://app.datadoghq.com/rum/application/create
[17]: /real_user_monitoring/application_monitoring/react_native/setup/

[18]: https://app.datadoghq.com/error-tracking
[19]: https://source.android.com/docs/security/app-sandbox
[20]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[21]: https://stackoverflow.com/questions/37388126/use-frameworks-for-only-some-pods-or-swift-pods/60914505#60914505






