---
description: Learn how to track Unity errors with Error Tracking.
aliases:
- /real_user_monitoring/error_tracking/unity
- /real_user_monitoring/mobile_and_tv_monitoring/unity/error_tracking
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: "Source Code"
  text: dd-sdk-unity Source code
- link: real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking
title: Unity Crash Reporting and Error Tracking
---
## Overview

Enable Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring.

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Datadog Unity SDK for yet, follow the [in-app setup instructions][2] or see the [Unity setup documentation][3].

### Forward uncaught exceptions from Unity logs

Unity forwards all uncaught exceptions to its logger using `Debug.LogException`. To report these exceptions to Datadog, check the option in Datadog's project settings labeled "Forward Unity Logs".

### Native crash reporting

Native crash reporting is enabled for all Datadog Unity SDK projects.

If your application suffers a fatal crash, the Datadog Unity SDK uploads a crash report to Datadog *after* your application restarts. For non-fatal errors or exceptions, the Datadog Unity SDK uploads these errors with other RUM data.

## Get deobfuscated and symbolicated stack traces

Mapping files are used to deobfuscate and symbolicate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding mapping files. This ensures that regardless of when the mapping file was uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

### File and line mapping with IL2CPP

When using the IL2CPP backend (the default for iOS), C# stack traces from Unity lack any file or line information. This information can be retrieved from the native symbol files and an IL2CPP mapping file, provided the C# stack traces are mapped to native stacks. To enable this, check the "Perform Native Stack Mapping" option in your Unity project settings under the Datadog section and upload your symbol and IL2CPP mapping files as described below.

**Note**: Even when checked, Native Stack Mapping is only enabled in non-development builds.

### Upload symbol files to Datadog

Native crash reports are collected in a raw format and mostly contain memory addresses. To map these addresses into legible symbol information, Datadog requires that you upload iOS `.dSYM` files, NDK `.so` files, Android Proguard Mapping files, and / or a IL2CPP mapping file, which are generated in your application's build process.

The [@datadog/datadog-ci][4] command line tool supports uploading all of the necessary files (dSYMs, sos, Android Proguard Mapping, and IL2CPP Mapping files) in one command.

First, install the `datadog-ci` tool from the instructions above and create a `datadog-ci.json` file at the root of your project, containing your API key and (optionally) your Datadog site:
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // Optional if you are using datadoghq.com
}
```

Because this file contains your API key, it should not be checked into version control.

Alternately, you can set the `DATADOG_API_KEY` and `DATADOG_SITE` environment variables.

Then, you can use the following command to upload all the necessary files for symbolication and deobfuscation of your crash reports:
```sh
# From your build output directory
datadog-ci unity-symbols upload --ios
```

For Android, export an Android project (instead of building the APK directly) and build using the exported project. You can then run datadog-ci from the exported project directory:
```sh
# From your exported project directory
datadog-ci unity-symbols upload --android
```

**Note**: Re-uploading a source map does not override the existing one if the build id has not changed.

For a full list of options, see the `datadog-ci` [Unity Symbols documentation][5].

### List uploaded symbol files

See the [RUM Debug Symbols][6] page to view all uploaded symbols.

## Limitations

Mapping files are limited in size to **500 MB** each, while dSYM files can go up to **2 GB** each.

## Test your implementation

To verify your Unity Crash Reporting and Error Tracking configuration, issue an error in your application and confirm that the error appears in Datadog.

1. Ensure you are not running a development build. Uncheck the "Development Build" box in Unity's build settings.
2. Run your application on a simulator, emulator, or a real device. If you are running on iOS, ensure that the debugger is not attached. Otherwise, Xcode captures the crash before the Datadog SDK does.
3. Execute code containing an error or crash. For example:

   ```cs
   void ThrowError() {
    throw new Exception("My Exception")
   }
   ```

4. For obfuscated error reports that do not result in a crash, you can verify symbolication and deobfuscation in [**Error Tracking**][1].
5. For crashes, after the crash happens, restart your application and wait for the Unity SDK to upload the crash report in [**Error Tracking**][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/application_monitoring/unity/setup/#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/unity-symbols
[6]: https://app.datadoghq.com/source-code/setup/rum
