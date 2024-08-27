---
title: React Native Crash Reporting and Error Tracking
description: Set up Error Tracking for your React Native projects.
aliases:
- /real_user_monitoring/error_tracking/reactnative
type: multi-code-lang
code_lang: reactnative
code_lang_weight: 40
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: dd-sdk-reactnative Source code
- link: real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking
- link: https://www.datadoghq.com/blog/rum-now-offers-react-native-crash-reporting-and-error-tracking/
  tag: Blog
  text: Datadog now offers React Native Crash Reporting and Error Tracking

---

## Overview

Enable React Native Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

-   Aggregated React Native crash dashboards and attributes
-   Symbolicated React Native (JavaScript and native iOS or Android) crash reports
-   Trend analysis with React Native Error Tracking

In order to symbolicate your stack traces, manually upload your mapping files into Datadog.

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the React Native SDK yet, follow the [in-app setup instructions][2] or see the [React Native setup documentation][3].

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

## Get deobfuscated stack traces

Mapping files are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding mapping files. This ensures that regardless of when the mapping file was uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

For React Native applications, the matching of stack traces and sourcemaps relies on a combination of the `service`, `version`, `bundle_name`, and `platform` fields. Out of all sourcemaps that match with these fields, Datadog uses the one with the highest `build_number` value.

In order to make your application's size smaller, its code is minified when it is built for release. To link errors to your actual code, you need to upload the following symbolication files:

-   JavaScript source map for your iOS JavaScript bundle
-   JavaScript source map for your Android JavaScript bundle
-   dSYMs for your iOS native code
-   Proguard mapping files if you have enabled code obfuscation for your Android native code

To set your project up to send the symbolication files automatically, run `npx datadog-react-native-wizard`.

See the wizard [official documentation][13] for options.

### Passing options for your uploads

#### Using the `datadog-sourcemaps.gradle` script

To specify a different service name, add the following code to your `android/app/build.gradle` file, before the `apply from: "../../node_modules/@datadog/mobile-react-native/datadog-sourcemaps.gradle"` line:

```groovy
project.ext.datadog = [
    serviceName: "com.my.custom.service"
]
```

#### Using the `datadog-ci react-native xcode` command

Options for the `datadog-ci react-native xcode` command are available on the [command documentation page][12].

#### Specifying a custom release version

Use the `DATADOG_RELEASE_VERSION` environment variable to specify a different release version for your sourcemaps, starting from `@datadog/mobile-react-native@2.3.5` and `@datadog/datadog-ci@v2.37.0`.

When the SDK is initialized with a version suffix, you must manually override the release version in order for the sourcemap and build versions to match.

## Limitations

{{< site-region region="us,us3,us5,eu,gov" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Source maps, mapping files, and dSYM files are limited to **500** MB each.
{{< /site-region >}}

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

3. For obfuscated error reports that do not result in a crash, you can verify symbolication and deobfuscation in [**Error Tracking**][1].
4. For crashes, after the crash happens, restart your application and wait for the React Native SDK to upload the crash report in [**Error Tracking**][1].

To make sure your sourcemaps are correctly sent and linked to your application, you can also generate crashes with the [`react-native-performance-limiter`][14] package.

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

Re-build your application for release to send the new sourcemaps, trigger the crash and wait on the [Error Tracking][1] page for the error to appear.

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

This script runs a command that takes care of uploading the source maps with all the correct parameters. For more information, see the [datadog-ci documentation][12].

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

This script runs a command that takes care of uploading the source maps with all the correct parameters. For more information, see the [datadog-ci documentation][12].

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

To find the path to your bundle file from XCode, display the Report Navigator on Xcode and filter by `BUNDLE_FILE` for its location.

The usual location is `~/Library/Developer/Xcode/DerivedData/YourAppName-verylonghash/Build/Intermediates.noindex/ArchiveIntermediates/YourAppName/BuildProductsPath/Release-iphoneos/main.jsbundle`, where `YourAppName` is the name of your app, and `verylonghash` is a 28 letter hash.

To upload the source maps, run this from your React Native project:

```bash
export DATADOG_API_KEY= # fill with your API key
export SERVICE=com.myapp # replace by your service name
export VERSION=1.0.0 # replace by the version of your app in XCode
export BUILD=100 # replace by the build of your app in XCode
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
export VERSION=1.0.0 # replace by the version of your app in XCode
export BUILD=100 # replace by the build of your app in XCode
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

For more information, see the [iOS Crash Reporting and Error Tracking documentation][4].

{{% /collapse-content %}}

#### Upload Android Proguard mapping files

First, ensure that Proguard minification is enabled on your project. By default, this is not enabled on React Native projects.

For more information, see [the React Native Proguard documentation][5].

If you are still unsure, you can see if running `(cd android && ./gradlew tasks --all) | grep minifyReleaseWithR8` returns anything. If so, minification is enabled.

{{% collapse-content title="Manually on each build" level="h5" %}}

In your `android/app/build.gradle` file, add the [latest version of the plugin][15] and configure it **at the top of the file**:

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
For more information, see the [Datadog Android SDK Gradle Plugin][6].

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

**Note**: Re-uploading a source map does not override the existing one if the version has not changed.

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/reactnative/
[4]: /real_user_monitoring/ios/crash_reporting/?tabs=cocoapods#symbolicate-crash-reports
[5]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[6]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[7]: https://github.com/cwhenderson20/react-native-crash-tester
[9]: https://fastlane.tools/
[10]: https://appcenter.ms/
[11]: https://www.bitrise.io/
[12]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/react-native#xcode
[13]: https://github.com/DataDog/datadog-react-native-wizard
[14]: https://github.com/DataDog/react-native-performance-limiter
[15]: https://plugins.gradle.org/plugin/com.datadoghq.dd-sdk-android-gradle-plugin
