<!--
Expo setup instructions.
-->

### Step 1 - Install the SDK

The RUM React Native SDK supports Expo and Expo Go. To use it, install `expo-datadog` and `@datadog/mobile-react-native`.

`expo-datadog` supports Expo starting from SDK 45 and the plugin's versions follow Expo versions. For example, if you use Expo SDK 45, use `expo-datadog` version `45.x.x`. Datadog recommends using **Expo SDK 45** as a minimum version; previous versions may require manual steps.

To install with npm, run:

```shell
npm install expo-datadog @datadog/mobile-react-native
```

To install with Yarn, run:

```shell
yarn add expo-datadog @datadog/mobile-react-native
```

### Step 2 - Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][7].
2. Choose `react-native` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings.

{% alert level="info" %}
If you've purchased Error Tracking as a standalone product (without RUM), navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][8] instead.
{% /alert %}

For data security, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][10].

### Step 3 - Initialize the library with application context

Add the following code snippet to your initialization file:

```javascript
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    PropagatorType
} from 'expo-datadog';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>', 
    '<ENVIRONMENT_NAME>',
    // Optional: Configure the Datadog Site to target. Default is 'US1'.
    site: 'US1',
    // Optional: Set the reported service name (by default, it uses the package name or bundleIdentifier of your Android or iOS app respectively)
    service: 'com.example.reactnative',
    // Optional: Let the SDK print internal logs above or equal to the provided level. Default is undefined (meaning no logs)
    verbosity: SdkVerbosity.WARN,
    // Enable RUM
    rumConfiguration: {
        // Required: RUM Application ID
        applicationId: '<APPLICATION_ID>',
        // Track user interactions (set to false if using Error Tracking only)
        trackInteractions: true,
        // Track XHR resources (set to false if using Error Tracking only)
        trackResources: true,
        // Track errors
        trackErrors: true,
        // Optional: Sample sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
        sessionSampleRate: 80,
        // Optional: Enable or disable native crash reports.
        nativeCrashReportEnabled: true,
        // Optional: Sample tracing integrations for network calls between your app and your backend 
        // (in this example, 80% of calls to your instrumented backend are linked from the RUM view to
        // the APM view. Default is 20%).
        // You need to specify the hosts of your backends to enable tracing with these backends
        resourceTraceSampleRate: 80,
        firstPartyHosts: [
            { 
                match: 'example.com', 
                propagatorTypes: [
                    PropagatorType.DATADOG,
                    PropagatorType.TRACECONTEXT
                ]
            }
        ]
    },
    // Enable Logs with default configuration
    logsConfiguration: {},
    // Enable Trace with default configuration
    traceConfiguration: {}
);

// Wrap the content of your App component in a DatadogProvider component, passing it your configuration:
export default function App() {
    return (
        <DatadogProvider configuration={config}>
            <Navigation />
        </DatadogProvider>
    );
}

// Once the Datadog React Native SDK for RUM is initialized, you need to setup view tracking to be able to see data in a dashboard
```

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions. To set this rate, use the `config.sessionSamplingRate` parameter and specify a percentage between 0 and 100.

### Upload source maps on EAS builds

To enable crash reporting and error symbolication, add `expo-datadog` to your plugins in the `app.json` file:

```json
{
    "expo": {
        "plugins": ["expo-datadog"]
    }
}
```

This plugin takes care of uploading the dSYMs, source maps and Proguard mapping files on every EAS build.

Add `@datadog/datadog-ci` as a development dependency. This package contains scripts to upload the source maps. You can install it with npm:

```shell
npm install @datadog/datadog-ci --save-dev
```

or with Yarn:

```shell
yarn add -D @datadog/datadog-ci
```

Run `eas secret:create` to set `DATADOG_API_KEY` to your Datadog API key, and `DATADOG_SITE` to the host of your Datadog site (for example, `datadoghq.com`).

### User interactions tracking

Datadog recommends set up interaction tracking by using the Datadog React Native Babel Plugin (`@datadog/mobile-react-native-babel-plugin`). This plugin automatically enriches React components with contextual metadata, improving interaction tracking accuracy and enabling a range of configuration options.

To install with npm, run:

```shell
npm install @datadog/mobile-react-native-babel-plugin
```

To install with Yarn, run:

```shell
yarn add @datadog/mobile-react-native-babel-plugin
```

Add the plugin to your Babel configuration file (`babel.config.js`, `.babelrc`, or similar):

```javascript
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: ['@datadog/mobile-react-native-babel-plugin']
};
```

After the plugin is installed and configured, it automatically tracks interactions on standard React Native components. No additional code changes are required for basic usage.

### CodePush integration (optional)

If you're deploying updates with [CodePush][13], see the [CodePush setup documentation][14] for additional configuration steps.

[7]: https://app.datadoghq.com/rum/application/create
[8]: https://app.datadoghq.com/error-tracking/settings/setup/client/
[10]: /account_management/api-app-keys/#client-tokens
[13]: https://docs.microsoft.com/en-us/appcenter/distribution/codepush/
[14]: /real_user_monitoring/application_monitoring/react_native/setup/codepush

