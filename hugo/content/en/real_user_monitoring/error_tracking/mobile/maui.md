---
title: .NET MAUI Crash Reporting and Error Tracking
description: Set up Error Tracking for your .NET MAUI applications.
aliases:
    - /real_user_monitoring/error_tracking/maui
    - /error_tracking/frontend/mobile/maui/
type: multi-code-lang
code_lang: maui
code_lang_weight: 55
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'

---

## Overview

Error Tracking processes errors collected from the .NET MAUI SDK.

Enable .NET MAUI Crash Reporting and Error Tracking to get comprehensive crash reports, symbolicated native iOS stack traces, and error trends across iOS and Android. Your crash reports appear in [{{< ui >}}Error Tracking{{< /ui >}}][1].

### C# error tracking

C# error tracking is enabled automatically as soon as RUM is enabled — no extra configuration is required. The SDK captures:

- Unhandled C# exceptions (`AppDomain.UnhandledException`)
- Unobserved task exceptions (`TaskScheduler.UnobservedTaskException`)

You can also manually report an error with `DdRum.AddError`.

### Native crash reporting (optional)

`NativeCrashReportEnabled` is **only** needed if you also want to capture crashes that originate from native iOS or Android code — for example, an Objective-C/Swift crash on iOS, or a JNI/Kotlin crash on Android. C# error tracking works without it.

To enable native crash reporting, set `NativeCrashReportEnabled = true` on the SDK configuration:

```csharp
.UseDatadog(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    NativeCrashReportEnabled = true,
})
```

{% alert level="info" %}
When `NativeCrashReportEnabled = true`, an unhandled C# exception that crashes the application is reported **twice**: once as a C# error captured by `AppDomain.UnhandledException`, and once as a native iOS or Android crash captured by the platform's crash reporter. Both events share the same RUM session and view, so you can correlate them in the Explorer.

If you want to keep only one of the two, use [`ErrorEventMapper`][5] to drop whichever copy doesn't fit your workflow (for example, filter by `Source` or `Stacktrace` content).
{% /alert %}

## Setup

If you have not set up the .NET MAUI SDK yet, follow the [in-app setup instructions][2] or see the [.NET MAUI setup documentation][3].

## Get symbolicated stack traces

To resolve method names and crash addresses in native iOS crash reports, upload your app's `.dSYM` bundle to Datadog. Symbolication then happens server-side on each crash event.

| Stack trace type | Symbol file | How it's resolved |
|---|---|---|
| Native iOS crashes (and AOT-compiled C# method names) | `.dSYM` bundle | Uploaded to Datadog, resolved server-side on each crash event |

The iOS `.dSYM` bundle is the only symbol file the SDK uploads. Android R8/ProGuard mapping files and Portable PDB files are not uploaded — see [Limitations](#limitations).

### Upload symbols with `datadog-ci`

The `Datadog.Maui` NuGet package ships an MSBuild target that uploads symbols to Datadog automatically as part of `dotnet publish`. To enable it:

#### 1. Install `datadog-ci`

```bash
npm install -g @datadog/datadog-ci
```

Verify the installation with `datadog-ci version`.

#### 2. Set your Datadog API key

Export the key in the shell that runs `dotnet publish`:

```bash
export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>
```

For CI environments, set `DATADOG_API_KEY` as a protected/secret environment variable on your runner. Do not commit the key to source control.

For local testing, you can pass the key as an MSBuild property (`-p:DatadogApiKey=...`), but **do not set `DatadogApiKey` in your `.csproj`** — that file is checked in.

#### 3. Enable the upload

Set `DatadogUploadSymbols=true` either as a `<PropertyGroup>` entry in your `.csproj` or on the `dotnet publish` command line. The MSBuild targets run automatically after publish and skip silently if `datadog-ci` is missing or the API key is unset.

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true
```

The `.dSYM` bundle generated next to the `.app` is uploaded. dSYMs are only produced for device builds (`-r ios-arm64`); simulator builds (`iossimulator-arm64`) skip the upload.

### Configuration

All configuration is done via MSBuild properties — either in your `.csproj` `<PropertyGroup>` or on the `dotnet publish` command line with `-p:`.

| Property | Required | Default | Description |
|---|---|---|---|
| `DatadogUploadSymbols` | Yes | `false` | Set to `true` to enable symbol upload after publish. |
| `DatadogServiceName` | No | `$(AssemblyName)` | Service name used to identify your app in Datadog. Must match the `Service` you pass to `DdSdkConfiguration` at runtime. |
| `DatadogSite` | No | `datadoghq.com` | The Datadog site that receives the upload (for example, `datadoghq.eu`, `us5.datadoghq.com`). Must match the `Site` value set on `DdSdkConfiguration`. |
| `DatadogApiKey` | No | — | API key passed directly. If unset, the `DATADOG_API_KEY` environment variable is used instead. |

```xml
<PropertyGroup>
  <DatadogServiceName>my-maui-app</DatadogServiceName>
  <DatadogSite>datadoghq.eu</DatadogSite>
</PropertyGroup>
```

The terminal logger that `dotnet publish` uses by default hides informational output. To see the Datadog upload messages, add `-v n -tl:off`:

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true -v n -tl:off
```

After upload, symbols take up to 5 minutes to process. You can confirm they were received under [{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4].

## Limitations

### Managed C# stack traces

Managed C# exception stack traces resolve to method names only. File names and line numbers are not available yet.

.NET MAUI Release builds AOT-compile C# ahead of shipping, so the runtime on the device cannot map a frame back to a source location: on iOS the minimal runtime cannot read Portable PDB files at all, and on Android AOT-compiled frames report `Unknown Source`. Resolving these frames requires combining your app's Portable PDB (`.pdb`) with the platform's native debug information server-side, which is not supported. Portable PDB files are not uploaded to Datadog, and bundling them into the app does not add file or line information to reported stack traces.

### Android symbol upload

Symbol upload is not supported for Android builds. R8/ProGuard `mapping.txt` files are not uploaded, so obfuscated Java/Kotlin frames in Android crash reports are not deobfuscated. Android crashes are still collected and reported — only the deobfuscation step is unavailable.

### File sizing

dSYM bundles (iOS) can go up to **2 GB** each.

### Collection

The SDK handles crash reporting with the following behaviors:

- Crashes can only be detected after the SDK is initialized. Initialize the SDK as early as possible in `MauiProgram.CreateMauiApp`.
- RUM crashes must be attached to a RUM view. If a crash occurs before a view is visible (or after the app has been moved to the background by the user), the crash is muted and isn't reported. To mitigate this, set `TrackBackgroundEvents = true` on `DdRumConfiguration`.
- Only crashes that occur in sampled sessions are kept.

### Android NDK crash symbols

When `NativeCrashReportEnabled = true`, native (C/C++) crashes captured by `dd-sdk-android-ndk` require unstripped `.so` files for symbolication.

In a MAUI app, the native `.so` files typically come from the .NET runtime (`libmonosgen-2.0.so`, `libmonodroid.so`) and from Datadog's own NDK library — Datadog resolves these server-side; no manual upload is needed for either. If you ship custom native C/C++ libraries, upload their symbols manually with `datadog-ci dsyms upload <path-to-so-directory>`.

## Test your implementation

To verify your Crash Reporting and Error Tracking configuration, trigger a crash and confirm that the error appears in Datadog:

1. Run your application on a real device or emulator (dSYMs are generated only for device builds on iOS).
2. Execute code that throws an unhandled exception. For example:

   ```csharp
   void OnButtonClicked(object sender, EventArgs e)
   {
       throw new InvalidOperationException("Crash the app");
   }
   ```

3. After the crash, restart your application and wait for the SDK to upload the crash report.
4. Confirm the event in [{{< ui >}}Error Tracking{{< /ui >}}][1]. For a native iOS crash from a device build, the frames are symbolicated.

## Troubleshooting

**`Skipping symbol upload — datadog-ci is not installed`**
Run `npm install -g @datadog/datadog-ci` and verify with `datadog-ci version`.

**`Skipping symbol upload — DATADOG_API_KEY is not set`**
Export the key in your shell: `export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>`. Verify with `echo $DATADOG_API_KEY`.

**`Skipping dSYM upload — file not found`**
dSYMs are only generated for device builds (`-r ios-arm64`). Simulator builds do not produce dSYMs.

**No Datadog output visible during publish**
The terminal logger hides informational messages. Add `-v n -tl:off` to your `dotnet publish` command.

**Upload completes but symbols don't appear in Datadog**
Symbols take up to 5 minutes to process. Check [{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/application_monitoring/maui/setup
[4]: https://app.datadoghq.com/source-code/setup/symbols
[5]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#modify-or-drop-rum-events
