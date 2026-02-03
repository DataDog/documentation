<!--
This partial contains setup instructions for the Unity SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your applications for [Real User Monitoring (RUM)][1] with the Unity SDK. RUM includes Error Tracking by default, but if you have purchased Error Tracking as a standalone product, see the [Error Tracking setup guide][2] for specific steps.

{% alert level="info" %}
Datadog supports Unity Monitoring for iOS and Android for Unity LTS 2022+.
{% /alert %}

Datadog does not support Desktop (Windows, Mac, or Linux) or console deployments from Unity. If you have a game or application and want to use Datadog RUM to monitor its performance, create a ticket with [Datadog support][7].

### Step 1 - Install the SDK

1. Install the [External Dependency Manager for Unity (EDM4U)][4]. This can be done using [Open UPM][5].

2. Add the Datadog SDK Unity package from its Git URL at [https://github.com/DataDog/unity-package][6]. The package URL is `https://github.com/DataDog/unity-package.git`.

3. (Android only) Configure your project to use [Gradle templates][8], and enable both `Custom Main Template` and `Custom Gradle Properties Template`.

4. (Android only) If you build and receive `Duplicate class` errors (common in Unity 2022.x), add the following code to the `dependencies` block of your `mainTemplate.gradle`:

```groovy
constraints {
     implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.0") {
         because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
     }
}
```

#### WebGL

1. Create a custom WebGL template, following the instructions provided by [Unity][9], or by using the minimally modified version in Datadog's [GitHub repo][10].

2. If you are using your own WebGL template, or have added a new WebGL template, modify it to include the Datadog Browser SDK delivered by CDN.

```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum-slim.js"></script>
```

### Step 2 - Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][11].
2. Choose **Unity** as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings.

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][12].

### Step 3 - Configure Datadog settings in Unity

After installing the Datadog Unity SDK, you need to set Datadog's settings in the Unity UI. Navigate to your `Project Settings` and click on the `Datadog` section on the left hand side.

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
| Track Non-Fatal ANRs | No | (Android Only) Whether to track non-fatal ANRs (Application Not Responding) errors. The "SDK Default" option disables ANR detection on Android 30+ because it would create too much noise over fatal ANRs. On Android 29 and below, however, the reporting of non-fatal ANRs is enabled by default, as fatal ANRs cannot be reported on those versions. |
| Track Non-Fatal App Hangs | No | (iOS Only) Whether to track non-fatal app hangs. App hangs are detected when the app is unresponsive for a certain amount of time. The supplied "Threshold" is the amount of time in seconds that the app must be unresponsive before it is considered a non-fatal app hang. |
| First Party Hosts | No | To enable distributed tracing, you must specify which hosts are considered "first party" and have trace information injected. |

### Sample RUM sessions

You can control the data your application sends to Datadog RUM during instrumentation of the RUM Unity SDK. Specify the **Session Sample Rate** as a percentage between 0 and 100 in the Project Settings window in Unity.

## Using Datadog

### Setting tracking consent

In order to be compliant with data protection and privacy policies, the Datadog Unity SDK requires setting a tracking consent value.

The `trackingConsent` setting can be one of the following values:

  * `TrackingConsent.Pending`: The Unity SDK starts collecting and batching the data but does not send it to Datadog. The Unity SDK waits for the new tracking consent value to decide what to do with the batched data.
  * `TrackingConsent.Granted`: The Unity SDK starts collecting the data and sends it to Datadog.
  * `TrackingConsent.NotGranted`: The Unity SDK does not collect any data. No logs are sent to Datadog.

Before Datadog sends any data, we need to confirm the user's `Tracking Consent`. This is set to `TrackingConsent.Pending` during initialization,
and needs to be set to `TrackingConsent.Granted` before Datadog sends any information.

```csharp
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
```

### Logging

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

```csharp
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

### Real User Monitoring (RUM)

#### Manual Scene (View) Tracking

To manually track new Scenes (`Views` in Datadog), use the `StartView` and `StopView` methods:

```csharp
public void Start()
{
    DatadogSdk.Instance.Rum.StartView("My View", new()
    {
        { "view_attribute": "active" }
    });
}
```

Starting a new view automatically ends the previous view.

#### Automatic Scene Tracking

You can also set `Enable Automatic Scene Tracking` in your Project Settings to enable automatically tracking active scenes. This uses Unity's `SceneManager.activeSceneChanged` event to automatically start new scenes.

#### Web Requests / Resource Tracking

Datadog offers `DatadogTrackedWebRequest`, which is a `UnityWebRequest` wrapper intended to be a drop-in replacement for `UnityWebRequest`. `DatadogTrackedWebRequest` enables [Datadog Distributed Tracing][3].

To enable Datadog Distributed Tracing, you must set the `First Party Hosts` in your project settings to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing by setting the `Tracing Sampling Rate`.

`First Party Hosts` does not allow wildcards, but matches any subdomains for a given domain. For example, api.example.com matches staging.api.example.com and prod.api.example.com, but not news.example.com.

## Sending data when device is offline

RUM helps ensure availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches.

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to help ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost. To help ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

[1]: /real_user_monitoring/
[2]: /error_tracking/frontend/mobile/unity/
[3]: /real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum
[4]: https://github.com/googlesamples/unity-jar-resolver
[5]: https://openupm.com/packages/com.google.external-dependency-manager/
[6]: https://github.com/DataDog/unity-package
[7]: /help/
[8]: https://docs.unity3d.com/Manual/gradle-templates.html
[9]: https://docs.unity3d.com/2022.3/Documentation/Manual/webgl-templates.html
[10]: https://github.com/DataDog/dd-sdk-unity/tree/develop/samples/Datadog%20Sample/Assets/WebGLTemplates
[11]: https://app.datadoghq.com/rum/application/create
[12]: /account_management/api-app-keys/#client-tokens

