## Automated error reporting

To report JavaScript crashes and errors, set `trackErrors` to `true` in your RUM configuration. To also report crashes that originate from native iOS or Android code, set `nativeCrashReportEnabled` to `true`:

```javascript
const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    TrackingConsent.GRANTED,
    {
        rumConfiguration: {
            applicationId: '<APPLICATION_ID>',
            trackInteractions: true,
            trackResources: true,
            trackErrors: true, // Enable JavaScript Crash Reporting
            nativeCrashReportEnabled: true, // Optional: Enable Native Crash Reporting
        },
        logsConfiguration: {},
        traceConfiguration: {}
    }
);
```

## Track custom errors

You can manually track RUM errors:

```javascript
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());
```

For the attributes collected for errors, see [Data Collected][1].

## Upload debug symbols to get deobfuscated stack traces

Release builds are minified. To link errors to your actual code, upload the following symbolication files:

-   JavaScript source maps for your iOS JavaScript bundle
-   JavaScript source maps for your Android JavaScript bundle
-   dSYMs for your iOS native code
-   Proguard mapping files if you have enabled code obfuscation for your Android native code

Datadog matches stack traces with source maps using the `debug_id`. If it's not available, Datadog uses a combination of the `service`, `version`, `bundle_name`, and `platform` fields, and picks the source map with the highest `build_number`.

### React Native

1. To set up your project to send the symbolication files automatically, run the wizard. For options, see the wizard [documentation][2].

   ```shell
   npx datadog-react-native-wizard
   ```

2. Add the Datadog Metro Plugin to your `metro.config.js`. Starting from `@datadog/mobile-react-native@2.10.0` and `@datadog/datadog-ci@v3.13.0`, the plugin attaches a unique Debug ID to your application bundle and source map for accurate symbolication:

   ```js
   const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
   const {withDatadogMetroConfig} = require('@datadog/mobile-react-native/metro');

   // Your configuration
   const config = mergeConfig(getDefaultConfig(__dirname), {});

   module.exports = withDatadogMetroConfig(config);
   ```

   As an alternative to the Metro plugin, use the [`datadog-ci react-native inject-debug-id`][3] command.

### Expo

1. Add `expo-datadog` to your plugins in the `app.json` file. The plugin uploads the dSYMs, source maps, and Proguard mapping files on every EAS build:

   ```json
   {
       "expo": {
           "plugins": ["expo-datadog"]
       }
   }
   ```

2. Add `@datadog/datadog-ci` as a development dependency. This package contains the upload scripts:

   ```shell
   npm install @datadog/datadog-ci --save-dev
   ```

3. Run `eas secret:create` to set `DATADOG_API_KEY` to your Datadog API key, and `DATADOG_SITE` to the host of your Datadog site (for example, `datadoghq.com`).

4. Add the Datadog Metro plugin to your `metro.config.js`:

   ```js
   const { getDatadogExpoConfig } = require("@datadog/mobile-react-native/metro");
   const config = getDatadogExpoConfig(__dirname);
   module.exports = config;
   ```

When you publish an [EAS update][4], upload the source maps generated in the `dist` folder for each platform with `datadog-ci react-native upload`:

```shell
npx datadog-ci react-native upload \
  --platform [ios OR android] \
  --service com.example.service \
  --bundle [BUNDLE_FILE] \
  --sourcemap [SOURCEMAP_FILE] \
  --release-version [YOUR_RELEASE_VERSION] \
  --build-version [YOUR_BUILD_VERSION]
```

Source maps and mapping files are limited to 500 MB each, and dSYM files to 2 GB each. For upload options, custom release versions, and manual alternatives to the wizard, see [React Native Crash Reporting and Error Tracking][5] and [Expo Crash Reporting and Error Tracking][6]. To view uploaded symbols, see the [RUM Debug Symbols][7] page.

[1]: /real_user_monitoring/setup/data_collected/?platform=react_native
[2]: https://github.com/DataDog/datadog-react-native-wizard
[3]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/react-native/README.md#inject-debug-id
[4]: https://docs.expo.dev/eas-update/introduction/
[5]: /error_tracking/frontend/mobile/reactnative/
[6]: /error_tracking/frontend/mobile/expo/
[7]: https://app.datadoghq.com/source-code/setup/rum
