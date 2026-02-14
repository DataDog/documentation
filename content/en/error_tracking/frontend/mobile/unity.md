---
title: Unity Crash Reporting and Error Tracking
description: Learn how to track Unity errors with Error Tracking.
type: multi-code-lang
code_lang: unity
code_lang_weight: 80
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

Enable Crash Reporting and Error Tracking to get comprehensive crash reports and error trends.

Your crash reports appear in [**Error Tracking**][1].


## Setup

If you have not set up the Datadog Unity SDK for yet, follow the [in-app setup instructions][2] or see the [Unity setup documentation][3]. Then, follow the steps on this page to enable React Native Crash Reporting and Error Tracking.

### Step 1 - Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][101].
2. Choose **Unity** as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings.

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][201].


### Step 2 - Specify Datadog settings in the Unity UI

After installing the Datadog Unity SDK, you need to set Datadog's settings in the Unity UI. Navigate to your `Project Settings` and click on the `Datadog` section on the left hand side. You will see the following screen:

{{<img src="real_user_monitoring/unity/datadog-setup-ui.png">}}

<br>

The following parameters are available:

| Parameter | Required? | Description |
| --------- | --------- | ----------- |
| Enable Datadog | No | Whether Datadog should be enabled. Disabling Datadog does not cause any of the Datadog APIs to fail, throw exceptions, or return `null` from any calls. It only stops the SDK from sending any information. |
| Output Symbol Files | No | This option enables the output of symbol files for Datadog symbolication and file/line mapping features in Datadog Error Tracking. |
| Perform Native Stack Mapping | No | Converts C# stacks traces to native stack traces in non-development builds. This allows for file and line mapping to C# code if symbol files are uploaded to Datadog. This is not supported if Output Symbols is disabled.
| Client Token | Yes | Your client token created for your application on Datadog's website. |
| Env | No | The name of the environment for your application. Defaults to `"prod"`. |
| Service Name | No | The service name for your application. If this is not set, it is automatically set to your application's package name or bundle name (e.g.: com.example.android). |
| Datadog Site | Yes | The site you send your data to. |
| Batch Size | Yes | Sets the preferred size of batched data uploaded to Datadog. This value impacts the size and number of requests performed by the SDK (small batches mean more requests, but each request becomes smaller in size). |
| Upload Frequency | Yes | Sets the preferred frequency of uploading data to Datadog. |
| Batch Processing Level | Yes | Defines the maximum amount of batches processed sequentially without a delay within one reading/uploading cycle. |
| Enable Crash Reporting | No | Enables crash reporting in the RUM SDK. |
| Forward Unity Logs | No | Whether to forward logs made from Unity's `Debug.Log` calls to Datadog's default logger. |
| Remote Log Threshold | Yes | The level at which the default logger forwards logs to Datadog. Logs below this level are not sent. |
| Enable RUM | No | Whether to enable sending data from Datadog's Real User Monitoring APIs |
| Enable Automatic Scene Tracking | No | Whether Datadog should automatically track new Views by intercepting Unity's `SceneManager` loading. |
| RUM Application ID | Yes (if RUM is enabled) | The RUM Application ID created for your application on Datadog's website. |
| Session Sample Rate | Yes | The percentage of sessions to send to Datadog. Between 0 and 100. |
| Trace Sample Rate | Yes | The percentage of distributed traces to send to Datadog. Between 0 and 100. |
| Trace Context Injection | Yes | Whether to inject trace context into `All` or `Only Sampled` resource requests. |
| Track Non-Fatal ANRs | No | (Android Only) Whether to track non-fatal ANRs (Application Not Responding) errors. The \"SDK Default\" option disables ANR detection on Android 30+ because it would create too much noise over fatal ANRs. On Android 29 and below, however, the reporting of non-fatal ANRs is enabled by default, as fatal ANRs cannot be reported on those versions. |
| Track Non-Fatal App Hangs | No | (iOS Only) Whether to track non-fatal app hangs. App hangs are detected when the app is unresponsive for a certain amount of time. The supplied "Threshold" is the amount of time in seconds that the app must be unresponsive before it is considered a non-fatal app hang. |
| First Party Hosts | No | To enable distributed tracing, you must specify which hosts are considered "first party" and have trace information injected. |

<br>

### Step 3 - Forward uncaught exceptions from Unity logs
Unity forwards all uncaught exceptions to its logger using `Debug.LogException`. To report these exceptions to Datadog, check the option in Datadog's project settings labeled "Forward Unity Logs".


### Step 4 - Native crash reporting

Native crash reporting is enabled for all Datadog Unity SDK projects.

If your application suffers a fatal crash, the Datadog Unity SDK uploads a crash report to Datadog *after* your application restarts. For non-fatal errors or exceptions, the Datadog Unity SDK uploads these errors with other session data.


### Step 5 - Get deobfuscated and symbolicated stack traces

Mapping files are used to deobfuscate and symbolicate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding mapping files. This ensures that regardless of when the mapping file was uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.


{{% collapse-content title="File and line mapping with IL2CPP" level="h5" %}}

When using the IL2CPP backend (the default for iOS), C# stack traces from Unity lack any file or line information. This information can be retrieved from the native symbol files and an IL2CPP mapping file, provided the C# stack traces are mapped to native stacks. To enable this, check the "Perform Native Stack Mapping" option in your Unity project settings under the Datadog section and upload your symbol and IL2CPP mapping files as described below.

**Note**: Even when checked, Native Stack Mapping is only enabled in non-development builds.
{{% /collapse-content %}}


{{% collapse-content title="Upload symbol files to Datadog" level="h5" %}}

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
{{% /collapse-content %}}



#### List uploaded symbol files

See the [RUM Debug Symbols][6] page to view all uploaded symbols.


## Advanced Error Tracking features 

{{% collapse-content title="Setting tracking consent" level="h4" %}}

In order to be compliant with data protection and privacy policies, the Datadog Unity SDK requires setting a tracking consent value.

The `trackingConsent` setting can be one of the following values:

  * `TrackingConsent.Pending`: The Unity SDK starts collecting and batching the data but does not send it to Datadog. The Unity SDK waits for the new tracking consent value to decide what to do with the batched data.
  * `TrackingConsent.Granted`: The Unity SDK starts collecting the data and sends it to Datadog.
  * `TrackingConsent.NotGranted`: The Unity SDK does not collect any data. No logs are sent to Datadog.

Before Datadog sends any data, we need to confirm the user's `Tracking Consent`. This is set to `TrackingConsent.Pending` during initialization,
and needs to be set to `TrackingConsent.Granted` before Datadog sends any information.

```cs
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
```
{{% /collapse-content %}}



{{% collapse-content title="Sending logs" level="h4" %}}
You can intercept and send logs from Unity's default debug logger by enabling the option and threshold in your projects settings.

Datadog maps the Unity levels to the following in Datadog's Logging Levels:

| Unity LogType  | Datadog Log Level |
| -------------- | ----------------- |
| Log            |  Info             |
| Error          |  Error            |
| Assert         |  Critical         |
| Warning        |  Warn             |
| Exception      |  Critical         |

You can access this default logger to add attributes or tags through the `DatadogSdk.DefaultLogger` property.

You can also create additional loggers for more fine grained control of thresholds, service names, logger names, or to supply additional attributes.

```cs
var logger = DatadogSdk.Instance.CreateLogger(new DatadogLoggingOptions()
{
    NetworkInfoEnabled = true,
    DatadogReportingThreshold = DdLogLevel.Debug,
});
logger.Info("Hello from Unity!");

logger.Debug("Hello with attributes", new()
{
    { "my_attribute", 122 },
    { "second_attribute", "with_value" },
    { "bool_attribute", true },
    {
        "nested_attribute", new Dictionary<string, object>()
        {
            { "internal_attribute", 1.234 },
        }
    },
});
```

The following parameters are available when creating a new logger:

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `Service` | The name of the service to associate with this logger. | The application's service name.
| `Name` | The name of the logger. | None |
| `NetworkInfoEnabled` | Whether to bundle information about the user's network state with each log. | `false` |
| `BundleWithRumEnabled` | Whether to bundle RUM session information with each log. | `true` |
| `RemoteSampleRate` | The percentage of logs from this logger to send to Datadog, as a whole percent. | `100` |
| `RemoteLogThreshold` | The threshold above which logs should be sent to Datadog. | `DdLogLevel.Debug` |

{{% /collapse-content %}}



{{% collapse-content title="Sending data when device is offline" level="h4" %}}

The Datadog SDK ensures availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches.

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.
{{% /collapse-content %}}

<br>


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










## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/mobile_and_tv_monitoring/setup/unity#setup
[101]: https://app.datadoghq.com/rum/application/create
[201]: /account_management/api-app-keys/#client-tokens
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/unity-symbols
[6]: https://app.datadoghq.com/source-code/setup/rum 
