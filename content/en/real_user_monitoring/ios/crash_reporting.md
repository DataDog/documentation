## Overview

Enable iOS Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

 - Aggregated iOS crash dashboards and attributes
 - Symbolicated iOS crash reports
 - Trend analysis with iOS error tracking

In order to symbolicate your stack traces, find and upload your .dSYM files to Datadog. Then, verify your configuration by running a test crash and restarting your application. 

Your crash reports appear in [**Error Tracking**][8].

## Setup

If you have not set up the iOS SDK yet, follow the [in-app setup instructions][1] or see the [iOS RUM setup documentation][2].

### Add Crash Reporting 

Add the package according to your dependency manager and update your initialize snippet.  

{{< tabs >}}
{{% tab "CocoaPods" %}}
Add `DatadogSDKCrashReporting` to your `Podfile`:
```ruby
platform :ios, '11.0'
use_frameworks!

target 'App' do
  pod 'DatadogSDKCrashReporting'
end
```
{{% /tab %}}
{{% tab "Swift Package Manager" %}}
Add the package at `https://github.com/DataDog/dd-sdk-ios` and link `DatadogCrashReporting` to your application target.

**Note:** If you link to `Datadog` or the `DatadogStatic` library, link instead to `DatadogCrashReporting`.

{{% /tab %}}
{{% tab "Carthage" %}}
Add `github "DataDog/dd-sdk-ios"` to your `Cartfile` and link `DatadogCrashReporting.xcframework` to your application target.
{{% /tab %}}
{{< /tabs >}}

Update your initialization snippet to include Crash Reporting:

```
import DatadogCrashReporting

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
    .builderUsing(
        rumApplicationID: "<rum_application_id>",
        clientToken: "<client_token>",
        environment: "<environment_name>"
    )
    .trackUIKitActions()
    .trackUIKitRUMViews()
    .enableCrashReporting(using: DDCrashReportingPlugin())
    .build()
)
Global.rum = RUMMonitor.initialize()
```

## Symbolicate crash reports

Crash reports are collected in a raw format and mostly contain memory addresses. To map these addresses into legible symbol information, Datadog requires .dSYM files, which are generated in your application's build or distribution process.

### Find your dSYM file

Every iOS application produces .dSYM files for each application module. These files minimize an application's binary size and enable faster download speed. Each application version contains a set of .dSYM files. 

Depending on your setup, you may need to download .dSYM files from App Store Connect or find them on your local machine. 

| Bitcode Enabled | Description                                                                                                                                                                                                                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Yes             | dSYM files are available once [App Store Connect][6] completes processing your application's build.                                                                                                                                                                                                    |
| No              | Xcode exports .dSYM files to `$DWARF_DSYM_FOLDER_PATH` at the end of your application's build. Ensure that the `DEBUG_INFORMATION_FORMAT` build setting is set to **DWARF with dSYM File**. By default, Xcode projects only set `DEBUG_INFORMATION_FORMAT` to **DWARF with dSYM File** for the Release project configuration. |

### Upload your dSYM file

By uploading your .dSYM file to Datadog, you gain access to the file path and line number of each frame in an error's related stack trace.

Once your application crashes and you restart the application, the iOS SDK uploads a crash report to Datadog. 

#### Datadog CI

You can use the command line tool [@datadog/datadog-ci][5] to upload your dSYM file:

```sh
export DATADOG_API_KEY="<API KEY>"

// if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**Note**: To configure the tool using the EU endpoint, set the `DATADOG_SITE` environment variable to `datadoghq.eu`. To override the full URL for the intake endpoint, define the `DATADOG_DSYM_INTAKE_URL` environment variable. 

Alternatively, if you use Fastlane or GitHub Actions in your workflows, you can leverage these integrations instead of `datadog-ci`:

#### Fastlane Plugin

The Datadog plugin helps you upload dSYM files to Datadog from your Fastlane configuration.

1. Add [`fastlane-plugin-datadog`][3] to your project.

   ```sh
   fastlane add_plugin datadog
   ```

2. Configure Fastlane to upload your symbols.

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

For more information, see [`fastlane-plugin-datadog`][3].

#### GitHub Action

The [Datadog Upload dSYMs GitHub Action][4] allows you to upload your symbols in your GitHub Action jobs:

```yml
name: Upload dSYM Files

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Generate/Download dSYM Files
        uses: ./release.sh

      - name: Upload dSYMs to Datadog
        uses: DataDog/upload-dsyms-github-action@v1
        with:
          api_key: ${{ secrets.DATADOG_API_KEY }}
          site: datadoghq.com
          dsym_paths: |
            path/to/dsyms/folder
            path/to/zip/dsyms.zip
```

For more information, see [dSYMs commands][7].

## Verify crash reports

To verify your iOS Crash Reporting and Error Tracking configuration, issue a crash in your RUM application and confirm that the error appears in Datadog. 

1. Run your application on an iOS simulator or a real device. Ensure that the debugger is not attached. Otherwise, Xcode captures the crash before the iOS SDK does.
2. Execute the code containing the crash:

   ```swift
   func didTapButton() {
   fatalError(“Crash the app”)
   }
   ```

3. After the crash happens, restart your application and wait for the iOS SDK to upload the crash report in [**Error Tracking**][8].

**Note:** RUM supports symbolication of system symbol files for iOS v14+ arm64 and arm64e architecture.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/real_user_monitoring/ios
[3]: https://github.com/DataDog/datadog-fastlane-plugin
[4]: https://github.com/marketplace/actions/datadog-upload-dsyms
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://appstoreconnect.apple.com/
[7]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md
[8]: https://app.datadoghq.com/rum/error-tracking
