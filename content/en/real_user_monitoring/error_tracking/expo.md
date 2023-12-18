---
title: Expo Crash Reporting and Error Tracking
kind: documentation
description: Capture Expo crash reports in Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/debug-android-crashes/
  tag: Blog
  text: Debug Android crashes faster with Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: Blog
  text: Debug iOS crashes efficiently with Datadog
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualize Error Tracking data in the RUM Explorer

---
## Overview

Enable Expo Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring.

With this feature, you can access the following features:

-   Aggregated Expo crash dashboards and attributes
-   Symbolicated iOS and deobfuscated Android crash reports
-   Trend analysis with Expo error tracking

In order to symbolicate your stack traces and deobfuscate Android crashes, upload your .dSYM, Proguard mapping files and source maps to Datadog using the `expo-datadog` config plugin.

Your crash reports appear in [**Error Tracking**][1].

## Setup

Use the [`expo-datadog` package and configuration plugin][2]. For more information, see the [Expo and Expo Go documentation][3].

Add `@datadog/datadog-ci` as a development dependency. This package contains scripts to upload the source maps. You can install it with NPM:

```sh
npm install @datadog/datadog-ci --save-dev
```

or with Yarn:

```sh
yarn add -D @datadog/datadog-ci
```

Run `eas secret:create` to set `DATADOG_API_KEY` to your Datadog API key.

### Disable file uploads

You can disable some files from uploading by setting the `iosDsyms`, `iosSourcemaps`, `androidProguardMappingFiles`, or `androidSourcemaps` parameters to `false`.

```json
{
    "expo": {
        "plugins": [
            [
                "expo-datadog",
                {
                    "errorTracking": {
                        "iosDsyms": false
                    }
                }
            ]
        ]
    }
}
```

If you want to disable **all file uploads**, remove the `expo-datadog` from the list of plugins.

### Setting the Datadog site

Run `eas secret:create` to set `DATADOG_SITE` to the host of your Datadog site, for example: `datadoghq.eu`. By default, `datadoghq.com` is used.

### Plugin configuration options

| Parameter                     | Default | Description                                                                                                                        |
| ----------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `iosDsyms`                    | `true`  | Enables the uploading of dSYMS files for the symbolication of native iOS crashes.                                                  |
| `iosSourcemaps`               | `true`  | Enables the uploading of JavaScript source maps on iOS builds.                                                                     |
| `androidProguardMappingFiles` | `true`  | Enables the uploading of Proguard mapping files to deobfuscate native Android crashes (is only applied if obfuscation is enabled). |
| `androidSourcemaps`           | `true`  | Enables the uploading of JavaScript source maps on Android builds.                                                                 |

### Using with Sentry

Both Datadog and Sentry config plugins use regular expressions to modify the "Bundle React Native code and images" iOS build phase to send the sourcemap. This can make your EAS builds fail with a `error: Found argument 'datadog-ci' which wasn't expected, or isn't valid in this context` error.

To use both plugins, make sure to add the `expo-datadog` plugin first in order in your `app.json` file:

```
"plugins": [
    "expo-datadog",
    "sentry-expo"
]
```

If you are using the `expo-dev-client` and already have the `expo-datadog` plugin, revert its changes to the `project.pbxproj` file before adding `sentry-expo` and running `npx expo prebuild` with both plugins.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://github.com/DataDog/expo-datadog
[3]: /real_user_monitoring/mobile_and_tv_monitoring/setup/expo/#usage
